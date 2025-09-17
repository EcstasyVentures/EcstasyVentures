/*  eslint-disable no-console  */
require("dotenv").config();
const express      = require("express");
const mongoose     = require("mongoose");
const cors         = require("cors");
const bodyParser   = require("body-parser");
const bcrypt       = require("bcryptjs");
const fs           = require("fs");
const path         = require("path");
const { google }   = require("googleapis");

const app  = express();
app.use(cors());
app.use(bodyParser.json());

/* ----------  DB CONNECTION  ---------- */
mongoose.connect("mongodb://127.0.0.1:27017/adminDB");
const db = mongoose.connection;
db.once("open", () => {
  console.log("✅ Connected to adminDB");
  createTestAdmins();
  createTestFounders();
});

/* ----------  SCHEMAS  ---------- */
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  permissions: { type: [String], required: true },
  loginCount: { type: Number, default: 0 }
});
const Admin = mongoose.model("Admin", AdminSchema);

const FounderAuthSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  founderId: { type: String, required: true, unique: true },
  company: { type: String, default: "" },
  stage: { type: String, default: "Pre-Seed" },
  createdAt: { type: Date, default: Date.now }
});
const FounderAuth = mongoose.model("FounderAuth", FounderAuthSchema);

const LoginHistorySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  username: { type: String, required: true },
  loginTime: { type: Date, default: Date.now },
  ipAddress: { type: String, default: '' },
  userAgent: { type: String, default: '' }
});
const LoginHistory = mongoose.model("LoginHistory", LoginHistorySchema);

const UserDataSchema = new mongoose.Schema({ userId: { type: String, required: true, unique: true } }, { strict: false });
const UserData = mongoose.model("UserData", UserDataSchema);

/* ----------  SEED FUNCTIONS  ---------- */
async function createTestAdmins() {
  const admins = [
    { username: "superadmin",  password: await bcrypt.hash("super123", 10),  role: "superAdmin",        permissions: ["dashboard","ventures","founders","deals","tasks","growth","finance","legal","documents","crm","support","reports","automations","users","settings"] },
    { username: "operations",  password: await bcrypt.hash("ops123", 10),    role: "operationsAdmin",  permissions: ["dashboard","ventures","founders","tasks","support","documents"] },
    { username: "venture",     password: await bcrypt.hash("venture123",10), role: "venturePartner",   permissions: ["dashboard","ventures","founders","deals","crm","documents"] },
    { username: "finance",     password: await bcrypt.hash("finance123",10), role: "financeAdmin",     permissions: ["dashboard","finance","documents","reports"] },
    { username: "legal",       password: await bcrypt.hash("legal123", 10),  role: "legalAdmin",       permissions: ["dashboard","legal","documents","reports"] },
    { username: "marketing",   password: await bcrypt.hash("market123",10),  role: "growthMarketing",  permissions: ["dashboard","growth","reports"] },
    { username: "techlead",    password: await bcrypt.hash("tech123", 10),   role: "techLead",         permissions: ["dashboard","tasks","automations","reports"] }
  ];
  for (const a of admins) {
    const exists = await Admin.findOne({ username: a.username });
    if (!exists) { await Admin.create(a); console.log("✅ created admin", a.username); }
  }
}
async function createTestFounders() {
  const founders = [
    { email: "founder@test.com", password: await bcrypt.hash("founder123", 10), name: "Test Founder", founderId: "founder_test_001", company: "Test Startup", stage: "Seed" },
    { email: "john@startup.com", password: await bcrypt.hash("startup123", 10), name: "John Doe",     founderId: "founder_john_002", company: "Tech Innovations", stage: "Pre-Seed" }
  ];
  for (const f of founders) {
    const exists = await FounderAuth.findOne({ email: f.email });
    if (!exists) { await FounderAuth.create(f); console.log("✅ created founder", f.email); }
  }
}

/* ----------  ROUTES  ---------- */
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.json({ success: false, message: "Invalid username or password" });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.json({ success: false, message: "Invalid username or password" });

    admin.loginCount += 1;
    await admin.save();
    await LoginHistory.create({ adminId: admin._id, username, ipAddress: req.ip, userAgent: req.headers["user-agent"] || "" });

    return res.json({ success: true, username: admin.username, role: admin.role, permissions: admin.permissions, loginCount: admin.loginCount });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/founder-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const founder = await FounderAuth.findOne({ email });
    if (!founder) return res.json({ success: false, message: "Invalid email or password" });

    const ok = await bcrypt.compare(password, founder.password);
    if (!ok) return res.json({ success: false, message: "Invalid email or password" });

    return res.json({ success: true, founderId: founder.founderId, name: founder.name, email: founder.email });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ----------  STATIC / OTHER CRUD  ---------- */
app.get("/api/user-data/:userId", async (req, res) => {
  try {
    let doc = await UserData.findOne({ userId: req.params.userId });
    if (!doc) doc = await UserData.create({ userId: req.params.userId });
    res.json(doc);
  } catch (e) { res.status(500).json({ error: "Server error" }); }
});
app.post("/api/user-data/:userId", async (req, res) => {
  try {
    const doc = await UserData.findOneAndUpdate({ userId: req.params.userId }, req.body, { new: true, upsert: true });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/* ----------  GOOGLE CALENDAR  ---------- */
const TOKEN_PATH = path.join(__dirname, "google_token.json");
function getOAuth2Client() {
  const o = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/calendar/oauth2callback"
  );
  if (fs.existsSync(TOKEN_PATH)) o.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
  return o;
}
app.get("/api/calendar/auth-url", (req, res) => {
  const url = getOAuth2Client().generateAuthUrl({ access_type: "offline", scope: ["https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/calendar.events"], prompt: "consent" });
  res.json({ url });
});
app.get("/api/calendar/oauth2callback", async (req, res) => {
  try {
    const o = getOAuth2Client();
    const { tokens } = await o.getToken(req.query.code);
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
    res.send("Google Calendar authorized – close this window.");
  } catch (e) { res.status(500).send("Auth failed"); }
});
function calClient() { return google.calendar({ version: "v3", auth: getOAuth2Client() }); }
app.get("/api/calendar/events", async (req, res) => {
  try {
    const cal = calClient();
    const id = process.env.GOOGLE_CALENDAR_ID || "primary";
    const now = new Date();
    const q = { calendarId: id, timeMin: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(), maxResults: 2500, singleEvents: true, orderBy: "startTime" };
    const resGoogle = await cal.events.list(q);
    res.json(resGoogle.data.items || []);
  } catch (e) { res.status(500).json({ error: "Server error" }); }
});
app.post("/api/calendar/events", async (req, res) => {
  try {
    const cal = calClient();
    const id = process.env.GOOGLE_CALENDAR_ID || "primary";
    const { title, date, time } = req.body;
    let start, end;
    if (date && time && time.includes("-")) {
      const [s, e] = time.split("-").map(x => x.trim());
      start = { dateTime: new Date(`${date} ${s}`).toISOString() };
      end   = { dateTime: new Date(`${date} ${e}`).toISOString() };
    } else {
      start = { date: date }; end = { date: date };
    }
    const event = await cal.events.insert({ calendarId: id, requestBody: { summary: title, start, end } });
    res.json(event.data);
  } catch (e) { res.status(500).json({ error: "Server error" }); }
});

/* ----------  START SERVER  ---------- */
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
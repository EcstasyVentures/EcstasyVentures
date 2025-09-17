const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
app.use(cors());
app.use(bodyParser.json());

// Connect to the admin database
mongoose.connect("mongodb://127.0.0.1:27017/adminDB");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connected to adminDB");
    
    createTestAdmins();
});

// Define Admin schema with permissions and login tracking
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    permissions: { type: [String], required: true },
    loginCount: { type: Number, default: 0 }
});
const Admin = mongoose.model("Admin", AdminSchema);

// NEW: Define LoginHistory schema for tracking login timestamps
const LoginHistorySchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    username: { type: String, required: true },
    loginTime: { type: Date, default: Date.now },
    ipAddress: { type: String, default: '' },
    userAgent: { type: String, default: '' }
});
const LoginHistory = mongoose.model("LoginHistory", LoginHistorySchema);

// Define UserData schema for storing user-specific data
const UserDataSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    kpiData: Object,
    approvals: Array,
    ventures: Array,
    founders: Array,
    tasks: Array,
    termSheets: Array,
    capTable: Array,
    equityLedger: Array,
    vestingSchedules: Array,
    contentCalendar: Array,
    assetLibrary: Array,
    campaigns: Array,
    invoices: Array,
    revenueShare: Object,
    profitLoss: Object,
    contracts: Array,
    complianceCalendar: Array,
    documents: Array,
    investors: Array,
    tickets: Array,
    reports: Array,
    automations: Array,
    teams: Array,
    settings: Object,
    notifications: Array,
    events: Array,
    activeSubTab: Object
});
const UserData = mongoose.model("UserData", UserDataSchema);

// Define Contact schema for storing contact form submissions
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    startup: { type: String, default: "" },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, default: "New" } // New, In Progress, Resolved
});
const Contact = mongoose.model("Contact", ContactSchema);

// Define Notification schema for storing notifications
const NotificationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // 'founder_added', 'venture_added', 'task_added', etc.
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    data: { type: Object, default: {} }, // Additional data related to the notification
    read: { type: Boolean, default: false },
    adminId: { type: String, default: 'all' } // 'all' for all admins, or specific admin ID
});
const Notification = mongoose.model("Notification", NotificationSchema);

// Define Founder schema for storing founder data
const FounderSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    kyc: { type: String, default: "Pending" }, // Pending | Verified | Rejected
    role: { type: String, default: "" },
    experience: { type: String, default: "" },
    skills: { type: [String], default: [] },
    linkedin: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Founder = mongoose.model("Founder", FounderSchema);

// Define Venture schema for storing venture data
const VentureSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: "" },
    industry: { type: String, default: "" },
    stage: { type: String, default: "" },
    funding: { type: String, default: "" },
    valuation: { type: String, default: "" },
    founders: { type: [String], default: [] },
    status: { type: String, default: "Active" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Venture = mongoose.model("Venture", VentureSchema);

// Define Task schema for storing task data
const TaskSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    assignee: { type: String, default: "" },
    priority: { type: String, default: "Medium" },
    status: { type: String, default: "Pending" },
    dueDate: { type: Date, default: null },
    venture: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Task = mongoose.model("Task", TaskSchema);

// Define Document schema for storing documents
const DocumentSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, default: "General" },
    accessLevel: { type: String, default: "Internal" },
    type: { type: String, default: "document" },
    uploadedBy: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const DocumentModel = mongoose.model("Document", DocumentSchema);

// Function to create test admin users
async function createTestAdmins() {
    try {
        const adminUsers = [
            {
                username: "superadmin",
                password: await bcrypt.hash("super123", 10),
                role: "superAdmin",
                permissions: ["dashboard", "ventures", "founders", "deals", "tasks", "growth", "finance", "legal", "documents", "crm", "support", "reports", "automations", "users", "settings"],
                loginCount: 0
            },
            {
                username: "operations",
                password: await bcrypt.hash("ops123", 10),
                role: "operationsAdmin",
                permissions: ["dashboard", "ventures", "founders", "tasks", "support", "reports"],
                loginCount: 0
            },
            {
                username: "venture",
                password: await bcrypt.hash("venture123", 10),
                role: "venturePartner",
                permissions: ["dashboard", "ventures", "deals", "crm", "reports"],
                loginCount: 0
            },
            {
                username: "finance",
                password: await bcrypt.hash("finance123", 10),
                role: "financeAdmin",
                permissions: ["dashboard", "finance", "documents", "reports"],
                loginCount: 0
            },
            {
                username: "legal",
                password: await bcrypt.hash("legal123", 10),
                role: "legalAdmin",
                permissions: ["dashboard", "legal", "documents", "reports"],
                loginCount: 0
            },
            {
                username: "marketing",
                password: await bcrypt.hash("market123", 10),
                role: "growthMarketing",
                permissions: ["dashboard", "growth", "reports"],
                loginCount: 0
            },
            {
                username: "techlead",
                password: await bcrypt.hash("tech123", 10),
                role: "techLead",
                permissions: ["dashboard", "tasks", "automations", "reports"],
                loginCount: 0
            }
        ];
        for (const adminData of adminUsers) {
            const adminExists = await Admin.findOne({ username: adminData.username });
            if (!adminExists) {
                const admin = new Admin(adminData);
                await admin.save();
                console.log(`✅ Created admin user: ${adminData.username}`);
            } else {
                console.log(`ℹ️ Admin user already exists: ${adminData.username}`);
            }
        }
    } catch (err) {
        console.error("Error creating test admins:", err);
    }
}

// Login route with login count and history tracking
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.json({
                success: false,
                message: "Invalid username or password",
            });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
            // Increment login count
            admin.loginCount += 1;
            await admin.save();
            
            // Create login history record
            const loginHistory = new LoginHistory({
                adminId: admin._id,
                username: admin.username,
                ipAddress: req.ip || req.connection.remoteAddress,
                userAgent: req.headers['user-agent'] || ''
            });
            await loginHistory.save();
            
            return res.json({
                success: true,
                message: "Login successful",
                username: admin.username,
                role: admin.role,
                permissions: admin.permissions,
                loginCount: admin.loginCount,
                lastLogin: loginHistory.loginTime // Include last login time
            });
        } else {
            return res.json({
                success: false,
                message: "Invalid username or password",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// Get user data
app.get("/api/user-data/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        let userData = await UserData.findOne({ userId });
        if (!userData) {
            // Create default user data if not exists
            userData = new UserData({
                userId,
                kpiData: {
                    activeVentures: 0,
                    portfolioARR: "$0",
                    revenueShare: "$0",
                    tasksDue: 0,
                    invoicesPending: 0
                },
                approvals: [],
                ventures: [],
                founders: [],
                tasks: [],
                termSheets: [],
                capTable: [],
                equityLedger: [],
                vestingSchedules: [],
                contentCalendar: [],
                assetLibrary: [],
                campaigns: [],
                invoices: [],
                revenueShare: {},
                profitLoss: {},
                contracts: [],
                complianceCalendar: [],
                documents: [],
                investors: [],
                tickets: [],
                reports: [],
                automations: [],
                teams: [],
                settings: {},
                notifications: [],
                events: [],
                activeSubTab: {
                    deals: "termSheets",
                    growth: "contentCalendar",
                    finance: "invoices",
                    legal: "contracts",
                    crm: "investors",
                    settings: "branding"
                }
            });
            await userData.save();
        }
        res.json(userData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update user data
app.post("/api/user-data/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const data = req.body;
        let userData = await UserData.findOne({ userId });
        if (!userData) {
            userData = new UserData({ userId, ...data });
        } else {
            // Update existing data
            Object.assign(userData, data);
        }
        await userData.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// Contact form submission route
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, startup, message } = req.body;
        // Create a new contact document
        const newContact = new Contact({
            name,
            email,
            startup: startup || "",
            message
        });
        // Save to database
        await newContact.save();
        // Return success response
        res.status(201).json({
            success: true,
            message: "Contact form submitted successfully",
            contactId: newContact._id
        });
    } catch (err) {
        console.error("Error saving contact form:", err);
        res.status(500).json({
            success: false,
            message: "Failed to submit contact form"
        });
    }
});

// Get all contact submissions (admin route)
app.get("/api/contact", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update contact status (admin route)
app.put("/api/contact/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }
        res.json(updatedContact);
    } catch (err) {
        console.error("Error updating contact status:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Get user login statistics
app.get("/api/admin/login-stats", async (req, res) => {
    try {
        // Get all admins with their login counts
        const admins = await Admin.find({}, { username: 1, role: 1, loginCount: 1 });
        
        // Calculate total logins across all users
        const totalLogins = admins.reduce((sum, admin) => sum + admin.loginCount, 0);
        
        res.json({
            totalLogins,
            users: admins.map(admin => ({
                username: admin.username,
                role: admin.role,
                loginCount: admin.loginCount
            }))
        });
    } catch (err) {
        console.error("Error fetching login stats:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// NEW: Get detailed login history for all admins
app.get("/api/admin/login-history", async (req, res) => {
    try {
        // Get all login history records, sorted by most recent first
        const history = await LoginHistory.find()
            .sort({ loginTime: -1 })
            .populate('adminId', 'username role')
            .limit(100); // Limit to last 100 logins
        
        res.json(history);
    } catch (err) {
        console.error("Error fetching login history:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// NEW: Get login history for a specific admin
app.get("/api/admin/login-history/:username", async (req, res) => {
    try {
        const { username } = req.params;
        
        // Get login history for the specified admin
        const history = await LoginHistory.find({ username })
            .sort({ loginTime: -1 })
            .limit(50); // Limit to last 50 logins for this user
        
        if (history.length === 0) {
            return res.status(404).json({ message: "No login history found for this user" });
        }
        
        res.json(history);
    } catch (err) {
        console.error("Error fetching user login history:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Helper function to create notifications
async function createNotification(type, title, message, data = {}, adminId = 'all') {
    try {
        const notificationId = `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const notification = new Notification({
            id: notificationId,
            type,
            title,
            message,
            data,
            adminId
        });
        await notification.save();
        console.log(`✅ Notification created: ${title}`);
        return notification;
    } catch (err) {
        console.error("Error creating notification:", err);
        return null;
    }
}

// Get all notifications (sorted by timestamp, newest first)
app.get("/api/notifications", async (req, res) => {
    try {
        const notifications = await Notification.find()
            .sort({ timestamp: -1 })
            .limit(100); // Limit to last 100 notifications
        res.json(notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Mark notification as read
app.put("/api/notifications/:id/read", async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findOneAndUpdate(
            { id },
            { read: true },
            { new: true }
        );
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        res.json(notification);
    } catch (err) {
        console.error("Error updating notification:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CRUD operations for Founders
app.get("/api/founders", async (req, res) => {
    try {
        const founders = await Founder.find().sort({ createdAt: -1 });
        res.json(founders);
    } catch (err) {
        console.error("Error fetching founders:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/founders", async (req, res) => {
    try {
        const founderData = req.body;
        founderData.id = `founder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const founder = new Founder(founderData);
        await founder.save();
        
        // Create notification for all admins
        await createNotification(
            'founder_added',
            'New Founder Added',
            `A new founder "${founderData.name}" has been added to the directory.`,
            { founderId: founderData.id, founderName: founderData.name }
        );
        
        res.json(founder);
    } catch (err) {
        console.error("Error creating founder:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/founders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedAt = new Date();
        
        const founder = await Founder.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
        if (!founder) {
            return res.status(404).json({ error: "Founder not found" });
        }
        
        // Create notification for founder update
        await createNotification(
            'founder_updated',
            'Founder Updated',
            `Founder "${founder.name}" information has been updated.`,
            { founderId: id, founderName: founder.name }
        );
        
        res.json(founder);
    } catch (err) {
        console.error("Error updating founder:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/founders/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const founder = await Founder.findOneAndDelete({ id });
        if (!founder) {
            return res.status(404).json({ error: "Founder not found" });
        }
        
        // Create notification for founder deletion
        await createNotification(
            'founder_deleted',
            'Founder Removed',
            `Founder "${founder.name}" has been removed from the directory.`,
            { founderId: id, founderName: founder.name }
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting founder:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CRUD operations for Ventures
app.get("/api/ventures", async (req, res) => {
    try {
        const ventures = await Venture.find().sort({ createdAt: -1 });
        res.json(ventures);
    } catch (err) {
        console.error("Error fetching ventures:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/ventures", async (req, res) => {
    try {
        const ventureData = req.body;
        ventureData.id = `venture_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const venture = new Venture(ventureData);
        await venture.save();
        
        // Create notification for all admins
        await createNotification(
            'venture_added',
            'New Venture Added',
            `A new venture "${ventureData.name}" has been added to the portfolio.`,
            { ventureId: ventureData.id, ventureName: ventureData.name }
        );
        
        res.json(venture);
    } catch (err) {
        console.error("Error creating venture:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/ventures/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedAt = new Date();
        
        const venture = await Venture.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
        if (!venture) {
            return res.status(404).json({ error: "Venture not found" });
        }
        
        // Create notification for venture update
        await createNotification(
            'venture_updated',
            'Venture Updated',
            `Venture "${venture.name}" information has been updated.`,
            { ventureId: id, ventureName: venture.name }
        );
        
        res.json(venture);
    } catch (err) {
        console.error("Error updating venture:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/ventures/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const venture = await Venture.findOneAndDelete({ id });
        if (!venture) {
            return res.status(404).json({ error: "Venture not found" });
        }
        
        // Create notification for venture deletion
        await createNotification(
            'venture_deleted',
            'Venture Removed',
            `Venture "${venture.name}" has been removed from the portfolio.`,
            { ventureId: id, ventureName: venture.name }
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting venture:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CRUD operations for Tasks
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {
        const taskData = req.body;
        taskData.id = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const task = new Task(taskData);
        await task.save();
        
        // Create notification for all admins
        await createNotification(
            'task_added',
            'New Task Added',
            `A new task "${taskData.title}" has been assigned.`,
            { taskId: taskData.id, taskTitle: taskData.title, assignee: taskData.assignee }
        );
        
        res.json(task);
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        updateData.updatedAt = new Date();
        
        const task = await Task.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        // Create notification for task update
        await createNotification(
            'task_updated',
            'Task Updated',
            `Task "${task.title}" has been updated.`,
            { taskId: id, taskTitle: task.title, status: task.status }
        );
        
        res.json(task);
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ id });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        // Create notification for task deletion
        await createNotification(
            'task_deleted',
            'Task Removed',
            `Task "${task.title}" has been removed.`,
            { taskId: id, taskTitle: task.title }
        );
        
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// =====================
// Google Calendar Setup
// =====================
const TOKEN_PATH = path.join(__dirname, "google_token.json");

function getOAuth2Client() {
    const clientId = process.env.GOOGLE_CLIENT_ID || "";
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:5000/api/calendar/oauth2callback";
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    if (fs.existsSync(TOKEN_PATH)) {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
        oAuth2Client.setCredentials(token);
    }
    return oAuth2Client;
}

app.get("/api/calendar/auth-url", (req, res) => {
    try {
        const oAuth2Client = getOAuth2Client();
        const scopes = [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events"
        ];
        const url = oAuth2Client.generateAuthUrl({ access_type: "offline", scope: scopes, prompt: "consent" });
        res.json({ url });
    } catch (err) {
        console.error("Error generating auth URL:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/calendar/oauth2callback", async (req, res) => {
    try {
        const code = req.query.code;
        const oAuth2Client = getOAuth2Client();
        const { tokens } = await oAuth2Client.getToken(code);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        res.send("Google Calendar authorized successfully. You can close this window.");
    } catch (err) {
        console.error("Error during OAuth callback:", err);
        res.status(500).send("Failed to authorize Google Calendar");
    }
});

function getCalendarClient() {
    const auth = getOAuth2Client();
    return google.calendar({ version: "v3", auth });
}

// List events
app.get("/api/calendar/events", async (req, res) => {
    try {
        const calendar = getCalendarClient();
        const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
        const now = new Date();
        const response = await calendar.events.list({
            calendarId,
            timeMin: new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
            maxResults: 2500,
            singleEvents: true,
            orderBy: "startTime",
        });
        res.json(response.data.items || []);
    } catch (err) {
        console.error("Error listing calendar events:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Create event
app.post("/api/calendar/events", async (req, res) => {
    try {
        const calendar = getCalendarClient();
        const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
        const { title, date, time } = req.body;
        // Expect time like "10:00 AM - 12:00 PM"; fall back to all-day
        let startDateTime, endDateTime;
        if (date && time && time.includes("-")) {
            const [start, end] = time.split("-").map(s => s.trim());
            const startIso = new Date(`${date} ${start}`).toISOString();
            const endIso = new Date(`${date} ${end}`).toISOString();
            startDateTime = { dateTime: startIso };
            endDateTime = { dateTime: endIso };
        } else if (date) {
            startDateTime = { date };
            endDateTime = { date };
        }
        const event = {
            summary: title,
            start: startDateTime,
            end: endDateTime
        };
        const response = await calendar.events.insert({ calendarId, requestBody: event });
        res.json(response.data);
    } catch (err) {
        console.error("Error creating calendar event:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Update event
app.put("/api/calendar/events/:id", async (req, res) => {
    try {
        const calendar = getCalendarClient();
        const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
        const { id } = req.params;
        const { title, date, time } = req.body;
        let startDateTime, endDateTime;
        if (date && time && time.includes("-")) {
            const [start, end] = time.split("-").map(s => s.trim());
            const startIso = new Date(`${date} ${start}`).toISOString();
            const endIso = new Date(`${date} ${end}`).toISOString();
            startDateTime = { dateTime: startIso };
            endDateTime = { dateTime: endIso };
        } else if (date) {
            startDateTime = { date };
            endDateTime = { date };
        }
        const event = {
            summary: title,
            start: startDateTime,
            end: endDateTime
        };
        const response = await calendar.events.update({ calendarId, eventId: id, requestBody: event });
        res.json(response.data);
    } catch (err) {
        console.error("Error updating calendar event:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete event
app.delete("/api/calendar/events/:id", async (req, res) => {
    try {
        const calendar = getCalendarClient();
        const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";
        const { id } = req.params;
        await calendar.events.delete({ calendarId, eventId: id });
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting calendar event:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// CRUD operations for Documents
app.get("/api/documents", async (req, res) => {
    try {
        const documents = await DocumentModel.find().sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        console.error("Error fetching documents:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/api/documents", async (req, res) => {
    try {
        const docData = req.body;
        docData.id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const document = new DocumentModel(docData);
        await document.save();

        // Notify all admins
        await createNotification(
            'document_added',
            'New Document Added',
            `Document "${docData.name}" has been added in category ${docData.category}.`,
            { documentId: docData.id, name: docData.name, category: docData.category }
        );

        res.json(document);
    } catch (err) {
        console.error("Error creating document:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.put("/api/documents/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body, updatedAt: new Date() };
        const document = await DocumentModel.findOneAndUpdate(
            { id },
            updateData,
            { new: true }
        );
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        res.json(document);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).json({ error: "Server error" });
    }
});

app.delete("/api/documents/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const document = await DocumentModel.findOneAndDelete({ id });
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        res.json({ success: true });
    } catch (err) {
        console.error("Error deleting document:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Search functionality
app.get("/api/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) {
            return res.json({ founders: [], ventures: [], tasks: [] });
        }
        
        const searchRegex = new RegExp(q, 'i');
        
        const [founders, ventures, tasks] = await Promise.all([
            Founder.find({
                $or: [
                    { name: searchRegex },
                    { email: searchRegex },
                    { company: searchRegex },
                    { role: searchRegex }
                ]
            }),
            Venture.find({
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { industry: searchRegex }
                ]
            }),
            Task.find({
                $or: [
                    { title: searchRegex },
                    { description: searchRegex },
                    { assignee: searchRegex }
                ]
            })
        ]);
        
        res.json({ founders, ventures, tasks });
    } catch (err) {
        console.error("Error searching:", err);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

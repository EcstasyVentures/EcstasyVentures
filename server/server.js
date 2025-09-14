const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

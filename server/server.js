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
    // Create test admin users if they don't exist
    createTestAdmins();
});

// Define Admin schema with permissions
const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    permissions: { type: [String], required: true }
});
const Admin = mongoose.model("Admin", AdminSchema);

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

// NEW: Define Contact schema for storing contact form submissions
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
                permissions: ["dashboard", "ventures", "founders", "deals", "tasks", "growth", "finance", "legal", "documents", "crm", "support", "reports", "automations", "users", "settings"]
            },
            {
                username: "operations",
                password: await bcrypt.hash("ops123", 10),
                role: "operationsAdmin",
                permissions: ["dashboard", "ventures", "founders", "tasks", "support", "reports"]
            },
            {
                username: "venture",
                password: await bcrypt.hash("venture123", 10),
                role: "venturePartner",
                permissions: ["dashboard", "ventures", "deals", "crm", "reports"]
            },
            {
                username: "finance",
                password: await bcrypt.hash("finance123", 10),
                role: "financeAdmin",
                permissions: ["dashboard", "finance", "documents", "reports"]
            },
            {
                username: "legal",
                password: await bcrypt.hash("legal123", 10),
                role: "legalAdmin",
                permissions: ["dashboard", "legal", "documents", "reports"]
            },
            {
                username: "marketing",
                password: await bcrypt.hash("market123", 10),
                role: "growthMarketing",
                permissions: ["dashboard", "growth", "reports"]
            },
            {
                username: "techlead",
                password: await bcrypt.hash("tech123", 10),
                role: "techLead",
                permissions: ["dashboard", "tasks", "automations", "reports"]
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

// Login route
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
            return res.json({
                success: true,
                message: "Login successful",
                username: admin.username,
                role: admin.role,
                permissions: admin.permissions
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

// NEW: Contact form submission route
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

// NEW: Get all contact submissions (admin route)
app.get("/api/contact", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error("Error fetching contacts:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// NEW: Update contact status (admin route)
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
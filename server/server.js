const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to the new admin database
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

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
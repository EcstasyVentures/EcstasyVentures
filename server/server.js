const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Updated MongoDB connection without deprecated options
mongoose.connect("mongodb://127.0.0.1:27017/test");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connected to MongoDB");

    // Create a test admin user if none exists
    createTestAdmin();
});

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);

// Function to create a test admin
async function createTestAdmin() {
    try {
        const adminExists = await Admin.findOne({ username: "admin" });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            const admin = new Admin({
                username: "admin",
                password: hashedPassword,
                role: "admin"
            });
            await admin.save();
            console.log("✅ Test admin created: username=admin, password=admin123");
        } else {
            console.log("ℹ️ Admin user already exists");
        }
    } catch (err) {
        console.error("Error creating test admin:", err);
    }
}

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
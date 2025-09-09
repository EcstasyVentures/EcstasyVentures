
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("✅ Connected to MongoDB");
});

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);


app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const admin = await Admin.findOne({ username, password });
        if (admin) {
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

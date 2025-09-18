const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://127.0.0.1:27017/adminDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    permissions: { type: [String], required: true }
});

const Admin = mongoose.model('Admin', AdminSchema);

async function createAdmins() {
    try {
        // Clear existing users
        await Admin.deleteMany({});

        // Create new users
        const users = [
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

        await Admin.insertMany(users);
        console.log("✅ Admin users created successfully");
        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

createAdmins();
import { useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const adminRes = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const adminData = await adminRes.json();

            if (adminData.success) {
                localStorage.setItem("username", adminData.username);
                localStorage.setItem("role", adminData.role);
                localStorage.setItem("permissions", JSON.stringify(adminData.permissions));
                alert("✅ Admin Login Successful!");
                onClose();
                navigate("/dashboard");
                return;
            }

            const founderRes = await fetch("http://localhost:5000/api/founder-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: username, password }), // username is email for founders
            });
            const founderData = await founderRes.json();

            if (founderData && founderData.success) {
                localStorage.setItem("founderId", founderData.founderId);
                localStorage.setItem("founderName", founderData.name);
                localStorage.setItem("username", founderData.name); // For consistency
                localStorage.setItem("role", "founder");
                alert("✅ Founder Login Successful!");
                onClose();
                navigate("/founder-dashboard");
                return;
            }

            alert("❌ Invalid credentials. Please check your username/email and password.");

        } catch (err) {
            alert("⚠️ Server error, try again later");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2>Login Portal</h2>
                <p style={{textAlign: "center", color: "#666", marginBottom: "20px"}}>
                    Enter your credentials to access your dashboard
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username/Email</label>
                        <input
                            type="text"
                            placeholder="Enter username (admin) or email (founder)"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <div className="login-help">
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import "../styles.css";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClose }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (data.success) {
                alert("✅ Login Successful!");
                // Save role or username in localStorage/sessionStorage
                localStorage.setItem("username", data.username); // store username
                localStorage.setItem("role", data.role); // store role
                onClose();
                navigate("/dashboard"); // redirect to dashboard
            } else {
                alert("❌ " + data.message);
            }
        } catch (err) {
            alert("⚠️ Server error, try again later");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
            </div>
        </div>
    );
}
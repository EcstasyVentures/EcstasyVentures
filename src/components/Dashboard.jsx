import React, { useState } from "react";
import "../styles.css";

export default function Dashboard() {
    const role = localStorage.getItem("role") || "Admin";
    const [activeSection, setActiveSection] = useState(null);

    const [showNotes, setShowNotes] = useState(false);
    const [showTaskBox, setShowTaskBox] = useState(false);
    const [notes, setNotes] = useState("");
    const [task, setTask] = useState("");
    const [selectedAdmin, setSelectedAdmin] = useState("");
    const admins = ["Admin1", "Admin2", "Admin3"];

    // Temporary in-memory data
    const [kpis, setKpis] = useState([
        { id: 1, name: "Active Ventures", value: "12" },
        { id: 2, name: "Portfolio ARR", value: "$3.5M" },
    ]);

    const [approvals, setApprovals] = useState([
        { id: 1, type: "Pending Contracts", count: "3" },
        { id: 2, type: "Payouts", count: "2" },
    ]);

    const [calendar, setCalendar] = useState([
        { id: 1, title: "Board Meeting", date: "15-09-2025" },
    ]);

    const [notifications, setNotifications] = useState([
        { id: 1, category: "Finance", message: "Invoice approved" },
    ]);

    const deleteItem = (list, setList, id) => {
        setList(list.filter((item) => item.id !== id));
    };

    const handleScheduleMeeting = () => {
        window.open("https://calendar.google.com", "_blank");
    };

    const handleSaveTask = () => {
        if (selectedAdmin && task) {
            alert(`Task "${task}" assigned to ${selectedAdmin}`);
            setTask("");
            setSelectedAdmin("");
            setShowTaskBox(false);
        } else {
            alert("Please select an admin and enter a task");
        }
    };

    return (
        <div className="db-container">
            {/* Header */}
            <header className="db-header">
                <h1>Welcome, {role}</h1>
            </header>

            <div className="db-body">
                {/* Sidebar */}
                <aside className="db-sidebar">
                    <h2>Menu</h2>
                    <ul>
                        <li onClick={() => setActiveSection("KPIs")}>📊 KPIs</li>
                        <li onClick={() => setActiveSection("Approvals")}>✅ Approvals</li>
                        <li onClick={() => setActiveSection("Calendar")}>📅 Calendar</li>
                        <li onClick={() => setActiveSection("Notifications")}>🔔 Notifications</li>
                        <li onClick={() => setActiveSection(null)}>📔 Diary</li>
                    </ul>
                </aside>

                {/* Workspace */}
                <main className="db-workspace">
                    {/* Diary */}
                    {!activeSection && (
                        <div className="db-diary flashy">
                            <h2>📔 Your Diary</h2>
                            <p>Keep track of your notes, tasks, and meetings!</p>
                            <button onClick={() => setShowNotes(true)}>📝 Take Notes</button>
                            <button onClick={handleScheduleMeeting}>📆 Schedule Meeting</button>
                            <button onClick={() => setShowTaskBox(true)}>✅ Add Task</button>

                            {/* Notes Popup */}
                            {showNotes && (
                                <div className="popup">
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Write your notes here..."
                                    />
                                    <div className="popup-actions">
                                        <button onClick={() => setShowNotes(false)}>Close</button>
                                    </div>
                                </div>
                            )}

                            {/* Task Popup */}
                            {showTaskBox && (
                                <div className="popup">
                                    <h3>Assign Task</h3>
                                    <select
                                        value={selectedAdmin}
                                        onChange={(e) => setSelectedAdmin(e.target.value)}
                                    >
                                        <option value="">-- Select Admin --</option>
                                        {admins.map((a, idx) => (
                                            <option key={idx} value={a}>{a}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Enter task..."
                                        value={task}
                                        onChange={(e) => setTask(e.target.value)}
                                    />
                                    <div className="popup-actions">
                                        <button onClick={handleSaveTask}>Save</button>
                                        <button onClick={() => setShowTaskBox(false)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* KPIs */}
                    {activeSection === "KPIs" && (
                        <div className="db-section scrollable">
                            <h2>📊 KPIs</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Value</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {kpis.map((kpi) => (
                                    <tr key={kpi.id}>
                                        <td>{kpi.name}</td>
                                        <td>{kpi.value}</td>
                                        <td>
                                            <button onClick={() => deleteItem(kpis, setKpis, kpi.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Approvals */}
                    {activeSection === "Approvals" && (
                        <div className="db-section scrollable">
                            <h2>✅ Approvals</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Count</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {approvals.map((a) => (
                                    <tr key={a.id}>
                                        <td>{a.type}</td>
                                        <td>{a.count}</td>
                                        <td>
                                            <button onClick={() => deleteItem(approvals, setApprovals, a.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Calendar */}
                    {activeSection === "Calendar" && (
                        <div className="db-section scrollable">
                            <h2>📅 Calendar</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Event Title</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {calendar.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.title}</td>
                                        <td>{c.date}</td>
                                        <td>
                                            <button onClick={() => deleteItem(calendar, setCalendar, c.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Notifications */}
                    {activeSection === "Notifications" && (
                        <div className="db-section scrollable">
                            <h2>🔔 Notifications</h2>
                            <table>
                                <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notifications.map((n) => (
                                    <tr key={n.id}>
                                        <td>{n.category}</td>
                                        <td>{n.message}</td>
                                        <td>
                                            <button onClick={() => deleteItem(notifications, setNotifications, n.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

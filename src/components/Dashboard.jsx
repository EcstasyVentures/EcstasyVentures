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
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newItem, setNewItem] = useState({});

    const admins = [
        "Super Admin",
        "Operations Admin",
        "Venture Partner",
        "Finance Admin",
        "Legal Admin",
        "Growth/Marketing",
        "Tech Lead",
        "Founder (External)"
    ];


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

    // --- Generic Functions ---
    const deleteItem = (list, setList, id) => {
        setList(list.filter((item) => item.id !== id));
    };

    const handleUpdateItem = (list, setList, id, field, value) => {
        setList(
            list.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const handleAddItem = (section) => {
        const listMap = { KPIs: kpis, Approvals: approvals, Calendar: calendar, Notifications: notifications };
        const setMap = { KPIs: setKpis, Approvals: setApprovals, Calendar: setCalendar, Notifications: setNotifications };

        if (Object.values(newItem).some((v) => v === "" || v === undefined)) {
            alert("Please fill all fields");
            return;
        }

        setMap[section]([...listMap[section], { id: Date.now(), ...newItem }]);
        setNewItem({});
        setShowAddPopup(false);
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

    const handleSaveNotes = () => {
        if (notes) {
            alert(`Notes saved: ${notes}`);
            setNotes("");
            setShowNotes(false);
        } else {
            alert("Write some notes first!");
        }
    };

    // --- Helper to render table headers dynamically ---
    const renderHeaders = (section) => {
        const headersMap = {
            KPIs: ["Name", "Value"],
            Approvals: ["Type", "Count"],
            Calendar: ["Event Title", "Date"],
            Notifications: ["Category", "Message"],
        };
        return headersMap[section];
    };

    // --- Helper to get list & setter dynamically ---
    const getListAndSetter = (section) => {
        const listMap = { KPIs: kpis, Approvals: approvals, Calendar: calendar, Notifications: notifications };
        const setMap = { KPIs: setKpis, Approvals: setApprovals, Calendar: setCalendar, Notifications: setNotifications };
        return [listMap[section], setMap[section]];
    };

    // --- Helper to get section title ---
    const getSectionTitle = (section) => {
        const icons = { KPIs: "📊", Approvals: "✅", Calendar: "📅", Notifications: "🔔" };
        return `${icons[section]} ${section}`;
    };

    return (
        <div className="db-container">
            <header className="db-header">
                <h1>Welcome, {role}</h1>
            </header>

            <div className="db-body">
                {/* Sidebar */}
                <aside className="db-sidebar">
                    <h2>Menu</h2>
                    <ul>
                        {["KPIs", "Approvals", "Calendar", "Notifications"].map((section) => (
                            <li
                                key={section}
                                className={activeSection === section ? "active" : ""}
                                onClick={() => setActiveSection(section)}
                            >
                                {getSectionTitle(section)}
                            </li>
                        ))}
                        <li
                            className={activeSection === null ? "active" : ""}
                            onClick={() => setActiveSection(null)}
                        >
                            📔 Diary
                        </li>
                    </ul>
                </aside>

                {/* Workspace */}
                <main className="db-workspace">
                    {/* Diary */}
                    {!activeSection && (
                        <div className="db-diary">
                            <h2>📔 Your Diary</h2>
                            <p>Keep track of your notes, tasks, and meetings!</p>
                            <div className="diary-actions">
                                <button onClick={() => setShowNotes(true)}>📝 Take Notes</button>
                                <button onClick={handleScheduleMeeting}>📆 Schedule Meeting</button>
                                <button onClick={() => setShowTaskBox(true)}>✅ Add Task</button>
                            </div>

                            {/* Notes Popup */}
                            {showNotes && (
                                <div className="popup-overlay">
                                    <div className="popup">
                                        <h3>Take a Note</h3>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Write your notes here..."
                                        />
                                        <div className="popup-actions">
                                            <button onClick={handleSaveNotes}>Submit</button>
                                            <button className="secondary" onClick={() => setShowNotes(false)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Task Popup */}
                            {showTaskBox && (
                                <div className="popup-overlay">
                                    <div className="popup">
                                        <h3>Assign a Task</h3>
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
                                            <button onClick={handleSaveTask}>Submit</button>
                                            <button className="secondary" onClick={() => setShowTaskBox(false)}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Sections */}
                    {["KPIs", "Approvals", "Calendar", "Notifications"].map((section) => {
                        const [list, setList] = getListAndSetter(section);
                        const headers = renderHeaders(section);

                        return activeSection === section && (
                            <div key={section} className="db-section scrollable">
                                <div className="section-header">
                                    <h2>{getSectionTitle(section)}</h2>
                                    <span className="add-icon" onClick={() => setShowAddPopup(section)}>✏️</span>
                                </div>

                                {/* Add Item Popup */}
                                {showAddPopup === section && (
                                    <div className="popup-overlay">
                                        <div className="popup">
                                            <h3>Add New {section.slice(0, -1)}</h3>
                                            {headers.map((h, idx) => (
                                                <input
                                                    key={idx}
                                                    type="text"
                                                    placeholder={h}
                                                    value={newItem[h.toLowerCase()] || ""}
                                                    onChange={(e) => setNewItem({ ...newItem, [h.toLowerCase()]: e.target.value })}
                                                />
                                            ))}
                                            <div className="popup-actions">
                                                <button onClick={() => handleAddItem(section)}>Submit</button>
                                                <button className="secondary" onClick={() => { setShowAddPopup(false); setNewItem({}); }}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <table>
                                    <thead>
                                    <tr>
                                        {headers.map((h, idx) => <th key={idx}>{h}</th>)}
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {list.map((item) => (
                                        <tr key={item.id}>
                                            {headers.map((h, idx) => <td key={idx}>{item[h.toLowerCase()]}</td>)}
                                            <td>
                                                <select onChange={(e) => {
                                                    const action = e.target.value;
                                                    if (action === "delete") deleteItem(list, setList, item.id);
                                                    if (action === "update") {
                                                        const field = headers[0].toLowerCase(); // first editable field
                                                        const newVal = prompt(`Enter new ${headers[0]}:`, item[field]);
                                                        if (newVal) handleUpdateItem(list, setList, item.id, field, newVal);
                                                    }
                                                    e.target.value = "";
                                                }}>
                                                    <option value="">--Select--</option>
                                                    <option value="update">Update</option>
                                                    <option value="delete">Delete</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })}
                </main>
            </div>
        </div>
    );
}

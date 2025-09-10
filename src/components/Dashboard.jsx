import React, { useState } from "react";
import "../styles.css";

export default function Dashboard() {
    const role = localStorage.getItem("role") || "Admin";
    const [activeSection, setActiveSection] = useState(null);

    // UI toggles
    const [showNotesPopup, setShowNotesPopup] = useState(false);
    const [showTaskPopup, setShowTaskPopup] = useState(false);

    // Diary input fields (for add)
    const [notesInput, setNotesInput] = useState("");
    const [taskInput, setTaskInput] = useState("");
    const [taskAssignedTo, setTaskAssignedTo] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskStatus, setTaskStatus] = useState("Open");

    // Admin selection (for assigning tasks)
    const [selectedAdmin, setSelectedAdmin] = useState("");

    // Reusable admin list
    const admins = [
        "Super Admin",
        "Operations Admin",
        "Venture Partner",
        "Finance Admin",
        "Legal Admin",
        "Growth/Marketing",
        "Tech Lead",
        "Founder (External)",
    ];

    // --- Data States (unchanged sections) ---
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

    const [dealsEquity, setDealsEquity] = useState({
        "Term Sheets": [
            {
                id: 1,
                deal: "Seed Round",
                investor: "XYZ VC",
                amount: "$500K",
                date: "01-09-2025",
                status: "Signed",
            },
        ],
        "Cap Table": [
            { id: 1, shareholder: "Founder A", equity: "40%", shares: "4000", esop: "-" },
            { id: 2, shareholder: "Employee ESOP Pool", equity: "10%", shares: "1000", esop: "Yes" },
        ],
        "Equity Ledger": [
            { id: 1, provider: "Legal Services Co.", service: "Incorporation", equity: "1%", date: "10-06-2025" },
        ],
        Vesting: [
            { id: 1, person: "Employee A", equity: "2%", start: "01-01-2024", cliff: "1 yr", end: "01-01-2028" },
        ],
    });

    // --- Headers Map ---
    const headersMap = {
        KPIs: ["Name", "Value"],
        Approvals: ["Type", "Count"],
        Calendar: ["Title", "Date"],
        Notifications: ["Category", "Message"],
        "Term Sheets": ["Deal", "Investor", "Amount", "Date", "Status"],
        "Cap Table": ["Shareholder", "Equity", "Shares", "ESOP"],
        "Equity Ledger": ["Provider", "Service", "Equity", "Date"],
        Vesting: ["Person", "Equity", "Start", "Cliff", "End"],
    };

    // helper to get list and setter for main simple sections
    const getListAndSetter = (section) => {
        const listMap = {
            KPIs: kpis,
            Approvals: approvals,
            Calendar: calendar,
            Notifications: notifications,
        };
        const setMap = {
            KPIs: setKpis,
            Approvals: setApprovals,
            Calendar: setCalendar,
            Notifications: setNotifications,
        };
        return [listMap[section], setMap[section]];
    };

    // Section title w/ icon
    const getSectionTitle = (section) => {
        const icons = {
            KPIs: "📊",
            Approvals: "✅",
            Calendar: "📅",
            Notifications: "🔔",
            "Deals & Equity": "💹",
        };
        return `${icons[section] || ""} ${section}`;
    };

    // --- CRUD for generic sections ---
    const [showAddPopup, setShowAddPopup] = useState(null);
    const [newItem, setNewItem] = useState({});
    const [updateItem, setUpdateItem] = useState(null);

    const handleAdd = (section, sub = null) => {
        if (sub) {
            setDealsEquity({
                ...dealsEquity,
                [sub]: [...dealsEquity[sub], { id: Date.now(), ...newItem }],
            });
        } else {
            const [list, setList] = getListAndSetter(section);
            setList([...list, { id: Date.now(), ...newItem }]);
        }
        setNewItem({});
        setShowAddPopup(null);
    };

    const handleUpdate = () => {
        if (!updateItem) return;
        if (updateItem.sub) {
            setDealsEquity({
                ...dealsEquity,
                [updateItem.sub]: dealsEquity[updateItem.sub].map((row) =>
                    row.id === updateItem.id ? { ...row, ...updateItem.values } : row
                ),
            });
        } else {
            const [list, setList] = getListAndSetter(updateItem.section);
            setList(list.map((row) => (row.id === updateItem.id ? { ...row, ...updateItem.values } : row)));
        }
        setUpdateItem(null);
    };

    // --- Diary Data (Notes & Tasks) ---
    const [notesList, setNotesList] = useState([
        // example note
        // { id: 1, text: "Discuss investor intro", date: "2025-09-01", createdBy: "Super Admin" }
    ]);

    const [tasksList, setTasksList] = useState([
        // example task
        // { id: 1, task: "Send invoice", assignedTo: "Finance Admin", dueDate: "2025-09-20", status: "Open" }
    ]);

    // Editing states for notes/tasks
    const [editingNote, setEditingNote] = useState(null); // {id, values}
    const [editingTask, setEditingTask] = useState(null); // {id, values}

    // --- Diary operations ---
    const handleScheduleMeeting = () => window.open("https://calendar.google.com", "_blank");

    // Add Note
    const handleSaveNote = () => {
        if (!notesInput.trim()) {
            alert("Write some notes first!");
            return;
        }
        const note = {
            id: Date.now(),
            text: notesInput.trim(),
            date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
            createdBy: role,
        };
        setNotesList([note, ...notesList]);
        setNotesInput("");
        setShowNotesPopup(false);
    };

    // Add Task
    const handleSaveTask = () => {
        if (!taskInput.trim() || !taskAssignedTo) {
            alert("Please enter a task and select an assignee");
            return;
        }
        const t = {
            id: Date.now(),
            task: taskInput.trim(),
            assignedTo: taskAssignedTo,
            dueDate: taskDueDate || "",
            status: taskStatus || "Open",
            createdBy: role,
        };
        setTasksList([t, ...tasksList]);
        setTaskInput("");
        setTaskAssignedTo("");
        setTaskDueDate("");
        setTaskStatus("Open");
        setShowTaskPopup(false);
    };

    // Delete helpers
    const deleteNote = (id) => {
        if (!window.confirm("Delete this note?")) return;
        setNotesList(notesList.filter((n) => n.id !== id));
    };

    const deleteTask = (id) => {
        if (!window.confirm("Delete this task?")) return;
        setTasksList(tasksList.filter((t) => t.id !== id));
    };

    // Save edited note
    const saveEditedNote = () => {
        if (!editingNote || !editingNote.values.text.trim()) {
            alert("Note cannot be empty");
            return;
        }
        setNotesList(
            notesList.map((n) => (n.id === editingNote.id ? { ...n, ...editingNote.values } : n))
        );
        setEditingNote(null);
    };

    // Save edited task
    const saveEditedTask = () => {
        if (!editingTask || !editingTask.values.task.trim() || !editingTask.values.assignedTo) {
            alert("Task and assignee required");
            return;
        }
        setTasksList(tasksList.map((t) => (t.id === editingTask.id ? { ...t, ...editingTask.values } : t)));
        setEditingTask(null);
    };

    // --- JSX ---
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
                        {["KPIs", "Approvals", "Calendar", "Notifications", "Deals & Equity"].map((section) => (
                            <li
                                key={section}
                                className={activeSection === section ? "active" : ""}
                                onClick={() => setActiveSection(section)}
                            >
                                {getSectionTitle(section)}
                            </li>
                        ))}
                        <li className={activeSection === null ? "active" : ""} onClick={() => setActiveSection(null)}>
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

                            <div className="diary-actions">
                                <button onClick={() => setShowNotesPopup(true)}>📝 Take Notes</button>
                                <button onClick={handleScheduleMeeting}>📆 Schedule Meeting</button>
                                <button onClick={() => setShowTaskPopup(true)}>✅ Add Task</button>
                            </div>

                            {/* NOTES & TASKS TABLES (below actions) */}
                            <section className="diary-tables">
                                <div className="diary-table-card">
                                    <div className="section-header">
                                        <h3>Notes</h3>
                                        <small>{notesList.length} entries</small>
                                    </div>

                                    <table className="styled-table">
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Note</th>
                                            <th>By</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {notesList.length === 0 && (
                                            <tr>
                                                <td colSpan="4" style={{ textAlign: "center", opacity: 0.7 }}>
                                                    No notes yet
                                                </td>
                                            </tr>
                                        )}
                                        {notesList.map((n) => (
                                            <tr key={n.id}>
                                                <td>{n.date}</td>
                                                <td>
                                                    {editingNote && editingNote.id === n.id ? (
                                                        <input
                                                            value={editingNote.values.text}
                                                            onChange={(e) =>
                                                                setEditingNote({ ...editingNote, values: { ...editingNote.values, text: e.target.value } })
                                                            }
                                                            style={{ width: "100%" }}
                                                        />
                                                    ) : (
                                                        n.text
                                                    )}
                                                </td>
                                                <td>{n.createdBy}</td>
                                                <td>
                                                    {editingNote && editingNote.id === n.id ? (
                                                        <>
                                                            <button onClick={saveEditedNote}>Save</button>
                                                            <button className="secondary" onClick={() => setEditingNote(null)}>
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    setEditingNote({ id: n.id, values: { text: n.text, date: n.date, createdBy: n.createdBy } })
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="danger" onClick={() => deleteNote(n.id)}>
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="diary-table-card">
                                    <div className="section-header">
                                        <h3>Tasks</h3>
                                        <small>{tasksList.length} tasks</small>
                                    </div>

                                    <table className="styled-table">
                                        <thead>
                                        <tr>
                                            <th>Task</th>
                                            <th>Assigned To</th>
                                            <th>Due</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {tasksList.length === 0 && (
                                            <tr>
                                                <td colSpan="5" style={{ textAlign: "center", opacity: 0.7 }}>
                                                    No tasks yet
                                                </td>
                                            </tr>
                                        )}
                                        {tasksList.map((t) => (
                                            <tr key={t.id}>
                                                <td style={{ minWidth: 220 }}>
                                                    {editingTask && editingTask.id === t.id ? (
                                                        <input
                                                            value={editingTask.values.task}
                                                            onChange={(e) =>
                                                                setEditingTask({ ...editingTask, values: { ...editingTask.values, task: e.target.value } })
                                                            }
                                                            style={{ width: "100%" }}
                                                        />
                                                    ) : (
                                                        t.task
                                                    )}
                                                </td>
                                                <td>
                                                    {editingTask && editingTask.id === t.id ? (
                                                        <select
                                                            value={editingTask.values.assignedTo}
                                                            onChange={(e) =>
                                                                setEditingTask({ ...editingTask, values: { ...editingTask.values, assignedTo: e.target.value } })
                                                            }
                                                        >
                                                            <option value="">--Select--</option>
                                                            {admins.map((a) => (
                                                                <option key={a} value={a}>
                                                                    {a}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        t.assignedTo
                                                    )}
                                                </td>
                                                <td>
                                                    {editingTask && editingTask.id === t.id ? (
                                                        <input
                                                            type="date"
                                                            value={editingTask.values.dueDate}
                                                            onChange={(e) =>
                                                                setEditingTask({ ...editingTask, values: { ...editingTask.values, dueDate: e.target.value } })
                                                            }
                                                        />
                                                    ) : (
                                                        t.dueDate || "-"
                                                    )}
                                                </td>
                                                <td>
                                                    {editingTask && editingTask.id === t.id ? (
                                                        <select
                                                            value={editingTask.values.status}
                                                            onChange={(e) =>
                                                                setEditingTask({ ...editingTask, values: { ...editingTask.values, status: e.target.value } })
                                                            }
                                                        >
                                                            <option>Open</option>
                                                            <option>In Progress</option>
                                                            <option>Done</option>
                                                            <option>Blocked</option>
                                                        </select>
                                                    ) : (
                                                        t.status
                                                    )}
                                                </td>
                                                <td>
                                                    {editingTask && editingTask.id === t.id ? (
                                                        <>
                                                            <button onClick={saveEditedTask}>Save</button>
                                                            <button className="secondary" onClick={() => setEditingTask(null)}>
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() =>
                                                                    setEditingTask({
                                                                        id: t.id,
                                                                        values: {
                                                                            task: t.task,
                                                                            assignedTo: t.assignedTo,
                                                                            dueDate: t.dueDate || "",
                                                                            status: t.status || "Open",
                                                                        },
                                                                    })
                                                                }
                                                            >
                                                                Edit
                                                            </button>
                                                            <button className="danger" onClick={() => deleteTask(t.id)}>
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    )}

                    {/* KPIs, Approvals, Calendar, Notifications sections */}
                    {["KPIs", "Approvals", "Calendar", "Notifications"].map((section) => {
                        const [list] = getListAndSetter(section);
                        const headers = headersMap[section];
                        return (
                            activeSection === section && (
                                <div key={section} className="db-section scrollable">
                                    <div className="section-header">
                                        <h2>{getSectionTitle(section)}</h2>
                                        <span className="add-icon" onClick={() => setShowAddPopup(section)}>
                      ➕
                    </span>
                                    </div>

                                    <table className="styled-table">
                                        <thead>
                                        <tr>
                                            {headers.map((h) => (
                                                <th key={h}>{h}</th>
                                            ))}
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {list.map((item) => (
                                            <tr key={item.id}>
                                                {headers.map((h) => (
                                                    <td key={h}>{item[h.toLowerCase()]}</td>
                                                ))}
                                                <td>
                                                    <select
                                                        onChange={(e) => {
                                                            const action = e.target.value;
                                                            if (action === "delete") {
                                                                const [, setList] = getListAndSetter(section);
                                                                setList(list.filter((row) => row.id !== item.id));
                                                            }
                                                            if (action === "update") {
                                                                setUpdateItem({ section, id: item.id, values: { ...item } });
                                                            }
                                                            e.target.value = "";
                                                        }}
                                                    >
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
                            )
                        );
                    })}

                    {/* Deals & Equity */}
                    {activeSection === "Deals & Equity" && (
                        <div className="db-section scrollable">
                            <h2>💹 Deals & Equity</h2>
                            {Object.keys(dealsEquity).map((sub) => {
                                const headers = headersMap[sub];
                                return (
                                    <div key={sub} className="sub-section">
                                        <div className="section-header">
                                            <h3>{sub}</h3>
                                            <span className="add-icon" onClick={() => setShowAddPopup(sub)}>
                        ➕
                      </span>
                                        </div>

                                        <table className="styled-table">
                                            <thead>
                                            <tr>
                                                {headers.map((h) => (
                                                    <th key={h}>{h}</th>
                                                ))}
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {dealsEquity[sub].map((item) => (
                                                <tr key={item.id}>
                                                    {headers.map((h) => (
                                                        <td key={h}>{item[h.toLowerCase()]}</td>
                                                    ))}
                                                    <td>
                                                        <select
                                                            onChange={(e) => {
                                                                const action = e.target.value;
                                                                if (action === "delete") {
                                                                    setDealsEquity({
                                                                        ...dealsEquity,
                                                                        [sub]: dealsEquity[sub].filter((row) => row.id !== item.id),
                                                                    });
                                                                }
                                                                if (action === "update") {
                                                                    setUpdateItem({ sub, id: item.id, values: { ...item } });
                                                                }
                                                                e.target.value = "";
                                                            }}
                                                        >
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
                        </div>
                    )}
                </main>
            </div>

            {/* Add Popup for generic sections */}
            {showAddPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Add New Entry - {showAddPopup}</h3>
                        {headersMap[showAddPopup].map((h) => (
                            <input
                                key={h}
                                type="text"
                                placeholder={h}
                                value={newItem[h.toLowerCase()] || ""}
                                onChange={(e) => setNewItem({ ...newItem, [h.toLowerCase()]: e.target.value })}
                            />
                        ))}
                        <div className="popup-actions">
                            <button onClick={() => handleAdd(activeSection, showAddPopup)}>Submit</button>
                            <button className="secondary" onClick={() => setShowAddPopup(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Popup for generic sections */}
            {updateItem && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>Update Entry - {updateItem.sub || updateItem.section}</h3>
                        {headersMap[updateItem.sub || updateItem.section].map((h) => (
                            <input
                                key={h}
                                type="text"
                                placeholder={h}
                                value={updateItem.values[h.toLowerCase()] || ""}
                                onChange={(e) =>
                                    setUpdateItem({
                                        ...updateItem,
                                        values: { ...updateItem.values, [h.toLowerCase()]: e.target.value },
                                    })
                                }
                            />
                        ))}
                        <div className="popup-actions">
                            <button onClick={handleUpdate}>Save</button>
                            <button className="secondary" onClick={() => setUpdateItem(null)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notes Popup */}
            {showNotesPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>New Note</h3>
                        <textarea
                            placeholder="Write your notes..."
                            value={notesInput}
                            onChange={(e) => setNotesInput(e.target.value)}
                            rows={6}
                        />
                        <div className="popup-actions">
                            <button onClick={handleSaveNote}>Save Note</button>
                            <button className="secondary" onClick={() => setShowNotesPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Popup */}
            {showTaskPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3>New Task</h3>
                        <input
                            type="text"
                            placeholder="Task description"
                            value={taskInput}
                            onChange={(e) => setTaskInput(e.target.value)}
                        />
                        <label style={{ fontSize: 12, opacity: 0.8 }}>Assign to:</label>
                        <select value={taskAssignedTo} onChange={(e) => setTaskAssignedTo(e.target.value)}>
                            <option value="">--Select Admin--</option>
                            {admins.map((a) => (
                                <option key={a} value={a}>
                                    {a}
                                </option>
                            ))}
                        </select>
                        <label style={{ fontSize: 12, opacity: 0.8 }}>Due date (optional):</label>
                        <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                        <label style={{ fontSize: 12, opacity: 0.8 }}>Status:</label>
                        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Done</option>
                            <option>Blocked</option>
                        </select>

                        <div className="popup-actions">
                            <button onClick={handleSaveTask}>Save Task</button>
                            <button className="secondary" onClick={() => setShowTaskPopup(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

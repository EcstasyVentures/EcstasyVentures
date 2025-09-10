import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHome, FiPieChart, FiUsers, FiDollarSign, FiCheckSquare, FiTrendingUp, FiCreditCard, FiFileText, FiFolder, FiMessageSquare, FiHelpCircle, FiBarChart2, FiSettings, FiBell, FiUser, FiSearch, FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock, FiCheck, FiX, FiFilter, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../styles.css";

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("dashboard");
    const [user, setUser] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [kpiData, setKpiData] = useState({});
    const [approvals, setApprovals] = useState([]);
    const [ventures, setVentures] = useState([]);
    const [founders, setFounders] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newItem, setNewItem] = useState({});

    // Check if user is logged in
    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (!username || role !== "admin") {
            navigate("/");
            return;
        }

        setUser({ username, role });

        // Mock data fetching
        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = () => {
        // Mock KPI data
        setKpiData({
            activeVentures: 24,
            portfolioARR: "$4.2M",
            revenueShare: "$1.8M",
            tasksDue: 12,
            invoicesPending: 7
        });

        // Mock approvals
        setApprovals([
            { id: 1, type: "Contract", title: "Term Sheet - TechStart", status: "pending", date: "2023-06-15" },
            { id: 2, type: "Payout", title: "Q2 Dividend - HealthPlus", status: "pending", date: "2023-06-18" },
            { id: 3, type: "Content", title: "Blog Post - AI Trends", status: "pending", date: "2023-06-20" }
        ]);

        // Mock ventures
        setVentures([
            { id: 1, name: "TechStart", stage: "Scaling", industry: "SaaS", revenue: "$1.2M", risk: "Medium" },
            { id: 2, name: "HealthPlus", stage: "Live", industry: "HealthTech", revenue: "$850K", risk: "Low" },
            { id: 3, name: "EduFuture", stage: "Build", industry: "EdTech", revenue: "$420K", risk: "High" }
        ]);

        // Mock founders
        setFounders([
            { id: 1, name: "Alex Johnson", company: "TechStart", kyc: "Verified", contracts: 3 },
            { id: 2, name: "Maria Garcia", company: "HealthPlus", kyc: "Pending", contracts: 2 },
            { id: 3, name: "Samuel Lee", company: "EduFuture", kyc: "Verified", contracts: 1 }
        ]);

        // Mock tasks
        setTasks([
            { id: 1, title: "Review Term Sheet", assignee: "You", dueDate: "2023-06-16", status: "todo" },
            { id: 2, title: "Prepare Investor Report", assignee: "Jane", dueDate: "2023-06-18", status: "inProgress" },
            { id: 3, title: "Schedule Board Meeting", assignee: "You", dueDate: "2023-06-20", status: "done" }
        ]);

        // Mock notifications
        setNotifications([
            { id: 1, category: "Finance", message: "New invoice received from TechStart", time: "2 hours ago" },
            { id: 2, category: "Legal", message: "Contract renewal due for HealthPlus", time: "5 hours ago" },
            { id: 3, category: "Tech", message: "System maintenance scheduled for tonight", time: "1 day ago" }
        ]);
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    };

    const handleAddItem = (type) => {
        setNewItem({ type });
        setShowAddModal(true);
    };

    const handleDeleteItem = (id, type) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            // In a real app, this would call an API
            alert(`Deleted ${type} with ID: ${id}`);
        }
    };

    const handleApprove = (id) => {
        // In a real app, this would call an API
        alert(`Approved item with ID: ${id}`);
    };

    const handleReject = (id) => {
        // In a real app, this would call an API
        alert(`Rejected item with ID: ${id}`);
    };

    const renderDashboardHome = () => (
        <div className="dashboard-home">
            <div className="dashboard-section">
                <h2>KPI Overview</h2>
                <div className="kpi-cards">
                    <div className="kpi-card">
                        <div className="kpi-icon ventures">
                            <FiPieChart />
                        </div>
                        <div className="kpi-details">
                            <h3>{kpiData.activeVentures}</h3>
                            <p>Active Ventures</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon arr">
                            <FiDollarSign />
                        </div>
                        <div className="kpi-details">
                            <h3>{kpiData.portfolioARR}</h3>
                            <p>Portfolio ARR</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon revenue">
                            <FiTrendingUp />
                        </div>
                        <div className="kpi-details">
                            <h3>{kpiData.revenueShare}</h3>
                            <p>Revenue Share</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon tasks">
                            <FiCheckSquare />
                        </div>
                        <div className="kpi-details">
                            <h3>{kpiData.tasksDue}</h3>
                            <p>Tasks Due</p>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon invoices">
                            <FiCreditCard />
                        </div>
                        <div className="kpi-details">
                            <h3>{kpiData.invoicesPending}</h3>
                            <p>Invoices Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Pending Approvals</h2>
                        <button className="btn-icon" onClick={() => handleAddItem("approval")}>
                            <FiPlus />
                        </button>
                    </div>
                    <div className="approvals-list">
                        {approvals.map(item => (
                            <div key={item.id} className="approval-item">
                                <div className="approval-info">
                                    <span className={`approval-type ${item.type.toLowerCase()}`}>{item.type}</span>
                                    <h3>{item.title}</h3>
                                    <p>Due: {item.date}</p>
                                </div>
                                <div className="approval-actions">
                                    <button className="btn-approve" onClick={() => handleApprove(item.id)}>
                                        <FiCheck /> Approve
                                    </button>
                                    <button className="btn-reject" onClick={() => handleReject(item.id)}>
                                        <FiX /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Notifications</h2>
                        <button className="btn-icon">
                            <FiBell />
                        </button>
                    </div>
                    <div className="notifications-feed">
                        {notifications.map(notif => (
                            <div key={notif.id} className="notification-item">
                                <span className={`notif-category ${notif.category.toLowerCase()}`}>{notif.category}</span>
                                <p>{notif.message}</p>
                                <span className="notif-time">{notif.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard-section">
                <div className="section-header">
                    <h2>Upcoming Events</h2>
                    <button className="btn-icon" onClick={() => handleAddItem("event")}>
                        <FiPlus />
                    </button>
                </div>
                <div className="calendar-view">
                    <div className="calendar-header">
                        <h3>June 2023</h3>
                        <div className="calendar-nav">
                            <button className="btn-icon"><FiChevronLeft /></button>
                            <button className="btn-icon"><FiChevronRight /></button>
                        </div>
                    </div>
                    <div className="calendar-grid">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                        ))}
                        {Array.from({ length: 30 }, (_, i) => (
                            <div key={i} className={`calendar-day ${i === 14 ? 'has-event' : ''}`}>
                                <span>{i + 1}</span>
                                {i === 14 && <div className="event-dot"></div>}
                            </div>
                        ))}
                    </div>
                    <div className="event-list">
                        <div className="event-item">
                            <div className="event-date">
                                <span className="event-day">15</span>
                                <span className="event-month">Jun</span>
                            </div>
                            <div className="event-details">
                                <h4>Board Meeting</h4>
                                <p>10:00 AM - 12:00 PM</p>
                            </div>
                        </div>
                        <div className="event-item">
                            <div className="event-date">
                                <span className="event-day">20</span>
                                <span className="event-month">Jun</span>
                            </div>
                            <div className="event-details">
                                <h4>Investor Pitch</h4>
                                <p>2:00 PM - 4:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderVenturesManagement = () => (
        <div className="ventures-management">
            <div className="section-header">
                <h2>Ventures Pipeline</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("venture")}>
                        <FiPlus /> Add Venture
                    </button>
                </div>
            </div>

            <div className="pipeline-stages">
                {['Lead', 'Diligence', 'Term Sheet', 'Build', 'Live', 'Scaling', 'Exit'].map(stage => (
                    <div key={stage} className="pipeline-stage">
                        <h3>{stage}</h3>
                        <div className="stage-ventures">
                            {ventures
                                .filter(v => v.stage === stage)
                                .map(venture => (
                                    <div key={venture.id} className="venture-card">
                                        <div className="venture-header">
                                            <h4>{venture.name}</h4>
                                            <div className="venture-actions">
                                                <button className="btn-icon" onClick={() => handleDeleteItem(venture.id, "venture")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="venture-details">
                                            <p><span>Industry:</span> {venture.industry}</p>
                                            <p><span>Revenue:</span> {venture.revenue}</p>
                                            <p><span>Risk:</span>
                                                <span className={`risk-badge ${venture.risk.toLowerCase()}`}>
                                                    {venture.risk}
                                                </span>
                                            </p>
                                        </div>
                                        <button className="btn-secondary">View Details</button>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFoundersDirectory = () => (
        <div className="founders-directory">
            <div className="section-header">
                <h2>Founders Directory</h2>
                <div className="header-actions">
                    <div className="search-bar">
                        <FiSearch />
                        <input type="text" placeholder="Search founders..." />
                    </div>
                    <button className="btn-primary" onClick={() => handleAddItem("founder")}>
                        <FiPlus /> Add Founder
                    </button>
                </div>
            </div>

            <div className="founders-table-container">
                <table className="founders-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>KYC Status</th>
                        <th>Contracts</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {founders.map(founder => (
                        <tr key={founder.id}>
                            <td className="founder-name">
                                <div className="founder-avatar">
                                    {founder.name.charAt(0)}
                                </div>
                                {founder.name}
                            </td>
                            <td>{founder.company}</td>
                            <td>
                                    <span className={`status-badge ${founder.kyc.toLowerCase()}`}>
                                        {founder.kyc}
                                    </span>
                            </td>
                            <td>{founder.contracts}</td>
                            <td>
                                <button className="btn-text">Contact</button>
                            </td>
                            <td>
                                <div className="table-actions">
                                    <button className="btn-icon">
                                        <FiEdit />
                                    </button>
                                    <button className="btn-icon" onClick={() => handleDeleteItem(founder.id, "founder")}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderTasksSprints = () => (
        <div className="tasks-sprints">
            <div className="section-header">
                <h2>Task Management</h2>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => handleAddItem("task")}>
                        <FiPlus /> Add Task
                    </button>
                </div>
            </div>

            <div className="kanban-board">
                {['To Do', 'In Progress', 'Done'].map(status => (
                    <div key={status} className="kanban-column">
                        <h3>{status}</h3>
                        <div className="task-list">
                            {tasks
                                .filter(task => task.status === status.toLowerCase().replace(' ', ''))
                                .map(task => (
                                    <div key={task.id} className="task-card">
                                        <div className="task-header">
                                            <h4>{task.title}</h4>
                                            <div className="task-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(task.id, "task")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="task-details">
                                            <p><span>Assignee:</span> {task.assignee}</p>
                                            <p><span>Due Date:</span> {task.dueDate}</p>
                                        </div>
                                        <div className="task-footer">
                                            <span className={`task-priority ${task.status === 'done' ? 'completed' : 'pending'}`}>
                                                {task.status === 'done' ? 'Completed' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return renderDashboardHome();
            case "ventures":
                return renderVenturesManagement();
            case "founders":
                return renderFoundersDirectory();
            case "tasks":
                return renderTasksSprints();
            default:
                return renderDashboardHome();
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="sidebar-header">
                    <div className="logo">
                        <img src="/logo.jpg" alt="Ecstasy Ventures" />
                        <span>Ecstasy Ventures</span>
                    </div>
                    <p>Admin Portal</p>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <FiHome />
                        <span>Dashboard</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "ventures" ? "active" : ""}`}
                        onClick={() => setActiveTab("ventures")}
                    >
                        <FiPieChart />
                        <span>Ventures</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "founders" ? "active" : ""}`}
                        onClick={() => setActiveTab("founders")}
                    >
                        <FiUsers />
                        <span>Founders</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "deals" ? "active" : ""}`}
                        onClick={() => setActiveTab("deals")}
                    >
                        <FiDollarSign />
                        <span>Deals & Equity</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
                        onClick={() => setActiveTab("tasks")}
                    >
                        <FiCheckSquare />
                        <span>Tasks & Sprints</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "growth" ? "active" : ""}`}
                        onClick={() => setActiveTab("growth")}
                    >
                        <FiTrendingUp />
                        <span>Growth & Marketing</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "finance" ? "active" : ""}`}
                        onClick={() => setActiveTab("finance")}
                    >
                        <FiCreditCard />
                        <span>Finance</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "legal" ? "active" : ""}`}
                        onClick={() => setActiveTab("legal")}
                    >
                        <FiFileText />
                        <span>Legal & Compliance</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "documents" ? "active" : ""}`}
                        onClick={() => setActiveTab("documents")}
                    >
                        <FiFolder />
                        <span>Documents</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "crm" ? "active" : ""}`}
                        onClick={() => setActiveTab("crm")}
                    >
                        <FiMessageSquare />
                        <span>CRM & Outreach</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "support" ? "active" : ""}`}
                        onClick={() => setActiveTab("support")}
                    >
                        <FiHelpCircle />
                        <span>Support & Tickets</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
                        onClick={() => setActiveTab("reports")}
                    >
                        <FiBarChart2 />
                        <span>Reports & Analytics</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "automations" ? "active" : ""}`}
                        onClick={() => setActiveTab("automations")}
                    >
                        <FiSettings />
                        <span>Automations</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "users" ? "active" : ""}`}
                        onClick={() => setActiveTab("users")}
                    >
                        <FiUsers />
                        <span>Users & Teams</span>
                    </button>
                    <button
                        className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        <FiSettings />
                        <span>Settings</span>
                    </button>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="main-content">
                <div className="topbar">
                    <div className="search-bar">
                        <FiSearch />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="topbar-actions">
                        <button className="btn-icon">
                            <FiBell />
                            <span className="notification-badge">3</span>
                        </button>
                        <div className="user-profile">
                            <div className="user-avatar">
                                {user?.username?.charAt(0)}
                            </div>
                            <div className="user-info">
                                <p>{user?.username}</p>
                                <span>Admin</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content">
                    {renderContent()}
                </div>
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <button className="close-btn" onClick={() => setShowAddModal(false)}>
                            ✕
                        </button>
                        <h2>Add New {newItem.type}</h2>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" placeholder={`Enter ${newItem.type} name`} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea placeholder={`Enter ${newItem.type} description`}></textarea>
                            </div>
                            <button type="submit" className="btn-primary">
                                Add {newItem.type}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
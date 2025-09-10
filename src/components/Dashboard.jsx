import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiHome, FiPieChart, FiUsers, FiDollarSign, FiCheckSquare, FiTrendingUp, FiCreditCard,
    FiFileText, FiFolder, FiMessageSquare, FiHelpCircle, FiBarChart2, FiSettings, FiBell, FiUser,
    FiSearch, FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock, FiCheck, FiX, FiFilter, FiDownload,
    FiChevronLeft, FiChevronRight, FiMail, FiPhone, FiLock, FiDatabase, FiShare2, FiActivity,
    FiUserCheck, FiTool, FiShield, FiDroplet, FiAward, FiBriefcase, FiTarget, FiZap, FiGrid,
    FiUserPlus, FiCreditCard as FiCard, FiImage, FiVideo, FiFile
} from "react-icons/fi";
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

    // New state variables for all sections
    const [termSheets, setTermSheets] = useState([]);
    const [capTable, setCapTable] = useState([]);
    const [equityLedger, setEquityLedger] = useState([]);
    const [vestingSchedules, setVestingSchedules] = useState([]);
    const [contentCalendar, setContentCalendar] = useState([]);
    const [assetLibrary, setAssetLibrary] = useState([]);
    const [campaigns, setCampaigns] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [revenueShare, setRevenueShare] = useState({});
    const [profitLoss, setProfitLoss] = useState({});
    const [contracts, setContracts] = useState([]);
    const [complianceCalendar, setComplianceCalendar] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [investors, setInvestors] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [reports, setReports] = useState([]);
    const [automations, setAutomations] = useState([]);
    const [teams, setTeams] = useState([]);
    const [settings, setSettings] = useState({});

    // Check if user is logged in
    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        if (!username || role !== "admin") {
            navigate("/");
            return;
        }

        setUser({ username, role });

        // Initialize with empty data
        initializeEmptyData();
    }, [navigate]);

    const initializeEmptyData = () => {
        // KPI data
        setKpiData({
            activeVentures: 0,
            portfolioARR: "$0",
            revenueShare: "$0",
            tasksDue: 0,
            invoicesPending: 0
        });

        // Empty arrays for all sections
        setApprovals([]);
        setVentures([]);
        setFounders([]);
        setTasks([]);
        setTermSheets([]);
        setCapTable([]);
        setEquityLedger([]);
        setVestingSchedules([]);
        setContentCalendar([]);
        setAssetLibrary([]);
        setCampaigns([]);
        setInvoices([]);
        setRevenueShare({});
        setProfitLoss({});
        setContracts([]);
        setComplianceCalendar([]);
        setDocuments([]);
        setInvestors([]);
        setTickets([]);
        setReports([]);
        setAutomations([]);
        setTeams([]);
        setSettings({});
        setNotifications([]);
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    };

    const handleAddItem = (type, data = {}) => {
        setNewItem({ type, ...data });
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
                        {approvals.length === 0 ? (
                            <div className="empty-state">
                                <p>No pending approvals</p>
                                <button className="btn-primary" onClick={() => handleAddItem("approval")}>
                                    Add Approval
                                </button>
                            </div>
                        ) : (
                            approvals.map(item => (
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
                            ))
                        )}
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
                        {notifications.length === 0 ? (
                            <div className="empty-state">
                                <p>No notifications</p>
                            </div>
                        ) : (
                            notifications.map(notif => (
                                <div key={notif.id} className="notification-item">
                                    <span className={`notif-category ${notif.category.toLowerCase()}`}>{notif.category}</span>
                                    <p>{notif.message}</p>
                                    <span className="notif-time">{notif.time}</span>
                                </div>
                            ))
                        )}
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
                            {ventures.filter(v => v.stage === stage).length === 0 && (
                                <div className="empty-stage">
                                    <p>No ventures in this stage</p>
                                    <button className="btn-text" onClick={() => handleAddItem("venture", { stage })}>
                                        Add Venture
                                    </button>
                                </div>
                            )}
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
                    {founders.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="empty-table">
                                <p>No founders found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("founder")}>
                                    Add Founder
                                </button>
                            </td>
                        </tr>
                    ) : (
                        founders.map(founder => (
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
                        ))
                    )}
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
                            {tasks.filter(task => task.status === status.toLowerCase().replace(' ', '')).length === 0 && (
                                <div className="empty-column">
                                    <p>No tasks</p>
                                    <button className="btn-text" onClick={() => handleAddItem("task", { status })}>
                                        Add Task
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDealsEquity = () => (
        <div className="deals-equity">
            <div className="section-header">
                <h2>Deals & Equity Management</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("termSheet")}>
                        <FiPlus /> Add Term Sheet
                    </button>
                </div>
            </div>

            <div className="deals-tabs">
                <button className={`tab-btn ${activeTab === 'termSheets' ? 'active' : ''}`} onClick={() => setActiveTab('termSheets')}>
                    Term Sheets
                </button>
                <button className={`tab-btn ${activeTab === 'capTable' ? 'active' : ''}`} onClick={() => setActiveTab('capTable')}>
                    Cap Table
                </button>
                <button className={`tab-btn ${activeTab === 'equityLedger' ? 'active' : ''}`} onClick={() => setActiveTab('equityLedger')}>
                    Equity Ledger
                </button>
                <button className={`tab-btn ${activeTab === 'vesting' ? 'active' : ''}`} onClick={() => setActiveTab('vesting')}>
                    Vesting Schedules
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'termSheets' && (
                    <div className="term-sheets">
                        {termSheets.length === 0 ? (
                            <div className="empty-state">
                                <p>No term sheets found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("termSheet")}>
                                    Add Term Sheet
                                </button>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {termSheets.map(sheet => (
                                    <div key={sheet.id} className="card">
                                        <div className="card-header">
                                            <h3>{sheet.title}</h3>
                                            <div className="card-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(sheet.id, "termSheet")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p><span>Company:</span> {sheet.company}</p>
                                            <p><span>Amount:</span> {sheet.amount}</p>
                                            <p><span>Status:</span>
                                                <span className={`status-badge ${sheet.status.toLowerCase()}`}>
                                                    {sheet.status}
                                                </span>
                                            </p>
                                        </div>
                                        <button className="btn-secondary">View Details</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'capTable' && (
                    <div className="cap-table">
                        {capTable.length === 0 ? (
                            <div className="empty-state">
                                <p>No cap table data found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("capTable")}>
                                    Add Cap Table Entry
                                </button>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Shareholder</th>
                                        <th>Shares</th>
                                        <th>Percentage</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {capTable.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.shareholder}</td>
                                            <td>{entry.shares}</td>
                                            <td>{entry.percentage}%</td>
                                            <td>{entry.type}</td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "capTable")}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'equityLedger' && (
                    <div className="equity-ledger">
                        {equityLedger.length === 0 ? (
                            <div className="empty-state">
                                <p>No equity ledger entries found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("equityLedger")}>
                                    Add Equity Entry
                                </button>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {equityLedger.map((entry, index) => (
                                    <div key={index} className="card">
                                        <div className="card-header">
                                            <h3>{entry.service}</h3>
                                            <div className="card-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "equityLedger")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p><span>Provider:</span> {entry.provider}</p>
                                            <p><span>Equity:</span> {entry.equity}%</p>
                                            <p><span>Date:</span> {entry.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'vesting' && (
                    <div className="vesting-schedules">
                        {vestingSchedules.length === 0 ? (
                            <div className="empty-state">
                                <p>No vesting schedules found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("vestingSchedule")}>
                                    Add Vesting Schedule
                                </button>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {vestingSchedules.map((schedule, index) => (
                                    <div key={index} className="card">
                                        <div className="card-header">
                                            <h3>{schedule.title}</h3>
                                            <div className="card-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "vestingSchedule")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p><span>Recipient:</span> {schedule.recipient}</p>
                                            <p><span>Total Equity:</span> {schedule.totalEquity}%</p>
                                            <p><span>Vesting Period:</span> {schedule.vestingPeriod}</p>
                                            <p><span>Start Date:</span> {schedule.startDate}</p>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress" style={{ width: `${schedule.vestedPercentage}%` }}></div>
                                            <span>{schedule.vestedPercentage}% vested</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderGrowthMarketing = () => (
        <div className="growth-marketing">
            <div className="section-header">
                <h2>Growth & Marketing</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("content")}>
                        <FiPlus /> Add Content
                    </button>
                </div>
            </div>

            <div className="growth-tabs">
                <button className={`tab-btn ${activeTab === 'contentCalendar' ? 'active' : ''}`} onClick={() => setActiveTab('contentCalendar')}>
                    Content Calendar
                </button>
                <button className={`tab-btn ${activeTab === 'assetLibrary' ? 'active' : ''}`} onClick={() => setActiveTab('assetLibrary')}>
                    Asset Library
                </button>
                <button className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
                    Campaigns
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'contentCalendar' && (
                    <div className="content-calendar">
                        {contentCalendar.length === 0 ? (
                            <div className="empty-state">
                                <p>No content scheduled</p>
                                <button className="btn-primary" onClick={() => handleAddItem("content")}>
                                    Schedule Content
                                </button>
                            </div>
                        ) : (
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
                                        <div key={i} className={`calendar-day ${i === 14 || i === 20 ? 'has-event' : ''}`}>
                                            <span>{i + 1}</span>
                                            {(i === 14 || i === 20) && <div className="event-dot"></div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="content-list">
                                    {contentCalendar.map((content, index) => (
                                        <div key={index} className="content-item">
                                            <div className="content-date">
                                                <span className="content-day">{content.day}</span>
                                                <span className="content-month">{content.month}</span>
                                            </div>
                                            <div className="content-details">
                                                <h4>{content.title}</h4>
                                                <p>{content.platform}</p>
                                                <p><span>Status:</span>
                                                    <span className={`status-badge ${content.status.toLowerCase()}`}>
                                                        {content.status}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="content-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "content")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'assetLibrary' && (
                    <div className="asset-library">
                        {assetLibrary.length === 0 ? (
                            <div className="empty-state">
                                <p>No assets found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("asset")}>
                                    Add Asset
                                </button>
                            </div>
                        ) : (
                            <div className="assets-grid">
                                {assetLibrary.map((asset, index) => (
                                    <div key={index} className="asset-card">
                                        <div className="asset-preview">
                                            <div className="asset-icon">
                                                <FiFolder />
                                            </div>
                                        </div>
                                        <div className="asset-info">
                                            <h3>{asset.name}</h3>
                                            <p>{asset.type}</p>
                                            <p>{asset.size}</p>
                                        </div>
                                        <div className="asset-actions">
                                            <button className="btn-icon">
                                                <FiDownload />
                                            </button>
                                            <button className="btn-icon">
                                                <FiEdit />
                                            </button>
                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "asset")}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <div className="campaigns">
                        {campaigns.length === 0 ? (
                            <div className="empty-state">
                                <p>No campaigns found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("campaign")}>
                                    Create Campaign
                                </button>
                            </div>
                        ) : (
                            <div className="campaigns-grid">
                                {campaigns.map((campaign, index) => (
                                    <div key={index} className="campaign-card">
                                        <div className="campaign-header">
                                            <h3>{campaign.name}</h3>
                                            <div className="campaign-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "campaign")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="campaign-body">
                                            <p><span>Platform:</span> {campaign.platform}</p>
                                            <p><span>Budget:</span> {campaign.budget}</p>
                                            <p><span>Duration:</span> {campaign.duration}</p>
                                            <p><span>Status:</span>
                                                <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                                                    {campaign.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="campaign-stats">
                                            <div className="stat">
                                                <span className="stat-value">{campaign.impressions}</span>
                                                <span className="stat-label">Impressions</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-value">{campaign.clicks}</span>
                                                <span className="stat-label">Clicks</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-value">{campaign.conversions}</span>
                                                <span className="stat-label">Conversions</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderFinance = () => (
        <div className="finance">
            <div className="section-header">
                <h2>Finance Management</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("invoice")}>
                        <FiPlus /> Add Invoice
                    </button>
                </div>
            </div>

            <div className="finance-tabs">
                <button className={`tab-btn ${activeTab === 'invoices' ? 'active' : ''}`} onClick={() => setActiveTab('invoices')}>
                    Invoices
                </button>
                <button className={`tab-btn ${activeTab === 'revenueShare' ? 'active' : ''}`} onClick={() => setActiveTab('revenueShare')}>
                    Revenue Share
                </button>
                <button className={`tab-btn ${activeTab === 'profitLoss' ? 'active' : ''}`} onClick={() => setActiveTab('profitLoss')}>
                    Profit & Loss
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'invoices' && (
                    <div className="invoices">
                        {invoices.length === 0 ? (
                            <div className="empty-state">
                                <p>No invoices found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("invoice")}>
                                    Create Invoice
                                </button>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Invoice #</th>
                                        <th>Client</th>
                                        <th>Amount</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {invoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td>{invoice.number}</td>
                                            <td>{invoice.client}</td>
                                            <td>{invoice.amount}</td>
                                            <td>{invoice.dueDate}</td>
                                            <td>
                                                    <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                                                        {invoice.status}
                                                    </span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "invoice")}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'revenueShare' && (
                    <div className="revenue-share">
                        {Object.keys(revenueShare).length === 0 ? (
                            <div className="empty-state">
                                <p>No revenue share data available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("revenueShare")}>
                                    Add Revenue Data
                                </button>
                            </div>
                        ) : (
                            <div className="revenue-cards">
                                <div className="revenue-card">
                                    <h3>Total Revenue</h3>
                                    <div className="revenue-value">{revenueShare.totalRevenue}</div>
                                    <div className="revenue-change positive">
                                        <FiTrendingUp /> {revenueShare.revenueChange}% from last quarter
                                    </div>
                                </div>
                                <div className="revenue-card">
                                    <h3>Venture Share</h3>
                                    <div className="revenue-value">{revenueShare.ventureShare}</div>
                                    <div className="revenue-change positive">
                                        <FiTrendingUp /> {revenueShare.ventureChange}% from last quarter
                                    </div>
                                </div>
                                <div className="revenue-card">
                                    <h3>Platform Share</h3>
                                    <div className="revenue-value">{revenueShare.platformShare}</div>
                                    <div className="revenue-change negative">
                                        <FiTrendingUp /> {revenueShare.platformChange}% from last quarter
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profitLoss' && (
                    <div className="profit-loss">
                        {Object.keys(profitLoss).length === 0 ? (
                            <div className="empty-state">
                                <p>No profit & loss data available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("profitLoss")}>
                                    Add P&L Data
                                </button>
                            </div>
                        ) : (
                            <div className="pl-container">
                                <div className="pl-summary">
                                    <div className="pl-card income">
                                        <h3>Total Income</h3>
                                        <div className="pl-value">{profitLoss.totalIncome}</div>
                                    </div>
                                    <div className="pl-card expenses">
                                        <h3>Total Expenses</h3>
                                        <div className="pl-value">{profitLoss.totalExpenses}</div>
                                    </div>
                                    <div className="pl-card profit">
                                        <h3>Net Profit</h3>
                                        <div className="pl-value">{profitLoss.netProfit}</div>
                                    </div>
                                </div>
                                <div className="pl-chart">
                                    <h3>Profit & Loss Trend</h3>
                                    <div className="chart-placeholder">
                                        <p>Chart visualization would appear here</p>
                                    </div>
                                </div>
                                <div className="pl-breakdown">
                                    <h3>Expense Breakdown</h3>
                                    <div className="breakdown-grid">
                                        {profitLoss.expenseBreakdown.map((expense, index) => (
                                            <div key={index} className="expense-item">
                                                <div className="expense-category">{expense.category}</div>
                                                <div className="expense-amount">{expense.amount}</div>
                                                <div className="expense-percentage">{expense.percentage}%</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderLegalCompliance = () => (
        <div className="legal-compliance">
            <div className="section-header">
                <h2>Legal & Compliance</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("contract")}>
                        <FiPlus /> Add Contract
                    </button>
                </div>
            </div>

            <div className="legal-tabs">
                <button className={`tab-btn ${activeTab === 'contracts' ? 'active' : ''}`} onClick={() => setActiveTab('contracts')}>
                    Contract Library
                </button>
                <button className={`tab-btn ${activeTab === 'complianceCalendar' ? 'active' : ''}`} onClick={() => setActiveTab('complianceCalendar')}>
                    Compliance Calendar
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'contracts' && (
                    <div className="contracts">
                        {contracts.length === 0 ? (
                            <div className="empty-state">
                                <p>No contracts found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("contract")}>
                                    Add Contract
                                </button>
                            </div>
                        ) : (
                            <div className="contracts-grid">
                                {contracts.map((contract, index) => (
                                    <div key={index} className="contract-card">
                                        <div className="contract-header">
                                            <h3>{contract.title}</h3>
                                            <div className="contract-actions">
                                                <button className="btn-icon">
                                                    <FiDownload />
                                                </button>
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "contract")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="contract-body">
                                            <p><span>Party:</span> {contract.party}</p>
                                            <p><span>Type:</span> {contract.type}</p>
                                            <p><span>Start Date:</span> {contract.startDate}</p>
                                            <p><span>End Date:</span> {contract.endDate}</p>
                                            <p><span>Status:</span>
                                                <span className={`status-badge ${contract.status.toLowerCase()}`}>
                                                    {contract.status}
                                                </span>
                                            </p>
                                        </div>
                                        {contract.status === 'Pending' && (
                                            <div className="contract-signing">
                                                <button className="btn-primary">
                                                    <FiLock /> e-Sign Document
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'complianceCalendar' && (
                    <div className="compliance-calendar">
                        {complianceCalendar.length === 0 ? (
                            <div className="empty-state">
                                <p>No compliance events scheduled</p>
                                <button className="btn-primary" onClick={() => handleAddItem("complianceEvent")}>
                                    Add Compliance Event
                                </button>
                            </div>
                        ) : (
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
                                        <div key={i} className={`calendar-day ${i === 10 || i === 25 ? 'has-event' : ''}`}>
                                            <span>{i + 1}</span>
                                            {(i === 10 || i === 25) && <div className="event-dot"></div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="compliance-list">
                                    {complianceCalendar.map((event, index) => (
                                        <div key={index} className="compliance-item">
                                            <div className="compliance-date">
                                                <span className="compliance-day">{event.day}</span>
                                                <span className="compliance-month">{event.month}</span>
                                            </div>
                                            <div className="compliance-details">
                                                <h4>{event.title}</h4>
                                                <p>{event.type}</p>
                                                <p><span>Priority:</span>
                                                    <span className={`priority-badge ${event.priority.toLowerCase()}`}>
                                                        {event.priority}
                                                    </span>
                                                </p>
                                            </div>
                                            <div className="compliance-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "complianceEvent")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderDocumentsAssets = () => (
        <div className="documents-assets">
            <div className="section-header">
                <h2>Documents & Assets</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("document")}>
                        <FiPlus /> Upload Document
                    </button>
                </div>
            </div>

            <div className="documents-container">
                {documents.length === 0 ? (
                    <div className="empty-state">
                        <p>No documents found</p>
                        <button className="btn-primary" onClick={() => handleAddItem("document")}>
                            Upload Document
                        </button>
                    </div>
                ) : (
                    <div className="documents-grid">
                        {documents.map((doc, index) => (
                            <div key={index} className="document-card">
                                <div className="document-preview">
                                    <div className="document-icon">
                                        {doc.type === 'pdf' ? <FiFileText /> :
                                            doc.type === 'image' ? <FiImage /> :
                                                doc.type === 'video' ? <FiVideo /> :
                                                    <FiFile />}
                                    </div>
                                </div>
                                <div className="document-info">
                                    <h3>{doc.name}</h3>
                                    <p>{doc.category}</p>
                                    <p>{doc.size}</p>
                                    <p><span>Access:</span> {doc.accessLevel}</p>
                                </div>
                                <div className="document-actions">
                                    <button className="btn-icon">
                                        <FiDownload />
                                    </button>
                                    <button className="btn-icon">
                                        <FiEdit />
                                    </button>
                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "document")}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderCrmOutreach = () => (
        <div className="crm-outreach">
            <div className="section-header">
                <h2>CRM & Outreach</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("investor")}>
                        <FiPlus /> Add Contact
                    </button>
                </div>
            </div>

            <div className="crm-tabs">
                <button className={`tab-btn ${activeTab === 'investors' ? 'active' : ''}`} onClick={() => setActiveTab('investors')}>
                    Investors
                </button>
                <button className={`tab-btn ${activeTab === 'mentors' ? 'active' : ''}`} onClick={() => setActiveTab('mentors')}>
                    Mentors
                </button>
                <button className={`tab-btn ${activeTab === 'partners' ? 'active' : ''}`} onClick={() => setActiveTab('partners')}>
                    Partners
                </button>
                <button className={`tab-btn ${activeTab === 'campaigns' ? 'active' : ''}`} onClick={() => setActiveTab('campaigns')}>
                    Campaigns
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'investors' && (
                    <div className="investors">
                        {investors.filter(i => i.type === 'investor').length === 0 ? (
                            <div className="empty-state">
                                <p>No investors found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'investor' })}>
                                    Add Investor
                                </button>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Firm</th>
                                        <th>Contact</th>
                                        <th>Stage</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {investors
                                        .filter(i => i.type === 'investor')
                                        .map((investor, index) => (
                                            <tr key={index}>
                                                <td className="contact-name">
                                                    <div className="contact-avatar">
                                                        {investor.name.charAt(0)}
                                                    </div>
                                                    {investor.name}
                                                </td>
                                                <td>{investor.firm}</td>
                                                <td>
                                                    <div className="contact-info">
                                                        <div className="contact-email">
                                                            <FiMail /> {investor.email}
                                                        </div>
                                                        <div className="contact-phone">
                                                            <FiPhone /> {investor.phone}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                        <span className={`status-badge ${investor.stage.toLowerCase()}`}>
                                                            {investor.stage}
                                                        </span>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon">
                                                            <FiMail />
                                                        </button>
                                                        <button className="btn-icon">
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                            <FiTrash2 />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'mentors' && (
                    <div className="mentors">
                        {investors.filter(i => i.type === 'mentor').length === 0 ? (
                            <div className="empty-state">
                                <p>No mentors found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'mentor' })}>
                                    Add Mentor
                                </button>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {investors
                                    .filter(i => i.type === 'mentor')
                                    .map((mentor, index) => (
                                        <div key={index} className="card">
                                            <div className="card-header">
                                                <h3>{mentor.name}</h3>
                                                <div className="card-actions">
                                                    <button className="btn-icon">
                                                        <FiMail />
                                                    </button>
                                                    <button className="btn-icon">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p><span>Expertise:</span> {mentor.expertise}</p>
                                                <p><span>Email:</span> {mentor.email}</p>
                                                <p><span>Phone:</span> {mentor.phone}</p>
                                                <p><span>Availability:</span> {mentor.availability}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div className="partners">
                        {investors.filter(i => i.type === 'partner').length === 0 ? (
                            <div className="empty-state">
                                <p>No partners found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'partner' })}>
                                    Add Partner
                                </button>
                            </div>
                        ) : (
                            <div className="cards-grid">
                                {investors
                                    .filter(i => i.type === 'partner')
                                    .map((partner, index) => (
                                        <div key={index} className="card">
                                            <div className="card-header">
                                                <h3>{partner.name}</h3>
                                                <div className="card-actions">
                                                    <button className="btn-icon">
                                                        <FiMail />
                                                    </button>
                                                    <button className="btn-icon">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <p><span>Company:</span> {partner.company}</p>
                                                <p><span>Industry:</span> {partner.industry}</p>
                                                <p><span>Email:</span> {partner.email}</p>
                                                <p><span>Partnership Type:</span> {partner.partnershipType}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'campaigns' && (
                    <div className="campaigns">
                        {campaigns.length === 0 ? (
                            <div className="empty-state">
                                <p>No campaigns found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("campaign")}>
                                    Create Campaign
                                </button>
                            </div>
                        ) : (
                            <div className="campaigns-grid">
                                {campaigns.map((campaign, index) => (
                                    <div key={index} className="campaign-card">
                                        <div className="campaign-header">
                                            <h3>{campaign.name}</h3>
                                            <div className="campaign-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "campaign")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="campaign-body">
                                            <p><span>Target Audience:</span> {campaign.targetAudience}</p>
                                            <p><span>Start Date:</span> {campaign.startDate}</p>
                                            <p><span>End Date:</span> {campaign.endDate}</p>
                                            <p><span>Status:</span>
                                                <span className={`status-badge ${campaign.status.toLowerCase()}`}>
                                                    {campaign.status}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="campaign-stats">
                                            <div className="stat">
                                                <span className="stat-value">{campaign.sent}</span>
                                                <span className="stat-label">Sent</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-value">{campaign.opened}</span>
                                                <span className="stat-label">Opened</span>
                                            </div>
                                            <div className="stat">
                                                <span className="stat-value">{campaign.replied}</span>
                                                <span className="stat-label">Replied</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderSupportTickets = () => (
        <div className="support-tickets">
            <div className="section-header">
                <h2>Support & Tickets</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("ticket")}>
                        <FiPlus /> Create Ticket
                    </button>
                </div>
            </div>

            <div className="tickets-container">
                {tickets.length === 0 ? (
                    <div className="empty-state">
                        <p>No support tickets found</p>
                        <button className="btn-primary" onClick={() => handleAddItem("ticket")}>
                            Create Ticket
                        </button>
                    </div>
                ) : (
                    <div className="tickets-grid">
                        <div className="tickets-column">
                            <h3>Open</h3>
                            <div className="tickets-list">
                                {tickets
                                    .filter(ticket => ticket.status === 'Open')
                                    .map((ticket, index) => (
                                        <div key={index} className="ticket-card">
                                            <div className="ticket-header">
                                                <h4>{ticket.title}</h4>
                                                <div className="ticket-priority priority-high">
                                                    {ticket.priority}
                                                </div>
                                            </div>
                                            <div className="ticket-body">
                                                <p><span>From:</span> {ticket.from}</p>
                                                <p><span>Created:</span> {ticket.created}</p>
                                                <p><span>SLA:</span> {ticket.sla}</p>
                                            </div>
                                            <div className="ticket-actions">
                                                <button className="btn-secondary">Assign</button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "ticket")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {tickets.filter(ticket => ticket.status === 'Open').length === 0 && (
                                    <div className="empty-column">
                                        <p>No open tickets</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tickets-column">
                            <h3>In Progress</h3>
                            <div className="tickets-list">
                                {tickets
                                    .filter(ticket => ticket.status === 'In Progress')
                                    .map((ticket, index) => (
                                        <div key={index} className="ticket-card">
                                            <div className="ticket-header">
                                                <h4>{ticket.title}</h4>
                                                <div className="ticket-priority priority-medium">
                                                    {ticket.priority}
                                                </div>
                                            </div>
                                            <div className="ticket-body">
                                                <p><span>From:</span> {ticket.from}</p>
                                                <p><span>Assigned to:</span> {ticket.assignedTo}</p>
                                                <p><span>SLA:</span> {ticket.sla}</p>
                                            </div>
                                            <div className="ticket-actions">
                                                <button className="btn-secondary">Resolve</button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "ticket")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {tickets.filter(ticket => ticket.status === 'In Progress').length === 0 && (
                                    <div className="empty-column">
                                        <p>No tickets in progress</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="tickets-column">
                            <h3>Resolved</h3>
                            <div className="tickets-list">
                                {tickets
                                    .filter(ticket => ticket.status === 'Resolved')
                                    .map((ticket, index) => (
                                        <div key={index} className="ticket-card">
                                            <div className="ticket-header">
                                                <h4>{ticket.title}</h4>
                                                <div className="ticket-priority priority-low">
                                                    {ticket.priority}
                                                </div>
                                            </div>
                                            <div className="ticket-body">
                                                <p><span>From:</span> {ticket.from}</p>
                                                <p><span>Resolved by:</span> {ticket.resolvedBy}</p>
                                                <p><span>Resolved on:</span> {ticket.resolvedOn}</p>
                                            </div>
                                            <div className="ticket-actions">
                                                <button className="btn-secondary">Reopen</button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "ticket")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                {tickets.filter(ticket => ticket.status === 'Resolved').length === 0 && (
                                    <div className="empty-column">
                                        <p>No resolved tickets</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderReportsAnalytics = () => (
        <div className="reports-analytics">
            <div className="section-header">
                <h2>Reports & Analytics</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("report")}>
                        <FiPlus /> Generate Report
                    </button>
                </div>
            </div>

            <div className="reports-tabs">
                <button className={`tab-btn ${activeTab === 'venturePerformance' ? 'active' : ''}`} onClick={() => setActiveTab('venturePerformance')}>
                    Venture Performance
                </button>
                <button className={`tab-btn ${activeTab === 'cohortAnalysis' ? 'active' : ''}`} onClick={() => setActiveTab('cohortAnalysis')}>
                    Cohort Analysis
                </button>
                <button className={`tab-btn ${activeTab === 'cacLtv' ? 'active' : ''}`} onClick={() => setActiveTab('cacLtv')}>
                    CAC/LTV Tracking
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'venturePerformance' && (
                    <div className="venture-performance">
                        {reports.length === 0 ? (
                            <div className="empty-state">
                                <p>No performance reports available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("report", { type: 'venturePerformance' })}>
                                    Generate Report
                                </button>
                            </div>
                        ) : (
                            <div className="performance-container">
                                <div className="performance-overview">
                                    <div className="performance-card">
                                        <h3>Portfolio Growth</h3>
                                        <div className="chart-placeholder">
                                            <p>Portfolio growth chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="performance-card">
                                        <h3>Revenue by Venture</h3>
                                        <div className="chart-placeholder">
                                            <p>Revenue distribution chart would appear here</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="venture-list">
                                    <h3>Venture Performance Details</h3>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                            <tr>
                                                <th>Venture</th>
                                                <th>Revenue</th>
                                                <th>Growth</th>
                                                <th>Profit Margin</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {ventures.map((venture, index) => (
                                                <tr key={index}>
                                                    <td>{venture.name}</td>
                                                    <td>{venture.revenue}</td>
                                                    <td>
                                                            <span className="growth-positive">
                                                                <FiTrendingUp /> {venture.growth}%
                                                            </span>
                                                    </td>
                                                    <td>{venture.profitMargin}%</td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="btn-icon">
                                                                <FiBarChart2 />
                                                            </button>
                                                            <button className="btn-icon">
                                                                <FiDownload />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'cohortAnalysis' && (
                    <div className="cohort-analysis">
                        {reports.length === 0 ? (
                            <div className="empty-state">
                                <p>No cohort analysis available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("report", { type: 'cohortAnalysis' })}>
                                    Generate Analysis
                                </button>
                            </div>
                        ) : (
                            <div className="cohort-container">
                                <div className="cohort-chart">
                                    <h3>User Retention by Cohort</h3>
                                    <div className="chart-placeholder">
                                        <p>Cohort analysis chart would appear here</p>
                                    </div>
                                </div>
                                <div className="cohort-table">
                                    <h3>Cohort Details</h3>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                            <tr>
                                                <th>Cohort</th>
                                                <th>Users</th>
                                                <th>Day 7</th>
                                                <th>Day 14</th>
                                                <th>Day 30</th>
                                                <th>Day 90</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {reports
                                                .filter(r => r.type === 'cohortAnalysis')
                                                .map((report, index) => (
                                                    <tr key={index}>
                                                        <td>{report.cohort}</td>
                                                        <td>{report.users}</td>
                                                        <td>{report.day7}%</td>
                                                        <td>{report.day14}%</td>
                                                        <td>{report.day30}%</td>
                                                        <td>{report.day90}%</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'cacLtv' && (
                    <div className="cac-ltv">
                        {reports.length === 0 ? (
                            <div className="empty-state">
                                <p>No CAC/LTV data available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("report", { type: 'cacLtv' })}>
                                    Generate Report
                                </button>
                            </div>
                        ) : (
                            <div className="cac-ltv-container">
                                <div className="cac-ltv-overview">
                                    <div className="metric-card">
                                        <h3>Customer Acquisition Cost</h3>
                                        <div className="metric-value">$42.50</div>
                                        <div className="metric-change negative">
                                            <FiTrendingUp /> 5% from last month
                                        </div>
                                    </div>
                                    <div className="metric-card">
                                        <h3>Customer Lifetime Value</h3>
                                        <div className="metric-value">$320.00</div>
                                        <div className="metric-change positive">
                                            <FiTrendingUp /> 12% from last month
                                        </div>
                                    </div>
                                    <div className="metric-card">
                                        <h3>LTV/CAC Ratio</h3>
                                        <div className="metric-value">7.5x</div>
                                        <div className="metric-change positive">
                                            <FiTrendingUp /> 0.8x from last month
                                        </div>
                                    </div>
                                </div>
                                <div className="cac-ltv-chart">
                                    <h3>CAC & LTV Trend</h3>
                                    <div className="chart-placeholder">
                                        <p>CAC & LTV trend chart would appear here</p>
                                    </div>
                                </div>
                                <div className="cac-ltv-breakdown">
                                    <h3>Acquisition Channel Performance</h3>
                                    <div className="channels-grid">
                                        {reports
                                            .filter(r => r.type === 'cacLtv')
                                            .map((report, index) => (
                                                <div key={index} className="channel-card">
                                                    <h4>{report.channel}</h4>
                                                    <div className="channel-metrics">
                                                        <div className="channel-metric">
                                                            <span className="metric-label">CAC</span>
                                                            <span className="metric-value">{report.cac}</span>
                                                        </div>
                                                        <div className="channel-metric">
                                                            <span className="metric-label">LTV</span>
                                                            <span className="metric-value">{report.ltv}</span>
                                                        </div>
                                                        <div className="channel-metric">
                                                            <span className="metric-label">Ratio</span>
                                                            <span className="metric-value">{report.ratio}x</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderAutomations = () => (
        <div className="automations">
            <div className="section-header">
                <h2>Automations</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("automation")}>
                        <FiPlus /> Create Automation
                    </button>
                </div>
            </div>

            <div className="automations-container">
                {automations.length === 0 ? (
                    <div className="empty-state">
                        <p>No automations configured</p>
                        <button className="btn-primary" onClick={() => handleAddItem("automation")}>
                            Create Automation
                        </button>
                    </div>
                ) : (
                    <div className="automations-grid">
                        {automations.map((automation, index) => (
                            <div key={index} className="automation-card">
                                <div className="automation-header">
                                    <h3>{automation.name}</h3>
                                    <div className="automation-status">
                                        <span className={`status-badge ${automation.status.toLowerCase()}`}>
                                            {automation.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="automation-body">
                                    <p><span>Trigger:</span> {automation.trigger}</p>
                                    <p><span>Action:</span> {automation.action}</p>
                                    <p><span>Schedule:</span> {automation.schedule}</p>
                                    <p><span>Last Run:</span> {automation.lastRun}</p>
                                </div>
                                <div className="automation-actions">
                                    <button className="btn-secondary">
                                        {automation.status === 'Active' ? 'Pause' : 'Activate'}
                                    </button>
                                    <button className="btn-icon">
                                        <FiEdit />
                                    </button>
                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "automation")}>
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    const renderUsersTeams = () => (
        <div className="users-teams">
            <div className="section-header">
                <h2>Users & Teams</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("user")}>
                        <FiPlus /> Add User
                    </button>
                </div>
            </div>

            <div className="users-tabs">
                <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    Users
                </button>
                <button className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`} onClick={() => setActiveTab('teams')}>
                    Teams
                </button>
                <button className={`tab-btn ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>
                    Performance
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'users' && (
                    <div className="users">
                        {teams.length === 0 ? (
                            <div className="empty-state">
                                <p>No users found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("user")}>
                                    Add User
                                </button>
                            </div>
                        ) : (
                            <div className="table-container">
                                <table className="data-table">
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Teams</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teams.map((team, index) => (
                                        <tr key={index}>
                                            <td className="user-name">
                                                <div className="user-avatar">
                                                    {team.name.charAt(0)}
                                                </div>
                                                {team.name}
                                            </td>
                                            <td>{team.email}</td>
                                            <td>
                                                    <span className={`role-badge ${team.role.toLowerCase()}`}>
                                                        {team.role}
                                                    </span>
                                            </td>
                                            <td>{team.teams.join(', ')}</td>
                                            <td>
                                                    <span className={`status-badge ${team.status.toLowerCase()}`}>
                                                        {team.status}
                                                    </span>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon">
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "user")}>
                                                        <FiTrash2 />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'teams' && (
                    <div className="teams">
                        {teams.length === 0 ? (
                            <div className="empty-state">
                                <p>No teams found</p>
                                <button className="btn-primary" onClick={() => handleAddItem("team")}>
                                    Create Team
                                </button>
                            </div>
                        ) : (
                            <div className="teams-grid">
                                {teams.map((team, index) => (
                                    <div key={index} className="team-card">
                                        <div className="team-header">
                                            <h3>{team.name}</h3>
                                            <div className="team-actions">
                                                <button className="btn-icon">
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "team")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="team-body">
                                            <p><span>Lead:</span> {team.lead}</p>
                                            <p><span>Members:</span> {team.members.length}</p>
                                            <p><span>Projects:</span> {team.projects}</p>
                                        </div>
                                        <div className="team-members">
                                            <h4>Team Members</h4>
                                            <div className="member-avatars">
                                                {team.members.slice(0, 5).map((member, idx) => (
                                                    <div key={idx} className="member-avatar">
                                                        {member.charAt(0)}
                                                    </div>
                                                ))}
                                                {team.members.length > 5 && (
                                                    <div className="member-more">
                                                        +{team.members.length - 5}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="performance">
                        {teams.length === 0 ? (
                            <div className="empty-state">
                                <p>No performance data available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("performance")}>
                                    Add Performance Data
                                </button>
                            </div>
                        ) : (
                            <div className="performance-container">
                                <div className="performance-overview">
                                    <div className="performance-card">
                                        <h3>Team Productivity</h3>
                                        <div className="chart-placeholder">
                                            <p>Productivity chart would appear here</p>
                                        </div>
                                    </div>
                                    <div className="performance-card">
                                        <h3>Goal Completion</h3>
                                        <div className="chart-placeholder">
                                            <p>Goal completion chart would appear here</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="performance-table">
                                    <h3>Individual Performance</h3>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Tasks Completed</th>
                                                <th>Goals Achieved</th>
                                                <th>Performance Score</th>
                                                <th>Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {teams.map((team, index) => (
                                                <tr key={index}>
                                                    <td className="user-name">
                                                        <div className="user-avatar">
                                                            {team.name.charAt(0)}
                                                        </div>
                                                        {team.name}
                                                    </td>
                                                    <td>{team.tasksCompleted}</td>
                                                    <td>{team.goalsAchieved}</td>
                                                    <td>
                                                        <div className="performance-score">
                                                            <div className="score-bar">
                                                                <div className="score-fill" style={{ width: `${team.performanceScore}%` }}></div>
                                                                <span>{team.performanceScore}%</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="btn-icon">
                                                                <FiBarChart2 />
                                                            </button>
                                                            <button className="btn-icon">
                                                                <FiEdit />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="settings">
            <div className="section-header">
                <h2>Settings</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary" onClick={() => handleAddItem("setting")}>
                        <FiPlus /> Add Setting
                    </button>
                </div>
            </div>

            <div className="settings-tabs">
                <button className={`tab-btn ${activeTab === 'branding' ? 'active' : ''}`} onClick={() => setActiveTab('branding')}>
                    Branding
                </button>
                <button className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
                    Security
                </button>
                <button className={`tab-btn ${activeTab === 'integrations' ? 'active' : ''}`} onClick={() => setActiveTab('integrations')}>
                    Integrations
                </button>
                <button className={`tab-btn ${activeTab === 'billing' ? 'active' : ''}`} onClick={() => setActiveTab('billing')}>
                    Billing
                </button>
                <button className={`tab-btn ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
                    Audit Logs
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'branding' && (
                    <div className="branding">
                        {Object.keys(settings).length === 0 ? (
                            <div className="empty-state">
                                <p>No branding settings configured</p>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { type: 'branding' })}>
                                    Configure Branding
                                </button>
                            </div>
                        ) : (
                            <div className="branding-form">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input type="text" defaultValue={settings.companyName} />
                                </div>
                                <div className="form-group">
                                    <label>Logo</label>
                                    <div className="logo-upload">
                                        <div className="logo-preview">
                                            <img src="/logo.jpg" alt="Company Logo" />
                                        </div>
                                        <button className="btn-secondary">Change Logo</button>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Primary Color</label>
                                    <div className="color-picker">
                                        <input type="color" defaultValue={settings.primaryColor} />
                                        <span>{settings.primaryColor}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Secondary Color</label>
                                    <div className="color-picker">
                                        <input type="color" defaultValue={settings.secondaryColor} />
                                        <span>{settings.secondaryColor}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Favicon</label>
                                    <div className="favicon-upload">
                                        <button className="btn-secondary">Upload Favicon</button>
                                    </div>
                                </div>
                                <button className="btn-primary">Save Changes</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="security">
                        {Object.keys(settings).length === 0 ? (
                            <div className="empty-state">
                                <p>No security settings configured</p>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { type: 'security' })}>
                                    Configure Security
                                </button>
                            </div>
                        ) : (
                            <div className="security-settings">
                                <div className="security-section">
                                    <h3>Password Policy</h3>
                                    <div className="form-group">
                                        <label>Minimum Password Length</label>
                                        <input type="number" defaultValue={settings.minPasswordLength} />
                                    </div>
                                    <div className="form-group">
                                        <label>Require Special Characters</label>
                                        <div className="toggle-switch">
                                            <input type="checkbox" defaultChecked={settings.requireSpecialChars} />
                                            <span className="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Password Expiry (days)</label>
                                        <input type="number" defaultValue={settings.passwordExpiry} />
                                    </div>
                                </div>
                                <div className="security-section">
                                    <h3>Two-Factor Authentication</h3>
                                    <div className="form-group">
                                        <label>Enable 2FA for Admins</label>
                                        <div className="toggle-switch">
                                            <input type="checkbox" defaultChecked={settings.enable2FA} />
                                            <span className="toggle-slider"></span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Enable 2FA for All Users</label>
                                        <div className="toggle-switch">
                                            <input type="checkbox" defaultChecked={settings.enable2FAAll} />
                                            <span className="toggle-slider"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="security-section">
                                    <h3>Login Attempts</h3>
                                    <div className="form-group">
                                        <label>Max Login Attempts</label>
                                        <input type="number" defaultValue={settings.maxLoginAttempts} />
                                    </div>
                                    <div className="form-group">
                                        <label>Lockout Duration (minutes)</label>
                                        <input type="number" defaultValue={settings.lockoutDuration} />
                                    </div>
                                </div>
                                <button className="btn-primary">Save Changes</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'integrations' && (
                    <div className="integrations">
                        {Object.keys(settings).length === 0 ? (
                            <div className="empty-state">
                                <p>No integrations configured</p>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { type: 'integration' })}>
                                    Add Integration
                                </button>
                            </div>
                        ) : (
                            <div className="integrations-grid">
                                {settings.integrations.map((integration, index) => (
                                    <div key={index} className="integration-card">
                                        <div className="integration-header">
                                            <h3>{integration.name}</h3>
                                            <div className="integration-status">
                                                <span className={`status-badge ${integration.status.toLowerCase()}`}>
                                                    {integration.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="integration-body">
                                            <p>{integration.description}</p>
                                            <div className="integration-config">
                                                <p><span>API Key:</span> {integration.apiKey}</p>
                                                <p><span>Connected:</span> {integration.connectedDate}</p>
                                            </div>
                                        </div>
                                        <div className="integration-actions">
                                            <button className="btn-secondary">
                                                {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                                            </button>
                                            <button className="btn-icon">
                                                <FiEdit />
                                            </button>
                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "integration")}>
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="billing">
                        {Object.keys(settings).length === 0 ? (
                            <div className="empty-state">
                                <p>No billing information available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { type: 'billing' })}>
                                    Add Billing Info
                                </button>
                            </div>
                        ) : (
                            <div className="billing-container">
                                <div className="billing-overview">
                                    <div className="billing-card">
                                        <h3>Current Plan</h3>
                                        <div className="plan-name">{settings.plan}</div>
                                        <div className="plan-price">${settings.price}/month</div>
                                        <button className="btn-secondary">Upgrade Plan</button>
                                    </div>
                                    <div className="billing-card">
                                        <h3>Next Billing Date</h3>
                                        <div className="billing-date">{settings.nextBillingDate}</div>
                                        <div className="billing-amount">${settings.nextBillingAmount}</div>
                                        <button className="btn-secondary">Update Payment Method</button>
                                    </div>
                                </div>
                                <div className="billing-history">
                                    <h3>Billing History</h3>
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Invoice</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {settings.billingHistory.map((bill, index) => (
                                                <tr key={index}>
                                                    <td>{bill.date}</td>
                                                    <td>{bill.description}</td>
                                                    <td>{bill.amount}</td>
                                                    <td>
                                                            <span className={`status-badge ${bill.status.toLowerCase()}`}>
                                                                {bill.status}
                                                            </span>
                                                    </td>
                                                    <td>
                                                        <button className="btn-icon">
                                                            <FiDownload />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="audit">
                        {Object.keys(settings).length === 0 ? (
                            <div className="empty-state">
                                <p>No audit logs available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { type: 'audit' })}>
                                    Generate Audit Report
                                </button>
                            </div>
                        ) : (
                            <div className="audit-logs">
                                <div className="audit-filters">
                                    <div className="form-group">
                                        <label>Date Range</label>
                                        <div className="date-range">
                                            <input type="date" defaultValue={settings.startDate} />
                                            <span>to</span>
                                            <input type="date" defaultValue={settings.endDate} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>User</label>
                                        <select>
                                            <option>All Users</option>
                                            {teams.map((team, index) => (
                                                <option key={index}>{team.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Action</label>
                                        <select>
                                            <option>All Actions</option>
                                            <option>Login</option>
                                            <option>Create</option>
                                            <option>Update</option>
                                            <option>Delete</option>
                                        </select>
                                    </div>
                                    <button className="btn-primary">Apply Filters</button>
                                </div>
                                <div className="audit-table">
                                    <div className="table-container">
                                        <table className="data-table">
                                            <thead>
                                            <tr>
                                                <th>Date & Time</th>
                                                <th>User</th>
                                                <th>Action</th>
                                                <th>Details</th>
                                                <th>IP Address</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {settings.auditLogs.map((log, index) => (
                                                <tr key={index}>
                                                    <td>{log.timestamp}</td>
                                                    <td>{log.user}</td>
                                                    <td>
                                                            <span className={`action-badge ${log.action.toLowerCase()}`}>
                                                                {log.action}
                                                            </span>
                                                    </td>
                                                    <td>{log.details}</td>
                                                    <td>{log.ipAddress}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
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
            case "deals":
                return renderDealsEquity();
            case "tasks":
                return renderTasksSprints();
            case "growth":
                return renderGrowthMarketing();
            case "finance":
                return renderFinance();
            case "legal":
                return renderLegalCompliance();
            case "documents":
                return renderDocumentsAssets();
            case "crm":
                return renderCrmOutreach();
            case "support":
                return renderSupportTickets();
            case "reports":
                return renderReportsAnalytics();
            case "automations":
                return renderAutomations();
            case "users":
                return renderUsersTeams();
            case "settings":
                return renderSettings();
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
                            {newItem.type === "venture" && (
                                <>
                                    <div className="form-group">
                                        <label>Venture Name</label>
                                        <input type="text" placeholder="Enter venture name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <input type="text" placeholder="Enter industry" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Stage</label>
                                        <select required>
                                            <option value="">Select stage</option>
                                            <option value="Lead">Lead</option>
                                            <option value="Diligence">Diligence</option>
                                            <option value="Term Sheet">Term Sheet</option>
                                            <option value="Build">Build</option>
                                            <option value="Live">Live</option>
                                            <option value="Scaling">Scaling</option>
                                            <option value="Exit">Exit</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Revenue</label>
                                        <input type="text" placeholder="Enter revenue" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Risk Level</label>
                                        <select required>
                                            <option value="">Select risk level</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "founder" && (
                                <>
                                    <div className="form-group">
                                        <label>Founder Name</label>
                                        <input type="text" placeholder="Enter founder name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" placeholder="Enter company name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="Enter email address" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" placeholder="Enter phone number" required />
                                    </div>
                                    <div className="form-group">
                                        <label>KYC Status</label>
                                        <select required>
                                            <option value="">Select KYC status</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "task" && (
                                <>
                                    <div className="form-group">
                                        <label>Task Title</label>
                                        <input type="text" placeholder="Enter task title" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea placeholder="Enter task description"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Assignee</label>
                                        <select required>
                                            <option value="">Select assignee</option>
                                            <option value="You">You</option>
                                            <option value="Jane">Jane</option>
                                            <option value="John">John</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="todo">To Do</option>
                                            <option value="inProgress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "termSheet" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter term sheet title" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" placeholder="Enter company name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="text" placeholder="Enter investment amount" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Signed">Signed</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "content" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter content title" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Platform</label>
                                        <select required>
                                            <option value="">Select platform</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Twitter">Twitter</option>
                                            <option value="Blog">Blog</option>
                                            <option value="Email">Email</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Publish Date</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="Published">Published</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "invoice" && (
                                <>
                                    <div className="form-group">
                                        <label>Invoice Number</label>
                                        <input type="text" placeholder="Enter invoice number" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Client</label>
                                        <input type="text" placeholder="Enter client name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input type="text" placeholder="Enter invoice amount" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Sent">Sent</option>
                                            <option value="Paid">Paid</option>
                                            <option value="Overdue">Overdue</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "contract" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter contract title" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Party</label>
                                        <input type="text" placeholder="Enter party name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select required>
                                            <option value="">Select contract type</option>
                                            <option value="NDA">NDA</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Service">Service</option>
                                            <option value="Employment">Employment</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input type="date" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Signed">Signed</option>
                                            <option value="Expired">Expired</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "document" && (
                                <>
                                    <div className="form-group">
                                        <label>Document Name</label>
                                        <input type="text" placeholder="Enter document name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select required>
                                            <option value="">Select category</option>
                                            <option value="Brand Kit">Brand Kit</option>
                                            <option value="Pitch Deck">Pitch Deck</option>
                                            <option value="SOP">SOP</option>
                                            <option value="Legal">Legal</option>
                                            <option value="Financial">Financial</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Access Level</label>
                                        <select required>
                                            <option value="">Select access level</option>
                                            <option value="Public">Public</option>
                                            <option value="Internal">Internal</option>
                                            <option value="Restricted">Restricted</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Upload File</label>
                                        <input type="file" required />
                                    </div>
                                </>
                            )}

                            {newItem.type === "investor" && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" placeholder="Enter name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="Enter email address" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" placeholder="Enter phone number" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select required>
                                            <option value="">Select type</option>
                                            <option value="investor">Investor</option>
                                            <option value="mentor">Mentor</option>
                                            <option value="partner">Partner</option>
                                        </select>
                                    </div>
                                    {newItem.typeData?.type === 'investor' && (
                                        <>
                                            <div className="form-group">
                                                <label>Firm</label>
                                                <input type="text" placeholder="Enter firm name" />
                                            </div>
                                            <div className="form-group">
                                                <label>Stage</label>
                                                <select>
                                                    <option value="">Select stage</option>
                                                    <option value="Prospect">Prospect</option>
                                                    <option value="Engaged">Engaged</option>
                                                    <option value="Committed">Committed</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {newItem.typeData?.type === 'mentor' && (
                                        <>
                                            <div className="form-group">
                                                <label>Expertise</label>
                                                <input type="text" placeholder="Enter area of expertise" />
                                            </div>
                                            <div className="form-group">
                                                <label>Availability</label>
                                                <select>
                                                    <option value="">Select availability</option>
                                                    <option value="High">High</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Low">Low</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                    {newItem.typeData?.type === 'partner' && (
                                        <>
                                            <div className="form-group">
                                                <label>Company</label>
                                                <input type="text" placeholder="Enter company name" />
                                            </div>
                                            <div className="form-group">
                                                <label>Industry</label>
                                                <input type="text" placeholder="Enter industry" />
                                            </div>
                                            <div className="form-group">
                                                <label>Partnership Type</label>
                                                <select>
                                                    <option value="">Select partnership type</option>
                                                    <option value="Strategic">Strategic</option>
                                                    <option value="Technology">Technology</option>
                                                    <option value="Distribution">Distribution</option>
                                                </select>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {newItem.type === "ticket" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" placeholder="Enter ticket title" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea placeholder="Enter ticket description"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>From</label>
                                        <input type="text" placeholder="Enter requester name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Priority</label>
                                        <select required>
                                            <option value="">Select priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>SLA (hours)</label>
                                        <input type="number" placeholder="Enter SLA in hours" required />
                                    </div>
                                </>
                            )}

                            {newItem.type === "automation" && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" placeholder="Enter automation name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Trigger</label>
                                        <select required>
                                            <option value="">Select trigger</option>
                                            <option value="Time-based">Time-based</option>
                                            <option value="Event-based">Event-based</option>
                                            <option value="Action-based">Action-based</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Action</label>
                                        <select required>
                                            <option value="">Select action</option>
                                            <option value="Send Email">Send Email</option>
                                            <option value="Create Task">Create Task</option>
                                            <option value="Generate Report">Generate Report</option>
                                            <option value="Update Record">Update Record</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Schedule</label>
                                        <select required>
                                            <option value="">Select schedule</option>
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="On-demand">On-demand</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "user" && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" placeholder="Enter user name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="Enter email address" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select required>
                                            <option value="">Select role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="User">User</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Teams</label>
                                        <select multiple>
                                            <option value="Team A">Team A</option>
                                            <option value="Team B">Team B</option>
                                            <option value="Team C">Team C</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select required>
                                            <option value="">Select status</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            {newItem.type === "setting" && (
                                <>
                                    {newItem.typeData?.type === 'branding' && (
                                        <>
                                            <div className="form-group">
                                                <label>Company Name</label>
                                                <input type="text" placeholder="Enter company name" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Primary Color</label>
                                                <input type="color" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Secondary Color</label>
                                                <input type="color" required />
                                            </div>
                                        </>
                                    )}

                                    {newItem.typeData?.type === 'security' && (
                                        <>
                                            <div className="form-group">
                                                <label>Setting Name</label>
                                                <input type="text" placeholder="Enter setting name" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Value</label>
                                                <input type="text" placeholder="Enter setting value" required />
                                            </div>
                                        </>
                                    )}

                                    {newItem.typeData?.type === 'integration' && (
                                        <>
                                            <div className="form-group">
                                                <label>Integration Name</label>
                                                <input type="text" placeholder="Enter integration name" required />
                                            </div>
                                            <div className="form-group">
                                                <label>API Key</label>
                                                <input type="text" placeholder="Enter API key" required />
                                            </div>
                                        </>
                                    )}

                                    {newItem.typeData?.type === 'billing' && (
                                        <>
                                            <div className="form-group">
                                                <label>Plan</label>
                                                <select required>
                                                    <option value="">Select plan</option>
                                                    <option value="Basic">Basic</option>
                                                    <option value="Professional">Professional</option>
                                                    <option value="Enterprise">Enterprise</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Billing Cycle</label>
                                                <select required>
                                                    <option value="">Select billing cycle</option>
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Yearly">Yearly</option>
                                                </select>
                                            </div>
                                        </>
                                    )}

                                    {newItem.typeData?.type === 'audit' && (
                                        <>
                                            <div className="form-group">
                                                <label>Report Type</label>
                                                <select required>
                                                    <option value="">Select report type</option>
                                                    <option value="User Activity">User Activity</option>
                                                    <option value="System Changes">System Changes</option>
                                                    <option value="Security Events">Security Events</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Date Range</label>
                                                <div className="date-range">
                                                    <input type="date" required />
                                                    <span>to</span>
                                                    <input type="date" required />
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {!["venture", "founder", "task", "termSheet", "content", "invoice", "contract", "document", "investor", "ticket", "automation", "user", "setting"].includes(newItem.type) && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" placeholder={`Enter ${newItem.type} name`} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea placeholder={`Enter ${newItem.type} description`}></textarea>
                                    </div>
                                </>
                            )}

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
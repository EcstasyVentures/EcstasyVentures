import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiHome, FiPieChart, FiUsers, FiDollarSign, FiCheckSquare, FiTrendingUp, FiCreditCard,
    FiFileText, FiFolder, FiMessageSquare, FiHelpCircle, FiBarChart2, FiSettings, FiBell, FiUser,
    FiSearch, FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock, FiCheck, FiX, FiFilter, FiDownload,
    FiChevronLeft, FiChevronRight, FiMail, FiPhone, FiLock, FiDatabase, FiShare2, FiActivity,
    FiUserCheck, FiTool, FiShield, FiDroplet, FiAward, FiBriefcase, FiTarget, FiZap, FiGrid,
    FiUserPlus, FiCreditCard as FiCard, FiImage, FiVideo, FiFile, FiSave, FiEye, FiPlay
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
    const [editingItem, setEditingItem] = useState(null);
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
    const [events, setEvents] = useState([]);
    const [activeSubTab, setActiveSubTab] = useState({});

    // Check if user is logged in
    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");

        // Check if user exists and has a valid role (not checking for specific "admin" role)
        if (!username || !role) {
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
        setEvents([]);

        // Initialize active subtabs
        setActiveSubTab({
            deals: "termSheets",
            growth: "contentCalendar",
            finance: "invoices",
            legal: "contracts",
            crm: "investors",
            settings: "branding"
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        navigate("/");
    };

    const handleAddItem = (type, data = {}) => {
        setNewItem({ type, ...data });
        setEditingItem(null);
        setShowAddModal(true);
    };

    const handleEditItem = (item, type) => {
        setEditingItem(item);
        setNewItem({ type });
        setShowAddModal(true);
    };

    const handleDeleteItem = (id, type) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            switch (type) {
                case 'event':
                    setEvents(events.filter(event => event.id !== id));
                    break;
                case 'task':
                    setTasks(tasks.filter(task => task.id !== id));
                    break;
                case 'venture':
                    setVentures(ventures.filter(venture => venture.id !== id));
                    break;
                case 'founder':
                    setFounders(founders.filter(founder => founder.id !== id));
                    break;
                case 'termSheet':
                    setTermSheets(termSheets.filter(sheet => sheet.id !== id));
                    break;
                case 'capTable':
                    setCapTable(capTable.filter((_, index) => index !== id));
                    break;
                case 'equityLedger':
                    setEquityLedger(equityLedger.filter((_, index) => index !== id));
                    break;
                case 'vestingSchedule':
                    setVestingSchedules(vestingSchedules.filter((_, index) => index !== id));
                    break;
                case 'content':
                    setContentCalendar(contentCalendar.filter((_, index) => index !== id));
                    break;
                case 'asset':
                    setAssetLibrary(assetLibrary.filter((_, index) => index !== id));
                    break;
                case 'campaign':
                    setCampaigns(campaigns.filter((_, index) => index !== id));
                    break;
                case 'invoice':
                    setInvoices(invoices.filter((_, index) => index !== id));
                    break;
                case 'contract':
                    setContracts(contracts.filter((_, index) => index !== id));
                    break;
                case 'complianceEvent':
                    setComplianceCalendar(complianceCalendar.filter((_, index) => index !== id));
                    break;
                case 'document':
                    setDocuments(documents.filter((_, index) => index !== id));
                    break;
                case 'investor':
                    setInvestors(investors.filter((_, index) => index !== id));
                    break;
                case 'ticket':
                    setTickets(tickets.filter((_, index) => index !== id));
                    break;
                case 'automation':
                    setAutomations(automations.filter((_, index) => index !== id));
                    break;
                case 'user':
                    setTeams(teams.filter((_, index) => index !== id));
                    break;
                case 'setting':
                    // Handle settings deletion based on type
                    if (settings.integrations) {
                        setSettings({
                            ...settings,
                            integrations: settings.integrations.filter((_, index) => index !== id)
                        });
                    }
                    break;
                default:
                    alert(`Deleted ${type} with ID: ${id}`);
            }
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // Handle different form types
        switch (newItem.type) {
            case 'event':
                const newEvent = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    date: data.date,
                    time: data.time,
                    day: new Date(data.date).getDate(),
                    month: new Date(data.date).toLocaleString('default', { month: 'short' })
                };
                if (editingItem) {
                    setEvents(events.map(event => event.id === editingItem.id ? newEvent : event));
                } else {
                    setEvents([...events, newEvent]);
                }
                break;
            case 'task':
                const newTask = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    description: data.description,
                    assignee: data.assignee,
                    dueDate: data.dueDate,
                    status: data.status
                };
                if (editingItem) {
                    setTasks(tasks.map(task => task.id === editingItem.id ? newTask : task));
                } else {
                    setTasks([...tasks, newTask]);
                }
                break;
            case 'venture':
                const newVenture = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    industry: data.industry,
                    stage: data.stage,
                    revenue: data.revenue,
                    risk: data.risk
                };
                if (editingItem) {
                    setVentures(ventures.map(venture => venture.id === editingItem.id ? newVenture : venture));
                } else {
                    setVentures([...ventures, newVenture]);
                }
                break;
            case 'founder':
                const newFounder = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    company: data.company,
                    email: data.email,
                    phone: data.phone,
                    kyc: data.kyc,
                    contracts: editingItem ? editingItem.contracts : 0
                };
                if (editingItem) {
                    setFounders(founders.map(founder => founder.id === editingItem.id ? newFounder : founder));
                } else {
                    setFounders([...founders, newFounder]);
                }
                break;
            case 'termSheet':
                const newTermSheet = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    company: data.company,
                    amount: data.amount,
                    status: data.status
                };
                if (editingItem) {
                    setTermSheets(termSheets.map(sheet => sheet.id === editingItem.id ? newTermSheet : sheet));
                } else {
                    setTermSheets([...termSheets, newTermSheet]);
                }
                break;
            case 'content':
                const newContent = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    platform: data.platform,
                    publishDate: data.publishDate,
                    status: data.status,
                    day: new Date(data.publishDate).getDate(),
                    month: new Date(data.publishDate).toLocaleString('default', { month: 'short' })
                };
                if (editingItem) {
                    setContentCalendar(contentCalendar.map(content => content.id === editingItem.id ? newContent : content));
                } else {
                    setContentCalendar([...contentCalendar, newContent]);
                }
                break;
            case 'invoice':
                const newInvoice = {
                    id: editingItem ? editingItem.id : Date.now(),
                    number: data.number,
                    client: data.client,
                    amount: data.amount,
                    dueDate: data.dueDate,
                    status: data.status
                };
                if (editingItem) {
                    setInvoices(invoices.map(invoice => invoice.id === editingItem.id ? newInvoice : invoice));
                } else {
                    setInvoices([...invoices, newInvoice]);
                }
                break;
            case 'contract':
                const newContract = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    party: data.party,
                    type: data.type,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    status: data.status
                };
                if (editingItem) {
                    setContracts(contracts.map(contract => contract.id === editingItem.id ? newContract : contract));
                } else {
                    setContracts([...contracts, newContract]);
                }
                break;
            case 'document':
                const newDocument = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    category: data.category,
                    accessLevel: data.accessLevel,
                    type: data.type || 'document'
                };
                if (editingItem) {
                    setDocuments(documents.map(document => document.id === editingItem.id ? newDocument : document));
                } else {
                    setDocuments([...documents, newDocument]);
                }
                break;
            case 'investor':
                const newInvestor = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    type: data.type,
                    ...(data.type === 'investor' && { firm: data.firm, stage: data.stage }),
                    ...(data.type === 'mentor' && { expertise: data.expertise, availability: data.availability }),
                    ...(data.type === 'partner' && { company: data.company, industry: data.industry, partnershipType: data.partnershipType })
                };
                if (editingItem) {
                    setInvestors(investors.map(investor => investor.id === editingItem.id ? newInvestor : investor));
                } else {
                    setInvestors([...investors, newInvestor]);
                }
                break;
            case 'ticket':
                const newTicket = {
                    id: editingItem ? editingItem.id : Date.now(),
                    title: data.title,
                    description: data.description,
                    from: data.from,
                    priority: data.priority,
                    sla: data.sla,
                    status: 'Open'
                };
                if (editingItem) {
                    setTickets(tickets.map(ticket => ticket.id === editingItem.id ? newTicket : ticket));
                } else {
                    setTickets([...tickets, newTicket]);
                }
                break;
            case 'automation':
                const newAutomation = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    trigger: data.trigger,
                    action: data.action,
                    schedule: data.schedule,
                    status: 'Active'
                };
                if (editingItem) {
                    setAutomations(automations.map(automation => automation.id === editingItem.id ? newAutomation : automation));
                } else {
                    setAutomations([...automations, newAutomation]);
                }
                break;
            case 'user':
                const newUser = {
                    id: editingItem ? editingItem.id : Date.now(),
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    teams: data.teams ? data.teams.split(',').map(team => team.trim()) : [],
                    status: data.status,
                    tasksCompleted: editingItem ? editingItem.tasksCompleted : 0,
                    goalsAchieved: editingItem ? editingItem.goalsAchieved : 0,
                    performanceScore: editingItem ? editingItem.performanceScore : 0
                };
                if (editingItem) {
                    setTeams(teams.map(team => team.id === editingItem.id ? newUser : team));
                } else {
                    setTeams([...teams, newUser]);
                }
                break;
            case 'setting':
                if (newItem.typeData?.type === 'branding') {
                    setSettings({
                        ...settings,
                        companyName: data.companyName,
                        primaryColor: data.primaryColor,
                        secondaryColor: data.secondaryColor
                    });
                } else if (newItem.typeData?.type === 'integration') {
                    const newIntegration = {
                        id: editingItem ? editingItem.id : Date.now(),
                        name: data.name,
                        description: data.description || 'Integration',
                        apiKey: data.apiKey,
                        status: 'Connected',
                        connectedDate: new Date().toLocaleDateString()
                    };
                    if (editingItem) {
                        setSettings({
                            ...settings,
                            integrations: settings.integrations.map(int => int.id === editingItem.id ? newIntegration : int)
                        });
                    } else {
                        setSettings({
                            ...settings,
                            integrations: [...(settings.integrations || []), newIntegration]
                        });
                    }
                }
                break;
            default:
                // Generic handler for other types
                const genericItem = {
                    id: editingItem ? editingItem.id : Date.now(),
                    ...data
                };
                if (editingItem) {
                    // This would need to be implemented for each specific type
                    console.log('Updated item:', genericItem);
                } else {
                    console.log('Added item:', genericItem);
                }
        }
        setShowAddModal(false);
        setEditingItem(null);
    };

    // Render functions for each section
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
                        {Array.from({ length: 30 }, (_, i) => {
                            const hasEvent = events.some(event => event.day === i + 1);
                            return (
                                <div key={i} className={`calendar-day ${hasEvent ? 'has-event' : ''}`}>
                                    <span>{i + 1}</span>
                                    {hasEvent && <div className="event-dot"></div>}
                                </div>
                            );
                        })}
                    </div>
                    <div className="event-list">
                        {events.length === 0 ? (
                            <div className="empty-state">
                                <p>No events scheduled</p>
                                <button className="btn-primary" onClick={() => handleAddItem("event")}>
                                    Add Event
                                </button>
                            </div>
                        ) : (
                            events.map(event => (
                                <div key={event.id} className="event-item">
                                    <div className="event-date">
                                        <span className="event-day">{event.day}</span>
                                        <span className="event-month">{event.month}</span>
                                    </div>
                                    <div className="event-details">
                                        <h4>{event.title}</h4>
                                        <p>{event.time}</p>
                                    </div>
                                    <div className="event-actions">
                                        <button className="btn-icon" onClick={() => handleEditItem(event, 'event')}>
                                            <FiEdit />
                                        </button>
                                        <button className="btn-icon" onClick={() => handleDeleteItem(event.id, 'event')}>
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
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
                                                <button className="btn-icon" onClick={() => handleEditItem(venture, "venture")}>
                                                    <FiEdit />
                                                </button>
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
                                        <button className="btn-icon" onClick={() => handleEditItem(founder, "founder")}>
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
                                                <button className="btn-icon" onClick={() => handleEditItem(task, "task")}>
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

    // Deals & Equity Section
    const renderDealsEquity = () => {
        const subTabs = [
            { id: "termSheets", label: "Term Sheets", icon: <FiFileText /> },
            { id: "capTable", label: "Cap Table", icon: <FiGrid /> },
            { id: "equityLedger", label: "Equity Ledger", icon: <FiDatabase /> },
            { id: "vestingSchedules", label: "Vesting Schedules", icon: <FiCalendar /> }
        ];

        const activeSubTabId = activeSubTab.deals || "termSheets";

        return (
            <div className="deals-equity">
                <div className="section-header">
                    <h2>Deals & Equity</h2>
                    <div className="header-actions">
                        <button className="btn-primary" onClick={() => handleAddItem(activeSubTabId)}>
                            <FiPlus /> Add {subTabs.find(t => t.id === activeSubTabId)?.label}
                        </button>
                    </div>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, deals: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "termSheets" && (
                        <div className="term-sheets">
                            {termSheets.length === 0 ? (
                                <div className="empty-state">
                                    <p>No term sheets available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("termSheet")}>
                                        Add Term Sheet
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Company</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {termSheets.map(sheet => (
                                            <tr key={sheet.id}>
                                                <td>{sheet.title}</td>
                                                <td>{sheet.company}</td>
                                                <td>{sheet.amount}</td>
                                                <td><span className={`status-badge ${sheet.status.toLowerCase()}`}>{sheet.status}</span></td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(sheet, "termSheet")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(sheet.id, "termSheet")}>
                                                            <FiTrash2 />
                                                        </button>
                                                        <button className="btn-icon">
                                                            <FiEye />
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

                    {activeSubTabId === "capTable" && (
                        <div className="cap-table">
                            {capTable.length === 0 ? (
                                <div className="empty-state">
                                    <p>No cap table data available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("capTable")}>
                                        Add Cap Table Entry
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Shareholder</th>
                                            <th>Shares</th>
                                            <th>Percentage</th>
                                            <th>Class</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {capTable.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.shareholder}</td>
                                                <td>{entry.shares}</td>
                                                <td>{entry.percentage}%</td>
                                                <td>{entry.class}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(entry, "capTable")}>
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

                    {activeSubTabId === "equityLedger" && (
                        <div className="equity-ledger">
                            {equityLedger.length === 0 ? (
                                <div className="empty-state">
                                    <p>No equity ledger entries available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("equityLedger")}>
                                        Add Equity Ledger Entry
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Transaction</th>
                                            <th>Shares</th>
                                            <th>Value</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {equityLedger.map((entry, index) => (
                                            <tr key={index}>
                                                <td>{entry.date}</td>
                                                <td>{entry.transaction}</td>
                                                <td>{entry.shares}</td>
                                                <td>{entry.value}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(entry, "equityLedger")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "equityLedger")}>
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

                    {activeSubTabId === "vestingSchedules" && (
                        <div className="vesting-schedules">
                            {vestingSchedules.length === 0 ? (
                                <div className="empty-state">
                                    <p>No vesting schedules available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("vestingSchedule")}>
                                        Add Vesting Schedule
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Employee</th>
                                            <th>Grant Date</th>
                                            <th>Total Shares</th>
                                            <th>Vesting Period</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {vestingSchedules.map((schedule, index) => (
                                            <tr key={index}>
                                                <td>{schedule.employee}</td>
                                                <td>{schedule.grantDate}</td>
                                                <td>{schedule.totalShares}</td>
                                                <td>{schedule.vestingPeriod}</td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(schedule, "vestingSchedule")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "vestingSchedule")}>
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
                </div>
            </div>
        );
    };

    // Growth & Marketing Section
    const renderGrowthMarketing = () => {
        const subTabs = [
            { id: "contentCalendar", label: "Content Calendar", icon: <FiCalendar /> },
            { id: "assetLibrary", label: "Asset Library", icon: <FiFolder /> },
            { id: "campaigns", label: "Campaigns", icon: <FiTrendingUp /> }
        ];

        const activeSubTabId = activeSubTab.growth || "contentCalendar";

        return (
            <div className="growth-marketing">
                <div className="section-header">
                    <h2>Growth & Marketing</h2>
                    <div className="header-actions">
                        <button className="btn-primary" onClick={() => handleAddItem(activeSubTabId)}>
                            <FiPlus /> Add {subTabs.find(t => t.id === activeSubTabId)?.label}
                        </button>
                    </div>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, growth: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "contentCalendar" && (
                        <div className="content-calendar">
                            {contentCalendar.length === 0 ? (
                                <div className="empty-state">
                                    <p>No content scheduled</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("content")}>
                                        Add Content
                                    </button>
                                </div>
                            ) : (
                                <div className="calendar-view">
                                    <div className="calendar-header">
                                        <h3>Content Calendar</h3>
                                        <div className="calendar-nav">
                                            <button className="btn-icon"><FiChevronLeft /></button>
                                            <button className="btn-icon"><FiChevronRight /></button>
                                        </div>
                                    </div>
                                    <div className="content-list">
                                        {contentCalendar.map(content => (
                                            <div key={content.id} className="content-item">
                                                <div className="content-date">
                                                    <span className="content-day">{content.day}</span>
                                                    <span className="content-month">{content.month}</span>
                                                </div>
                                                <div className="content-details">
                                                    <h4>{content.title}</h4>
                                                    <p><span>Platform:</span> {content.platform}</p>
                                                    <p><span>Status:</span>
                                                        <span className={`status-badge ${content.status.toLowerCase()}`}>
                                                            {content.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="content-actions">
                                                    <button className="btn-icon" onClick={() => handleEditItem(content, "content")}>
                                                        <FiEdit />
                                                    </button>
                                                    <button className="btn-icon" onClick={() => handleDeleteItem(content.id, "content")}>
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

                    {activeSubTabId === "assetLibrary" && (
                        <div className="asset-library">
                            {assetLibrary.length === 0 ? (
                                <div className="empty-state">
                                    <p>No assets in library</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("asset")}>
                                        Add Asset
                                    </button>
                                </div>
                            ) : (
                                <div className="asset-grid">
                                    {assetLibrary.map((asset, index) => (
                                        <div key={index} className="asset-card">
                                            <div className="asset-icon">
                                                {asset.type === 'image' && <FiImage />}
                                                {asset.type === 'video' && <FiVideo />}
                                                {asset.type === 'document' && <FiFile />}
                                            </div>
                                            <h4>{asset.name}</h4>
                                            <p>{asset.category}</p>
                                            <div className="asset-actions">
                                                <button className="btn-icon" onClick={() => handleEditItem(asset, "asset")}>
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "asset")}>
                                                    <FiTrash2 />
                                                </button>
                                                <button className="btn-icon">
                                                    <FiDownload />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeSubTabId === "campaigns" && (
                        <div className="campaigns">
                            {campaigns.length === 0 ? (
                                <div className="empty-state">
                                    <p>No campaigns available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("campaign")}>
                                        Add Campaign
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Campaign</th>
                                            <th>Platform</th>
                                            <th>Start Date</th>
                                            <th>Status</th>
                                            <th>Performance</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {campaigns.map((campaign, index) => (
                                            <tr key={index}>
                                                <td>{campaign.name}</td>
                                                <td>{campaign.platform}</td>
                                                <td>{campaign.startDate}</td>
                                                <td><span className={`status-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span></td>
                                                <td>
                                                    <div className="performance-metrics">
                                                        <span>Impressions: {campaign.impressions}</span>
                                                        <span>Clicks: {campaign.clicks}</span>
                                                        <span>CTR: {campaign.ctr}%</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(campaign, "campaign")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "campaign")}>
                                                            <FiTrash2 />
                                                        </button>
                                                        <button className="btn-icon">
                                                            <FiBarChart2 />
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
                </div>
            </div>
        );
    };

    // Finance Section
    const renderFinance = () => {
        const subTabs = [
            { id: "invoices", label: "Invoices", icon: <FiCreditCard /> },
            { id: "revenueShare", label: "Revenue Share", icon: <FiDollarSign /> },
            { id: "profitLoss", label: "Profit & Loss", icon: <FiTrendingUp /> }
        ];

        const activeSubTabId = activeSubTab.finance || "invoices";

        return (
            <div className="finance">
                <div className="section-header">
                    <h2>Finance</h2>
                    <div className="header-actions">
                        <button className="btn-primary" onClick={() => handleAddItem(activeSubTabId)}>
                            <FiPlus /> Add {subTabs.find(t => t.id === activeSubTabId)?.label}
                        </button>
                    </div>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, finance: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "invoices" && (
                        <div className="invoices">
                            {invoices.length === 0 ? (
                                <div className="empty-state">
                                    <p>No invoices available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("invoice")}>
                                        Add Invoice
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
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
                                                <td><span className={`status-badge ${invoice.status.toLowerCase()}`}>{invoice.status}</span></td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(invoice, "invoice")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "invoice")}>
                                                            <FiTrash2 />
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
                            )}
                        </div>
                    )}

                    {activeSubTabId === "revenueShare" && (
                        <div className="revenue-share">
                            <div className="dashboard-section">
                                <h3>Revenue Share Overview</h3>
                                <div className="kpi-cards">
                                    <div className="kpi-card">
                                        <div className="kpi-icon revenue">
                                            <FiDollarSign />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{revenueShare.total || "$0"}</h3>
                                            <p>Total Revenue</p>
                                        </div>
                                    </div>
                                    <div className="kpi-card">
                                        <div className="kpi-icon ventures">
                                            <FiPieChart />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{revenueShare.ventures || 0}</h3>
                                            <p>Active Ventures</p>
                                        </div>
                                    </div>
                                    <div className="kpi-card">
                                        <div className="kpi-icon arr">
                                            <FiTrendingUp />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{revenueShare.growth || "0%"}</h3>
                                            <p>Growth Rate</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="revenue-chart">
                                <h3>Revenue Distribution</h3>
                                <div className="chart-placeholder">
                                    <p>Revenue distribution chart will appear here</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSubTabId === "profitLoss" && (
                        <div className="profit-loss">
                            <div className="dashboard-section">
                                <h3>Profit & Loss Summary</h3>
                                <div className="kpi-cards">
                                    <div className="kpi-card">
                                        <div className="kpi-icon revenue">
                                            <FiDollarSign />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{profitLoss.revenue || "$0"}</h3>
                                            <p>Total Revenue</p>
                                        </div>
                                    </div>
                                    <div className="kpi-card">
                                        <div className="kpi-icon expenses">
                                            <FiCreditCard />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{profitLoss.expenses || "$0"}</h3>
                                            <p>Total Expenses</p>
                                        </div>
                                    </div>
                                    <div className="kpi-card">
                                        <div className="kpi-icon profit">
                                            <FiTrendingUp />
                                        </div>
                                        <div className="kpi-details">
                                            <h3>{profitLoss.profit || "$0"}</h3>
                                            <p>Net Profit</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pnl-chart">
                                <h3>Profit & Loss Trend</h3>
                                <div className="chart-placeholder">
                                    <p>Profit & Loss trend chart will appear here</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Legal & Compliance Section
    const renderLegalCompliance = () => {
        const subTabs = [
            { id: "contracts", label: "Contracts", icon: <FiFileText /> },
            { id: "complianceCalendar", label: "Compliance Calendar", icon: <FiCalendar /> }
        ];

        const activeSubTabId = activeSubTab.legal || "contracts";

        return (
            <div className="legal-compliance">
                <div className="section-header">
                    <h2>Legal & Compliance</h2>
                    <div className="header-actions">
                        <button className="btn-primary" onClick={() => handleAddItem(activeSubTabId)}>
                            <FiPlus /> Add {subTabs.find(t => t.id === activeSubTabId)?.label}
                        </button>
                    </div>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, legal: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "contracts" && (
                        <div className="contracts">
                            {contracts.length === 0 ? (
                                <div className="empty-state">
                                    <p>No contracts available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("contract")}>
                                        Add Contract
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Party</th>
                                            <th>Type</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {contracts.map((contract, index) => (
                                            <tr key={index}>
                                                <td>{contract.title}</td>
                                                <td>{contract.party}</td>
                                                <td>{contract.type}</td>
                                                <td>{contract.startDate}</td>
                                                <td>{contract.endDate}</td>
                                                <td><span className={`status-badge ${contract.status.toLowerCase()}`}>{contract.status}</span></td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(contract, "contract")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "contract")}>
                                                            <FiTrash2 />
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
                            )}
                        </div>
                    )}

                    {activeSubTabId === "complianceCalendar" && (
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
                                        <h3>Compliance Calendar</h3>
                                        <div className="calendar-nav">
                                            <button className="btn-icon"><FiChevronLeft /></button>
                                            <button className="btn-icon"><FiChevronRight /></button>
                                        </div>
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
                                                    <p><span>Type:</span> {event.type}</p>
                                                    <p><span>Due Date:</span> {event.dueDate}</p>
                                                    <p><span>Status:</span>
                                                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                                                            {event.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="compliance-actions">
                                                    <button className="btn-icon" onClick={() => handleEditItem(event, "complianceEvent")}>
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
    };

    // Documents Section
    const renderDocuments = () => (
        <div className="documents">
            <div className="section-header">
                <h2>Documents & Assets</h2>
                <div className="header-actions">
                    <div className="search-bar">
                        <FiSearch />
                        <input type="text" placeholder="Search documents..." />
                    </div>
                    <button className="btn-primary" onClick={() => handleAddItem("document")}>
                        <FiPlus /> Add Document
                    </button>
                </div>
            </div>
            <div className="document-categories">
                {['Brand Kit', 'Pitch Deck', 'SOP', 'Legal', 'Financial'].map(category => (
                    <div key={category} className="document-category">
                        <h3>{category}</h3>
                        <div className="document-list">
                            {documents
                                .filter(doc => doc.category === category)
                                .map((doc, index) => (
                                    <div key={index} className="document-item">
                                        <div className="document-icon">
                                            <FiFile />
                                        </div>
                                        <div className="document-info">
                                            <h4>{doc.name}</h4>
                                            <p><span>Access:</span> {doc.accessLevel}</p>
                                        </div>
                                        <div className="document-actions">
                                            <button className="btn-icon" onClick={() => handleEditItem(doc, "document")}>
                                                <FiEdit />
                                            </button>
                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "document")}>
                                                <FiTrash2 />
                                            </button>
                                            <button className="btn-icon">
                                                <FiDownload />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            {documents.filter(doc => doc.category === category).length === 0 && (
                                <div className="empty-category">
                                    <p>No documents in this category</p>
                                    <button className="btn-text" onClick={() => handleAddItem("document", { category })}>
                                        Add Document
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // CRM Section
    const renderCRM = () => {
        const subTabs = [
            { id: "investors", label: "Investors", icon: <FiUsers /> },
            { id: "mentors", label: "Mentors", icon: <FiUserCheck /> },
            { id: "partners", label: "Partners", icon: <FiBriefcase /> },
            { id: "campaigns", label: "Campaigns", icon: <FiTarget /> }
        ];

        const activeSubTabId = activeSubTab.crm || "investors";

        return (
            <div className="crm">
                <div className="section-header">
                    <h2>CRM & Outreach</h2>
                    <div className="header-actions">
                        <button className="btn-primary" onClick={() => handleAddItem(activeSubTabId)}>
                            <FiPlus /> Add {subTabs.find(t => t.id === activeSubTabId)?.label}
                        </button>
                    </div>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, crm: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "investors" && (
                        <div className="investors">
                            {investors.filter(inv => inv.type === 'investor').length === 0 ? (
                                <div className="empty-state">
                                    <p>No investors available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'investor' })}>
                                        Add Investor
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Firm</th>
                                            <th>Stage</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {investors
                                            .filter(inv => inv.type === 'investor')
                                            .map((investor, index) => (
                                                <tr key={index}>
                                                    <td>{investor.name}</td>
                                                    <td>{investor.firm}</td>
                                                    <td><span className={`status-badge ${investor.stage?.toLowerCase()}`}>{investor.stage}</span></td>
                                                    <td>{investor.email}</td>
                                                    <td>{investor.phone}</td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="btn-icon" onClick={() => handleEditItem(investor, "investor")}>
                                                                <FiEdit />
                                                            </button>
                                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                                <FiTrash2 />
                                                            </button>
                                                            <button className="btn-icon">
                                                                <FiMail />
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

                    {activeSubTabId === "mentors" && (
                        <div className="mentors">
                            {investors.filter(inv => inv.type === 'mentor').length === 0 ? (
                                <div className="empty-state">
                                    <p>No mentors available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'mentor' })}>
                                        Add Mentor
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Expertise</th>
                                            <th>Availability</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {investors
                                            .filter(inv => inv.type === 'mentor')
                                            .map((mentor, index) => (
                                                <tr key={index}>
                                                    <td>{mentor.name}</td>
                                                    <td>{mentor.expertise}</td>
                                                    <td><span className={`status-badge ${mentor.availability?.toLowerCase()}`}>{mentor.availability}</span></td>
                                                    <td>{mentor.email}</td>
                                                    <td>{mentor.phone}</td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="btn-icon" onClick={() => handleEditItem(mentor, "investor")}>
                                                                <FiEdit />
                                                            </button>
                                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                                <FiTrash2 />
                                                            </button>
                                                            <button className="btn-icon">
                                                                <FiMail />
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

                    {activeSubTabId === "partners" && (
                        <div className="partners">
                            {investors.filter(inv => inv.type === 'partner').length === 0 ? (
                                <div className="empty-state">
                                    <p>No partners available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("investor", { type: 'partner' })}>
                                        Add Partner
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Company</th>
                                            <th>Industry</th>
                                            <th>Partnership Type</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {investors
                                            .filter(inv => inv.type === 'partner')
                                            .map((partner, index) => (
                                                <tr key={index}>
                                                    <td>{partner.name}</td>
                                                    <td>{partner.company}</td>
                                                    <td>{partner.industry}</td>
                                                    <td>{partner.partnershipType}</td>
                                                    <td>{partner.email}</td>
                                                    <td>
                                                        <div className="table-actions">
                                                            <button className="btn-icon" onClick={() => handleEditItem(partner, "investor")}>
                                                                <FiEdit />
                                                            </button>
                                                            <button className="btn-icon" onClick={() => handleDeleteItem(index, "investor")}>
                                                                <FiTrash2 />
                                                            </button>
                                                            <button className="btn-icon">
                                                                <FiMail />
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

                    {activeSubTabId === "campaigns" && (
                        <div className="campaigns">
                            {campaigns.length === 0 ? (
                                <div className="empty-state">
                                    <p>No campaigns available</p>
                                    <button className="btn-primary" onClick={() => handleAddItem("campaign")}>
                                        Add Campaign
                                    </button>
                                </div>
                            ) : (
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Campaign</th>
                                            <th>Target Audience</th>
                                            <th>Start Date</th>
                                            <th>Status</th>
                                            <th>Performance</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {campaigns.map((campaign, index) => (
                                            <tr key={index}>
                                                <td>{campaign.name}</td>
                                                <td>{campaign.targetAudience}</td>
                                                <td>{campaign.startDate}</td>
                                                <td><span className={`status-badge ${campaign.status.toLowerCase()}`}>{campaign.status}</span></td>
                                                <td>
                                                    <div className="performance-metrics">
                                                        <span>Sent: {campaign.sent}</span>
                                                        <span>Opened: {campaign.opened}</span>
                                                        <span>Clicked: {campaign.clicked}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="table-actions">
                                                        <button className="btn-icon" onClick={() => handleEditItem(campaign, "campaign")}>
                                                            <FiEdit />
                                                        </button>
                                                        <button className="btn-icon" onClick={() => handleDeleteItem(index, "campaign")}>
                                                            <FiTrash2 />
                                                        </button>
                                                        <button className="btn-icon">
                                                            <FiBarChart2 />
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
                </div>
            </div>
        );
    };

    // Support Section
    const renderSupport = () => (
        <div className="support">
            <div className="section-header">
                <h2>Support & Tickets</h2>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => handleAddItem("ticket")}>
                        <FiPlus /> Add Ticket
                    </button>
                </div>
            </div>
            <div className="tickets-container">
                <div className="tickets-filters">
                    <div className="filter-group">
                        <label>Status:</label>
                        <select>
                            <option>All</option>
                            <option>Open</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Priority:</label>
                        <select>
                            <option>All</option>
                            <option>Critical</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                </div>
                <div className="tickets-list">
                    {tickets.length === 0 ? (
                        <div className="empty-state">
                            <p>No support tickets available</p>
                            <button className="btn-primary" onClick={() => handleAddItem("ticket")}>
                                Add Ticket
                            </button>
                        </div>
                    ) : (
                        tickets.map((ticket, index) => (
                            <div key={index} className="ticket-card">
                                <div className="ticket-header">
                                    <h3>{ticket.title}</h3>
                                    <div className="ticket-meta">
                                        <span className={`priority-badge ${ticket.priority.toLowerCase()}`}>
                                            {ticket.priority}
                                        </span>
                                        <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="ticket-details">
                                    <p><span>From:</span> {ticket.from}</p>
                                    <p><span>SLA:</span> {ticket.sla} hours</p>
                                    <p>{ticket.description}</p>
                                </div>
                                <div className="ticket-actions">
                                    <button className="btn-icon" onClick={() => handleEditItem(ticket, "ticket")}>
                                        <FiEdit />
                                    </button>
                                    <button className="btn-icon" onClick={() => handleDeleteItem(index, "ticket")}>
                                        <FiTrash2 />
                                    </button>
                                    <button className="btn-icon">
                                        <FiMail />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    // Reports Section
    const renderReports = () => (
        <div className="reports">
            <div className="section-header">
                <h2>Reports & Analytics</h2>
                <div className="header-actions">
                    <button className="btn-icon">
                        <FiFilter />
                    </button>
                    <button className="btn-icon">
                        <FiDownload />
                    </button>
                    <button className="btn-primary">
                        <FiPlus /> Generate Report
                    </button>
                </div>
            </div>
            <div className="reports-grid">
                <div className="report-card">
                    <div className="report-header">
                        <h3>Venture Performance</h3>
                        <button className="btn-icon">
                            <FiDownload />
                        </button>
                    </div>
                    <div className="report-content">
                        <div className="chart-placeholder">
                            <p>Venture performance chart</p>
                        </div>
                    </div>
                    <div className="report-footer">
                        <button className="btn-secondary">View Details</button>
                    </div>
                </div>
                <div className="report-card">
                    <div className="report-header">
                        <h3>Cohort Analysis</h3>
                        <button className="btn-icon">
                            <FiDownload />
                        </button>
                    </div>
                    <div className="report-content">
                        <div className="chart-placeholder">
                            <p>Cohort analysis chart</p>
                        </div>
                    </div>
                    <div className="report-footer">
                        <button className="btn-secondary">View Details</button>
                    </div>
                </div>
                <div className="report-card">
                    <div className="report-header">
                        <h3>CAC/LTV Tracking</h3>
                        <button className="btn-icon">
                            <FiDownload />
                        </button>
                    </div>
                    <div className="report-content">
                        <div className="chart-placeholder">
                            <p>CAC/LTV tracking chart</p>
                        </div>
                    </div>
                    <div className="report-footer">
                        <button className="btn-secondary">View Details</button>
                    </div>
                </div>
                <div className="report-card">
                    <div className="report-header">
                        <h3>Funnel Reports</h3>
                        <button className="btn-icon">
                            <FiDownload />
                        </button>
                    </div>
                    <div className="report-content">
                        <div className="chart-placeholder">
                            <p>Funnel report chart</p>
                        </div>
                    </div>
                    <div className="report-footer">
                        <button className="btn-secondary">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Automations Section
    const renderAutomations = () => (
        <div className="automations">
            <div className="section-header">
                <h2>Automations</h2>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => handleAddItem("automation")}>
                        <FiPlus /> Add Automation
                    </button>
                </div>
            </div>
            <div className="automations-list">
                {automations.length === 0 ? (
                    <div className="empty-state">
                        <p>No automations configured</p>
                        <button className="btn-primary" onClick={() => handleAddItem("automation")}>
                            Add Automation
                        </button>
                    </div>
                ) : (
                    automations.map((automation, index) => (
                        <div key={index} className="automation-card">
                            <div className="automation-header">
                                <h3>{automation.name}</h3>
                                <div className="automation-status">
                                    <span className={`status-badge ${automation.status.toLowerCase()}`}>
                                        {automation.status}
                                    </span>
                                </div>
                            </div>
                            <div className="automation-details">
                                <p><span>Trigger:</span> {automation.trigger}</p>
                                <p><span>Action:</span> {automation.action}</p>
                                <p><span>Schedule:</span> {automation.schedule}</p>
                            </div>
                            <div className="automation-actions">
                                <button className="btn-icon" onClick={() => handleEditItem(automation, "automation")}>
                                    <FiEdit />
                                </button>
                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "automation")}>
                                    <FiTrash2 />
                                </button>
                                <button className="btn-icon">
                                    <FiPlay />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    // Users Section
    const renderUsers = () => (
        <div className="users">
            <div className="section-header">
                <h2>Users & Teams</h2>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => handleAddItem("user")}>
                        <FiPlus /> Add User
                    </button>
                </div>
            </div>
            <div className="users-grid">
                <div className="teams-section">
                    <h3>Teams</h3>
                    <div className="teams-list">
                        {['Product', 'Marketing', 'Finance', 'Operations'].map(team => (
                            <div key={team} className="team-card">
                                <h4>{team} Team</h4>
                                <p>{teams.filter(user => user.teams?.includes(team)).length} members</p>
                                <button className="btn-secondary">Manage Team</button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="users-section">
                    <h3>Users</h3>
                    <div className="users-table">
                        {teams.length === 0 ? (
                            <div className="empty-state">
                                <p>No users available</p>
                                <button className="btn-primary" onClick={() => handleAddItem("user")}>
                                    Add User
                                </button>
                            </div>
                        ) : (
                            <div className="data-table">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Teams</th>
                                        <th>Performance</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teams.map((user, index) => (
                                        <tr key={index}>
                                            <td className="user-name">
                                                <div className="user-avatar">
                                                    {user.name.charAt(0)}
                                                </div>
                                                {user.name}
                                            </td>
                                            <td>{user.email}</td>
                                            <td><span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span></td>
                                            <td>{user.teams?.join(', ') || 'None'}</td>
                                            <td>
                                                <div className="performance-metrics">
                                                    <span>Tasks: {user.tasksCompleted}</span>
                                                    <span>Goals: {user.goalsAchieved}</span>
                                                    <span>Score: {user.performanceScore}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon" onClick={() => handleEditItem(user, "user")}>
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
                </div>
            </div>
        </div>
    );

    // Settings Section
    const renderSettings = () => {
        const subTabs = [
            { id: "branding", label: "Branding", icon: <FiAward /> },
            { id: "integrations", label: "Integrations", icon: <FiShare2 /> },
            { id: "security", label: "Security", icon: <FiShield /> },
            { id: "billing", label: "Billing", icon: <FiCreditCard /> },
            { id: "auditLogs", label: "Audit Logs", icon: <FiActivity /> }
        ];

        const activeSubTabId = activeSubTab.settings || "branding";

        return (
            <div className="settings">
                <div className="section-header">
                    <h2>Settings</h2>
                </div>

                <div className="sub-tabs">
                    {subTabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`sub-tab ${activeSubTabId === tab.id ? "active" : ""}`}
                            onClick={() => setActiveSubTab({...activeSubTab, settings: tab.id})}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <div className="sub-tab-content">
                    {activeSubTabId === "branding" && (
                        <div className="branding-settings">
                            <div className="settings-form">
                                <h3>Branding Settings</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const formData = new FormData(e.target);
                                    const data = Object.fromEntries(formData.entries());
                                    setSettings({
                                        ...settings,
                                        companyName: data.companyName,
                                        primaryColor: data.primaryColor,
                                        secondaryColor: data.secondaryColor
                                    });
                                    alert("Branding settings updated!");
                                }}>
                                    <div className="form-group">
                                        <label>Company Name</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            defaultValue={settings.companyName || 'Ecstasy Ventures'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Primary Color</label>
                                        <input
                                            type="color"
                                            name="primaryColor"
                                            defaultValue={settings.primaryColor || '#001f3f'}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Secondary Color</label>
                                        <input
                                            type="color"
                                            name="secondaryColor"
                                            defaultValue={settings.secondaryColor || '#ff851b'}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeSubTabId === "integrations" && (
                        <div className="integrations-settings">
                            <div className="settings-header">
                                <h3>Integrations</h3>
                                <button className="btn-primary" onClick={() => handleAddItem("setting", { typeData: { type: 'integration' } })}>
                                    <FiPlus /> Add Integration
                                </button>
                            </div>
                            <div className="integrations-list">
                                {settings.integrations && settings.integrations.length > 0 ? (
                                    settings.integrations.map((integration, index) => (
                                        <div key={index} className="integration-card">
                                            <div className="integration-header">
                                                <h4>{integration.name}</h4>
                                                <span className={`status-badge ${integration.status.toLowerCase()}`}>
                                                    {integration.status}
                                                </span>
                                            </div>
                                            <div className="integration-details">
                                                <p>{integration.description}</p>
                                                <p><span>Connected:</span> {integration.connectedDate}</p>
                                            </div>
                                            <div className="integration-actions">
                                                <button className="btn-icon" onClick={() => handleEditItem(integration, "setting")}>
                                                    <FiEdit />
                                                </button>
                                                <button className="btn-icon" onClick={() => handleDeleteItem(index, "setting")}>
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>No integrations configured</p>
                                        <button className="btn-primary" onClick={() => handleAddItem("setting", { typeData: { type: 'integration' } })}>
                                            Add Integration
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeSubTabId === "security" && (
                        <div className="security-settings">
                            <div className="settings-form">
                                <h3>Security Settings</h3>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    alert("Security settings updated!");
                                }}>
                                    <div className="form-group">
                                        <label>Two-Factor Authentication</label>
                                        <div className="toggle-switch">
                                            <input type="checkbox" id="2fa" defaultChecked />
                                            <label htmlFor="2fa"></label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Session Timeout (minutes)</label>
                                        <input type="number" defaultValue="30" min="5" max="120" />
                                    </div>
                                    <div className="form-group">
                                        <label>Password Policy</label>
                                        <select defaultValue="medium">
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-primary">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeSubTabId === "billing" && (
                        <div className="billing-settings">
                            <div className="billing-overview">
                                <h3>Billing Overview</h3>
                                <div className="billing-cards">
                                    <div className="billing-card">
                                        <h4>Current Plan</h4>
                                        <p>Professional</p>
                                        <button className="btn-secondary">Upgrade Plan</button>
                                    </div>
                                    <div className="billing-card">
                                        <h4>Next Billing Date</h4>
                                        <p>July 15, 2023</p>
                                        <button className="btn-secondary">Update Payment</button>
                                    </div>
                                    <div className="billing-card">
                                        <h4>Usage</h4>
                                        <p>15 of 25 users</p>
                                        <button className="btn-secondary">Manage Users</button>
                                    </div>
                                </div>
                            </div>
                            <div className="billing-history">
                                <h3>Billing History</h3>
                                <div className="data-table">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Jun 15, 2023</td>
                                            <td>Monthly Subscription</td>
                                            <td>$99.00</td>
                                            <td><span className="status-badge paid">Paid</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon">
                                                        <FiDownload />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>May 15, 2023</td>
                                            <td>Monthly Subscription</td>
                                            <td>$99.00</td>
                                            <td><span className="status-badge paid">Paid</span></td>
                                            <td>
                                                <div className="table-actions">
                                                    <button className="btn-icon">
                                                        <FiDownload />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSubTabId === "auditLogs" && (
                        <div className="audit-logs">
                            <div className="logs-header">
                                <h3>Audit Logs</h3>
                                <div className="logs-filters">
                                    <div className="filter-group">
                                        <label>Date Range:</label>
                                        <select>
                                            <option>Last 7 days</option>
                                            <option>Last 30 days</option>
                                            <option>Last 90 days</option>
                                        </select>
                                    </div>
                                    <div className="filter-group">
                                        <label>User:</label>
                                        <select>
                                            <option>All Users</option>
                                            <option>You</option>
                                        </select>
                                    </div>
                                    <div className="filter-group">
                                        <label>Action:</label>
                                        <select>
                                            <option>All Actions</option>
                                            <option>Login</option>
                                            <option>Create</option>
                                            <option>Update</option>
                                            <option>Delete</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="logs-list">
                                <div className="data-table">
                                    <table>
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
                                        <tr>
                                            <td>Jun 20, 2023 10:30 AM</td>
                                            <td>admin@example.com</td>
                                            <td>Login</td>
                                            <td>User logged in successfully</td>
                                            <td>192.168.1.1</td>
                                        </tr>
                                        <tr>
                                            <td>Jun 20, 2023 10:15 AM</td>
                                            <td>admin@example.com</td>
                                            <td>Create</td>
                                            <td>Created new venture "Tech Startup"</td>
                                            <td>192.168.1.1</td>
                                        </tr>
                                        <tr>
                                            <td>Jun 19, 2023 4:45 PM</td>
                                            <td>admin@example.com</td>
                                            <td>Update</td>
                                            <td>Updated settings for branding</td>
                                            <td>192.168.1.1</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

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
            case "deals":
                return renderDealsEquity();
            case "growth":
                return renderGrowthMarketing();
            case "finance":
                return renderFinance();
            case "legal":
                return renderLegalCompliance();
            case "documents":
                return renderDocuments();
            case "crm":
                return renderCRM();
            case "support":
                return renderSupport();
            case "reports":
                return renderReports();
            case "automations":
                return renderAutomations();
            case "users":
                return renderUsers();
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
                                <span>{user?.role}</span>
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
                        <button className="close-btn" onClick={() => {
                            setShowAddModal(false);
                            setEditingItem(null);
                        }}>
                            ✕
                        </button>
                        <h2>{editingItem ? `Edit ${newItem.type}` : `Add New ${newItem.type}`}</h2>
                        <form onSubmit={handleFormSubmit}>
                            {newItem.type === "event" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter event title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            defaultValue={editingItem ? editingItem.date : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Time</label>
                                        <input
                                            type="text"
                                            name="time"
                                            defaultValue={editingItem ? editingItem.time : ''}
                                            placeholder="e.g., 10:00 AM - 12:00 PM"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {newItem.type === "task" && (
                                <>
                                    <div className="form-group">
                                        <label>Task Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter task title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingItem ? editingItem.description : ''}
                                            placeholder="Enter task description"
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Assignee</label>
                                        <select
                                            name="assignee"
                                            defaultValue={editingItem ? editingItem.assignee : ''}
                                            required
                                        >
                                            <option value="">Select assignee</option>
                                            <option value="You">You</option>
                                            <option value="Jane">Jane</option>
                                            <option value="John">John</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            defaultValue={editingItem ? editingItem.dueDate : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="inProgress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            {newItem.type === "venture" && (
                                <>
                                    <div className="form-group">
                                        <label>Venture Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter venture name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Industry</label>
                                        <input
                                            type="text"
                                            name="industry"
                                            defaultValue={editingItem ? editingItem.industry : ''}
                                            placeholder="Enter industry"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Stage</label>
                                        <select
                                            name="stage"
                                            defaultValue={editingItem ? editingItem.stage : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="revenue"
                                            defaultValue={editingItem ? editingItem.revenue : ''}
                                            placeholder="Enter revenue"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Risk Level</label>
                                        <select
                                            name="risk"
                                            defaultValue={editingItem ? editingItem.risk : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter founder name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            defaultValue={editingItem ? editingItem.company : ''}
                                            placeholder="Enter company name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={editingItem ? editingItem.email : ''}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            defaultValue={editingItem ? editingItem.phone : ''}
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>KYC Status</label>
                                        <select
                                            name="kyc"
                                            defaultValue={editingItem ? editingItem.kyc : ''}
                                            required
                                        >
                                            <option value="">Select KYC status</option>
                                            <option value="Verified">Verified</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </>
                            )}
                            {newItem.type === "termSheet" && (
                                <>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter term sheet title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input
                                            type="text"
                                            name="company"
                                            defaultValue={editingItem ? editingItem.company : ''}
                                            placeholder="Enter company name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input
                                            type="text"
                                            name="amount"
                                            defaultValue={editingItem ? editingItem.amount : ''}
                                            placeholder="Enter investment amount"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter content title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Platform</label>
                                        <select
                                            name="platform"
                                            defaultValue={editingItem ? editingItem.platform : ''}
                                            required
                                        >
                                            <option value="">Select platform</option>
                                            <option value="LinkedIn">LinkedIn</option>
                                            <option value="Twitter">Twitter</option>
                                            <option value="Blog">Blog</option>
                                            <option value="Email">Email</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Publish Date</label>
                                        <input
                                            type="date"
                                            name="publishDate"
                                            defaultValue={editingItem ? editingItem.publishDate : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="number"
                                            defaultValue={editingItem ? editingItem.number : ''}
                                            placeholder="Enter invoice number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Client</label>
                                        <input
                                            type="text"
                                            name="client"
                                            defaultValue={editingItem ? editingItem.client : ''}
                                            placeholder="Enter client name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Amount</label>
                                        <input
                                            type="text"
                                            name="amount"
                                            defaultValue={editingItem ? editingItem.amount : ''}
                                            placeholder="Enter invoice amount"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            defaultValue={editingItem ? editingItem.dueDate : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter contract title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Party</label>
                                        <input
                                            type="text"
                                            name="party"
                                            defaultValue={editingItem ? editingItem.party : ''}
                                            placeholder="Enter party name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select
                                            name="type"
                                            defaultValue={editingItem ? editingItem.type : ''}
                                            required
                                        >
                                            <option value="">Select contract type</option>
                                            <option value="NDA">NDA</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Service">Service</option>
                                            <option value="Employment">Employment</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            defaultValue={editingItem ? editingItem.startDate : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            defaultValue={editingItem ? editingItem.endDate : ''}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter document name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            name="category"
                                            defaultValue={editingItem ? editingItem.category : ''}
                                            required
                                        >
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
                                        <select
                                            name="accessLevel"
                                            defaultValue={editingItem ? editingItem.accessLevel : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={editingItem ? editingItem.email : ''}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            defaultValue={editingItem ? editingItem.phone : ''}
                                            placeholder="Enter phone number"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Type</label>
                                        <select
                                            name="type"
                                            defaultValue={editingItem ? editingItem.type : ''}
                                            required
                                        >
                                            <option value="">Select type</option>
                                            <option value="investor">Investor</option>
                                            <option value="mentor">Mentor</option>
                                            <option value="partner">Partner</option>
                                        </select>
                                    </div>
                                    {newItem.type === 'investor' && (
                                        <>
                                            <div className="form-group">
                                                <label>Firm</label>
                                                <input
                                                    type="text"
                                                    name="firm"
                                                    defaultValue={editingItem ? editingItem.firm : ''}
                                                    placeholder="Enter firm name"
                                                />
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
                                    {newItem.type === 'mentor' && (
                                        <>
                                            <div className="form-group">
                                                <label>Expertise</label>
                                                <input
                                                    type="text"
                                                    name="expertise"
                                                    defaultValue={editingItem ? editingItem.expertise : ''}
                                                    placeholder="Enter area of expertise"
                                                />
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
                                    {newItem.type === 'partner' && (
                                        <>
                                            <div className="form-group">
                                                <label>Company</label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    defaultValue={editingItem ? editingItem.company : ''}
                                                    placeholder="Enter company name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Industry</label>
                                                <input
                                                    type="text"
                                                    name="industry"
                                                    defaultValue={editingItem ? editingItem.industry : ''}
                                                    placeholder="Enter industry"
                                                />
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
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={editingItem ? editingItem.title : ''}
                                            placeholder="Enter ticket title"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingItem ? editingItem.description : ''}
                                            placeholder="Enter ticket description"
                                        ></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>From</label>
                                        <input
                                            type="text"
                                            name="from"
                                            defaultValue={editingItem ? editingItem.from : ''}
                                            placeholder="Enter requester name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Priority</label>
                                        <select
                                            name="priority"
                                            defaultValue={editingItem ? editingItem.priority : ''}
                                            required
                                        >
                                            <option value="">Select priority</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Critical">Critical</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>SLA (hours)</label>
                                        <input
                                            type="number"
                                            name="sla"
                                            defaultValue={editingItem ? editingItem.sla : ''}
                                            placeholder="Enter SLA in hours"
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            {newItem.type === "automation" && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter automation name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Trigger</label>
                                        <select
                                            name="trigger"
                                            defaultValue={editingItem ? editingItem.trigger : ''}
                                            required
                                        >
                                            <option value="">Select trigger</option>
                                            <option value="Time-based">Time-based</option>
                                            <option value="Event-based">Event-based</option>
                                            <option value="Action-based">Action-based</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Action</label>
                                        <select
                                            name="action"
                                            defaultValue={editingItem ? editingItem.action : ''}
                                            required
                                        >
                                            <option value="">Select action</option>
                                            <option value="Send Email">Send Email</option>
                                            <option value="Create Task">Create Task</option>
                                            <option value="Generate Report">Generate Report</option>
                                            <option value="Update Record">Update Record</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Schedule</label>
                                        <select
                                            name="schedule"
                                            defaultValue={editingItem ? editingItem.schedule : ''}
                                            required
                                        >
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
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder="Enter user name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            defaultValue={editingItem ? editingItem.email : ''}
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Role</label>
                                        <select
                                            name="role"
                                            defaultValue={editingItem ? editingItem.role : ''}
                                            required
                                        >
                                            <option value="">Select role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="User">User</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Teams (comma separated)</label>
                                        <input
                                            type="text"
                                            name="teams"
                                            defaultValue={editingItem ? editingItem.teams?.join(', ') : ''}
                                            placeholder="e.g., Team A, Team B"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            name="status"
                                            defaultValue={editingItem ? editingItem.status : ''}
                                            required
                                        >
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
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    defaultValue={settings.companyName || ''}
                                                    placeholder="Enter company name"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Primary Color</label>
                                                <input
                                                    type="color"
                                                    name="primaryColor"
                                                    defaultValue={settings.primaryColor || '#001f3f'}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Secondary Color</label>
                                                <input
                                                    type="color"
                                                    name="secondaryColor"
                                                    defaultValue={settings.secondaryColor || '#ff851b'}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    {newItem.typeData?.type === 'integration' && (
                                        <>
                                            <div className="form-group">
                                                <label>Integration Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    defaultValue={editingItem ? editingItem.name : ''}
                                                    placeholder="Enter integration name"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    defaultValue={editingItem ? editingItem.description : ''}
                                                    placeholder="Enter description"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>API Key</label>
                                                <input
                                                    type="text"
                                                    name="apiKey"
                                                    defaultValue={editingItem ? editingItem.apiKey : ''}
                                                    placeholder="Enter API key"
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}
                            {!["event", "task", "venture", "founder", "termSheet", "content", "invoice", "contract", "document", "investor", "ticket", "automation", "user", "setting"].includes(newItem.type) && (
                                <>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={editingItem ? editingItem.name : ''}
                                            placeholder={`Enter ${newItem.type} name`}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                            name="description"
                                            defaultValue={editingItem ? editingItem.description : ''}
                                            placeholder={`Enter ${newItem.type} description`}
                                        ></textarea>
                                    </div>
                                </>
                            )}
                            <button type="submit" className="btn-primary">
                                <FiSave /> {editingItem ? `Update ${newItem.type}` : `Add ${newItem.type}`}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
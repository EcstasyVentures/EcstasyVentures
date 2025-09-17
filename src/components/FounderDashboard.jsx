// FounderDashboard.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome, FiUsers, FiDollarSign, FiCheckSquare, FiTrendingUp, FiFileText,
  FiSearch, FiPlus, FiEdit, FiTrash2, FiCalendar, FiDownload, FiMail,
  FiBarChart2, FiSettings, FiBell, FiLogOut, FiFile, FiSave, FiBriefcase, FiTarget,
  FiActivity, FiAward, FiClock, FiStar
} from "react-icons/fi";
import "../styles.css";

export default function FounderDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [founder, setFounder] = useState(null);
  const [company, setCompany] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [milestones, setMilestones] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [idCounter, setIdCounter] = useState(1);

  const stateRef = useRef();
  stateRef.current = { kpiData, milestones, investors, documents, tasks, metrics, notifications };

  const generateUniqueId = () => {
    const newId = idCounter;
    setIdCounter((c) => c + 1);
    return newId;
  };

  const saveFounderData = useCallback(async () => {
    const founderId = localStorage.getItem("founderId");
    if (!founderId) return;
    try {
      await fetch(`http://localhost:5000/api/founder-data/${founderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stateRef.current || {}),
      });
    } catch (e) {
      console.error("save error", e);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => saveFounderData(), 1000);
    return () => clearTimeout(t);
  }, [kpiData, milestones, investors, documents, tasks, metrics, notifications, saveFounderData]);

  const fetchFounderData = async () => {
    const founderId = localStorage.getItem("founderId");
    if (!founderId) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/founder-data/${founderId}`);
      const data = await res.json();

      setKpiData(data.kpiData || {});
      setMilestones(data.milestones || []);
      setInvestors(data.investors || []);
      setDocuments(data.documents || []);
      setTasks(data.tasks || []);
      setMetrics(data.metrics || {});
      setNotifications(data.notifications || []);

      setFounder(data.founder || { name: "John Doe", email: "john@startup.com" });
      setCompany(data.company || { name: "My Startup", stage: "Pre-Seed", industry: "Tech" });

      // --- fast id counter ---------------------------------
      const arrays = [data.milestones, data.investors, data.documents, data.tasks, data.notifications];
      let max = 0;
      arrays.forEach((arr) => {
        if (Array.isArray(arr)) {
          arr.forEach((item) => {
            const n = Number(item.id);
            if (!isNaN(n) && n > max) max = n;
          });
        }
      });
      setIdCounter(max + 1);
    } catch (e) {
      console.error("fetch error", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("founderId");
    const name = localStorage.getItem("founderName");
    if (!id) {
      navigate("/");
      return;
    }
    setFounder({ id, name });
    fetchFounderData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("founderId");
    localStorage.removeItem("founderName");
    navigate("/");
  };

  /* --------------- everything below is unchanged --------------- */
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
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    switch (type) {
      case "milestone": setMilestones((m) => m.filter((x) => x.id !== id)); break;
      case "investor": setInvestors((m) => m.filter((x) => x.id !== id)); break;
      case "document": setDocuments((m) => m.filter((x) => x.id !== id)); break;
      case "task": setTasks((m) => m.filter((x) => x.id !== id)); break;
      default: break;
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());

    switch (newItem.type) {
      case "milestone": {
        const o = { id: editingItem ? editingItem.id : generateUniqueId(), title: data.title, description: data.description, dueDate: data.dueDate, status: data.status, priority: data.priority };
        setMilestones((m) => (editingItem ? m.map((x) => (x.id === editingItem.id ? o : x)) : [...m, o]));
        break;
      }
      case "investor": {
        const o = { id: editingItem ? editingItem.id : generateUniqueId(), name: data.name, firm: data.firm, email: data.email, phone: data.phone, stage: data.stage, amount: data.amount, status: data.status };
        setInvestors((m) => (editingItem ? m.map((x) => (x.id === editingItem.id ? o : x)) : [...m, o]));
        break;
      }
      case "document": {
        const o = { id: editingItem ? editingItem.id : generateUniqueId(), name: data.name, category: data.category, type: data.type, uploadDate: new Date().toLocaleDateString(), size: data.size || "2.5 MB" };
        setDocuments((m) => (editingItem ? m.map((x) => (x.id === editingItem.id ? o : x)) : [...m, o]));
        break;
      }
      case "task": {
        const o = { id: editingItem ? editingItem.id : generateUniqueId(), title: data.title, description: data.description, dueDate: data.dueDate, priority: data.priority, status: data.status };
        setTasks((m) => (editingItem ? m.map((x) => (x.id === editingItem.id ? o : x)) : [...m, o]));
        break;
      }
      case "kpi":
        setKpiData({ revenue: data.revenue, burnRate: data.burnRate, runway: data.runway, customers: data.customers, mrr: data.mrr });
        setShowAddModal(false);
        return;
      default: console.log("added", data);
    }
    setShowAddModal(false);
    setEditingItem(null);
  };

  const renderOverview = () => (
    <div className="dashboard-home">
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Company Overview</h2>
          <button className="btn-icon" onClick={() => handleAddItem("kpi")}><FiEdit /></button>
        </div>
        <div className="kpi-cards">
          <div className="kpi-card"><div className="kpi-icon revenue"><FiDollarSign /></div><div className="kpi-details"><h3>{kpiData.revenue || "$0"}</h3><p>Monthly Revenue</p></div></div>
          <div className="kpi-card"><div className="kpi-icon expenses"><FiTrendingUp /></div><div className="kpi-details"><h3>{kpiData.burnRate || "$0"}</h3><p>Burn Rate</p></div></div>
          <div className="kpi-card"><div className="kpi-icon runway"><FiCalendar /></div><div className="kpi-details"><h3>{kpiData.runway || "0"} months</h3><p>Runway</p></div></div>
          <div className="kpi-card"><div className="kpi-icon customers"><FiUsers /></div><div className="kpi-details"><h3>{kpiData.customers || "0"}</h3><p>Total Customers</p></div></div>
          <div className="kpi-card"><div className="kpi-icon mrr"><FiDollarSign /></div><div className="kpi-details"><h3>{kpiData.mrr || "$0"}</h3><p>MRR</p></div></div>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header"><h2>Key Milestones</h2><button className="btn-icon" onClick={() => handleAddItem("milestone")}><FiPlus /></button></div>
          <div className="milestones-list">
            {milestones.length === 0 ? (
              <div className="empty-state"><p>No milestones set</p><button className="btn-primary" onClick={() => handleAddItem("milestone")}>Add Milestone</button></div>
            ) : milestones.map((m) => (
              <div key={m.id} className="milestone-item"><div className="milestone-info"><h4>{m.title}</h4><p>{m.description}</p><p>Due: {m.dueDate}</p></div><div className="milestone-actions"><button className="btn-icon" onClick={() => handleEditItem(m, "milestone")}><FiEdit /></button><button className="btn-icon" onClick={() => handleDeleteItem(m.id, "milestone")}><FiTrash2 /></button></div></div>
            ))}
          </div>
        </div>
        <div className="dashboard-section">
          <div className="section-header"><h2>Recent Notifications</h2><button className="btn-icon"><FiBell /></button></div>
          <div className="notifications-feed">
            {notifications.length === 0 ? <div className="empty-state"><p>No notifications</p></div>
              : notifications.map((n) => (
                <div key={n.id} className="notification-item"><span className="notif-category">{n.category}</span><p>{n.message}</p><span className="notif-time">{n.time}</span></div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvestors = () => (
    <div className="investors-section">
      <div className="section-header"><h2>Investor Relations</h2><button className="btn-primary" onClick={() => handleAddItem("investor")}><FiPlus /> Add Investor</button></div>
      <div className="investors-table-container">
        <table className="investors-table">
          <thead><tr><th>Name</th><th>Firm</th><th>Stage</th><th>Amount</th><th>Status</th><th>Contact</th><th>Actions</th></tr></thead>
          <tbody>
            {investors.length === 0 ? (
              <tr><td colSpan="7" className="empty-table"><p>No investors found</p><button className="btn-primary" onClick={() => handleAddItem("investor")}>Add Investor</button></td></tr>
            ) : investors.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.name}</td><td>{inv.firm}</td><td><span className="status-badge">{inv.stage}</span></td><td>{inv.amount}</td><td><span className="status-badge">{inv.status}</span></td>
                <td><button className="btn-text">Contact</button></td>
                <td><div className="table-actions"><button className="btn-icon" onClick={() => handleEditItem(inv, "investor")}><FiEdit /></button><button className="btn-icon" onClick={() => handleDeleteItem(inv.id, "investor")}><FiTrash2 /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="documents-section">
      <div className="section-header"><h2>Documents & Legal</h2><button className="btn-primary" onClick={() => handleAddItem("document")}><FiPlus /> Add Document</button></div>
      <div className="documents-grid">
        {["Incorporation", "Investment", "Legal", "Financial", "IP & Patents"].map((cat) => (
          <div key={cat} className="document-category">
            <h3>{cat}</h3>
            <div className="document-list">
              {documents.filter((d) => d.category === cat).map((d) => (
                <div key={d.id} className="document-item"><div className="document-icon"><FiFile /></div><div className="document-info"><h4>{d.name}</h4><p>{d.type} • {d.size}</p></div><div className="document-actions"><button className="btn-icon" onClick={() => handleEditItem(d, "document")}><FiEdit /></button><button className="btn-icon" onClick={() => handleDeleteItem(d.id, "document")}><FiTrash2 /></button><button className="btn-icon"><FiDownload /></button></div></div>
              ))}
              {documents.filter((d) => d.category === cat).length === 0 && (
                <div className="empty-category"><p>No documents in this category</p><button className="btn-text" onClick={() => handleAddItem("document", { category: cat })}>Add Document</button></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="tasks-section">
      <div className="section-header"><h2>Tasks & Priorities</h2><button className="btn-primary" onClick={() => handleAddItem("task")}><FiPlus /> Add Task</button></div>
      <div className="tasks-board">
        {["High Priority", "Medium Priority", "Low Priority"].map((pri) => (
          <div key={pri} className="task-column">
            <h3>{pri}</h3>
            <div className="task-list">
              {tasks.filter((t) => t.priority === pri.split(" ")[0]).map((t) => (
                <div key={t.id} className="task-card">
                  <div className="task-header"><h4>{t.title}</h4><div className="task-actions"><button className="btn-icon" onClick={() => handleEditItem(t, "task")}><FiEdit /></button><button className="btn-icon" onClick={() => handleDeleteItem(t.id, "task")}><FiTrash2 /></button></div></div>
                  <div className="task-details"><p>{t.description}</p><p>Due: {t.dueDate}</p></div>
                  <div className="task-footer"><span className={`task-status ${t.status.toLowerCase()}`}>{t.status}</span></div>
                </div>
              ))}
              {tasks.filter((t) => t.priority === pri.split(" ")[0]).length === 0 && (
                <div className="empty-column"><p>No tasks</p><button className="btn-text" onClick={() => handleAddItem("task", { priority: pri.split(" ")[0] })}>Add Task</button></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="metrics-section">
      <div className="section-header"><h2>Performance Metrics</h2></div>
      <div className="metrics-grid">
        {["Customer Acquisition", "Revenue Growth", "User Engagement", "Churn Rate"].map((m) => (
          <div key={m} className="metric-card"><h3>{m}</h3><div className="metric-chart"><div className="chart-placeholder"><p>{m} chart will appear here</p></div></div></div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) return (<div className="loading-container"><div className="loading-spinner"></div><p>Loading founder dashboard...</p></div>);
    switch (activeTab) {
      case "overview": return renderOverview();
      case "investors": return renderInvestors();
      case "documents": return renderDocuments();
      case "tasks": return renderTasks();
      case "metrics": return renderMetrics();
      default: return renderOverview();
    }
  };

  return (
    <div className="dashboard-container founder-dashboard">
      <div className="sidebar founder-sidebar">
        <div className="sidebar-header">
          <div className="logo"><img src="/logo.jpg" alt="Founder Dashboard" /><span>Founder Portal</span></div>
          <p>Welcome, {founder?.name}</p>
          <p className="company-info">{company?.name}</p>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}><FiHome /><span>Overview</span></button>
          <button className={`nav-item ${activeTab === "investors" ? "active" : ""}`} onClick={() => setActiveTab("investors")}><FiUsers /><span>Investors</span></button>
          <button className={`nav-item ${activeTab === "documents" ? "active" : ""}`} onClick={() => setActiveTab("documents")}><FiFileText /><span>Documents</span></button>
          <button className={`nav-item ${activeTab === "tasks" ? "active" : ""}`} onClick={() => setActiveTab("tasks")}><FiCheckSquare /><span>Tasks</span></button>
          <button className={`nav-item ${activeTab === "metrics" ? "active" : ""}`} onClick={() => setActiveTab("metrics")}><FiBarChart2 /><span>Metrics</span></button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}><FiLogOut /> Logout</button>
        </div>
      </div>
      <div className="main-content">
        <div className="topbar founder-topbar">
          <div className="search-bar"><FiSearch /><input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></div>
          <div className="topbar-actions">
            <button className="btn-icon"><FiBell /><span className="notification-badge">{notifications.filter((n) => !n.read).length}</span></button>
            <div className="user-profile">
              <div className="user-avatar">{founder?.name?.charAt(0)}</div>
              <div className="user-info"><p>{founder?.name}</p><span>Founder</span></div>
            </div>
          </div>
        </div>
        <div className="content founder-content">{renderContent()}</div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-container founder-modal">
            <button className="close-btn" onClick={() => { setShowAddModal(false); setEditingItem(null); }}>✕</button>
            <h2>{editingItem ? `Edit ${newItem.type}` : `Add New ${newItem.type}`}</h2>
            <form onSubmit={handleFormSubmit}>
              {/* forms for milestone / investor / document / task / kpi */}
              {newItem.type === "milestone" && (
                <>
                  <div className="form-group"><label>Title</label><input type="text" name="title" defaultValue={editingItem ? editingItem.title : ""} placeholder="Enter milestone title" required /></div>
                  <div className="form-group"><label>Description</label><textarea name="description" defaultValue={editingItem ? editingItem.description : ""} placeholder="Enter milestone description" /></div>
                  <div className="form-group"><label>Due Date</label><input type="date" name="dueDate" defaultValue={editingItem ? editingItem.dueDate : ""} required /></div>
                  <div className="form-group"><label>Priority</label><select name="priority" defaultValue={editingItem ? editingItem.priority : ""} required><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></div>
                  <div className="form-group"><label>Status</label><select name="status" defaultValue={editingItem ? editingItem.status : ""} required><option value="Not Started">Not Started</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option></select></div>
                </>
              )}
              {newItem.type === "investor" && (
                <>
                  <div className="form-group"><label>Name</label><input type="text" name="name" defaultValue={editingItem ? editingItem.name : ""} placeholder="Enter investor name" required /></div>
                  <div className="form-group"><label>Firm</label><input type="text" name="firm" defaultValue={editingItem ? editingItem.firm : ""} placeholder="Enter firm name" required /></div>
                  <div className="form-group"><label>Email</label><input type="email" name="email" defaultValue={editingItem ? editingItem.email : ""} placeholder="Enter email address" required /></div>
                  <div className="form-group"><label>Phone</label><input type="tel" name="phone" defaultValue={editingItem ? editingItem.phone : ""} placeholder="Enter phone number" /></div>
                  <div className="form-group"><label>Investment Stage</label><select name="stage" defaultValue={editingItem ? editingItem.stage : ""} required><option value="Pre-Seed">Pre-Seed</option><option value="Seed">Seed</option><option value="Series A">Series A</option><option value="Series B">Series B</option><option value="Series C">Series C</option></select></div>
                  <div className="form-group"><label>Investment Amount</label><input type="text" name="amount" defaultValue={editingItem ? editingItem.amount : ""} placeholder="Enter investment amount" /></div>
                  <div className="form-group"><label>Status</label><select name="status" defaultValue={editingItem ? editingItem.status : ""} required><option value="Initial Contact">Initial Contact</option><option value="Due Diligence">Due Diligence</option><option value="Term Sheet">Term Sheet</option><option value="Committed">Committed</option><option value="Closed">Closed</option></select></div>
                </>
              )}
              {newItem.type === "document" && (
                <>
                  <div className="form-group"><label>Document Name</label><input type="text" name="name" defaultValue={editingItem ? editingItem.name : ""} placeholder="Enter document name" required /></div>
                  <div className="form-group"><label>Category</label><select name="category" defaultValue={editingItem ? editingItem.category : ""} required><option value="Incorporation">Incorporation</option><option value="Investment">Investment</option><option value="Legal">Legal</option><option value="Financial">Financial</option><option value="IP & Patents">IP & Patents</option></select></div>
                  <div className="form-group"><label>Document Type</label><select name="type" defaultValue={editingItem ? editingItem.type : ""} required><option value="PDF">PDF</option><option value="Word">Word</option><option value="Excel">Excel</option><option value="Image">Image</option></select></div>
                  <div className="form-group"><label>Upload File</label><input type="file" required /></div>
                </>
              )}
              {newItem.type === "task" && (
                <>
                  <div className="form-group"><label>Task Title</label><input type="text" name="title" defaultValue={editingItem ? editingItem.title : ""} placeholder="Enter task title" required /></div>
                  <div className="form-group"><label>Description</label><textarea name="description" defaultValue={editingItem ? editingItem.description : ""} placeholder="Enter task description" /></div>
                  <div className="form-group"><label>Due Date</label><input type="date" name="dueDate" defaultValue={editingItem ? editingItem.dueDate : ""} required /></div>
                  <div className="form-group"><label>Priority</label><select name="priority" defaultValue={editingItem ? editingItem.priority : ""} required><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option></select></div>
                  <div className="form-group"><label>Status</label><select name="status" defaultValue={editingItem ? editingItem.status : ""} required><option value="Not Started">Not Started</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option></select></div>
                </>
              )}
              {newItem.type === "kpi" && (
                <>
                  <div className="form-group"><label>Monthly Revenue</label><input type="text" name="revenue" defaultValue={kpiData.revenue || ""} placeholder="Enter monthly revenue" required /></div>
                  <div className="form-group"><label>Burn Rate</label><input type="text" name="burnRate" defaultValue={kpiData.burnRate || ""} placeholder="Enter burn rate" required /></div>
                  <div className="form-group"><label>Runway (months)</label><input type="number" name="runway" defaultValue={kpiData.runway || ""} placeholder="Enter runway in months" required /></div>
                  <div className="form-group"><label>Total Customers</label><input type="number" name="customers" defaultValue={kpiData.customers || ""} placeholder="Enter total customers" required /></div>
                  <div className="form-group"><label>MRR</label><input type="text" name="mrr" defaultValue={kpiData.mrr || ""} placeholder="Enter MRR" required /></div>
                </>
              )}
              <button type="submit" className="btn-primary"><FiSave /> {editingItem ? `Update ${newItem.type}` : `Add ${newItem.type}`}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Plus,
  Wrench,
  ShieldAlert,
  Flame,
  Zap,
  Droplets,
  Radio,
  FileText,
  UserCheck,
  ChevronDown
} from 'lucide-react';

export default function IncidentHub({
  tickets,
  onUpdateTicketStatus,
  onOpenReportModal,
  selectedBuildingFilter = null,
  onClearBuildingFilter,
  onFocusBuildingOnMap
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filtered tickets computation
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      // Building filter from props
      if (selectedBuildingFilter && t.buildingId !== selectedBuildingFilter.id) {
        return false;
      }
      // Text search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matches =
          t.title.toLowerCase().includes(q) ||
          t.room.toLowerCase().includes(q) ||
          t.buildingName.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.id.toLowerCase().includes(q);
        if (!matches) return false;
      }
      // Category filter
      if (categoryFilter !== 'ALL' && t.category !== categoryFilter) {
        return false;
      }
      // Priority filter
      if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && t.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [tickets, selectedBuildingFilter, searchQuery, categoryFilter, priorityFilter, statusFilter]);

  // Statistics
  const totalCount = tickets.length;
  const criticalCount = tickets.filter((t) => t.priority === 'Critical' && t.status !== 'Resolved').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'HVAC':
        return <Flame size={16} className="text-amber" />;
      case 'Electrical':
        return <Zap size={16} className="text-yellow" />;
      case 'Plumbing':
        return <Droplets size={16} className="text-blue" />;
      case 'Safety':
        return <ShieldAlert size={16} className="text-red" />;
      case 'IT / AV':
        return <Radio size={16} className="text-cyan" />;
      default:
        return <Wrench size={16} className="text-purple" />;
    }
  };

  return (
    <div className="incident-hub-container">
      {/* KPI Stats Top Row */}
      <div className="incident-kpi-row">
        <div className="incident-kpi-card">
          <div className="kpi-icon-wrap total">
            <FileText size={20} />
          </div>
          <div>
            <span className="kpi-label">Active Tickets</span>
            <span className="kpi-num">{totalCount}</span>
          </div>
        </div>

        <div className="incident-kpi-card critical">
          <div className="kpi-icon-wrap red">
            <AlertTriangle size={20} />
          </div>
          <div>
            <span className="kpi-label">Critical Urgent</span>
            <span className="kpi-num red-text">{criticalCount}</span>
          </div>
        </div>

        <div className="incident-kpi-card in-progress">
          <div className="kpi-icon-wrap orange">
            <Wrench size={20} />
          </div>
          <div>
            <span className="kpi-label">In Maintenance</span>
            <span className="kpi-num orange-text">{inProgressCount}</span>
          </div>
        </div>

        <div className="incident-kpi-card resolved">
          <div className="kpi-icon-wrap green">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="kpi-label">Resolved</span>
            <span className="kpi-num green-text">{resolvedCount}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="primary-report-btn" onClick={onOpenReportModal}>
          <Plus size={18} />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Building Filter Banner if selected from building drawer */}
      {selectedBuildingFilter && (
        <div className="building-filter-banner">
          <span>
            Filtering maintenance tickets for: <strong>{selectedBuildingFilter.name}</strong>
          </span>
          <button className="clear-filter-btn" onClick={onClearBuildingFilter}>
            Show All Campus Tickets
          </button>
        </div>
      )}

      {/* Control Bar: Search & Filters */}
      <div className="incident-filter-bar">
        {/* Search */}
        <div className="filter-search-box">
          <Search size={16} className="icon" />
          <input
            type="text"
            placeholder="Search tickets by ID, room, issue, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && <button onClick={() => setSearchQuery('')}>×</button>}
        </div>

        {/* Category Filter */}
        <div className="filter-select-wrapper">
          <label>Category:</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="ALL">All Categories</option>
            <option value="HVAC">HVAC & Climate</option>
            <option value="Electrical">Electrical & Lighting</option>
            <option value="Safety">Safety & Interlocks</option>
            <option value="IT / AV">IT / AV & Networks</option>
            <option value="Structural">Structural & Access</option>
            <option value="Plumbing">Plumbing & Water</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div className="filter-select-wrapper">
          <label>Priority:</label>
          <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
            <option value="ALL">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="filter-select-wrapper">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="ALL">All Statuses</option>
            <option value="Reported">Reported</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Tickets List */}
      <div className="tickets-grid">
        {filteredTickets.length === 0 ? (
          <div className="empty-tickets-view">
            <CheckCircle2 size={42} className="empty-icon" />
            <h3>No incident tickets match your criteria</h3>
            <p>All facilities are operating within specified design parameters.</p>
          </div>
        ) : (
          filteredTickets.map((ticket) => {
            const isCritical = ticket.priority === 'Critical';
            const isResolved = ticket.status === 'Resolved';
            const isInProgress = ticket.status === 'In Progress';

            return (
              <div
                key={ticket.id}
                className={`ticket-card ${ticket.priority.toLowerCase()} ${isResolved ? 'resolved-card' : ''}`}
              >
                {/* Header Row */}
                <div className="ticket-card-header">
                  <div className="ticket-meta-left">
                    <span className="ticket-id-badge">{ticket.id}</span>
                    <span className={`ticket-priority-badge ${ticket.priority.toLowerCase()}`}>
                      {ticket.priority}
                    </span>
                    <span className="ticket-cat-badge">
                      {getCategoryIcon(ticket.category)}
                      <span>{ticket.category}</span>
                    </span>
                  </div>

                  <span className={`ticket-status-pill ${ticket.status.toLowerCase().replace(' ', '-')}`}>
                    {ticket.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="ticket-title">{ticket.title}</h3>

                {/* Location Tag */}
                <div
                  className="ticket-location-row"
                  onClick={() => onFocusBuildingOnMap(ticket.buildingId)}
                  title="Click to locate on 3D Campus Twin"
                >
                  <span className="bldg-name">{ticket.buildingName}</span>
                  <span className="room-badge">{ticket.room}</span>
                  <span className="locate-hint">📍 View on 3D Twin</span>
                </div>

                {/* Description */}
                <p className="ticket-description">{ticket.description}</p>

                {/* Assignment & Reporter Info */}
                <div className="ticket-assignment-bar">
                  <div className="assigned-group">
                    <UserCheck size={14} />
                    <span><strong>Assigned:</strong> {ticket.assignedTo}</span>
                  </div>
                  <div className="eta-group">
                    <Clock size={14} />
                    <span><strong>ETA:</strong> {ticket.eta}</span>
                  </div>
                </div>

                {/* Footer with Timestamp & Status Transition Action */}
                <div className="ticket-card-footer">
                  <span className="ticket-time">Reported {ticket.timestamp} by {ticket.reportedBy}</span>

                  <div className="ticket-action-btns">
                    {ticket.status === 'Reported' && (
                      <button
                        className="status-btn progress"
                        onClick={() => onUpdateTicketStatus(ticket.id, 'In Progress')}
                      >
                        <Wrench size={13} />
                        <span>Dispatch & Start</span>
                      </button>
                    )}

                    {ticket.status === 'In Progress' && (
                      <button
                        className="status-btn resolve"
                        onClick={() => onUpdateTicketStatus(ticket.id, 'Resolved')}
                      >
                        <CheckCircle2 size={13} />
                        <span>Mark Resolved</span>
                      </button>
                    )}

                    {ticket.status === 'Resolved' && (
                      <button
                        className="status-btn reopen"
                        onClick={() => onUpdateTicketStatus(ticket.id, 'In Progress')}
                      >
                        <span>Reopen Ticket</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

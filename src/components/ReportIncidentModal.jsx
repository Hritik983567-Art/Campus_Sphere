import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  Flame,
  Zap,
  Droplets,
  ShieldAlert,
  Radio,
  Wrench,
  Check,
  Send,
  Building
} from 'lucide-react';

export default function ReportIncidentModal({
  isOpen,
  onClose,
  buildings,
  initialBuilding = null,
  initialRoom = null,
  onSubmitIncident
}) {
  const [buildingId, setBuildingId] = useState('');
  const [roomName, setRoomName] = useState('');
  const [category, setCategory] = useState('HVAC');
  const [priority, setPriority] = useState('High');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [reportedBy, setReportedBy] = useState('');
  const [isUrgentSafety, setIsUrgentSafety] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setBuildingId(initialBuilding ? initialBuilding.id : (buildings[0]?.id || ''));
      setRoomName(initialRoom ? initialRoom.name : '');
      setTitle('');
      setDescription('');
      setCategory('HVAC');
      setPriority('High');
      setReportedBy('Alex Morgan (Campus Resident)');
      setIsUrgentSafety(false);
      setSubmittedSuccess(false);
    }
  }, [isOpen, initialBuilding, initialRoom, buildings]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !buildingId) return;

    const bldg = buildings.find((b) => b.id === buildingId);
    const newTicket = {
      id: `TCK-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      buildingId: buildingId,
      buildingName: bldg ? bldg.name : 'Campus Complex',
      room: roomName.trim() || 'General Area',
      category: category,
      priority: isUrgentSafety ? 'Critical' : priority,
      status: 'Reported',
      reportedBy: reportedBy.trim() || 'Campus User',
      timestamp: 'Just now',
      description: description.trim() || 'No additional details provided.',
      assignedTo: 'Dispatch Pending',
      eta: priority === 'Critical' ? '20 mins' : '2 hours'
    };

    onSubmitIncident(newTicket);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog incident-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge red">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h2 className="modal-title">Report Facility Incident</h2>
              <span className="modal-subtitle">Direct dispatch to Campus Facilities & Engineering</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="modal-success-state">
            <div className="success-pulse-ring">
              <Check size={40} className="check-icon" />
            </div>
            <h3>Incident Ticket Dispatched!</h3>
            <p>Facilities Operations Center has logged this incident and alerted the duty engineer.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Building & Room Row */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Campus Facility / Building *</label>
                <div className="input-with-icon">
                  <Building size={16} className="field-icon" />
                  <select
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                    required
                  >
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label>Room / Specific Location</label>
                <input
                  type="text"
                  placeholder="e.g. Lab 201, 3rd Floor Restroom, North Stairs"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </div>
            </div>

            {/* Category Grid */}
            <div className="form-field">
              <label>Issue Classification *</label>
              <div className="category-selection-grid">
                {[
                  { id: 'HVAC', label: 'HVAC & Climate', icon: <Flame size={16} /> },
                  { id: 'Electrical', label: 'Electrical / Power', icon: <Zap size={16} /> },
                  { id: 'Plumbing', label: 'Plumbing / Leak', icon: <Droplets size={16} /> },
                  { id: 'Safety', label: 'Safety / Hazards', icon: <ShieldAlert size={16} /> },
                  { id: 'IT / AV', label: 'IT & AV Systems', icon: <Radio size={16} /> },
                  { id: 'Structural', label: 'Structural / Doors', icon: <Wrench size={16} /> }
                ].map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    className={`cat-pick-btn ${category === cat.id ? 'active' : ''}`}
                    onClick={() => setCategory(cat.id)}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Radio Cards */}
            <div className="form-field">
              <label>Severity Level</label>
              <div className="priority-cards-row">
                {[
                  { level: 'Low', desc: 'Cosmetic or minor annoyance' },
                  { level: 'Medium', desc: 'Functional disruption' },
                  { level: 'High', desc: 'Critical equipment failure' },
                  { level: 'Critical', desc: 'Safety danger or campus shutdown' }
                ].map((item) => (
                  <label
                    key={item.level}
                    className={`priority-card-label ${priority === item.level ? 'active ' + item.level.toLowerCase() : ''}`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={item.level}
                      checked={priority === item.level}
                      onChange={() => setPriority(item.level)}
                    />
                    <span className="p-title">{item.level}</span>
                    <span className="p-desc">{item.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Issue Title */}
            <div className="form-field">
              <label>Summary / Headline *</label>
              <input
                type="text"
                placeholder="Brief summary of the issue (e.g. Chilled water leakage near server rack)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Detailed Description */}
            <div className="form-field">
              <label>Detailed Description</label>
              <textarea
                rows={3}
                placeholder="Describe what happened, any unusual noises, smells, error codes on equipment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Reporter Name & Urgent Hazard Check */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Reported By</label>
                <input
                  type="text"
                  placeholder="Your Name & Department"
                  value={reportedBy}
                  onChange={(e) => setReportedBy(e.target.value)}
                />
              </div>

              <div className="form-field checkbox-field">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={isUrgentSafety}
                    onChange={(e) => setIsUrgentSafety(e.target.checked)}
                  />
                  <span className="checkbox-text">
                    <strong>Hazard Flag:</strong> Immediate electrical/chemical safety risk
                  </span>
                </label>
              </div>
            </div>

            {/* Submit Action */}
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit">
                <Send size={15} />
                <span>Submit Incident Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

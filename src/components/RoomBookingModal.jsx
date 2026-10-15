import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Check,
  Building,
  CheckCircle2,
  Sparkles,
  QrCode,
  Tag
} from 'lucide-react';

export default function RoomBookingModal({
  isOpen,
  onClose,
  buildings,
  initialBuilding = null,
  initialRoom = null,
  onConfirmBooking
}) {
  const [buildingId, setBuildingId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-10-16');
  const [timeSlot, setTimeSlot] = useState('14:00 - 16:00');
  const [purpose, setPurpose] = useState('Hackathon & Development Sprint');
  const [attendees, setAttendees] = useState(12);
  const [userName, setUserName] = useState('Devon Vance');
  const [userRole, setUserRole] = useState('Lead Student Researcher');
  const [confirmedPass, setConfirmedPass] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const bldg = initialBuilding || buildings[0];
      setBuildingId(bldg?.id || '');
      const firstAvailableRoom = bldg?.floors.flatMap((f) => f.rooms).find((r) => r.status === 'Available') || bldg?.floors[0]?.rooms[0];
      setRoomId(initialRoom ? initialRoom.id : (firstAvailableRoom?.id || ''));
      setConfirmedPass(null);
    }
  }, [isOpen, initialBuilding, initialRoom, buildings]);

  if (!isOpen) return null;

  const currentBuilding = buildings.find((b) => b.id === buildingId);
  const allRoomsInBuilding = currentBuilding
    ? currentBuilding.floors.flatMap((f) => f.rooms.map((r) => ({ ...r, floorNum: f.floorNumber })))
    : [];
  const currentRoom = allRoomsInBuilding.find((r) => r.id === roomId);

  const handleBuildingChange = (e) => {
    const newBldgId = e.target.value;
    setBuildingId(newBldgId);
    const newBldg = buildings.find((b) => b.id === newBldgId);
    const newRooms = newBldg ? newBldg.floors.flatMap((f) => f.rooms) : [];
    if (newRooms.length > 0) {
      setRoomId(newRooms[0].id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentBuilding || !currentRoom) return;

    const pass = {
      bookingRef: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buildingName: currentBuilding.name,
      buildingCode: currentBuilding.code,
      roomName: currentRoom.name,
      roomId: currentRoom.id,
      date: bookingDate,
      timeSlot: timeSlot,
      purpose: purpose,
      attendees: attendees,
      bookedBy: userName,
      userRole: userRole,
      createdAt: 'Just now'
    };

    setConfirmedPass(pass);
    onConfirmBooking(pass);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-dialog booking-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge cyan">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="modal-title">Reserve Campus Facility</h2>
              <span className="modal-subtitle">Instant room & lab reservation with digital smart pass</span>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {confirmedPass ? (
          /* Digital Campus Pass Display */
          <div className="booking-pass-view">
            <div className="pass-success-badge">
              <Sparkles size={16} />
              <span>Facility Reservation Confirmed</span>
            </div>

            <div className="digital-campus-pass">
              <div className="pass-top">
                <div className="pass-brand">CAMPUS TWIN DIGITAL PASS</div>
                <div className="pass-ref">{confirmedPass.bookingRef}</div>
              </div>

              <div className="pass-body">
                <div className="pass-row main">
                  <div className="pass-col">
                    <span className="pass-lbl">Facility</span>
                    <span className="pass-val">{confirmedPass.buildingName}</span>
                  </div>
                  <div className="pass-col right">
                    <span className="pass-lbl">Room</span>
                    <span className="pass-val highlight">{confirmedPass.roomName}</span>
                  </div>
                </div>

                <div className="pass-row">
                  <div className="pass-col">
                    <span className="pass-lbl">Date</span>
                    <span className="pass-val">{confirmedPass.date}</span>
                  </div>
                  <div className="pass-col">
                    <span className="pass-lbl">Time Window</span>
                    <span className="pass-val">{confirmedPass.timeSlot}</span>
                  </div>
                  <div className="pass-col right">
                    <span className="pass-lbl">Attendees</span>
                    <span className="pass-val">{confirmedPass.attendees} seats</span>
                  </div>
                </div>

                <div className="pass-row">
                  <div className="pass-col">
                    <span className="pass-lbl">Reserved By</span>
                    <span className="pass-val">{confirmedPass.bookedBy} ({confirmedPass.userRole})</span>
                  </div>
                  <div className="pass-col right">
                    <span className="pass-lbl">Access Level</span>
                    <span className="pass-val badge">Granted • NFC / RFID</span>
                  </div>
                </div>

                <div className="pass-qr-strip">
                  <div className="qr-box">
                    <QrCode size={56} />
                  </div>
                  <div className="qr-info">
                    <strong>Smart Lock Access Code: 8942#</strong>
                    <span>Scan at the door console or tap your campus NFC card</span>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn-done" onClick={onClose}>
              <CheckCircle2 size={16} />
              <span>Done & Close</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form">
            {/* Building Selection */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Select Complex / Building *</label>
                <div className="input-with-icon">
                  <Building size={16} className="field-icon" />
                  <select value={buildingId} onChange={handleBuildingChange} required>
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Selection */}
              <div className="form-field">
                <label>Select Room / Lab *</label>
                <select value={roomId} onChange={(e) => setRoomId(e.target.value)} required>
                  {allRoomsInBuilding.map((rm) => (
                    <option key={rm.id} value={rm.id} disabled={rm.status === 'Maintenance'}>
                      Lvl {rm.floorNum}: {rm.name} ({rm.type} - Cap {rm.capacity}) {rm.status === 'Maintenance' ? '[Maint]' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room Specs Banner */}
            {currentRoom && (
              <div className="room-spec-callout">
                <span className="spec-item"><strong>Capacity:</strong> {currentRoom.capacity} People</span>
                <span className="spec-item"><strong>Type:</strong> {currentRoom.type}</span>
                <span className="spec-item">
                  <strong>Equipped:</strong> {currentRoom.equipment.join(', ')}
                </span>
              </div>
            )}

            {/* Date & Time Slot */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Reservation Date *</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Time Slot Window *</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                  <option value="08:30 - 10:00">08:30 AM - 10:00 AM (Early Session)</option>
                  <option value="10:30 - 12:00">10:30 AM - 12:00 PM (Morning Block)</option>
                  <option value="12:30 - 14:00">12:30 PM - 02:00 PM (Midday)</option>
                  <option value="14:00 - 16:00">02:00 PM - 04:00 PM (Afternoon Sprint)</option>
                  <option value="16:30 - 18:30">04:30 PM - 06:30 PM (Late Afternoon)</option>
                  <option value="19:00 - 21:00">07:00 PM - 09:00 PM (Evening / Night)</option>
                </select>
              </div>
            </div>

            {/* Purpose & Attendees */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Purpose of Booking *</label>
                <input
                  type="text"
                  placeholder="e.g. Quantum Computing Sprint, Hackathon Team Meet"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Expected Headcount</label>
                <input
                  type="number"
                  min="1"
                  max={currentRoom ? currentRoom.capacity : 50}
                  value={attendees}
                  onChange={(e) => setAttendees(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            {/* User Credentials */}
            <div className="form-row two-col">
              <div className="form-field">
                <label>Host Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Academic Role</label>
                <input
                  type="text"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-submit cyan">
                <Calendar size={15} />
                <span>Confirm & Issue Digital Pass</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

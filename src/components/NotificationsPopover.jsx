import React from 'react';
import {
  X,
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function NotificationsPopover({
  isOpen,
  onClose,
  onClearAll
}) {
  if (!isOpen) return null;

  return (
    <div className="cs-notifications-popover">
      <div className="popover-header">
        <div className="flex-align-center gap-8">
          <Bell size={15} className="terracotta-text" />
          <span className="popover-title">Campus Broadcasts</span>
        </div>
        <button className="clear-btn" onClick={onClearAll}>Mark All Read</button>
      </div>

      <div className="popover-list">
        <div className="popover-item unread">
          <span className="unread-dot" />
          <div className="popover-item-content">
            <span className="p-title">Transit Line 02 Running on Schedule</span>
            <span className="p-desc">Shuttle arriving at Tech Park Bay 3 in 4 minutes.</span>
            <span className="p-time">2 mins ago</span>
          </div>
        </div>

        <div className="popover-item unread">
          <span className="unread-dot" />
          <div className="popover-item-content">
            <span className="p-title">CS-302 Lecture Hall Room Confirmation</span>
            <span className="p-desc">Prof. Vance's Data Structures class moved to Turing Hall 402.</span>
            <span className="p-time">15 mins ago</span>
          </div>
        </div>

        <div className="popover-item">
          <div className="popover-item-content">
            <span className="p-title">RO Plant Filter Service Notice</span>
            <span className="p-desc">Block B dispenser offline until 14:00 today.</span>
            <span className="p-time">45 mins ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  MapPin,
  Printer,
  Bus,
  Key,
  Building,
  ArrowRight
} from 'lucide-react';

export default function QuickSearchModal({
  isOpen,
  onClose,
  onSelectItem
}) {
  const [query, setQuery] = useState('');

  const searchItems = [
    { title: 'Turing Seminar Hall (CS-302)', category: 'Lecture Hall', location: 'Turing Hall • Floor 4', type: 'room' },
    { title: 'IoT Lab 304 (Open Access)', category: 'Laboratory', location: 'CS & Tech Annex', type: 'lab' },
    { title: 'Central RO Plant Dispenser', category: 'Utility', location: 'Block B Quad', type: 'utility' },
    { title: 'Transit Line 02 Shuttle Stop', category: 'Transit', location: 'Tech Park Bay 3', type: 'shuttle' },
    { title: 'Academic Library Xerox Terminal', category: 'Print Station', location: 'Library Ground Floor', type: 'print' },
    { title: 'CS Annex High-Speed Laser Printer', category: 'Print Station', location: 'CS Annex Room 102', type: 'print' }
  ];

  const filtered = searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.location.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="cs-modal-backdrop" onClick={onClose}>
      <div className="cs-search-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="cs-search-input-header">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search campus rooms, printers, shuttle lines, labs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')}>×</button>
          )}
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="cs-search-results-list">
          {filtered.length === 0 ? (
            <div className="search-empty-state">
              <span>No campus utilities or locations match "{query}"</span>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                className="search-item-row"
                onClick={() => {
                  if (onSelectItem) onSelectItem(item);
                  onClose();
                }}
              >
                <div className="search-item-icon">
                  {item.type === 'room' && <Building size={16} />}
                  {item.type === 'lab' && <Key size={16} />}
                  {item.type === 'utility' && <MapPin size={16} />}
                  {item.type === 'shuttle' && <Bus size={16} />}
                  {item.type === 'print' && <Printer size={16} />}
                </div>

                <div className="search-item-details">
                  <div className="search-item-title">{item.title}</div>
                  <div className="search-item-sub">
                    <span className="cat-chip">{item.category}</span>
                    <span>• {item.location}</span>
                  </div>
                </div>

                <ArrowRight size={14} className="jump-arrow" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

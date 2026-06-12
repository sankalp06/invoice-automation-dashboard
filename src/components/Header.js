import React from 'react';
import { RefreshCw, Activity } from 'lucide-react';
import './Header.css';

export default function Header({ period, periods, onPeriodChange, onRefresh, loading }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="header-icon">
            <Activity size={18} color="#6366F1" />
          </div>
          <span className="header-name">Lineage</span>
          <span className="header-badge">Dashboard</span>
        </div>
        <div className="header-controls">
          <div className="period-tabs">
            {periods.map(p => (
              <button
                key={p.value}
                className={`period-tab${period === p.value ? ' active' : ''}`}
                onClick={() => onPeriodChange(p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            className={`refresh-btn${loading ? ' spinning' : ''}`}
            onClick={onRefresh}
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}

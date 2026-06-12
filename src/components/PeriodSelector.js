import React from 'react';
import './PeriodSelector.css';

const PERIODS = [
  { value: 'today',       label: 'Today' },
  { value: 'yesterday',   label: 'Yesterday' },
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days',label: 'Last 30 Days' },
  { value: 'overall',     label: 'Overall' },
];

export default function PeriodSelector({ value, onChange }) {
  return (
    <div className="period-selector">
      {PERIODS.map(p => (
        <button
          key={p.value}
          className={`period-btn ${value === p.value ? 'active' : ''}`}
          onClick={() => onChange(p.value)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}

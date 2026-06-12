import React, { useState } from 'react';
import './MetricTile.css';

const COLOR_MAP = {
  indigo: { bg: '#ede9fe', accent: '#6366f1', bar: '#6366f1' },
  blue:   { bg: '#dbeafe', accent: '#3b82f6', bar: '#3b82f6' },
  green:  { bg: '#d1fae5', accent: '#10b981', bar: '#10b981' },
  orange: { bg: '#fef3c7', accent: '#f59e0b', bar: '#f59e0b' },
  teal:   { bg: '#ccfbf1', accent: '#14b8a6', bar: '#14b8a6' },
  red:    { bg: '#fee2e2', accent: '#ef4444', bar: '#ef4444' },
  purple: { bg: '#f3e8ff', accent: '#a855f7', bar: '#a855f7' },
};

export default function MetricTile({ tile, value, rate, onClick }) {
  const [hovered, setHovered] = useState(false);
  const colors = COLOR_MAP[tile.color] || COLOR_MAP.indigo;

  return (
    <div
      className={`metric-tile ${hovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`${tile.label}: ${value}. Click to see attachment details.`}
    >
      <div className="tile-top">
        <div className="tile-icon-wrap" style={{ background: colors.bg }}>
          <span className="tile-icon">{tile.icon}</span>
        </div>
        <div className="tile-click-hint">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M7 2l5 5-5 5" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="tile-value" style={{ color: colors.accent }}>
        {value.toLocaleString()}
      </div>

      <div className="tile-label">{tile.label}</div>
      <div className="tile-desc">{tile.description}</div>

      {rate !== null && (
        <div className="tile-rate-wrap">
          <div className="tile-rate-bar-track">
            <div
              className="tile-rate-bar-fill"
              style={{
                width: `${Math.min(rate, 100)}%`,
                background: colors.bar,
              }}
            />
          </div>
          <span className="tile-rate-label" style={{ color: colors.accent }}>
            {rate}%
          </span>
        </div>
      )}

      <div className="tile-glow" style={{ background: colors.bg }} />
    </div>
  );
}

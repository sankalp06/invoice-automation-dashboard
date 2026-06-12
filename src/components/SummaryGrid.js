import React from 'react';
import {
  Mail, Paperclip, CheckCircle, XCircle,
  ScanLine, FileText, Languages, Database, AlertCircle, Loader2
} from 'lucide-react';
import './SummaryGrid.css';

const TILES = [
  { key: 'emails_received', label: 'Emails Received', icon: Mail, color: '#6366F1', bg: '#EEF2FF' },
  { key: 'attachments_processed', label: 'Attachments Processed', icon: Paperclip, color: '#3B82F6', bg: '#EFF6FF' },
  { key: 'attachment_validation_passed', label: 'Validation Passed', icon: CheckCircle, color: '#10B981', bg: '#ECFDF5' },
  { key: 'attachment_validation_failed', label: 'Validation Failed', icon: XCircle, color: '#EF4444', bg: '#FEF2F2' },
  { key: 'ocr_completed', label: 'OCR Completed', icon: ScanLine, color: '#8B5CF6', bg: '#F5F3FF' },
  { key: 'ocr_failed', label: 'OCR Failed', icon: AlertCircle, color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'translation_completed', label: 'Translation Done', icon: Languages, color: '#06B6D4', bg: '#ECFEFF' },
  { key: 'translation_failed', label: 'Translation Failed', icon: XCircle, color: '#F43F5E', bg: '#FFF1F2' },
  { key: 'extraction_completed', label: 'Extraction Done', icon: FileText, color: '#10B981', bg: '#ECFDF5' },
  { key: 'extraction_failed', label: 'Extraction Failed', icon: Database, color: '#EF4444', bg: '#FEF2F2' },
];

function SkeletonCard() {
  return (
    <div className="tile tile-skeleton">
      <div className="sk sk-icon" />
      <div className="sk sk-num" />
      <div className="sk sk-label" />
    </div>
  );
}

export default function SummaryGrid({ summary, loading, error, onTileClick }) {
  if (error) {
    return (
      <div className="grid-error">
        <AlertCircle size={28} color="#EF4444" />
        <p>Failed to load summary</p>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="summary-grid">
      {TILES.map((tile, i) => {
        const Icon = tile.icon;
        const value = summary?.[tile.key];
        return loading ? (
          <SkeletonCard key={tile.key} />
        ) : (
          <button
            key={tile.key}
            className="tile"
            style={{ '--tile-delay': `${i * 40}ms` }}
            onClick={() => onTileClick(tile)}
            title={`View attachment lineage for ${tile.label}`}
          >
            <div className="tile-icon" style={{ background: tile.bg, color: tile.color }}>
              <Icon size={20} />
            </div>
            <div className="tile-value">{value ?? '—'}</div>
            <div className="tile-label">{tile.label}</div>
            <div className="tile-cta">View Details →</div>
            <div className="tile-glow" style={{ background: tile.bg }} />
          </button>
        );
      })}
    </div>
  );
}

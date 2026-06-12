import React, { useState, useMemo } from 'react';
import { X, Download, Search, ExternalLink, Loader2, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';
import './AttachmentModal.css';

function StatusBadge({ status }) {
  const s = (status || '').toLowerCase();
  const map = {
    completed: { cls: 'badge-success', label: 'Completed' },
    failed: { cls: 'badge-danger', label: 'Failed' },
    pending: { cls: 'badge-warning', label: 'Pending' },
  };
  const found = map[s] || { cls: 'badge-neutral', label: status || '—' };
  return <span className={`badge ${found.cls}`}>{found.label}</span>;
}

function FileLink({ href, label }) {
  if (!href) return <span className="no-link">—</span>;
  return (
    <a className="file-link" href={href} target="_blank" rel="noopener noreferrer" title={`Download ${label}`}>
      <Download size={13} />
      {label}
    </a>
  );
}

export default function AttachmentModal({ tile, data, loading, error, period, onClose }) {
  const [search, setSearch] = useState('');

  const rows = useMemo(() => {
    if (!data?.attachments) return [];
    if (!search.trim()) return data.attachments;
    const q = search.toLowerCase();
    return data.attachments.filter(r =>
      (r.filename || '').toLowerCase().includes(q) ||
      (r.run_id || '').toLowerCase().includes(q) ||
      (r.workflow_name || '').toLowerCase().includes(q) ||
      (r.step_name || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q)
    );
  }, [data, search]);

  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-icon" style={{ background: tile.bg, color: tile.color }}>
              <tile.icon size={18} />
            </div>
            <div>
              <h2 className="modal-title">Attachment Lineage</h2>
              <p className="modal-sub">{tile.label} · {period.replace(/_/g, ' ')}</p>
            </div>
          </div>
          <div className="modal-header-right">
            {data && <span className="modal-count">{data.total} records</span>}
            <button className="modal-close" onClick={onClose} title="Close"><X size={18} /></button>
          </div>
        </div>

        {/* Search */}
        {!loading && !error && data && (
          <div className="modal-search">
            <Search size={15} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search by filename, run ID, workflow…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        )}

        {/* Body */}
        <div className="modal-body">
          {loading && (
            <div className="modal-state">
              <Loader2 size={32} className="spin-icon" />
              <p>Loading attachment lineage…</p>
            </div>
          )}
          {error && !loading && (
            <div className="modal-state modal-state-error">
              <AlertCircle size={28} />
              <p>Failed to load lineage data</p>
              <span>{error}</span>
            </div>
          )}
          {!loading && !error && data && rows.length === 0 && (
            <div className="modal-state">
              <FileText size={32} opacity={0.3} />
              <p>{search ? 'No results match your search.' : 'No attachments found for this period.'}</p>
            </div>
          )}
          {!loading && !error && data && rows.length > 0 && (
            <div className="table-wrap">
              <table className="lineage-table">
                <thead>
                  <tr>
                    <th>Filename</th>
                    <th>Workflow</th>
                    <th>Step</th>
                    <th>Status</th>
                    <th>Original</th>
                    <th>Translated</th>
                    <th>Extracted JSON</th>
                    <th>Logged At</th>
                    <th>Run ID</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.run_id || i} className="table-row">
                      <td className="td-filename">
                        <span className="filename-text">{row.filename || '—'}</span>
                      </td>
                      <td><span className="workflow-chip">{row.workflow_name || '—'}</span></td>
                      <td className="td-step">{(row.step_name || '—').replace(/_/g, ' ')}</td>
                      <td><StatusBadge status={row.status} /></td>
                      <td><FileLink href={row.original_file_link} label="Original" /></td>
                      <td><FileLink href={row.translated_file_link} label="Translated" /></td>
                      <td><FileLink href={row.extracted_json_link} label="JSON" /></td>
                      <td className="td-time">
                        {row.logged_at ? new Date(row.logged_at).toLocaleString() : '—'}
                      </td>
                      <td className="td-run">
                        <span className="run-id" title={row.run_id}>{row.run_id ? row.run_id.slice(0, 8) + '…' : '—'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

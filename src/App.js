import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SummaryGrid from './components/SummaryGrid';
import AttachmentModal from './components/AttachmentModal';
import './App.css';

const PERIODS = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'overall', label: 'Overall' },
];

const SUMMARY_API = process.env.REACT_APP_LINEAGE_SUMMARY_API;
const LINEAGE_API = process.env.REACT_APP_ATTACHMENT_LINEAGE_API;

export default function App() {
  const [period, setPeriod] = useState('today');
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTile, setModalTile] = useState(null);
  const [lineageData, setLineageData] = useState(null);
  const [lineageLoading, setLineageLoading] = useState(false);
  const [lineageError, setLineageError] = useState(null);

  const fetchSummary = useCallback(async () => {
    setSummaryLoading(true);
    setSummaryError(null);
    try {
      const res = await fetch(`${SUMMARY_API}?period=${period}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSummary(data);
    } catch (e) {
      setSummaryError(e.message);
    } finally {
      setSummaryLoading(false);
    }
  }, [period]);

  useEffect(() => { fetchSummary(); }, [fetchSummary]);

  const handleTileClick = useCallback(async (tile) => {
    setModalTile(tile);
    setModalOpen(true);
    setLineageData(null);
    setLineageError(null);
    setLineageLoading(true);
    try {
      const res = await fetch(`${LINEAGE_API}?period=${period}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setLineageData(data);
    } catch (e) {
      setLineageError(e.message);
    } finally {
      setLineageLoading(false);
    }
  }, [period]);

  return (
    <div className="app">
      <div className="app-bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <Header
        period={period}
        periods={PERIODS}
        onPeriodChange={setPeriod}
        onRefresh={fetchSummary}
        loading={summaryLoading}
      />
      <main className="app-main">
        <div className="app-container">
          <div className="page-intro">
            <h1 className="page-title">Pipeline Lineage</h1>
            <p className="page-subtitle">
              Track every document through ingestion, OCR, translation, and extraction.
            </p>
          </div>
          <SummaryGrid
            summary={summary}
            loading={summaryLoading}
            error={summaryError}
            onTileClick={handleTileClick}
          />
        </div>
      </main>
      {modalOpen && (
        <AttachmentModal
          tile={modalTile}
          data={lineageData}
          loading={lineageLoading}
          error={lineageError}
          period={period}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

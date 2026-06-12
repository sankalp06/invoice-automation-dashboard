const SUMMARY_API = process.env.REACT_APP_LINEAGE_SUMMARY_API;
const LINEAGE_API  = process.env.REACT_APP_ATTACHMENT_LINEAGE_API;

export async function fetchLineageSummary(period = 'today', countryCode, sourceLang) {
  const params = new URLSearchParams({ period });
  if (countryCode) params.append('countryCode', countryCode);
  if (sourceLang)  params.append('sourceLang', sourceLang);
  const res = await fetch(`${SUMMARY_API}?${params}`);
  if (!res.ok) throw new Error(`Summary API ${res.status}`);
  return res.json();
}

export async function fetchAttachmentLineage(period = 'today') {
  const params = new URLSearchParams({ period });
  const res = await fetch(`${LINEAGE_API}?${params}`);
  if (!res.ok) throw new Error(`Lineage API ${res.status}`);
  return res.json();
}

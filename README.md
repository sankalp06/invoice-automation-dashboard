# Lineage Dashboard

A modern React dashboard for visualising document pipeline lineage data.

## Quick Start

### 1. Configure API endpoints

Edit `.env` in the project root:

```
REACT_APP_LINEAGE_SUMMARY_API=https://your-function-app.azurewebsites.net/api/lineage_summary
REACT_APP_ATTACHMENT_LINEAGE_API=https://your-function-app.azurewebsites.net/api/attachment_lineage
```

### 2. Run with Docker

```bash
docker build -t lineage-dashboard .
docker run -p 3000:80 lineage-dashboard
```

Open http://localhost:3000

### 3. Run locally (development)

```bash
npm install --legacy-peer-deps
npm start
```

## Features

- **10 metric tiles** for the full pipeline (emails → attachments → validation → OCR → translation → extraction)
- **Period selector**: Today, Yesterday, Last 7 Days, Last 30 Days, Overall
- **Click any tile** to open the Attachment Lineage modal with a searchable table
- **Downloadable SAS links** for original file, translated file, and extracted JSON
- **Animated ambient background**, skeleton loaders, smooth transitions
- **Responsive** down to mobile

## Updating APIs

The two API URLs are only set in `.env`. Rebuild the Docker image after updating them:

```bash
docker build -t lineage-dashboard .
```

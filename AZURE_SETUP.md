# Azure Table Storage Setup Guide

This application uses Azure Table Storage to manage events and opening hours data.

## Prerequisites

- Azure Storage Account
- Azure Storage Account Key
- Node.js and npm

## Setup Instructions

### 1. Create Azure Storage Account

1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource" → "Storage account"
3. Fill in the details:
   - **Resource Group**: Create new or select existing
   - **Storage account name**: Choose a unique name (e.g., `churchwebsite`)
   - **Region**: Select your region
   - **Performance**: Standard
   - **Redundancy**: Locally-redundant storage (LRS)
4. Click "Review + create" then "Create"

### 2. Create Tables

1. In your Storage Account, go to "Tables"
2. Click "+ Table" and create two tables:
   - `events`
   - `opening_hours`

### 3. Get Storage Account Credentials

1. In your Storage Account, go to "Access keys"
2. Copy:
   - **Storage account name**
   - **Key** (either key1 or key2)

### 4. Configure Environment Variables

Create a `.env.local` file in the `code-relocate-pro` directory:

```
VITE_AZURE_STORAGE_ACCOUNT=your_storage_account_name
VITE_AZURE_STORAGE_ACCOUNT_KEY=your_storage_account_key
```

### 5. Add Data to Tables

#### Events Table

Use Azure Storage Explorer or Azure Portal to add entities with the following properties:

- **Partition Key**: `events` (or any consistent value)
- **Row Key**: Unique identifier (e.g., `event-1`)
- **title**: Event title (string)
- **description**: Event description (string, optional)
- **event_date**: Event date in YYYY-MM-DD format (string)
- **location**: Event location (string, optional)

Example:
```
Partition Key: events
Row Key: event-1
title: Sunday Service
description: Join us for our weekly Sunday worship service
event_date: 2025-10-26
location: Main Church Hall
```

#### Opening Hours Table

- **Partition Key**: `opening_hours` (or any consistent value)
- **Row Key**: Day identifier (e.g., `day-0` for Sunday)
- **day_of_week**: Day number 0-6 (0=Sunday, 6=Saturday) (int)
- **day_name**: Day name (string)
- **open_time**: Opening time in HH:MM format (string, optional)
- **close_time**: Closing time in HH:MM format (string, optional)
- **is_closed**: Whether closed (boolean)
- **notes**: Additional notes (string, optional)

Example:
```
Partition Key: opening_hours
Row Key: day-0
day_of_week: 0
day_name: Sunday
open_time: 09:00
close_time: 13:00
is_closed: false
notes: Sunday worship service
```

## Data Structure

### Events Entity
```typescript
{
  partitionKey: string;
  rowKey: string;
  title: string;
  description?: string;
  event_date: string; // YYYY-MM-DD
  location?: string;
  timestamp?: Date;
  etag?: string;
}
```

### Opening Hours Entity
```typescript
{
  partitionKey: string;
  rowKey: string;
  day_of_week: number; // 0-6
  day_name: string;
  open_time?: string; // HH:MM
  close_time?: string; // HH:MM
  is_closed: boolean;
  notes?: string;
  timestamp?: Date;
  etag?: string;
}
```

## Deployment to Azure App Service

When deploying to Azure App Service:

1. Add environment variables in App Service Configuration:
   - `VITE_AZURE_STORAGE_ACCOUNT`
   - `VITE_AZURE_STORAGE_ACCOUNT_KEY`

2. Build the app:
   ```bash
   npm run build
   ```

3. Deploy the `dist` folder to your App Service

## Troubleshooting

- **"Azure Storage credentials not configured"**: Make sure environment variables are set correctly
- **"Table not found"**: Verify table names are exactly `events` and `opening_hours`
- **CORS errors**: Configure CORS in your Storage Account if needed


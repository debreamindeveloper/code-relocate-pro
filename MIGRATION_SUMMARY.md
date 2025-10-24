# Migration from Supabase to Azure Table Storage

## Summary of Changes

This document outlines the migration from Supabase PostgreSQL to Azure Table Storage for managing events and opening hours data.

## Files Created

### 1. `/src/integrations/azure/tableClient.ts`
- Initializes Azure Table Storage client
- Handles authentication using storage account name and key
- Provides `getTableClient()` function to get table-specific clients

### 2. `/src/services/eventsService.ts`
- Exports `fetchEvents()` function
- Queries the `events` table from Azure Table Storage
- Filters future events and sorts by date
- Returns typed `Event[]` array

### 3. `/src/services/openingHoursService.ts`
- Exports `fetchOpeningHours()` function
- Queries the `opening_hours` table from Azure Table Storage
- Sorts by day of week
- Returns typed `OpeningHour[]` array

### 4. `/.env.example`
- Documents required environment variables
- Template for developers to create `.env.local`

### 5. `/AZURE_SETUP.md`
- Complete setup guide for Azure Table Storage
- Instructions for creating storage account and tables
- Data structure documentation
- Deployment instructions

### 6. `/MIGRATION_SUMMARY.md`
- This file - overview of changes

## Files Modified

### 1. `/src/components/Events.tsx`
**Changes:**
- Removed Supabase import
- Added import for `fetchEvents` service
- Updated `useQuery` to use `fetchEvents` function instead of Supabase query
- Removed inline Supabase query logic

**Before:**
```typescript
import { supabase } from '@/integrations/supabase/client';

const { data: events, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('event_date', new Date().toISOString().split('T')[0])
      .order('event_date', { ascending: true });
    
    if (error) throw error;
    return data;
  },
});
```

**After:**
```typescript
import { fetchEvents } from '@/services/eventsService';

const { data: events, isLoading } = useQuery({
  queryKey: ['events'],
  queryFn: fetchEvents,
});
```

### 2. `/src/components/Contact.tsx`
**Changes:**
- Removed Supabase import
- Added import for `fetchOpeningHours` service
- Updated `useQuery` to use `fetchOpeningHours` function instead of Supabase query
- Removed inline Supabase query logic

**Before:**
```typescript
import { supabase } from '@/integrations/supabase/client';

const { data: openingHours, isLoading } = useQuery({
  queryKey: ['opening_hours'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('opening_hours')
      .select('*')
      .order('day_of_week', { ascending: true });
    
    if (error) throw error;
    return data;
  },
});
```

**After:**
```typescript
import { fetchOpeningHours } from '@/services/openingHoursService';

const { data: openingHours, isLoading } = useQuery({
  queryKey: ['opening_hours'],
  queryFn: fetchOpeningHours,
});
```

## Dependencies Added

- `@azure/data-tables` - Azure Table Storage SDK for JavaScript

## Environment Variables Required

```
VITE_AZURE_STORAGE_ACCOUNT=your_storage_account_name
VITE_AZURE_STORAGE_ACCOUNT_KEY=your_storage_account_key
```

## Benefits of This Migration

1. **Cost-effective**: Azure Table Storage is cheaper than managed databases
2. **Scalable**: Handles large amounts of data efficiently
3. **Simple**: Perfect for semi-structured data like events and opening hours
4. **Azure integration**: Seamless integration with Azure App Service deployment
5. **No backend needed**: Direct client-side access to data (with proper security)

## Next Steps

1. Create Azure Storage Account (see AZURE_SETUP.md)
2. Create `events` and `opening_hours` tables
3. Add environment variables to `.env.local`
4. Populate tables with data
5. Test locally with `npm run dev`
6. Deploy to Azure App Service

## Notes

- Supabase dependencies can be removed if not used elsewhere
- The component logic remains unchanged - only the data source changed
- React Query caching still works as before
- Error handling is consistent with the previous implementation


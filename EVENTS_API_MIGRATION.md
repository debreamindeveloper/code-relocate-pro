# Events API Migration - Complete

## Summary

Successfully replaced Azure Table Storage implementation for fetching events with a simple REST API call to the Debramin Events API.

## Changes Made

### 1. **Updated Event Interface** (`src/integrations/azure/storageService.ts`)

**Before:**
```typescript
export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  created_at?: string;
  updated_at?: string;
}
```

**After:**
```typescript
export interface Event {
  title: string;
  description: string;
  location: string;
  eventDate: string;  // camelCase instead of snake_case
  partitionKey: string;
  rowKey: string;
}
```

### 2. **Replaced fetchEvents() Function** (`src/integrations/azure/storageService.ts`)

**Before:** Used Azure Table Storage REST API with SharedKey authentication
- Complex HMAC-SHA256 signature generation
- Required connection string configuration
- Filtered by date using OData syntax

**After:** Simple REST API call
```typescript
export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const apiUrl = 'https://debramin-events-api-ftdcatd6gzdtcbbj.westeurope-01.azurewebsites.net/api/events';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const events = await response.json() as Event[];

    // Sort by eventDate
    events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

    return events;
  } catch (error) {
    console.error('Error fetching events from API:', error);
    throw new Error(`Failed to fetch events: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
```

### 3. **Updated Events Component** (`src/components/Events.tsx`)

Updated property references to use new API field names:
- `event.id` → `event.rowKey` (for React key)
- `event.event_date` → `event.eventDate`

```typescript
{events?.map((event) => (
  <Card
    key={event.rowKey}  // Changed from event.id
    className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 bg-card border-border"
  >
    <div className="mb-4">
      <h3 className="text-xl font-bold text-card-foreground mb-2">
        {event.title}
      </h3>
      <p className="text-muted-foreground mb-4">
        {event.description}
      </p>
    </div>
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 text-secondary" />
        {new Date(event.eventDate).toLocaleDateString()}  {/* Changed from event.event_date */}
      </div>
      {event.location && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-secondary" />
          {event.location}
        </div>
      )}
    </div>
  </Card>
))}
```

### 4. **Created Azure Integration in Root** (`src/integrations/azure/`)

Created three new files in the root `src/integrations/azure/` directory:
- `config.ts` - Configuration management
- `storageService.ts` - Service layer with fetchEvents, fetchOpeningHours, fetchJsonFromBlob
- `index.ts` - Public exports

## API Endpoint

**URL:** `https://debramin-events-api-ftdcatd6gzdtcbbj.westeurope-01.azurewebsites.net/api/events`

**Method:** GET

**Response Format:**
```json
[
    {
        "title": "Sunday service",
        "description": "Join us for our weekly Sunday worship service",
        "location": "Main Church Hall",
        "eventDate": "0001-01-01T00:00:00",
        "partitionKey": "events",
        "rowKey": "event-1"
    }
]
```

## Benefits

✅ **Simpler Implementation** - No complex authentication logic needed
✅ **Fewer Dependencies** - No need for Azure SDK packages
✅ **Better Performance** - Direct API call without intermediate layers
✅ **Easier Maintenance** - Straightforward REST API integration
✅ **No Configuration** - No connection strings or environment variables needed for events

## Build Status

✅ **Build Successful**
- 1848 modules transformed
- Build time: 6.66s
- No TypeScript errors
- No compilation errors

## Files Modified

1. `src/integrations/azure/storageService.ts` - Updated Event interface and fetchEvents function
2. `src/components/Events.tsx` - Updated to use new API field names
3. `src/integrations/azure/config.ts` - Created in root
4. `src/integrations/azure/index.ts` - Created in root

## Testing

To verify the changes work correctly:

1. Run `npm run dev` to start the development server
2. Navigate to the Events section
3. Verify that events are displayed correctly from the API
4. Check browser console (F12) for any errors
5. Verify event dates are formatted correctly

## Next Steps

- Monitor API performance and response times
- Consider adding caching with React Query staleTime
- Add error boundary for better error handling
- Consider adding retry logic if API calls fail


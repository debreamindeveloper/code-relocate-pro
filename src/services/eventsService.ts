import { getTableClient } from "@/integrations/azure/tableClient";

export interface Event {
  partitionKey: string;
  rowKey: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  timestamp?: Date;
  etag?: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const tableClient = getTableClient("events");
    const events: Event[] = [];

    // Query all events from the table
    const entitiesIter = tableClient.listEntities<Event>();

    for await (const entity of entitiesIter) {
      events.push(entity);
    }

    // Filter to show only future events and sort by date
    const today = new Date().toISOString().split("T")[0];
    const futureEvents = events
      .filter((event) => event.event_date >= today)
      .sort(
        (a, b) =>
          new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );

    return futureEvents;
  } catch (error) {
    console.error("Error fetching events from Azure Table Storage:", error);
    throw error;
  }
};


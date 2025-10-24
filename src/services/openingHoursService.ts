import { getTableClient } from "@/integrations/azure/tableClient";

export interface OpeningHour {
  partitionKey: string;
  rowKey: string;
  day_of_week: number;
  day_name: string;
  open_time?: string;
  close_time?: string;
  is_closed: boolean;
  notes?: string;
  timestamp?: Date;
  etag?: string;
}

export const fetchOpeningHours = async (): Promise<OpeningHour[]> => {
  try {
    const tableClient = getTableClient("opening_hours");
    const hours: OpeningHour[] = [];

    // Query all opening hours from the table
    const entitiesIter = tableClient.listEntities<OpeningHour>();

    for await (const entity of entitiesIter) {
      hours.push(entity);
    }

    // Sort by day of week
    const sortedHours = hours.sort(
      (a, b) => a.day_of_week - b.day_of_week
    );

    return sortedHours;
  } catch (error) {
    console.error(
      "Error fetching opening hours from Azure Table Storage:",
      error
    );
    throw error;
  }
};


/**
 * Azure Storage Service
 * Handles fetching data from Azure Storage and REST APIs
 */

import { azureStorageConfig } from './config';

// Types for our data
export interface OpeningHour {
  dayOfWeek: string;
  dayName: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
  partitionKey: string;
  rowKey: string;
}

export interface Event {
  title: string;
  description: string;
  location: string;
  eventDate: string;
  partitionKey: string;
  rowKey: string;
}

/**
 * Parse connection string to extract account name and key
 */
const parseConnectionString = (connectionString: string): { accountName: string; accountKey: string } => {
  const parts = connectionString.split(';');
  let accountName = '';
  let accountKey = '';

  for (const part of parts) {
    if (part.startsWith('AccountName=')) {
      accountName = part.replace('AccountName=', '');
    }
    if (part.startsWith('AccountKey=')) {
      accountKey = part.replace('AccountKey=', '');
    }
  }

  if (!accountName || !accountKey) {
    throw new Error('Invalid connection string format');
  }

  return { accountName, accountKey };
};

/**
 * Fetch opening hours from REST API
 */
export const fetchOpeningHours = async (): Promise<OpeningHour[]> => {
  try {
    const apiUrl = 'https://debramin-events-api-ftdcatd6gzdtcbbj.westeurope-01.azurewebsites.net/api/openinghours';

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const openingHours = await response.json() as OpeningHour[];

    // Sort by dayOfWeek (convert string to number for sorting)
    openingHours.sort((a, b) => parseInt(a.dayOfWeek) - parseInt(b.dayOfWeek));

    return openingHours;
  } catch (error) {
    console.error('Error fetching opening hours from API:', error);
    throw new Error(`Failed to fetch opening hours: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch upcoming events from REST API
 */
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

    // Filter out events with invalid dates (0001-01-01 is a default/null date)
    const validEvents = events.filter(event => {
      const eventDate = new Date(event.eventDate);
      // Check if date is valid and not the default date (year 0001)
      return !isNaN(eventDate.getTime()) && eventDate.getFullYear() > 1900;
    });

    // Sort by eventDate (ascending - earliest first)
    validEvents.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());

    return validEvents;
  } catch (error) {
    console.error('Error fetching events from API:', error);
    throw new Error(`Failed to fetch events: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Fetch JSON data from Azure Blob Storage using REST API
 * Alternative method if you prefer to store data as JSON files
 */
export const fetchJsonFromBlob = async (blobName: string): Promise<unknown> => {
  try {
    if (!azureStorageConfig.connectionString) {
      throw new Error('Azure Storage connection string is not configured');
    }

    const { accountName, accountKey } = parseConnectionString(azureStorageConfig.connectionString);
    const containerName = azureStorageConfig.blob.containerName;

    const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;

    // Create authorization header using SharedKey
    const timestamp = new Date().toUTCString();
    const stringToSign = `GET\n\n\n${timestamp}\n/${accountName}/${containerName}/${blobName}`;

    const encoder = new TextEncoder();
    const keyBuffer = encoder.encode(atob(accountKey));
    const messageBuffer = encoder.encode(stringToSign);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageBuffer);
    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
    const authHeader = `SharedKey ${accountName}:${signatureB64}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'x-ms-date': timestamp,
        'x-ms-version': '2021-06-08',
      },
    });

    if (!response.ok) {
      throw new Error(`Azure Storage API error: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(`Error fetching blob ${blobName} from Azure Storage:`, error);
    throw new Error(`Failed to fetch blob data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};


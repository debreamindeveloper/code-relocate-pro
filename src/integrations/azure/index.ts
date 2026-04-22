/**
 * Azure Storage Integration
 * Exports all Azure Storage related functionality
 */

export { azureStorageConfig, validateAzureConfig } from './config';
export {
  fetchOpeningHours,
  fetchEvents,
  fetchAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchJsonFromBlob,
} from './storageService';
export type {
  OpeningHour,
  Event,
  EventInput,
  MultilingualText,
} from './storageService';


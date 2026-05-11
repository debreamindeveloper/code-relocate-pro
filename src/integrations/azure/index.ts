/**
 * Azure Storage Integration
 * Exports all Azure Storage related functionality
 */

export { azureStorageConfig, validateAzureConfig } from './config';
export {
  fetchOpeningHours,
  fetchOpeningHour,
  createOpeningHour,
  updateOpeningHour,
  deleteOpeningHour,
  fetchEvents,
  fetchAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  fetchJsonFromBlob,
} from './storageService';
export type {
  OpeningHour,
  OpeningHourInput,
  Event,
  EventInput,
  MultilingualText,
} from './storageService';


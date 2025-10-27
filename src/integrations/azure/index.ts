/**
 * Azure Storage Integration
 * Exports all Azure Storage related functionality
 */

export { azureStorageConfig, validateAzureConfig } from './config';
export { fetchOpeningHours, fetchEvents, fetchJsonFromBlob } from './storageService';
export type { OpeningHour, Event } from './storageService';


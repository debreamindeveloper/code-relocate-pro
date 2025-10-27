/**
 * Azure Storage Configuration
 * Manages connection strings and container/table names for Azure Storage integration
 */

export const azureStorageConfig = {
  // Connection string from environment variables
  connectionString: import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING || '',
  
  // Blob Storage configuration
  blob: {
    containerName: import.meta.env.VITE_AZURE_BLOB_CONTAINER_NAME || 'data',
  },
  
  // Table Storage configuration
  table: {
    eventsTableName: import.meta.env.VITE_AZURE_EVENTS_TABLE_NAME || 'events',
    openingHoursTableName: import.meta.env.VITE_AZURE_OPENING_HOURS_TABLE_NAME || 'openinghours',
  },
};

/**
 * Validates that required Azure Storage configuration is present
 */
export const validateAzureConfig = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!azureStorageConfig.connectionString) {
    errors.push('VITE_AZURE_STORAGE_CONNECTION_STRING is not configured');
  }

  if (!azureStorageConfig.blob.containerName) {
    errors.push('VITE_AZURE_BLOB_CONTAINER_NAME is not configured');
  }

  if (!azureStorageConfig.table.eventsTableName) {
    errors.push('VITE_AZURE_EVENTS_TABLE_NAME is not configured');
  }

  if (!azureStorageConfig.table.openingHoursTableName) {
    errors.push('VITE_AZURE_OPENING_HOURS_TABLE_NAME is not configured');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


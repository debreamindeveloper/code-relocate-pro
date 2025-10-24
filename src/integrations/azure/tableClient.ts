import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

const AZURE_STORAGE_ACCOUNT = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT;
const AZURE_STORAGE_ACCOUNT_KEY = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_KEY;

if (!AZURE_STORAGE_ACCOUNT || !AZURE_STORAGE_ACCOUNT_KEY) {
  console.warn(
    "Azure Storage credentials not configured. Please set VITE_AZURE_STORAGE_ACCOUNT and VITE_AZURE_STORAGE_ACCOUNT_KEY environment variables."
  );
}

const credential = new AzureNamedKeyCredential(
  AZURE_STORAGE_ACCOUNT || "",
  AZURE_STORAGE_ACCOUNT_KEY || ""
);

const getTableClient = (tableName: string) => {
  const connectionString = `DefaultEndpointsProtocol=https;AccountName=${AZURE_STORAGE_ACCOUNT};AccountKey=${AZURE_STORAGE_ACCOUNT_KEY};EndpointSuffix=core.windows.net`;
  return new TableClient(connectionString, tableName);
};

export { getTableClient };


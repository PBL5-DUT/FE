import { BlobServiceClient } from "@azure/storage-blob";

// Lấy thông tin từ .env
const AZURE_STORAGE_CONNECTION_STRING = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;

// Kiểm tra nếu không có connection string
if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage connection string is not defined in .env");
}

// Khởi tạo BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

/**
 * Upload file lên Azure Blob Storage
 * @param {string} containerName - Tên container (user, post, project)
 * @param {string} blobName - Tên blob (ví dụ: 'volunteer2.png')
 * @param {File} file - File cần tải lên
 * @returns {string} - URL của blob đã tải lên
 */
export const uploadFileToAzure = async (containerName, blobName, file) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Tải file lên
    await blockBlobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file.type }, // Đặt content type
    });

    console.log(`File uploaded to Azure Blob Storage: ${blobName}`);
    return blockBlobClient.url; // Trả về URL của blob
  } catch (error) {
    console.error("Error uploading file to Azure Blob Storage:", error);
    throw error;
  }
};

/**
 * Lấy URL của một blob từ Azure Blob Storage
 * @param {string} containerName - Tên container (user, post, project)
 * @param {string} blobName - Tên blob (ví dụ: 'volunteer2.png')
 * @returns {string} - URL của blob
 */
export const getBlobUrl = (containerName, blobName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    return blobClient.url; // Trả về URL của blob
  } catch (error) {
    console.error("Error getting blob URL from Azure Blob Storage:", error);
    throw error;
  }
};
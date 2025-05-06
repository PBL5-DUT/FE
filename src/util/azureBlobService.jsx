import { BlobServiceClient } from "@azure/storage-blob";

// Lấy thông tin từ .env
const AZURE_STORAGE_ACCOUNT_NAME = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_SAS_TOKEN = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN;

// Kiểm tra nếu không có SAS Token hoặc Account Name
if (!AZURE_STORAGE_ACCOUNT_NAME || !AZURE_STORAGE_SAS_TOKEN) {
  throw new Error("Azure Storage account name hoặc SAS token is not defined in .env");
}

// Khởi tạo BlobServiceClient bằng URL và SAS Token
const blobServiceClient = new BlobServiceClient(
  `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net${AZURE_STORAGE_SAS_TOKEN}`
);

/**
 * Upload file ảnh lên Azure Blob Storage
 * @param {string} containerName - Tên container (user, post, project)
 * @param {string} blobName - Tên blob (ví dụ: 'volunteer2.png')
 * @param {File} file - File cần tải lên
 * @returns {string} - URL của blob đã tải lên
 */
export const uploadFileToAzure = async (containerName, blobName, file) => {
  try {
    // Kiểm tra nếu file không phải là ảnh
    if (!file.type.startsWith("image/")) {
      throw new Error("File không phải là ảnh. Vui lòng chọn file ảnh.");
    }

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
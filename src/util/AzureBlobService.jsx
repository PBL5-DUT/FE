import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING = process.env.REACT_APP_AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage Connection String is not defined in environment variables.");
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

/**
 * Tải ảnh lên Azure Blob Storage
 * @param {File} file - File cần tải lên
 * @param {string} containerName - Tên container (user, post, project)
 * @returns {string} - URL của ảnh đã tải lên
 */
export const uploadImageToAzure = async (file, containerName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Tạo tên blob duy nhất
    const blobName = `${Date.now()}-${file.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Tải file lên
    const uploadResponse = await blockBlobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    console.log("Upload response:", uploadResponse);

    // Trả về URL của ảnh
    return blockBlobClient.url;
  } catch (error) {
    console.error("Error uploading image to Azure:", error);
    throw error;
  }
};

/**
 * Lấy danh sách ảnh từ Azure Blob Storage
 * @param {string} containerName - Tên container (user, post, project)
 * @returns {Array<string>} - Danh sách URL của các ảnh
 */
export const listImagesFromAzure = async (containerName) => {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobUrls = [];

    // Lặp qua các blob trong container
    for await (const blob of containerClient.listBlobsFlat()) {
      const blobUrl = `${containerClient.url}/${blob.name}`;
      blobUrls.push(blobUrl);
    }

    return blobUrls;
  } catch (error) {
    console.error("Error listing images from Azure:", error);
    throw error;
  }
};
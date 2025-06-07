import { BlobServiceClient } from "@azure/storage-blob";

// Lấy thông tin từ .env
const AZURE_STORAGE_ACCOUNT_NAME = import.meta.env.VITE_AZURE_STORAGE_ACCOUNT_NAME;

// Kiểm tra nếu không có SAS Token hoặc Account Name
if (!AZURE_STORAGE_ACCOUNT_NAME) {
  throw new Error("Azure Storage account name is not defined in .env");
}

// Hàm upload file lên Azure Blob Storage với containerType truyền vào
export const uploadFileToAzure = async (containerType, blobName, file) => {
  let AZURE_STORAGE_SAS_TOKEN;

  // Kiểm tra SAS Token cho các container khác nhau
  if (containerType === 'user') {
    AZURE_STORAGE_SAS_TOKEN = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN_USER;
  } else if (containerType === 'post') {
    AZURE_STORAGE_SAS_TOKEN = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN_POST;
  } else if (containerType === 'project') {
    AZURE_STORAGE_SAS_TOKEN = import.meta.env.VITE_AZURE_STORAGE_SAS_TOKEN_PROJECT;
  } else {
    throw new Error("SAS token for the specified container type is not defined.");
  }

  if (!AZURE_STORAGE_SAS_TOKEN) {
    throw new Error("SAS token is not defined for the specified container type.");
  }

  // Khởi tạo BlobServiceClient với SAS Token
  const blobServiceClient = new BlobServiceClient(
    `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net${AZURE_STORAGE_SAS_TOKEN}`
  );

  try {
    // Kiểm tra nếu file không phải là ảnh
    if (!file.type.startsWith("image/")) {
      throw new Error("File không phải là ảnh. Vui lòng chọn file ảnh.");
    }

    const containerClient = blobServiceClient.getContainerClient(containerType);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Tải file lên Azure Blob Storage
    await blockBlobClient.uploadBrowserData(file, {
      blobHTTPHeaders: { blobContentType: file.type }, // Đặt content type
    });

    console.log(`File uploaded to Azure Blob Storage: ${blobName}`);
    return blockBlobClient.url; // Trả về URL của blob đã tải lên
  } catch (error) {
    console.error("Error uploading file to Azure Blob Storage:", error);
    throw error;
  }
};

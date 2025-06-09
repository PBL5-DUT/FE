import React, { useState } from "react";
import { FaImage, FaPaperPlane, FaTrash } from "react-icons/fa";
import { uploadFileToAzure } from "../../util/azureBlobService";
import { apiConfig } from "../../config/apiConfig";

const PostNew = ({ forumId, userId, onPost }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [success, setSuccess] = useState(""); 

  const handlePost = async () => {
    if (isPosting) return;
    if (!content.trim()) {
      setError("Nội dung không được để trống!");
      return;
    }

    setIsPosting(true);
    setError("");
    setSuccess(""); 

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          try {
            const blobName = `post-${Date.now()}-${index}-${image.file.name || "image"}`;
            const imageUrl = await uploadFileToAzure("post", blobName, image.file);
            return {
              imageFilepath: imageUrl,
              description: "",
              order: index,
            };
          } catch (e) {
            console.error("Image upload failed:", e);
            throw new Error("Tải ảnh thất bại!");
          }
        })
      );

      const postData = {
        forumId,
        userId,
        content,
        postImages: uploadedImages,
      };

      console.log("postImages gửi lên backend:", postData.postImages);

      const response = await apiConfig.post("/posts", postData);

      if (response?.status === 200 || response?.status === 201) {
        if (typeof onPost === "function") {
          onPost(response.data);
        }
        setContent("");
        setImages([]);
        setError("");
        setSuccess("Đăng bài thành công!");
        setTimeout(() => setSuccess(""), 5000); 
      } else {
        setError("Đã xảy ra lỗi khi đăng bài!");
      }
    } catch (err) {
      console.error("Error posting:", err);
      setError("Không thể kết nối đến server hoặc upload ảnh thất bại!");
    } finally {
      setIsPosting(false);
    }
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const existingKeys = new Set(prev.map((img) => img.file.name + img.file.size));
      const uniqueNewImages = newImages.filter(
        (img) => !existingKeys.has(img.file.name + img.file.size)
      );
      return [...prev, ...uniqueNewImages];
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <textarea
        className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Viết bài đăng hoặc câu hỏi của bạn tại đây..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError("");
          setSuccess("");
        }}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image.url}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <label className="flex items-center bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition cursor-pointer">
          <FaImage className="mr-2 text-gray-600" />
          Thêm ảnh
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddImages}
          />
        </label>

        <button
          onClick={handlePost}
          disabled={isPosting}
          className={`flex items-center px-6 py-2 rounded-lg transition ${
            isPosting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaPaperPlane className="mr-2" />
          {isPosting ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
};

export default PostNew;

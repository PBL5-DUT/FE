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
    console.log("forum" , forumId);
    if (isPosting || !content.trim()) {
      setError("Nội dung không được để trống!");
      return;
    }

    setIsPosting(true);
    setError("");
    setSuccess("");

    try {
      const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          const blobName = `post-${Date.now()}-${index}-${image.file.name || "image"}`;
          const imageUrl = await uploadFileToAzure("post", blobName, image.file);
          return {
            imageFilepath: imageUrl,
            description: "",
            order: index,
          };
        })
      );

      const postData = { forumId, userId, content, postImages: uploadedImages };
      const response = await apiConfig.post("/posts", postData);
      console.log("Post response:", postData);;
      if (response?.status === 200 || response?.status === 201) {
        onPost?.(response.data);
        setContent("");
        setImages([]);
        setSuccess("Đăng bài thành công!");
        setTimeout(() => setSuccess(""), 3000);
      } else {
              console.log("Post response:", postData);;

        setError("Đã xảy ra lỗi khi đăng bài!");
      }
    } catch (err) {
      console.error(err);
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
      const existing = new Set(prev.map((img) => img.file.name + img.file.size));
      const unique = newImages.filter((img) => !existing.has(img.file.name + img.file.size));
      return [...prev, ...unique];
    });
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6 space-y-4">
      <textarea
        className="w-full resize-none border border-gray-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500"
        rows="3"
        placeholder="Bạn đang nghĩ gì thế?"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setError("");
          setSuccess("");
        }}
      ></textarea>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}

      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image.url}
                alt={`preview-${index}`}
                className="w-full h-28 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white p-1 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center border-t pt-4">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-blue-500">
          <FaImage />
          <span className="hidden sm:inline">Thêm ảnh</span>
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
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition 
            ${isPosting
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          <FaPaperPlane />
          {isPosting ? "Đang đăng..." : "Đăng bài"}
        </button>
      </div>
    </div>
  );
};

export default PostNew;

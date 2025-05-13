import React, { useState } from "react";
import { FaImage, FaPaperPlane, FaTrash } from "react-icons/fa";
import { uploadFileToAzure } from "../../util/azureBlobService"; 
import { apiConfig } from "../../config/apiConfig";

const PostNew = ({ forumId, userId, onPost }) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!content.trim()) {
      setError("Nội dung không được để trống!");
      return;
    }

    try {
      // Upload từng ảnh lên Azure Blob Storage
      const uploadedImages = await Promise.all(
        images.map(async (image, index) => {
          const blobName = `post-${Date.now()}-${index}-${image.file.name}`;
          const url = await uploadFileToAzure("post", blobName, image.file);
          return { url }; // Trả về URL của ảnh đã upload
        })
      );

      // Chuẩn bị dữ liệu gửi đến backend
      const postData = {
        forumId,
        userId,
        content,
        postImages: uploadedImages,
      };

      // Gửi dữ liệu đến backend
      console.log("forumId:", forumId);
      console.log("userId:", userId);
      
      const response = await apiConfig.post('/posts', postData);
        

      if (response.ok) {
        const newPost = await response.json();
        onPost(newPost); // Gọi callback để cập nhật danh sách bài viết
        setContent("");
        setImages([]);
        setError("");
      } else {
        setError("Đã xảy ra lỗi khi đăng bài!");
      }
    } catch (err) {
      console.error("Error posting:", err);
      setError("Không thể kết nối đến server!");
    }
  };

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file), // Tạo URL xem trước
    }));
    setImages((prev) => [...prev, ...newImages]);
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
          setError(""); // Xóa lỗi khi người dùng nhập
        }}
      ></textarea>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Hiển thị ảnh đã chọn */}
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
        {/* Nút thêm ảnh */}
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

        {/* Nút đăng bài */}
        <button
          onClick={handlePost}
          className="flex items-center bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          <FaPaperPlane className="mr-2" />
          Đăng bài
        </button>
      </div>
    </div>
  );
};

export default PostNew;
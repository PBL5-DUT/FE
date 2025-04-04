import React, { useState } from "react";
import axios from "axios";

const NewPj = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showImageForm, setShowImageForm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (status) => {
    if (!title || !description || !location || !startDate || !endDate) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const currentTime = new Date().toISOString();
      
      const response = await axios.post("http://localhost:8080/api/projects", {
        name: title,
        description,
        location,
        start_time: startDate,
        end_time: endDate,
        avatar_filepath: avatar, // Lưu URL ảnh
        pm_id: "1",
        status,
        created_at: currentTime,
        updated_at: currentTime,
      });

      console.log("Dự án đã được lưu:", response.data);
      onClose();
    } catch (error) {
      if (error.response) {
        setError(`Lỗi: ${error.response.data.message || "Không thể lưu dự án"}`);
      } else {
        setError("Lỗi: Không nhận được phản hồi từ server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl" onClick={onClose}>❌</button>

        <h2 className="text-2xl font-bold mb-4">New Project</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <label className="block font-semibold">Project Name</label>
        <input type="text" className="w-full p-2 border rounded mb-3" value={title} onChange={(e) => setTitle(e.target.value)} />

        <label className="block font-semibold">Description</label>
        <textarea className="w-full p-2 border rounded mb-3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>

        <label className="block font-semibold">Location</label>
        <input type="text" className="w-full p-2 border rounded mb-3" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label className="block font-semibold">Start Date</label>
        <input type="date" className="w-full p-2 border rounded mb-3" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        <label className="block font-semibold">End Date</label>
        <input type="date" className="w-full p-2 border rounded mb-3" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        {avatar && <img src={avatar} alt="Project Avatar" className="w-40 h-24 rounded-lg object-cover mb-3" />}

        {showImageForm ? (
          <div className="mb-3">
            <label className="block font-semibold">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setShowImageForm(false)}>OK</button>
          </div>
        ) : (
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-3" onClick={() => setShowImageForm(true)}>Add Image</button>
        )}

        <div className="flex justify-between mt-4">
          <div>
            <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={() => handleSubmit("Draft")} disabled={loading}>
              {loading ? "Saving..." : "Save as draft"}
            </button>
            <button className={`px-4 py-2 rounded ${loading ? "bg-gray-400" : "bg-orange-400 text-white"}`} onClick={() => handleSubmit("Waiting for approval")} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPj;

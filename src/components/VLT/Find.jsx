import { useState } from "react";

const Find = ({ onSortChange, onSearch, defaultSort }) => {
  const [selectedSort, setSelectedSort] = useState(defaultSort || "Newest");
  const [search, setSearch] = useState(""); 

  const sortOptions = [
    { label: "Newest", value: "Newest" },
    { label: "Most volunteers", value: "Most volunteers" },
    { label: "Most liked", value: "Most liked" },
    { label: "Remaining", value: "Remaining" },
    { label: "Liked", value: "Liked" },
  ];

  const handleSort = (sortValue) => {
    setSelectedSort(sortValue); 
    onSortChange(sortValue); 
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    onSearch(e.target.value); 
    console.log("Search value:", e.target.value);
  };

  return (
    <div className="w-full max-w-xl p-4">
      {/* Thanh tìm kiếm */}
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow outline-none text-sm text-gray-700"
          value={search}
          onChange={handleSearch}
        />
        <button className="text-gray-500 hover:text-gray-700">🔍</button>
      </div>

      {/* Các tùy chọn sắp xếp */}
      <div className="flex gap-2 mt-4">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            className={`px-4 py-2 rounded-full border text-sm truncate ${
              selectedSort === option.value
                ? "bg-gray-200 border-gray-400 font-bold" 
                : "border-gray-300"
            } text-gray-700 hover:bg-gray-100`}
            onClick={() => handleSort(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Find;
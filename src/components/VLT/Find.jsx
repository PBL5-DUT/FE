import { useState } from "react";
import { Search } from "lucide-react";

const Find = () => {
  const [search, setSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState(null);

  const sortOptions = [
    "Liked",
    "Nearest",
    "Amount of volunteers",
    "Newest",
  ];
  return (
    <div className="w-full max-w-xl p-4">
      <div className="flex items-center border border-gray-300 rounded-full px-2 py-1">
        <input
          type="text"
          placeholder="Search..."
          className="flex-grow outline-none text-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="text-gray-500 hover:text-gray-700">
          <Search size={20} />
        </button>
      </div>
      <div className="flex gap-4 mt-4">
        {sortOptions.map((option) => (
          <button
            key={option}
            className={`px-1 scroll-py-0.5 rounded-full border ${
              selectedSort === option ? "bg-gray-200 border-gray-400" : "border-gray-300"
            } text-gray-700 hover:bg-gray-100`}
            onClick={() => setSelectedSort(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Find;
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const jobList = [
  {
    id: 1,
    company: "Google",
    location: "California, USA",
    position: "Software Engineer",
    description: "We are looking for a passionate software engineer...",
  },
  {
    id: 2,
    company: "Facebook",
    location: "Menlo Park, USA",
    position: "Data Scientist",
    description: "Join our data science team to analyze...",
  },
  {
    id: 3,
    company: "Microsoft",
    location: "Redmond, USA",
    position: "Cloud Engineer",
    description: "Help build and scale cloud services...",
  },
];

export default function JobFlashcard() {
  const [search, setSearch] = useState("");
  const [flipped, setFlipped] = useState({});

  const filteredJobs = jobList.filter(
    (job) =>
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.position.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFlip = (id) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Input
        type="text"
        placeholder="Tìm kiếm công ty hoặc vị trí..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <motion.div
            key={job.id}
            className="relative w-full h-48 p-4 bg-white shadow-lg rounded-2xl cursor-pointer"
            onClick={() => toggleFlip(job.id)}
            animate={{ rotateY: flipped[job.id] ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {!flipped[job.id] ? (
              <div className="absolute w-full h-full flex flex-col justify-center items-center text-center backface-hidden">
                <h2 className="text-xl font-bold">{job.company}</h2>
                <p className="text-gray-500">{job.location}</p>
                <p className="text-gray-700 font-medium">{job.position}</p>
                <Button
                  variant="outline"
                  className="absolute bottom-2 right-2 flex items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(job.id);
                  }}
                >
                  Chi tiết <ChevronRight size={16} />
                </Button>
              </div>
            ) : (
              <div className="absolute w-full h-full flex flex-col justify-center items-center text-center backface-hidden transform rotateY-180">
                <p className="text-gray-700 px-4">{job.description}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
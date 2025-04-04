import ProjectCard from "./ProjectCard";
import p1 from "../../assets/p1_img.jpg";
import p2 from "../../assets/p2_img.png";
import p3 from "../../assets/p3_img.png";


const projects = [
  {
    id: 1,
    name: "Trung thu cho em",
    location: "Quảng Ngãi",
    description: "Là dự án thường niên nhằm giúp đỡ trẻ em vùng cao...",
    image: p1, 
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
  {
    id: 2,
    name: "Chung tay mùa đông",
    location: "Hà Giang",
    description: "Hỗ trợ trẻ em nghèo có áo ấm và nhu yếu phẩm vào mùa đông...",
    image: p2,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
  {
    id: 3,
    name: "Sách cho tương lai",
    location: "Sơn La",
    description: "Cung cấp sách giáo khoa và truyện tranh cho trẻ em vùng cao...",
    image: p3,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
  {
    id: 4,
    name: "Sách cho tương lai",
    location: "Sơn La",
    description: "Cung cấp sách giáo khoa và truyện tranh cho trẻ em vùng cao...",
    image: p3,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
  {
    id: 5,
    name: "Sách cho tương lai",
    location: "Sơn La",
    description: "Cung cấp sách giáo khoa và truyện tranh cho trẻ em vùng cao...",
    image: p3,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
  {
    id: 6,
    name: "Sách cho tương lai",
    location: "Sơn La",
    description: "Cung cấp sách giáo khoa và truyện tranh cho trẻ em vùng cao...",
    image: p3,
    max: "Số lượng tối đa: 100 người",
    date: "Ngày bắt đầu: 15/09/2021",
  },
];

const ProjectList = () => {
  return (
    <div className="w-full px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách dự án</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;

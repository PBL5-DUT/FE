import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { apiConfig } from "../../config/apiConfig";

const DonationChart = () => {
  const { id } = useParams(); // Lấy projectId từ URL
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await apiConfig.get(`http://localhost:8080/api/donations/project/${id}`);
        const donations = response.data;
  
        // Nhóm theo ngày (YYYY-MM-DD) và tính tổng số tiền
        const grouped = {};
        donations.forEach(d => {
          const date = new Date(d.createdAt).toISOString().slice(0, 10); // "YYYY-MM-DD"
          grouped[date] = (grouped[date] || 0) + d.amount;
        });
  
        // Chuyển về mảng dữ liệu cho biểu đồ
        const chartData = Object.keys(grouped).map(date => ({
          date,
          totalAmount: grouped[date],
        }));
  
        setData(chartData);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error);
      }
    };
  
    fetchDonations();
  }, [id]);
  

  return (
    <div className="max-w-5xl mx-auto mt-12">
    <h2 className="text-2xl font-bold mb-6">Thống kê số tiền quyên góp cho dự án</h2>
    <ResponsiveContainer width="100%" height={400}>
    <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip formatter={(value) => `${value.toLocaleString()} đ`} />
    <Bar dataKey="totalAmount" fill="#3182CE" />
    </BarChart>

    </ResponsiveContainer>
    </div>
  );
  
};

export default DonationChart;

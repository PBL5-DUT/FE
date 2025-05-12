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

        // Lọc các bản ghi có type = "money"
        const moneyDonations = donations.filter(d => d.type === "money");

        if (moneyDonations.length === 0) {
          setData([]);
          return;
        }

        const grouped = {};
        let minDate = new Date(moneyDonations[0].createdAt);
        let maxDate = new Date(moneyDonations[0].createdAt);

        moneyDonations.forEach(d => {
          const created = new Date(d.createdAt);
          const dateStr = created.toISOString().slice(0, 10); // "YYYY-MM-DD"
          grouped[dateStr] = (grouped[dateStr] || 0) + d.amount;

          if (created < minDate) minDate = created;
          if (created > maxDate) maxDate = created;
        });

        const allDates = [];
        const currentDate = new Date(minDate);
        while (currentDate <= maxDate) {
          const dateStr = currentDate.toISOString().slice(0, 10);
          allDates.push(dateStr);
          currentDate.setDate(currentDate.getDate() + 1);
        }

        const chartData = allDates.map(date => ({
          date,
          totalAmount: grouped[date] || 0,
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
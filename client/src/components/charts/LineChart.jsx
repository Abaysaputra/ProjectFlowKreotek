import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);

const LineChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then((res) => {
        const projects = res.data;
        const monthLabels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

        // Inisialisasi jumlah per bulan
        const validated = Array(12).fill(0);
        const unvalidated = Array(12).fill(0);

        projects.forEach((p) => {
          const monthIndex = new Date(p.createdAt).getMonth();
          if (p.status === "done") {
            validated[monthIndex]++;
          } else {
            unvalidated[monthIndex]++;
          }
        });

        setData({
          labels: monthLabels,
          datasets: [
            {
              label: "Proyek Tervalidasi",
              data: validated,
              borderColor: "#3B82F6",
              backgroundColor: "#3B82F6",
              tension: 0.4,
            },
            {
              label: "Belum Tervalidasi",
              data: unvalidated,
              borderColor: "#93C5FD",
              backgroundColor: "#93C5FD",
              tension: 0.4,
            },
          ],
        });
      })
      .catch((err) => console.error("Gagal mengambil data proyek:", err));
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Proyek Berdasarkan Bulan</h2>
      {data ? <Line data={data} options={options} /> : <p>Memuat grafik...</p>}
    </div>
  );
};

export default LineChart;

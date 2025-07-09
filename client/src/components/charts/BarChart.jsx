import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [dataPerBulan, setDataPerBulan] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => {
        const projects = res.data;

        // Buat array untuk menghitung proyek per bulan
        const countPerMonth = new Array(12).fill(0);
        projects.forEach(p => {
          const date = new Date(p.createdAt);
          if (p.status === "done") {
            const month = date.getMonth(); // 0 - Jan, 11 - Dec
            countPerMonth[month]++;
          }
        });

        setDataPerBulan(countPerMonth);
      })
      .catch(err => console.error("Gagal memuat data bar chart:", err));
  }, []);

  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const data = {
    labels,
    datasets: [
      {
        label: "Proyek Selesai",
        data: dataPerBulan,
        backgroundColor: "#6366f1"
      }
    ]
  };

  return <Bar data={data} />;
};

export default BarChart;

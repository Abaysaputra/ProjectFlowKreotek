  import { useEffect, useState } from "react";
  import axios from "axios";
  import LineChart from "../components/charts/LineChart";
  import BarChart from "../components/charts/BarChart";

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Bar, Line, Pie } from 'react-chartjs-2';
  import 'chart.js/auto';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
  );

  const Dashboard = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/api/projects")
        .then(res => {
          if (Array.isArray(res.data)) {
            setProjects(res.data);
          } else {
            console.error("Response bukan array:", res.data);
          }
        })
        .catch(err => console.error("Gagal fetch proyek:", err));
    }, []);

    // Hitung status
    const statusCount = projects.reduce((acc, curr) => {
      acc[curr.status] = (acc[curr.status] || 0) + 1;
      return acc;
    }, {});

    // Hitung jenis client
    const clientCount = projects.reduce((acc, curr) => {
      const type = curr.client?.type || "Lainnya";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const pieDataStatus = {
      labels: Object.keys(statusCount),
      datasets: [{
        data: Object.values(statusCount),
        backgroundColor: ['#10b981', '#3b82f6', '#f59e0b']
      }]
    };

    const pieDataClient = {
      labels: Object.keys(clientCount),
      datasets: [{
        data: Object.values(clientCount),
        backgroundColor: ['#ef4444', '#8b5cf6', '#22c55e']
      }]
    };

    const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    }
  };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Perkembangan Proyek</h2>
          <LineChart />
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Proyek Selesai per Bulan</h2>
            <BarChart />
        </div>
        <div className="bg-white p-4 rounded shadow col-span-1 md:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Distribusi Proyek</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium mb-1">Status Proyek</h4>
              <div style={{ width: "100%", height: "300px" }}>
                <Pie data={pieDataStatus} options={options} />
              </div>
            </div>
            <div>
              <h4 className="text-md font-medium mb-1">Jenis Klien</h4>
              <div style={{ width: "100%", height: "300px" }}>
                <Pie data={pieDataClient} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;

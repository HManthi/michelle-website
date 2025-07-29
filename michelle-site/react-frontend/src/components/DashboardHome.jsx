import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaUser,
  FaTrophy,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaImage,
} from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './css/DashboardHome.css';

const COLORS = ['#d4af37', '#a77f1e', '#ffbb28', '#ff8042'];

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    awards: 0,
    social_works: 0,
    education_galleries: 0,
    galleries: 0,
    videos: {
      dramas: 0,
      movies: 0,
      songs: 0,
      musical: 0,
    },
  });

  useEffect(() => {
    axios
      .get('/api/dashboard-stats')
      .then((res) => setStats(res.data))
      .catch(() => alert('Failed to load stats'));
  }, []);

  const videoChartData = Object.entries(stats.videos).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-grid">
        <div className="card">
          <div className="icon"><FaUser /></div>
          <div className="info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="card">
          <div className="icon"><FaTrophy /></div>
          <div className="info">
            <h3>{stats.awards}</h3>
            <p>Total Awards</p>
          </div>
        </div>

      <div className="card">
        <div className="dashboard-chart">
        <h3>Video Distribution by Category</h3>
        <PieChart width={400} height={300}>
          <Pie
            data={videoChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name }) => name}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {videoChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      </div>

        <div className="card">
          <div className="icon"><FaHandsHelping /></div>
          <div className="info">
            <h3>{stats.social_works}</h3>
            <p>Total Social Work</p>
          </div>
        </div>

        <div className="card">
          <div className="icon"><FaChalkboardTeacher /></div>
          <div className="info">
            <h3>{stats.education_galleries}</h3>
            <p>Total Education Outreach</p>
          </div>
        </div>

        <div className="card">
          <div className="icon"><FaImage /></div>
          <div className="info">
            <h3>{stats.galleries}</h3>
            <p>Total Gallery Entries</p>
          </div>
        </div>
      </div>

      
    </div>
  );
}

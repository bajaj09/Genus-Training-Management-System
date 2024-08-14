/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState, memo } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Title, Tooltip, Legend);

// Memoize the Doughnut component to prevent unnecessary re-renders
// eslint-disable-next-line react-refresh/only-export-components
const MemoizedDoughnut = memo(Doughnut);

const Trainer_show = () => {

  const { navtitle } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let r = await fetch(`https://training-management-system.onrender.com/admin?navtitle=${navtitle}`);
        const data = await r.json();
        setData(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navtitle]);

  const statusCounts = data.reduce((acc, item) => {
    acc[item.department] = (acc[item.department] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Department Count',
        data: Object.values(statusCounts),
        backgroundColor: ['rgb(3, 8, 109)', 'rgb(20, 30, 220)', 'rgb(98, 106, 250)',],
        borderColor: ['rgb(3, 8, 109)', 'rgb(20, 30, 220)', 'rgb(98, 106, 250)',],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Department Distribution',
      },
    },
    cutout: '60%', // Makes it a donut chart
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">

      <div className="chart">
        <div className="chart-box">
          <div className="chartfilter"><MemoizedDoughnut data={chartData} options={chartOptions} /></div>
          <div className="chart-legend">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="legend-item">
                <span className="legend-label">{status}:</span>
                <span className="legend-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>{`${navtitle} Id`}</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Department</th>
              {navtitle == 'Trainer' ? <th>Specialization</th> : null}
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                {navtitle == 'Trainer' ? <td>{item.trainerId}</td> : <td>{item.traineeId}</td>}
                <td>{item.name}</td>
                <td>{item.email}</td>
                {navtitle == 'Trainer' ? <td>{item.specialization}</td> : null}
                <td>{item.department}</td>
                <td><Link to={`/delete/admin/admin/${navtitle}/${item[`${navtitle.toLowerCase()}Id`]}`}>Delete</Link></td>
                <td><Link to={`/modify/admin/admin/${navtitle}/${item[`${navtitle.toLowerCase()}Id`]}`}>Modify</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Trainer_show;

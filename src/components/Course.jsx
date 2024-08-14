/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form"
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import '../styling/Dashboard.css';

const starStyle = { color: 'yellow' };

const renderStars = (a,b) => {
    let averageScore=(a.duration+a.content+a.questions+a.instructions+a.trainer)/(b*5)
  const fullStars = Math.floor(averageScore);
  const halfStar = averageScore - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array(fullStars).fill(<FaStar style={starStyle} />)} {/* Render full stars */}
      {halfStar && <FaStarHalfAlt />} {/* Render half star */}
      {Array(emptyStars).fill(<FaRegStar />)} {/* Render empty stars */}
    </>
  );
};

ChartJS.register(ArcElement, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AdminC = () => {

  const { user } = useParams();
  const { id } = useParams();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [data, setData] = useState([]);
  const [train, setT] = useState([]);
  const [ans, setAns] = useState([]);
  const [graph, setGraph] = useState([])
  const [option, setOption] = useState({ user, id })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // console.log(ans)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let rr = await fetch("https://training-management-system.onrender.com/admin?navtitle=Trainer");
        const dat = await rr.json();
        //console.log(dat)
        setT(dat)
        console.log(option)
        let r = await fetch("https://training-management-system.onrender.com/course", {
          method: "POST", headers: {
            "Content-Type": "application/json",
          }, body: JSON.stringify(option)
        })
        const data = await r.json();
        console.log(data)
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [option,ans]);

  const onSubmit = async (data) => {
    data.user = user
    data.id = id
    //console.log(data)
    setOption(data)
  }

  const feedback = async (id) => {
    let course = {}
    course.id = id
    course.user = "course"
    let r = await fetch("https://training-management-system.onrender.com/course", {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(course)
    })
    const ans = await r.json();
    setGraph(ans)
    //console.log(graph)
    setAns(1)
  }

  const statusCounts = data.reduce((acc, course) => {
    acc[course.status] = (acc[course.status] || 0) + 1;
    return acc;
  }, {});
  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Course Status Count',
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
        text: 'Course Status Distribution',
      },
    },
    cutout: '60%', // This property makes it a donut chart
  };

  const graphCounts = data.reduce((acc, course) => {
    if (ans == 1) {
      acc.Duration = (graph.feedback[0].duration) / graph.feedbackid.length
      acc.Content = (graph.feedback[0].content) / graph.feedbackid.length
      acc.Questions = (graph.feedback[0].questions) / graph.feedbackid.length
      acc.Instructions = (graph.feedback[0].instructions) / graph.feedbackid.length
      acc.Trainer = (graph.feedback[0].trainer) / graph.feedbackid.length
    }
    return acc;
  }, {});
  
  const graphData = {
    labels: Object.keys(graphCounts),
    datasets: [
      {
        // label: 'Feedback',
        data: Object.values(graphCounts),
        backgroundColor: ['rgb(185, 240, 222)', 'rgb(115, 251, 206)', 'rgb(21, 250, 174)', 'rgb(6, 182, 123)', 'rgb(3, 109, 74)'],
        borderColor: ['rgb(185, 240, 222)', 'rgb(115, 251, 206)', 'rgb(21, 250, 174)', 'rgb(6, 182, 123)', 'rgb(3, 109, 74)'],
        borderWidth: 1,
      },
    ]
  };

  

  const graphOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: `Feedback Status of ${graph.courseId} `,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    }
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

          <div className="chartfilter"><Doughnut data={chartData} options={chartOptions} /></div>
          {Object.entries(statusCounts).map(([status, count]) => (
            <span key={status} >
              <span>{status}:</span>
              <span>{count} &nbsp; &nbsp;</span>
            </span>))}
        </div>

        <div className="chart-box">
          {ans == 1 ? <><div className="chartfilter">
            <Bar data={graphData} options={graphOptions} /></div>
            {Object.entries(graphCounts).map(([status, count]) => (
              <span key={status} >
                <span>{status}:</span>
                <span>{count} &nbsp; &nbsp;</span>
              </span>))}</> : ""}
        </div>
      </div>

      <div className="table">

        <div className='filter'>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            
            <input placeholder='Select Month'  {...register("month")} type="month" />
            
            {user=='admin' ?<select placeholder='Select Trainer'{...register("train")} type="user">
              <option value='Select Trainers' selected>Select Trainers</option>
              {train.map(item => (<option key={item._id} value={item.trainerId}>{item.name}</option>))}
            </select>: null}
            
            <input type="submit" value="Submit" />
          </form>
          
        </div>
        <table>
          <thead>
            <tr>
              <th>Course Id</th>
              <th>Course Name</th>
              {user != 'trainer' ? <th>{`Trainer's Id`}</th> : null}
              {user != 'trainer' ? <th>{`Trainer's Name`}</th> : null}
              {user != 'admin' ? <th>Start Date</th> : null}
              {user != 'admin' ? <th>Duration (Days)</th> : null}
              {user == 'admin' ? <th>Employees Registered</th> : null}
              <th>Status</th>
              {user == 'trainer' ? <th></th> : null}
              {user == 'trainer' ? <th></th> : null}
              <th>Feedback</th>
              {user != 'trainee' ? <th>Overall Rating</th> : null}
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item._id}>
                <td>{item.courseId}</td>
                <td>{item.name.split('-')[0]}</td>
                {user != 'trainer' ? <td>{item.trainerId}</td> : null}
                {user != 'trainer' ? <td>{item.name.split('-')[1]}</td> : null}
                {user != 'admin' ? <td>{item.sdate.split('T')[0]}</td> : null}
                {user != 'admin' ? <td>{item.duration}</td> : null}
                {user == 'admin' ? <td>{item.empid.length}</td> : null}
                <td>{item.status}</td>

                {user == 'trainer' ?  item.status != 'Completed' ?  <td><Link to={`/${user}/${id}/${item.courseId}/emp`}>Add Employees</Link></td>  : <td></td> : null}

                {user == 'trainer' ? item.status != 'Upcoming' ? <td><Link to={`/${user}/${id}/${item.courseId}/attendance`}>Attendance</Link></td>  : <td></td> : null}

                {user == 'trainee' ? item.attendance.includes(id) && item.status == 'Completed' ? !item.feedbackid.includes(id)  ? <td><Link to={`/${user}/${id}/feedback/${item.courseId}`}>Feedback</Link> </td> : <td>Submited</td>: <td>Not Eligible</td> :null}

                {user != 'trainee' ? item.status == 'Completed' ? <td><button className='feed-link' type="button" onClick={() => feedback(item.courseId)}>Show</button></td> : <td>Not Completed</td> : null}
                {user != 'trainee' ? item.status == 'Completed' ? <td> {renderStars(item.feedback[0],item.feedbackid.length)} </td> : <td>Not Completed</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminC

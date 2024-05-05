import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import 'chartjs-adapter-date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, TimeScale, Title, Tooltip, Legend);

const WeeklyGraph = () => {
  const [weekOffset, setWeekOffset] = useState(-1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ label: 'Total Activity Duration (Hours)', data: [], fill: false, borderColor: 'rgb(75, 192, 192)', tension: 0.1 }],
  });

  useEffect(() => {
    const subscription = Meteor.subscribe(WorkoutLogs.userPublicationName);
    return () => subscription.stop();
  }, []);

  const logs = useTracker(() => {
    const end = new Date();
    end.setDate(end.getDate() - (end.getDay() + 7 * weekOffset));
    end.setHours(23, 59, 59, 999);

    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    return WorkoutLogs.collection.find({
      owner: Meteor.user()?.username,
      date: { $gte: start, $lte: end },
    }, { sort: { date: 1 } }).fetch();
  }, [weekOffset]);

  useEffect(() => {
    const end = new Date();
    end.setDate(end.getDate() - (end.getDay() + 7 * weekOffset));
    end.setHours(23, 59, 59, 999);

    const start = new Date(end);
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      dates.push(day.toISOString().split('T')[0]);
    }

    const dailyTotals = dates.map(date => {
      const dayLogs = logs.filter(log => log.date.toISOString().split('T')[0] === date);
      const totalHours = dayLogs.reduce((acc, log) => acc + (log.activityDurationHours + log.activityDurationMinutes / 60), 0);
      return { x: new Date(date), y: totalHours };
    });

    const newData = {
      labels: dates.map(date => new Date(date)),
      datasets: [{
        label: 'Total Activity Duration (Hours)',
        data: dailyTotals,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }],
    };

    setChartData(newData);
  }, [logs, weekOffset]);

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM d',
          },
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Activity Duration (Hours)',
        },
        ticks: {
          stepSize: 0.5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  };

  const graphContainerStyle = {
    maxWidth: '1300px',
    margin: 'auto',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Weekly Fitness Activity</h2>
      <div style={graphContainerStyle}>
        <Line data={chartData} options={options} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => setWeekOffset(prevOffset => prevOffset + 1)}
        >
          Previous Week
        </button>
        <button
          type="button"
          style={weekOffset <= -1 ? disabledButtonStyle : buttonStyle}
          onClick={() => setWeekOffset(prevOffset => prevOffset - 1)}
          disabled={weekOffset <= -1}
        >
          Next Week
        </button>
      </div>
    </div>
  );
};

export default WeeklyGraph;

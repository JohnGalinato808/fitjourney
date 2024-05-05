import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { WorkoutLogs } from '../../api/workoutlog/workoutlog';
import 'chartjs-adapter-date-fns';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const YearlyGraph = () => {
  const currentYear = new Date().getFullYear();
  const [yearOffset, setYearOffset] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [], hoverOffset: 4 }],
  });

  useEffect(() => {
    const subscription = Meteor.subscribe(WorkoutLogs.userPublicationName);
    return () => subscription.stop();
  }, []);

  const logs = useTracker(() => {
    const start = new Date();
    start.setFullYear(start.getFullYear() + yearOffset, 0, 1);
    start.setHours(0, 0, 0, 0);

    const end = new Date(start);
    end.setFullYear(end.getFullYear() + 1);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    const fetchedLogs = WorkoutLogs.collection.find({
      owner: Meteor.user()?.username,
      date: { $gte: start, $lte: end },
    }).fetch();

    const yearData = Array.from({ length: 12 }, () => ({ totalTime: 0, logs: [] }));

    fetchedLogs.forEach(log => {
      const month = log.date.getMonth();
      const durationHours = log.activityDurationHours || 0;
      const durationMinutes = log.activityDurationMinutes || 0;
      const totalTime = durationHours + durationMinutes / 60;
      yearData[month].totalTime += totalTime;
      yearData[month].logs.push(log);
    });

    const filteredYearData = yearData.filter(month => month.totalTime > 0);

    return filteredYearData;
  }, [yearOffset]);

  useEffect(() => {
    const totalHours = logs.reduce((acc, month) => acc + month.totalTime, 0);
    const percentages = logs.map(month => ((month.totalTime / totalHours) * 100).toFixed(2));

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ];

    // eslint-disable-next-line no-unused-vars
    const backgroundColors = months.map(month => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      return `#${randomColor}`;
    });

    setChartData({
      labels: logs.map((month, index) => months[index]),
      datasets: [{ data: percentages, backgroundColor: backgroundColors, hoverOffset: 4 }],
    });
  }, [logs]);

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const percentage = `${context.parsed.toFixed(2)}%`;
            const index = context.dataIndex;
            const totalHours = logs[index] ? Math.floor(logs[index].totalTime) : 0;
            const totalMinutes = logs[index] ? Math.round((logs[index].totalTime - totalHours) * 60) : 0;
            const totalTime = `${totalHours} hours, ${totalMinutes} minutes`;
            return `${label}: ${percentage} (Total Time: ${totalTime})`;
          },
        },
        mode: 'index',
        intersect: false,
        multiKey: 'ctrl',
        position: 'nearest',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: 'Arial',
          size: 14,
        },
        bodyFont: {
          family: 'Arial',
          size: 12,
        },
        displayColors: false,
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0,
        cornerRadius: 4,
        padding: 8,
        multiline: true,
      },
      title: {
        display: true,
        text: `${currentYear + yearOffset}`,
        font: {
          size: 18,
        },
        align: 'center',
      },
    },
  };

  const graphContainerStyle = {
    maxWidth: '750px',
    margin: 'auto',
    marginLeft: '640px',
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
      <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Yearly Fitness Activity</h2>
      <div style={graphContainerStyle}>
        <Pie data={chartData} options={options} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          type="button"
          style={buttonStyle}
          onClick={() => {
            if (yearOffset > -currentYear) {
              setYearOffset(prevOffset => prevOffset - 1);
            }
          }}
          disabled={yearOffset === -currentYear}
        >
          Previous Year
        </button>
        <button
          type="button"
          style={yearOffset === 0 ? disabledButtonStyle : buttonStyle}
          onClick={() => {
            if (yearOffset < 0) {
              setYearOffset(prevOffset => prevOffset + 1);
            }
          }}
          disabled={yearOffset === 0}
        >
          Next Year
        </button>
      </div>
    </div>
  );
};

export default YearlyGraph;

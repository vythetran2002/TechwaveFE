import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getAllDaysOfCurrentMonth } from "@/assets/utils/Chart/getAllDaysOfCurrentMonth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};

function RegisterChart(props) {
  const { stats, option } = props;

  let labels = null;
  let usersData = {
    fill: true,
    label: "Lượt đăng kí user",
    data: null,
    borderColor: "#0284c7",
    backgroundColor: "rgba(53, 162, 235, .4)",
  };
  let vendorsData = {
    fill: true,
    label: "Lượt đăng kí vendor",
    data: null,
    borderColor: "#ef4444",
    backgroundColor: "rgba(248, 113, 113, .6)",
  };

  if (option === 1) {
    labels = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
  } else {
    labels = getAllDaysOfCurrentMonth();
  }

  if (option === 1) {
    usersData.data = stats.year.user;
    vendorsData.data = stats.year.vendor;
  } else {
    usersData.data = stats.month.user;
    vendorsData.data = stats.month.vendor;
  }

  const data = {
    labels,
    datasets: [usersData, vendorsData],
  };

  return <Line options={options} data={data} />;
}

export default RegisterChart;

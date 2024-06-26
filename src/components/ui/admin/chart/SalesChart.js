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

// const labels = [
//   "Tháng 1",
//   "Tháng 2",
//   "Tháng 3",
//   "Tháng 4",
//   "Tháng 5",
//   "Tháng 6",
//   "Tháng 7",
//   "Tháng 8",
//   "Tháng 9",
//   "Tháng 10",
//   "Tháng 11",
//   "Tháng 12",
// ];

const labels = getAllDaysOfCurrentMonth();

function SalesChart(props) {
  const { stats, option } = props;
  let labels = null;
  let info = {
    fill: true,
    label: "Doanh thu",
    data: null,
    borderColor: "#0284c7",
    backgroundColor: "rgba(53, 162, 235, .4)",
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
    info.data = stats.year;
  } else {
    info.data = stats.month;
  }
  const data = {
    labels,
    datasets: [info],
  };

  return <Line options={options} data={data} />;
}

export default SalesChart;

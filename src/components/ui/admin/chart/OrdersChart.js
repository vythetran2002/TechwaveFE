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

const labels = [
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

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Đơn hàng thành công",
      data: [20, 40, 45, 22, 19, 33, 17, 23, 56, 44, 12, 32],
      borderColor: "#0284c7",
      backgroundColor: "rgba(53, 162, 235, .4)",
    },
    {
      fill: false,
      label: "Đơn hàng thất bại",
      data: [10, 5, 12, 5, 12, 3, 12, 20, 21, 19, 20, 12],
      borderColor: "#ef4444",
      backgroundColor: "rgba(248, 113, 113, .6)",
    },
    {
      fill: false,
      label: "Đơn hàng bị huỷ",
      data: [11, 22, 22, 11, 19, 21, 9, 40, 39, 33, 23, 30],
      borderColor: "#eab308",
      backgroundColor: "#facc15",
    },
  ],
};

function OrdersChart() {
  return <Line options={options} data={data} />;
}

export default OrdersChart;

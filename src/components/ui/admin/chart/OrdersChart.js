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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      borderColor: "#0284c7",
      backgroundColor: "rgba(53, 162, 235, .4)",
    },
    {
      fill: false,
      label: "Đơn hàng thất bại",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "#ef4444",
      backgroundColor: "rgba(248, 113, 113, .6)",
    },
    {
      fill: false,
      label: "Đơn hàng bị huỷ",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      borderColor: "#eab308",
      backgroundColor: "#facc15",
    },
  ],
};

function OrdersChart(props) {
  const { info } = props;
  // console.log(info);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: info[0].label,
        data: info[0].data,
        borderColor: "#0284c7",
        backgroundColor: "rgba(53, 162, 235, .4)",
      },
      {
        fill: false,
        label: info[1].label,
        data: info[1].data,
        borderColor: "#ef4444",
        backgroundColor: "rgba(248, 113, 113, .6)",
      },
      {
        fill: false,
        label: info[2].label,
        data: info[2].data,
        borderColor: "#eab308",
        backgroundColor: "#facc15",
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default OrdersChart;

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export function ProductsChart(props) {
  const statsArray = props.stats.slice(0, 5);

  const data = {
    labels: [
      "Đơn hàng chờ xác nhận", // status = 0
      "Đơn hàng đã được duyệt", // status = 1
      "Đơn hàng thành công", // status = 2
      "Đơn hàng không được duyệt", // status = 3
      "Đơn hàng bị huỷ", // status = 4
    ],
    datasets: [
      {
        data: statsArray,
        backgroundColor: [
          "#fb923c",
          "#0ea5e9",
          "#84cc16",
          "#737373",
          "#f43f5e",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
}

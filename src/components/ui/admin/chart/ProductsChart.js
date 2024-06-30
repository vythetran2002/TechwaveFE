import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Empty, Typography } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

function kiemTraMangSo0(mang) {
  for (let i = 0; i < mang.length; i++) {
    if (mang[i] !== 0) {
      return false;
    }
  }
  return true;
}

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

  if (kiemTraMangSo0(statsArray)) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          imageStyle={{
            height: 60,
          }}
          description={
            <Typography.Text>Hiện tại chưa có dữ liệu</Typography.Text>
          }
        ></Empty>
      </div>
    );
  } else return <Doughnut data={data} />;
}

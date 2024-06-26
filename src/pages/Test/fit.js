import React from "react";
import Styles from "./test.module.css";
import { Textfit } from "react-textfit";
import useFetch from "@/api/useFetch";

function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dữ liệu nhận được:", data);
      return data;
    })
    .catch((error) => {
      console.error("Có lỗi xảy ra:", error);
    });
}

function reactTextFit() {
  const data = useFetch("https://techwave-yfsp.onrender.com/api/category/");
  const handleClick = () => {
    fetchData("https://techwave-yfsp.onrender.com/api/category/").then(
      (result) => {
        console.log(result);
      }
    );
  };

  return (
    <>
      <button onClick={handleClick}>CLICK ME</button>;
      {data.isLoading ? <p>Loading...</p> : <p>{data.data}</p>}
    </>
  );
}

export default reactTextFit;

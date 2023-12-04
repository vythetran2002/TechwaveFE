import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";
import images from "@/assets/images";
import Styles from "./test.module.css";
import { useRef } from "react";

const ReactOwl = dynamic(() => import("react-owl-carousel"), { ssr: false });

function Owl() {
  const carouselRef = useRef(null);

  const [items, setItems] = useState([
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 1",
      description: "This is item 1",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 2",
      description: "This is item 2",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 3",
      description: "This is item 3",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 4",
      description: "This is item 4",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 5",
      description: "This is item 5",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 5",
      description: "This is item 5",
    },
    {
      img: "https://via.placeholder.com/100x100",
      title: "Item 5",
      description: "This is item 5",
    },
  ]);

  return (
    <>
      <div className={Styles["container"]}>
        <ReactOwl
          className={"owl-theme "}
          loop
          margin={10}
          items={"1"}
          autoplay={true}
          nav
          navContainerClass={Styles["nav"]}
          navClass={[Styles["nav-left"], Styles["nav-right"]]}
          stageOuterClass={Styles["stage-outer"]}
          stageClass={Styles["stage"]}
        >
          {items.map((item, index) => (
            <div style={{}} key={index}>
              <Image src={images.image1} alt="" priority={true}></Image>
            </div>
          ))}
        </ReactOwl>
      </div>
    </>
  );
}
export default Owl;

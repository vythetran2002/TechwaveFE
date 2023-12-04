import React from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import images from "@/assets/images";
import Image from "next/image";
import NavCate from "./NavCate/NavCate";
import dynamic from "next/dynamic";
const ReactOwl = dynamic(() => import("react-owl-carousel"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlickSlider from "react-slick";
import useFetch from "@/api/useFetch";

function Slider() {
  const data = useFetch("http://localhost:3000/api/category");
  const cateList = data.data;
  const isLoading = data.isLoading;
  const isError = data.isError;
  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    // nav: true,
    // dots: false,
    // navContainerClass: Styles["top-carousel-nav-container"],
    // navClass: [
    //   Styles["top-carousel-prev-buton"],
    //   Styles["top-carousel-next-buton"],
    // ],
    // stageClass: Styles["top-carousel-stage"],
    // stageOuterClass: Styles["top-carousel-stage-outer"],
    // navText: [
    //   `<div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#000000}</style><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></div>`,
    //   `<div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#000000}</style><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></div>`,
    // ],
  };

  // var settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  // };

  return (
    <>
      <section className={Styles["slider-promo-wrapper"]}>
        <div className={Styles["slider-promo-container"]}>
          {/* <div className={Styles["nav-cate-container"]}>
            <div className={Styles["nav-cate-item"]}>
              <div className={Styles["test"]}></div>
              <Link href="/" className={Styles["link"]}>
                Ổ cứng di động SSD cao cấp
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <div className={Styles["triagle"]}></div>
              <Link className={Styles["link"]} href="/">
                {" "}
                cứng di động HDD cao cấp
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <Link className={Styles["link"]} href="/">
                Pc - Máy tính đồng bộ
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <Link className={Styles["link"]} href="/">
                Laptop & Macbook
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <Link className={Styles["link"]} href="/">
                Màn hình máy tính
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <Link className={Styles["link"]} href="/">
                Tivi - Màn hình Tivi
              </Link>
            </div>
            <div className={Styles["nav-cate-item"]}>
              <Link className={Styles["link"]} href="/">
                Thiết bị văn phòng
              </Link>
            </div>
          </div> */}
          <NavCate data={cateList} loading={isLoading} error={isError} />
          <div className={Styles["slider-container"]}>
            <div className={Styles["top-slider-container"]}>
              <div className={Styles["slider-wrapper"]}>
                <div className={Styles["slider-item-img-wrapper"]}>
                  <ReactOwl className="owl-theme" items={1} dots={false}>
                    <Image
                      src={images.image1}
                      style={{
                        maxWidth: "100%",
                        objectFit: "cover",
                      }}
                      className={Styles["slider-img"]}
                      alt=""
                    />
                  </ReactOwl>
                </div>
              </div>
              <div className={Styles["top-promo-wrapper"]}>
                <div className={Styles["top-promo-img-wrapper"]}>
                  <Image
                    src={images.image2}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                      maxHeight: "80px",
                    }}
                    alt=""
                  />
                </div>
                <div className={Styles["top-promo-img-wrapper"]}>
                  <Image
                    src={images.image3}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                      maxHeight: "80px",
                    }}
                    alt=""
                  />
                </div>
                <div className={Styles["top-promo-img-wrapper"]}>
                  <Image
                    src={images.image4}
                    style={{
                      maxWidth: "100%",
                      objectFit: "cover",
                      maxHeight: "80px",
                    }}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className={Styles["bottom-slider-container"]}>
              <div className={Styles["bottom-promo-img-wrapper"]}>
                <Image
                  src={images.image5}
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    maxHeight: "120px",
                  }}
                  alt=""
                />
              </div>
              <div className={Styles["bottom-promo-img-wrapper"]}>
                <Image
                  src={images.image6}
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    maxHeight: "120px",
                  }}
                  alt=""
                />
              </div>
              <div className={Styles["bottom-promo-img-wrapper"]}>
                <Image
                  src={images.image7}
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    maxHeight: "120px",
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Slider;

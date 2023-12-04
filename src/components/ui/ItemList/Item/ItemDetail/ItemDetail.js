import React from "react";
import Dialog from "@mui/material/Dialog";
import { useRef, useState, useEffect } from "react";
import DialogContent from "@mui/material/DialogContent";
import Styles from "./styles.module.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import images from "@/assets/images";
import Image from "next/image";
import { CloseOutlined } from "@mui/icons-material";
import { InputNumber, Button } from "antd";
import Link from "next/link";
import { Roboto } from "next/font/google";
import { memo } from "react";
import useFetchProductById from "@/api/products/useFetchProductById";

const ReactOwl = dynamic(() => import("react-owl-carousel"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function ItemDetail(props) {
  const item = props.item;
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState();
  const [quantity, setQuantity] = useState(1);

  if (item) {
    let options = item.option;
  }

  const [activeOptionId, setActiveOptionId] = useState(null);

  const optionRefs = useRef({});

  const sxStyle = {
    "& .MuiDialog-container:hover": {
      cursor: "pointer",
    },
    "& .MuiPaper-root": {
      zIndex: "1002",

      cursor: "default",
    },
    "& .MuiTypography-root": {
      padding: "10px 14px 10px 24px",
    },
    "& .MuiDialogActions-root": {
      padding: "24px",
    },
    "&.css-4g2jqn-MuiModal-root-MuiDialog-root": {
      right: 55,
    },
  };

  // const handleClick = (index, event) => {
  //   console.log(index);
  // };

  // top Carousel configs

  const options = {
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    nav: true,
    dots: false,
    navContainerClass: Styles["top-carousel-nav-container"],
    navClass: [
      Styles["top-carousel-prev-buton"],
      Styles["top-carousel-next-buton"],
    ],
    stageClass: Styles["top-carousel-stage"],
    stageOuterClass: Styles["top-carousel-stage-outer"],
    navText: [
      `<div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#000000}</style><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg></div>`,
      `<div><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#000000}</style><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg></div>`,
    ],
  };

  const handleClick = (option, id, e) => {
    setId(id);
  };

  const check = (option) => {
    if (option.option_id == id) {
      return true;
    } else {
      return false;
    }
  };

  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };

  const handleAddCart = () => {
    let temp = {
      option_id: id,
      quantity: quantity,
      price: parseInt(quantity) * parseInt(item.price),
      product_id: item.product_id,
    };
    props.addCartItem(temp);
  };

  // useEffect(() => {
  //   function handleClickOutside(event) {
  //     if (
  //       specificElementRef.current &&
  //       !specificElementRef.current.contains(event.target)
  //     ) {
  //       setIsActive(false);
  //     }
  //   }

  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  // function handleClick() {
  //   setIsActive((prevState) => !prevState);
  // }

  // useEffect(() => {
  //   console.log(id);
  // }, [id]);

  if (item)
    return (
      <>
        <Dialog
          open={props.isOpenDialog}
          fullWidth={true}
          maxWidth="md"
          sx={sxStyle}
          onClose={props.handlingCloseDialog}
          className={roboto.className}
        >
          <DialogContent>
            <div className={Styles["dialog-container"]}>
              <div className={Styles["slider-container"]}>
                <div className={Styles["top-slider-wrapper"]}>
                  <ReactOwl className="owl-theme" {...options}>
                    <div className={Styles["img-wrapper"]}>
                      {item.image ? (
                        <Image
                          src={item.image}
                          width={1000}
                          height={1000}
                          alt=""
                          className={Styles["img"]}
                          priority={true}
                        />
                      ) : (
                        <Image
                          src={images.image8}
                          alt=""
                          className={Styles["img"]}
                          priority={true}
                        />
                      )}
                    </div>
                    {/* <div className={Styles["img-wrapper"]}>
                    <Image
                      src={images.image8}
                      alt=""
                      className={Styles["img"]}
                      priority={true}
                    />
                  </div>
                  <div className={Styles["img-wrapper"]}>
                    <Image
                      src={images.image8}
                      alt=""
                      className={Styles["img"]}
                      priority={true}
                    />
                  </div>
                  <div className={Styles["img-wrapper"]}>
                    <Image
                      src={images.image8}
                      alt=""
                      className={Styles["img"]}
                      priority={true}
                    />
                  </div> */}
                  </ReactOwl>
                </div>
              </div>
              <div className={Styles["item-detail-container"]}>
                <div className={Styles["item-name-exit-button-container"]}>
                  {item ? (
                    <span style={{ cursor: "auto" }}>{item.name}</span>
                  ) : (
                    <span style={{ cursor: "auto" }}>Untitled</span>
                  )}

                  <div className={Styles["exit-button-container"]}>
                    <div onClick={props.handlingCloseDialog}>
                      <CloseOutlined />
                    </div>
                  </div>
                </div>
                {item && (
                  <div className={Styles["price-promo-price-container"]}>
                    <span style={{ fontStyle: "bold" }}>{item.price}đ</span>
                    <span style={{ color: "red" }}>
                      {item.promotional_price}đ
                    </span>
                    <span style={{ textDecoration: "line-through" }}>
                      1.049.000đ
                    </span>
                    <span className={Styles["percent-discount"]}>-36%</span>
                  </div>
                )}

                <div className={Styles["options-container"]}>
                  <span className={Styles["option-title-container"]}>Loại</span>
                  <div className={Styles["option-cards-container"]}>
                    {item && item.option.length != 0 ? (
                      item.option.map((option, index) => {
                        return (
                          <div
                            id={option.option_id}
                            key={option.option_id}
                            onClick={(e) =>
                              handleClick(option, option.option_id, e)
                            }
                            className={
                              check(option, id)
                                ? `${Styles["option-card"]} ${Styles["active"]}`
                                : Styles["option-card"]
                            }
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <span style={{ width: "100%" }}>
                                {option.name}
                              </span>
                            </div>
                            {option.image != null ? (
                              <div className={Styles["cate-img-wrapper"]}>
                                <Image
                                  src={option.image}
                                  alt=""
                                  width={50}
                                  height={50}
                                />
                              </div>
                            ) : (
                              <div className={Styles["cate-img-wrapper"]}>
                                <Image
                                  src={images.nonImg}
                                  alt=""
                                  width={50}
                                  height={50}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className={Styles["empty-div-container"]}>Trống</div>
                    )}
                  </div>
                </div>
                <div className={Styles["quantity-input-container"]}>
                  <span>Số lượng:</span>
                  <div>
                    <InputNumber
                      onChange={handleChangeQuantity}
                      max={item.quantity}
                      defaultValue={1}
                    />
                  </div>
                </div>
                <div className={Styles["cart-button-container"]}>
                  <Button
                    onClick={handleAddCart}
                    className={Styles["cart-container"]}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
                <div className={Styles["share-options-container"]}>
                  <span>Chia sẻ:</span>
                  <div className={Styles["medias-container"]}>
                    <Link href={"/"} className={Styles["link"]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="35px"
                        width="35px"
                        viewBox="0 0 448 512"
                        style={{
                          fill: "#005eff",
                        }}
                      >
                        <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
                      </svg>
                    </Link>
                    <Link href={"/"} className={Styles["link"]}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="35px"
                        width="35px"
                        viewBox="0 0 448 512"
                        style={{
                          fill: "black",
                        }}
                      >
                        <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className={Styles["navigate-link"]}>
                  {item && (
                    <Link
                      href={"/product/" + item.product_id}
                      className={Styles["link"]}
                    >
                      <span className={Styles["navigate-text"]}>
                        Xem chi tiết sản phẩm
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
}

export default memo(ItemDetail);

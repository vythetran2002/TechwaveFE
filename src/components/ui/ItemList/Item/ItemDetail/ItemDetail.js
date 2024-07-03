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
import { FormatPrice } from "@/assets/utils/PriceFormat";
import toast from "react-hot-toast";
import { Rating } from "@mui/material";
import { Tooltip } from "@mui/material";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
const ReactOwl = dynamic(() => import("react-owl-carousel"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

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

function ItemDetail(props) {
  const item = props.item;

  const [img, setImg] = useState(null);
  // console.log(item);
  const [reload, setReload] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [id, setId] = useState(null);

  // console.log(img);
  const [quantity, setQuantity] = useState(1);

  if (item) {
    let options = item.option;
  }

  const [activeOptionId, setActiveOptionId] = useState(null);

  const optionRefs = useRef({});

  // const handleClick = (index, event) => {
  //   console.log(index);
  // };

  // top Carousel configs

  const handleClick = (option, id, img) => {
    setId(id);
    setImg(img);
    setReload(!reload);
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
    if (id) {
      let temp = {
        option_id: id,
        quantity: quantity,
        price: parseInt(quantity) * parseInt(item.price),
        product_id: item.product_id,
      };
      props.addCartItem(temp);
      props.handlingCloseDialog();
    } else if (item.option.length === 0) {
      let temp = {
        option_id: id,
        quantity: quantity,
        price: parseInt(quantity) * parseInt(item.price),
        product_id: item.product_id,
      };
      props.addCartItem(temp);
      props.handlingCloseDialog();
    } else {
      toast.error("Hãy chọn loại sản phẩm");
    }
  };

  const handleCloseDialog = () => {
    props.handlingCloseDialog();
    setImg(null);
    setId(null);
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

  if (item)
    return (
      <>
        <Dialog
          open={props.isOpenDialog}
          fullWidth={true}
          maxWidth="md"
          sx={sxStyle}
          onClose={handleCloseDialog}
          className={roboto.className}
        >
          <DialogContent
            sx={{
              height: "fit-content",
            }}
          >
            <div className={Styles["dialog-container"]}>
              <div className={Styles["slider-container"]}>
                <div className={Styles["top-slider-wrapper"]}>
                  {/* <ReactOwl className="owl-theme" {...options}> */}
                  <div className={Styles["img-wrapper"]}>
                    {img ? (
                      <>
                        <img
                          src={img}
                          width={1000}
                          height={1000}
                          alt=""
                          className={Styles["img"]}
                          priority={true}
                        />
                      </>
                    ) : (
                      <>
                        {item.image ? (
                          <>
                            <img
                              src={item.image}
                              width={1000}
                              height={1000}
                              alt=""
                              className={Styles["img"]}
                              priority={true}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={images.image8}
                              width={1000}
                              height={1000}
                              alt=""
                              className={Styles["img"]}
                              priority={true}
                            />
                          </>
                        )}
                      </>
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
                  {/* </ReactOwl> */}
                </div>
              </div>
              <div className={Styles["item-detail-container"]}>
                <div className={Styles["item-name-exit-button-container"]}>
                  <div
                    style={{
                      boxSizing: "border-box",
                      display: "flex",
                      gap: "20px",
                      alignItems: "center",
                      width: "90%",
                    }}
                  >
                    {item ? (
                      <Tooltip title={item.name}>
                        <span className={Styles["item-title-wrapper"]}>
                          {item.name}
                        </span>
                      </Tooltip>
                    ) : (
                      <span style={{ cursor: "auto" }}>Untitled</span>
                    )}
                    {item && item.rating ? (
                      <>
                        <Rating
                          value={parseInt(props.item.rating)}
                          precision={0.5}
                          readOnly
                          size="md"
                        />
                      </>
                    ) : (
                      <>
                        <Rating value={0} precision={0.5} readOnly size="md" />
                      </>
                    )}
                  </div>
                  <div className={Styles["exit-button-container"]}>
                    <div onClick={props.handlingCloseDialog}>
                      <CloseOutlined />
                    </div>
                  </div>
                </div>
                <div className={Styles["price-rate-container"]}>
                  {item.promotional_price ? (
                    <div className={Styles["price-promo-price-container"]}>
                      {/* <span style={{ fontStyle: "bold" }}>{item.price}đ</span> */}
                      <span style={{ color: "red" }}>
                        {FormatPrice(item.promotional_price)}
                      </span>
                      <span style={{ textDecoration: "line-through" }}>
                        {FormatPrice(item.price)}
                      </span>
                      {/* <span className={Styles["percent-discount"]}>-36%</span> */}
                    </div>
                  ) : (
                    <div className={Styles["price-promo-price-container"]}>
                      <span style={{ fontStyle: "bold" }}>
                        {" "}
                        {FormatPrice(item.price)}
                      </span>
                      {/* <span style={{ color: "red" }}>
                      {item.promotional_price}đ
                    </span> */}
                      {/* <span style={{ textDecoration: "line-through" }}>
                      1.049.000đ
                    </span> */}
                      {/* <span className={Styles["percent-discount"]}>-36%</span> */}
                    </div>
                  )}
                  {item.haveSales ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                      }}
                    >
                      <span>Đã bán:</span>
                      <span>{item.haveSales}</span>
                    </div>
                  ) : (
                    <span className={Styles["buy-count"]}>
                      <div
                        style={{
                          display: "flex",
                          gap: "5px",
                        }}
                      >
                        <span>Đã bán:</span>
                        <span>0</span>
                      </div>
                    </span>
                  )}
                </div>

                <div className={Styles["options-container"]}>
                  {item && item.option.length != 0 && (
                    <>
                      <span className={Styles["option-title-container"]}>
                        Loại
                      </span>
                    </>
                  )}

                  <div className={Styles["option-cards-container"]}>
                    {item && item.option.length != 0 ? (
                      item.option.map((option, index) => {
                        return (
                          <div
                            id={option.option_id}
                            key={option.option_id}
                            onClick={(e) =>
                              handleClick(
                                option,
                                option.option_id,
                                option.image
                              )
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
                              <span
                                className={Styles["option-name-lable"]}
                                style={{ width: "100%" }}
                              >
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
                      <>
                        <div className={Styles["empty-div-container"]}>
                          <span></span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className={Styles["quantity-input-container"]}>
                  <span>Số lượng:</span>
                  <div>
                    <InputNumber
                      onChange={handleChangeQuantity}
                      max={item.quantity}
                      min={1}
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
                    <FacebookShareButton
                      url={"https://github.com/nygardk/react-share"}
                      hashtag={"#techwave"}
                      description={"techwave"}
                    >
                      <FacebookIcon size={32} style={{ borderRadius: "5px" }} />
                    </FacebookShareButton>

                    <TwitterShareButton
                      title={"techwave"}
                      url={"https://github.com/nygardk/react-share"}
                      hashtag={"#techwave"}
                    >
                      <TwitterIcon size={32} style={{ borderRadius: "5px" }} />
                    </TwitterShareButton>
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

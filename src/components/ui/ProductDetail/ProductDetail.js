import React, { useEffect } from "react";
import Styles from "./style.module.css";
import { Rate, InputNumber, Tooltip } from "antd";
import Link from "next/link";
import dynamic from "next/dynamic";
import images from "@/assets/images";
import Image from "next/image";
import { Image as AntdImage } from "antd";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useRef, useState } from "react";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import StoreList from "../StoreList/StoreList";
import Rating from "@mui/material/Rating";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import countElementOfArray from "@/assets/utils/countArrayElement";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import toast, { Toaster } from "react-hot-toast";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

const ReactOwl = dynamic(() => import("react-owl-carousel"), { ssr: false });

function ProductDetail(props) {
  const { product, img, updateImg } = props;

  // Refs
  const img1Ref = useRef();
  const img2Ref = useRef();
  const img3Ref = useRef();
  const imgSlideRef = useRef();
  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const jumpTo1 = (e) => {
    var carousel = $(".owl-carousel").data("owl.carousel");
    e.preventDefault();
    carousel.to(1, 500);
  };
  const jumpTo2 = (e) => {
    var carousel = $(".owl-carousel").data("owl.carousel");
    e.preventDefault();
    carousel.to(2, 500);
  };
  const jumpTo3 = (e) => {
    var carousel = $(".owl-carousel").data("owl.carousel");
    e.preventDefault();
    carousel.to(3, 500);
  };

  const handleClick = (option, id, img) => {
    setId(id);
    updateImg(img);
  };

  const handleChangeQuantity = (value) => {
    setQuantity(value);
  };

  const check = (option) => {
    if (option.option_id == id) {
      return true;
    } else {
      return false;
    }
  };

  const handlingOpenDialog = () => {
    imgSlideRef.current.click();
  };

  // const handleAddCart = () => {
  //   if (product.option.length === 0) {
  //     let temp = {
  //       quantity: quantity,
  //       price: parseInt(quantity) * parseInt(product.price),
  //       product_id: product.product_id,
  //     };
  //     props.handleAddCart(temp);
  //   } else if (id) {
  //     if (product) {
  //       if (id == null) {
  //         let temp = {
  //           quantity: quantity,
  //           price: parseInt(quantity) * parseInt(product.price),
  //           product_id: product.product_id,
  //         };
  //         props.handleAddCart(temp);
  //       } else {
  //         let temp = {
  //           option_id: id,
  //           quantity: quantity,
  //           price: parseInt(quantity) * parseInt(product.price),
  //           product_id: product.product_id,
  //         };
  //         props.handleAddCart(temp);
  //       }
  //     }
  //   } else {
  //     toast.error("Hãy chọn loại sản phẩm");
  //   }
  // };

  const handleAddCart = () => {
    // If Has Option
    if (id) {
      let temp = {
        option_id: id,
        quantity: quantity,
        // price: parseInt(quantity) * parseInt(product.price),
        product_id: product.product_id,
      };
      const stock = product.quantity;
      props.handleAddCart(temp, stock);
    } else if (product.option.length === 0) {
      let temp = {
        option_id: id,
        quantity: quantity,
        price: parseInt(quantity) * parseInt(product.price),
        product_id: product.product_id,
      };
      const stock = product.quantity;
      props.handleAddCart(temp, stock);
    } else {
      toast.error("Hãy chọn loại sản phẩm");
    }
  };

  if (product)
    return (
      <>
        <Toaster />
        <div className={Styles["product-detail-container"]}>
          <div className={Styles["product-detail-wrapper"]}>
            <div className={Styles["product-carousel-container"]}>
              <div className={Styles["product-carousel-wrapper"]}>
                {img ? (
                  <>
                    <AntdImage
                      src={img}
                      alt=""
                      className={Styles["img"]}
                      priority={true}
                    />
                  </>
                ) : (
                  <>
                    {product.image ? (
                      <>
                        <AntdImage
                          src={product.image}
                          alt=""
                          className={Styles["img"]}
                          priority={true}
                        />
                      </>
                    ) : (
                      <>
                        <AntdImage
                          src={images.nonImg}
                          width={500}
                          height={500}
                          alt=""
                          className={Styles["img"]}
                          priority={true}
                        />
                      </>
                    )}
                  </>
                )}
                {/* {product.image != null ? (
                    <>
                      <Image
                        src={product.image}
                        width={500}
                        height={500}
                        alt=""
                        className={Styles["img"]}
                        // ref={img1Ref}
                        priority={true}
                      />
                    </>
                  ) : (
                    <Image
                      src={images.image8}
                      alt=""
                      className={Styles["img"]}
                      // ref={img1Ref}
                      priority={true}
                    />
                  )} */}
                {/* <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    ref={img1Ref}
                    priority={true}
                  /> */}
                {/* <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    ref={img2Ref}
                    priority={true}
                  />
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    ref={img3Ref}
                    priority={true}
                  />
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  />
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  />
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  /> */}
              </div>
              {/* <div className={Styles["product-img-preview-container"]}>
                <div
                  className={Styles["product-img-preview-wrapper"]}
                  onClick={jumpTo1}
                >
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  />
                </div>
                <div
                  className={Styles["product-img-preview-wrapper"]}
                  onClick={jumpTo2}
                >
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  />
                </div>
                <div
                  className={Styles["product-img-preview-wrapper"]}
                  onClick={jumpTo3}
                >
                  <Image
                    src={images.image8}
                    alt=""
                    className={Styles["img"]}
                    priority={true}
                  />
                </div>
                <div
                  className={Styles["product-more-img-preview-wrapper"]}
                  onClick={handlingOpenDialog}
                >
                  <PhotoLibraryIcon />
                  <span>Hình (+10)</span>
                </div>
              </div>
              <div className={Styles["product-img"]}>
                <StoreList imgRef={imgSlideRef} />
              </div> */}
            </div>
            {product && (
              <div className={Styles["product-info-container"]}>
                <span className={Styles["product-name"]}>{product.name}</span>
                <div className={Styles["product-rating-container"]}>
                  <Rating
                    name="read-only"
                    value={parseInt(product.rating)}
                    readOnly
                    precision={0.5}
                  />
                  <span>{product.rating}</span>
                  <span
                    style={{
                      color: "var(--header-bg-top)",
                      textDecoration: "none",
                    }}
                  >
                    <div mode="single">{product.slReview} Đánh giá</div>
                  </span>
                  |
                  <span>
                    <div mode="single">{product.haveSales} đã bán</div>
                  </span>
                </div>
                <span className={Styles["row-container"]}>
                  {product.quantity == 0 ? (
                    <span>Trạng thái: Hết hàng</span>
                  ) : (
                    <span>Trạng thái: Còn hàng</span>
                  )}
                </span>
                <span className={Styles["row-container"]}>Số lượt xem: 4</span>
                {product.promotional_price ? (
                  <>
                    <div className={Styles["product-price-container"]}>
                      <span>Giá bán:</span>
                      <span style={{ color: "red" }}>
                        {FormatPrice(product.promotional_price)}
                      </span>
                      <span
                        style={{
                          color: "black",
                          textDecoration: "line-through",
                        }}
                      >
                        {FormatPrice(product.price)}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={Styles["product-price-container"]}>
                      <span>Giá bán:</span>
                      <span style={{ color: "red" }}>
                        {" "}
                        {FormatPrice(product.price)}
                      </span>
                      {/* <span
                        style={{
                          color: "black",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.promotional_price} đ
                      </span> */}
                    </div>
                  </>
                )}

                <span className={Styles["row-container"]}>
                  Số lượng: {product.quantity}
                </span>
                <span className={Styles["row-container"]}>
                  Xuất xứ: {product.origin}
                </span>

                <div className={Styles["product-cate-container"]}>
                  <span className={Styles["option-title-container"]}>Mẫu</span>
                  <div className={Styles["option-cards-container"]}>
                    {product.option.length != 0 ? (
                      product.option.map((option, index) => {
                        return (
                          <Tooltip key={option.option_id} title={option.name}>
                            <div
                              className={
                                check(option, id)
                                  ? `${Styles["option-card"]} ${Styles["active"]}`
                                  : Styles["option-card"]
                              }
                              onClick={(e) =>
                                handleClick(
                                  option,
                                  option.option_id,
                                  option.image
                                )
                              }
                            >
                              <span
                                style={{ width: "100%", height: "50px" }}
                                className={Styles["option-name-lable"]}
                              >
                                {option.name}
                              </span>
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
                          </Tooltip>
                        );
                      })
                    ) : (
                      <>
                        <div className={Styles["empty-div"]}>Trống</div>
                      </>
                    )}
                  </div>
                </div>
                <div className={Styles["product-quantity-button-container"]}>
                  {product.quantity < 5 ? (
                    <InputNumber
                      onChange={handleChangeQuantity}
                      className={Styles["input-quantity"]}
                      defaultValue={1}
                      min={1}
                      max={product.quantity}
                    />
                  ) : (
                    <InputNumber
                      onChange={handleChangeQuantity}
                      className={Styles["input-quantity"]}
                      defaultValue={1}
                      min={1}
                      max={5}
                    />
                  )}
                </div>
                <div className={Styles["product-contact-button-container"]}>
                  <button className={Styles["button-top"]}>
                    <span>Chat Zalo</span>
                    <span>0336.278.954</span>
                  </button>
                  <button
                    className={Styles["button-top"]}
                    style={{ backgroundColor: "#f88e20" }}
                  >
                    <a href="tel:+1234567890" id="callButton">
                      Gọi ngay
                    </a>
                    <span>0816.789.439</span>
                  </button>
                  <button
                    className={Styles["button-bottom"]}
                    onClick={handleAddCart}
                  >
                    <span>Mua ngay</span>
                    <span>Giao hàng COD Miễn Phí Toàn Quốc</span>
                  </button>
                </div>
                <div className={Styles["product-desc-container"]}>
                  Tính năng HMB (Bộ nhớ máy chủ) sử dụng DMA (Truy cập bộ nhớ
                  trực tiếp) của PCI Express để cho phép SSD sử dụng một số DRAM
                  trên hệ thống PC, thay vì yêu cầu SSD phải mang DRAM riêng.
                </div>
                <div className={Styles["share-options-container"]}>
                  <span>Chia sẻ:</span>
                  <div className={Styles["medias-container"]}>
                    <FacebookShareButton
                      url={
                        process.env.NEXT_PUBLIC_WEB_URL +
                        "/product/" +
                        product.product_id
                      }
                      hashtag={"#techwave"}
                      description={"techwave"}
                    >
                      <FacebookIcon size={32} style={{ borderRadius: "5px" }} />
                    </FacebookShareButton>

                    <TwitterShareButton
                      title={"techwave"}
                      url={
                        process.env.NEXT_PUBLIC_WEB_URL +
                        "/product/" +
                        product.product_id
                      }
                      hashtag={"#techwave"}
                    >
                      <TwitterIcon size={32} style={{ borderRadius: "5px" }} />
                    </TwitterShareButton>
                  </div>
                </div>
              </div>
            )}
            {/* <div className={Styles["product-info-container"]}>
            <span className={Styles["product-name"]}>MẪU MÁY TÍNH 10</span>
            <div className={Styles["product-rating-container"]}>
              <Rating name="read-only" value={5} readOnly />
              <span>5.0/5</span>
              <Link href={"#danhGia"} style={{ color: "var(--header-bg-top)" }}>
                (1 đánh giá)
              </Link>
              |<span>0 đã bán</span>
            </div>
            <span className={Styles["row-container"]}>
              Trạng thái: Hết hàng
            </span>
            <span className={Styles["row-container"]}>Số lượt xem: 4</span>
            <div className={Styles["product-price-container"]}>
              <span>Giá bán:</span>
              <span style={{ color: "red" }}>669.000 đ</span>
            </div>
            <div className={Styles["product-promoprice-container"]}>
              <span>Giá bán:</span>
              <span style={{ textDecoration: "line-through" }}>
                1.049.000 đ
              </span>
            </div>
            <div className={Styles["product-cate-container"]}>
              <span className={Styles["option-title-container"]}>
                CPU/RAM/Ổ CỨNG
              </span>
              <div className={Styles["option-cards-container"]}>
                <span className={Styles["option-card"]}>
                  Core I5/16GB/128G-669.000đ
                </span>
                <span className={Styles["option-card"]}>
                  Core I5/16GB/128G-669.000đ
                </span>
                <span className={Styles["option-card"]}>
                  Core I5/16GB/128G-669.000đ
                </span>
                <span className={Styles["option-card"]}>
                  Core I5/16GB/128G-669.000đ
                </span>
              </div>
            </div>
            <div className={Styles["product-quantity-button-container"]}>
              <InputNumber
                className={Styles["input-quantity"]}
                defaultValue={1}
              />
            </div>
            <div className={Styles["product-contact-button-container"]}>
              <button className={Styles["button-top"]}>
                <span>Chat Zalo</span>
                <span>0123.456.789</span>
              </button>
              <button
                className={Styles["button-top"]}
                style={{ backgroundColor: "#f88e20" }}
              >
                <span>Gọi ngay</span>
                <span>0123.456.789</span>
              </button>
              <button className={Styles["button-bottom"]}>
                <span>Mua ngay</span>
                <span>Giao hàng COD Miễn Phí Toàn Quốc</span>
              </button>
            </div>
            <div className={Styles["product-desc-container"]}>
              Tính năng HMB (Bộ nhớ máy chủ) sử dụng DMA (Truy cập bộ nhớ trực
              tiếp) của PCI Express để cho phép SSD sử dụng một số DRAM trên hệ
              thống PC, thay vì yêu cầu SSD phải mang DRAM riêng.
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
          </div> */}
            <div className={Styles["product-more-info-container"]}>
              <span>Chi Tiết Sản Phẩm - Cam Kết</span>
              <div className={Styles["product-deal-container"]}>
                <div className={Styles["product-deal-icon-wrapper"]}>
                  <AttachMoneyIcon fontSize="20px" />
                </div>
                <div className={Styles["product-deal-content-container"]}>
                  <strong>GIÁ TỐT NHẤT</strong>
                  <span>Cam kết giá tốt nhất cho Khách hàng</span>
                </div>
              </div>
              <div className={Styles["product-deal-container"]}>
                <div className={Styles["product-deal-icon-wrapper"]}>
                  <WorkspacePremiumIcon fontSize="20px" />
                </div>
                <div className={Styles["product-deal-content-container"]}>
                  <strong>BẢO HÀNH</strong>
                  <span>Cam kết bảo hành chính hãng</span>
                </div>
              </div>
              <div className={Styles["product-deal-container"]}>
                <div className={Styles["product-deal-icon-wrapper"]}>
                  <ChangeCircleIcon fontSize="20px" />
                </div>
                <div className={Styles["product-deal-content-container"]}>
                  <strong>CHÍNH SÁCH ĐỔI TRẢ</strong>
                  <span>Đổi trả dễ dàng những Sản phẩm bị lỗi</span>
                </div>
              </div>
              <div className={Styles["product-deal-container"]}>
                <div className={Styles["product-deal-icon-wrapper"]}>
                  <LocalShippingIcon fontSize="20px" />
                </div>
                <div className={Styles["product-deal-content-container"]}>
                  <strong>GIAO HÀNG ĐẢM BẢO</strong>
                  <span>Giao hàng tại nhà</span>
                </div>
              </div>
              <div className={Styles["showroom-container"]}>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "400",
                  }}
                >
                  SHOWROOM
                </span>
                <div className={Styles["showroom-row-wrapper"]}>
                  <FmdGoodOutlinedIcon />
                  <span>
                    Địa chỉ: 473/8B Lê Văn Quới, Bình Trị Đông A, Quận Bình Tân,
                    TPHCM
                  </span>
                </div>
                <div className={Styles["showroom-row-wrapper"]}>
                  <LocalPhoneOutlinedIcon />
                  <span>Hotline: 0919.999.999</span>
                </div>
                <div className={Styles["showroom-row-wrapper"]}>
                  <HeadsetMicOutlinedIcon />
                  <span>Hotline Kỹ Thuật: 0919.999.789</span>
                </div>

                <div className={Styles["showroom-row-wrapper"]}>
                  <DraftsOutlinedIcon />
                  <span>Email: email@gmail.com</span>
                </div>
                <div className={Styles["showroom-row-wrapper"]}>
                  <InsertLinkOutlinedIcon />
                  <span>Website: www.abcss.vn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProductDetail;

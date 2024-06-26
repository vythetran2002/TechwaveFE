import React from "react";
import Styles from "./styles.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { Button } from "antd";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileDownloadDoneOutlinedIcon from "@mui/icons-material/FileDownloadDoneOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Empty } from "antd";
import { useRouter } from "next/router";
import { HandleReceiveOrder } from "@/api/user/handleReceiveOrder";
import OrderItem from "../vendor/order/OrderItem";
import { HandleCancleOrder } from "@/api/user/handleCancleOrder";
import Link from "next/link";
import { animateScroll as scroll } from "react-scroll";
import { FormatPrice } from "@/assets/utils/PriceFormat";
import dayjs from "dayjs";
import { Card, Col, Row, Divider } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChildItem from "./ChildItem/ChildItem";

function PurchaseItemCard(props) {
  const router = useRouter();
  const { card, status } = props;

  console.log("card", card);

  const handleClickPay = (value) => {
    router.push(value);
  };

  const handleGoToComment = () => {
    router.push({
      pathname: "/product/" + card.cart.product.product_id,
      query: {
        nav: "danhGia",
      },
    });
  };

  const handleReceive = () => {
    const message = HandleReceiveOrder(card.bill_id, props.token);
    console.log(message);
    router.push("/user/account/received");
  };

  const handleCancle = async () => {
    console.log("askldjlsakjdlksa");
    const message = await HandleCancleOrder(card.bill_id, props.token);
    await props.handleMutateCancleOrder();
  };

  if (card?.payment_id) {
    return (
      <>
        {/* <div className={Styles["purchase-item-container"]}>
          {oderItem.status === 0 && (
            <div className={Styles["item-status-container"]}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={images.vnpay}
                  width={30}
                  height={20}
                  alt=""
                  priority
                />
                {oderItem.payment_id.status == 0 && (
                  <Button
                    onClick={() => {
                      handleClickPay(oderItem.payment_id.url);
                    }}
                    type="primary"
                    danger
                  >
                    Thanh toán ngay
                  </Button>
                )}
                {oderItem.payment_id.status == 1 && (
                  <Button style={{ cursor: "default" }}>Đã thanh toán</Button>
                )}
                <Button type="primary" danger onClick={handleCancle}>
                  Huỷ đơn hàng
                </Button>
              </div>

              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <MoreHorizOutlinedIcon />
                </span>
                {oderItem.payment_id.status == 0 && (
                  <span style={{ marginLeft: "10px" }}>
                    Đơn hàng chưa được thanh toán
                  </span>
                )}
                {oderItem.payment_id.status == 1 && (
                  <span style={{ marginLeft: "10px" }}>
                    Đơn hàng đang chờ xác nhận
                  </span>
                )}
              </div>
            </div>
          )}
          {oderItem.status === 1 && (
            <div className={Styles["item-status-container"]}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <img
                  src={images.vnpay}
                  width={30}
                  height={20}
                  alt=""
                  priority
                />
                {oderItem.payment_id.status === 1 && (
                  <Button disabled>Đã thanh toán</Button>
                )}
                <Button onClick={handleReceive} type="primary">
                  Đã nhận được hàng
                </Button>
              </div>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <LocalShippingIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang được vận chuyển
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 2 && (
            <div className={Styles["item-status-container"]}>
              <div
                className={Styles["item-status-wrapper"]}
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex" }}>
                  <span className={Styles["item-status-wrapper"]}>
                    <FileDownloadDoneOutlinedIcon />
                  </span>
                  <span style={{ marginLeft: "10px" }}>Đơn hàng đã giao</span>
                  <img
                    style={{ marginLeft: "20px" }}
                    src={images.vnpay}
                    width={25}
                    height={20}
                  />
                </div>
                <div>
                  {oderItem.cart_id && (
                    <Button type="primary" onClick={handleGoToComment}>
                      Đánh giá đơn hàng
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          {oderItem.status === 3 && (
            <div className={Styles["item-status-container"]}>
              <div>
                <img
                  src={images.vnpay}
                  width={25}
                  height={20}
                  alt=""
                  priority
                  style={{ marginLeft: "5px" }}
                />
              </div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đã bị từ chối
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 4 && (
            <div className={Styles["item-status-container"]}>
              <div>
                <img
                  src={images.vnpay}
                  width={25}
                  height={20}
                  alt=""
                  priority
                  style={{ marginLeft: "5px" }}
                />
              </div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã bị huỷ</span>
              </div>
            </div>
          )}
          {oderItem.createAt && (
            <div className={Styles["date-container"]}>
              <span>{dayjs(oderItem.createAt).format("DD/MM/YYYY")}</span>
              <span>Ngày đặt:</span>
            </div>
          )}
          <div className={Styles["item-info-container"]}>
            <div className={Styles["img-name-container"]}>
              <div className={Styles["img-wrapper"]}>
                {oderItem.cart_id &&
                  (oderItem.cart_id.option ? (
                    <>
                      <img
                        width={80}
                        height={80}
                        src={oderItem.cart_id.option.image}
                        alt=""
                        priority={true}
                        className={Styles["img"]}
                      />
                    </>
                  ) : (
                    <>
                      {oderItem.cart_id.product.image ? (
                        <>
                          <img
                            width={80}
                            height={80}
                            src={oderItem.cart_id.product.image}
                            alt=""
                            priority={true}
                            className={Styles["img"]}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={images.nonImg}
                            alt=""
                            priority={true}
                            className={Styles["img"]}
                          />
                        </>
                      )}
                    </>
                  ))}
              </div>
              {oderItem.cart_id && (
                <div className={Styles["name-wrapper"]}>
                  <Link
                    className={Styles["link"]}
                    href={"/product/" + oderItem.cart_id.product.product_id}
                  >
                    {oderItem.cart_id.product.name}
                  </Link>
                  <div className={Styles["cate-quantity-container"]}>
                    {oderItem.cart_id.option ? (
                      <span
                        className={Styles.cate}
                        style={{ fontSize: "14px" }}
                      >
                        Phân loại: {oderItem.cart_id.option.name}
                      </span>
                    ) : (
                      <></>
                    )}
                    <span>x {oderItem.cart_id.quantity}</span>
                  </div>
                </div>
              )}
            </div>
            <div className={Styles["price-container"]}>
              <span>{FormatPrice(oderItem.totalBill)}</span>
            </div>
          </div>
        </div> */}
      </>
    );
  } else if (card)
    return (
      <>
        {/* <div className={Styles["purchase-item-container"]}>
          {oderItem.status === 0 && (
            <div className={Styles["item-status-container"]}>
              <Button type="primary" danger onClick={handleCancle}>
                Huỷ đơn hàng
              </Button>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <MoreHorizOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang chờ xác nhận
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 1 && (
            <div className={Styles["item-status-container"]}>
              <Button onClick={handleReceive} type="primary">
                Đã nhận được hàng
              </Button>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <LocalShippingIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>
                  Đơn hàng đang được vận chuyển
                </span>
              </div>
            </div>
          )}
          {oderItem.status === 2 && (
            <div className={Styles["item-status-container"]}>
              <div className={Styles["item-status-wrapper"]}>
                <span className={Styles["item-status-wrapper"]}>
                  <FileDownloadDoneOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã giao</span>
              </div>
              <div>
                {oderItem.cart_id && (
                  <Button type="primary" onClick={handleGoToComment}>
                    Đánh giá đơn hàng
                  </Button>
                )}
              </div>
            </div>
          )}
          {oderItem.status === 3 && (
            <div className={Styles["item-status-container"]}>
              <div></div>
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đơn hàng đã bị huỷ</span>
              </div>
            </div>
          )}
          {oderItem.status === 4 && (
            <div className={Styles["item-status-container"]}>
              
              <div
                className={Styles["item-status-wrapper"]}
                style={{ color: "black" }}
              >
                <span className={Styles["item-status-wrapper"]}>
                  <CloseOutlinedIcon />
                </span>
                <span style={{ marginLeft: "10px" }}>Đã huỷ đơn hàng</span>
              </div>
            </div>
          )}
          {oderItem.createAt && (
            <div className={Styles["date-container"]}>
              <span>{dayjs(oderItem.createAt).format("DD/MM/YYYY")}</span>
              <span>Ngày đặt:</span>
            </div>
          )}
          <div className={Styles["item-info-container"]}>
            <div className={Styles["img-name-container"]}>
              <div className={Styles["img-wrapper"]}>
                {oderItem.cart_id ? (
                  oderItem.cart_id.option ? (
                    oderItem.cart_id.option.image ? (
                      <>
                        <img
                          width={80}
                          height={80}
                          src={oderItem.cart_id.option.image}
                          alt=""
                          priority={true}
                          className={Styles["img"]}
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={images.nonImg}
                          alt=""
                          priority={true}
                          className={Styles["img"]}
                        />
                      </>
                    )
                  ) : (
                    <>
                      {oderItem.cart_id.product.image ? (
                        <>
                          <img
                            width={80}
                            height={80}
                            src={oderItem.cart_id.product.image}
                            alt=""
                            priority={true}
                            className={Styles["img"]}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            src={images.nonImg}
                            alt=""
                            priority={true}
                            className={Styles["img"]}
                          />
                        </>
                      )}
                    </>
                  )
                ) : (
                  <>
                    <img
                      src={images.nonImg}
                      alt=""
                      priority={true}
                      className={Styles["img"]}
                    />
                  </>
                )}
              </div>
              {oderItem.cart_id && (
                <div className={Styles["name-wrapper"]}>
                  <Link
                    className={Styles["link"]}
                    href={"/product/" + oderItem.cart_id.product.product_id}
                  >
                    {oderItem.cart_id.product.name}
                  </Link>
                  {oderItem.cart_id.product.option && (
                    <span>Phân loại: {props.option.name}</span>
                  )}
                  <span style={{ marginTop: "20px" }}>
                    x {oderItem.cart_id.quantity}
                  </span>
                </div>
              )}
            </div>
            <div className={Styles["price-container"]}>
              <span>{FormatPrice(oderItem.totalBill)}</span>
            </div>
          </div>
        </div> */}
        <Row className={Styles["card-container"]}>
          <Col span={24}>
            <div className={Styles["card-header"]}>
              <div className={Styles["shop-header-container"]}>
                <div className={Styles["header-left-container"]}>
                  <div className={Styles["icon-shop-name-container"]}>
                    <ShopOutlined />
                    <span>{card.shopname}</span>
                  </div>
                  <div className={Styles["chat-btn-container"]}>
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ fontSize: "20px" }}
                    />
                    <span>Chat</span>
                  </div>
                  <div className={Styles["shop-watch-btn"]}>
                    <span>Xem shop</span>
                  </div>
                </div>
                <div className={Styles["header-right-container"]}>
                  {status === 0 && (
                    <div className={Styles["item-status-wrapper"]}>
                      <span className={Styles["item-status-wrapper"]}>
                        <MoreHorizOutlinedIcon />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        Đơn hàng đang chờ xác nhận
                      </span>
                    </div>
                  )}

                  {status === 1 && (
                    <div className={Styles["item-status-wrapper"]}>
                      <span className={Styles["item-status-wrapper"]}>
                        <LocalShippingIcon />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        Đơn hàng đang được vận chuyển
                      </span>
                    </div>
                  )}

                  {status === 2 && (
                    <div className={Styles["item-status-container"]}>
                      <div className={Styles["item-status-wrapper"]}>
                        <span className={Styles["item-status-wrapper"]}>
                          <FileDownloadDoneOutlinedIcon />
                        </span>
                        <span style={{ marginLeft: "10px" }}>
                          Đơn hàng đã giao
                        </span>
                      </div>
                    </div>
                  )}

                  {status === 3 && (
                    <div className={Styles["item-status-wrapper"]}>
                      <span className={Styles["item-status-wrapper"]}>
                        <CloseOutlinedIcon />
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        Đơn hàng đã bị Shop {card.shopname} huỷ
                      </span>
                    </div>
                  )}

                  {status === 4 && (
                    <div className={Styles["item-status-container"]}>
                      <div
                        className={Styles["item-status-wrapper"]}
                        style={{ color: "black" }}
                      >
                        <span className={Styles["item-status-wrapper"]}>
                          <CloseOutlinedIcon />
                        </span>
                        <span
                          style={{ marginLeft: "10px" }}
                          onClick={handleCancle}
                        >
                          Đã huỷ đơn hàng
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={Styles["card-body"]}>
              {card?.shop_bill_id.length != 0 ? (
                card?.shop_bill_id.map((cart, index) => {
                  return (
                    <React.Fragment key={cart.cart.cart_id}>
                      <ChildItem data={cart} />
                    </React.Fragment>
                  );
                })
              ) : (
                <>
                  <Empty />
                </>
              )}
              {/* <ChildItem />
              <ChildItem /> */}
            </div>
            <div className={Styles["card-footer"]}>
              <div className={Styles["total-container"]}>
                <div className={Styles["date-total-container"]}>
                  <div className={Styles["date-wrapper"]}>
                    <span>Ngày mua:</span>
                    <span>{dayjs(card.createAt).format("DD/MM/YYYY")}</span>
                  </div>
                  <div className={Styles["total-wrapper"]}>
                    <span>Thành tiền:</span>
                    <span style={{ color: "#dc2626" }}>
                      {FormatPrice(card.totalBill)}
                    </span>
                  </div>
                </div>
              </div>
              <div className={Styles["total-container"]}>
                {status === 0 && (
                  <>
                    <Button
                      type="primary"
                      danger
                      size={"large"}
                      onClick={handleCancle}
                    >
                      Huỷ đơn hàng
                    </Button>
                  </>
                )}
                {status === 1 && (
                  <>
                    <Button
                      type="primary"
                      size={"large"}
                      onClick={handleReceive}
                    >
                      Đã nhận được hàng
                    </Button>
                  </>
                )}

                {status === 2 && (
                  <Button
                    type="primary"
                    size={"large"}
                    onClick={handleGoToComment}
                  >
                    Đánh giá đơn hàng
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </>
    );
}

export default PurchaseItemCard;

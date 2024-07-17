import React from "react";
import Styles from "./styles.module.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { Button, Tooltip } from "antd";
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
  const { card, status, handleMutateCancleOrder } = props;

  // console.log("CARRRRDD", card);

  const handleClickPay = (value) => {
    router.push(value);
  };

  const handleGoToComment = () => {
    router.push({
      pathname: "/product/" + card.cart_shop[0].cart.product.product_id,
      query: {
        nav: "danhGia",
      },
    });
  };

  const handleReceive = async () => {
    const message = await HandleReceiveOrder(card.shop_bill_id, props.token);
    //console.log(message);
    router.push("/user/account/received");
  };

  const handleReceiveVnPay = async () => {
    const message = await HandleReceiveOrder(card.shop_bill_id, props.token);
    // console.log(message);
    router.push("/user/account/received");
  };

  const handleCancle = async () => {
    const message = await HandleCancleOrder(card.shop_bill_id, props.token);
    handleMutateCancleOrder();
  };

  if (card?.payment_id) {
    return (
      <>
        <Row className={Styles["card-container"]}>
          <Col span={24}>
            <div className={Styles["card-header"]}>
              <div className={Styles["shop-header-container"]}>
                <div className={Styles["header-left-container"]}>
                  <div className={Styles["icon-shop-name-container"]}>
                    <ShopOutlined />
                    <span>{card.shopname}</span>
                  </div>
                  {card.payment_id.status === 0 ? (
                    <>
                      {status === 3 ? (
                        <>
                          <div className={Styles["chat-btn-container"]}>
                            <span>Đã chưa thanh toán</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <Tooltip title="Thanh toán ngay">
                            <div
                              className={Styles["chat-btn-container"]}
                              onClick={() => {
                                handleClickPay(card.payment_id.url);
                              }}
                            >
                              <span>Chưa thanh toán</span>
                            </div>
                          </Tooltip>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <div className={Styles["shop-watch-btn"]}>
                        <span>Đã thanh toán</span>
                      </div>
                    </>
                  )}
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
                        {props.isShopReject ? (
                          <CloseOutlinedIcon style={{ color: "red" }} />
                        ) : (
                          <CloseOutlinedIcon />
                        )}
                      </span>
                      {props.isShopReject ? (
                        <span style={{ marginLeft: "10px", color: "red" }}>
                          Đơn hàng đã bị Shop {card.shopname} huỷ
                        </span>
                      ) : (
                        <span style={{ marginLeft: "10px" }}>
                          Bạn đã huỷ đơn hàng của Shop {card.shopname}
                        </span>
                      )}
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
              {card?.cart_shop.length != 0 ? (
                card?.cart_shop.map((cart, index) => {
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
                  <div className={Styles["total-bill-container"]}>
                    {card?.shipFee && (
                      <>
                        <div className={Styles["total-wrapper"]}>
                          <span>Phí vận chuyển:</span>
                          <span style={{ color: "#dc2626" }}>
                            {FormatPrice(card?.shipFee)}
                          </span>
                        </div>
                      </>
                    )}

                    {card?.totalVoucherDiscount && (
                      <>
                        <div className={Styles["total-wrapper"]}>
                          <span>Tổng khuyến mãi:</span>
                          <span style={{ color: "#dc2626" }}>
                            - {FormatPrice(card?.totalVoucherDiscount)}
                          </span>
                        </div>
                      </>
                    )}
                    <div className={Styles["total-wrapper"]}>
                      <span>Thành tiền:</span>
                      <span style={{ color: "#dc2626" }}>
                        {FormatPrice(card.totalBill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["total-container"]}>
                <div className={Styles["payment-method-container"]}>
                  {card.payment == "VNPay" ? (
                    <>
                      <Image
                        width={35}
                        height={25}
                        src={images.vnpay}
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      <div style={{ fontSize: "15px" }}>
                        Thanh toán qua VNPay
                      </div>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ width: "25px", height: "25px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>

                      <div style={{ fontSize: "15px" }}>
                        Thanh toán khi nhận hàng
                      </div>
                    </>
                  )}
                </div>
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
                      onClick={handleReceiveVnPay}
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
  } else if (card)
    return (
      <>
        <Row className={Styles["card-container"]}>
          <Col span={24}>
            <div className={Styles["card-header"]}>
              <div className={Styles["shop-header-container"]}>
                <div className={Styles["header-left-container"]}>
                  <div className={Styles["icon-shop-name-container"]}>
                    <ShopOutlined />
                    <span>{card.shopname}</span>
                  </div>
                  {/* <div className={Styles["chat-btn-container"]}>
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ fontSize: "20px" }}
                    />
                    <span>Chat</span>
                  </div> */}
                  {/* <div className={Styles["shop-watch-btn"]}>
                    <span>Xem shop</span>
                  </div> */}
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
                        {props.isShopReject ? (
                          <CloseOutlinedIcon style={{ color: "red" }} />
                        ) : (
                          <CloseOutlinedIcon />
                        )}
                      </span>
                      {props.isShopReject ? (
                        <span style={{ marginLeft: "10px", color: "red" }}>
                          Đơn hàng đã bị Shop {card.shopname} huỷ
                        </span>
                      ) : (
                        <span style={{ marginLeft: "10px" }}>
                          Bạn đã huỷ đơn hàng của Shop {card.shopname}
                        </span>
                      )}
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
              {card?.cart_shop.length != 0 ? (
                card?.cart_shop.map((cart, index) => {
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
                  <div className={Styles["total-bill-container"]}>
                    {card?.shipFee && (
                      <>
                        <div className={Styles["total-wrapper"]}>
                          <span>Phí vận chuyển:</span>
                          <span style={{ color: "#dc2626" }}>
                            {FormatPrice(card?.shipFee)}
                          </span>
                        </div>
                      </>
                    )}

                    {card?.totalVoucherDiscount != 0 && (
                      <>
                        <div className={Styles["total-wrapper"]}>
                          <span>Tổng khuyến mãi:</span>
                          <span style={{ color: "#dc2626" }}>
                            - {FormatPrice(card?.totalVoucherDiscount)}
                          </span>
                        </div>
                      </>
                    )}

                    <div className={Styles["total-wrapper"]}>
                      <span>Thành tiền:</span>
                      <span style={{ color: "#dc2626" }}>
                        {FormatPrice(card.totalBill)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={Styles["total-container"]}>
                <div className={Styles["payment-method-container"]}>
                  {card.payment == "VNPay" ? (
                    <>
                      <Image
                        width={20}
                        height={20}
                        src={
                          "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png"
                        }
                      />
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                        style={{ width: "25px", height: "25px" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                        />
                      </svg>

                      <div style={{ fontSize: "15px" }}>
                        Thanh toán khi nhận hàng
                      </div>
                    </>
                  )}
                </div>
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

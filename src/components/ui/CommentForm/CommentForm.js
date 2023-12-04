import React, { useEffect, useRef } from "react";
import Styles from "./CommentForm.module.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import MailOutlineOutlined from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import Button from "@mui/material/Button";
import e from "cors";
import Empty from "antd/lib/empty";
import Image from "next/image";
import images from "@/assets/images";
import dayjs from "dayjs";
import { Divider } from "@mui/joy";
import { PostComment } from "@/api/user/PostComment";

const { TextArea } = Input;

function CommentForm(props) {
  const { review, productId, token, updateId, handleOpenDialog } = props;
  const [value, setValue] = useState(null);
  const [cmt, setCmt] = useState("");
  const messageRef = useRef();

  // console.log(review);

  const handleChaneCmt = (e) => {
    setCmt(e.target.value);
  };

  const ResetCmt = () => {
    setCmt("");
  };

  const handleClickProfile = (value) => {
    updateId(value);
    handleOpenDialog();
  };

  const handleSubmit = () => {
    if (value == null || cmt == "") {
      messageRef.current.style.display = "block";
    } else {
      messageRef.current.style.display = "none";
      let temp = {
        content: cmt,
        rating: value,
        product_id: productId,
        picture: null,
      };
      const message = PostComment(temp, token);
      console.log(message);
      window.location.reload();
    }
  };

  return (
    <div className={Styles["comment-form-container"]}>
      <div className={Styles["comment-form-wrapper"]}>
        <div className={Styles["review-container"]}>
          {review.length != 0 ? (
            review.map((review, index) => {
              return (
                <React.Fragment key={"review" + index}>
                  <div className={Styles["user-review-container"]}>
                    <div className={Styles["user-review-wrapper"]}>
                      {review.account.avatar != null ? (
                        <>
                          <Image
                            // onClick={handleClickProfile(
                            //   review.account.account_id
                            // )}
                            onClick={() => {
                              handleClickProfile(review.account.account_id);
                            }}
                            src={review.account.avatar}
                            width={100}
                            height={100}
                            alt=""
                            style={{ borderRadius: "50%", cursor: "pointer" }}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            onClick={() => {
                              handleClickProfile(review.account.account_id);
                            }}
                            src={images.nonAvatar}
                            width={100}
                            height={100}
                            alt=""
                            style={{ borderRadius: "50%", cursor: "pointer" }}
                          />
                        </>
                      )}
                      <div className={Styles["user-info-wrapper"]}>
                        <div
                          style={{ fontSize: "16px", cursor: "pointer" }}
                          // onClick={handleClickProfile(
                          //   review.account.account_id
                          // )}
                          onClick={() => {
                            handleClickProfile(review.account.account_id);
                          }}
                        >
                          {review.account.username}
                        </div>
                        <span>
                          <Rating
                            name="simple-controlled"
                            value={review.rating}
                            readOnly
                          />
                        </span>
                        <span style={{ fontSize: "14px", color: "#757575" }}>
                          {dayjs(review.createAt).format("DD/MM/YYYY")}
                        </span>
                        <span style={{ marginTop: "20px" }}>
                          {review.content}
                        </span>
                      </div>
                    </div>
                    <div className={Styles["vendor-review-container"]}>
                      {review.responses.length != 0 ? (
                        review.responses.map((response, index) => {
                          return (
                            <React.Fragment key={"response" + index}>
                              <div className={Styles["vendor-cmt-card"]}>
                                <div
                                  className={Styles["vendor-review-wrapper"]}
                                >
                                  {response.createBy.avatar != null ? (
                                    <>
                                      <Image
                                        src={response.createBy.avatar}
                                        width={50}
                                        height={50}
                                        alt=""
                                        style={{ borderRadius: "50%" }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Image
                                        src={images.nonAvatar}
                                        width={100}
                                        height={100}
                                        alt=""
                                      />
                                    </>
                                  )}
                                  <div
                                    className={Styles["vendor-info-wrapper"]}
                                  >
                                    <span style={{ fontSize: "13px" }}>
                                      {response.createBy.username}
                                    </span>
                                    <span style={{ fontSize: "13px" }}>
                                      {response.content}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <Divider />
                </React.Fragment>
              );
            })
          ) : (
            <>
              <Empty />
            </>
          )}
        </div>
        <div className={Styles["form-wrapper"]}>
          <div className={Styles["rate-container"]}>
            <span>Đánh giá của bạn</span>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <div className={Styles["input-container"]}>
            {/* <div className={Styles["col"]}>
              <div className={Styles["row"]}>
                <Input
                  placeholder="Vui lòng nhập họ tên"
                  prefix={
                    <PersonOutlineOutlinedIcon className="site-form-item-icon" />
                  }
                  suffix={
                    <Tooltip title="neccesary information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <div className={Styles["row"]}>
                <Input
                  placeholder="Vui lòng nhập email"
                  prefix={
                    <MailOutlineOutlined
                      className="site-form-item-icon"
                      style={{ fontSize: "20px" }}
                    />
                  }
                  suffix={
                    <Tooltip title="neccesary information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </div>
              <div className={Styles["row"]}>
                <Input
                  placeholder="Vui lòng nhập số điện thoại"
                  prefix={<PhoneOutlinedIcon className="site-form-item-icon" />}
                  suffix={
                    <Tooltip title="neccesary information">
                      <InfoCircleOutlined
                        style={{ color: "rgba(0,0,0,.45)" }}
                      />
                    </Tooltip>
                  }
                />
              </div>
            </div> */}
            <div className={Styles["col"]}>
              <div className={Styles["row"]}>
                <TextArea
                  value={cmt}
                  showCount
                  maxLength={100}
                  onChange={handleChaneCmt}
                  placeholder="Vui lòng nhập bình luận"
                  style={{ height: 120, resize: "none" }}
                ></TextArea>
              </div>
            </div>
          </div>
          <span className={Styles["message"]} ref={messageRef}>
            Vui lòng nhập đầy đủ thông tin
          </span>
          <div className={Styles["submit-container"]}>
            <Button className={Styles["send-button"]} onClick={handleSubmit}>
              Gửi bình luận
            </Button>
            <Button className={Styles["reset-button"]} onClick={ResetCmt}>
              Nhập lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentForm;

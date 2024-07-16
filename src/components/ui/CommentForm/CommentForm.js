import React, { useEffect, useRef } from "react";
import Styles from "./CommentForm.module.css";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { Input, Typography } from "antd";
import MailOutlineOutlined from "@mui/icons-material/MailOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { Button, Flex } from "antd";
import e from "cors";
import Empty from "antd/lib/empty";
import Image from "next/image";
import { Image as AntImage } from "antd";
import images from "@/assets/images";
import dayjs from "dayjs";
import { Divider } from "@mui/joy";
import { PostComment } from "@/api/user/PostComment";
import { uploadImage } from "@/components/utils/Upload";
import toast from "react-hot-toast";

const { TextArea } = Input;

function CommentForm(props) {
  const {
    status,
    review,
    productId,
    token,
    updateId,
    handleOpenDialog,
    mutate,
  } = props;
  const [value, setValue] = useState(null);
  const [cmt, setCmt] = useState("");
  const [avatarSrc, setAvatarSrc] = useState();
  const messageRef = useRef();

  // console.log(review);

  //Refs
  const inputRef = useRef();

  const handleChaneCmt = (e) => {
    setCmt(e.target.value);
  };

  const ResetCmt = () => {
    setCmt("");
    setAvatarSrc(null);
  };

  const handleDeleteImage = () => {
    setAvatarSrc(null);
    toast.success("Xoá ảnh thành công");
  };

  const onClickImgUpload = () => {
    inputRef.current.click();
  };

  // function handleFileUpload(event) {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   const message = uploadImage(file);
  //   const promiseResult = message;
  //   promiseResult
  //     .then((result) => {
  //       const imagePath = result.imagePath;
  //       console.log("imagePath:", imagePath);
  //       setAvatarSrc(imagePath);
  //       // let temp = { ...userProfile, avatar: imagePath };
  //       // setUserProfile(temp);
  //     })
  //     .catch((error) => {
  //       console.error("Lỗi:", error);
  //     });
  // }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    // console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        //console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
  }
  const handleClickProfile = (value) => {
    updateId(value);
    handleOpenDialog();
  };

  const handleSubmit = async () => {
    if (value == null || cmt == "") {
      messageRef.current.style.display = "block";
    } else {
      messageRef.current.style.display = "none";
      let temp = {
        content: cmt,
        rating: value,
        product_id: productId,
        picture: avatarSrc,
      };
      //const message = PostComment(temp, token);
      const message = PostComment(temp, token);
      const promiseResult = message;
      toast.promise(promiseResult, {
        loading: "Loading ...",
        success: (result) => {
          return "Bình luận thành công";
        },
        error: "Something went wrong!",
      });
      mutate();
      setValue(null);
      setCmt("");
      setAvatarSrc(null);
      // console.log(message);
      // window.location.reload();
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
                        <span style={{ marginTop: "20px" }}>
                          {review.picture && (
                            <AntImage
                              style={{ borderRadius: "5px" }}
                              src={review.picture}
                              alt=""
                              width={200}
                              height={200}
                            />
                          )}
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
                                        onClick={() => {
                                          handleClickProfile(
                                            response.createBy.account_id
                                          );
                                        }}
                                        src={response.createBy.avatar}
                                        width={50}
                                        height={50}
                                        alt=""
                                        style={{
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <Image
                                        onClick={() => {
                                          handleClickProfile(
                                            response.createBy.account_id
                                          );
                                        }}
                                        src={images.nonAvatar}
                                        width={100}
                                        height={100}
                                        alt=""
                                        style={{
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                        }}
                                      />
                                    </>
                                  )}
                                  <div
                                    className={Styles["vendor-info-wrapper"]}
                                    style={{ gap: "20px" }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "15px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                      }}
                                    >
                                      <span>{response.createBy.username}</span>
                                      {response.createAt && (
                                        <span style={{ color: "#757575" }}>
                                          {dayjs(response.createAt).format(
                                            "DD/MM/YYYY"
                                          )}
                                        </span>
                                      )}
                                    </div>

                                    <span style={{ fontSize: "15px" }}>
                                      {response.content}
                                    </span>
                                    <div
                                      style={{
                                        fontSize: "15px",
                                        marginTop: "10px",
                                      }}
                                    >
                                      {response.picture && (
                                        <Image
                                          height={200}
                                          width={200}
                                          src={response.picture}
                                          priority
                                          alt=""
                                          style={{ borderRadius: "5px" }}
                                        />
                                      )}
                                    </div>
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
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                imageStyle={{
                  height: 60,
                }}
                description={
                  <Typography.Text style={{ opacity: "0.7" }}>
                    Sản phẩm chưa có đánh giá
                  </Typography.Text>
                }
              ></Empty>
            </>
          )}
        </div>
        {status == true && (
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
            <div className={Styles["img-input-container"]}>
              <input
                onChange={handleFileUpload}
                accept=".jpg, .jpeg, .png"
                type="file"
                style={{
                  backgroundColor: "transparent",
                  // color: "black",
                  fontSize: "15px",
                  marginTop: "10px",
                  padding: "0",
                  borderRadius: "0%",
                  color: "rgba(241, 241, 241, 0.48)",
                  display: "none",
                }}
                ref={inputRef}
              />
              <div></div>
              <button className={Styles["button"]} onClick={onClickImgUpload}>
                {/* <svg
                  className={Styles["svg"]}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg> */}
                ADD IMAGE
              </button>
              {avatarSrc && (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginBottom: "20px",
                    gap: "20px",
                  }}
                >
                  <Image
                    style={{ borderRadius: "5px" }}
                    src={avatarSrc}
                    width={150}
                    height={150}
                    alt=""
                  />
                  <Button
                    onClick={handleDeleteImage}
                    type="primary"
                    danger
                    style={{
                      width: "9%",
                    }}
                  >
                    Xoá ảnh
                  </Button>
                </div>
              )}
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
              <Button type="primary" onClick={handleSubmit}>
                Gửi bình luận
              </Button>
              <Button onClick={ResetCmt}>Nhập lại</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentForm;

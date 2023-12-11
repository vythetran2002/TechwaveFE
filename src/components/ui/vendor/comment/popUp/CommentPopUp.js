import React, { useEffect, useRef, useState } from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import useFetchDetailComment from "@/api/vendor/useFetchDetailComment";
import Image from "next/image";
import images from "@/assets/images";
import Rating from "@mui/material/Rating";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/joy/CircularProgress";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import { ResponseComment } from "@/api/vendor/ResponseComment";
import { message, Empty } from "antd";
import { uploadImage } from "@/components/utils/Upload";
import toast from "react-hot-toast";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function CommentPopUp(props) {
  const { id, token } = props;

  const [response, setResponse] = useState();
  const [imgSrc, setImgSrc] = useState(null);

  //Refs
  const inputRef = useRef();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const upadateResponse = (e) => {
    setResponse(e.target.value);
  };

  const handleDeleteImg = () => {
    setImgSrc(null);
    toast.success("Deleted image");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = {
      content: response,
      picture: imgSrc,
      review_id: id,
    };
    const message = ResponseComment(temp, token);
    console.log(message);
    props.handleClose();
  };

  const onClickImgUpload = () => {
    inputRef.current.click();
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    promiseResult
      .then((result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setImgSrc(imagePath);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  //   useEffect(() => {
  //     console.log(response);
  //   }, [response]);

  const cmt = useFetchDetailComment(id, token);

  if (cmt.isLoading) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      </>
    );
  }
  if (cmt.data) {
    return (
      <>
        <div className={roboto.className}>
          <div className={Styles["comment-container"]}>
            <div className={Styles["user-cmt-info-container"]}>
              {cmt.data.account.avatar != null ? (
                <>
                  <Image
                    src={cmt.data.account.avatar}
                    alt=""
                    width={100}
                    height={100}
                    style={{
                      borderRadius: "50%",
                    }}
                  />
                </>
              ) : (
                <Image src={images.nonAvatar} alt="" width={100} height={100} />
              )}
              <div className={Styles["user-info-container"]}>
                <span>{cmt.data.account.username}</span>
                <div>
                  <span className={Styles["user-rate-date-container"]}>
                    <Rating
                      name="half-rating-read"
                      defaultValue={cmt.data.rating}
                      precision={0.5}
                      readOnly
                    />
                    <span>{dayjs(cmt.data.createAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className={Styles["user-cmt-info-content"]}>
              <span>{cmt.data.content}</span>
              <div className={Styles["user-img-cmt-container"]}>
                {cmt.data.picture ? (
                  <Image
                    src={cmt.data.picture}
                    width={150}
                    height={150}
                    alt=""
                    priority
                    style={{ borderRadius: "5px" }}
                  />
                ) : (
                  <>{/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}</>
                )}
              </div>
            </div>
            {props.status == 0 && (
              <>
                <div
                  className={Styles["user-cmt-info-content"]}
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{ background: "white", display: "none" }}
                    type="file"
                    ref={inputRef}
                    onChange={handleFileUpload}
                    accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                  />
                  <button
                    className={Styles["button"]}
                    onClick={onClickImgUpload}
                  >
                    <svg
                      className={Styles["svg"]}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                        stroke="#fffffff"
                        stroke-width="2"
                      ></path>
                      <path
                        d="M17 15V18M17 21V18M17 18H14M17 18H20"
                        stroke="#fffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    ADD IMAGE
                  </button>
                  {imgSrc && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <Image
                        src={imgSrc}
                        width={200}
                        height={200}
                        alt=""
                        priority
                        style={{ borderRadius: "5px" }}
                      />{" "}
                      <Button
                        onClick={handleDeleteImg}
                        style={{ background: "red" }}
                      >
                        Xoá ảnh
                      </Button>
                    </div>
                  )}
                </div>
                <div className={Styles["response-container"]}>
                  <span>Phản hồi</span>
                  <Textarea
                    placeholder="Nhập phản hồi"
                    size="lg"
                    onChange={upadateResponse}
                  />
                  <Button
                    color="primary"
                    disabled={false}
                    onClick={handleSubmit}
                    size="sm"
                    variant="solid"
                    style={{ width: "100px", marginTop: "10px" }}
                  >
                    Gửi
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else return <>ERROR</>;
}

export default CommentPopUp;

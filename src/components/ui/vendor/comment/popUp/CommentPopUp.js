import React, { useEffect, useState } from "react";
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
import { message } from "antd";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function CommentPopUp(props) {
  const { id, token } = props;

  const [response, setResponse] = useState();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const upadateResponse = (e) => {
    setResponse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let temp = {
      content: response,
      picture: null,
      review_id: id,
    };
    const message = ResponseComment(temp, token);
    console.log(message);
  };

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
              {cmt.data.content}
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
          </div>
        </div>
      </>
    );
  } else return <>ERROR</>;
}

export default CommentPopUp;

import React from "react";
import useFetchDetailReviewAdmin from "@/api/admin/useFetchDetailReviewAdmin";
import { Roboto } from "next/font/google";
import Styles from "./styles.module.css";
import { Rating } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import images from "@/assets/images";
import { Button } from "antd";
import { DeleteComment } from "@/api/admin/DeleteComment";
import { DeleteVendorComment } from "@/api/admin/DeleteVendorComment";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function CommentPopup(props) {
  const { id, token } = props;

  // console.log(id);

  const cmt = useFetchDetailReviewAdmin(id);
  const handleMutate = () => {
    cmt.mutate();
  };
  // console.log(cmt);
  // console.log(id);

  const handleClickDeleteVendorCmt = async () => {
    // console.log(cmt.data.responses[0].response_id);
    const message = await DeleteComment(
      cmt.data.responses[0].response_id,
      token
    );
    // console.log(message);
    await handleMutate();
    // props.handleCloseDialog();
  };

  if (cmt.isLoading) {
    return <>Loading</>;
  }
  if (cmt.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={roboto.className}>
          <div className={Styles["comment-container"]}>
            <div className={Styles["user-cmt-info-content"]}>
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
                  <Image
                    src={images.nonAvatar}
                    alt=""
                    width={100}
                    height={100}
                  />
                )}
                <div className={Styles["user-info-container"]}>
                  <div className={Styles["info-del-btn-container"]}>
                    <div>
                      <span>{cmt.data.account.username}</span>
                      <div>
                        <span className={Styles["user-rate-date-container"]}>
                          <Rating
                            name="half-rating-read"
                            defaultValue={cmt.data.rating}
                            precision={0.5}
                            readOnly
                          />
                          <span>
                            {dayjs(cmt.data.createAt).format("DD/MM/YYYY")}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: "400" }}>{cmt.data.content}</span>
                </div>
              </div>
              <div className={Styles["content-img-container"]}>
                <div>
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
            </div>
            {cmt.data.responses.length != 0 && (
              <div className={Styles["vendor-cmt-info-content"]}>
                <div className={Styles["vendor-cmt-info-container"]}>
                  {cmt.data.responses[0].createBy.avatar != null ? (
                    <>
                      <Image
                        src={cmt.data.responses[0].createBy.avatar}
                        alt=""
                        width={100}
                        height={100}
                        style={{
                          borderRadius: "50%",
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </>
                  ) : (
                    <Image
                      src={images.nonAvatar}
                      alt=""
                      width={100}
                      height={100}
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  )}
                  <div className={Styles["user-info-container"]}>
                    <div className={Styles["info-del-btn-container"]}>
                      <div>
                        <span>{cmt.data.responses[0].createBy.username}</span>
                        <div>
                          <span className={Styles["user-rate-date-container"]}>
                            <span>
                              {dayjs(cmt.data.responses[0].createAt).format(
                                "DD/MM/YYYY"
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                      <Button
                        type="primary"
                        danger
                        onClick={handleClickDeleteVendorCmt}
                      >
                        Xoá bình luận
                      </Button>
                    </div>
                    <span style={{ fontWeight: "400" }}>
                      {cmt.data.responses[0].content}
                    </span>
                  </div>
                </div>
                <div className={Styles["content-img-container"]}>
                  <div>
                    {cmt.data.responses[0].picture ? (
                      <Image
                        src={cmt.data.responses[0].picture}
                        width={150}
                        height={150}
                        alt=""
                        priority
                        style={{ borderRadius: "5px" }}
                      />
                    ) : (
                      <>
                        {/* <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* <div
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
              <button className={Styles["button"]} onClick={onClickImgUpload}>
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
            </div> */}
            {/* <div className={Styles["response-container"]}>
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
            </div> */}
          </div>
        </div>
      </>
    );
}

export default CommentPopup;

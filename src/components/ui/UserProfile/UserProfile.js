import React, { useEffect, useState } from "react";
import Styles from "./styles.module.css";
import { useRef } from "react";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import useFetchUserProfileById from "@/api/user/useFetchUserProfileById";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import { Tooltip } from "antd";
import { red } from "@mui/material/colors";
import { Input, Button } from "antd";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import { PostReport } from "@/api/user/PostReport";

const { TextArea } = Input;

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const handleRole = (id) => {
  if (id == 1) {
    return <>Admin</>;
  }
  if (id == 2) {
    return <>Vendor</>;
  }
  if (id == 3) {
    return <>User</>;
  }
};

function UserProfile(props) {
  const [isRpMode, setIsRpMode] = useState(false);
  const [text, setText] = useState();
  const [imgSrc, setImgSrc] = useState(null);
  const { id } = props;
  const user = useFetchUserProfileById(id);

  // console.log(user);

  //Refs
  const reportBtnRef = useRef();
  const messageRef = useRef();
  const inputRef = useRef();

  const handleCloseDialog = () => {
    props.handleCloseDialog();
  };

  const onClickUploadBtn = () => {
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

  const deleteImg = () => {
    setImgSrc(null);
    toast.success("Delete image successfully");
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    if (text) {
      messageRef.current.style.display = "none";
      let temp = {
        content: text,
        id_account_report: id,
        picture: imgSrc,
      };
      console.log(temp);
      PostReport(temp, props.token);
      handleCloseDialog();
    } else {
      messageRef.current.style.display = "block";
    }
  };

  if (user.isLoading) {
    return <>Loading</>;
  }
  if (user.isError) {
    return <>Error</>;
  }
  //   console.log(id);
  else
    return (
      <div className={roboto.className}>
        <Toaster />
        <div className={Styles["user-container"]}>
          <div className={Styles["avatar-container"]}>
            {user.data.avatar != null ? (
              <Image
                src={user.data.avatar}
                width={100}
                height={100}
                priority
                alt=""
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Image
                src={images.nonAvatar}
                width={200}
                height={200}
                priority
                alt=""
                style={{ borderRadius: "50%" }}
              />
            )}
            <span className={Styles["name-container"]}>
              {user.data.username}
            </span>
            <Tooltip
              style={{ zIndex: "99999999" }}
              placement="bottom"
              title="Báo cáo tài khoán"
            >
              <div
                onClick={() => setIsRpMode(!isRpMode)}
                className={Styles["report-btn-wrapper"]}
                style={{
                  backgroundColor: isRpMode ? "red" : "white",
                  color: isRpMode ? "white" : "black",
                }}
              >
                <FlagOutlinedIcon />
              </div>
            </Tooltip>
          </div>
          <div className={Styles["info-container"]}>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Họ và tên:
              </span>
              <span className={Styles["col"]}>{user.data.fullname}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Email:
              </span>
              <span className={Styles["col"]}>{user.data.email}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Số điện thoại:
              </span>
              <span className={Styles["col"]}>{user.data.phone}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Giới tính:
              </span>
              <span className={Styles["col"]}>{user.data.gender}</span>
            </div>
            <div className={Styles["row"]}>
              <span
                className={Styles["col"]}
                style={{ flexDirection: "row-reverse" }}
              >
                Địa chỉ
              </span>
              <span className={Styles["col"]}>{user.data.address}</span>
            </div>
          </div>
          {isRpMode && (
            <div className={Styles["info-container"]}>
              <div className={Styles["row"]}>
                <span
                  className={Styles["col"]}
                  style={{ justifyContent: "center" }}
                >
                  <Button onClick={onClickUploadBtn}>Upload image</Button>
                </span>
              </div>
              <div className={Styles["row"]}>
                <div className={Styles["col"]}>
                  <TextArea
                    onChange={onChangeText}
                    rows={4}
                    placeholder="Nội dung báo cáo"
                    showCount
                    maxLength={100}
                  />
                </div>
              </div>

              <div
                className={Styles["row"]}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <input
                  ref={inputRef}
                  accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                  type="file"
                  onChange={handleFileUpload}
                  style={{
                    backgroundColor: "#F5F5F5",
                    color: "#F5F5F5",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "none",
                  }}
                />
              </div>
              <div
                className={Styles["row"]}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {imgSrc && (
                  <>
                    <Image
                      src={imgSrc}
                      width={150}
                      height={150}
                      alt=""
                      priority
                      style={{ borderRadius: "5px" }}
                    />
                    <Button type="primary" danger onClick={deleteImg}>
                      Delete Image
                    </Button>
                  </>
                )}
              </div>
              <span
                className={Styles["row"]}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontWeight: "300",
                  color: "red",
                  display: "none",
                  textAlign: "center",
                }}
                ref={messageRef}
              >
                Vui lòng nhập nội dung báo cáo
              </span>

              <div
                className={Styles["row"]}
                style={{ width: "100%", justifyContent: "center" }}
              >
                <Button
                  type="primary"
                  style={{ width: "100px" }}
                  onClick={onSubmit}
                >
                  Gửi
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}

export default UserProfile;

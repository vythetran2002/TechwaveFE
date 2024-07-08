import React, { useRef, useState } from "react";
import Styles from "./styles.module.css";
import { Roboto } from "next/font/google";
import Image from "next/image";
import images from "@/assets/images";
import { Input, Button, Form } from "antd";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import { PostReport } from "@/api/user/PostReport";
import { UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const { TextArea } = Input;

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function ReportForm(props) {
  const { id, token } = props;
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState();

  //Refs
  const messageRef = useRef();
  const inputRef = useRef();

  const handleCloseDialog = () => {
    props.handlingCloseDialog();
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        //console.log("imagePath:", imagePath);
        setImgSrc(imagePath);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
  }

  const deleteImg = () => {
    setImgSrc(null);
    toast.success("Delete image successfully");
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    if (text) {
      messageRef.current.style.display = "none";
      let temp = {
        content: text,
        id_account_report: id,
        picture: imgSrc,
      };
      const message = await PostReport(temp, token);
      handleCloseDialog();
    } else {
      toast.error("Vui lòng nhập thông tin");
      messageRef.current.style.display = "block";
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={roboto.className}>
      <Toaster />
      <div className={Styles["user-container"]}>
        <div className={Styles["avatar-container"]}>
          <span className={Styles["name-container"]}>Nội dung báo cáo</span>
        </div>
        <div
          className={Styles["info-container"]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className={Styles["row"]}>
            <span
              className={Styles["col"]}
              style={{ flexDirection: "" }}
            ></span>
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
            <Button
              icon={<UploadOutlined />}
              size={30}
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Upload ảnh
            </Button>
            <input
              ref={inputRef}
              accept=".jpg, .jpeg, .png, image/jpeg, image/png"
              type="file"
              onChange={handleFileUpload}
              style={{
                backgroundColor: "#F5F5F5",
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
                <Image src={imgSrc} width={150} height={150} alt="" priority />
                <Button type="primary" danger onClick={deleteImg}>
                  Delete
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
      </div>
    </div>
  );
}

export default ReportForm;

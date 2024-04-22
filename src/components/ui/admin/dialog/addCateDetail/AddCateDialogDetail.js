import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Form, Button } from "antd";
import Image from "next/image";
import images from "@/assets/images";
import { uploadImage } from "@/components/utils/Upload";
import { Toaster } from "react-hot-toast";
import { CreateCategory } from "@/api/admin/CreateCategory";
import { CloudUploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const sxStyle = {
  "& .MuiDialog-container:hover": {
    cursor: "pointer",
  },
  "& .MuiPaper-root": {
    zIndex: "1002",

    cursor: "default",
  },
  "& .MuiTypography-root": {
    padding: "10px 14px 10px 24px",
  },
  "& .MuiDialogActions-root": {
    padding: "24px",
  },
  "&.css-4g2jqn-MuiModal-root-MuiDialog-root": {
    right: 55,
  },
};

export default function AddCateDialogDetail(props) {
  //states
  const [avatarSrc, setAvatarSrc] = useState();

  //Refs
  const messageRef = React.useRef();
  const inputFileRef = React.useRef();

  const [cate, setCate] = useState({
    name: null,
    image: null,
  });

  function handleFileUpload(event) {
    const file = event.target.files[0];
    console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    promiseResult
      .then((result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        let temp = { ...cate, image: imagePath };
        setCate(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkPropertiesNotNull(cate)) {
      let temp = { ...cate, category_parent_id: props.id.slug };
      console.log(temp);
      messageRef.current.style.display = "none";
      const message = CreateCategory(temp, props.token);
      console.log(message);
      // window.location.reload();
    } else {
      messageRef.current.style.display = "block";
    }
  };
  const handleCloseDialog = () => {
    props.handleClose();
    setAvatarSrc(null);
  };

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  const onFinish = async (values) => {
    let final = {
      ...values,
      image: avatarSrc,
      category_parent_id: props.id.slug,
    };
    const message = await CreateCategory(final, props.token);
    await props.mutating();
    setAvatarSrc(null);
    handleCloseDialog();
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Mời nhập lại thông tin");
  };

  return (
    <React.Fragment>
      <Toaster />
      <Dialog
        fullWidth={true}
        maxWidth="md"
        onClose={props.handleClose}
        open={props.isOpen}
        sx={sxStyle}
        className={roboto.className}
      >
        <DialogTitle className={Styles["add-User-dialog-title-container"]}>
          <span className={Styles["add-User-dialog-title-wrapper"]}>
            Thêm Danh mục con
          </span>
          <div
            className={Styles["close-icon-wrapper"]}
            onClick={props.handleClose}
          >
            <CancelOutlinedIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={Styles["add-user-form-container"]}
          >
            <div
              className={Styles["add-user-field-container"]}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <span className={Styles["add-user-field-label"]}>Hình ảnh</span>
              <div
                className={Styles["img-container"]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <input
                  ref={inputFileRef}
                  onChange={handleFileUpload}
                  type="file"
                  accept="image/*"
                  style={{ backgroundColor: "white", display: "none" }}
                />
                <Button
                  onClick={handlingClickUpload}
                  type="primary"
                  icon={<CloudUploadOutlined />}
                >
                  Upload image
                </Button>
                {avatarSrc != null ? (
                  <Image
                    width={150}
                    height={150}
                    alt=""
                    priority
                    src={avatarSrc}
                  />
                ) : (
                  <Image
                    width={150}
                    height={150}
                    alt=""
                    priority
                    src={images.nonImg}
                  />
                )}
              </div>
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Tên danh mục con:{" "}
              </span>
              <Form.Item
                className={Styles["input-wrapper"]}
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Hãy nhập tên danh mục của " + props.cateHeading,
                  },
                ]}
              >
                <Input placeholder="Tên danh mục" />
              </Form.Item>
            </div>

            {/* <div
              className={Styles["add-user-field-container"]}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <span className={Styles["add-user-field-label"]}>Mô tả:</span>
              <TextArea
                showCount
                maxLength={100}
                placeholder="Mô tả"
                style={{ height: 100, resize: "none" }}
              />
            </div> */}

            {/* <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Danh mục cha
              </span>
              <Select
                defaultValue={categoryOptions[0]}
                options={categoryOptions}
                isSearchable
                placeholder="Chọn danh mục..."
                className={`${Styles["select-container"]} `}
              />
            </div> */}
            <div
              className={Styles["add-user-field-submit-container"]}
              style={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                textAlign: "center",
                color: "red",
                display: "none",
              }}
              ref={messageRef}
            >
              Vui lòng nhập đầy đủ thông tin
            </div>

            <div className={Styles["add-user-field-submit-container"]}>
              <span
                className={Styles["add-user-field-cancle-btn"]}
                onClick={props.handleClose}
              >
                Huỷ
              </span>
              <button className={Styles["add-user-field-submit-btn"]}>
                THÊM
              </button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

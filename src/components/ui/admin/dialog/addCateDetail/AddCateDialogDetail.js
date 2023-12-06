import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";
import { Input } from "antd";
import Image from "next/image";
import images from "@/assets/images";
import { uploadImage } from "@/components/utils/Upload";
import { Toaster } from "react-hot-toast";
import { CreateCategory } from "@/api/admin/CreateCategory";
const Select = dynamic(() => import("react-select"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function checkPropertiesNotNull(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === null) {
      return false;
    }
  }

  return true;
}

const { TextArea } = Input;

export default function AddCateDialogDetail(props) {
  //states
  const [avatarSrc, setAvatarSrc] = useState();

  //Refs
  const messageRef = React.useRef();

  const [cate, setCate] = useState({
    name: null,
    image: null,
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

  const handleChangeName = (e) => {
    let temp = { ...cate, name: e.target.value };
    setCate(temp);
  };

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

  // const categoryOptions = [
  //   { value: "none", label: "Không" },
  //   { value: "Điện tử", label: "Điện tử" },
  //   { value: "Điện thoại", label: "Điện thoại" },
  //   { value: "Máy tính bảng", label: "Máy tính bảng" },
  //   { value: "Phụ kiện", label: "Phụ kiện" },
  //   { value: "Sách", label: "Sách" },
  //   { value: "Sách giáo khoa", label: "Sách giáo khoa" },
  //   { value: "Sách văn học", label: "Sách văn học" },
  //   { value: "Thời trang", label: "Thời trang" },
  //   { value: "Quần áo nam", label: "Quần áo nam" },
  //   { value: "Quần áo nữ", label: "Quần áo nữ" },
  // ];

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
          <form
            onSubmit={handleSubmit}
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
                  onChange={handleFileUpload}
                  type="file"
                  style={{ backgroundColor: "white" }}
                />
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
                Tên danh mục:{" "}
              </span>
              <Input placeholder="Tên danh mục" onChange={handleChangeName} />
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
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio } from "antd";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Image from "next/image";
import dynamic from "next/dynamic";
import images from "@/assets/images";
import { uploadImage } from "@/components/utils/Upload";
import { UpdateCategory } from "@/api/admin/UpdateCategory";
const Select = dynamic(() => import("react-select"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function checkNullValues(obj) {
  const { image, name } = obj;
  return name !== null;
}
export default function EditCateDialogDetail(props) {
  const [open, setOpen] = React.useState(false);
  const { cate, updateCate } = props;
  const [avatarSrc, setAvatarSrc] = useState();

  //Refs
  const messageRef = React.useRef();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        updateCate(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handleChangeName = (e) => {
    let temp = { ...cate, name: e.target.value };
    updateCate(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkNullValues(cate)) {
      messageRef.current.style.display = "none";
      let { name, image } = cate;
      let temp = { name, image };
      console.log(temp);
      const message = UpdateCategory(cate.category_id, temp, props.token);
      console.log(message);
      // console.log(temp);
      window.location.reload();
    } else {
      messageRef.current.style.display = "block";
    }
  };

  const dateFormat = "DD/MM/YYYY";

  const { TextArea } = Input;
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

  if (cate)
    return (
      <React.Fragment>
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
              CHỈNH SỬA DANH MỤC
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
                    <>
                      {cate.image != null ? (
                        <Image
                          width={150}
                          height={150}
                          alt=""
                          priority
                          src={cate.image}
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
                    </>
                  )}
                </div>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>ID: </span>
                <Input
                  placeholder="ID"
                  defaultValue={cate.category_id}
                  disabled
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Tên Danh mục:{" "}
                </span>
                <Input
                  onChange={handleChangeName}
                  defaultValue={cate.name}
                  placeholder="Username"
                />
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
                defaultValue={
                  "Danh mục điện tử: công nghệ tiên tiến, tiện ích, giải trí, ..."
                }
                placeholder="Địa chỉ"
                style={{ height: 100, resize: "none" }}
              />
            </div>{" "}
            */}
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
              {/* <div
              className={Styles["add-user-field-container"]}
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <span className={Styles["add-user-field-label"]}>Hình ảnh</span>
              <div className={Styles["img-container"]}>
                <div
                  className={Styles["img-wrapper"]}
                  onClick={props.handleOpenImgDialog}
                >
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={props.imgSrc}
                    alt=""
                    priority
                    className={Styles["img"]}
                  />
                </div>
              </div>
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
                  Cập nhật
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
}

import React, { useState } from "react";
import Styles from "./style.module.css";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import dynamic from "next/dynamic";
import { Opacity, Preview } from "@mui/icons-material";
const Avatar = dynamic(() => import("react-avatar-edit"), { ssr: false });
function EditImageDialog(props) {
  const sxStyle = {
    "& .MuiDialog-container:hover": {
      cursor: "pointer",
    },
    "& .MuiPaper-root": {
      zIndex: "1002",
      width: "700px",
      cursor: "default",
    },
    "& .MuiTypography-root": {
      padding: "10px 14px 10px 24px",
    },
    "& .MuiDialogActions-root": {
      padding: "24px",
    },
  };
  //Props
  const { isOpen, onClose, onChange } = props;

  // Image to preview
  const [imgPreview, setImgPreview] = useState(null);

  const handlingCrop = (view) => {
    setImgPreview(view);
  };
  const handlingOnClosePreviewImg = (view) => setImgPreview(null);

  const handlingClickSave = () => {
    onChange(imgPreview);
    handlingOnClosePreviewImg();
    onClose();
    // props.onClickSave();
  };
  const handlingClickCancel = () => {
    handlingOnClosePreviewImg();
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} sx={sxStyle}>
      <DialogTitle
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        {imgPreview ? (
          <div className={Styles["Dialog-Title"]}>Chỉnh sửa ảnh</div>
        ) : (
          <div className={Styles["Dialog-Title"]}>Cập nhật ảnh</div>
        )}

        <div className={Styles[""]}>
          <IconButton aria-label="delete" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <div className={Styles["avatar-preview-wrapper"]}>
          <div className={Styles["edit-img-wrapper"]}>
            <p className={Styles["custom-previewImg-label"]}>
              Chọn ảnh mong muốn ở đây
            </p>
            <Avatar
              width={"506"}
              height={"302"}
              cropColor="black"
              lineWidth={4}
              backgroundColor={"rgb(153,153,153)"}
              closeIconColor="black"
              shadingColor="#8a7e7d"
              label="Chọn ảnh từ máy"
              borderStyle={{
                border: "3px dashed black",
                opacity: 0.8,
                textAlign: "center",
                padding: "3px",
                boxSizing: "border-box",
              }}
              onClose={handlingOnClosePreviewImg}
              onCrop={handlingCrop}
            />
          </div>
          <div className={Styles["preview-img-wrapper"]}>
            <p className={Styles["custom-previewImg-label"]}>Xem trước</p>
            {imgPreview && (
              <Image
                width={100}
                height={100}
                className={Styles.img}
                src={imgPreview}
                alt="ABC"
              />
            )}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className={Styles["button-wrapper"]}>
          <div className={Styles["button-card"]}>
            <button className={Styles["btn-huy"]} onClick={handlingClickCancel}>
              Cancel
            </button>
            {imgPreview && (
              <button className={Styles["btn-luu"]} onClick={handlingClickSave}>
                Save
              </button>
            )}
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default EditImageDialog;

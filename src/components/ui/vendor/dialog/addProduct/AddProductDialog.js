import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import dynamic from "next/dynamic";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Input, Radio } from "antd";
import dayjs from "dayjs";
import { InputNumber } from "antd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "@/assets/data/country";
import Image from "next/image";
import images from "@/assets/images";
import Checkbox from "@mui/material/Checkbox";
import useFetch from "@/api/useFetch";
import { uploadImage } from "@/components/utils/Upload";
import { Toaster } from "react-hot-toast";
import { AddProduct } from "@/api/vendor/addProduct";

const Select = dynamic(() => import("react-select"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function transformArray(array) {
  if (array) {
    return array.map((item) => ({
      value: item.category_id,
      label: item.name,
    }));
  } else {
    return null;
  }
}

function checkValidFields(obj) {
  if (
    obj.hasOwnProperty("name") &&
    obj.hasOwnProperty("quantity") &&
    obj.hasOwnProperty("origin") &&
    obj.hasOwnProperty("price") &&
    obj.hasOwnProperty("promotional_price") &&
    obj.hasOwnProperty("category_id") &&
    (obj.hasOwnProperty("image") || obj.hasOwnProperty("category_child")) &&
    obj.name !== null &&
    obj.quantity !== null &&
    obj.price !== null &&
    obj.promotional_price !== null &&
    obj.category_id !== null &&
    (obj.image !== null || obj.category_child !== null)
  ) {
    return true;
  } else {
    return false;
  }
}

export default function AddProductDialog(props) {
  console.log(props.product);

  const [open, setOpen] = React.useState(false);
  const [genderValue, setGenderValue] = useState(1);
  const [checked, setChecked] = useState(false);
  const categories = useFetch("http://localhost:3000/api/category/");
  const [product, setProduct] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [categoryChild, setCategoryChild] = useState(null);
  //Refs
  const selectRef = useRef();
  const messageRef = useRef();

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      selectRef.current.style.display = "block";
    } else {
      selectRef.current.style.display = "none";
    }
  };

  const handleSelectChange = (value) => {
    console.log(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handlingChangeName = (e) => {
    let temp = { ...product, name: e.target.value };
    setProduct(temp);
  };

  const handlingChangeQuantity = (value) => {
    let temp = { ...product, quantity: value };
    setProduct(temp);
  };

  const handlingChangePrice = (value) => {
    let temp = { ...product, price: value };
    setProduct(temp);
  };

  const handlingChangePromoPrice = (value) => {
    let temp = { ...product, promotional_price: value };
    setProduct(temp);
  };

  const handlingChangeCategory = (value) => {
    let temp = { ...product, category_id: value.value };
    setProduct(temp);
  };

  const handlingChangeChildCate = (e) => {
    setCategoryChild(e.target.value);
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
        let temp = { ...product, image: imagePath };
        setProduct(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handlingSubmit = (e) => {
    e.preventDefault();
    let temp = { ...product, image: avatarSrc, category_child: categoryChild };
    if (checkValidFields(temp)) {
      const message = AddProduct(temp, props.token);
      console.log(message);
      messageRef.current.style.display = "none";
    } else {
      console.log(temp);
      messageRef.current.style.display = "block";
    }
  };

  const dateFormat = "DD/MM/YYYY";

  const sxStyle = {
    "& .MuiDialog-container:hover": {
      cursor: "pointer",
    },
    "& .MuiPaper-root": {
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

  const categoryOptions = transformArray(categories.data);

  // useEffect(() => {
  //   console.log(product);
  // }, [product]);

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
            Thêm Sản phẩm
          </span>
          <div
            className={Styles["close-icon-wrapper"]}
            onClick={props.handleClose}
          >
            <CancelOutlinedIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers>
          <Toaster />
          <form
            onSubmit={handlingSubmit}
            className={Styles["add-user-form-container"]}
          >
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Hình ảnh:</span>
              <div className={Styles["input-img-container"]}>
                <input
                  style={{ backgroundColor: "white" }}
                  type="file"
                  onChange={handleFileUpload}
                ></input>
                <div className={Styles["img-container"]}>
                  {avatarSrc ? (
                    <Image src={avatarSrc} alt="" width={100} height={100} />
                  ) : (
                    <Image
                      src={images.nonImg}
                      alt=""
                      width={100}
                      height={100}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Tên</span>
              <Input
                onChange={handlingChangeName}
                placeholder="Tên sản phẩm"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Số lượng</span>
              <InputNumber
                onChange={handlingChangeQuantity}
                min={1}
                max={100}
                placeholder="số lượng"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Xuất xứ: </span>
              <Autocomplete
                id="country-select-demo"
                sx={{ width: "100%" }}
                options={countries}
                autoHighlight
                onChange={(event, country) => {
                  if (country) {
                    let temp = { ...product, origin: country.label };
                    setProduct(temp);
                  }
                }}
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="xuất xứ"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Giá niêm yết :
              </span>
              <InputNumber
                onChange={handlingChangePrice}
                min={50000}
                max={1000000000}
                placeholder="giá niêm yết"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Giá KM:</span>
              <InputNumber
                onChange={handlingChangePromoPrice}
                min={50000}
                max={1000000000}
                placeholder="giá khuyến mãi"
                style={{
                  width: "100%",
                }}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>
                Danh mục cha
              </span>
              <Select
                options={categoryOptions}
                isSearchable
                placeholder="Chọn danh mục cha"
                className={`${Styles["select-container"]} `}
                onChange={handlingChangeCategory}
              />
            </div>
            <div className={Styles["add-user-field-container"]}>
              <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>

            <div
              className={Styles["add-user-field-container"]}
              style={{ display: "none" }}
              ref={selectRef}
            >
              <span
                className={Styles["add-user-field-label"]}
                style={{ marginBottom: "10px" }}
              >
                Danh mục con
              </span>
              <Input
                onChange={handlingChangeChildCate}
                placeholder="Tên Danh mục con"
                style={{
                  width: "100%",
                }}
              />
            </div>

            <div
              style={{
                width: "100%",
                color: "red",
                textAlign: "center",
                fontWeight: "300",
                display: "none",
              }}
              ref={messageRef}
            >
              Yêu cầu nhập đầy đủ thông tin
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

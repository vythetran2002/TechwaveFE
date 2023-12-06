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
import Checkbox from "@mui/material/Checkbox";
import dayjs from "dayjs";
import { InputNumber } from "antd";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { countries } from "@/assets/data/country";
import images from "@/assets/images";
import Image from "next/image";
import useFetch from "@/api/useFetch";
import { Category } from "@mui/icons-material";
import { uploadImage } from "@/components/utils/Upload";
import { Toaster } from "react-hot-toast";
import { EditProduct } from "@/api/vendor/EditProduct";
import useFetchCategories from "@/api/vendor/useFetchCategories";

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

function findLabelByValue(arr, value) {
  if (arr) {
    const foundItem = arr.find((item) => item.value === value);

    if (foundItem) {
      return {
        value: foundItem.value,
        label: foundItem.label,
      };
    }

    return null; // hoặc có thể trả về giá trị mặc định nếu không tìm thấy
  }
}

const Select = dynamic(() => import("react-select"), { ssr: false });

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function EditProductDialog(props) {
  const categories = useFetch("http://localhost:3000/api/category");
  // console.log(categories);

  const [open, setOpen] = React.useState(false);
  const [genderValue, setGenderValue] = useState(1);
  const [avatarSrc, setAvatarSrc] = useState();
  const [checked, setChecked] = useState(false);
  const [categoryChild, setCategoryChild] = useState(null);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      selectRef.current.style.display = "block";
    } else {
      selectRef.current.style.display = "none";
    }
  };

  //Refs
  const selectRef = useRef();
  const messageRef = useRef();

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
  const handlingChangeName = (e) => {
    let temp = { ...props.product, name: e.target.value };
    props.updateProduct(temp);
  };

  const handlingChangeQuantity = (value) => {
    let temp = { ...props.product, quantity: value };
    props.updateProduct(temp);
  };

  const handlingChangePrice = (value) => {
    let temp = { ...props.product, price: value };
    props.updateProduct(temp);
  };

  const handlingChangePromoPrice = (value) => {
    let temp = { ...props.product, promotional_price: value };
    props.updateProduct(temp);
  };

  const handlingChangeCategory = (value) => {
    let temp = { ...props.product, category_id: value.value };
    props.updateProduct(temp);
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
        let temp = { ...props.product, image: imagePath };
        props.updateProduct(temp);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // let temp = {
    //   ...props.product,
    //   image: avatarSrc,
    //   category_child: categoryChild,
    // };
    let {
      name,
      quantity,
      origin,
      price,
      promotional_price,
      image,
      category_id,
      category_child,
    } = props.product;
    let temp = {
      name,
      quantity,
      origin,
      price,
      promotional_price,
      image,
      category_id,
      category_child,
    };
    if (checkValidFields(temp)) {
      const message = EditProduct(props.product.product_id, temp, props.token);
      console.log(message);
      // console.log(temp);
      messageRef.current.style.display = "none";
      window.location.reload();
    } else {
      console.log(temp);
      messageRef.current.style.display = "block";
    }
  };

  const categoryOptions = transformArray(categories.data);

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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form
              onSubmit={handleSubmit}
              className={Styles["add-user-form-container"]}
            >
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Id: </span>
                <Input
                  defaultValue={props.product.product_id}
                  disabled
                  placeholder="Tên sản phẩm"
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Hình ảnh:
                </span>
                <div className={Styles["input-img-container"]}>
                  <input
                    style={{ backgroundColor: "white" }}
                    type="file"
                    accept=".jpg, .png, image/jpeg, image/png"
                    maxLength="1048576"
                    onChange={handleFileUpload}
                  ></input>
                  <div className={Styles["img-container"]}>
                    {avatarSrc ? (
                      <Image
                        src={images.nonAvatar}
                        alt=""
                        width={100}
                        height={100}
                      />
                    ) : (
                      <>
                        {props.product.image ? (
                          <>
                            <Image
                              src={props.product.image}
                              alt=""
                              width={100}
                              height={100}
                            />
                          </>
                        ) : (
                          <>
                            <Image
                              src={images.nonImg}
                              alt=""
                              width={100}
                              height={100}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Tên</span>
                <Input
                  defaultValue={props.product.name}
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
                  max={50}
                  placeholder="số lượng"
                  defaultValue={props.product.quantity}
                  style={{
                    width: "100%",
                  }}
                />
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Xuất xứ:{" "}
                </span>
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  options={countries}
                  autoHighlight
                  value={countries[99]}
                  onChange={(event, country) => {
                    if (country) {
                      let temp = { ...props.product, origin: country.label };
                      props.updateProduct(temp);
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
                  defaultValue={props.product.price}
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
                  defaultValue={props.product.promotional_price}
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
                  defaultValue={findLabelByValue(
                    categoryOptions,
                    props.product.category_id
                  )}
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
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

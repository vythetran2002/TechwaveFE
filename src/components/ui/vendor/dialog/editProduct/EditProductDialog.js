import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import dynamic from "next/dynamic";
import { Input, Radio, Form, Button, Select } from "antd";
import { DollarOutlined, CloudUploadOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
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

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function EditProductDialog(props) {
  const categories = useFetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/category"
  );
  // console.log(categories);
  const { Option } = Select;
  const [parentCateId, setParentCateId] = useState(null);
  const [childCateId, setChildCateId] = useState(null);
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
  const inputFileRef = useRef(null);

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

  const handlingCloseDialog = async () => {
    await props.handleClose();
    await setChecked(false);
    await setAvatarSrc(null);
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

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  function handleFileUpload(event) {
    const file = event.target.files[0];
    // console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        let temp = { ...props.product, image: imagePath };
        props.updateProduct(temp);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
  }

  const onFinish = async (values) => {
    let final = {};

    if (avatarSrc) {
      final = { ...values, image: avatarSrc };
    } else {
      final = { ...values, image: props.product.image };
    }
    if (categoryChild?.length === 0) {
      final.category_child = null;
    }

    const message = await EditProduct(
      props.product.product_id,
      final,
      props.token
    );
    await setChecked(false);
    await props.mutate();
    props.handleClose();
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
        onClose={handlingCloseDialog}
        open={props.isOpen}
        sx={sxStyle}
        className={roboto.className}
      >
        <DialogTitle className={Styles["add-User-dialog-title-container"]}>
          <span className={Styles["add-User-dialog-title-wrapper"]}>
            CHỈNH SỬA SẢN PHẨM
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
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                name: props.product.name,
                quantity: props.product.quantity,
                origin: props.product.origin,
                price: props.product.price,
                promotional_price: props.product.promotional_price,
                category_id: props.product.category?.category_parent_id
                  ? props.product.category.category_parent_id
                  : props.product.category?.category_id,
                category_child: props.product.category?.category_parent_id
                  ? props.product.category.name
                  : null,
              }}
              className={Styles["add-user-form-container"]}
            >
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Hình ảnh:
                </span>
                <div className={Styles["input-img-container"]}>
                  <input
                    ref={inputFileRef}
                    style={{ backgroundColor: "white", display: "none" }}
                    type="file"
                    accept=".jpg, .png, image/jpeg, image/png"
                    maxLength="1048576"
                    onChange={handleFileUpload}
                  ></input>
                  <div style={{ textAlign: "center" }}>
                    <Button
                      onClick={handlingClickUpload}
                      type="primary"
                      icon={<CloudUploadOutlined />}
                    >
                      Upload Image
                    </Button>
                  </div>
                  <div className={Styles["img-container"]}>
                    {avatarSrc ? (
                      <Image src={avatarSrc} alt="" width={100} height={100} />
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
                <span className={Styles["add-user-field-label"]}>Id: </span>

                <Input
                  defaultValue={props.product.product_id}
                  disabled
                  placeholder="ID Sản Phẩm"
                  style={{
                    width: "100%",
                  }}
                />
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Tên:</span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập tên sản phẩm",
                    },
                  ]}
                >
                  <Input
                    onChange={handlingChangeName}
                    placeholder="Tên sản phẩm"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>

              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Số lượng</span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập số lượng sản phẩm",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={handlingChangeQuantity}
                    min={1}
                    max={10000}
                    placeholder="số lượng"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Xuất xứ:{" "}
                </span>
                <Form.Item
                  getValueFromEvent={(country) => country && country.value}
                  className={Styles["input-wrapper"]}
                  name="origin"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập xuất xứ sản phẩm",
                    },
                  ]}
                >
                  <Select
                    placeholder={"Xuất xứ"}
                    dropdownStyle={{ width: "600px", zIndex: "99999999" }}
                    placement="bottomRight"
                    showSearch
                    labelInValue={true}
                    className={` ${Styles["phone-input-selector"]}`}
                  >
                    {countries.map((country) => {
                      return (
                        <Option key={country.phone} value={country.label}>
                          <div className="country-option">
                            <img
                              style={{
                                marginRight: "5px",
                                borderRadius: "2px",
                              }}
                              loading="lazy"
                              className="country-img"
                              srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                              alt=""
                            />
                            <span>{country.label}</span>
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Giá niêm yết :
                </span>

                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập giá niêm yết",
                    },
                  ]}
                >
                  <InputNumber
                    addonAfter={<DollarOutlined />}
                    onChange={handlingChangePrice}
                    min={10000}
                    max={1000000000}
                    placeholder="giá niêm yết"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>Giá KM:</span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="promotional_price"
                  rules={[
                    {
                      required: false,
                      message: "Hãy nhập giá khuyến mãi",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const priceValue = getFieldValue("price");
                        if (value && priceValue && value >= priceValue) {
                          return Promise.reject(
                            "Giá khuyến mãi phải nhỏ hơn giá niêm yết"
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    addonAfter={<DollarOutlined />}
                    onChange={handlingChangePromoPrice}
                    min={10000}
                    max={1000000000}
                    placeholder="giá khuyến mãi"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
              </div>
              <div className={Styles["add-user-field-container"]}>
                <span className={Styles["add-user-field-label"]}>
                  Danh mục cha
                </span>
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="category_id"
                  rules={[
                    {
                      required: true,
                      message: "Hãy nhập danh mục cha",
                    },
                  ]}
                >
                  <Select
                    placeholder="Danh mục cha"
                    dropdownStyle={{ width: "600px", zIndex: "99999999" }}
                    showSearch
                  >
                    {categories.data &&
                      categories.data.map((cate) => {
                        return (
                          <Option
                            key={"cate" + cate.category_id}
                            value={cate.category_id}
                          >
                            {cate.name}
                          </Option>
                        );
                      })}
                  </Select>
                </Form.Item>
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
                <Form.Item
                  className={Styles["input-wrapper"]}
                  name="category_child"
                  rules={[
                    {
                      required: false,
                      message: "Hãy nhập danh mục cha",
                    },
                  ]}
                >
                  <Input
                    onChange={handlingChangeChildCate}
                    placeholder="Tên Danh mục con"
                    style={{
                      width: "100%",
                    }}
                  />
                </Form.Item>
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
                  Lưu
                </button>
              </div>
            </Form>
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

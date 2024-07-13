import React, { useEffect, useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import Styles from "./styles.module.css";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Roboto } from "next/font/google";
import { Input, Radio, Form, Select } from "antd";
import { DollarOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { InputNumber, Button } from "antd";
import { countries } from "@/assets/data/country";
import Image from "next/image";
import images from "@/assets/images";
import Checkbox from "@mui/material/Checkbox";
import useFetch from "@/api/useFetch";
import { uploadImage } from "@/components/utils/Upload";
import toast, { Toaster } from "react-hot-toast";
import { AddProduct } from "@/api/vendor/addProduct";

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

export default function AddProductDialog(props) {
  // console.log(props.product);
  const { Option } = Select;
  const [open, setOpen] = React.useState(false);
  const [genderValue, setGenderValue] = useState(1);
  const [checked, setChecked] = useState(false);

  const categories = useFetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/category"
  );
  const [product, setProduct] = useState({});
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [categoryChild, setCategoryChild] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  //Refs
  const selectRef = useRef();
  const messageRef = useRef();
  const inputFileRef = useRef(null);

  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      selectRef.current.style.display = "block";
    } else {
      selectRef.current.style.display = "none";
    }
  };

  const handlingClickUpload = () => {
    inputFileRef.current.click();
  };

  const handleSelectChange = (value) => {
    console.log(value);
  };

  const handleChangeCountry = (value, option) => {
    setSelectedCountry(option.value);
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
    //console.log(file);
    const message = uploadImage(file);
    const promiseResult = message;
    toast.promise(promiseResult, {
      loading: "Đang tải lên...",
      success: (result) => {
        const imagePath = result.imagePath;
        console.log("imagePath:", imagePath);
        setAvatarSrc(imagePath);
        let temp = { ...product, image: imagePath };
        setProduct(temp);
        return "Tải lên thành công!";
      },
      error: "Lỗi tải lên!",
    });
    // promiseResult
    //   .then((result) => {
    //     const imagePath = result.imagePath;
    //     console.log("imagePath:", imagePath);
    //     setAvatarSrc(imagePath);
    //     let temp = { ...product, image: imagePath };
    //     setProduct(temp);
    //   })
    //   .catch((error) => {
    //     console.error("Lỗi:", error);
    //   });
  }

  const onFinish = async (values) => {
    let final = {};
    if (categoryChild) {
      final = { ...values, image: avatarSrc, category_child: categoryChild };
    } else {
      final = { ...values, image: avatarSrc, category_child: null };
    }
    const message = await AddProduct(final, props.token);
    await props.mutate();
    props.handleClose();
    setAvatarSrc(null);
    setChecked(false);
  };
  const onFinishFailed = (errorInfo) => {
    toast.error("Mời nhập lại thông tin");
  };
  const handlingCloseDialog = async () => {
    await props.handleClose();
    await setChecked(false);
    await setAvatarSrc(null);
  };

  // const handlingSubmit = (e) => {
  //   e.preventDefault();
  //   let temp = { ...product, image: avatarSrc, category_child: categoryChild };
  //   if (checkValidFields(temp)) {
  //     const message = AddProduct(temp, props.token);
  //     console.log(message);
  //     messageRef.current.style.display = "none";
  //     props.handleClose();
  //   } else {
  //     console.log(temp);
  //     messageRef.current.style.display = "block";
  //   }
  // };

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

  return (
    <React.Fragment>
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

          <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className={Styles["add-user-form-container"]}
          >
            <div className={Styles["add-user-field-container"]}>
              <span className={Styles["add-user-field-label"]}>Hình ảnh:</span>
              <div className={Styles["input-img-container"]}>
                <input
                  ref={inputFileRef}
                  style={{ backgroundColor: "white", display: "none" }}
                  type="file"
                  accept=".jpg, .png, image/jpeg, image/png"
                  onChange={handleFileUpload}
                ></input>
                <Button
                  onClick={handlingClickUpload}
                  type="primary"
                  icon={<CloudUploadOutlined />}
                >
                  Upload Image
                </Button>
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
                  className={Styles["input-wrapper"]}
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
              <span className={Styles["add-user-field-label"]}>Xuất xứ: </span>
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
                  dropdownStyle={{ zIndex: "99999999" }}
                  placement="bottomRight"
                  showSearch
                  // onChange={handleChangeCountry}
                  labelInValue={true}
                  className={` ${Styles["phone-input-selector"]}`}
                  // value={selectedCountry}
                >
                  {countries.map((country) => {
                    return (
                      <Option key={country.phone} value={country.label}>
                        <div className="country-option">
                          <img
                            style={{ marginRight: "5px", borderRadius: "2px" }}
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
                  dropdownStyle={{ zIndex: "99999999" }}
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
              {/* <Select
                options={categoryOptions}
                isSearchable
                placeholder="Chọn danh mục cha"
                className={`${Styles["select-container"]} `}
                onChange={handlingChangeCategory}
              /> */}
            </div>
            <div className={Styles["add-user-field-container"]}>
              <Checkbox
                checked={checked}
                onChange={handleChangeCheck}
                inputProps={{ "aria-label": "controlled" }}
              />
              <span>Thêm danh mục con</span>
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
          </Form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

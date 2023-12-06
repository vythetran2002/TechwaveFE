import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../../styles.module.css";
import dynamic from "next/dynamic";
import useFetchVendorProfile from "@/api/vendor/useFetchVendorProfile";
import { Col, Divider, Row } from "antd";
import { useRouter } from "next/router";
import useFetchDetailProduct from "@/api/vendor/useFetchDetailProduct";
import Image from "next/image";
import images from "@/assets/images";
import "react-quill/dist/quill.snow.css";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Rating } from "@mui/material";
import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function HtmlContent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Index() {
  const router = useRouter();
  const slug = router.query.slug;
  const product = useFetchDetailProduct(slug);

  // console.log(product);

  // states
  const [isOpenAddProductDialog, setIsOpenAddProductDialog] = useState(false);
  const [isOpenEditProductDialog, setIsOpenEditProductDialog] = useState(false);
  const handlingOpenAddProductDialog = () => {
    setIsOpenAddProductDialog(true);
  };

  const handlingCloseAddProductDialog = () => {
    setIsOpenAddProductDialog(false);
  };

  const handlingOpenEditProductDialog = () => {
    setIsOpenEditProductDialog(true);
  };

  const handlingCloseEditProductDialog = () => {
    setIsOpenEditProductDialog(false);
  };

  const style = {
    background: "#0092ff",
    padding: "8px 0",
  };

  if (product.isLoading) {
    return <>Loading</>;
  }
  if (product.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <Head>
          <title>Techwave - Vendor</title>
        </Head>
        <VendorLayout path="/product">
          <div className={Styles["user-managemnent-container"]}>
            <Row gutter={12}>
              <Col className="gutter-row" span={12}>
                <Row className="gutter-row">
                  <span className={Styles["detail-item-heading"]}>
                    Hình ảnh sản phẩm
                  </span>
                </Row>
                <Row className={Styles["detail-product-card"]}>
                  <div className={Styles["detail-product-img-wrapper"]}>
                    {product.data.image != null ? (
                      <Image
                        src={product.data.image}
                        height={200}
                        width={200}
                        priority
                        alt=""
                      ></Image>
                    ) : (
                      <Image
                        src={images.nonImg}
                        height={250}
                        width={250}
                        priority
                        alt=""
                      ></Image>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "35px",
                      fontWeight: "600",
                      textDecoration: "bold",
                      width: "100%",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {product.data.name}
                  </span>
                </Row>
                <Row className="gutter-row">
                  <span className={Styles["detail-item-heading"]}>
                    Loại sản phẩm
                  </span>
                </Row>
                <Row className="gutter-row">
                  <div className={Styles["product-detail-option-container"]}>
                    {product.data.option.length != 0 ? (
                      product.data.option.map((option, index) => {
                        return (
                          <React.Fragment key={"option" + index}>
                            <div
                              className={Styles["product-detail-option-item"]}
                            >
                              {option.image ? (
                                <>
                                  <Image
                                    src={option.image}
                                    height={100}
                                    width={100}
                                    priority
                                    alt=""
                                  ></Image>
                                </>
                              ) : (
                                <>
                                  <Image
                                    src={images.nonImg}
                                    height={100}
                                    width={100}
                                    priority
                                    alt=""
                                  ></Image>
                                </>
                              )}

                              <span>{option.name}</span>
                            </div>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <React.Fragment>
                        <div
                          className={
                            Styles["product-detail-option-item-disaled"]
                          }
                        >
                          <Image
                            src={images.nonImg}
                            height={100}
                            width={100}
                            priority
                            alt=""
                          ></Image>
                          <span
                            style={{
                              width: "100%",
                              textAlign: "center",
                              fontSize: "20px",
                            }}
                          >
                            Không có loại sản phẩm
                          </span>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                </Row>
                <Row className="gutter-row">
                  <span className={Styles["detail-item-heading"]}>Mô tả</span>
                </Row>
                <Row className="gutter-row">
                  <div
                    className="ql-editor"
                    style={{
                      backgroundColor: "white",
                      marginTop: "20px",
                      padding: "20px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <HtmlContent htmlString={product.data.content} />
                  </div>
                </Row>
              </Col>
              <Col className="gutter-row" span={12}>
                <Row
                  className="gutter-row"
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Link
                      href={
                        "/vendor/product/edit-option/" + product.data.product_id
                      }
                      className="detail-product-button-container"
                    >
                      <div className={Styles["user-filter-button-wrapper"]}>
                        <StyleOutlinedIcon />
                        <span>Chỉnh sửa loại sản phẩm</span>
                      </div>
                    </Link>
                    <div className="detail-product-button-container">
                      <Link
                        href={
                          "/vendor/product/edit-description/" +
                          product.data.product_id
                        }
                        className={Styles["user-filter-button-wrapper"]}
                      >
                        <DescriptionOutlinedIcon />
                        <span>Chỉnh sửa mô tả</span>
                      </Link>
                    </div>
                  </div>
                  <Link
                    href={"/vendor/product/"}
                    className="detail-product-button-container"
                  >
                    <div
                      className={Styles["user-filter-button-wrapper"]}
                      style={{ backgroundColor: "EE4D2D" }}
                    >
                      <ArrowBackIosIcon />
                    </div>
                  </Link>
                </Row>

                <Divider />
                <Row className={Styles["detail-product-card"]}>
                  <Row style={{ width: "100%" }}>
                    <span className={Styles["detail-product-property"]}>
                      ID: {product.data.product_id} | Nguồn gốc:{" "}
                      {product.data.origin} | Địa chỉ: {product.data.place}
                    </span>
                  </Row>
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-price-property"]}>
                      <span style={{ color: "red" }}>
                        {product.data.price}đ{" "}
                      </span>
                      <span style={{ textDecoration: "line-through" }}>
                        {product.data.promotional_price}đ
                      </span>
                    </span>
                  </Row>

                  <Row
                    style={{ width: "100%", marginTop: "20px" }}
                    className={Styles["detail-product-property"]}
                  >
                    Danh mục sản phẩm:
                    {product.data && <>{product.data.category.name}</>}
                  </Row>
                  {product.data.category.parent && (
                    <Row
                      style={{ width: "100%", marginTop: "20px" }}
                      className={Styles["detail-product-property"]}
                    >
                      Danh mục chính: {product.data.category.parent.name}
                    </Row>
                  )}
                </Row>
                <Row
                  className={Styles["detail-product-card"]}
                  style={{ marginTop: "20px" }}
                >
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-property-main"]}>
                      SALES
                    </span>
                  </Row>
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-property"]}>
                      Số lượng: {product.data.quantity}
                    </span>
                  </Row>
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-property"]}>
                      Lượt bán: {product.data.haveSales}
                    </span>
                  </Row>
                </Row>
                <Row
                  className={Styles["detail-product-card"]}
                  style={{ marginTop: "20px" }}
                >
                  <span className={Styles["detail-product-property-main"]}>
                    STATISTICS
                  </span>
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-property"]}>
                      <span style={{ marginRight: "20px" }}>Đánh giá: </span>
                      <Rating
                        value={parseInt(product.data.rating)}
                        precision={0.5}
                        readOnly
                        size="lg"
                      />
                    </span>
                  </Row>
                  <Row style={{ width: "100%", marginTop: "20px" }}>
                    <span className={Styles["detail-product-property"]}>
                      Lượt đánh giá: {product.data.slReview}
                    </span>
                  </Row>
                </Row>
              </Col>
            </Row>
          </div>
        </VendorLayout>
      </>
    );
}

export default Index;

import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import { PutProductDesc } from "@/api/vendor/PutProductDesc";
import { Toaster } from "react-hot-toast";
import useFetchProductDesc from "@/api/vendor/useFetchProductDesc";
import { useCookies } from "react-cookie";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function HtmlContent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Index() {
  const router = useRouter();
  const [cookies] = useCookies();
  const slug = router.query.slug;
  const product0 = useFetchDetailProduct(slug);
  const product = useFetchProductDesc(slug);
  const [value, setValue] = useState(null);

  console.log(product);

  const handlingUpdateDesc = async () => {
    try {
      const message = await PutProductDesc(slug, value, cookies["token"]);
      console.log(message);
      window.location.reload(true);
    } catch (error) {
      console.log(error);
    }
  };

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["link", "image"],

    // remove formatting button
  ];

  const modules = {
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize"],
    // },
    // ImageResize: {
    //   // You can pass image resize module options here
    //   parchment: Quill.import("parchment"),
    // },
  };

  useEffect(() => {
    if (product.data) {
      setValue(product.data.data.content);
    }
  }, [product.data]);

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
          <Toaster />
          <div className={Styles["user-managemnent-container"]}>
            <div className={Styles["product-edit-desc-conatiner"]}>
              <div
                className={Styles["product-left-edit-desc-conatiner"]}
                span={12}
              >
                <div className={Styles["product-edit-desc-heading"]}>
                  <span
                    className={Styles["detail-item-heading"]}
                    style={{ fontSize: "20px" }}
                  >
                    CHỈNH SỬA MÔ TẢ CHO SẢN PHẨM
                  </span>
                </div>
                <div className={Styles["product-edit-desc-heading"]}>
                  {product0.data ? (
                    <span className={Styles["detail-item-heading"]}>
                      {product0.data.name}
                    </span>
                  ) : (
                    <>Loading</>
                  )}
                </div>

                <div>
                  <ReactQuill
                    theme="snow"
                    modules={modules}
                    value={value}
                    onChange={setValue}
                  />
                </div>
                <button
                  onClick={handlingUpdateDesc}
                  style={{ marginTop: "20px" }}
                  className={Styles["user-filter-button-wrapper"]}
                >
                  <span>Lưu</span>
                </button>
              </div>
              <div
                className={Styles["product-left-edit-desc-conatiner"]}
                span={12}
              >
                <div className={Styles["product-edit-desc-heading"]}>
                  <span
                    className={Styles["detail-item-heading"]}
                    style={{ fontSize: "20px" }}
                  >
                    BẢN MẪU MÔ TẢ CỦA SẢN PHẨM
                  </span>
                </div>
                <div className={Styles["product-edit-desc-heading"]}>
                  {product0.data ? (
                    <span className={Styles["detail-item-heading"]}>
                      {product0.data.name}
                    </span>
                  ) : (
                    <>Loading</>
                  )}
                </div>

                <div className={Styles["rich-text-editor-container"]}>
                  <div className="ql-editor ">
                    <HtmlContent htmlString={value} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VendorLayout>
      </>
    );
}

export default Index;

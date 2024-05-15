import React, { useState } from "react";
import VendorLayout from "@/components/layout/VendorLayout";
import Head from "next/head";
import Styles from "../../styles.module.css";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";

function HtmlContent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Index() {
  const router = useRouter();

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

  return (
    <>
      <Head>
        <title>Techwave - Vendor</title>
      </Head>
      <VendorLayout path="/product">
        <div className={Styles["user-managemnent-container"]}>
          <div className={Styles["product-add-form-container"]}>
            <span
              style={{
                fontSize: "30px",
                fontWeight: "500",
                marginBottom: "50px",
              }}
            >
              Thêm sản phẩm
            </span>
            <div
              style={{ marginBottom: "20px" }}
              className={Styles["detail-product-card"]}
            ></div>
          </div>
        </div>
      </VendorLayout>
    </>
  );
}

export default Index;

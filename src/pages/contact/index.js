import React from "react";
import Layout from "@/components/layout/Layout";
import Styles from "./styles.module.css";
import Head from "next/head";
import { QRCode } from "antd";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import images from "@/assets/images";

function Index() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <Layout>
        <div className={Styles["contact-container"]}>
          <div className={Styles["contact-wrapper"]}>
            <div className={Styles["contact-name-container"]}>TECHWAVE</div>
            <div className={Styles["contact-media-container"]}>
              <div className={Styles["left-media-container"]}>
                <div className={Styles["left-media-heading"]}>
                  Contact Information
                </div>
                <div className={Styles["left-media-content"]}>
                  <MailOutlined />
                  <span>techwaveute@gmail.com</span>
                </div>
                <div className={Styles["left-media-content"]}>
                  <PhoneOutlined />
                  <span>0816789439 - 0336278954</span>
                </div>
              </div>
              <div className={Styles["right-media-container"]}>
                <QRCode
                  errorLevel="H"
                  size={200}
                  iconSize={200 / 4}
                  value="https://online.hcmute.edu.vn/"
                  icon="https://i.imgur.com/7XtINuK.png"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Index;

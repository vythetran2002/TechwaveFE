import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";

function CustomerFeedBack() {
  return (
    <>
      <section className={Styles["feedbacks-container"]}>
        <div className={Styles["feedbacks-wrapper"]}>
          <div className={Styles["feedback-item-container"]}>
            <div className={Styles["message-container"]}>
              <div className={Styles["message-tail"]}></div>
              <div className={Styles["message-wrapper"]}>
                <span>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit...
                </span>
              </div>
            </div>
            <div className={Styles["customer-container"]}>
              <div className={Styles["customer-avatar-wrapper"]}>
                <Image
                  src={images.image17}
                  className={Styles["avatar"]}
                  alt=""
                />
              </div>
              <div className={Styles["customer-name-position-container"]}>
                <span className={Styles["name"]}>Ông: Nguyễn Văn Hùng</span>
                <span className={Styles["position"]}>Giám đốc kỳ lân Momo</span>
              </div>
            </div>
          </div>
          <div className={Styles["feedback-item-container"]}>
            <div className={Styles["message-container"]}>
              <div className={Styles["message-tail"]}></div>
              <div className={Styles["message-wrapper"]}>
                <span>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit...
                </span>
              </div>
            </div>
            <div className={Styles["customer-container"]}>
              <div className={Styles["customer-avatar-wrapper"]}>
                <Image
                  src={images.image18}
                  className={Styles["avatar"]}
                  alt=""
                />
              </div>
              <div className={Styles["customer-name-position-container"]}>
                <span className={Styles["name"]}>Ông: Nguyễn Văn Hùng</span>
                <span className={Styles["position"]}>Giám đốc kỳ lân Momo</span>
              </div>
            </div>
          </div>
          <div className={Styles["feedback-item-container"]}>
            <div className={Styles["message-container"]}>
              <div className={Styles["message-tail"]}></div>
              <div className={Styles["message-wrapper"]}>
                <span>
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit...
                </span>
              </div>
            </div>
            <div className={Styles["customer-container"]}>
              <div className={Styles["customer-avatar-wrapper"]}>
                <Image
                  src={images.image19}
                  alt=""
                  className={Styles["avatar"]}
                />
              </div>
              <div className={Styles["customer-name-position-container"]}>
                <span className={Styles["name"]}>Ông: Nguyễn Văn Hùng</span>
                <span className={Styles["position"]}>Giám đốc kỳ lân Momo</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerFeedBack;

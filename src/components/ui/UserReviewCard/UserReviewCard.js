import React from "react";
import Styles from "./styles.module.css";
import { useRef } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import images from "@/assets/images";
import Image from "next/image";
import { memo } from "react";
import { Button } from "antd";
import Link from "next/link";
import { Rating } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { DeleteUserReview } from "@/api/user/deleteUserReview";

function UserReviewCard(props) {
  const router = useRouter();
  const { review } = props;

  const handleGoToComment = () => {
    router.push({
      pathname: "/product/" + review.product_id,
      query: {
        nav: "danhGia",
      },
    });
  };

  const handleClickDeleteBtn = () => {
    const message = DeleteUserReview(review.review_id);
    console.log(message);
  };

  return (
    <>
      <div className={Styles["purchase-item-container"]}>
        {/* <div className={Styles["item-status-container"]}>
          <Button onClick={handleGoToComment} type="primary">
            Xem Đánh giá
          </Button>
          <Button type="primary" danger onClick={handleClickDeleteBtn}>
            Xoá đánh giá
          </Button>

          <div className={Styles["item-status-wrapper"]}>
            <span className={Styles["item-status-wrapper"]}>
              <MoreHorizOutlinedIcon />
            </span>
            <span style={{ marginLeft: "10px" }}>
              Báo cáo đang được phê duyệt
            </span>
          </div>
        </div> */}

        <div className={Styles["item-info-container"]}>
          <div className={Styles["img-name-container"]}>
            <div className={Styles["img-wrapper"]}>
              {review.account.avatar != null ? (
                <Image
                  width={70}
                  height={70}
                  src={review.account.avatar}
                  alt=""
                  priority={true}
                  className={Styles["img"]}
                />
              ) : (
                <Image
                  width={70}
                  height={70}
                  src={images.nonImg}
                  alt=""
                  priority={true}
                  className={Styles["img"]}
                />
              )}
            </div>
            <div className={Styles["name-wrapper"]}>
              <span
                style={{ fontSize: "18px", fontWeight: "600", color: "black" }}
              >
                {review.account.username}
              </span>
              <Rating
                value={parseInt(review.rating)}
                precision={0.5}
                readOnly
                size="small"
              />

              <span style={{ color: "black" }}>
                {dayjs(review.createAt).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className={Styles["content-container"]}>
          <span>{review.content}</span>

          {review.picture && (
            <Image
              src={review.picture}
              width={130}
              height={130}
              alt=""
              priority
              style={{ borderRadius: "5px" }}
            />
          )}
          <div className={Styles["product-info-container"]}>
            {review.product.image ? (
              <Image
                src={review.product.image}
                width={60}
                height={60}
                alt=""
                priority
                style={{ borderRadius: "5px" }}
              />
            ) : (
              <Image
                src={images.nonImg}
                width={60}
                height={60}
                alt=""
                priority
                style={{ borderRadius: "5px" }}
              />
            )}

            <Link
              href={"/product/" + review.product.product_id}
              className={Styles["product-name"]}
              style={{ height: "100%", display: "flex", alignItems: "center" }}
            >
              {review.product.name}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UserReviewCard);

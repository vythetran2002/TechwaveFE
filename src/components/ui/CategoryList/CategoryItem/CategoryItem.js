import React from "react";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import Link from "next/link";
import { useRouter } from "next/router";

function CategoryItem(props) {
  return (
    <>
      <Link
        href={{
          pathname: "/cate/[slug]",
          query: { slug: props.cateId },
        }}
        className={Styles["cate-item-container"]}
      >
        <div className={Styles["cate-img-wrapper"]}>
          {props.img != null ? (
            <>
              <Image
                src={props.img}
                alt=""
                priority={true}
                width={100}
                height={100}
                className={Styles["cate-img"]}
              />
            </>
          ) : (
            <>
              <Image
                style={{ borderRadius: "50%" }}
                src={images.nonImg}
                alt=""
                priority={true}
                className={Styles["cate-img"]}
              />
            </>
          )}
          {/* <Image
            src={images.cate}
            alt=""
            priority={true}
            className={Styles["cate-img"]}
          /> */}
        </div>
        <span style={{ marginTop: "10px" }} className={Styles["cate-name"]}>
          {props.name}
        </span>
      </Link>
    </>
  );
}

export default CategoryItem;

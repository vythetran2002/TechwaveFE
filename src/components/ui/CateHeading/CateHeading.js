import React, { useContext } from "react";
import Styles from "./styles.module.css";
import Link from "next/link";
import useFetchCate from "@/api/useFetch";

function CateHeading(props) {
  if (props.isError) return <div>Lỗi khi tải dữ liệu</div>;
  if (props.isLoading) return <div>Đang tải...</div>;
  return (
    <>
      <section className={Styles["heading-wrapper"]}>
        {!props.trendingTitle ? (
          <div className={Styles["heading-container"]}>
            {props.cateTitle && (
              <Link
                className={Styles["cate-heading"]}
                href={"/cate/" + props.cateTitle.listCate.category_id}
              >
                {props.cateTitle && props.cateTitle.listCate.name}
              </Link>
            )}

            {/* <div className={Styles["buttons-container"]}>
            <button className={Styles["button"]}>ABC</button>
            <button className={Styles["button"]}>ABC</button>
          </div> */}
          </div>
        ) : (
          <div className={Styles["heading-container"]} ref={props.trendingRef}>
            <span className={Styles["cate-heading"]}>
              {props.trendingTitle}
            </span>

            {/* <div className={Styles["buttons-container"]}>
            <button className={Styles["button"]}>ABC</button>
            <button className={Styles["button"]}>ABC</button>
          </div> */}
          </div>
        )}
      </section>
    </>
  );
}

export default CateHeading;

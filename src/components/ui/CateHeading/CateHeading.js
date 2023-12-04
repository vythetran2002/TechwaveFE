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
            <button className={Styles["button"]}>{props.miniCate1}</button>
            <button className={Styles["button"]}>{props.miniCate2}</button>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default CateHeading;

import React, { use, useEffect } from "react";
import Styles from "../styles.module.css";
import Link from "next/link";
import { memo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "antd";

const NavCate = (props) => {
  if (props.error) return <div>Lỗi khi tải dữ liệu</div>;
  if (props.loading) return <div>Đang tải...</div>;
  return (
    <>
      <div className={Styles["nav-cate-container"]}>
        {props.data &&
          props.data.map((cate, index) => {
            return (
              <React.Fragment key={"nav-cate" + index}>
                <div className={Styles["nav-cate-item"]}>
                  <Link
                    href={`/cate/` + cate.category_id}
                    className={Styles["link"]}
                  >
                    {cate.name}
                  </Link>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
};

export default NavCate;

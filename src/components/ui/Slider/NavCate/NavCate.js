import React, { use, useEffect } from "react";
import Styles from "../styles.module.css";
import Link from "next/link";
import { memo } from "react";
import dynamic from "next/dynamic";
import Skeleton from "@mui/material/Skeleton";
import UserErrorUI from "../../UserErrorUI/UserErrorUI";

const NavCate = (props) => {
  // if (props.error) return <div>Lỗi khi tải dữ liệu</div>;
  // if (props.loading) return <div>Đang tải...</div>;
  const temp = "loading";
  return (
    <div className={Styles["nav-cate-container"]}>
      {props.loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={291}
          height={500}
        />
      ) : (
        <>
          {props.error ? (
            <UserErrorUI />
          ) : (
            <>
              {props.data &&
                props.data.map((cate, index) => {
                  return (
                    <React.Fragment key={"nav-cate" + index}>
                      <Link
                        href={`/cate/` + cate.category_id}
                        className={Styles["nav-cate-item"]}
                      >
                        <span className={Styles["link"]}>{cate.name}</span>
                      </Link>
                    </React.Fragment>
                  );
                })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NavCate;

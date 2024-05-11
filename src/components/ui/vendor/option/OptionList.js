import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import OptionItem from "./OptionItem";
import { Pagination } from "@mui/material";
import useFetchAllProduct from "@/api/vendor/useFetchAllProduct";
import { useRouter } from "next/router";
import useFetchOptionByProductId from "@/api/vendor/useFetchOptionByProductId";
import { Empty } from "antd";

function OptionList(props) {
  const router = useRouter();
  const slug = router.query.slug;
  const options = useFetchOptionByProductId(slug);

  // console.log(options.data.data);

  if (options.isError) return <>Error</>;
  if (options.isLoading) return <>Loading</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>id</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Hình ảnh</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Tên</span>
              <SortOutlinedIcon />
            </div>
            {/* <div className={Styles["fullname-wrapper"]}>
            <span className={Styles["head-title"]}>Tên danh mục</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["email-wrapper"]}>
            <span className={Styles["head-title"]}>Danh mục cha</span>
            <SortOutlinedIcon />
          </div>
          <div className={Styles["dob-wrapper"]}>
            <span className={Styles["head-title"]}>Ngày tạo</span>
            <SortOutlinedIcon />
          </div> */}
          </div>
          {options.data ? (
            options.data.data.lenght != 0 ? (
              options.data.data.map((option, index) => {
                return (
                  <React.Fragment key={"option" + index}>
                    <OptionItem
                      productId={props.productId}
                      token={props.token}
                      setOption={props.setOption}
                      option={option}
                      mutate={options.mutate}
                      handleOpenDialog={props.handleOpenDialog}
                    />
                  </React.Fragment>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Empty />
              </div>
            )
          ) : (
            <>
              <Empty />
            </>
          )}
        </div>

        <div className={Styles["item-pagination-container"]}>
          <Pagination count={1} size="large" />
        </div>
      </>
    );
}

export default OptionList;

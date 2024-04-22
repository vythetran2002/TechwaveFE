import React from "react";
import Styles from "./styles.module.css";
import { useEffect } from "react";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import CateItem from "./CateItem";
import { Pagination } from "@mui/material";
import useFetch from "@/api/useFetch";
import useFetchAdminCategories from "@/api/admin/useFetchCategories";
import { Empty } from "antd";

function CateList(props) {
  const { limit, page, token, updateMax } = props;
  // const cates = useFetch("http://localhost:3000/api/category/");
  const cates = useFetchAdminCategories(page, limit, token);
  // console.log(cates);

  const handleMutate = () => {
    cates.mutate();
  };

  useEffect(() => {
    if (cates.data) {
      updateMax(cates.data.total);
    }
  }, [cates.data]);

  if (cates.isLoading) {
    return <>Loading</>;
  }
  if (cates.isError) {
    return <>Error</>;
  } else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>ID</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Tên danh mục</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Hình ảnh</span>
            </div>
            <div className={Styles["dob-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày tạo</span>
              <SortOutlinedIcon />
            </div>
          </div>
          {cates.data.results.length != 0 ? (
            cates.data.results.map((cate, index) => {
              return (
                <React.Fragment key={"cate" + index}>
                  <CateItem
                    mutate={handleMutate}
                    updateCate={props.updateCate}
                    updateId={props.updateId}
                    cate={cate}
                    token={props.token}
                    handleOpenDetailDialog={props.handleOpenDetailDialog}
                    handleOpenDialog={props.handleOpenDialog}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <div style={{ padding: "20px 0 20px 0" }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </>
    );
}

export default CateList;

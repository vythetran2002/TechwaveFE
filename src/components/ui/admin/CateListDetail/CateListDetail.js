import React from "react";
import Styles from "./styles.module.css";
import { useEffect } from "react";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import CateItem from "./CateItemDetail";
import { Pagination } from "@mui/material";
import useFetch from "@/api/useFetch";
import useFetchAdminCategories from "@/api/admin/useFetchCategories";
import { Empty } from "antd";
import CateItemDetail from "./CateItemDetail";
import { useRouter } from "next/router";
import useFetchCateGoryDetail from "@/api/admin/useFetchCategoryDetail";

function CateListDetail(props) {
  const router = useRouter();
  const id = router.query.slug;
  const { limit, page, token, updateMax } = props;

  // const cates = useFetch("http://localhost:3000/api/category/");
  const cates = useFetchCateGoryDetail(id, page, limit, token);
  console.log(cates);

  useEffect(() => {
    if (cates.data) {
      console.log("---");

      updateMax(cates.data.cate_child.total);
      props.updateCateHeading(cates.data.name);
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
              <span className={Styles["head-title"]}>Tên danh mục con</span>
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
          {cates.data.cate_child ? (
            cates.data.cate_child.results.length != 0 ? (
              cates.data.cate_child.results.map((cate, index) => {
                return (
                  <React.Fragment key={"cate" + index}>
                    <CateItemDetail
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
            )
          ) : (
            <div style={{ padding: "20px 0 20px 0" }}>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </div>
      </>
    );
}

export default CateListDetail;

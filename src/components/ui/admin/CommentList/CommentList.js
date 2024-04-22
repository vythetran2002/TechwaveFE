import React from "react";
import { useEffect } from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { Empty } from "antd";
import useFetchCommentAdmin from "@/api/admin/useFetchCommentAdmin";
import CommentItemAdmin from "./CommentItem";
import { Toaster } from "react-hot-toast";

function CommentListAdmin(props) {
  const { limit, page, token, updateMax, status } = props;
  // const reports = useFetchAdminReport(status, page, limit, token);
  const cmts = useFetchCommentAdmin();
  const handleMutate = () => {
    cmts.mutate();
  };
  // console.log(reports);
  // useEffect(() => {
  //   if (reports.data) {
  //     console.log("---");
  //     updateMax(reports.data.total);
  //   }
  // }, [reports.data]);
  if (cmts.isLoading) return <>Loading</>;
  if (cmts.isError) return <>Error</>;
  else
    return (
      <>
        <Toaster />
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>Tài khoản đánh giá</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>Sản phẩm đánh giá</span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>Đánh giá</span>
            </div>

            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>Ngày đánh giá</span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>Hành động</span>
            </div>
          </div>
          {cmts.data.length != 0 ? (
            cmts.data.map((cmt, index) => {
              return (
                <React.Fragment key={"report" + index}>
                  <CommentItemAdmin
                    mutate={handleMutate}
                    status={props.status}
                    updateId={props.updateId}
                    cmt={cmt}
                    handleOpenDialog={props.handleOpenDialog}
                    token={props.token}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Empty
                image={
                  "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                }
              />
            </div>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={2} size="large" />
        </div> */}
      </>
    );
}

export default CommentListAdmin;

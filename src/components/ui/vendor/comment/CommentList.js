import React from "react";
import Styles from "./styles.module.css";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import ReportItem from "./CommentItem";
import { Pagination } from "@mui/material";
import CommentItem from "./CommentItem";
import { useEffect } from "react";
import useFetchComment from "@/api/vendor/useFetchComment";
import { Empty } from "antd";
import { Textfit } from "react-textfit";

function CommentList(props) {
  const { status, limit, page, token, updateMax } = props;

  const comments = useFetchComment(status, page, limit, token);

  useEffect(() => {
    if (comments.data) {
      updateMax(comments.data.total);
    }
  }, [comments.data]);

  if (comments.isLoading) return <>Loading</>;
  if (comments.isError) return <>Error</>;
  else
    return (
      <>
        <div className={Styles["item-list-container"]}>
          <div className={Styles["item-list-heading-container"]}>
            <div className={Styles["id-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single"> Tài khoản</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["fullname-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Sản phẩm</Textfit>
              </span>
            </div>
            <div className={Styles["email-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Nội dung</Textfit>
              </span>
            </div>

            <div className={Styles["gender-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Ngày đánh giá</Textfit>
              </span>
              <SortOutlinedIcon />
            </div>
            <div className={Styles["status-wrapper"]}>
              <span className={Styles["head-title"]}>
                <Textfit mode="single">Hành động</Textfit>
              </span>
            </div>
          </div>
          {comments.data.results.length != 0 ? (
            comments.data.results.map((comment, index) => {
              return (
                <React.Fragment key={"comment" + index}>
                  <CommentItem
                    status={props.status}
                    updateId={props.updateId}
                    comment={comment}
                    handleOpenDialog={props.handleOpen}
                  />
                </React.Fragment>
              );
            })
          ) : (
            <div style={{ padding: "20px" }}>
              <Empty />
            </div>
          )}
        </div>
        {/* <div className={Styles["item-pagination-container"]}>
          <Pagination count={2} size="large" />
        </div> */}
      </>
    );
}

export default CommentList;

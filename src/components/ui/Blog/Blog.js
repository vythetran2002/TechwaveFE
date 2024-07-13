import React, { useState } from "react";
import Styles from "./styles.module.css";
import { memo } from "react";
import { Empty, Typography } from "antd";

function HtmlContent({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
}

function Blog(props) {
  if (props.content) {
    return (
      <>
        <div className={Styles["blog-container"]}>
          <article className={`${Styles["blog-wrapper"]} ql-editor`}>
            <HtmlContent htmlString={props.content} />
          </article>
        </div>
      </>
    );
  } else {
    return (
      <div className={Styles["blog-container"]}>
        <article
          className={Styles["blog-wrapper"]}
          style={{ justifyContent: "center" }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 60,
            }}
            description={
              <Typography.Text style={{ opacity: "0.7" }}>
                Sản phẩm chưa có mô tả
              </Typography.Text>
            }
          ></Empty>
        </article>
      </div>
    );
  }
}

export default memo(Blog);

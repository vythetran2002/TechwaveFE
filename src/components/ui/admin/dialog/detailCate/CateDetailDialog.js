import React from "react";
import { Roboto } from "next/font/google";
import Styles from "./styles.module.css";
import Image from "next/image";
import images from "@/assets/images";
import useFetch from "@/api/useFetch";
import { Empty } from "antd";
import dayjs from "dayjs";

const roboto = Roboto({
  weight: ["300", "100", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

function CateDetailDialog(props) {
  const { id } = props;
  const cate = useFetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id
  );

  if (cate.isLoading) {
    return <>Loading</>;
  }
  if (cate.isError) {
    return <>Error</>;
  } else
    return (
      <div className={roboto.className}>
        <div className={Styles["table-row"]}>
          <div className={Styles["table-col"]}>ID</div>
          <div className={Styles["table-col"]}>Tên danh mục con</div>
          <div className={Styles["table-col"]}>Ảnh</div>
          <div className={Styles["table-col"]}>Ngày tạo</div>
          <div className={Styles["table-col"]}>Người tạo</div>
        </div>
        {cate.data.listCate.cate_child != null ? (
          cate.data.listCate.cate_child.length != 0 ? (
            cate.data.listCate.cate_child.map((cateChild, index) => {
              return (
                <React.Fragment key={"cateChild" + index}>
                  <div className={Styles["table-row-content"]}>
                    <div className={Styles["table-col"]}>
                      {cateChild.category_id}
                    </div>
                    <div className={Styles["table-col"]}>{cateChild.name}</div>
                    <div className={Styles["table-col"]}>
                      {cateChild.image != null ? (
                        <>
                          <Image
                            width={100}
                            height={100}
                            alt=""
                            priority
                            src={cateChild.image}
                          />
                        </>
                      ) : (
                        <>
                          <Image
                            width={100}
                            height={100}
                            alt=""
                            priority
                            src={images.nonImg}
                          />
                        </>
                      )}
                    </div>
                    <div className={Styles["table-col"]}>
                      {cateChild.createAt ? (
                        <>{dayjs(cateChild.createAt).format("DD/MM/YYYY")}</>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className={Styles["table-col"]}>
                      {cateChild.createBy}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
            <div className={Styles["table-row-content"]}>
              <Empty />
            </div>
          )
        ) : (
          <div className={Styles["table-row-content"]}>
            <Empty />
          </div>
        )}
      </div>
    );
}

export default CateDetailDialog;

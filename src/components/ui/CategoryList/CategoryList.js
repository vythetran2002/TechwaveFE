import React from "react";
import Styles from "./styles.module.css";
import CategoryItem from "./CategoryItem/CategoryItem";
import useSWR from "swr";
import useFetch from "@/api/useFetch";
import UserLoadingUI from "../UserLoadingUI/UserLoadingUI";
import UserErrorUI from "../UserErrorUI/UserErrorUI";

const CategoryList = () => {
  // const { data, error, isLoading } = useSWR(
  //   fetcher
  // );

  const data = useFetch(process.env.NEXT_PUBLIC_API_URL + "/api/category");

  if (data.isError) return <UserErrorUI />;
  if (data.isLoading)
    return (
      <div>
        <UserLoadingUI />
      </div>
    );

  return (
    <>
      <section className={Styles["cate-list-container"]}>
        <div className={Styles["cate-list-wrapper"]}>
          <div className={Styles["cate-list-heading-wrapper"]}>DANH MỤC</div>
          <div className={Styles["cate-list-item-container"]}>
            {data.data &&
              data.data.map((cate, index) => {
                return (
                  <React.Fragment key={"cate" + index}>
                    <CategoryItem
                      img={cate.image}
                      name={cate.name}
                      cateId={cate.category_id}
                    />
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

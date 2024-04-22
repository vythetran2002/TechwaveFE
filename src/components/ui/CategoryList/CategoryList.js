import React from "react";
import Styles from "./styles.module.css";
import CategoryItem from "./CategoryItem/CategoryItem";
import useSWR from "swr";
import useFetch from "@/api/useFetch";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const CategoryList = () => {
  // const cateList = UseFetchCate("http://localhost:3000/api/category/");
  // const { data, error, isLoading } = useSWR(
  //   "http://localhost:3000/api/category/",
  //   fetcher
  // );

  const data = useFetch("http://localhost:3000/api/category");

  if (data.isError) return <div>Lỗi khi tải dữ liệu</div>;
  if (data.isLoading) return <div>Đang tải...</div>;

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
            {/* <CategoryItem name="Thời trang nam" />
            <CategoryItem name="Điện thoại & phụ kiện" />
            <CategoryItem name="Thiết Bị Điện Tử" />
            <CategoryItem name="Máy Tính & Laptop" />
            <CategoryItem name="Máy Ảnh & Máy Laptop" />
            <CategoryItem name="Đồng Hồ" />
            <CategoryItem name="Giày Dép Nam" />
            <CategoryItem name="Thiết Bị Điện Gia Dụng" />
            <CategoryItem name="Thể Thao & Du Dịch" />
            <CategoryItem name="Ô Tô & Xe Máy & Xe Đạp" />
            <CategoryItem name="Thời Trang Nữ" />
            <CategoryItem name="Mẹ Và Bé" />
            <CategoryItem name="Nhà Cửa & Đời Sống" />
            <CategoryItem name="Sắc Đẹp" />
            <CategoryItem name="Sức Khoẻ" />
            <CategoryItem name="Giày Dép Nữ" />
            <CategoryItem name="Túi Ví Nữ" />
            <CategoryItem name="Phụ Kiện & Trang Sức Nữ" />
            <CategoryItem name="Bách Hoá Online" />
            <CategoryItem name="Nhà Sách Online" /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

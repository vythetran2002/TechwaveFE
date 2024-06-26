import React, { useState, createContext } from "react";
import Layout from "@/components/layout/Layout";
import Head from "next/head";
import Slider from "@/components/ui/Slider/Slider";
import ServiceList from "@/components/ui/ServiceList/ServiceList";
import CateHeading from "@/components/ui/CateHeading/CateHeading";
import ItemList from "@/components/ui/ItemList/ItemList";
import AdBar from "@/components/ui/AdBar/AdBar";
import images from "@/assets/images";
import StoreImageHeading from "@/components/ui/StoreImageHeading/StoreImageHeading";
import StoreList from "@/components/ui/StoreList/StoreList";
import CustomerFeedBack from "@/components/ui/CustomerFeedBack/CustomerFeedBack";
import Map from "@/components/ui/Map/Map";
import { FloatButton } from "antd";
import CategoryList from "@/components/ui/CategoryList/CategoryList";
import ItemDetail from "@/components/ui/ItemList/Item/ItemDetail/ItemDetail";
import toast, { Toaster } from "react-hot-toast";
import { addFavouriteProduct } from "@/api/user/addFavouriteProduct";
import { addCartItem } from "@/api/user/addCartItem";
import { useRouter } from "next/router";
import useFetchProductByCateId from "@/api/products/useFetchProductByCateId";
import useFetchCart from "@/api/user/useFetchCart";
import Cookies from "js-cookie";
import ChatBotWidget from "@/components/ui/ChatBotWidget/ChatBotWidget";

function Index() {
  const token = Cookies.get("token");
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [detailItem, setDeTailItem] = useState(null);
  const { mutate } = useFetchCart();
  const cateList01 = useFetchProductByCateId(2);
  // console.log(cateList01);
  const cateList02 = useFetchProductByCateId(19);
  const cateList03 = useFetchProductByCateId(4);
  const route = useRouter();

  const handlingOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handlingCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const mutateCateList01 = () => {
    cateList01.mutate();
  };
  const mutateCateList02 = () => {
    cateList02.mutate();
  };

  const mutateCateList03 = () => {
    cateList03.mutate();
  };

  const handlingAddFavouriteProduct = async (id) => {
    const message = await addFavouriteProduct(id, token);
  };

  const handlingAddCartItem = async (data) => {
    try {
      const message = await addCartItem(data, token);
      await mutate();
      // console.log(data);
      if (message) {
        toast.success("Đã thêm vào giỏ");
      } else {
        toast.error("Cần đăng nhập");
        route.push("/auth/login");
      }
    } catch (error) {
      toast.error("Cần đăng nhập");
      route.push("/auth/login");
    }
  };

  return (
    <>
      <Head>
        <title>Techwave</title>
      </Head>
      <Layout>
        <Toaster />
        <CategoryList />
        <Slider />
        <ServiceList />
        <CateHeading
          cateTitle={cateList01.data}
          loading={cateList01.isLoading}
          error={cateList01.isError}
        />

        <ItemList
          mutate={mutateCateList01}
          token={token}
          items={cateList01.data}
          loading={cateList01.isLoading}
          error={cateList01.isError}
          isOpenDialog={isOpenDialog}
          handlingOpenDialog={handlingOpenDialog}
          handlingCloseDialog={handlingCloseDialog}
          setDeTailItem={setDeTailItem}
          itemKey="list01"
          addFavourite={handlingAddFavouriteProduct}
          addCartItem={handlingAddCartItem}
        />
        <AdBar src={images.image9} />
        <CateHeading
          cateTitle={cateList02.data}
          loading={cateList02.isLoading}
          error={cateList02.isError}
        />
        <ItemList
          mutate={mutateCateList02}
          token={token}
          items={cateList02.data}
          loading={cateList02.isLoading}
          error={cateList02.isError}
          isOpenDialog={isOpenDialog}
          setDeTailItem={setDeTailItem}
          handlingOpenDialog={handlingOpenDialog}
          handlingCloseDialog={handlingCloseDialog}
          itemKey="list02"
          addFavourite={handlingAddFavouriteProduct}
          addCartItem={handlingAddCartItem}
        />
        <AdBar src={images.image11} />
        <CateHeading
          cateTitle={cateList03.data}
          loading={cateList03.isLoading}
          error={cateList03.isError}
        />

        <ItemList
          mutate={mutateCateList03}
          token={token}
          items={cateList03.data}
          loading={cateList03.isLoading}
          error={cateList03.isError}
          isOpenDialog={isOpenDialog}
          setDeTailItem={setDeTailItem}
          handlingOpenDialog={handlingOpenDialog}
          handlingCloseDialog={handlingCloseDialog}
          itemKey="list03"
          addFavourite={handlingAddFavouriteProduct}
          addCartItem={handlingAddCartItem}
        />
        <StoreImageHeading title="HÌNH ẢNH CỬA HÀNG" />
        <StoreList />
        <StoreImageHeading title="KHÁCH HÀNG NÓI GÌ?" />
        <CustomerFeedBack />
        <Map />
        <ItemDetail
          // updateImg={setImg}
          addCartItem={handlingAddCartItem}
          item={detailItem}
          isOpenDialog={isOpenDialog}
          handlingOpenDialog={handlingOpenDialog}
          handlingCloseDialog={handlingCloseDialog}
        />
        <ChatBotWidget />
        {/* <FloatButton.BackTop /> */}
      </Layout>
    </>
  );
}

export default Index;

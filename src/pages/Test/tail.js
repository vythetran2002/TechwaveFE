import React from "react";
import { renderToString } from "react-dom/server";
import PaymentItem from "@/components/ui/PaymentItem/PaymentItem";
import PurchaseItemCard from "@/components/ui/PurchaseItemCard/PurchaseItemCard";

const obj = {
  bill_id: 108,
  user: {
    avatar:
      "https://res.cloudinary.com/dspnvohki/image/upload/v1720107890/techwave/ojdlx6yde3fxy1irizay.jpg",
    province: "Đắk Lắk",
    district: "Huyện Cư Kuin",
    ward: "Xã Ea Ning",
    fullname: "Vy vy vy",
    phone: "0336289854",
    address: "277 chu van an Xã Ea Ning Huyện Cư Kuin Đắk Lắk",
  },
  totalBill: 236000,
  payment: "Thanh toán khi nhận hàng",
  createAt: "2024-07-05T16:25:24.000Z",
  status: 2,
  shopname: "Shop01",
  paid: false,
  payment_id: null,
  shop_bill_id: [
    {
      cart: {
        cart_id: 62,
        product: {
          product_id: 33,
          name: "Bóng 2030 GeruStar",
          image:
            "https://res.cloudinary.com/dspnvohki/image/upload/v1720107404/techwave/heb4siyml9ugn4vu0t58.jpg",
        },
        option: null,
        quantity: 1,
      },
      price: 250000,
      price_desc: 230000,
      status: "1",
    },
  ],
};

function Tail() {
  return <>{/* <PurchaseItemCard  /> */}</>;
}

export default Tail;

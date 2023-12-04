import React from "react";
import UserHeader from "../global/Header/user/Header";

export default function UserLayout({ children }) {
  return (
    <>
      <UserHeader />
      <main>{children}</main>
    </>
  );
}

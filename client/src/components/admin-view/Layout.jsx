import React, { useState } from "react";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

import Header_admin from "./Header_admin";

const LayoutAdmin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div>
      <Header_admin setOpen={setOpenSidebar}></Header_admin>
      abcjsfdslmnd
      <SideBar open={openSidebar} setOpen={setOpenSidebar}></SideBar>
      <Outlet></Outlet>
    </div>
  );
};

export default LayoutAdmin;

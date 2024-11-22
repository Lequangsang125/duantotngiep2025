import React, { useState } from "react";
import SideBar from "./SideBar";

import { Outlet } from "react-router-dom";

import Header_admin from "./Header_admin";

const LayoutAdmin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <SideBar open={openSidebar} setOpen={setOpenSidebar}></SideBar>
      <div className="flex flex-1 flex-col">
        <Header_admin setOpen={setOpenSidebar}></Header_admin>
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;

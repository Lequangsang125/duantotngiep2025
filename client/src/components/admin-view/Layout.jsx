import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const LayoutAdmin = () => {
  return (
    <div className="flex min-h-screen w-full">
      <SideBar></SideBar>
      <div className="flex flex-1 flex-col">
        <Header></Header>
        <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const LayoutShoping = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      <Header></Header>
      <main className="flex flex-col w-full ">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default LayoutShoping;

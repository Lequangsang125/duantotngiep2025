import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";


const Header = () => {
  return (
    <Header className="flax items-center justify-center px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only"> Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button>
          <LogOut />
          dang xuat
        </Button>
      </div>
    </Header>
  );
};

export default Header;

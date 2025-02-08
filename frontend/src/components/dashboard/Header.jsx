import React from "react";
import MobileNavigation from "./MobileNavigation";
const Header = () => {
  return (
    <header className="w-full flex items-center justify-between md:justify-end px-5 py-5 md:px-8">
      <MobileNavigation />
      Header
    </header>
  );
};

export default Header;

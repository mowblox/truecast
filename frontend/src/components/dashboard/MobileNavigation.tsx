import React from "react";
import NavigationDrawer from "../Header/NavigationDrawer";
import { AlignLeft } from "lucide-react";

const MobileNavigation = () => {
  return (
    <NavigationDrawer Icon={AlignLeft}>
      <p>Water is wate</p>
    </NavigationDrawer>
  );
};

export default MobileNavigation;

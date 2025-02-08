import React, { ElementType, ReactNode } from "react";
import { Drawer, DrawerTrigger, DrawerContent } from "../ui/drawer";

const NavigationDrawer = ({
  children,
  Icon,
}: {
  children: ReactNode;
  Icon: ElementType;
}) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger>
          <Icon size={34} className="dark:text-white" />
        </DrawerTrigger>
        <DrawerContent className="bg-[#F9FAFB] dark:bg-[#070707]">
          <div className="py-24 px-7 flex flex-col gap-10">{children}</div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;

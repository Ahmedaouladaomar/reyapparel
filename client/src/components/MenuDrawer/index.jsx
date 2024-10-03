import { Divider } from "@mantine/core";
import classes from "./styles.module.css";
import MenuItem from "./MenuItem";
import { items } from "./data";
import { useState } from "react";

function MenuDrawer({ opened }) {
  const [isActive, setIsActive] = useState(location.pathname);
  return (
    <div className={opened ? "" : classes.shrink}>
      <Divider my="xs" c="gray" />
      <div className="flex flex-col py-3">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            path={item.path}
            label={item.label}
            opened={opened}
            Icon={item.Icon}
            isActive={isActive}
            setIsActive={setIsActive}
          />
        ))}
      </div>
    </div>
  );
}

export default MenuDrawer;

import { Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({
  path,
  label,
  opened,
  Icon,
  isActive,
  setIsActive,
}) {
  return (
    <Link className="my-1" to={path} onClick={() => setIsActive(path)}>
      <div
        className={`px-2 py-2 flex items-center rounded ${
          !opened && "justify-center"
        } gap-3 hover:bg-zinc-50 ${isActive == path && "bg-zinc-100"}`}
      >
        <Icon color="gray" size={opened ? 16 : 20} />
        <Text c="gray" size="sm" hidden={!opened}>
          {label}
        </Text>
      </div>
    </Link>
  );
}

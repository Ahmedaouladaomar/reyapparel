import { CloseButton, Input, Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const filters = [
  {
    value: "name",
    label: "Name",
  },
  {
    value: "description",
    label: "Description",
  },
  {
    value: "createdAt",
    label: "Time",
  },
];

export default function TableFilters({ search, setSearch, order, setOrder }) {
  return (
    <div className="flex gap-[10px]">
      <TextInput
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search"
        leftSection={<IconSearch />}
        rightSection={search && <CloseButton onClick={() => setSearch("")} />}
      />
      {order && setOrder && (
        <Select
          placeholder="Sort"
          onChange={(_value, option) => setOrder(option?.value)}
          value={order}
          data={filters}
        />
      )}
    </div>
  );
}

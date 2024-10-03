import React, { useEffect, useState } from "react";
import useAxios, { GET } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import PaginatedTable from "@/components/PaginatedTable";
import { Breadcrumbs, Flex, Space, Text } from "@mantine/core";
import { USERS } from "@/pages/routes";
import { ceilQuotient, getQueryString } from "@/helpers/string";
import TableFilters from "@/components/TableFilters";
import { ROLE } from "@/helpers/consts";
import { IconChevronRight, IconUserCheck, IconUserStar } from "@tabler/icons-react";

export default function ListUsers() {
  // custom hook
  const { response, loading, call } = useAxios(USERS, GET);
  // render
  const [render, setRender] = useState(true);
  // table data
  const [rows, setRows] = useState();
  // pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // search
  const [search, setSearch] = useState("");
  // sort
  const [order, setOrder] = useState("");
  // columns definition
  const columns = [
    { label: "Id", field: "id" },
    { label: "Firstname", field: "firstName" },
    { label: "Lastname", field: "lastName" },
    { label: "Email", field: "email" },
    {
      label: "Role",
      field: "role",
      renderer: (user, value) => {
        if (value == ROLE.customer) {
          return (
            <Flex
              className="border border-slate-200 rounded px-2 py-1"
              w="fit-content"
              align="center"
              gap={5}
            >
              <IconUserCheck size={16} />
              <Text>Customer</Text>
            </Flex>
          );
        }
        if (value == ROLE.admin) {
          return (
            <Flex
              className="border border-slate-200 rounded px-2 py-1"
              w="fit-content"
              align="center"
              gap={5}
            >
              <IconUserStar size={16} />
              <Text>Admin</Text>
            </Flex>
          );
        }
      },
    },
  ];

  const fetchUsers = () => {
    const query = getQueryString(rowsPerPage, page, search, order);
    const path = USERS.concat(query);
    call({ newPath: path });
  };

  // render
  useEffect(() => {
    fetchUsers();
  }, [render]);

  // fetching data
  useEffect(() => {
    // api call
    fetchUsers();
  }, [page]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchUsers();
  }, [rowsPerPage]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchUsers();
  }, [search]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchUsers();
  }, [order]);

  // total pages
  useEffect(() => {
    if (response && response.data) {
      let { count } = response.data;
      let total = ceilQuotient(count, rowsPerPage);
      setTotalPages(total);
    }
  }, [response]);

  // rows definition
  useEffect(() => {
    response && setRows(response.data?.rows);
  }, [response]);

  return (
    <div className="w-[100%] px-[30px] pt-20">
      <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
        <Text order={5}>Admin</Text>
        <Text c="gray">Users</Text>
      </Breadcrumbs>
      <CardContainer>
        <div>
          <Flex justify="space-between" align="center">
            <TableFilters
              search={search}
              setSearch={setSearch}
              order={order}
              setOrder={setOrder}
              columns={columns}
            />
          </Flex>
          <Space h="md" />
          <PaginatedTable
            rows={rows}
            columns={columns}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            page={page}
            setPage={setPage}
            performing={loading}
            render={render}
            setRender={setRender}
          />
        </div>
      </CardContainer>
    </div>
  );
}

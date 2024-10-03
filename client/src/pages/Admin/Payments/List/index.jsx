import React, { useContext, useEffect, useState } from "react";
import useAxios, { GET } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import PaginatedTable from "@/components/PaginatedTable";
import { Breadcrumbs, Flex, Space, Text } from "@mantine/core";
import { PAYMENTS } from "@/pages/routes";
import { ceilQuotient, getQueryString } from "@/helpers/string";
import TableFilters from "@/components/TableFilters";
import { IconChevronRight, IconUser } from "@tabler/icons-react";
import { Session } from "@/context/user";

export default function ListPayments() {
  // custom hook
  const { response, loading, call } = useAxios(PAYMENTS, GET);
  // user context
  const { state } = useContext(Session);
  const { user } = state;
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
  // columns definition
  const columns = [
    { label: "Id", field: "id" },
    { label: "Amount ($)", field: "amount" },
    { label: "Transaction date", field: "createdAt" },
    {
      label: "Customer",
      field: "order",
      renderer: (payment, value) => (
        <Flex
          className="border border-slate-200 rounded px-2 py-1"
          w="fit-content"
          align="center"
          gap={5}
        >
          <IconUser size={16} />
          <Text>{value.user.email}</Text>
        </Flex>
      ),
    },
  ];

  const fetchPayments = () => {
    const query = getQueryString(rowsPerPage, page, search);
    const path = PAYMENTS.concat(query);
    call({ newPath: path });
  };

  // render
  useEffect(() => {
    fetchPayments();
  }, [render]);

  // fetching data
  useEffect(() => {
    // api call
    fetchPayments();
  }, [page]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchPayments();
  }, [rowsPerPage]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchPayments();
  }, [search]);

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
    if (response && response.data && response.data.rows) {
      let rows = response.data.rows;
      setRows(rows);
    }
  }, [response]);

  return (
    <div className="w-[100%] px-[30px] pt-20">
      <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
        <Text order={5}>Admin</Text>
        <Text c="gray">Payments</Text>
      </Breadcrumbs>
      <CardContainer>
        <div>
          <Flex justify="space-between" align="center">
            <TableFilters
              search={search}
              setSearch={setSearch}
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

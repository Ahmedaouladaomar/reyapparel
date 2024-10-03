import React, { useContext, useEffect, useState } from "react";
import useAxios, { GET } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import PaginatedTable from "@/components/PaginatedTable";
import { Breadcrumbs, Flex, Space, Text } from "@mantine/core";
import { SHIPPING } from "@/pages/routes";
import { ceilQuotient, getQueryString } from "@/helpers/string";
import TableFilters from "@/components/TableFilters";
import { Session } from "@/context/user";
import { IconChevronRight } from "@tabler/icons-react";

export default function ListShipping() {
  // custom hook
  const { response, loading, call } = useAxios(SHIPPING, GET);
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
    { label: "Country", field: "country" },
    { label: "Line 1", field: "line1" },
    { label: "Line 2", field: "line2" },
    { label: "City", field: "city" },
    { label: "Postal code", field: "postalCode" },
  ];

  const fetchShipping = () => {
    const query = getQueryString(rowsPerPage, page, search);
    const path = SHIPPING.concat(query);
    call({ newPath: path });
  };

  // render
  useEffect(() => {
    fetchShipping();
  }, [render]);

  // fetching data
  useEffect(() => {
    // api call
    fetchShipping();
  }, [page]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchShipping();
  }, [rowsPerPage]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchShipping();
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
      <Breadcrumbs
        mb={65}
        separator={<IconChevronRight color="gray" size={16} />}
        separatorMargin={5}
      >
        <Text order={5}>Admin</Text>
        <Text c="gray">Shipping</Text>
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

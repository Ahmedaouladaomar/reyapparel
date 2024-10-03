import React, { useEffect, useState } from "react";
import useAxios, { GET } from "@/hooks/useAxios";
import CardContainer from "@/components/CardContainer";
import PaginatedTable from "@/components/PaginatedTable";
import { Breadcrumbs, Flex, Image, NavLink, Space, Text } from "@mantine/core";
import { ADD_PRODUCT, ADMIN, PRODUCT, PRODUCTS } from "@/pages/routes";
import { ceilQuotient, getQueryString } from "@/helpers/string";
import TableFilters from "@/components/TableFilters";
import { IconChevronRight } from "@tabler/icons-react";

export default function ListProducts() {
  // custom hook
  const { response, loading, call } = useAxios(PRODUCTS, GET);
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
    { label: "Name", field: "name" },
    { label: "Description", field: "description" },
    { label: "Price", field: "price" },
    {
      label: "Media",
      field: "imageURL",
      renderer: (id, value) => <Image h={40} w={40} src={value} />,
    },
  ];

  const fetchProducts = () => {
    const query = getQueryString(rowsPerPage, page, search, order);
    const path = PRODUCTS.concat(query);
    call({ newPath: path });
  };

  // render
  useEffect(() => {
    fetchProducts();
  }, [render]);

  // fetching data
  useEffect(() => {
    // api call
    fetchProducts();
  }, [page]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchProducts();
  }, [rowsPerPage]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchProducts();
  }, [search]);

  // fetching data
  useEffect(() => {
    setPage(1);
    // api call
    fetchProducts();
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
        <Text c="gray">Products</Text>
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
            <NavLink
              className="bg-zinc-200 text-gray-500 rounded-md hover:shadow-sm"
              w="fit-content"
              href={ADMIN.replace("/*", ADD_PRODUCT)}
              label="Add"
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
            editAction={{
              path: ADMIN.replace("/*", PRODUCT),
            }}
            deleteAction={{
              path: PRODUCT,
            }}
            render={render}
            setRender={setRender}
          />
        </div>
      </CardContainer>
    </div>
  );
}

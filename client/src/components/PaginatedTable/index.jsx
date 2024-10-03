import React from "react";
import {
  Button,
  Flex,
  LoadingOverlay,
  Pagination,
  Select,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconBook } from "@tabler/icons-react";
import Dialog from "../Dialog";
import useAxios, { DELETE } from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";

export default function PaginatedTable({
  rows,
  columns,
  rowsPerPage,
  setRowsPerPage,
  totalPages,
  page,
  setPage,
  performing,
  render,
  setRender,
  editAction,
  deleteAction,
}) {
  // navigation
  const navigate = useNavigate();
  // custom hook
  const { loading, call } = useAxios(null, null, {
    withProgressBar: true,
    withNotification: true,
  });

  // edit action handler
  const onEdit = async (id) => {
    navigate(editAction.path.replace(":id", id));
  };

  // delete action handler
  const onDelete = async (id) => {
    await call({
      newMethod: DELETE,
      newPath: deleteAction.path.replace(":id", id),
    });
    // rerender table
    setRender(!render);
  };

  return (
    <>
      <div className="border-solid border-[1px] text-zinc-500 border-gray-200 rounded-md shadow">
        <Table align="center" border={2}>
          <Table.Thead>
            <Table.Tr className="text-white bg-[#E7B421]">
              {columns &&
                columns.map((column) => (
                  <Table.Th key={column.field}>{column.label}</Table.Th>
                ))}
              {editAction && deleteAction && <Table.Th>Action</Table.Th>}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody pos="relative">
            {performing && (
              <Table.Tr>
                <Table.Td colSpan="100%">
                  <LoadingOverlay visible={performing} />
                </Table.Td>
              </Table.Tr>
            )}
            {rows && rows.length ? (
              rows.map((row, index) => (
                <Table.Tr key={row.id}>
                  {columns.map((column) => (
                    <Table.Td key={column.field}>
                      {column.renderer
                        ? column.renderer(row, row[column.field])
                        : row[column.field]}
                    </Table.Td>
                  ))}
                  {editAction && deleteAction && (
                    <Table.Td>
                      <Flex gap={10}>
                        <Button
                          size="xs"
                          color="gray"
                          variant="filled"
                          onClick={() => onEdit(row.id)}
                        >
                          Edit
                        </Button>
                        <Dialog
                          title="Delete action"
                          content="Are you sure you want to delete this item?"
                          size="xs"
                          color="red"
                          variant="filled"
                          label="Delete"
                          confirmAction={() => onDelete(row.id)}
                        />
                      </Flex>
                    </Table.Td>
                  )}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan="100%">
                  <Flex
                    className="py-10 text-zinc-200"
                    justify="center"
                    align="center"
                    gap={10}
                  >
                    <Title className="text-center">No records found</Title>
                    <IconBook size={40} />
                  </Flex>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </div>
      <div className="mt-[20px] flex justify-between items-center">
        <Pagination value={page} onChange={setPage} total={totalPages} />
        <Flex align="center" gap={10}>
          <Select
            w={100}
            data={[3, 5, 10]}
            placeholder={rowsPerPage}
            onChange={setRowsPerPage}
          />
          <Text c="gray" size="sm">
            rows per page
          </Text>
        </Flex>
      </div>
    </>
  );
}

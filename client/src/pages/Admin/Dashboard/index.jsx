import {
  Avatar,
  Breadcrumbs,
  Flex,
  NumberFormatter,
  Paper,
  Text,
} from "@mantine/core";
import FiguresCard from "@/components/FiguresCard";
import useAxios, { GET } from "@/hooks/useAxios";
import { ADMIN, ORDERS } from "@/pages/routes";
import { useContext, useEffect, useState } from "react";
import { Session } from "@/context/user";
import { capitalize } from "@/helpers/string";
import { IconChevronRight } from "@tabler/icons-react";

function Dashboard() {
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // custom hook
  const { call, response } = useAxios(ORDERS, GET);
  // render
  const [isRender, setIsRender] = useState(false);
  // data
  const [totalSales, setTotalSales] = useState(null);
  const [revenue, setRevenue] = useState(null);

  // first render
  useEffect(() => {
    call().then(() => setIsRender(true));
  }, []);

  // setting data
  useEffect(() => {
    if (isRender && response && response.data) {
      let { rows, count } = response.data;
      // number of sales
      setTotalSales(count);
      // revenue calculation
      let total = rows.reduce((acc, curr) => acc + curr.totalPrice, 0);
      setRevenue(total);
    }
  }, [response]);

  return (
    <div className="w-[100%] px-[30px] pt-20">
      <Breadcrumbs mb={65} separator={<IconChevronRight color="gray" size={16} />} separatorMargin={5}>
        <Text order={5}>Admin</Text>
        <Text c="gray">Dashboard</Text>
      </Breadcrumbs>
      <Flex direction="column" gap={20}>
        <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
          <Avatar size={50} radius={120} mx="auto" />
          <Text ta="center" fz="lg" fw={500} mt="md">
            {user.firstName} {user.lastName}
          </Text>
          <Text ta="center" c="dimmed" fz="sm">
            {capitalize(user.role)}
          </Text>
        </Paper>

        <Flex wrap="wrap" gap={20}>
          <FiguresCard
            title="Sales"
            description="Total number of sales"
            label="View details"
            url={ADMIN.replace("/*", ORDERS)}
            value={totalSales}
          />
          <FiguresCard
            title="Revenue"
            description="Generated revenue from sales"
            label="View details"
            url={ADMIN.replace("/*", ORDERS)}
            value={
              <NumberFormatter prefix="$ " value={revenue} thousandSeparator />
            }
          />
        </Flex>
      </Flex>
    </div>
  );
}

export default Dashboard;

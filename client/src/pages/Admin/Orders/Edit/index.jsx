import React, { useEffect, useState } from "react";
import { Select } from "@mantine/core";
import { ORDER_STATUS } from "@/helpers/consts";
import useAxios, { PATCH } from "@/hooks/useAxios";
import { ORDER_PATCH } from "@/pages/routes";

export default function OrderStatus({ order, status, className }) {
  // render
  const [isRender, setIsRender] = useState(false);
  // data
  const [data, setData] = useState(status);
  // custom hook
  const { call, response, loading } = useAxios(
    ORDER_PATCH.replace(":id", order?.id),
    PATCH,
    { withNotification: true }
  );
  // select options
  const options = [
    ORDER_STATUS.awaiting_fulfillment,
    ORDER_STATUS.awaiting_shipment,
    ORDER_STATUS.awaiting_pickup,
    ORDER_STATUS.completed,
  ];

  // first render
  useEffect(() => {
    setIsRender(true);
  }, []);

  // api call
  useEffect(() => {
    let body = {
      status: data,
      user: order?.user,
    };
    isRender && data && call({ body, delayMs: 500 });
  }, [data]);

  return (
    <div className={className}>
      <Select
        disabled={loading}
        defaultValue={data}
        data={options}
        onChange={setData}
      />
    </div>
  );
}

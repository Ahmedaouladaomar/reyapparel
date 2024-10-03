import { Accordion, Checkbox, Divider, Space, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useAxios, { GET } from "../../hooks/useAxios";

export const priceFilterOptions = [
  {
    value: "[min_price=80]",
    label: "More than 80$",
  },
  {
    value: "[min_price=40-max_price=80]",
    label: "40$ - 80$",
  },
  {
    value: "[min_price=10-max_price=40]",
    label: "10$ - 40$",
  },
  {
    value: "[max_price=10]",
    label: "Less than 10$",
  },
];

export default function PlpFilter({ title, path, options, values, setValues }) {
  // custo hook
  const { response, call } = useAxios(path, GET);
  // data
  const [data, setData] = useState(options || []);

  // first render
  useEffect(() => {
    // api call
    path && call();
  }, []);

  useEffect(() => {
    if (response && response.data && response.data.rows) {
      let { data } = response;
      let { rows } = data;
      let formattedRows = rows.map((item) => {
        return { 
          value: item.id, 
          label: item.name 
        };
      });
      setData(formattedRows);
    }
    
  }, [response]);

  return (
    <div className="pl-2 mb-2">
      <Text c="gray">
        <strong>{title}</strong>
      </Text>
      <div>
        {!!data.length &&
          data.map((item, index) => (
            <div key={index}>
              <Space h={10} />
              <Checkbox
                label={item.label}
                value={item.value}
                onChange={(e) => {
                  let value = e.target.value;
                  if (values.indexOf(value) === -1) {
                    setValues([...values, value]);
                    return;
                  }
                  // unselect
                  let newValues = [];
                  values.forEach((element) => {
                    if (element != value) newValues.push(element);
                  });
                  setValues([...newValues]);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

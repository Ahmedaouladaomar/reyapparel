import React, { useEffect, useState } from "react";
import PLP from "../PLP";
import { useParams } from "react-router-dom";
import useAxios, { GET } from "@/hooks/useAxios";
import { COLLECTION_PRODUCTS } from "@/pages/routes";
import { Skeleton } from "@mantine/core";

export default function CollectionPLP() {
  const { name } = useParams();
  // custom hook
  const { call } = useAxios(COLLECTION_PRODUCTS.replace(":name", name), GET);
  // collection id
  const [id, setId] = useState(null);

  useEffect(() => {
    if (name) {
      call().then((res) => {
        setId(res.data?.id);
      });
    }
  }, []);
  return (
    <>
      {name && id ? (
        <PLP name={name} id={id} />
      ) : (
        <div className="h-[80vh] bg-white" />
      )}
    </>
  );
}

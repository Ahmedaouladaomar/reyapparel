import React, { useContext, useEffect, useState } from "react";
import useAxios, { GET } from "@/hooks/useAxios";
import { COLLECTIONS, PRODUCTS_LIST } from "@/pages/routes";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import ProductCard from "@/components/ProductCard";
import { capitalize, getPlpQueryString } from "@/helpers/string";
import PlpFilter, { priceFilterOptions } from "@/components/PlpFilter";
import { IconBook, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { Session } from "@/context/user";
import { abortController } from "@/axios";

export default function PLP({ name, id }) {
  // custom hook
  const { call, loading } = useAxios(PRODUCTS_LIST, GET, {
    withProgressBar: true,
  });
  // context
  const { state } = useContext(Session);
  const { user } = state;
  // render
  const [isRendered, setIsRendered] = useState(false);
  // data
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  // filters
  const [filterOpen, setFilterOpen] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState(id ? [id] : []);
  const [priceFilter, setPriceFilter] = useState([]);
  // loading
  const [load, setLoad] = useState(false);
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  const fetchProducts = ({ rpp, p, delay }) => {
    let params = {
      rpp: rpp,
      p: p,
      price: priceFilter,
      collection: collectionFilter,
    };
    // path with params
    const query = getPlpQueryString(params);
    const path = PRODUCTS_LIST.concat(query);
    return call({
      newPath: path,
      signal: abortController.signal,
      delayMs: delay,
    });
  };

  const isEmpty = () => !products.length;
  const allDisplayed = () => totalProducts === products.length;

  const onLoadMore = async () => {
    // perform loading
    setLoad(true);
    // move to next page
    setPage(page + 1);
    // api call;
    const res = await fetchProducts({ rpp: pageSize, p: page + 1, delay: 500 });
    setProducts([...products, ...res.data?.rows]);
    // stop loading
    setLoad(false);
  };

  // first render
  useEffect(() => {
    fetchProducts({ rpp: pageSize, p: 1 }).then((res) => {
      // total
      setTotalProducts(res.data?.count);
      // reset products
      setProducts([...res.data?.rows]);
      // render
      setIsRendered(!isRendered);
    });

    // cleanup
    return () => {
      // cancel the request on unmount
      abortController.abort();
    };
  }, []);

  // filter data
  useEffect(() => {
    isRendered &&
      fetchProducts({ rpp: pageSize, p: 1 }).then((res) => {
        // reset page
        setPage(1);
        // total
        setTotalProducts(res.data?.count);
        // reset products
        setProducts([...res.data?.rows]);
      });

    // cleanup
    return () => {
      // cancel the request on unmount
      abortController.abort();
    };
  }, [priceFilter, collectionFilter]);

  return (
    <Box
      className="min-h-[100vh] relative bg-white py-[40px]"
      px={{ base: "md", lg: "xl" }}
    >
      <Breadcrumbs
        className="self-start"
        pb={50}
        separator={<IconChevronRight color="gray" size={16} />}
        separatorMargin={5}
      >
        {name && <Text c="gray">Collections</Text>}
        {name && <Text c="gray">{capitalize(name)}</Text>}
        {!name && <Text c="gray">Products</Text>}
        {!name && <Text c="gray">All</Text>}
      </Breadcrumbs>
      <Box>
        <Button
          px={0}
          c="dark"
          variant="transparent"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <Flex align="center" gap={5}>
            <Text c="dark">FILTER</Text>
            <IconChevronDown
              className={
                filterOpen ? "rotate-180 duration-500" : "duration-500"
              }
            />
          </Flex>
        </Button>
      </Box>
      <Divider h="md" my={10} />
      <Flex
        className="flex-col lg:flex-row gap-[10px] lg:justify-between"
        pb={20}
      >
        <Flex
          className={`${
            filterOpen
              ? "lg:w-[200px] lg:duration-500 opacity-100 h-auto"
              : "lg:w-[0px] lg:duration-500 -translate-x-[200px] h-0 opacity-0"
          } lg:flex lg:h-auto`}
          c="gray"
          direction="column"
        >
          <Flex direction="column">
            <PlpFilter
              title="Price"
              options={priceFilterOptions}
              values={priceFilter}
              setValues={setPriceFilter}
            />
            {!name && <Space h="sm" />}
            {!name && (
              <PlpFilter
                title="Collections"
                path={COLLECTIONS}
                values={collectionFilter}
                setValues={setCollectionFilter}
              />
            )}
          </Flex>
        </Flex>
        <div
          className={`${
            filterOpen ? "lg:w-[90%]" : "lg:w-[100%]"
          } flex flex-col items-center duration-500`}
        >
          <SimpleGrid
            className="px-0"
            cols={{ base: 1, sm: 2, lg: 4, xl: 5 }}
            spacing={{ base: 10, lg: 20 }}
            w="100%"
          >
            {loading ? (
              array.map((index) => (
                <Skeleton key={index} visible={true}>
                  <div className="m-auto duration-500 min-w-[100%] sm:min-w-auto lg:min-w-auto h-[350px]"></div>
                </Skeleton>
              ))
            ) : products && products.length ? (
              products.map((item, index) => (
                <div key={item.name}>
                  <ProductCard
                    className="m-auto duration-500 min-w-[100%] sm:min-w-auto lg:min-w-auto lg:h-[350px]"
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    imageURL={item.imageURL}
                    price={item.price}
                    variants={item.variants}
                    user={user}
                  />
                </div>
              ))
            ) : (
              <Flex
                className="py-10 text-zinc-200 w-[400px] max-lg:w-auto max-lg:p-0 max-lg:flex max-lg:flex-col"
                justify="center"
                align="center"
                gap={10}
              >
                <Title className="text-center">No records found</Title>
                <IconBook size={40} />
              </Flex>
            )}
          </SimpleGrid>
          <Flex mt={20} direction="column" align="center" gap={10}>
            {!isEmpty() && (
              <Text c="gray">
                {products.length} of {totalProducts} items
              </Text>
            )}
            {!allDisplayed() && !isEmpty() && (
              <Button loading={load} w="fit-content" onClick={onLoadMore}>
                Load more
              </Button>
            )}
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

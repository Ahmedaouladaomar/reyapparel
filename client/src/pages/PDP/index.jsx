import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios, { GET } from "@/hooks/useAxios";
import { PRODUCT_BY_NAME } from "@/pages/routes";
import imageErrorSrc from "@/images/image-not-found.png";
import classes from "./styles.module.css";
import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Image,
  NumberFormatter,
  Skeleton,
  Space,
  Text,
} from "@mantine/core";
import {
  IconCheckbox,
  IconChevronLeft,
  IconChevronRight,
  IconMinus,
  IconPlus,
  IconTruckDelivery,
} from "@tabler/icons-react";
import Slider from "react-slick";
import SizeVariant from "@/components/VariantPicker/SizeVariant";
import { Session } from "@/context/user";
import CartActionButton from "@/components/CartActionButton";
import CollectionCarousel from "@/components/CollectionsCarousel";
import { abortController } from "@/axios";

export default function PDP() {
  // param
  const { name } = useParams();
  // loading
  const [load, setLoad] = useState(false);
  // arrows for carousel
  const NextArrow = ({ currentSlide, slideCount, ...props }) => (
    <IconChevronRight {...props} color="gray" />
  );
  const PrevArrow = ({ currentSlide, slideCount, ...props }) => (
    <IconChevronLeft {...props} size={20} color="gray" />
  );
  // carousel settings
  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // other screens
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          vertical: false,
          verticalSwiping: false,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
    ],
  };
  // custom hook
  const { call } = useAxios(PRODUCT_BY_NAME.replace(":name", name), GET, {
    withProgressBar: true,
  });
  // user context
  const { state } = useContext(Session);
  const { user } = state;
  // data
  const [product, setProduct] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState(null);
  // images
  const isEmptyImages =
    !product || !product.imagesURL || !product.imagesURL.length;

  useEffect(() => {
    // api call
    call({ signal: abortController.signal }).then((res) => {
      // data
      setProduct(res?.data);
      // url of image to be displayed
      setImageSrc(res?.data?.imageURL);
    });

    // cleanup
    return () => {
      // cancel the request on unmount
      abortController.abort();
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="flex flex-col lg:flex-row">
        <div className={classes.media__container}>
          <div className="product__thumbnail basis-[20%] flex items-center">
            <Slider className={classes.slider} {...settings}>
              {product && !isEmptyImages
                ? [product.imageURL, ...product.imagesURL].map((url) => (
                    <div className="px-4" key={url}>
                      <Image
                        className={classes.slide}
                        h={100}
                        fit="cover"
                        src={url}
                        onClick={() => setImageSrc(url)}
                      />
                    </div>
                  ))
                : [1, 2, 3].map((url) => (
                    <div key={url}>
                      <Skeleton visible={true}>
                        <Image
                          className="cursor-pointer"
                          h={100}
                          fit="cover"
                          src={imageErrorSrc}
                          onClick={() => setImageSrc(url)}
                        />
                      </Skeleton>
                    </div>
                  ))}
            </Slider>
          </div>

          <Box className="product__media shadow-md basis-[80%]">
            <Skeleton visible={!imageSrc}>
              <Image
                classNames={{ root: "duration-1000" }}
                h={500}
                w="100%"
                fit="cover"
                src={imageSrc || imageErrorSrc}
              />
            </Skeleton>
          </Box>
        </div>
        <div className="prdouct-info__container basis-[40%] px-10 py-8">
          <div className="prdouct-info__title">
            {product ? (
              <Text className="title" size="xl" fw={700}>
                {product?.name.toUpperCase()}
              </Text>
            ) : (
              <Skeleton visible={true}>
                <Text className="title" size="xl" fw={700}>
                  Loading
                </Text>
              </Skeleton>
            )}
          </div>
          <div className="prdouct-info__price">
            <Skeleton visible={!product}>
              <Text className="price" size="xl">
                <NumberFormatter
                  prefix="$"
                  value={product?.price}
                  thousandSeparator
                />
              </Text>
            </Skeleton>
          </div>

          <Divider opacity={0.5} my="md" />

          <div className="prdouct-info__quantity">
            <Skeleton visible={!product}>
              <div className="total flex justify-between">
                <div
                  className={`items flex justify-between items-center px-1 border border-solid border-slate-300 rounded-sm w-[100px] ${
                    load && "bg-slate-100"
                  }`}
                >
                  <ActionIcon
                    variant="transparent"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={load}
                  >
                    <IconPlus height={18} color="gray" />
                  </ActionIcon>
                  <Text>{quantity}</Text>
                  <ActionIcon
                    variant="transparent"
                    onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                    disabled={load}
                  >
                    <IconMinus height={18} color="gray" />
                  </ActionIcon>
                </div>
              </div>
            </Skeleton>
          </div>

          <Divider opacity={0.5} my="md" />

          <div className="prdouct-info__variant-picker flex items-end gap-[10px] justify-between">
            <Skeleton visible={!product}>
              {product?.variants && !!product.variants.length && (
                <SizeVariant
                  select={true}
                  variants={product.variants}
                  setVariantId={setVariantId}
                />
              )}{" "}
            </Skeleton>
            <Skeleton visible={!product}>
              <CartActionButton
                user={user}
                variantId={variantId}
                variants={product?.variants}
                quantity={quantity}
                price={product?.price}
                load={load}
                setLoad={setLoad}
              />
            </Skeleton>
          </div>

          <Divider opacity={0.5} my="md" />

          <div className="prdouct-info__description flex flex-col">
            <Skeleton visible={!product}>
              <Text className="underline" fw={700}>
                DESCRIPTION
              </Text>
            </Skeleton>
            <Space h="md" />
            <Text>{product?.description}</Text>
          </div>

          <Divider opacity={0.5} my="md" />

          <div className="prdouct-info__shipping-info">
            <Skeleton visible={!product}>
              <Flex gap={10}>
                <IconTruckDelivery color="gray" />
                <Text c="gray">Shipping under 48h</Text>
              </Flex>
            </Skeleton>
          </div>
          <Space h="md" />
          <div className="prdouct-info__shipping-info">
            <Skeleton visible={!product}>
              <Flex gap={10}>
                <IconCheckbox color="gray" />
                <Text c="gray">Return within 7 days</Text>
              </Flex>
            </Skeleton>
          </div>
        </div>
      </div>

      <div className="explore-collections-section">
        <CollectionCarousel title="Disocver our collections" />
      </div>
    </div>
  );
}

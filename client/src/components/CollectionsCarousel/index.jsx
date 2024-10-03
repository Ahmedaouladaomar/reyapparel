import React, { useEffect, useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import Slider from "react-slick";
import { COLLECTIONS, COLLECTION_PLP } from "../../pages/routes";
import { CollectionCard } from "./CollectionCard";
import useAxios, { GET } from "../../hooks/useAxios";
import { Title } from "@mantine/core";

export default function CollectionCarousel({ title }) {
  // arrows for carousel
  const NextArrow = ({currentSlide, slideCount, ...props}) => (
    <IconChevronRight {...props} size={20} color="gray" />
  );
  const PrevArrow = ({currentSlide, slideCount, ...props}) => (
    <IconChevronLeft {...props} size={20} color="gray" />
  );
  // carousel settings
  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    verticalSwiping: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  // custom hook
  const { call } = useAxios(COLLECTIONS, GET);
  // data
  const [data, setData] = useState(null);

  // api call
  useEffect(() => {
    call().then((res) => setData(res.data?.rows));
  }, []);

  return (
    <div className="relative flex items-center py-16 px-6 flex flex-col items-center gap-8">
      <Title className="text-center">{title}</Title>
      {data && (
        <Slider className="w-[300px] sm:w-[500px] lg:w-[800px] px-2" {...settings}>
          {data.map((element, index) => (
            <div key={index}>
              <CollectionCard
                title={element.name}
                description={element.description}
                src={element.imageURL}
                href={COLLECTION_PLP.replace(':name', element.name)}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

// Import Swiper React components
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useClient } from "@backend/client";
import { ISliderItem } from "@types";
import "./index.css";

export const Slider = () => {
  const [sliderItems, setSliderItems] = useState([] as ISliderItem[]);
  const swiper = useSwiper();
  const client = useClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.getSlides();
        setSliderItems(response?.data ?? []);
        swiper.update();
      } catch (error) {
        // setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {sliderItems && (
        <Swiper
          key={sliderItems.length}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="h-[70vw] w-[99.1vw] lg:h-[30vw]"
        >
          {sliderItems.map((image, index) => (
            <SwiperSlide className="w-full" key={index}>
              <img
                key={index}
                src={image.image}
                alt={image.id}
                className="h-[70vw] w-[99.1vw] lg:h-[30vw]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

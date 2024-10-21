import { useState, useEffect } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./index.css";
import { ISliderItem } from "@types";
import { useClient } from "@backend/client";

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

  // 100 x 30 baih yostoi
  // Delgetsendee bagtahgu bsan uchraas urguniig 99.1vw urttai bolgov
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
          className="h-[40vw] w-[99.1vw] lg:h-[25vw]"
        >
          {sliderItems.map((image, index) => (
            <SwiperSlide className="w-full" key={index}>
              <img
                key={index}
                src={image.image}
                alt={image.id}
                className="h-[40vw] w-[99.1vw] object-cover lg:h-[25vw]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

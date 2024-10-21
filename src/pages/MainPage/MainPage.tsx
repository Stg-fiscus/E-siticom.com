import { Slider } from "./Slider/Slider";
import { FeatureNews } from "./FeatureNews/FeatureNews";

export const MainPage = () => {
  return (
    <>
      <div className="flex justify-center shadow-md">
        <Slider />
      </div>
      <div className="mx-[10vw] mb-12">
        <FeatureNews />
      </div>
    </>
  );
};

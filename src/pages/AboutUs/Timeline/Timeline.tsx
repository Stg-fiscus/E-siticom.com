import { ConfigProvider, Steps } from "antd";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export interface ITimelineYear {
  year: number;
  image: string;
  description: string;
}

export function Timeline({ timeline }: { timeline: ITimelineYear[] }) {
  const [index, setIndex] = useState(0);
  const isDesktop = useMediaQuery({
    query: "(min-width: 780px)",
  });

  const onChange = (current: number) => {
    setIndex(current);
  };

  return (
    <section
      id="timeline"
      className="flex flex-row-reverse gap-4 md:flex-col md:items-center"
    >
      <div className="flex w-full flex-col items-start justify-start gap-4 md:grid-cols-3 md:flex-row md:items-center">
        <div>
          <img src={timeline[index].image} alt="Placeholder" width={500} />
        </div>
        <div className="col-span-2 flex flex-col justify-center gap-4">
          <h2 className="page-title text-5xl">{timeline[index].year}</h2>
          <div
            className="page-description"
            dangerouslySetInnerHTML={{ __html: timeline[index].description }}
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          token: {
            fontSizeSM: 16,
            colorTextQuaternary: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <Steps
          progressDot
          direction="vertical"
          type={isDesktop ? "inline" : "default"}
          onChange={onChange}
          current={index}
          items={timeline.map(({ year }) => ({ title: year }))}
          className="w-[100px] md:w-full"
        />
      </ConfigProvider>
    </section>
  );
}

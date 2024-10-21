import { IPageToken } from "@types";

export function Banner({ token }: { token: IPageToken }) {
  return (
    <section
      id="banner"
      className="flex flex-col justify-evenly gap-5 bg-[#c6192c] p-4 text-white md:flex-row"
    >
      <div className="col-span-2 flex flex-col items-center justify-center gap-4">
        <h2 className="text-center text-4xl">
          САНХҮҮГИЙН ТООЦООЛОХ ГРУППТ ТАВТАЙ МОРИЛ
        </h2>
        <div dangerouslySetInnerHTML={{ __html: token.content }} />
      </div>
      <div>
        <img src={token.image} alt="Banner" width={300} />
      </div>
    </section>
  );
}

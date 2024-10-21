import { IPageToken } from "@types";

export function Vision({ token }: { token: IPageToken }) {
  return (
    <section id="vision" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="hidden md:block">
        <img src={token.image} alt="Banner" width={500} />
      </div>
      <div className="col-span-2 flex flex-col justify-center gap-4">
        <h2 className="text-5xl">Алсын хараа</h2>
        <div dangerouslySetInnerHTML={{ __html: token.content }} />
        {/* <div className="page-description">
          Мэдлэг оюун шингэсэн үнэт зүйл бүтээж хүмүүст үнэ цэнийг бэлэглэнэ
        </div> */}
      </div>
      <div className="block md:hidden">
        <img src={token.image} alt="Banner" width={500} />
      </div>
    </section>
  );
}

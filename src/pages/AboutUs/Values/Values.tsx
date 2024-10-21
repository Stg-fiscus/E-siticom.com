import { IPageToken } from "@types";

export function Values({ token }: { token: IPageToken }) {
  return (
    <section id="values" className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="col-span-2 flex flex-col justify-center gap-4">
        <h2 className="page-title text-5xl">Үнэт зүйл</h2>
        <div
          className="page-description"
          dangerouslySetInnerHTML={{ __html: token.content }}
        />
      </div>
      <div>
        <img src={token.image} alt="Banner" width={500} />
      </div>
    </section>
  );
}

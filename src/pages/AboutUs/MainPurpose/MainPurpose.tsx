import { IPageToken } from "@types";
import { stripHtmlTags } from "@utils/functions/stripHtmlTags";

export function MainPurpose({ token }: { token: IPageToken }) {
  return (
    <section
      id="main-purpose"
      className="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <div className="col-span-2 flex flex-col justify-center gap-4">
        <h2 className="page-title text-5xl">Зорилго</h2>
        <div className="page-description">{stripHtmlTags(token.content)}</div>
      </div>
      <div>
        <img src={token.image} alt="Banner" width={500} />
      </div>
    </section>
  );
}

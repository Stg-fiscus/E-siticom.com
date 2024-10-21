import { applyMixins } from "@utils/functions/applyMixins";
import { GetTokensMixin } from "./getTokens";

interface PageTokensMixin extends GetTokensMixin {}

class PageTokensMixin {}

applyMixins(PageTokensMixin, [GetTokensMixin]);

export { PageTokensMixin };

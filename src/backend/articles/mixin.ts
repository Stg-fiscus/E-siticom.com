import { applyMixins } from "@utils/functions/applyMixins";
import { GetArticleMixin } from "./getArticle";
import { GetArticlesMixin } from "./getArticles";
import { GetFeaturedArticlesMixin } from "./getFeaturedArticles";

interface ArticlesMixin
  extends GetArticleMixin,
    GetArticlesMixin,
    GetFeaturedArticlesMixin {}

class ArticlesMixin {}

applyMixins(ArticlesMixin, [
  GetArticleMixin,
  GetArticlesMixin,
  GetFeaturedArticlesMixin,
]);

export { ArticlesMixin };

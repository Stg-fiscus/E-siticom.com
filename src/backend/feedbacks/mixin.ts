import { CreateFeedbackMixin } from "./createFeedback";
import { GetFeedbackAnswersMixin } from "./getFeedbackAnswers";
import { GetFeedbackByIdMixin } from "./getFeedbackById";
import { GetFeedbackCategoriesMixin } from "./getFeedbackCategories";
import { GetFeedbacksMixin } from "./getFeedbacks";
import { UpdateFeedbackMixin } from "./updateFeedback";

import { applyMixins } from "@utils/functions/applyMixins";

interface FeedbackMixin
  extends CreateFeedbackMixin,
    GetFeedbackAnswersMixin,
    GetFeedbackByIdMixin,
    GetFeedbackCategoriesMixin,
    GetFeedbacksMixin,
    UpdateFeedbackMixin {}

class FeedbackMixin {}

applyMixins(FeedbackMixin, [
  CreateFeedbackMixin,
  GetFeedbackAnswersMixin,
  GetFeedbackByIdMixin,
  GetFeedbackCategoriesMixin,
  GetFeedbacksMixin,
  UpdateFeedbackMixin,
]);

export { FeedbackMixin };

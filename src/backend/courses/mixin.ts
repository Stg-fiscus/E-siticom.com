import { applyMixins } from "@utils/functions/applyMixins";
import { GetCourseLessonsMixin } from "./getCourseLessons";
import { getLessonCategoriesMixin } from "./getLessonCategories";
import { GetParentLessonsMixin } from "./getParentLessons";
import { IncrementViewsMixin } from "./incrementViews";

interface CoursesMixin
  extends GetCourseLessonsMixin,
    GetParentLessonsMixin,
    IncrementViewsMixin,
    getLessonCategoriesMixin {}

class CoursesMixin {}

applyMixins(CoursesMixin, [
  GetCourseLessonsMixin,
  GetParentLessonsMixin,
  IncrementViewsMixin,
  getLessonCategoriesMixin,
]);

export { CoursesMixin };

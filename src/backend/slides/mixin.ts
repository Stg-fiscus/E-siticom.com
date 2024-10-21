import { applyMixins } from "@utils/functions/applyMixins";
import { GetSlidesMixin } from "./getSlides";

interface SlidesMixin extends GetSlidesMixin {}

class SlidesMixin {}

applyMixins(SlidesMixin, [GetSlidesMixin]);

export { SlidesMixin };

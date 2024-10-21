import { ClientBase } from "@backend/base/client";
import { BackendResponse, ISliderItem } from "@types";

export class GetSlidesMixin extends ClientBase {
  /**
   * Gets items for the slider
   * @returns Slider items
   */
  public async getSlides(): Promise<BackendResponse<ISliderItem[]>> {
    return await this.site.get("/getSliders");
  }
}

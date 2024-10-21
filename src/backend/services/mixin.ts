import { AddFeedbackMixin } from "./addFeedback";
import { AddServiceMixin } from "./addService";
import { CancelServiceMixin } from "./cancelService";
import { GetBillingMixin } from "./getBilling";
import { GetServiceListMixin } from "./getServiceList";
import { GetServiceMixin } from "./getService";
import { GetServiceTypesMixin } from "./getServiceTypes";
import { UpdateServiceMixin } from "./updateService";

import { applyMixins } from "@utils/functions/applyMixins";

interface ServicesMixin
  extends AddFeedbackMixin,
    AddServiceMixin,
    CancelServiceMixin,
    GetBillingMixin,
    GetBillingMixin,
    GetServiceListMixin,
    GetServiceTypesMixin,
    GetServiceMixin,
    UpdateServiceMixin {}

class ServicesMixin {}

applyMixins(ServicesMixin, [
  AddFeedbackMixin,
  AddServiceMixin,
  CancelServiceMixin,
  GetBillingMixin,
  GetBillingMixin,
  GetServiceListMixin,
  GetServiceTypesMixin,
  GetServiceMixin,
  UpdateServiceMixin,
]);

export { ServicesMixin };

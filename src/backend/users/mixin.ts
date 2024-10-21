import { applyMixins } from "@utils/functions/applyMixins";
import { ChangeNameMixin } from "./changeName";
import { ChangePasswordMixin } from "./changePassword";
import { LoginMixin } from "./login";
import { RegisterMixin } from "./register";
import { ResetPasswordMixin } from "./resetPassword";
import { SetPasswordMixin } from "./setPassword";
import { VerificationMixin } from "./verification";
import { CheckForgotPasswordTokenMixin } from "./checkForgotPasswordToken";
import { ResendEmailVerificationMixin } from "./resendEmailVerification";

interface UsersMixin
  extends ChangeNameMixin,
    ChangePasswordMixin,
    LoginMixin,
    RegisterMixin,
    ResetPasswordMixin,
    SetPasswordMixin,
    VerificationMixin,
    CheckForgotPasswordTokenMixin,
    ResendEmailVerificationMixin {}

class UsersMixin {}

applyMixins(UsersMixin, [
  ChangeNameMixin,
  ChangePasswordMixin,
  LoginMixin,
  RegisterMixin,
  ResetPasswordMixin,
  SetPasswordMixin,
  VerificationMixin,
  CheckForgotPasswordTokenMixin,
  ResendEmailVerificationMixin,
]);

export { UsersMixin };

import { AnonymousPageLayout } from "@layouts/AnonymousPageLayout/AnonymousPageLayout";
import { Dashboard } from "@layouts/Dashboard/Dashboard";
import { LoginTemplate } from "@layouts/LoginTemplate/LoginTemplate";
import { SharedLayout } from "@layouts/SharedLayout/SharedLayout";
import { AboutUs } from "@pages/AboutUs/AboutUs";
import { AllNotification } from "@pages/AllNotification/AllNotification";
import { ArticlePage } from "@pages/ArticlePage/ArticlePage";
import { Course } from "@pages/Course/Course";

import InternalPolicyPage from "@components/InternalPolicy/InternalPolicy";



import {CourseWatch} from "@pages/CourseWatch/CourseWatch";


import { EmailVerificationRequired } from "@pages/EmailVerificationRequired/EmailVerificationRequired";
import { FeedbackAnswers } from "@pages/Feedbacks/FeedbackAnswers";
import { Feedback } from "@pages/Feedbacks/Feedbacks";
import { ForgetField } from "@pages/ForgetField/ForgetField";
import { ForgetPassword } from "@pages/ForgetPassword/ForgetPassword";
import { Information } from "@pages/Information/Information";
import { InvalidInvitation } from "@pages/InvalidInvitation/InvalidInvitation";
import { Knowledge } from "@pages/Knowledge/Knowledge";
import { Location } from "@pages/Location/Location";
import { Login } from "@pages/Login/Login";
import { MainPage } from "@pages/MainPage/MainPage";
import { NewPassword } from "@pages/NewPassword/NewPassword";
import { NotFound } from "@pages/NotFound/NotFound";
import { OrderList } from "@pages/OrderList/OrderList";
import { PaymentPage } from "@pages/PaymentPage/PaymentPage";
import { Profile } from "@pages/Profile/Profile";
import { Register } from "@pages/Register/Register";
import { RegisterVerfication } from "@pages/RegisterVerfication/RegisterVerfication";
import { Summary } from "@pages/Summary/Summary";
import { Unauthorized } from "@pages/Unauthorized/Unauthorized";
import { UserRole } from "@types";
import { Route, Routes } from "react-router-dom";
import { Auth } from "./Auth";
import { PrivateRoute } from "./PrivateRoute";
import { InternalProcedures } from "@components/InternalProcedures/InternalProcedures";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<MainPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Summary />} />
            <Route element={<Auth allowedRole={UserRole.client} />}>
              <Route path="service" element={<OrderList />} />
              <Route path="payment" element={<PaymentPage />} />
            </Route>
            <Route path="course" element={<Course />} />
            <Route path="internal-policy" element={<InternalPolicyPage />} />
            <Route path= "internal-procedures" element={<InternalProcedures/>}/> 
            

            <Route path="courseWatch/:id" element={<CourseWatch />} />
            <Route path="notifications" element={<AllNotification />} />
            <Route path="profile" element={<Profile />} />
            <Route path="changepassword" element={<NewPassword />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="feedback/:id" element={<FeedbackAnswers />} />
          </Route>
        </Route>
        <Route element={<AnonymousPageLayout />}>
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="information" element={<Information />} />
          <Route path="article/:id" element={<ArticlePage />} />
        </Route>
        <Route element={<LoginTemplate />}>
          <Route path="login" element={<Login />} />
          <Route path="forgetPassword" element={<ForgetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="forgetField" element={<ForgetField />} />
          <Route
            path="emailVerificationRequired"
            element={<EmailVerificationRequired />}
          />
        </Route>
        <Route path="verification" element={<RegisterVerfication />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="invalidinvitation" element={<InvalidInvitation />} />
        <Route path="location" element={<Location />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

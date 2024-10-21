import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BreadCrumbItem {
  title: string;
  linkTo?: string;
}

export interface NavigationState {
  title: string;
  breadcrumb: BreadCrumbItem[];
  menuKey: string;
}

const initialState: NavigationState = {
  title: "Нүүр",
  breadcrumb: [{ title: "Нүүр" }],
  menuKey: "Нүүр",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setNavigationDashboard: (state) => {
      state.title = "Хянах самбар";
      state.menuKey = "Хянах самбар";
      state.breadcrumb = [
        { title: "Нүүр", linkTo: "/" },
        { title: "Хянах самбар" },
      ];
    },
    setNavigationDashboardSubpage: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.menuKey = action.payload;
      state.breadcrumb = [
        { title: "Нүүр", linkTo: "/" },
        { title: "Хянах самбар", linkTo: "/dashboard" },
        { title: action.payload },
      ];
    },
    setNavigationLesson: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.menuKey = "Сургалт";
      state.breadcrumb = [
        { title: "Нүүр", linkTo: "/" },
        { title: "Хянах самбар", linkTo: "/dashboard" },
        { title: "Сургалт", linkTo: "/dashboard/course" },
        { title: action.payload },
      ];
    },
    setNavigationProfileSubpage: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.menuKey = "Мэдээлэл засах";
      state.breadcrumb = [
        { title: "Нүүр", linkTo: "/" },
        { title: "Хянах самбар", linkTo: "/dashboard" },
        { title: "Мэдээлэл засах", linkTo: "/dashboard/profile" },
        { title: action.payload },
      ];
    },
    setNavigationFeedbackSubpage: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.menuKey = "Санал хүсэлт";
      state.breadcrumb = [
        { title: "Нүүр", linkTo: "/" },
        { title: "Хянах самбар", linkTo: "/dashboard" },
        { title: "Санал хүсэлт", linkTo: "/dashboard/feedback" },
        { title: action.payload },
      ];
    },
  },
});

export const {
  setNavigationDashboard,
  setNavigationDashboardSubpage,
  setNavigationLesson,
  setNavigationProfileSubpage,
  setNavigationFeedbackSubpage,
} = navigationSlice.actions;

export default navigationSlice.reducer;

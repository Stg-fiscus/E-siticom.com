import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./feedback/feedbackSlice";
import navigationReducer from "./navigation/navigationSlice";
import notificationsReducer from "./notifications/notificationsSlice";
import userReducer from "./user/userSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    user: userReducer,
    notifications: notificationsReducer,
    feedback: feedbackReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

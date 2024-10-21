import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INotification } from "@types";

const MAX_NOTIFICATIONS = 10;

interface NotificationsState {
  count: number;
  listenerCallNumber: number;
  lastNotifications: INotification[];
}

const initialState: NotificationsState = {
  count: 0,
  listenerCallNumber: 0,
  lastNotifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (
      state,
      action: PayloadAction<{
        count: number;
        lastNotifications: INotification[];
      }>,
    ) => {
      state.count = action.payload.count;
      state.lastNotifications = action.payload.lastNotifications;
    },
    addNotification: (state, action: PayloadAction<INotification>) => {
      if (!action.payload.seen) state.count++;
      if (state.lastNotifications.length == MAX_NOTIFICATIONS)
        state.lastNotifications.pop();

      state.lastNotifications.unshift(action.payload);
    },
    readNotification: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.lastNotifications.findIndex(
        (notif) => notif.id == id,
      );

      if (index != -1) {
        state.lastNotifications[index].seen = true;
        state.count--;
      }
    },
    readAllNotifications: (state) => {
      state.count = 0;
      state.lastNotifications.map((notif) => {
        notif.seen = true;
      });
    },
    resetNotifications: (state) => {
      state.count = 0;
      state.lastNotifications = [];
    },
    listenerCall: (state) => {
      state.listenerCallNumber++;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  readNotification,
  readAllNotifications,
  resetNotifications,
  listenerCall,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

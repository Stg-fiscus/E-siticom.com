import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFeedback } from "@types";

interface FeedbackState {
  feedback?: IFeedback;
}

const initialState: FeedbackState = {};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedback: (state, action: PayloadAction<IFeedback>) => {
      state.feedback = action.payload;
    },
  },
});

export const { setFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;

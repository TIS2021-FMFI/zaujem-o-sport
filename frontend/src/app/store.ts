import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import incorrectRowsReducer from "secretary/pages/upload_data/incorrectRowsSlice";

// TODO: potentially create more stores based on how much reducers we'll have in the end

export const store = configureStore({
  reducer: {
    secretaryUploadIncorrectRows: incorrectRowsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

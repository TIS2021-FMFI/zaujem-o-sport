import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import incorrectRowsReducer from "secretary/pages/upload_data/components/suggestionsTableSlice";

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

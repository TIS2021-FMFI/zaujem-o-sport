import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "pages/counter/counterSlice";
import incorrectRowsReducer from "components/drag_and_drop/incorrectRowsSlice";

// TODO: potentially create more stores based on how much reducers we'll have in the end

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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

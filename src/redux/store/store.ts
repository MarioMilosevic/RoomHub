import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "../features/roomsSlice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

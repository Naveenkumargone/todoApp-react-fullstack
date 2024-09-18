import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { todoSlice } from "./reducers/todoReducer";
import noteReducer from "./reducers/noteReducer";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

const reducers = combineReducers({
  todo: todoReducer,
  note: noteReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [loggerMiddleware],
});

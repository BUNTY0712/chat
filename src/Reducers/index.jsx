import { combineReducers } from "@reduxjs/toolkit";
import UiReducer from "./UiReducer"; // Import your UiReducer or any other reducers you have

const rootReducer = combineReducers({
  ui: UiReducer.reducer,
});

export default rootReducer;

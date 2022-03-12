import { combineReducers } from "@reduxjs/toolkit";
import companiesSlice from "./companies";

export const reducers = () => combineReducers({
    companies: companiesSlice.reducer
});
import {applyMiddleware, combineReducers, createStore} from "redux";
import CompaniesReducer from "./companies/companies-reducer";
import thunk from "redux-thunk";
import WorkersReducer from "./workers/workers-reducer";

const rootReducers = combineReducers({
    companies:CompaniesReducer,
    workers:WorkersReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;
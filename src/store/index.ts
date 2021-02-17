import {combineReducers} from 'redux';
import carReducer, { initProps } from "../reducer/carReducer";
//import { createSelectorHook, TypedUseSelectorHook  } from "react-redux"; 예전방식

const rootReducer = combineReducers({
  carReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;
//export const useMySelector  = createSelectorHook<RootReducerType>();

export default rootReducer;

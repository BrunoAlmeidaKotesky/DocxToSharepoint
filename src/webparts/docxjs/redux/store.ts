import { templateReducer } from './reducers/templateReducer';
import { IStore } from './../models/interfaces/IStore';
import { createStore, Store, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
 export const initialState:IStore = {loaded: false, templates:[], comboOpt:[], isEdit: {edit: false, selectedIdx: undefined}};

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
 templates: templateReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default function configureStore() {
  const store = createStore(rootReducer, undefined,composeEnhancers(applyMiddleware( reduxImmutableStateInvariant())));
  return store;
}
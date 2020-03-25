import { listReducer } from './reducers/listReducer';
import { IStore } from './../interfaces/IStore';
import { createStore, Store, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
export const initialState:IStore = {list: {listId: null, listName: null, fields: []}, loaded:false};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    listReducer
   });
export type RootState = ReturnType<typeof rootReducer>;

function configureStore(){
    return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware)));
}

let store = configureStore;
export default store;
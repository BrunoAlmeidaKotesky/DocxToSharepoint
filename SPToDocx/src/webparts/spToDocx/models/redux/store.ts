import { IFileStore } from './../interfaces/ITemplateList';
import { listReducer } from './reducers/listReducer';
import {fileGenReducer} from './reducers/fileGenReducer';
import { IStore } from './../interfaces/IStore';
import { createStore, Store, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
export const initialState:IStore = {list: {listId: null, listName: null, fields: [], file:{fileName: null, urlFile: null, fileType: null}, fileFieldRef: null}, isModalOpened:false, allLists:[]};
export const initialFileGenState: IFileStore = {fields: []};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    listReducer,
    fileGenReducer
   });
export type RootState = ReturnType<typeof rootReducer>;

function configureStore(){
    return createStore(rootReducer, undefined, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware)));
}

let store = configureStore;
export default store;
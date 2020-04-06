import { templateReducer } from './reducers/templateReducer';
import  fileReducer from './reducers/fileReducer';
import { IStore, IFileSave } from './../models/interfaces/IStore';
import { createStore, Store, applyMiddleware, compose, combineReducers } from "redux";
import reduxImmutableStateInvariant from  'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';


declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
  }
 export const initialState:IStore = {loaded: false, templates:[], comboOpt:[], listOpt: [], isEdit: {edit: false, selectedIdx: undefined}};
 export const initialFileState:IFileSave = {file: null, listId: null, listName:null};

 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
 templatesReducer: templateReducer,
 fileReducer: fileReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default function configureStore() {
  const store = createStore(rootReducer, undefined,composeEnhancers(applyMiddleware(reduxImmutableStateInvariant(), thunkMiddleware)));
  
  return store;
}
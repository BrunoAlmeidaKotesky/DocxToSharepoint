import { initialState } from './../store';
import {Actions, ListActions} from '../actions/actions';
import { IStore } from './../../interfaces/IStore';

export const listReducer = (state:IStore = initialState, action:ListActions) => {
    switch(action.type){
      case Actions.SET_MODAL: {
        return {...state, isModalOpened: action.payload};
      }
      case Actions.LOAD_LISTS: {
        return{...state, allLists: action.payload.listCombo};
      }
      case Actions.SET_SELECTED_LIST: {
        return{...state, list: {listId: action.payload.listId, listName: action.payload.listName,fields: state.list.fields}
      };
    }

      default: return state;
    }
};
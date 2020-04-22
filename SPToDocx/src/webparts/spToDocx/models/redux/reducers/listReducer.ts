import { initialState } from './../store';
import { Actions, ListActions } from '../actions/actions';
import { IStore } from './../../interfaces/IStore';

export const listReducer = (state: IStore = initialState, action: ListActions) => {
  switch (action.type) {
    case Actions.SET_MODAL: {
      return { ...state, isModalOpened: action.payload };
    }
    case Actions.LOAD_LISTS: {
      return { ...state, allLists: action.payload.listCombo };
    }
    case Actions.SET_SELECTED_LIST: {
      const listId = action.payload.listId;
      const listName = action.payload.listName;
      const fields = state.list.fields;
      const urlFile = action.payload.data.file.urlFile;
      const fileName = action.payload.data.file.fileName;
      const fileFieldRef = action.payload.data.fieldData;
      const fileType = action.payload.data.file.fileType;

      return { ...state, list: { listId, listName, fields, file: {urlFile, fileName, fileType}, fileFieldRef }};
    }
    case Actions.SET_FIELDS_FROM_LIST: {
      return{...state, list: { listId: state.list.listId, listName: state.list.listName, fields: action.payload, 
                        file: {urlFile: state.list.file.urlFile, fileName: state.list.file.fileName, fileType: state.list.file.fileType}, fileFieldRef: state.list.fileFieldRef}};
    }
    case Actions.CLEAR_FIELDS:{
      return{...state, list:{ listId: state.list.listId, listName: state.list.listName, fields: [],
                       file: {urlFile: state.list.file.urlFile, fileName: state.list.file.fileName, fileType: state.list.file.fileType}, fileFieldRef: state.list.fileFieldRef}};
    }

    default: return state;
  }
};
import { Reducer } from 'redux';
import { IFileSave } from './../../models/interfaces/IStore';
import { initialFileState } from '../store';
import { IFileActions, FileActions } from '../actions/fileActions';

const fileReducer: Reducer<IFileSave, IFileActions> = (state: IFileSave = initialFileState, action) => {
    switch (action.type) {
        case FileActions.SET_INITIAL_FILE: { return { ...state, listId: '', listName: '', 
            file: { fileName: action.payload.file.fileName, fileUrl: action.payload.file.fileUrl, type: action.payload.file.type } }; }
        default: return state;
    }
};

export default fileReducer;
import { IFileGeneration } from '../../interfaces/ITemplateList';
import { initialFileGenState } from '../store';
import { FileGenReducer } from '../../types/types';
import { FileActions } from '../actions/fileActions';

export const fileGenReducer: FileGenReducer = (state = initialFileGenState, action) => {
    switch (action.type) {
        case FileActions.SET_INITIAL_FIELD: {
            const fields: IFileGeneration[] = [];
            action.payload.fields.map(f => {
                fields.push({ field: f.Title, fieldRef: f.documentFieldRef, value: null });
            });
            return { ...state, fields: fields };
        }
        case FileActions.SET_FIELD_VALUE: {
            const field = action.payload.values.field;
            const fileRef = action.payload.values.fieldRef;
            const value = action.payload.values.value;

            return {
                ...state,
                fields: state.fields.map((it, idx) => it.field === action.payload.values.field ? { ...it, value: action.payload.values.value } : it)
            };
        }
        case FileActions.CLEAR_FIELDS_VALUES:
            return {...state, fields: []};
            
        default: return state;
    }
};
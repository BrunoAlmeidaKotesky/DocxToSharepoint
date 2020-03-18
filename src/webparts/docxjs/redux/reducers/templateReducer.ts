import { TemplateActions, Actions } from './../actions/actionTypes';
import { IStore } from './../../models/interfaces/IStore';
import { initialState } from '../store';
import { Reducer } from 'redux';

export const templateReducer: Reducer<IStore, TemplateActions> = (state: IStore = initialState, action: TemplateActions) => {
    switch (action.type) {
        case Actions.SET_INITIAL_TEMPLATES: {
            const templates = [...state.templates];
            templates.unshift(...action.payload);
            return { ...state, templates: templates };
        }
        case Actions.POPULATE_LIST_TEMPLATE: {
            return { ...state, comboOpt: action.payload.option, isEdit: { edit: action.payload.isEditing, selectedIdx: action.payload.idx } };
        }
        case Actions.CHANGE_ITEM_TYPE: {
            return {
                ...state, templates: state.templates.map(item =>
                    item.field === action.payload.idx ? { ...item, fieldType: action.payload.type } : item
                )
            };
        }
        case Actions.RESET_STATE: {
            return initialState;
        }
        case Actions.LOAD_LOOKUP_LIST: {
            return { ...state, listOpt: action.payload.listCombo };
        }
        case Actions.LOAD_LOOKUP_FIELD: {
            return {
                ...state, templates: state.templates.map((i,n) =>
                    i.field === action.payload.field ? { ...i, 
                        lookup: { allFields: action.payload.allFields, list: i.lookup.list, field: i.lookup.field }} : i
                )
            };
        }
        case Actions.SET_LOOKUP_LIST: {
            return {
                ...state, templates: state.templates.map((i, n) =>
                    i.field === action.payload.tempIdxField ? { ...i, 
                        lookup: { field: null, list: action.payload.listName,  allFields: state.templates[n].lookup.allFields }} : i
                )
            };
        }
        case Actions.SET_LOOKUP_VALUES: {
            return {
                ...state, templates: state.templates.map((t, i) =>
                    t.field === action.payload.tempIdxField ? { ...t, 
                        lookup: { field: action.payload.fieldName, list: t.lookup.list, allFields: state.templates[i].lookup.allFields } } : t
                )
            };
        }
        case Actions.CHANGE_CHOICE_TYPE: {
            return {...state, templates: state.templates.map((t,n) =>
                    t.field === action.payload.fieldIdx ? {...t,
                        choices: {choices: state.templates[n].choice.choices, type: action.payload.type}
                    }:t
                )};
        }
        case Actions.CHANGE_CHOICE_OPTIONS: {
            return {...state, templates: state.templates.map((t,n) =>
                    t.field === action.payload.fieldIdx ? {...t,
                    choices: {choices: [...state.templates[n].choice.choices, action.payload.options], type: state.templates[n].choice.type}}:t
                )};
        }
        default: { return state; }
    }
}; 
import { ITemplateField } from './../../models/interfaces/ITemplate';
import { TemplateActions, Actions} from './../actions/actionTypes';
import { IStore } from './../../models/interfaces/IStore';
import {initialState} from '../store';
import {Reducer} from 'redux';

export const templateReducer: Reducer<IStore, TemplateActions> = (state: IStore = initialState, action: TemplateActions) =>{
    switch(action.type) {
        case Actions.SET_INITIAL_TEMPLATES: {
            const templates = [...state.templates];
            templates.unshift(...action.payload);
            return {...state, templates: templates};
        }
        case Actions.POPULATE_LIST_TEMPLATE: {
            return {...state, comboOpt: action.payload.option, isEdit:{edit: action.payload.isEditing, selectedIdx: action.payload.idx}};
        }
        case Actions.CHANGE_ITEM_TYPE:{
            return{ ...state, templates: state.templates.map(item =>
                item.field === action.payload.idx ? {...item, fieldType: action.payload.type}: item
            )};
        }
        case Actions.RESET_STATE: {
            return initialState;
        }
        default: {return state;}            
    }
};
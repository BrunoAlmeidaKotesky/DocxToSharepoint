import { ITemplateField } from './../../models/interfaces/ITemplate';
import { TemplateActions, SET_INITIAL_TEMPLATES} from './../actions/actionTypes';
import { IStore } from './../../models/interfaces/IStore';
import {initialState} from '../store';
import {Reducer} from 'redux';

export const templateReducer: Reducer<IStore, TemplateActions> = (state: IStore = initialState, action: TemplateActions) =>{
    switch(action.type) {
        case SET_INITIAL_TEMPLATES: {
            return {...state, ...action.payload};
        }
        default: return state;
            
    }
};
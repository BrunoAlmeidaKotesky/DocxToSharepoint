import { IStore } from './../../models/interfaces/IStore';
import { loadAllLists } from './../../services/SharepointServices';
import { IDropdownOption } from 'office-ui-fabric-react';
import { TemplateActions, Actions } from './actionTypes';
import {PopulateFieldTypes} from '../../models/types/types';
import { ITemplateField, FieldTypess } from './../../models/interfaces/ITemplate';
import {action} from "typesafe-actions";
import { ThunkDispatch } from 'redux-thunk';
import { IListInfo } from '@pnp/sp/lists';

export function setInitialTemplate(template:ITemplateField[]):TemplateActions{
    return action(Actions.SET_INITIAL_TEMPLATES, template);
}

export function populateFieldTypeDdp({idx, isEditing, option}:PopulateFieldTypes){
    return action(Actions.POPULATE_LIST_TEMPLATE, {idx, isEditing, option});
}

export function changeTemplateFieldType(idx:string, type: FieldTypess):TemplateActions{
    return action(Actions.CHANGE_ITEM_TYPE, {idx, type});
}

export function resetState(){
    return action(Actions.RESET_STATE);
}

const loadList = (listCombo: IDropdownOption[]) => action(Actions.LOAD_LOOKUP_LIST, {listCombo});

export function populateLookUpList(){
    let lists: IListInfo[];
    return async (dispatch, getState?):Promise<IListInfo[]> => {
         lists = await loadAllLists();
         let listCombo: IDropdownOption[] = [];
         lists.filter(l => {
             if (l.BaseType === 0 || l.BaseType === "GenericList")
                 listCombo.push({ key: l.Id, text: l.Title });
         });
         return dispatch(loadList(listCombo));
    };
}


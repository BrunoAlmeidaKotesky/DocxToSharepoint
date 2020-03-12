import { loadAllLists , loadFieldFromList} from './../../services/SharepointServices';
import { IDropdownOption } from 'office-ui-fabric-react';
import { TemplateActions, Actions } from './actionTypes';
import {PopulateFieldTypes} from '../../models/types/types';
import { ITemplateField, FieldTypess } from './../../models/interfaces/ITemplate';
import {action} from "typesafe-actions";
import { ThunkDispatch } from 'redux-thunk';
import { IListInfo } from '@pnp/sp/lists';
import { IFieldInfo } from '@pnp/sp/fields';

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
const loadField = (allFields: IDropdownOption[], field: string) => action(Actions.LOAD_LOOKUP_FIELD, {allFields, field});
export const setLookUpList = ({listName, tempIdxField}:{listName:string, tempIdxField: string}):TemplateActions => action(Actions.SET_LOOKUP_LIST, {listName, tempIdxField});
export const setLookUpField = ({fieldName, tempIdxField}:{fieldName:string, tempIdxField:string}):TemplateActions => action(Actions.SET_LOOKUP_VALUES, {fieldName, tempIdxField});

export function populateLookUpField(opt: IDropdownOption, field: string){
    return async (dispatch) => {
        let { userFields, listName } = await loadFieldFromList(opt.text);
        await dispatch(setLookUpList({listName: listName, tempIdxField: field }));
        let allFields: IDropdownOption[] = [];
        userFields.forEach(r => {
            allFields.push({ key: r.InternalName, text: r.Title, data: { listName, field } });
        });
        return dispatch(loadField(allFields, field));
    };
}

export function populateLookUpList(){
    let lists: IListInfo[];
    return async (dispatch, getState?):Promise<IListInfo[]> => {
         lists = await loadAllLists();
         let listCombo: IDropdownOption[] = [];
         lists.filter(l => {
             if (l.BaseType === 0 || l.BaseType === "GenericList")
                 listCombo.push({ key: l.Title, text: l.Title });
         });
         return dispatch(loadList(listCombo));
    };
}


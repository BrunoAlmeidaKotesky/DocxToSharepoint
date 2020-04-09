import { IListFilter } from './../../interfaces/ITemplateList';
import { IFieldContent } from './../../interfaces/IUseFieldGen';
import { RootState } from './../store';
import { IDropdownOption } from 'office-ui-fabric-react';
import {loadAllLists, loadFieldsFromList} from '../../../services/SharepointServices';
import {action} from 'typesafe-actions';

export enum Actions {
    LOAD_LISTS = 'LOAD_LISTS',
    SET_SELECTED_LIST = 'SET_SELECTED_LIST',
    SET_MODAL = 'SET_MODAL',
    SET_FIELDS_FROM_LIST = 'SET_FIELDS_FROM_LIST',
    CLEAR_FIELDS = 'CLEAR_FIELDS'
}

export const setModal = (isOpened:boolean) => action(Actions.SET_MODAL, isOpened);
export const setSelectedList = (listId:string, listName:string) => action(Actions.SET_SELECTED_LIST, {listId, listName});
export const clearListFields = () => action(Actions.CLEAR_FIELDS);

const loadLists = (listCombo: IDropdownOption[]) => action(Actions.LOAD_LISTS, {listCombo});
export function populateListOptions(){
    let lists: IListFilter[];
    return async (dispatch, getState?) => {
         lists = await loadAllLists();
         let listCombo: IDropdownOption[] = [];
         lists.forEach(l => listCombo.push({ key: l.items.ListId, text: l.items.ListName }));
         return dispatch(loadLists(listCombo));
    };
}

const setFieldsFromList = (fields:IFieldContent[]) => action(Actions.SET_FIELDS_FROM_LIST, fields);
export function setSelectedFields(listId:string){
    return async (dispatch, getState?:()=>RootState):Promise<IFieldContent[]> => {
        let fields:IFieldContent[];
        fields = await loadFieldsFromList(listId);
        
        return dispatch(setFieldsFromList(fields));
    };
}
  
export type ListActions = ReturnType<typeof loadLists>|ReturnType<typeof setSelectedList>|ReturnType<typeof setModal>
                         |ReturnType<typeof setFieldsFromList>|ReturnType<typeof clearListFields>;
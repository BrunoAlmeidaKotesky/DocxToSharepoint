import { IDropdownOption } from 'office-ui-fabric-react';
import { IListInfo } from '@pnp/sp/lists';
import {loadAllLists} from '../../../services/SharepointServices';
import {action} from 'typesafe-actions';

export enum Actions {
    LOAD_LISTS = 'LOAD_LISTS',
    SET_SELECTED_LIST = 'SET_SELECTED_LIST',
    SET_MODAL = 'SET_MODAL'
}

const loadLists = (listCombo: IDropdownOption[]) => action(Actions.LOAD_LISTS, {listCombo});
export function populateListOptions(){
    let lists: IListInfo[];
    return async (dispatch, getState?):Promise<IListInfo[]> => {
         lists = await loadAllLists();
         let listCombo: IDropdownOption[] = [];
         lists.forEach(l => listCombo.push({ key: l.Id, text: l.Title }));
         return dispatch(loadLists(listCombo));
    };
}

export const setModal = (isOpened:boolean) => action(Actions.SET_MODAL, isOpened);
export const setSelectedList=(listId:string, listName:string)=> action(Actions.SET_SELECTED_LIST, {listId, listName});
  
export type ListActions = ReturnType<typeof loadLists>|ReturnType<typeof setSelectedList>|ReturnType<typeof setModal>;
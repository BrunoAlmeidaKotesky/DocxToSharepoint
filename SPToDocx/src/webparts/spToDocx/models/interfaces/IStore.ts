import { IDropdownOption } from 'office-ui-fabric-react';
import { IListInfo } from '@pnp/sp/lists';
import {IList} from './IList';

export interface IStore{
    allLists: IDropdownOption[];
    list: IList;
    isModalOpened?:boolean;
}
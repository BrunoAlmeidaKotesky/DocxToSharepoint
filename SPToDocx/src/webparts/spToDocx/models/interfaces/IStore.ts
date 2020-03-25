import {IList} from './IList';
export interface IStore{
    list: IList;
    loaded?:boolean;
}
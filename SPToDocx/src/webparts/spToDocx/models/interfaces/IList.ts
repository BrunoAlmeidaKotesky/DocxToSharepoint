
import { IFieldContent } from './IUseFieldGen';
import {FileData} from '../types/types';
export interface IList {
    listId: string;
    listName: string;
    fields: IFieldContent[];
    file: FileData;
    fileFieldRef: string;
}


import {IFieldInfo} from '@pnp/sp/fields';
export interface IList {
    listId: string;
    listName: string;
    fields: IFields[];
}

export interface IFields {
    fieldName: string;
    fieldId: string;
    fieldType: IFieldInfo;
}
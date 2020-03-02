import { RDispatch } from './../types/types';
import { FieldTypes , ChoiceFieldFormatType} from "@pnp/sp/fields";
export interface ITemplateField {
    field: string;
    fieldType: FieldTypess; 
    choice?: {choices: any[], type: ChoiceFieldFormatType};
    lookup?: {list: string[] , field: string};
}

export enum FieldTypess {
    FSingleLine = 'Texto',
    FNumeric = 'Número',
    FMonetary = 'Moeda',
    FLookUp = 'LookUp',
    FChoice = 'Escolha',
    FData = 'Data'
}
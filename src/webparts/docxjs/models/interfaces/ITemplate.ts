import { FieldTypes , ChoiceFieldFormatType} from "@pnp/sp/fields";

export interface ITemplateField {
    field: string;
    fieldType: FieldTypes | FieldTypess; 
    choice?: {choices: any[], type: ChoiceFieldFormatType};
    lookup?: {list: string[] , field: string};
}

export type useTempGen = [ITemplateField[], (e: React.ChangeEvent<HTMLInputElement>)=> void];

export enum FieldTypess {
    FSingleLine = 'Texto',
    FNumeric = 'Número',
    FMonetary = 'Moeda',
    FLookUp = 'LookUp',
    FChoice = 'Escolha',
    FData = 'Data'
}
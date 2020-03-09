import { IDropdownOption } from 'office-ui-fabric-react';
import { ChoiceFieldFormatType} from "@pnp/sp/fields";
export interface ITemplateField {
   readonly field: string;
    fieldType: FieldTypess; 
   readonly choice?: {choices: any[], type: ChoiceFieldFormatType};
   readonly lookup?: {list: string, field: string};
}

export interface ITemplateGen {
    handleFile(e: React.ChangeEvent<HTMLInputElement>): void;
    sendFields(listName: string): Promise<void>;
    templates : ITemplateField[];
}

export interface ITemplateForm{
    populateWitTypeOpt(idx: string): void;
    TemplateItems: (edit: boolean, idx: string, fields: ITemplateField) => JSX.Element;
}

export enum FieldTypess {
    FSingleLine = 'Texto',
    FNumeric = 'Número',
    FMonetary = 'Moeda',
    FLookUp = 'LookUp',
    FChoice = 'Escolha',
    FData = 'Data'
}
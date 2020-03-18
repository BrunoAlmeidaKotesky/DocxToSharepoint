import { IDropdownOption } from 'office-ui-fabric-react';
import { ChoiceFieldFormatType} from "@pnp/sp/fields";

export interface ITemplateField {
   readonly field: string;
   readonly fieldType: FieldTypess; 
   readonly choice?: {choices: string[], type: ChoiceFieldFormatType};
   readonly lookup?: {list: string, field: string, allFields?: IDropdownOption[]};
}

export interface ITemplateGen {
    handleFile(e: React.ChangeEvent<HTMLInputElement>): void;
    sendFields(listName: string): Promise<void>;
    templates : ITemplateField[];
    ref: React.MutableRefObject<HTMLInputElement>;
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
    FData = 'Data',
    FBool = 'Sim/Não'
}
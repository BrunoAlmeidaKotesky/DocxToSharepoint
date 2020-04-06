import { IDropdownOption } from 'office-ui-fabric-react';

export interface ITemplateField {
   readonly field: string;
   readonly fieldType: FieldTypess; 
   readonly choice?: {choices: string[], type: 0|1|2};
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

export enum ChoiceFieldType {
    Dropdown = 0,
    RadioButtons = 1,
    CheckBox = 2
}
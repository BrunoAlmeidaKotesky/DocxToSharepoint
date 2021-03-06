import { IDropdownOption } from 'office-ui-fabric-react';
import { FieldTypess } from './../interfaces/ITemplate';
export type RDispatch<T> = React.Dispatch<React.SetStateAction<T>>;
export type Dispatch = (action: any/*ActionType*/) => void;
export type RNodes = { children: React.ReactNode };
export type RInput = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
export type PopulateFieldTypes = {idx: string, isEditing?: boolean, option?: IDropdownOption[]};
export type ChangeType = {idx: string, type:FieldTypess};

export enum FileTypes{
    XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    CSV = "application/vnd.ms-excel",
    JSON = "application/json"
}
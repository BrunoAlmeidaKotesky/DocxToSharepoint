import { ITemplateField } from './ITemplate';
import { IDropdownOption } from 'office-ui-fabric-react';

export interface IStore {
    readonly loaded: boolean;
    readonly templates: ITemplateField[];
    readonly comboOpt: IDropdownOption[];
    readonly isEdit: { edit: boolean, selectedIdx: string };
    readonly listOpt: IDropdownOption[];
}

export interface IFileSave {
    listName: string;
    listId: string;
    file: IDocxFile;

}

export interface IDocxFile { 
    fileUrl: string; 
    fileName: string; 
    type:string;
}
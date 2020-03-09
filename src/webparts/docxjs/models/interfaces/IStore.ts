import { ITemplateField } from './ITemplate';
import {IDropdownOption} from 'office-ui-fabric-react';

export interface IStore {
    readonly loaded: boolean;
    readonly templates: ITemplateField[];
    comboOpt: IDropdownOption[];
    readonly isEdit: { edit: boolean, selectedIdx: string };
}
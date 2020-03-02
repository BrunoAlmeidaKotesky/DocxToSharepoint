import { ITemplateField } from './ITemplate';
import {IDropdownOption} from 'office-ui-fabric-react';

export interface IStore {
    templates: ITemplateField[];
    comboOpt: IDropdownOption[];
    isEdit: { edit: boolean, selectedIdx: string };
}
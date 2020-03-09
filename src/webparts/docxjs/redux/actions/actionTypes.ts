import { IDropdownOption } from 'office-ui-fabric-react';
import { ITemplateField, FieldTypess } from './../../models/interfaces/ITemplate';
import { IStore } from "../../models/interfaces/IStore";


 
export const SET_INITIAL_TEMPLATES = 'SET_INITIAL_TEMPLATES';

export enum PopulateAction {
    POPULATE_LIST_TEMPLATE = 'POPULATE_LIST_TEMPLATE',
    CHANGE_ITEM_TYPE = 'CHANGE_ITEM_TYPE'
}
export type PopulateFieldTypes = {idx: string, isEditing?: boolean, option?: IDropdownOption[]};
export type ChangeType = {idx: string, type:FieldTypess};

interface FileHandler {
    type: typeof SET_INITIAL_TEMPLATES;
    payload?: ITemplateField[];
  }

interface ChangeTemplateType {
  type: PopulateAction.CHANGE_ITEM_TYPE;
  payload?: ChangeType;
}
interface PopulateTemplate {
  type: PopulateAction.POPULATE_LIST_TEMPLATE;
  payload?: PopulateFieldTypes;
}
  export type TemplateActions = PopulateTemplate | FileHandler | ChangeTemplateType;
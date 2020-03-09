import { IDropdownOption } from 'office-ui-fabric-react';
import { ITemplateField, FieldTypess } from './../../models/interfaces/ITemplate';
import { IStore } from "../../models/interfaces/IStore";


export enum Actions {
    POPULATE_LIST_TEMPLATE = 'POPULATE_LIST_TEMPLATE',
    CHANGE_ITEM_TYPE = 'CHANGE_ITEM_TYPE',
    SET_INITIAL_TEMPLATES = 'SET_INITIAL_TEMPLATES',
    RESET_STATE = 'RESET_STATE'
}

export type PopulateFieldTypes = {idx: string, isEditing?: boolean, option?: IDropdownOption[]};
export type ChangeType = {idx: string, type:FieldTypess};

interface FileHandler {
    type: Actions.SET_INITIAL_TEMPLATES;
    payload?: ITemplateField[];
  }

interface ChangeTemplateType {
  type: Actions.CHANGE_ITEM_TYPE;
  payload?: ChangeType;
}
interface PopulateTemplate {
  type: Actions.POPULATE_LIST_TEMPLATE;
  payload?: PopulateFieldTypes;
}

interface ResetFile {
  type: Actions.RESET_STATE;
}
  export type TemplateActions = PopulateTemplate | FileHandler | ChangeTemplateType | ResetFile;
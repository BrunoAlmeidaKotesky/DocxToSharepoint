import { IDropdownOption } from 'office-ui-fabric-react';
import { ITemplateField, ChoiceFieldType } from './../../models/interfaces/ITemplate';
import {PopulateFieldTypes, ChangeType} from '../../models/types/types';
export enum Actions {
    POPULATE_LIST_TEMPLATE = 'POPULATE_LIST_TEMPLATE',
    CHANGE_ITEM_TYPE = 'CHANGE_ITEM_TYPE',
    SET_INITIAL_TEMPLATES = 'SET_INITIAL_TEMPLATES',
    RESET_STATE = 'RESET_STATE',
    LOAD_LOOKUP_LIST = 'LOAD_LOOKUP_LIST',
    LOAD_LOOKUP_FIELD = 'LOAD_LOOKUP_FIELD',
    CHANGE_TEMPLATE_LOOKUP = 'CHANGE_TEMPLATE_LOOKUP',
    SET_LOOKUP_VALUES = 'SET_LOOKUP_VALUES',
    SET_LOOKUP_LIST = 'SET_LOOKUP_LIST',
    CREATE_SUCCESS_LIST = 'CREATE_SUCCESS_LIST',
    CREATE_FAILURE_LIST = 'CREATE_FAILURE_LIST',
    CREATE_CALL_LIST = 'CREATE_CALL_LIST',
    CHANGE_CHOICE_TYPE = 'CHANGE_CHOICE_TYPE',
    CHANGE_CHOICE_OPTIONS = 'CHANGE_CHOICE_OPTIONS'
}

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

interface LoadLists {
  type: Actions.LOAD_LOOKUP_LIST;
  payload?: {listCombo: IDropdownOption[]};
}

interface LoadLookUp {
  type: Actions.LOAD_LOOKUP_FIELD;
  payload: {allFields: IDropdownOption[], field: string};
}

interface SetLookUp {
  type: Actions.SET_LOOKUP_VALUES;
  payload:  {fieldName: string, tempIdxField: string};
}

interface SetLookUpList {
  type: Actions.SET_LOOKUP_LIST;
  payload:{ listName:string, tempIdxField: string};
}

interface SetChoiceType{
  type: Actions.CHANGE_CHOICE_TYPE;
  payload: {fieldIdx: string , type:ChoiceFieldType};
}
interface SetChoiceChoices {
  type: Actions.CHANGE_CHOICE_OPTIONS;
  payload: { options: string[], fieldIdx:string};
}

export type TemplateActions = PopulateTemplate | FileHandler | ChangeTemplateType |
                              ResetFile | LoadLists | LoadLookUp | SetLookUp |
                              SetLookUpList | SetChoiceType | SetChoiceChoices;
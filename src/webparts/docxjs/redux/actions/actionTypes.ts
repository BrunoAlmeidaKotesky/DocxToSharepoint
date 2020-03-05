import { ITemplateField } from './../../models/interfaces/ITemplate';
import { IStore } from "../../models/interfaces/IStore";


 
export const SET_INITIAL_TEMPLATES = 'SET_INITIAL_TEMPLATES';
export enum PopulateAction {
    POPULATE_LIST_TEMPLATE = 'POPULATE_LIST_TEMPLATE'
}

interface FileHandler {
    type: typeof SET_INITIAL_TEMPLATES;
    payload?: ITemplateField[];
  }

interface PopulateTemplate {
    type:  PopulateAction;
    payload?: IStore;
}
  export type TemplateActions = PopulateTemplate | FileHandler;
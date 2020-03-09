import { IStore } from './../../models/interfaces/IStore';
import { IDropdownOption } from 'office-ui-fabric-react';
import { TemplateActions, SET_INITIAL_TEMPLATES, PopulateAction, PopulateFieldTypes } from './actionTypes';
import { ITemplateField, FieldTypess } from './../../models/interfaces/ITemplate';
import {action} from "typesafe-actions";

export function setInitialTemplate(template:ITemplateField[]):TemplateActions{
    return action(SET_INITIAL_TEMPLATES, template);
}

export function populateFieldTypeDdp({idx, isEditing, option}:PopulateFieldTypes):TemplateActions {
    return action(PopulateAction.POPULATE_LIST_TEMPLATE, {idx, isEditing, option});
}

export function changeTemplateFieldType(idx:string, type: FieldTypess):TemplateActions{
    return action(PopulateAction.CHANGE_ITEM_TYPE, {idx, type});
}
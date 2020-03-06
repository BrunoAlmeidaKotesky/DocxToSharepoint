import { TemplateActions, SET_INITIAL_TEMPLATES } from './actionTypes';
import { ITemplateField } from './../../models/interfaces/ITemplate';
import {action} from "typesafe-actions";

export function setInitialTemplate(template:ITemplateField[]):TemplateActions{
    return action(SET_INITIAL_TEMPLATES, template);
}
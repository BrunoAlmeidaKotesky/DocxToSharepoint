import { TemplateActions, SET_INITIAL_TEMPLATES } from './actionTypes';
import { ITemplateField } from './../../models/interfaces/ITemplate';

export function setInitialTemplate(template:ITemplateField[]):TemplateActions{
    return {type: SET_INITIAL_TEMPLATES, payload: template};
}
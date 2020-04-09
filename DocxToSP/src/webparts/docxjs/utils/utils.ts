import { ChoiceFieldType } from './../models/interfaces/ITemplate';
import { IDropdownOption } from 'office-ui-fabric-react';
import { ITemplateField, FieldTypess } from '../models/interfaces/ITemplate';
export enum LookUpFieldStatus {
    NoLookUps,
    NoValues,
    HasValues,
    Undefined
}
let enumResult: LookUpFieldStatus = LookUpFieldStatus.Undefined;

export function assertLookFieldValue(templates:ITemplateField[]) {
    const hasLookUp = templates.filter(f => {
        return f.fieldType === FieldTypess.FLookUp;
    });
    if (hasLookUp.length === 0)
    enumResult = LookUpFieldStatus.NoLookUps;
    if (hasLookUp.length > 0) {
        hasLookUp.forEach(i => {
            if (i.lookup.field === null || i.lookup.list === null)
            enumResult = LookUpFieldStatus.NoValues;
            else enumResult = LookUpFieldStatus.HasValues;
        });
    }
    return enumResult;
}

export function splitString(str:string){
    let allString = str.trim();
    let options = allString.split(',').map(i => i.trim());
    return options;
}

export const getFieldRef = (temlates: ITemplateField[]) =>  temlates.map(i => `${i.field}|${i.originalFieldName}`).join(';');


/**@constant */
export const choicesFieldOpt: IDropdownOption[] = [
    { key: ChoiceFieldType.Dropdown, text: 'Dropdown' }, 
    { key: ChoiceFieldType.RadioButtons, text: 'Radio Button' }, 
    { key: ChoiceFieldType.CheckBox, text: 'Check Box'}];
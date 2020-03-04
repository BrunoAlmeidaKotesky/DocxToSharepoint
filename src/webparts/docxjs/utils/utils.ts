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
            if (i.lookup.field === undefined || i.lookup.list === undefined)
            enumResult = LookUpFieldStatus.NoValues;
            else enumResult = LookUpFieldStatus.HasValues;
        });
    }
    return enumResult;
}
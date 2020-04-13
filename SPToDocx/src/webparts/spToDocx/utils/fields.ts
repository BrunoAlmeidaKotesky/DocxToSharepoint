import { IFieldContent } from './../models/interfaces/IUseFieldGen';
export function insertFieldWithTemplateData(fields: IFieldContent[], documentFieldRef: string){
    let fieldKeyVal = documentFieldRef.split(';');
    let fileValue = fieldKeyVal.map(f => f.split('|'));
    fields.forEach(t => {
        
        let value: string;
        fileValue.forEach(str => {
            if(str[0] === t.Title){
                value = str[1];
            }
        });
        t.documentFieldRef = value;
    });
    return fields;
}
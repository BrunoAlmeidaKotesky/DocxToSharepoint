
import * as PizZip from 'pizzip';
import * as React from 'react';
import Docxtemplater from 'docxtemplater';
let  InspectModule = require('docxtemplater/js/inspect-module');
import {useState} from 'react';
import {ITemplateField, useTempGen, FieldTypess} from './interfaces/ITemplate';

let iModule = InspectModule();

export function useTemplateGen():useTempGen {
    const  [templates, setTemplate] = useState<ITemplateField[]>([]);

     function validateFieldType(field:string){
        let fieldObj: ITemplateField;
        if(field.startsWith('t')){
             fieldObj = {field: field.substring(1), fieldType: FieldTypess.FSingleLine};
            return fieldObj;
        }
        else if(field.startsWith('n')){
             fieldObj = {field: field.substring(1), fieldType: FieldTypess.FNumeric};
            return fieldObj;
        }
        else if(field.startsWith('$')){
             fieldObj = {field: field.substring(1), fieldType: FieldTypess.FMonetary};
            return fieldObj;
        }
        else if(field.startsWith('c')){
             fieldObj = {field: field.substring(1), fieldType: FieldTypess.FLookUp};
            return fieldObj;
        }
        else if(field.startsWith('e')){
             fieldObj = {field: field.substring(1), fieldType: FieldTypess.FChoice};
            return fieldObj;
        }
        else if(field.startsWith('d')){
            fieldObj = {field: field.substring(1), fieldType: FieldTypess.FData};
           return fieldObj;
       }
        else {
             fieldObj = {field: field, fieldType: FieldTypess.FSingleLine};
            return fieldObj;
        }
    }

     function getFileTags(doc){
        doc.attachModule(iModule);
        doc.render(); // doc.compile can also be used to avoid having runtime errors
        var parsedTags = iModule.getAllTags();
        //let fileTags = String(doc.getFullText()).match(tagRegex);
        let tags = Object.getOwnPropertyNames(parsedTags);
        let allTags = tags.map(field =>{
            field = field.replace('{','').replace('}','');
            return validateFieldType(field);
        });
        return allTags;
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const file:File =(<HTMLInputElement>e.target).files[0];
        const reader = new FileReader();

       reader.onload = async () => {
            let zip = new PizZip(reader.result);
            let doc = new Docxtemplater().loadZip(zip);
            let fieldsToSharePoint = await getFileTags(doc);
            setTemplate(fieldsToSharePoint);

        };
        reader.readAsBinaryString(file);
    };

    return [templates, setTemplate,handleFile];
}
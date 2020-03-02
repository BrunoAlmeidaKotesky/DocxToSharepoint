import { IDropdownOption } from 'office-ui-fabric-react';

import * as PizZip from 'pizzip';
import * as React from 'react';
import Docxtemplater from 'docxtemplater';
let  InspectModule = require('docxtemplater/js/inspect-module');
import {useState, useContext} from 'react';
import {ITemplateField, FieldTypess} from './interfaces/ITemplate';
import {stateCtx, dispatchCtx} from '../components/DocxContext';
import { createList, addFields } from '../services/SharepointServices';
import { useDocGen } from './types/types';

let iModule = InspectModule();

export function useTemplateGen():useDocGen {
    //const  [templates, setTemplate] = useState<ITemplateField[]>([]);

    const {templates, isEdit, comboOpt} = useContext(stateCtx);
    const setState = useContext(dispatchCtx);

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
        let uniqueTags = Array.from(new Set([...tags]));
        
        let allTags = uniqueTags.map(field =>{
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
            setState(pState => ({...pState, templates: fieldsToSharePoint}));

        };
        reader.readAsBinaryString(file);
    };

    const changeEditForm = (idx: string) => {
        if (templates.length !== 0 && templates !== undefined) {
            let actualOpt: IDropdownOption[] = [];
            templates.forEach(t => {
                if (t.fieldType === FieldTypess.FSingleLine) {
                    actualOpt.push({ key: t.fieldType, text: "Texto", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FMonetary) {
                    actualOpt.push({ key: t.fieldType, text: "Moeda", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FData) {
                    actualOpt.push({ key: t.fieldType, text: "Data", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FNumeric) {
                    actualOpt.push({ key: t.fieldType, text: "Num", selected: true, data: t.field });
                }
                setState(pState=> ({...pState, comboOpt: actualOpt}));
            });
            console.log(templates);
        }
        setState(pState=> ({...pState, isEdit: {edit: !isEdit.edit, selectedIdx: idx}}));
    };
    const handleCombosChange=(opt:string, event:React.FormEvent<HTMLDivElement>, ddpOpt:IDropdownOption)=> {
        console.log(opt);
        console.log(ddpOpt);
        console.log(event);
        templates.filter((t)=>{
            if(t.field === opt)
             t.fieldType = (ddpOpt.key as FieldTypess);
        });
        setState(pState =>({...pState, templates: templates}));
        
    };
    
    const sendFields = async (listName: string) => {
        try {
            await createList(listName);
            await addFields(listName, templates);
        } catch (e) {
            console.log(e);
        }
    };

    return {handleFile, changeEditForm, handleCombosChange, sendFields};
}
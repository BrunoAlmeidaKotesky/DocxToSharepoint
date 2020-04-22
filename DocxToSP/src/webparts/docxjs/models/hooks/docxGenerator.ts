import { RootState } from './../../redux/store';
import PizZip from 'pizzip';
import * as React from 'react';
import Docxtemplater from 'docxtemplater';
let InspectModule = require('docxtemplater/js/inspect-module');
import { ITemplateField, FieldTypess, ITemplateGen } from '../interfaces/ITemplate';
import { createList, addFields,uploadFile } from '../../services/SharepointServices';
import {assertLookFieldValue, LookUpFieldStatus, getFieldRef} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialTemplate, resetState} from '../../redux/actions/actions';
import {setInitFile} from '../../redux/actions/fileActions';
import { ChoiceFieldType } from './../interfaces/ITemplate';

let iModule = InspectModule();

export function useTemplateGen(): ITemplateGen {
    const dispatch = useDispatch();
    const templates = useSelector((state:RootState) => state.templatesReducer.templates);
    const fileProp = useSelector((state:RootState) => state.fileReducer);

    const [isFirstFile, setFileOrder] = React.useState(0);
    const ref = React.useRef<HTMLInputElement>(undefined);

    function validateFieldType(field: string, originalFieldName: string) {
        let fieldObj: ITemplateField;
        if (field.startsWith('t')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FSingleLine,
                         originalFieldName, 
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else if (field.startsWith('n')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FNumeric,
                         originalFieldName,  
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else if (field.startsWith('$')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FMonetary, 
                         originalFieldName, 
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else if (field.startsWith('c')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FLookUp, 
                         originalFieldName,          
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else if (field.startsWith('e')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FChoice, 
                         originalFieldName, 
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else if (field.startsWith('d')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FData, 
                         originalFieldName,          
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
        else {
            fieldObj = { field: field, fieldType: FieldTypess.FSingleLine, 
                         originalFieldName, 
                         lookup: { field: null, list: null, allFields: [] },
                         choice: { choices: [], type: ChoiceFieldType.Dropdown}};
            return fieldObj;
        }
    }

    function getFileTags(doc) {
        doc.attachModule(iModule);
        doc.render(); // doc.compile can also be used to avoid having runtime errors
        var parsedTags = iModule.getAllTags();
        //let fileTags = String(doc.getFullText()).match(tagRegex);
        let tags = Object.getOwnPropertyNames(parsedTags);
        let uniqueTags = Array.from(new Set([...tags]));

        let allTags = uniqueTags.map(field => {
           const fieldName = field.replace('{', '').replace('}', '');
            return validateFieldType(fieldName, field);
        });
        return allTags;
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = (<HTMLInputElement>e.target).files[0];
        const fileName = file.name;
        const type = file.type;
        const fileUrl = URL.createObjectURL(file);

        const reader = new FileReader();
        
        reader.onload = async () => {
            if(isFirstFile === 1){
                dispatch(resetState());
            }
                let zip = new PizZip(reader.result);
                let doc = new Docxtemplater().loadZip(zip);
                let fieldsToSharePoint = await getFileTags(doc);
                dispatch(setInitialTemplate(fieldsToSharePoint));
                dispatch(setInitFile({fileName, fileUrl, type}));
                fieldsToSharePoint = [];
                ref.current.value = '';
                setFileOrder(1);
        };
        reader.readAsBinaryString(file);
    };

    const sendFields = async (listName: string) => {

        try {
            const canUpload = assertLookFieldValue(templates);
            const fieldRef = getFieldRef(templates);

            if (canUpload === LookUpFieldStatus.NoLookUps) {
                let listId =  await createList(listName);
                
                await addFields(listName, templates);
                let updateRes = await uploadFile({listName, listId, file: fileProp.file}, fieldRef);
            }
            else if (canUpload === LookUpFieldStatus.NoValues) {
                console.log('Não pode fazer upload porque tem lookup sem valores');
            }
            else if (canUpload === LookUpFieldStatus.HasValues) {
                let listId =  await createList(listName);
                
                await addFields(listName, templates);
                let updateRes = await uploadFile({listName, listId, file:fileProp.file}, fieldRef);
            }

        } catch (e) {
            console.log(e);
        }
    };

    return { handleFile, sendFields, templates, ref };
}
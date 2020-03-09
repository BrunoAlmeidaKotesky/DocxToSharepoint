import { RootState } from './../../redux/store';
import PizZip from 'pizzip';
import * as React from 'react';
import Docxtemplater from 'docxtemplater';
let InspectModule = require('docxtemplater/js/inspect-module');
import { ITemplateField, FieldTypess, ITemplateGen } from '../interfaces/ITemplate';
import { createList, addFields } from '../../services/SharepointServices';
import {assertLookFieldValue, LookUpFieldStatus} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialTemplate, resetState} from '../../redux/actions/actions';

let iModule = InspectModule();

export function useTemplateGen(): ITemplateGen {
    const dispatch = useDispatch();
    const templates = useSelector((state:RootState) => state.templatesReducer.templates);
    const [isFirstFile, setFileOrder] = React.useState(0);
    const ref = React.useRef<HTMLInputElement>(undefined);

    function validateFieldType(field: string) {
        let fieldObj: ITemplateField;
        if (field.startsWith('t')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FSingleLine, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else if (field.startsWith('n')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FNumeric, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else if (field.startsWith('$')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FMonetary, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else if (field.startsWith('c')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FLookUp, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else if (field.startsWith('e')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FChoice, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else if (field.startsWith('d')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FData, lookup: { field: null, list: null } };
            return fieldObj;
        }
        else {
            fieldObj = { field: field, fieldType: FieldTypess.FSingleLine };
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
            field = field.replace('{', '').replace('}', '');
            return validateFieldType(field);
        });
        return allTags;
    }

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = (<HTMLInputElement>e.target).files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            if(isFirstFile === 1){
                dispatch(resetState());
            }
                let zip = new PizZip(reader.result);
                let doc = new Docxtemplater().loadZip(zip);
                let fieldsToSharePoint = await getFileTags(doc);
                dispatch(setInitialTemplate(fieldsToSharePoint));
                fieldsToSharePoint = [];
                ref.current.value = '';
                setFileOrder(1);
        };
        reader.readAsBinaryString(file);
    };

    const sendFields = async (listName: string) => {

        try {
            const canUpload = assertLookFieldValue(templates);
            if (canUpload === LookUpFieldStatus.NoLookUps) {
                await createList(listName);
                await addFields(listName, templates);
            }
            else if (canUpload === LookUpFieldStatus.NoValues) {
                console.log('Não pode fazer upload porque tem lookup sem valores');
            }
            else if (canUpload === LookUpFieldStatus.HasValues) {
                await createList(listName);
                await addFields(listName, templates);
            }

        } catch (e) {
            console.log(e);
        }
    };

    return { handleFile, sendFields, templates, ref };
}
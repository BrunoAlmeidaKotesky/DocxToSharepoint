import { TemplateActions } from './../../redux/actions/actionTypes';
import { RootState } from './../../redux/store';
import { templateReducer } from './../../redux/reducers/templateReducer';
import PizZip from 'pizzip';
import * as React from 'react';
import Docxtemplater from 'docxtemplater';
let InspectModule = require('docxtemplater/js/inspect-module');
import { useContext } from 'react';
import { ITemplateField, FieldTypess, ITemplateGen } from '../interfaces/ITemplate';
import { stateCtx, dispatchCtx } from '../../components/DocxContext';
import { createList, addFields } from '../../services/SharepointServices';
import {assertLookFieldValue, LookUpFieldStatus} from '../../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {setInitialTemplate} from '../../redux/actions/actions';
import configureStore from '../../redux/store';

let iModule = InspectModule();

export function useTemplateGen(): ITemplateGen {
    //const { templates } = useContext(stateCtx);
    //const setState = useContext(dispatchCtx);
    const store = configureStore();
    const dispatch=(T:TemplateActions)=> store.dispatch(T);
    const state = store.getState();
    const {templates} = state.templates;
    
    

    function validateFieldType(field: string) {
        let fieldObj: ITemplateField;
        if (field.startsWith('t')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FSingleLine, lookup: { field: undefined, list: undefined } };
            return fieldObj;
        }
        else if (field.startsWith('n')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FNumeric, lookup: { field: undefined, list: undefined } };
            return fieldObj;
        }
        else if (field.startsWith('$')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FMonetary, lookup: { field: undefined, list: undefined } };
            return fieldObj;
        }
        else if (field.startsWith('c')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FLookUp, lookup: { field: undefined, list: undefined } };
            return fieldObj;
        }
        else if (field.startsWith('e')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FChoice, lookup: { field: undefined, list: undefined } };
            return fieldObj;
        }
        else if (field.startsWith('d')) {
            fieldObj = { field: field.substring(1), fieldType: FieldTypess.FData, lookup: { field: undefined, list: undefined } };
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
            let zip = new PizZip(reader.result);
            let doc = new Docxtemplater().loadZip(zip);
            let fieldsToSharePoint = await getFileTags(doc);
            //setState(pState => ({ ...pState, templates: fieldsToSharePoint }));
            dispatch(setInitialTemplate(fieldsToSharePoint));
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

    return { handleFile, sendFields };
}
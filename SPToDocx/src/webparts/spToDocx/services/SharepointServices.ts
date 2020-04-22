import { getFieldFormat } from './../utils/constants';
import { sp } from "@pnp/sp";
import {IListFile,IListFilter} from '../models/interfaces/ITemplateList';
import { IFieldContent } from './../models/interfaces/IUseFieldGen'; 
import { insertFieldWithTemplateData } from './../utils/fields';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import { FieldTypes } from '@pnp/sp/fields';

async function getTemplateLibrary(){
    const listFilter:IListFilter[]=[];
    const templates = await sp.web.getFolderByServerRelativeUrl('Templates').files.get();
    for (const tempItem of templates) {
        let _ServerRelativeUrl = tempItem.ServerRelativeUrl;
        let {GUID, ListId, ListName, Title, documentFieldRef, fileType} = await sp.web.getFolderByServerRelativeUrl(_ServerRelativeUrl).getItem<IListFile>();
        let fileBlob = await sp.web.getFileByServerRelativeUrl(_ServerRelativeUrl).getBlob();
        let file = new File([fileBlob], Title, {type: fileType});

        listFilter.push({file, items: {GUID, ListId, ListName, Title, documentFieldRef, fileType}});
    }
    return listFilter;
}

export async function loadTemplateLists(){
    const listQuery = await getTemplateLibrary();
    const lists:IListFilter[]=[];

    for (const item of listQuery) {
        let list = await sp.web.lists.getById(item.items.ListId).get();
        let documentFieldRef = item.items.documentFieldRef;
        let ListId = list.Id;
        let ListName = list.Title;
        let file = item.file;
        let fileName = item.items.Title;

        lists.push({file, items: {ListId, ListName, Title: fileName, documentFieldRef,fileType: file.type}});
    }
    return lists;
}

const getLookUpFields = async ({lookUpId, lookupField}) => await sp.web.lists.getById(lookUpId).items.select(lookupField).get();

const insertLookUpChoices = async (fields:IFieldContent[]) => {
    for(const f of fields) {
        if(f.FieldTypeKind === FieldTypes.Lookup){
            let lFiekdId = getFieldFormat(f.SchemaXml, 'List');
            let lookUpId = lFiekdId.replace('{','').replace('}','');
            let lookupField = f.LookupField;
            let lookUpOptions =  await getLookUpFields({lookUpId,lookupField});
            let choices: string[]=[];
            lookUpOptions.forEach(it => {
                delete(it['odata.editLink']);
                delete(it['odata.etag']);        
                delete(it['odata.id']);
                delete(it['odata.type']);
                let lookUpChoices = Object.entries<string>(it);
                lookUpChoices.forEach((c:[string, string]) => {
                    let key = c[0];
                    let value = c[1];
                    if(key === lookupField){
                        choices.push(value);
                    }
                });
            });
            f.Choices = choices;
        }
    }
    return fields;
};

export const loadFieldsFromList = async (listId:string, documentFieldRef: string) => {
    let allBaseFields = await sp.web.lists.getById(listId).fields.select().filter('FromBaseType eq false').get();
    let fieldWData = insertFieldWithTemplateData((allBaseFields as IFieldContent[]), documentFieldRef);
    let fields = await insertLookUpChoices(fieldWData);

    return fields;
};


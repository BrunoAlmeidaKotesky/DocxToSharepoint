import { sp } from "@pnp/sp";
import {IListFile,IListFilter} from '../models/interfaces/ITemplateList';
import { IFieldContent } from './../models/interfaces/IUseFieldGen'; 
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/items";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/fields";

async function getTemplateLibrary(){
    const listFilter:IListFilter[]=[];
    const templates = await sp.web.getFolderByServerRelativeUrl('Templates').files.get();
    for (const tempItem of templates) {
        let _ServerRelativeUrl = tempItem.ServerRelativeUrl;
        let {GUID, ListId, ListName, Title, documentFieldRef} = await sp.web.getFolderByServerRelativeUrl(_ServerRelativeUrl).getItem<IListFile>();
        let fileBlob = await sp.web.getFileByServerRelativeUrl(_ServerRelativeUrl).getBlob();
        let file = new File([fileBlob], Title);

        listFilter.push({file, items: {GUID, ListId, ListName, Title, documentFieldRef}});
         console.log(fileBlob, file);
    }
    return listFilter;
}

export async function loadAllLists(){
    const listQuery = await getTemplateLibrary();
    const lists:IListFilter[]=[];

    for (const item of listQuery) {
        let list = await sp.web.lists.getById(item.items.ListId).get();
        let documentFieldRef = item.items.documentFieldRef;
        let ListId = list.Id;
        let ListName = list.Title;
        let file = item.file;
        let fileName = item.items.Title;

        lists.push({file, items: {ListId, ListName, Title: fileName, documentFieldRef}});
    }
    return lists;
}

export const loadFieldsFromList = async (listId:string) => {
    let fields = await sp.web.lists.getById(listId).fields.select().filter('FromBaseType eq false').get();
    return (fields as IFieldContent[]);
};
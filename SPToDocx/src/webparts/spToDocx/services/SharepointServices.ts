import { IFieldContent } from './../models/interfaces/IUseFieldGen';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields"; 
import { DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType, ChoiceFieldFormatType, FieldTypes } from "@pnp/sp/fields/types";

export const loadAllLists = async () => await sp.web.lists.filter('BaseType eq 0').get();
export const loadFieldsFromList = async (listId:string) => {
    let fields = await sp.web.lists.getById(listId).fields.select().filter('FromBaseType eq false').get();
    return (fields as IFieldContent[]);
};
import { ITemplateField, FieldTypess } from './../docxjs/models/interfaces/ITemplate';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields"; 
import { IField, DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType } from "@pnp/sp/fields/types";

export async function createList(listName: string) {
    const listAddResult = await sp.web.lists.add(listName);

    // we can work with the list created using the IListAddResult.list property:
    const listInfo = await listAddResult.list.select(listName)();
}

export async function addFields(listName: string, field: ITemplateField[]) {
    console.log('ex');
    let batch = sp.web.createBatch();
    sp.web.lists.inBatch(batch).get();
    let list = await sp.web.lists.getByTitle(listName);
    
    let res = field.map(async f =>{
       
       if (f.fieldType === FieldTypess.FSingleLine) {
           
            await list.fields.addText(f.field, 255);
            await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
       }
   
       else if (f.fieldType === FieldTypess.FNumeric) {
           
           await list.fields.addNumber(f.field);
           await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
            
       }
   
       else if (f.fieldType === FieldTypess.FChoice) {
           
           await list.fields.addChoice(f.field, f.choice.choices, f.choice.type);
           await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
            
       }
   
       else if (f.fieldType === FieldTypess.FMonetary) {//1046 = R$ BRL
           
           await list.fields.addCurrency(f.field, undefined, undefined, 1046);
           await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
            
       }
   
       else if (f.fieldType === FieldTypess.FLookUp) {
         
               const listLookUp = await sp.web.lists.getByTitle(name)();
   
               await list.fields.addLookup(f.field, listLookUp.Id, f.lookup.field);
               await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
                
       }
   
       else if (f.fieldType === FieldTypess.FData) {
           
           await list.fields.addDateTime(f.field, DateTimeFieldFormatType.DateOnly, CalendarType.Gregorian, DateTimeFieldFriendlyFormatType.Disabled);
           await list.fields.getByTitle(f.field).setShowInDisplayForm(true);
            
       }
   
    });

    batch.execute().then(()=>console.log('Foi')).catch(console.log);
}
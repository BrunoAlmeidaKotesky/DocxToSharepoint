import { ITemplateField, FieldTypess } from './../docxjs/models/interfaces/ITemplate';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields"; import { IField, DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType } from "@pnp/sp/fields/types";
import { IFieldAddResult } from "@pnp/sp/fields";

export async function createList(listName: string) {
    const listAddResult = await sp.web.lists.add(listName);

    // we can work with the list created using the IListAddResult.list property:
    const listInfo = await listAddResult.list.select(listName)();
}

export async function addFields(listName: string, fields: ITemplateField[]) {
    const results = fields.map(async (f) => {
         await handleFileType(f, listName);
    });
    Promise.all(results);
    return results;
}

async function handleFileType(f: ITemplateField, listName: string) {
    let field: IFieldAddResult;
    let batch = sp.web.createBatch();
    if (f.fieldType === FieldTypess.FSingleLine) {
         field = await sp.web.lists.getByTitle(listName).fields.addText(f.field, 255);
         await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
         return field;
    }

    else if (f.fieldType === FieldTypess.FNumeric) {
         field = await sp.web.lists.getByTitle(listName).fields.addNumber(f.field);
         await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
         return field;
    }

    else if (f.fieldType === FieldTypess.FChoice) {
         field = await sp.web.lists.getByTitle(listName).fields.addChoice(f.field, f.choice.choices, f.choice.type);
         await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
         return field;
    }

    else if (f.fieldType === FieldTypess.FMonetary) {//1046 = R$ BRL
         field = await sp.web.lists.getByTitle(listName).fields.addCurrency(f.field, 0, 99999999, 1046);
         await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
         return field;
    }

    else if (f.fieldType === FieldTypess.FLookUp) {
        f.lookup.list.forEach(async name => {
            const list = await sp.web.lists.getByTitle(name)();

             field = await sp.web.lists.getByTitle(listName).fields.addLookup(f.field, list.Id, f.lookup.field);
             await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
             return field;
        });
    }

    else if (f.fieldType === FieldTypess.FData) {
         field = await sp.web.lists.getByTitle(listName).fields.addDateTime(f.field, DateTimeFieldFormatType.DateOnly, CalendarType.Gregorian, DateTimeFieldFriendlyFormatType.Disabled);
         await sp.web.lists.getByTitle(listName).fields.getByTitle(f.field).setShowInDisplayForm(true);
         return field;
    }
}
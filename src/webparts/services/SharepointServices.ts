import { ITemplateField } from './../docxjs/models/interfaces/ITemplate';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields"; import { IField, DateTimeFieldFormatType, CalendarType, DateTimeFieldFriendlyFormatType } from "@pnp/sp/fields/types";
import { IFieldAddResult, FieldTypes } from "@pnp/sp/fields";

async function createList(listName: string) {
    const listAddResult = await sp.web.lists.add(listName);

    // we can work with the list created using the IListAddResult.list property:
    const listInfo = await listAddResult.list.select(listName)();
}

async function addFields(listName: string, fields: ITemplateField[]) {
    const results = fields.map(async (f) => {
         await handleFileType(f, listName);
    });
    Promise.all(results);
    return results;
}

async function handleFileType(f: ITemplateField, listName: string) {
    let field: IFieldAddResult;
    if (f.fieldType === FieldTypes.Text) {
        return field = await sp.web.lists.getByTitle(listName).fields.addText(f.field, 255, { FieldTypeKind: 3, Group: "My Group" });
    }

    else if (f.fieldType === FieldTypes.Number) {
        return field = await sp.web.lists.getByTitle(listName).fields.addNumber(f.field);
    }

    else if (f.fieldType === FieldTypes.Choice) {
        return field = await sp.web.lists.getByTitle(listName).fields.addChoice(f.field, f.choice.choices, f.choice.type);
    }

    else if (f.fieldType === FieldTypes.Currency) {//1046 = R$ BRL
        return field = await sp.web.lists.getByTitle(listName).fields.addCurrency(f.field, 0, 999999999, 1046);
    }

    else if (f.fieldType === FieldTypes.Lookup) {
        f.lookup.list.forEach(async name => {
            const list = await sp.web.lists.getByTitle(name)();

            return field = await sp.web.lists.getByTitle(listName).fields.addLookup(f.field, list.Id, f.lookup.field);
        });
    }

    else if (f.fieldType === FieldTypes.DateTime) {
        return field = await sp.web.lists.getByTitle(listName).fields.addDateTime(f.field, DateTimeFieldFormatType.DateOnly, CalendarType.Gregorian, DateTimeFieldFriendlyFormatType.Disabled);
    }
}
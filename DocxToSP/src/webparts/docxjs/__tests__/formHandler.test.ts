import { IDropdownOption } from 'office-ui-fabric-react';
import { ITemplateField, FieldTypess } from './../models/interfaces/ITemplate';

let templates: ITemplateField[] = [{
    field: 'campo2',
    fieldType: FieldTypess.FLookUp,
    choice: undefined,
    lookup: { field: 'f1', list: 'listA' }
}, {
    field: 'campo1',
    fieldType: FieldTypess.FLookUp,
    choice: undefined,
    lookup: { field: 'f1', list: 'listA' }
}];

it('Should modify the array', () => {

    const updateLookUp = (op: IDropdownOption) => {
        templates.forEach((el, i) => {
            if (el?.lookup) {
                if (el.field === op.text) {
                    templates[i].lookup.field = op.key.toString();
                    templates[i].lookup.list = op.data.listName;
                }
            }
        });
        console.log(templates);
    };
    updateLookUp({key: 'aaaaaaaaa', text: 'campo1', data: {listName: 'a'}});

    expect(templates).toStrictEqual([{
        field: 'campo2',
        fieldType: FieldTypess.FLookUp,
        choice: undefined,
        lookup: { field: 'f1', list: 'listA' }
    }, {
        field: 'campo1',
        fieldType: FieldTypess.FLookUp,
        choice: undefined,
        lookup: { field: 'aaaaaaaaa', list: 'a' }
    }]);
});

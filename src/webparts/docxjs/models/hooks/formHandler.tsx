import * as React from 'react';
import { FieldTypess, ITemplateField, ITemplateForm } from '../interfaces/ITemplate';
import { IDropdownOption, Text, Dropdown } from 'office-ui-fabric-react';
import { useContext } from 'react';
import { stateCtx, dispatchCtx } from '../../components/DocxContext';
import { loadAllLists, loadFieldFromList } from '../../services/SharepointServices';

export const useTemplateHandle = (): ITemplateForm => { 
    const { templates, isEdit, comboOpt, loaded } = useContext(stateCtx);
    const setState = useContext(dispatchCtx);
    const [loaded1] = React.useState([]);
    const [list, setLists] = React.useState([]);
    const [fieldLookUp, setLookUp] = React.useState([]);

    const populateLookUpList = async () => {
        const lists = await loadAllLists();
        let listCombo: IDropdownOption[] = [];
        lists.filter(l => {
            if (l.BaseType === 0 || l.BaseType === "GenericList")
                listCombo.push({ key: l.Id, text: l.Title });
        });
        setLists(listCombo);
    };

    const populateLookUpField = async (opt: IDropdownOption, field:string) => {
        let { userFields, listName } = await loadFieldFromList(opt.text);
        let comboField: IDropdownOption[] = [];
        userFields.forEach(r => {
            comboField.push({ key: r.InternalName, text: r.Title, data: {listName, field} });
        });
        setLookUp(comboField);
    };

    const updateLookUp = (op: IDropdownOption, idx:string) => {

        templates.forEach((el, i) => {
                if (el.field === idx) {
                    if(op.data.field === idx){
                        templates[i].lookup.field = op.key.toString();
                        templates[i].lookup.list = op.data.listName;
                    }
                }
        });
        console.log(templates);
        setState(pState => ({ ...pState, templates: templates }));
    };

    const changeEditForm = (idx: string) => {
        if (templates.length !== 0 && templates !== undefined) {
            let actualOpt: IDropdownOption[] = [];
            templates.forEach(t => {
                if (t.fieldType === FieldTypess.FSingleLine) {
                    actualOpt.push({ key: t.fieldType, text: "Texto", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FMonetary) {
                    actualOpt.push({ key: t.fieldType, text: "Moeda", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FData) {
                    actualOpt.push({ key: t.fieldType, text: "Data", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FNumeric) {
                    actualOpt.push({ key: t.fieldType, text: "Num", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FLookUp) {
                    actualOpt.push({ key: t.fieldType, text: "LookUp", selected: true, data: t.field });
                }
            });
            setState(pState => ({ ...pState, comboOpt: actualOpt }));
            console.log(templates);
        }
        setState(pState => ({ ...pState, isEdit: { edit: !isEdit.edit, selectedIdx: idx } }));
    };

    const handleCombosChange = (opt: string, ddpOpt: IDropdownOption) => {
        templates.filter((t) => {
            if (t.field === opt)
                t.fieldType = (ddpOpt.key as FieldTypess);
        });
        setState(pState => ({ ...pState, templates: templates }));
    };

    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField) => {
        if (edit === false) {
            if (fields.fieldType === FieldTypess.FLookUp) {
                populateLookUpList();
                if (list.length > 0) {
                    return (<>
                        <Dropdown options={list} onChanged={(opt) => populateLookUpField(opt, fields.field)} />
                        {fieldLookUp.length > 0 && <Dropdown options={fieldLookUp} onChanged={(opt) => updateLookUp(opt , idx)} />}
                    </>);
                }
            }
            else return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

        }
        else if (edit === true && idx === fields.field) {
            if (fields.fieldType === FieldTypess.FLookUp) {
                populateLookUpList();
                if (list.length > 0) {
                    return (<>
                        <Dropdown options={list} onChanged={(opt) => populateLookUpField(opt, fields.field)} />
                        {fieldLookUp.length > 0 && <Dropdown options={fieldLookUp} onChanged={(opt) => updateLookUp(opt, idx)} />}
                    </>);
                }
            }
            else return (<Dropdown id={fields.field} options={comboOpt} onChanged={(opt) => handleCombosChange(fields.field, opt)} defaultSelectedKey={fields.fieldType} />);

        }
        else if (edit === true && idx !== fields.field)
            return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

    };
    return { changeEditForm, TemplateItems };
};

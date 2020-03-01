import * as React from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/docxGenerator';
import { FieldTypess, ITemplateField } from '../models/interfaces/ITemplate';
import { Dropdown, Text, IIconProps, IconButton, IDropdownOption, DefaultButton } from 'office-ui-fabric-react';
import { createList, addFields } from '../../services/SharepointServices';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const [templates, setTemplate, handleFile] = useTemplateGen();
    const [comboOpt, setComboOpt] = React.useState<IDropdownOption[]>([]);
    const [isEdit, setEdit] = React.useState({ edit: false, selectedIdx: undefined });
    const editIco: IIconProps = { iconName: 'Edit' };

    const changeEditForm = (idx: string) => {
        if (templates.length !== 0 && templates !== undefined) {
            let actualOpt: IDropdownOption[] = [];
            templates.forEach(t => {
                if (t.fieldType === FieldTypess.FSingleLine) {
                    actualOpt.push({ key: t.fieldType, text: "Texto", selected: true });
                }
                if (t.fieldType === FieldTypess.FMonetary) {
                    actualOpt.push({ key: t.fieldType, text: "Moeda", selected: true });
                }
                if (t.fieldType === FieldTypess.FData) {
                    actualOpt.push({ key: t.fieldType, text: "Data", selected: true });
                }
                if (t.fieldType === FieldTypess.FNumeric) {
                    actualOpt.push({ key: t.fieldType, text: "Num", selected: true });
                }
                setComboOpt(actualOpt);
            });
            console.log(templates);
        }
        setEdit({ edit: !isEdit.edit, selectedIdx: idx });
    };

    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField) => {
        if (edit === false)
            return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);
        else if (edit === true && idx === fields.field)
            return (<Dropdown id={fields.field} options={comboOpt} defaultSelectedKey={fields.fieldType} />);
    };

    const sendFields = async (listName: string) => {
        try {
            await createList(listName);
            let res = await addFields(listName, templates);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    };

    return (<><input type="file" accept="docx" onChange={handleFile} />
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => changeEditForm(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, { field: t.field, fieldType: t.fieldType })}
            </div>
        ) : ''}

        <DefaultButton text="Enviar" onClick={()=>sendFields('createdByWeb')}/>
    </>);
}

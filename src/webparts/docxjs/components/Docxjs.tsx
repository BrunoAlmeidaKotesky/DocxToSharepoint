import * as React from 'react';
import { useEffect, useContext } from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/docxGenerator';
import { FieldTypess, ITemplateField } from '../models/interfaces/ITemplate';
import { Dropdown, Text, IIconProps, IconButton, IDropdownOption, DefaultButton, IComboBoxOption } from 'office-ui-fabric-react';
import { createList, addFields } from '../services/SharepointServices';
import { stateCtx, dispatchCtx } from './DocxContext';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const { changeEditForm, handleCombosChange, sendFields, handleFile } = useTemplateGen();
    const { templates, comboOpt, isEdit } = useContext(stateCtx);

    const editIco: IIconProps = { iconName: 'Edit' };

    useEffect(() => console.log(templates), [templates]);

    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField) => {
        if (edit === false)
            return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);
        else if (edit === true && idx === fields.field)
            return (<Dropdown id={fields.field} options={comboOpt} onChange={(e, opt) => handleCombosChange(fields.field, e, opt)} defaultSelectedKey={fields.fieldType} />);
        else if(edit === true && idx !== fields.field)
            return(<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);
        };

    return (<>
        <input type="file" accept="docx" onChange={handleFile} />
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => changeEditForm(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, { field: t.field, fieldType: t.fieldType })}
            </div>
        ) : ''}

        <DefaultButton text="Enviar" onClick={() => sendFields('batchot')} />
    </>);
}

import * as React from 'react';
import {useContext} from 'react';
import {stateCtx, dispatchCtx} from './DocxContext';
import { IconButton, IIconProps, IDropdownOption, Text, Dropdown } from 'office-ui-fabric-react';
import { FieldTypess, ITemplateField } from '../models/interfaces/ITemplate';
import { useTemplateHandle } from '../models/hooks/formHandler';

export function TemplateForm():JSX.Element{
    const {templates, isEdit} = useContext(stateCtx);
    const editIco: IIconProps = { iconName: 'Edit' };
    const {changeEditForm, TemplateItems} = useTemplateHandle();
    return(<>
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => changeEditForm(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, { field: t.field, fieldType: t.fieldType })}
            </div>
        ) : ''}
    </>);
}

import * as React from 'react';
import {useContext} from 'react';
import {stateCtx} from './DocxContext';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
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

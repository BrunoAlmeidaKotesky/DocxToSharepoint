import * as React from 'react';
import {useContext} from 'react';
import {stateCtx, dispatchCtx} from './DocxContext';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { useTemplateHandle } from '../models/hooks/formHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export function TemplateForm():JSX.Element{
    const {templates, isEdit} = useSelector((state:RootState) => state.templatesReducer);
    const editIco: IIconProps = { iconName: 'Edit' };
    const {populateWitTypeOpt, TemplateItems} = useTemplateHandle();

    return(<>
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => populateWitTypeOpt(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, { field: t.field, fieldType: t.fieldType })}
            </div>
        ) : ''}
    </>);
}

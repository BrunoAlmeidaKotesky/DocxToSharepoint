import * as React from 'react';
import {useContext} from 'react';
import {stateCtx, dispatchCtx} from './DocxContext';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { useTemplateHandle } from '../models/hooks/formHandler';

export function TemplateForm():JSX.Element{
    const {loaded, templates, isEdit} = useContext(stateCtx);
    const setState = useContext(dispatchCtx);
    const editIco: IIconProps = { iconName: 'Edit' };
    const {changeEditForm, TemplateItems} = useTemplateHandle();
    React.useEffect(()=>{
        setState(pState => ({ ...pState, loaded: true }));
    },[]);
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

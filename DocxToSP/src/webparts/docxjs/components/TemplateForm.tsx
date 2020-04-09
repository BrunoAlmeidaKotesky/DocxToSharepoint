import * as React from 'react';
import { IconButton, IIconProps } from 'office-ui-fabric-react';
import { useTemplateHandle } from '../models/hooks/formHandler';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

/**Renderiza as opções de dropdown conforme tipo dos items do template, e trata dos tipos de lookup*/
export function TemplateForm(): JSX.Element {
    const { templates, isEdit } = useSelector((state: RootState) => state.templatesReducer);
    const editIco: IIconProps = { iconName: 'Edit' };
    const { populateWitTypeOpt, TemplateItems } = useTemplateHandle();

    return (<>
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => populateWitTypeOpt(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, 
                { field: t.field, fieldType: t.fieldType, originalFieldName: t.originalFieldName,
                  lookup: { list: t.lookup.list, field: t.lookup.field, allFields: t.lookup.allFields },
                  choice: {choices: t.choice.choices, type: t.choice.type} })}
            </div>
        ) : ''}
    </>);
}

import * as React from 'react';
import { useEffect, useContext } from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/hooks/docxGenerator';
import { ITemplateField } from '../models/interfaces/ITemplate';
import { Dropdown, Text, IIconProps, IconButton, IDropdownOption, DefaultButton, IComboBoxOption } from 'office-ui-fabric-react';
import { stateCtx, dispatchCtx } from './DocxContext';
import {TemplateForm} from './TemplateForm';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const {sendFields, handleFile } = useTemplateGen();
    const { templates } = useContext(stateCtx);

    return (<>
        <input type="file" accept="docx" onChange={handleFile} />
        <TemplateForm/>
        <DefaultButton text="Enviar" onClick={() => sendFields('batchot')} />
    </>);
}

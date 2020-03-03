import * as React from 'react';
import {  useContext } from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/hooks/docxGenerator';
import {  DefaultButton, } from 'office-ui-fabric-react';
import { stateCtx, } from './DocxContext';
import {TemplateForm} from './TemplateForm';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const {sendFields, handleFile } = useTemplateGen();
    const { templates } = useContext(stateCtx);

    return (<>
        <input type="file" accept="docx" onChange={handleFile} />
        <TemplateForm/>
        <DefaultButton text="Enviar" onClick={() => sendFields('TesteTemp')} />
    </>);
}

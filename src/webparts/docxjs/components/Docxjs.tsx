import * as React from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/hooks/docxGenerator';
import {  DefaultButton, } from 'office-ui-fabric-react';
import {TemplateForm} from './TemplateForm';


export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const {sendFields, handleFile, templates, ref } = useTemplateGen();
    return (<>
        <input type="file" accept="docx" onChange={handleFile}  ref={ref}/>
        <TemplateForm/>
        <DefaultButton text="Enviar" onClick={() => sendFields('testeDelete')} />
    </>);
}

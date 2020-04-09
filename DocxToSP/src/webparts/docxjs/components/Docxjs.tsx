import * as React from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/hooks/docxGenerator';
import {  DefaultButton, } from 'office-ui-fabric-react';
import {TemplateForm} from './TemplateForm';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const {sendFields, handleFile, ref,templates } = useTemplateGen();
    const [listName, setListName] = React.useState('');
    return (<>
        <input type="file" accept="docx" onChange={handleFile}  ref={ref}/>
        <br/>
        {templates.length > 0 && 
        <><label>Nome da Lista: </label>
        <input type="text" onChange={(e) => setListName(e.target.value)}/></>}
        <TemplateForm/>
        <DefaultButton text="Enviar" onClick={() => {
            if(listName !== '' && listName.length <= 85)
            sendFields(listName);}} />
    </>);
}

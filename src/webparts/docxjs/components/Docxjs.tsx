import * as React from 'react';
import {  useContext } from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/hooks/docxGenerator';
import {  DefaultButton, } from 'office-ui-fabric-react';
import { stateCtx, } from './DocxContext';
import {TemplateForm} from './TemplateForm';
import { FieldTypess } from '../models/interfaces/ITemplate';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../redux/store';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const {sendFields, handleFile, templates } = useTemplateGen();
    React.useEffect(() => console.log(templates));
    return (<>
        <div>{templates.length !== 0 && templates[0].field}</div>
        <input type="file" accept="docx" onChange={handleFile} />
        <TemplateForm/>
        <DefaultButton text="Enviar" onClick={() => sendFields('testeDelete')} />
    </>);
}

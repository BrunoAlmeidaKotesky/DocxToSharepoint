import * as React from 'react';
import {useEffect} from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import {useTemplateGen} from '../models/docxGenerator';
import {FieldTypess} from '../models/interfaces/ITemplate';
import {Dropdown, IDropdownOption, DefaultButton, Label} from 'office-ui-fabric-react';


export default function Docxjs (props:IDocxjsProps):JSX.Element {
    const [templates, handleFile] = useTemplateGen();

    let comboOpt:IDropdownOption[] = []; 

    useEffect(()=>{
        if(templates.length !== 0 && templates !== undefined){
            templates.forEach((t,i) =>{
                if(t.fieldType === FieldTypess.FSingleLine){
                    comboOpt.push({key: i, text: "Texto", selected: true});
                }
                if(t.fieldType === FieldTypess.FMonetary){
                    comboOpt.push({key: i, text: "Moeda", selected: true});
                }
                if(t.fieldType === FieldTypess.FData){
                    comboOpt.push({key: i, text: "Data", selected: true});
                }
                if(t.fieldType === FieldTypess.FNumeric){
                    comboOpt.push({key: i, text: "Num" , selected: true});
                }
            });
            console.log(templates);
            //setComponents();
        }

    },[templates]);

    return (<><input type="file" accept="docx" onChange={handleFile} />
     
            {templates.length > 0 ? templates.map(t =>
                <div>
                    <label>{t.field}</label>
                    <Dropdown options={comboOpt}/>
                </div>
            ): ''}
        
        <DefaultButton text="Enviar"/>
    </>);
}

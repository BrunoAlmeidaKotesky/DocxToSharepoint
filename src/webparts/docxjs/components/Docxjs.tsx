import * as React from 'react';
import { IDocxjsProps } from './IDocxjsProps';
import { useTemplateGen } from '../models/docxGenerator';
import { FieldTypess, ITemplateField } from '../models/interfaces/ITemplate';
import { Dropdown, Text, IIconProps, IconButton, IDropdownOption, DefaultButton, IComboBoxOption } from 'office-ui-fabric-react';
import { createList, addFields} from '../services/SharepointServices';
import { stateCtx, dispatchCtx } from './DocxContext';

export default function Docxjs(props: IDocxjsProps): JSX.Element {
    const handleFile = useTemplateGen();
    //const [comboOpt, setComboOpt] = React.useState<IDropdownOption[]>([]);
    //const [isEdit, setEdit] = React.useState({ edit: false, selectedIdx: undefined });
    const editIco: IIconProps = { iconName: 'Edit' };
    const {templates, comboOpt, isEdit} = React.useContext(stateCtx);
    const setState = React.useContext(dispatchCtx);

    React.useEffect(()=>{
        console.log(templates);
    },[templates]);

    const changeEditForm = (idx: string) => {
        if (templates.length !== 0 && templates !== undefined) {
            let actualOpt: IDropdownOption[] = [];
            templates.forEach(t => {
                if (t.fieldType === FieldTypess.FSingleLine) {
                    actualOpt.push({ key: t.fieldType, text: "Texto", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FMonetary) {
                    actualOpt.push({ key: t.fieldType, text: "Moeda", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FData) {
                    actualOpt.push({ key: t.fieldType, text: "Data", selected: true, data: t.field });
                }
                if (t.fieldType === FieldTypess.FNumeric) {
                    actualOpt.push({ key: t.fieldType, text: "Num", selected: true, data: t.field });
                }
                setState(pState=> ({...pState, comboOpt: actualOpt}));
            });
            console.log(templates);
        }
        setState(pState=> ({...pState, isEdit: {edit: !isEdit.edit, selectedIdx: idx}}));
    };
    const handleCombosChange=(opt:string, event:React.FormEvent<HTMLDivElement>, ddpOpt:IDropdownOption)=> {
        console.log(opt);
        console.log(ddpOpt);
        console.log(event);
        templates.filter((t)=>{
            if(t.field === opt)
             t.fieldType = (ddpOpt.key as FieldTypess);
        });
        setState(pState =>({...pState, templates: templates}));
        
    };
    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField) => {
        if (edit === false)
            return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);
        else if (edit === true && idx === fields.field)
            return (<Dropdown id={fields.field} options={comboOpt} onChange={(e,opt)=>handleCombosChange(fields.field, e, opt)} defaultSelectedKey={fields.fieldType} />);
    };



    const sendFields = async (listName: string) => {
        try {
            await createList(listName);
            await addFields(listName, templates);
        } catch (e) {
            console.log(e);
        }
    };

    return (<><input type="file" accept="docx" onChange={handleFile} />
        {templates.length > 0 ? templates.map((t, i) =>
            <div>
                <label>{t.field}</label>
                <IconButton iconProps={editIco} onClick={() => changeEditForm(t.field)} />
                {TemplateItems(isEdit.edit, isEdit.selectedIdx, { field: t.field, fieldType: t.fieldType })}
            </div>
        ) : ''}

        <DefaultButton text="Enviar" onClick={()=>sendFields('batchot')}/>
    </>);
}

import * as React from 'react';
import { FieldTypess, ITemplateField, ITemplateForm } from '../interfaces/ITemplate';
import { IDropdownOption, Text, Dropdown } from 'office-ui-fabric-react';
import { useContext } from 'react';
import { stateCtx, dispatchCtx } from '../../components/DocxContext';
import { loadAllLists, loadFieldFromList } from '../../services/SharepointServices';
 
export const useTemplateHandle=():ITemplateForm=>{
    const {templates, isEdit, comboOpt} = useContext(stateCtx);
    const setState = useContext(dispatchCtx);
    const [list, setLists] = React.useState([]);
    const [fieldLookUp, setLookUp] = React.useState([]);

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
         templates.filter((t)=>{
             if(t.field === opt)
              t.fieldType = (ddpOpt.key as FieldTypess);
         });
         setState(pState =>({...pState, templates: templates}));    
     };

     React.useEffect(()=>{
        loadAllLists();
     },[]);

     const populateLookUpField = async (opt:IDropdownOption) => {
        let {fieldInfo, listName} = await loadFieldFromList(opt.text);
        let comboField: IDropdownOption[] = [];
        fieldInfo.forEach(r =>{
            comboField.push({key: r.InternalName, text: r.EntityPropertyName, data: r.Id});
        });
        setLookUp(comboField);
        
        const updateLookUp=(op:IDropdownOption)=>{
            templates.forEach(t=>{
                    t.lookup.field = op.key.toString();
                    t.lookup.list = listName;
            });

            setState(pState =>({...pState, templates: templates}));
        };

        return(<>
           
         </>);
     };

     const populateLookUpList = async () => {
        const lists = await loadAllLists();
        let listCombo:IDropdownOption[]=[];
        lists.filter(l =>{
            if(l.BaseType === 0 || l.BaseType === "GenericList")
            listCombo.push({key: l.Id, text: l.Title});
        });
        setLists(listCombo);
     };
   
     const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField) => {
         if (edit === false){
            if(fields.fieldType === FieldTypess.FLookUp){
                populateLookUpList();
                if(list.length> 0){
                    return <Dropdown options={list} onChange={(e, opt)=> populateLookUpField(opt)}/>;
                }
            }
            else return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

         }
         else if (edit === true && idx === fields.field)
             return (<Dropdown id={fields.field} options={comboOpt} onChange={(e, opt) => handleCombosChange(fields.field, e, opt)} defaultSelectedKey={fields.fieldType} />);
         else if(edit === true && idx !== fields.field)
             return(<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);
         
     };

     return {changeEditForm, TemplateItems};
};
 
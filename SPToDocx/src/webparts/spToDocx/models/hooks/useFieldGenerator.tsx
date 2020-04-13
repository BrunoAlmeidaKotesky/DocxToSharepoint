import * as React from 'react';
import { useEffect } from 'react';
import { Dropdown, TextField, Toggle, IDropdownOption, DatePicker, IChoiceGroupOption, ChoiceGroup } from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { FieldTypes } from '@pnp/sp/fields';
import { setModal, setSelectedFields, clearListFields } from '../redux/actions/actions';
import { IUseFieldGen, IFieldContent } from '../interfaces/IUseFieldGen';
import { DayPicker, formatDate, getFieldFormat } from '../../utils/constants';

export default function useFieldGen(): IUseFieldGen {
    const { isModalOpened, list: { listId, listName,file,  fileFieldRef} } = useSelector((state:RootState) =>state.listReducer);
    const [numberVal, setNumVal] = React.useState<string>('');
    const dispatch = useDispatch();
    const headerText = `Lista: ${listName}`;

    function dismisModal() {
        dispatch(setModal(false));
        dispatch(clearListFields());
    }
    useEffect(() => {
        if (listId !== null && isModalOpened === true)
            dispatch(setSelectedFields(listId, fileFieldRef));
    }, [isModalOpened]);

    function renderFields(field: IFieldContent, idx: number): JSX.Element {
        console.log(field);

        switch (field.FieldTypeKind) {
            case FieldTypes.Boolean:
                return (<><label>{field.Title}</label>
                    <Toggle defaultChecked={false} id={field.InternalName} onText={'Sim'} offText={'Não'} /></>);
            case FieldTypes.Text:
                return (<><label>{field.Title}</label>
                    <TextField id={field.InternalName} /></>);
            case FieldTypes.Note:
                return (<><label>{field.Title}</label>
                    <TextField id={field.InternalName} multiline resizable={false} /></>);
            case FieldTypes.Number:
                return (<><label>{field.Title}</label>
                    <TextField id={field.InternalName} defaultValue={numberVal}/></>);
            
            case FieldTypes.Choice: {
                let formatType = getFieldFormat(field.SchemaXml, 'Format');
                if(formatType === "Dropdown"){
                    const choices: IDropdownOption[] = [];
                    field.Choices.forEach((text, index) => choices.push({ key: index, text: text }));
                    return (<><label>{field.Title}</label>
                        <Dropdown  id={field.InternalName} options={choices} /></>);
                }
                if(formatType === "RadioButtons"){
                    const groups: IChoiceGroupOption[]=[];
                    field.Choices.forEach((text,index) => groups.push({key: index.toString(), text: text}));
                    return(<><label>{field.Title}</label>
                             <ChoiceGroup id={field.InternalName} options={groups}/></>);
                }
            }
            case FieldTypes.MultiChoice: {
                const multiChoices: IDropdownOption[] = [];
                field.Choices.forEach((text, index) => multiChoices.push({ key: index, text: text }));
                return (<><label>{field.Title}</label>
                    <Dropdown id={field.InternalName} options={multiChoices} multiSelect /></>);
            }
            case FieldTypes.DateTime:{
                return (<><label>{field.Title}</label>
                    <DatePicker isRequired={true} allowTextInput={true} strings={DayPicker} id={field.InternalName}
                        formatDate={formatDate} 
                        onSelectDate={(date)=>{console.log(date);}}/></>);
            }
            case FieldTypes.Currency: {
                return(<><label>{field.Title}</label>
                         <TextField id={field.InternalName}/></>);
            }
        }
    }

    return { headerText, dismisModal, renderFields };
}
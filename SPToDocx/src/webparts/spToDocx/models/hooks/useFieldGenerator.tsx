import * as React from 'react';
import { useEffect } from 'react';
import { Dropdown, TextField ,Toggle, IDropdownOption} from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { FieldTypes } from '@pnp/sp/fields';
import { setModal, setSelectedFields, clearListFields } from '../redux/actions/actions';
import { IUseFieldGen, IFieldContent } from '../interfaces/IUseFieldGen';


export default function useFieldGen():IUseFieldGen {
    const { isModalOpened, list: { listId, listName } } = useSelector((store: RootState) => store.listReducer);
    const dispatch = useDispatch();
    const headerText = `Lista: ${listName}`;

    function dismisModal() {
        dispatch(setModal(false));
        dispatch(clearListFields());
    }
    useEffect(() => {
        if (listId !== null && isModalOpened === true)
            dispatch(setSelectedFields(listId));
    }, [isModalOpened]);

    function renderFields(field: IFieldContent, idx:number):JSX.Element {
        console.log(field);
        switch(field.FieldTypeKind) {
            case FieldTypes.Boolean:
                return (<><label>{field.Title}</label>
                         <Toggle defaultChecked={false} id={field.InternalName} onText={'Sim'} offText={'Não'}/></>);
            case FieldTypes.Text:
                return (<><label>{field.Title}</label>
                        <TextField id={field.InternalName}/></>);
            case FieldTypes.Note:
                return(<><label>{field.Title}</label>
                        <TextField id={field.InternalName} multiline resizable={false}/></>);
            case FieldTypes.Number:
                return(<><label>{field.Title}</label>
                         <TextField id={field.InternalName}/></>);
            case FieldTypes.Choice:{
                const choices: IDropdownOption[] = [];
                field.Choices.forEach((text, index) => choices.push({key: index, text: text}));
                return(<><label>{field.Title}</label>
                    <Dropdown options={choices}/></>);
            }
            case FieldTypes.MultiChoice: {
                const multiChoices:IDropdownOption[]=[];
                field.Choices.forEach((text, index) => multiChoices.push({key: index, text: text}));
                return(<><label>{field.Title}</label>
                    <Dropdown options={multiChoices} multiSelect/></>);
            }
        }
    }

    return {headerText, dismisModal, renderFields};
}
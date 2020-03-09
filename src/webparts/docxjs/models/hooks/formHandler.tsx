import * as React from 'react';
import { FieldTypess, ITemplateField, ITemplateForm } from '../interfaces/ITemplate';
import { IDropdownOption, Text, Dropdown } from 'office-ui-fabric-react';
import { useContext } from 'react';
import { stateCtx, dispatchCtx } from '../../components/DocxContext';
import { loadAllLists, loadFieldFromList } from '../../services/SharepointServices';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { populateFieldTypeDdp, changeTemplateFieldType, populateLookUpList } from '../../redux/actions/actions';

export const useTemplateHandle = (): ITemplateForm => {
    const { templates, isEdit, comboOpt, listOpt } = useSelector((state: RootState) => state.templatesReducer);
    const dispatch = useDispatch();
    const setState = useContext(dispatchCtx);
    const [fieldLookUp, setLookUp] = React.useState([]);
    
    const populateLookUpField = async (opt: IDropdownOption, field: string) => {
        let { userFields, listName } = await loadFieldFromList(opt.text);
        let comboField: IDropdownOption[] = [];
        userFields.forEach(r => {
            comboField.push({ key: r.InternalName, text: r.Title, data: { listName, field } });
        });
        setLookUp(comboField);
    };

    const updateLookUp = (op: IDropdownOption, idx: string) => {

        templates.forEach((el, i) => {
            if (el.field === idx) {
                if (op.data.field === idx) {
                    templates[i].lookup.field = op.key.toString();
                    templates[i].lookup.list = op.data.listName;
                }
            }
        });
        console.log(templates);
        setState(pState => ({ ...pState, templates: templates }));
    };

    const populateWitTypeOpt = (idx: string) => {
        const actualOpt: IDropdownOption[] = [
            { key: FieldTypess.FSingleLine, text: "Texto", selected: true },
            { key: FieldTypess.FMonetary, text: "Moeda", selected: true },
            { key: FieldTypess.FData, text: "Data", selected: true },
            { key: FieldTypess.FNumeric, text: "Num", selected: true },
            { key: FieldTypess.FLookUp, text: "LookUp", selected: true }
        ];
        dispatch(populateFieldTypeDdp({ idx: idx, option: actualOpt, isEditing: !isEdit.edit }));
    };

    const handleCombosChange = (opt: string, ddpOpt: IDropdownOption) => {
        dispatch(changeTemplateFieldType(opt, (ddpOpt.text as FieldTypess)));
        if(ddpOpt.key === FieldTypess.FLookUp){
            dispatch(populateLookUpList());
        }
    };


    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField): JSX.Element => {
        if (edit === false) {
            if (fields.fieldType === FieldTypess.FLookUp) {

                if (listOpt.length > 0) {
                    return (<>
                        <Dropdown options={listOpt} onChanged={(opt) => populateLookUpField(opt, fields.field)} />
                        {fieldLookUp.length > 0 && <Dropdown options={fieldLookUp} onChanged={(opt) => updateLookUp(opt, idx)} />}
                    </>);
                }
            }
            else return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

        }
        else if (edit === true && idx === fields.field) {
            if (fields.fieldType === FieldTypess.FLookUp) {
                if (listOpt.length > 0) {
                    return (<>
                        <Dropdown options={listOpt} onChanged={(opt) => populateLookUpField(opt, fields.field)} />
                        {fieldLookUp.length > 0 && <Dropdown options={fieldLookUp} onChanged={(opt) => updateLookUp(opt, idx)} />}
                    </>);
                }
            }
            else return (<Dropdown id={fields.field} options={comboOpt} onChanged={(opt) => handleCombosChange(fields.field, opt)} defaultSelectedKey={fields.fieldType} />);

        }
        else if (edit === true && idx !== fields.field)
            return (<Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

    };
    return { populateWitTypeOpt, TemplateItems };
};

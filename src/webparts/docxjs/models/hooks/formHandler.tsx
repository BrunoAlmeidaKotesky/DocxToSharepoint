import * as React from 'react';
import { FieldTypess, ITemplateField, ITemplateForm } from '../interfaces/ITemplate';
import { IDropdownOption, Text, Dropdown } from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { populateFieldTypeDdp, changeTemplateFieldType, populateLookUpList, populateLookUpField, setLookUpField } from '../../redux/actions/actions';

export const useTemplateHandle = (): ITemplateForm => {
    const { templates, isEdit, comboOpt, listOpt } = useSelector((state: RootState) => state.templatesReducer);
    const dispatch = useDispatch();
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

    const handleCombosChange = (opt: string, ddpOpt: IDropdownOption) => dispatch(changeTemplateFieldType(opt, (ddpOpt.text as FieldTypess)));

    React.useEffect(() => {
        dispatch(populateLookUpList());
    }, []);

    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField): JSX.Element => {
        if (edit === false) {
            switch(fields.fieldType){
                case FieldTypess.FLookUp: {
                    if (idx === fields.field) {
                        if (listOpt.length > 0) {
                            return (<>
                                <Dropdown id={fields.field} key={fields.field} 
                                         options={listOpt} defaultSelectedKey={fields.lookup?.list !== undefined && fields.lookup.list}
                                         onChanged={(opt) => dispatch(populateLookUpField(opt, fields.field))} />
                                {fields.lookup.allFields.length > 0 &&
                                    <Dropdown key={fields.field} options={fields.lookup.allFields.length > 0 && fields.lookup.allFields}
                                        defaultSelectedKey={fields.lookup?.field !== undefined && fields.lookup.field}
                                        onChanged={(opt) => dispatch(setLookUpField({ fieldName: opt.key.toString(), tempIdxField: fields.field }))} />}
                            </>);
                        }
                    }
                }
                default: return <Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>;
            }
        }
        else if (edit === true && idx === fields.field) {
            switch(fields.fieldType) {
                case FieldTypess.FLookUp: {
                    if (listOpt.length > 0) {
                        return (<>
                            <Dropdown id={fields.field} key={fields.field} options={listOpt}
                                      defaultSelectedKey={fields.lookup?.list !== undefined && fields.lookup.list}
                                      onChanged={(opt) => dispatch(populateLookUpField(opt, fields.field))} />
                            {fields.lookup.allFields.length > 0 &&
                                <Dropdown key={fields.field} options={fields.lookup.allFields.length > 0 && fields.lookup.allFields}
                                    defaultSelectedKey={fields.lookup?.field !== undefined && fields.lookup.field}
                                    onChanged={(opt) => dispatch(setLookUpField({ fieldName: opt.key.toString(), tempIdxField: fields.field }))} />}
                        </>);
                    }
                }
                case FieldTypess.FChoice: {
                    break;
                }
                default: return <Dropdown id={fields.field} options={comboOpt} onChanged={(opt) => handleCombosChange(fields.field, opt)} defaultSelectedKey={fields.fieldType} />;
            }
        }
        else if (edit === true && idx !== fields.field)
            return (<Text key={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

    };
    
    return { populateWitTypeOpt, TemplateItems };
};

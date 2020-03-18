import * as React from 'react';
import { FieldTypess, ITemplateField, ITemplateForm } from '../interfaces/ITemplate';
import { IDropdownOption, Text, Dropdown, TextField } from 'office-ui-fabric-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { populateFieldTypeDdp, changeTemplateFieldType, populateLookUpList, 
         populateLookUpField, setLookUpField, changeChoiceOptions, changeChoiceType } from '../../redux/actions/actions';
import { ChoiceFieldFormatType } from '@pnp/sp/fields';
import {RInput} from '../types/types';
import {splitString} from '../../utils/utils';

export const useTemplateHandle = (): ITemplateForm => {
    const { isEdit, comboOpt, listOpt } = useSelector((state: RootState) => state.templatesReducer);
    const choicesFieldOpt: IDropdownOption[] = [{ key: ChoiceFieldFormatType.Dropdown, text: 'Dropdown' },
     { key: ChoiceFieldFormatType.RadioButtons, text: 'Radio Button' }];
    const dispatch = useDispatch();
    const populateWitTypeOpt = (idx: string) => dispatch(populateFieldTypeDdp({idx, isEditing: !isEdit.edit }));
  

    const handleCombosChange = (opt: string, ddpOpt: IDropdownOption) => dispatch(changeTemplateFieldType(opt, (ddpOpt.text as FieldTypess)));

    React.useEffect(() => {
        dispatch(populateLookUpList());
    }, []);
    const handleChoiceOptChange=(e, fieldIdx: string)=> {
        let options = splitString(e.target.value);
        return dispatch(changeChoiceOptions({options, fieldIdx}));
    };
    const TemplateItems = (edit: boolean, idx: string, fields: ITemplateField): JSX.Element => {
        if (edit === false) {
            switch (fields.fieldType) {
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
                case FieldTypess.FChoice: {
                    return (<>
                        <Dropdown key={fields.field} id={fields.field} options={choicesFieldOpt} 
                                  onChanged={(opt) =>dispatch(changeChoiceType({fieldIdx: fields.field, type: (opt.key as ChoiceFieldFormatType)}))}/>
                        <TextField onChange={(e) => handleChoiceOptChange(e,fields.field)}/>
                    </>);
                }
                default: return <Text id={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>;
            }
        }
        else if (edit === true && idx === fields.field) {
            switch (fields.fieldType) {
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
                    return (<>
                        <Dropdown key={fields.field} id={fields.field} options={choicesFieldOpt} 
                                  onChanged={(opt) =>dispatch(changeChoiceType({fieldIdx: fields.field, type: (opt.key as ChoiceFieldFormatType)}))}/>
                        <TextField onChange={(e) => handleChoiceOptChange(e,fields.field)}/>
                    </>);
                }
                default: return <Dropdown id={fields.field} options={comboOpt} 
                                          onChanged={(opt) => handleCombosChange(fields.field, opt)} defaultSelectedKey={fields.fieldType} />;
            }
        }
        else if (edit === true && idx !== fields.field)
            return (<Text key={fields.field} nowrap variant="mediumPlus">{fields.fieldType}</Text>);

    };

    return { populateWitTypeOpt, TemplateItems };
};

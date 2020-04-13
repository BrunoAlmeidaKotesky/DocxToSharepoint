
import {action} from 'typesafe-actions';
import {IFileGeneration} from '../../interfaces/ITemplateList';
import { IFieldContent } from '../../interfaces/IUseFieldGen';

export enum FileActions {
    SET_FIELD_VALUE = 'SET_FIELD_VALUE',
    SET_INITIAL_FIELD = 'SET_INITIAL_FIELD',
    CLEAR_FIELDS_VALUES = 'CLEAR_FIELD_VALUES'
}


export const clearFieldsVal = () => action(FileActions.CLEAR_FIELDS_VALUES);
export const setFieldValue = (values:IFileGeneration) => action(FileActions.SET_FIELD_VALUE, {values});
export const setInitialFields = (fields:IFieldContent[]) => action(FileActions.SET_INITIAL_FIELD, {fields});

export type FileGenActions = ReturnType<typeof setFieldValue> | ReturnType<typeof setInitialFields> | ReturnType<typeof clearFieldsVal>;
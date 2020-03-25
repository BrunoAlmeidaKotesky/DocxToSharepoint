import { ITemplateField } from './../../models/interfaces/ITemplate';
import {call, put, select} from 'redux-saga/effects';
import { assertLookFieldValue, LookUpFieldStatus } from '../../utils/utils';
import {createList, addFields} from '../../services/SharepointServices';
import { RootState } from '../store';
import {createdListSucess, failureListSucess, callSendList} from '../actions/actions';

export function* sendList(listName: string){
    try {
        const templates:ITemplateField[] = yield select((state: RootState) => state.templatesReducer.templates);
        yield put(callSendList());
        const canUpload = assertLookFieldValue(templates);
        if (canUpload === LookUpFieldStatus.NoLookUps) {
            yield call(createList, listName);
            yield call(addFields, listName, templates);
            put(createdListSucess());
        }
        else if (canUpload === LookUpFieldStatus.NoValues) {
            console.log('Não pode fazer upload porque tem lookup sem valores');
        }
        else if (canUpload === LookUpFieldStatus.HasValues) {
            yield call(createList, listName);
            yield call(addFields, listName, templates);
            yield put(createdListSucess());
        }

    } catch (e) {
        yield put(failureListSucess());
    }
}
import takeLatest from 'redux-saga';
import {all} from 'redux-saga/effects';
import {sendList} from '../sagas/sagas';

export default function* rootSaga(){
    yield all([takeLatest()]);
}
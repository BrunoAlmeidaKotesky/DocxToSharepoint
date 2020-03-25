import {all, takeLatest} from 'redux-saga/effects';
import {sendList} from '../sagas/sagas';
import {callSendList} from '../actions/actions';
import { Actions } from '../actions/actionTypes';

export default function* rootSaga(){
    yield all([takeLatest(callSendList, sendList, '')]);
}
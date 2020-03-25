import { initialState } from './../store';
import { IStore } from './../../interfaces/IStore';
import { AnyAction } from 'redux';

export const listReducer = (state:IStore = initialState, action:AnyAction) => {
    switch(action.type){
     
      default: return state;
    }
};
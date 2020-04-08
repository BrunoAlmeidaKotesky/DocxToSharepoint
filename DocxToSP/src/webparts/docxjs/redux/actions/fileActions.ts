import { action } from 'typesafe-actions';
import { IDocxFile } from '../../models/interfaces/IStore';

export enum FileActions {
    SET_INITIAL_FILE = 'SET_INITIAL_FILE',
    SET_FILE_DATA = 'SET_FILE_DATA'
}

export function setInitFile(file: IDocxFile){
    return action(FileActions.SET_INITIAL_FILE, {file});
}

export type IFileActions = ReturnType<typeof setInitFile>;
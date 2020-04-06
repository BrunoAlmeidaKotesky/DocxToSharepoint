import { action } from 'typesafe-actions';

export enum FileActions {
    SET_INITIAL_FILE = 'SET_INITIAL_FILE',
    SET_FILE_DATA = 'SET_FILE_DATA'
}

export function setInitFile(file:File){
    return action(FileActions.SET_INITIAL_FILE, {file});
}

export type IFileActions = ReturnType<typeof setInitFile>;
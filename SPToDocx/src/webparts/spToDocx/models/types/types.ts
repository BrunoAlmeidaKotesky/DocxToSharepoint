import { IFileGeneration, IFileStore } from './../interfaces/ITemplateList';
import { FileGenActions } from './../redux/actions/fileActions';
import { Reducer } from 'redux';
export type RDispatch<T> = React.Dispatch<React.SetStateAction<T>>;
export type Dispatch = (action: any/*ActionType*/) => void;
export type RNodes = { children: React.ReactNode };
export type RInput = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FileData = { urlFile: string; fileName: string; };
export type FileGenReducer = Reducer<IFileStore, FileGenActions>;

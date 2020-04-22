import { FileData } from './../types/types';
export interface IListFile{
    GUID?: string;
    Title: string;
    ListId: string;
    ListName: string;
    documentFieldRef: string;
    fileType:string;
}
export interface IListFilter{
    file: File;
    items: IListFile;
}

export interface IFileGeneration {
    value: unknown;
    field: string;
    fieldRef: string;
}

export interface IFileGenerator extends FileData {
    data: IFileGeneration[];
    newFileName: string;
}

export interface IFileStore{
    fields: IFileGeneration[];
}
export interface IListFile{
    GUID?: string;
    Title: string;
    ListId: string;
    ListName: string;
    documentFieldRef: string;
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

export interface IFileStore{
    fields: IFileGeneration[];
}
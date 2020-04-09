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
import { IFieldInfo } from '@pnp/sp/fields';
export interface IFieldContent extends IFieldInfo {
    Choices: string[];
    documentFieldRef: string;
}
export interface IUseFieldGen {
    headerText: string;
    dismisModal(): void;
    renderFields(field: IFieldContent, idx:number): JSX.Element;
}
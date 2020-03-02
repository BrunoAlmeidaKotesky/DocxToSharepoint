import { IDropdownOption } from 'office-ui-fabric-react';
export type RDispatch<T> = React.Dispatch<React.SetStateAction<T>>;
export type Dispatch = (action: any/*ActionType*/) => void;
export type RNodes = { children: React.ReactNode };

export interface useDocGen {
    handleFile(e: React.ChangeEvent<HTMLInputElement>): void;
    changeEditForm(idx: string): void;
    handleCombosChange(opt: string, event: React.FormEvent<HTMLDivElement>, ddpOpt: IDropdownOption): void;
    sendFields(listName: string): Promise<void>;
}
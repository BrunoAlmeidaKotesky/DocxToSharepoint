export type RDispatch<T> = React.Dispatch<React.SetStateAction<T>>;
export type Dispatch = (action: any/*ActionType*/) => void;
export type RNodes = { children: React.ReactNode };
export type RInput = React.FormEvent<HTMLInputElement | HTMLTextAreaElement>;
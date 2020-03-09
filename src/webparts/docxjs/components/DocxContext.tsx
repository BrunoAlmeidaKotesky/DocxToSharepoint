import * as React from 'react';
import {createContext, useState} from 'react';
import {IStore} from '../models/interfaces/IStore';
import {RDispatch, RNodes, Dispatch} from '../models/types/types';
import {IDocxjsProps} from '../components/IDocxjsProps';
import Docxjs from '../components/Docxjs';
import { Provider } from "react-redux";
import configureStore from '../redux/store';

export const stateCtx = createContext<Pick<IStore, 'comboOpt'|'isEdit'| 'loaded'|'templates'>>({loaded: false, templates:[], comboOpt:[],isEdit: {edit: false, selectedIdx: undefined}});

export const dispatchCtx = createContext<RDispatch<IStore>| Dispatch>(undefined);

export const ProviderDocx = ({children}:RNodes) => {
    const [state, setState] = useState<Pick<IStore, 'comboOpt'|'isEdit'| 'loaded'|'templates'>>({loaded: false, templates:[], comboOpt:[], isEdit: {edit: false, selectedIdx: undefined}});
    return(<Provider store={configureStore()}>
    <stateCtx.Provider value={state}>
        <dispatchCtx.Provider value={setState}>
          {children}
        </dispatchCtx.Provider>
      </stateCtx.Provider>
      </Provider>
      );

};

function TemplateGen(props: IDocxjsProps) { return (<ProviderDocx><Docxjs {...props}/></ProviderDocx>); }
export default TemplateGen;
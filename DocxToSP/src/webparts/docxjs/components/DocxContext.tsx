import * as React from 'react';
import {RNodes} from '../models/types/types';
import {IDocxjsProps} from '../components/IDocxjsProps';
import Docxjs from '../components/Docxjs';
import { Provider } from "react-redux";
import configureStore from '../redux/store';



export const ProviderDocx = ({children}:RNodes) => {
    return(<Provider store={configureStore()}>{children}</Provider>);
};

function TemplateGen(props: IDocxjsProps) { return (<ProviderDocx><Docxjs {...props}/></ProviderDocx>); }
export default TemplateGen;
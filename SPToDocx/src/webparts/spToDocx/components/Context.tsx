import * as React from 'react';
import {RNodes, RDispatch} from '../models/types/types';
import {ISpToDocxProps} from '../components/ISpToDocxProps';
import SpToDocx from '../components/SpToDocx';
import {Provider} from 'react-redux';
import store from '../models/redux/store';

type Props = ISpToDocxProps & RNodes;
export const modalCtx = React.createContext<boolean>(false);
export const dispatchCtx = React.createContext<RDispatch<boolean>>(undefined);

export default function DocumentCreator(props: Props):JSX.Element{
    const [isOpen, setIsOpen] = React.useState(false);
    return(<Provider store={store()}>
             <modalCtx.Provider value={isOpen}>
              <dispatchCtx.Provider value={setIsOpen}>
             <SpToDocx {...props}/>
             </dispatchCtx.Provider>
             </modalCtx.Provider>
          </Provider>);
}
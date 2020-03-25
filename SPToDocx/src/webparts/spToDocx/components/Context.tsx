import * as React from 'react';
import {RNodes} from '../models/types/types';
import {ISpToDocxProps} from '../components/ISpToDocxProps';
import SpToDocx from '../components/SpToDocx';
import {Provider} from 'react-redux';
import store from '../models/redux/store';

type Props = ISpToDocxProps & RNodes;
export default function DocumentCreator(props: Props):JSX.Element{
    return(<Provider store={store()}>
             <SpToDocx {...props}/>
          </Provider>);
}
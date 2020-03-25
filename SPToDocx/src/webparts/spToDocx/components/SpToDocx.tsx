import * as React from 'react';
import { ISpToDocxProps } from './ISpToDocxProps';
import {DefaultButton, Panel, TextField, Dropdown, } from 'office-ui-fabric-react';
import { useConstCallback } from '@uifabric/react-hooks';
import ListModal from './Modal';
import { modalCtx, dispatchCtx } from './Context';

export default function SpToDocx(props:ISpToDocxProps) {
  const setIsOpen = React.useContext(dispatchCtx);
  const openPanel = useConstCallback(() => setIsOpen(true));

  return (
    <div>
      When dismissed, this panel will be hidden instead of destroyed. This is useful for cases in which the panel contains state which must
      be preserved across times that the panel is opened. 
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} />
      <ListModal/>
    </div>
  );
}

import {Panel, TextField, Dropdown, } from 'office-ui-fabric-react';
import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { modalCtx, dispatchCtx } from './Context';

export default function ListModal(){

  const isOpen = React.useContext(modalCtx);
  const setIsOpen = React.useContext(dispatchCtx);
  const dismissPanel = useConstCallback(() => setIsOpen(false));

    return(<Panel
        isOpen={isOpen}
        closeButtonAriaLabel="Close"
        isHiddenOnDismiss={true}
        headerText="Lista: Hidden on dismiss"
        onDismiss={dismissPanel}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          <br />
          <br />
          <TextField ariaLabel={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} />
        </div>
      </Panel>);
}
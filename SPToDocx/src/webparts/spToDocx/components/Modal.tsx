import {Panel, TextField, Dropdown, IDropdownOption} from 'office-ui-fabric-react';
import * as React from 'react';
import { useConstCallback } from '@uifabric/react-hooks';
import { modalCtx, dispatchCtx } from './Context';
import {setModal} from '../models/redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../models/redux/store';

function ListModal(){
  const dispatch = useDispatch();
  const {isModalOpened, list} = useSelector((state:RootState)=>state.listReducer);
  const dismisModal = () => dispatch(setModal(false));
  const headerText = `Lista: ${list.listName}`;
    return(<Panel
        isOpen={isModalOpened}
        closeButtonAriaLabel="Close"
        forceFocusInsideTrap={false}
        isHiddenOnDismiss={true}
        headerText={headerText}
        onDismiss={dismisModal}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          <br />
          <br />
          <TextField ariaLabel={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} />
        </div>
      </Panel>);
}

export default React.memo(ListModal);
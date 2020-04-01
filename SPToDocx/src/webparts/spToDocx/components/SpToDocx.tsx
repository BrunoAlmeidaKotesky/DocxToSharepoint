import * as React from 'react';
import { ISpToDocxProps } from './ISpToDocxProps';
import {DefaultButton, Dropdown, IDropdownOption } from 'office-ui-fabric-react';
import { useConstCallback } from '@uifabric/react-hooks';
import ListModal from './Modal';
import {populateListOptions, setSelectedList, setModal} from '../models/redux/actions/actions';
import { dispatchCtx } from './Context';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/redux/store';


export default function SpToDocx(props:ISpToDocxProps) {
  const dispatch = useDispatch();
  const {allLists,list} = useSelector((store:RootState)=>store.listReducer);
  const openPanel = () => dispatch(setModal(true));
  const updateSelectedList = useConstCallback((ev: any, opt: IDropdownOption) => dispatch(setSelectedList((opt.key as string), opt.text)));

  React.useEffect(() =>{
    dispatch(populateListOptions());
  },[]);

  return (
    <div>
      When dismissed, this panel will be hidden instead of destroyed. This is useful for cases in which the panel contains state which must
      be preserved across times that the panel is opened. 
      <br />
      <DefaultButton text="Open panel" onClick={openPanel} disabled={list.listName !== null ? false: true}/>
      <Dropdown options={allLists} 
                defaultSelectedKey={list.listId} 
                onChange={updateSelectedList}/>
      <ListModal/>
    </div>
  );
}

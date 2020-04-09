import * as React from 'react';
import { ISpToDocxProps } from './ISpToDocxProps';
import {DefaultButton, Dropdown } from 'office-ui-fabric-react';
import ListModal from './Modal';
import {populateListOptions, setSelectedList, setModal} from '../models/redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../models/redux/store';

export default function SpToDocx(props:ISpToDocxProps) {
  const dispatch = useDispatch();
  const {allLists,list} = useSelector((store:RootState)=>store.listReducer);
  const openPanel = () => dispatch(setModal(true));
  

  React.useEffect(() =>{
    dispatch(populateListOptions());
  },[]);

  return (
    <div>
      <DefaultButton text="Open panel" onClick={openPanel} 
                     disabled={(list.listName !== null && list.listId !==null) ? false: true}/>
      <Dropdown options={allLists} 
                defaultSelectedKey={list.listId} 
                onChanged={opt => dispatch(setSelectedList((opt.key as string), opt.text))}/>
      <ListModal/>
    </div>
  );
}

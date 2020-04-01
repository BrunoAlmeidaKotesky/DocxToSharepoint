import {Panel, TextField, Dropdown, IDropdownOption, Spinner} from 'office-ui-fabric-react';
import * as React from 'react';
import {setModal, setSelectedFields, clearListFields} from '../models/redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../models/redux/store';

function ListModal(){
  const dispatch = useDispatch();
  const {isModalOpened, list} = useSelector((state:RootState)=>state.listReducer);
  const dismisModal = () => {
          dispatch(setModal(false));
          dispatch(clearListFields());
        };
  const headerText = `Lista: ${list.listName}`;

  React.useEffect(()=>{
    if(list.listId !== null && isModalOpened === true)
      dispatch(setSelectedFields(list.listId));
  },[isModalOpened]);

    return(<Panel
        isOpen={isModalOpened}
        closeButtonAriaLabel="Close"
        forceFocusInsideTrap={false}
        isHiddenOnDismiss={true}
        headerText={headerText}
        onDismiss={dismisModal}
      >
        <div>
          <br />
          <br />
          {list.fields.length > 0 ? <>
            <TextField ariaLabel={'Lorem ipsum dolor sit amet consectetur adipisicing elit.'} />
          </>:<Spinner size={3} label="Carregando campos..."/>}
        </div>
      </Panel>);
}

export default React.memo(ListModal);
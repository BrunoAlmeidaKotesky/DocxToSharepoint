import * as React from 'react';
import {Panel, Spinner, DefaultButton} from 'office-ui-fabric-react';
import {useSelector} from 'react-redux';
import { RootState } from '../models/redux/store';
import useFieldsGen from '../models/hooks/useFieldGenerator';
import FileGenerator from '../models/contracts/FileGenerator';

function ListModal(){
  const { isModalOpened, list: { fields, file: { fileName, urlFile } } } = useSelector((store: RootState) => store.listReducer);
  const fieldsWithValues = useSelector((fileStore: RootState) => fileStore.fileGenReducer.fields);
  const {dismisModal, headerText, renderFields} = useFieldsGen();

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
          {fields.length > 0 ? 
          <>{fields.map((it, n) => renderFields(it, n))}        
          </>:<Spinner size={3} label="Carregando campos..."/>}
          <DefaultButton onClick={async () => new FileGenerator({fileName, urlFile}, fieldsWithValues).generateFile()}/>
        </div>
      </Panel>);
}

export default React.memo(ListModal);
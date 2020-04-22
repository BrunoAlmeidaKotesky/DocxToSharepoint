import * as React from 'react';
import { Panel, Spinner, DefaultButton, TextField } from 'office-ui-fabric-react';
import { useSelector } from 'react-redux';
import { RootState } from '../models/redux/store';
import useFieldsGen from '../models/hooks/useFieldGenerator';
import FileGenerator from '../models/contracts/FileGenerator';

function ListModal() {
  const { isModalOpened, list: { fields, file: { fileName, urlFile, fileType } } } = useSelector((store: RootState) => store.listReducer);
  const fieldsWithValues = useSelector((fileStore: RootState) => fileStore.fileGenReducer.fields);
  const { dismisModal, headerText, renderFields } = useFieldsGen();
  const [newFileName, setFileName] = React.useState<string>('');
  const saveFile = async () => {
    if (newFileName !== '' && newFileName !== null)
      new FileGenerator({ fileName, urlFile , data: fieldsWithValues, newFileName, fileType}).generateFile();
    else return;
  };

  return (<Panel
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
        <><label>Nome do arquivo</label><TextField onChange={(e:any) => setFileName(e.target.value)} />
        {fields.map((it, n) => renderFields(it, n))}
        </> : <Spinner size={3} label="Carregando campos..." />}
      <br />
      <DefaultButton text="Gerar arquivo" onClick={saveFile} />
    </div>
  </Panel>);
}

export default React.memo(ListModal);
import * as React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Dropdown, IDropdownOption} from 'office-ui-fabric-react';

type Props = {field: string, listName:string, fields: IDropdownOption[], lookUp: string};
export default function LookUpDdp(props: Props):JSX.Element{
    //const {} = useSelector((state:RootState))
    if(props.fields.length > 0  && (props.lookUp != null || props.lookUp !== ''))
        return <Dropdown key={props.field} options={props.fields} onChanged={(opt) => console.log(opt)} />;
}
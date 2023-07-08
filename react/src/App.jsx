import { useState } from 'react'
import { CreateIntegration } from './CreateIntegration'
import { SelectListField } from './SelectListField'
import {TextField} from './TextField'
import { TableField } from './TableField'

function App() {
  const [selectData, setSelectData] = useState([])
  const [identifiers, setIdentifiers] = useState([])
  return (
    <>
      <p/>
        <CreateIntegration props ={{setSelectData, setIdentifiers }} />
      <p/>
        <SelectListField props = {{selectData, identifiers}} />
      <p/>
        <TextField props = {{selectData, identifiers}}/>
      <p/>
        <TableField props = {{selectData, identifiers}}/>
    </>
  )
}
export default App

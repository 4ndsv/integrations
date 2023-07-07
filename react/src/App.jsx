import { useState } from 'react'
import { CreateIntegration } from './CreateIntegration'
import { SelectList } from './SelectList'

function App() {
  const [selectData, setSelectData] = useState([])
  const [integrationMappingFields, setIntegrationMappingFields] = useState([])
  return (
    <>
      <p/>
        <CreateIntegration props ={{setSelectData, setIntegrationMappingFields }} />
      <p/>
        <SelectList props = {{selectData, integrationMappingFields}} />
    </>
  )
}
export default App

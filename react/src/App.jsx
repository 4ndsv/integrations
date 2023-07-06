import { useState } from 'react'
import { CreateIntegration } from './CreateIntegration'
import { BPMSelectList } from './BPMSelectList'

function App() {
  const [selectData, setSelectData] = useState([])
  const [integrationMappingFields, setIntegrationMappingFields] = useState([])
  return (
    <>
      <p/>
        <CreateIntegration props ={{setSelectData, setIntegrationMappingFields }} />
      <p/>
        <BPMSelectList props = {{selectData, integrationMappingFields}} />
    </>
  )
}
export default App

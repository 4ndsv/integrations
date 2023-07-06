import React, { useEffect, useState } from 'react';
import jp from 'jsonpath' 

export function CreateIntegration({props}){
    const[response,setResponse] = useState([])
    const[jsonPath,setJsonPath] = useState([])
    const[mapFields,setMapFields]= useState([])
    const[url,setURL] = useState('')
 
    function handleSubmit(e){
        e.preventDefault()
        request()
    }

    function urlChange(e){
        setURL(()=>{
            return e.target.value
        })
    }  

    function jsonPathChange(e){
        setJsonPath(()=>{
            return e.target.value
        })
    }

    function mapFieldChange(e){
        setMapFields(()=>{
            return e.target.value
        })
    }

    function mapFieldIsValid(){
        let hasKey,hasValue = false
        try {        
            
            let mappingList = mapFields.split('\n')

            mappingList.forEach((mappingItem)=>{
                let identifier = mappingItem.split("=>")[1].trim()
                if(identifier.includes("key") || hasKey)
                    hasKey = true
                else
                    hasKey = false

                if(identifier.includes("value") || hasValue)
                    hasValue = true
                else
                hasValue = false
            })

            
            if(!hasKey)
                alert("O mapeamento para o identificador 'key' não foi preenchido")
            else if(!hasValue)
                alert("O mapeamento para o identificador 'value' não foi preenchido")

        } catch (error) {
            alert("Verificar a estrutura de mapeamento de identificadores")
        } finally{
            if (hasKey  && hasValue)
                return true
        }
    }
    
    function doIntegration(){
        if (mapFieldIsValid()){
            props.setSelectData(()=>{return response})
            props.setIntegrationMappingFields(()=>{ return mapFields})
        }

    }

    function request(){
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                setResponse(()=>{
                    try {
                        let jsonFiltered = jp.query(data,jsonPath)
                        return JSON.stringify(jsonFiltered,null,2)
                    } catch (error) {
                        return JSON.stringify(data,null,2)
                    }                    
                })
            })
            .catch((ex)=>{
                console.warn(ex)
            })
    }
    return (
        <div className="card">
            <form onSubmit={handleSubmit} className="card-body">
            <h5 className="card-title">Configurar Integração</h5>
            <div className='card-text'> 
                <div className="row">
                    <div className="col-9">
                        <label htmlFor='url'>URL</label>
                        <input onChange={urlChange} type="url" title="URL" defaultValue='' className="form-control" id="url" />
                    </div>
                    <div className="col-3">
                        <label>HTTP Method</label>
                        <select id="httpMethod" title='HTTP Method' className="form-control">
                            <option defaultValue>GET</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>JsonPath</label>
                        <input onKeyUp={jsonPathChange} type="text"  title="JsonPath" className="form-control" id="jsonPath" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>Response</label>
                        <pre><textarea disabled={true} rows="5"  className='form-control' defaultValue={response} /></pre>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label>Mapeamento</label>
                        <textarea onChange={mapFieldChange} placeholder='integrationField => formField' className="form-control" />     
                    </div>
                    <div className='col-12'>
                        <span>Nota: é obrigatorio o mapeamento para os identificadores 'key' e 'value'</span>
                    </div>
                </div>
                <div className="row">
                    <div className='col-auto'></div>
                   
                    <div className="col text-end ">
                        <button type="submit" className="btn btn-primary m-1">Testar Integração</button>
                        <button type="button" onClick={doIntegration} className="btn btn-success m-1">Integrar</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
}



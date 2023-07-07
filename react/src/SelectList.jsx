import React, { useState, useEffect } from 'react';

export function SelectList({ props }) {
    const [selectList, setSelectList] = useState([])
    const [isWorking, setIsWorking] = useState(false)
    const [options, setOptions] = useState()

    useEffect(() => {
        selectList.length > 1 ? setIsWorking(true) : setIsWorking(false)
    }, [selectList])

    useEffect(() => {
        extractSelectList(props.selectData, props.integrationMappingFields)
    }, [props.selectData])

    function extractSelectList(data, identifiers) {
        try {
            let key, value
            let identifierList = identifiers.split('\n')

            identifierList.forEach((identifier) => {
                let keyValue = identifier.split('=>')
                if (keyValue[1].trim() == "key")
                    key = keyValue[0].trim()
                if (keyValue[1].trim() == "value")
                    value = keyValue[0].trim()
            })

            let dataObj = JSON.parse(data)
            let newSelectList = []

            dataObj.map((item) => {
                let newSelectItem = { label: item[value], value: item[key] }
                newSelectList.push(newSelectItem)
            });
            setSelectList(newSelectList)

            let options = []
            let i = 1
            newSelectList.map((item) => {
                options.push(<option value={i++}>{item}</option>)
            })
            setOptions(() => { return options })

        } catch (error) {
            console.warn(error + '\n' + data)

        }

    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Campo de Seleção <svg height="10" width="10" className={`${isWorking ? 'bg-success' : 'bg-body-secondary'} p-1 rounded-circle`} /></h5>
                <div className='card-text'>
                    <select className='form-control'>
                        <option defaultValue>Selecione...</option>
                        {options}
                    </select>
                </div>
            </div>
        </div>
    );
}






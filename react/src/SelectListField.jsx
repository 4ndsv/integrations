import React, { useState, useEffect } from 'react';

export function SelectListField({ props }) {
    const [isWorking, setIsWorking] = useState(false)
    const [options, setOptions] = useState()

    useEffect(() => {
        extractSelectList(props.selectData, props.identifiers)
    }, [props.selectData, props.identifiers])

    function extractSelectList(data, identifiers) {
        try {
            let key = identifiers.filter(item => item["key"])[0].key
            let value = identifiers.filter(item => item["value"])[0].value
            let dataObj = JSON.parse(data)
            let options = []
            let index = 0

            dataObj.map((item) => {

                // todo resolver problema com valores boleanos

                if (item[key] == undefined || item[value] == undefined)
                    return
                options.push(<option key={++index} value={item[key]}>{item[value]}</option>)
            });
            setOptions(options)
        } catch (error) {
            setIsWorking(false)
            setOptions([])
            console.warn(error)
        } finally {
             //setIsWorking( (options.length > 1))
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






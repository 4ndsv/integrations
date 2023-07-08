import React, { useState, useEffect } from 'react';

export function TableField({ props }) {
    const [selectList, setSelectList] = useState([])
    const [isWorking, setIsWorking] = useState(false)
    const [options, setOptions] = useState()

    useEffect(() => {
        selectList.length > 1 ? setIsWorking(true) : setIsWorking(false)
    }, [selectList])

    useEffect(() => {
        extractTable()
    }, [props.selectData])

    function extractTable(){
        try {
            let key, value
            let identifierList = props.integrationMappingFields.split('\n')

            identifierList.forEach((identifier) => {
                let keyValue = identifier.split('=>')
                if (keyValue[1].trim() == "key")
                    key = keyValue[0].trim()
                if (keyValue[1].trim() == "value")
                    value = keyValue[0].trim()
            })

            let tableHeads = []


            identifierList



            let dataObj = JSON.parse(data)
            let newRow = []

            dataObj.map((item) => {
                let newSelectItem = { label: item[value], value: item[key] }
                newSelectList.push(newSelectItem)
            });



        } catch (error) {
            console.warn(error)
        }


    }

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
                <h5 className="card-title">Campo Tabela <svg height="10" width="10" className={`${isWorking ? 'bg-success' : 'bg-body-secondary'} p-1 rounded-circle`} /></h5>
                <div className='card-text'>
                    <table class="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}






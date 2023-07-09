import React, { useState, useEffect } from 'react';

export function TableField({ props }) {
    const [tableHTML, setTableHTML] = useState([])
    const [isWorking, setIsWorking] = useState(false)

    useEffect(() => {
        extractTable()
    }, [props.selectData, props.identifiers])

    function extractTable() {
        try {

            debugger

            if (props.identifiers.length > 0) {
                let table = []
                let tableHeads = []
                let tableRows = []

                let dataObj = JSON.parse(props.selectData)

                if (dataObj.length != undefined && dataObj.length > 0) {
                    props.identifiers.map((item, index) => {
                        tableHeads.push(
                            <th key={index} scope="col-auto">
                                {Object.keys(item)}
                            </th>
                        )
                    })

                    dataObj.map((row, index) => {
                        let tdList = []

                        props.identifiers.forEach((item) => {
                            tdList.push(<td>{row[Object.values(item)]}</td>)
                        })
                        tableRows.push(
                            <tr>
                                {tdList}
                            </tr>
                        )
                    })

                    table.push(
                        <table className="table table-dark table-striped" >
                            <thead>
                                {tableHeads}
                            </thead>
                            <tbody>
                                {tableRows}
                            </tbody>
                        </table>
                    )
                    setIsWorking(true)
                    setTableHTML(table)
                }
            } else {
                setIsWorking(false)
            }
        } catch (error) {
            setIsWorking(false)
            console.warn(error)
        }
    }
    return (
        <div className="card">
            <div className="card-body">

                <h5 className="card-title">Campo Tabela <svg height="10" width="10" className={`${isWorking ? 'bg-success' : 'bg-body-secondary'} p-1 rounded-circle`} /></h5>
                <div className='card-text'>
                    {tableHTML}
                </div>
            </div>
        </div>
    );
}






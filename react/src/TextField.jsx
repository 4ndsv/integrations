import React, { useState, useEffect } from 'react';

export function TextField({ props }) {
    const [isWorking, setIsWorking] = useState(false)
    const [text, setText] = useState([""])

    useEffect(() => {
        setText(extractText())
    }, [props.selectData])

    function extractText() {
        let text = ""
        try {
            let obj = JSON.parse(props.selectData)
            typeof (obj[0]) == "string" ? text = obj[0] : text = ""

            setIsWorking(text.length > 0 ? true : false)
            return text
        }
        catch (error) {
            console.warn("Erro ao extrair dado para campo texto: " + console.group(error))
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Campo de Texto <svg height="10" width="10" className={`${isWorking ? 'bg-success' : 'bg-body-secondary'} p-1 rounded-circle`} /></h5>
                <div className='card-text'>
                    <input className='form-control' defaultValue={text} />
                </div>
            </div>
        </div>
    );
}






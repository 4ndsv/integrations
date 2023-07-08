import React, { useState, useEffect } from 'react';

export function TextField({ props }) {
    const [isWorking, setIsWorking] = useState(false)
    const [text, setText] = useState("bah")

    useEffect(() => {
        extractText(props.selectData)
    }, [props.selectData])

    function extractText(data) {
        try {
            let obj = JSON.parse(data)
            if (obj.length > 0 && obj.length < 2) {
                setText(() => { return obj.toString() })
                setIsWorking(() => { return true })
            } else
                setIsWorking(false)
        } catch (error) {
            console.warn(error)
            setIsWorking(false)
        } finally {
            if (!isWorking)
                setText("")
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Campo de Texto <svg height="10" width="10" className={`${isWorking ? 'bg-success' : 'bg-body-secondary'} p-1 rounded-circle`} /></h5>
                <div className='card-text'>
                    <input className='form-control' type='text' value={text} />
                </div>
            </div>
        </div>
    );
}






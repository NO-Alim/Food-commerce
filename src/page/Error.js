import React from 'react'
import { useHistory } from 'react-router-dom'
import './scss/Error.scss'

const Error = () => {
    const location = useHistory();
    return (
        <div className="error-container">
            <h1>4 <span>0</span> 4 !!</h1>
            <strong>Sorry we can’t find that page! Don’t worry, though everything is STILL AWESOME!</strong>
            <button onClick={() => location.push('/')}>Home</button>
        </div>
    )
}

export default Error

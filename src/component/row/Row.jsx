import React from 'react'
import './Row.css'

const Row = ({ name, email, role, actions, checkbox, className }) => {
    return (
        <div className={`${className} row`}>
            <span>{checkbox} </span>
            <span>{name} </span>
            <span>{email} </span>
            <span>{role} </span>
            <span>{actions} </span>
        </div>
    )
}

export default Row

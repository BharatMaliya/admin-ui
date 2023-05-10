import React from './Actions.css'
import { Delete, Edit } from '../../component/icones/Icons'
const Actions = ({ handleEdit, handleDelete, id }) => {
    return (
        <div className='Actions'>
            <Edit id={id} handleClick={handleEdit} />
            <Delete id={id} handleClick={handleDelete} />
        </div>
    )
}

export default Actions

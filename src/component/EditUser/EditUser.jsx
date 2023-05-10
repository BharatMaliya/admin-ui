import { useEffect, useState } from 'react'
import './EditUser.css'

const EditUser = ({ onChange, SubmitForm, email, name, role }) => {



  return (
    <form onSubmit={SubmitForm} className='EditUser'>
      <span />
      <input onChange={onChange} value={name} type='text' name='name' />
      <input onChange={onChange} value={email} type='email' name='email' />
      <input onChange={onChange} value={role} type='text' name='role' />
      <button type='submit'>Save </button>
    </form>
  )
}

export default EditUser;
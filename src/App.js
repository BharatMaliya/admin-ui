import './App.css';
import Searchbar from './component/searchbar/searchbar';
import Row from './component/row/Row';
import { useEffect, useState } from 'react';
import Actions from './component/actions/Actions';
import { Forward, Left, Previous } from './component/icones/Icons';
import { Next } from './component/icones/Icons';
import EditUser from './component/EditUser/EditUser';

function App() {

  const [users, setUsers] = useState([])
  const [usersToDelete, setUsersToDelete] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, securrentPage] = useState(1)
  const [edit, setEdit] = useState(null)
  const userperPage = 10;
  const lastIndex = currentPage * userperPage
  const firstIndex = lastIndex - userperPage

  let filteredUsers = users.filter(user => search ?
    (user.name.toLowerCase().trim() === search.toLowerCase().trim() ||
      user.email.toLowerCase().trim() === search.toLowerCase().trim() ||
      user.role.toLowerCase().trim() === search.toLowerCase().trim()) :
    true)

  const records = filteredUsers.slice(firstIndex, lastIndex)
  const pages = [...Array(Math.ceil(users.length / userperPage) + 1).keys()].slice(1)

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleDelete = (e) => {
    setUsers(users.filter(user => user.id !== e.currentTarget.id))
  }


  const handleAllCheckbox = () => {
    if (usersToDelete.length === 10) {
      setUsersToDelete([])
    } else {
      setUsersToDelete(
        records.map(rec => { return rec.id })
      )
    }
  }

  const handleCheckbox = (e) => {
    if (usersToDelete.includes(e.currentTarget.id)) {
      setUsersToDelete(usersToDelete.filter(user => user != e.currentTarget.id))
    } else {
      setUsersToDelete([...usersToDelete, e.currentTarget.id])
    }
  }

  const handleAllDelete = () => {
    setUsers(users.filter(user => !usersToDelete.includes(user.id)))
    setUsersToDelete([])
  }

  const handlePage = (e) => {
    securrentPage(e.target.id)
  }

  // console.log(usersToDelete)
  const fetchData = async () => {
    try {
      const res = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  //Edit logic---------------------------
  const [form, setForm] = useState({})
  console.log(form)
  const handleEdit = (e) => {
    setEdit(e.currentTarget.id)
    const usertoEdit = records.find(user => user.id == e.currentTarget.id)
    setForm(
      {
        ...form,
        email: usertoEdit.email,
        name: usertoEdit.name,
        role: usertoEdit.role
      })
  }

  const onChange = (e) => {
    const { name, value } = e.currentTarget
    setForm(
      {
        ...form,
        [name]: value
      })
  }

  const SubmitForm = (e) => {
    e.preventDefault()

    setUsers(users.map(user => {
      if (user.id == edit) {
        return (
          {
            ...user,
            email: form.email,
            name: form.name,
            role: form.role
          }
        )
      } else {
        return user
      }
    }))
    setEdit(null)
  }

  return (
    <div className="App">
      <Searchbar onChange={handleSearch} value={search} />
      <div className="table">
        <div className="thead">
          <Row
            className='t-head'
            checkbox={<input onChange={handleAllCheckbox} checked={usersToDelete.length === 10} className='pointer' type='checkbox' />}
            name='Name'
            email='Email'
            role='Role'
            actions='Actions'
          />
        </div>
        <div className="tbody">
          {
            records
              .map((user) => {

                return (
                  edit == user.id ?
                    <EditUser SubmitForm={SubmitForm} onChange={onChange} email={form.email} name={form.name} role={form.role} />
                    :
                    <Row
                      key={user.id}
                      className='t-body'
                      checkbox={<input id={user.id} className='pointer' checked={usersToDelete.includes(user.id)} onChange={handleCheckbox} type='checkbox' />}
                      name={user.name}
                      email={user.email}
                      role={user.role}
                      actions={<Actions id={user.id} handleDelete={handleDelete} handleEdit={handleEdit} />}
                    />
                )
              })
          }
        </div>
      </div>
      <div className="pages-container">
        <div>
          <button onClick={handleAllDelete} className='dlt-btn'>Delete Selected</button>
        </div>
        <ul className='pages'>
          <li onClick={() => securrentPage(1)} className={currentPage == 1 ? 'active' : ''} > <Previous /> </li>
          <li onClick={() => currentPage > 1 && securrentPage(currentPage - 1)}><Left /> </li>
          {
            pages.map((page) => {
              return (
                <li className={currentPage == page ? 'active' : ''} id={page} onClick={handlePage}>{page} </li>
              )
            })
          }
          <li onClick={() => currentPage < pages.length && securrentPage(+currentPage + 1)}><Next /> </li>
          <li onClick={() => securrentPage(pages.length)} className={currentPage == pages.length ? 'active' : ''}> <Forward /> </li>
        </ul>
      </div>
    </div>
  );
}

export default App;

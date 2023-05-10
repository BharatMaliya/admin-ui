import './searchbar.css'

const Searchbar = ({ onChange, value }) => {
    return (
        <input className='input' type='text' placeholder='search by name, email, or role' onChange={onChange} value={value} />
    )
}

export default Searchbar

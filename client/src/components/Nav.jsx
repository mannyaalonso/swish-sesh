import { Link } from 'react-router-dom'

const nav = () => {
  return (
    <header>
      <Link to='/home'>Home</Link>
      <Link to='/faq'>FAQ</Link>
      <Link to='/profile'>My Profile</Link>
      <Link to='/signin'>Sign In</Link>
    </header>
  )
}

export default nav

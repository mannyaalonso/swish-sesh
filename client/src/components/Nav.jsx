import { FaBasketballBall } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Nav = () => {
  const navigate = useNavigate()

  const navigation = [
    { name: "Home", href: "/" },
    // { name: "", href: "#" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ]

  const handleClick = () => {
    sessionStorage.removeItem("user")
    navigate("/")
  }

  return (
    <>
    <header className="bg-slate-900">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">SwishSesh</span>
              <FaBasketballBall className="mx-auto h-12 w-auto text-slate-100" />
              {/* <img className="h-10 w-auto" src="https://i.imgur.com/YrHjqIw.png" alt="" /> */}
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {sessionStorage.getItem("user") &&
            <button
              onClick={handleClick}
              className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
            >
              Logout
            </button>}
            <a
              href="/profile"
              className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
            >{sessionStorage.getItem("user") ? 
              <p>My Profile</p> : <p>Sign In</p>}
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  </>

  )
}



export default Nav


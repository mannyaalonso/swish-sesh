import { Route, Routes } from "react-router-dom"
import Confirmation from "./pages/Confirmation"
import Registration from "./pages/Registration"
import RunDetails from "./pages/RunDetails"
import Footer from "./components/Footer"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Nav from "./components/Nav"
import About from "./pages/About"
import { useState } from "react"
import Home from "./pages/Home"
import Faq from "./pages/Faq"

function App() {
  const [user, setUser] = useState("")

  return (
    <>
      <header>
        <Nav />
      </header>
      <main className="h-screen bg-slate-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/run/:id" element={<RunDetails />} />
          {user === null ?
            <Route path="/profile" element={<Profile />} /> :
            <Route path="/profile" element={<SignIn setUser={setUser} />} />
          }
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App

import { Route, Routes } from "react-router-dom"
import Confirmation from "./pages/Confirmation"
import Registration from "./pages/Registration"
import RunDetails from "./pages/RunDetails"
import Footer from "./components/Footer"
import Payment from "./pages/Payment"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Nav from "./components/Nav"
import About from "./pages/About"
import { useState } from "react"
import Home from "./pages/Home"
import Faq from "./pages/Faq"

function App() {
  const [user, setUser] = useState({})
  console.log(user)

  return (
    <>
      <header>
        <Nav user={user} />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/confirmation" element={<Confirmation user={user} />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/registration" element={<Registration user={user} />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/run/:id" element={<RunDetails />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )

}

export default App

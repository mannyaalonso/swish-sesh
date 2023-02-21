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
  const [user, setUser] = useState("")

  console.log("USER", user)

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/run/:id" element={<RunDetails />} />
          {user === null ? 
          <Route path="/profile" element={<Profile />} /> :
          <Route path="/profile" element={<SignIn setUser={setUser} />} /> }
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )

}

export default App

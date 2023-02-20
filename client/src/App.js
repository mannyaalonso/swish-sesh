import { Route, Routes } from "react-router-dom"
import Confirmation from "./pages/Confirmation"
import Registration from "./pages/Registration"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Home from "./pages/Home"
import Faq from "./pages/Faq"
import Nav from "./components/Nav"

function App() {
  return (
    <header>
      <Nav />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </main>
    </header>
  )
}

export default App

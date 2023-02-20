import { Route, Routes } from "react-router-dom"
import Confirmation from "./pages/Confirmation"
import Registration from "./pages/Registration"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Payment from "./pages/Payment"
import Home from "./pages/Home"
import Faq from "./pages/Faq"
import About from "./pages/About"
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import RunDetails from "./pages/RunDetails"

function App() {
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/signin" element={<SignIn />} />
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

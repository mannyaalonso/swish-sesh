import { useState, useEffect } from 'react'
import jwt_decode from "jwt-decode"
import axios from 'axios'

const SignIn = () => {
  const [user, setUser] = useState({})

  const createUser = async (userObject) => {
    try {
      const res = await axios.post(`/api/users`, {
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
        isLoggedIn: true,
      })
      setUser(res.data.user)
    } catch (err) {
      if (err.response.status === 500) {
        try {
          let email = { email: userObject.email }
          let res = await axios.post("/api/login", email)
          if (res.data.message === "Login successful") setUser(res.data.user)
        } catch (e) {}
      }
    }
  }

  const handleCallBackResponse = async (response) => {
    let userObject = jwt_decode(response.credential)
    createUser(userObject)
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "274175101183-4mve9l24sn15adfls3jrhdpt177clk8k.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    })
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    })
  }, [])

  return <div>Hello Google</div>
}

export default SignIn

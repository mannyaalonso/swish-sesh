import { useState, useEffect } from "react"
import { FaBasketballBall } from "react-icons/fa"
import jwt_decode from "jwt-decode"
import axios from "axios"

const SignIn = () => {
  const [user, setUser] = useState({})

  // const createUser = async (userObject) => {
  //   try {
  //     const res = await axios.post(`/api/users`, {
  //       name: userObject.name,
  //       email: userObject.email,
  //       picture: userObject.picture,
  //       isLoggedIn: true,
  //     })
  //     setUser(res.data.user)
  //   } catch (err) {
  //     if (err.response.status === 500) {
  //       try {
  //         let email = { email: userObject.email }
  //         let res = await axios.post("/api/login", email)
  //         if (res.data.message === "Login successful") setUser(res.data.user)
  //       } catch (e) {}
  //     }
  //   }
  // }

  const handleCallBackResponse = async (response) => {
    let userObject = jwt_decode(response.credential)
    console.log(userObject)
    //createUser(userObject)
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

  return (
    <div className="h-screen">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <FaBasketballBall className="mx-auto h-12 w-auto text-indigo-600" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to register for {" "}
              <span className="text-indigo-600 hover:text-indigo-500">
                Swish Sesh
              </span>
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 flex items-center justify-center"
            action="#"
            method="POST"
          >
            <div id="signInDiv"></div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn

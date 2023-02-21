import axios from 'axios'
import { useEffect, useState, } from 'react'


const Profile = (
  // { user }
) => {
  // const [currentUser, setCurrentUser] = useState(user)
  const [currentUser, setCurrentUser] = useState('')
  const [updateUser, setUpdateUser] = useState({
    experience: `${currentUser.experience}`,
  })
  const [editing, setEditing] = useState(false)
  // const [currentUserId, setCurrentUserId] = useState('')

  console.log(currentUser.experience)

  // const getUser = async (e) => {
  //   try {
  //     const res = await axios.get(`/api/user/${user._id}`)
  //     setCurrentUser(res.data.user)
  //     // setCurrentUser(res)
  //     // console.log(res)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }


  // useEffect(() => {
  //   getUser()
  // }, [])

  const getUser = async (e) => {
    try {
      const res = await axios.get(`/api/user/63f3f2c0f1105e076a869468`)
      setCurrentUser(res.data.user)
      // setCurrentUser(res)
      // console.log(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateExpPackage = {
      experience: updateUser.experience,
    }

    console.log(updateExpPackage)
    const response = await axios.put(`/api/user/63f3f2c0f1105e076a869468/`, updateExpPackage)

  }
  // const handleEditState = (currentUser) => {
  //   setUpdateExp({ experience: `${currentUser.experience}` })
  //   setUserId(currentUser._id)
  // }
  const handleChange = (e) => {
    // e.preventDefault()
    setUpdateUser({
      // ...updateExp,
      [e.target.name]: e.target.value,
    })
    // console.log(e.target.name)
    // console.log(e.target.value)
  }

  return (
    <div className="p-20">
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Personal Information
              </h3>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name: {currentUser.name}
                </label>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address: {currentUser.email}
                </label>
              </div>


              <div className="sm:col-span-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience: {currentUser.experience}
                </label>
                <div className="mt-1">
                  <button
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={(e) => { e.preventDefault(); setEditing(!editing) }}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {editing &&
                <div className="sm:col-span-4">
                  <label
                    htmlFor="updateExp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience
                  </label>
                  <div className="mt-1">
                    <select
                      id="updateExp"
                      name="experience"
                      type="text"
                      // autoComplete="experience"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      onChange={handleChange}
                      value={updateUser.experience}
                    >
                      <option value="Recreational & Friendly">
                        Recreational & Friendly
                      </option>
                      <option value="Competitive">Competitive</option>
                      <option value="Professional">Professional</option>
                      <option value="Elite">Elite</option>
                    </select>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onSubmit={handleSubmit}
                    >
                      Update
                    </button>
                  </div>
                </div>}

              <div className="sm:col-span-4">
                <label
                  htmlFor="pastRun"
                  className="block text-sm font-medium text-gray-700"
                >
                  Past Runs: {currentUser.pastRuns}
                </label>
                <div className="mt-1"></div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onSubmit={handleSubmit}
            >
              Save
            </button>
          </div>
        </div> */}
      </form>
    </div>
  )
}


export default Profile

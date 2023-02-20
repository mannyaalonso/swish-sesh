import axios from 'axios'
import { useEffect, useState, } from 'react'

const Profile = () => {
  const [user, setUser] = useState([])
  const [updateExp, setUpdateExp] = useState({ experience: `${user.experience}` })

  console.log(user.experience)

  const getUser = async (e) => {
    try {
      const res = await axios.get(`/api/user/${user._id}`)
      // setUser(res.data.user)
      setUser(res)
      // console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleSubmit = async (e) => {
    // console.log(e)
    e.preventDefault()
    const updateExpPackage = {
      experience: updateExp.experience
    }
    const response = await axios.put(`/api/user/63f3d9d269dd3b32ef27e0f3`, updateExpPackage)
    console.log(updateExp)
  }

  const handleChange = (e) => {
    // e.preventDefault()
    setUpdateExp({
      // ...updateExp, 
      [e.target.name]: e.target.value
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
                  Full Name: {user.name}
                </label>
              </div>


              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address: {user.email}
                </label>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience
                </label>
                <div className="mt-1">
                  <select
                    id="experience"
                    name="experience"
                    type="text"
                    // autoComplete="experience"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange}
                  >
                    <option value="Recreational & Friendly">Recreational & Friendly</option>
                    <option value="Competitive">Competitive</option>
                    <option value="Professional">Professional</option>
                    <option value="Elite">Elite</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="pastRun"
                  className="block text-sm font-medium text-gray-700"
                >
                  Past Runs: {user.pastRuns}
                </label>
                <div className="mt-1">
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onSubmit={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}


export default Profile

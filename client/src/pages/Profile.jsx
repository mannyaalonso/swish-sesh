import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"

const Profile = ({ userId }) => {
  let navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState("")

  const [updateUser, setUpdateUser] = useState({
    experience: `Recreational & Friendly`,
  })

  const [editing, setEditing] = useState(false)

  const [runs, setRuns] = useState({ past: [], current: [] })

  const getUser = async (e) => {
    try {
      const res = await axios.get(`/api/user/${sessionStorage.getItem("user")}`)
      // const res = await axios.get(`/api/user/63f3f2c0f1105e076a869468`)
      setCurrentUser(res.data.user)
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
      experience: updateUser,
    }

    await axios.put(`/api/user/${userId}`, updateExpPackage.experience)
    // await axios.put(`/api/user/63f3f2c0f1105e076a869468`, updateExpPackage.experience)
    getUser()
    setEditing(false)
  }

  const handleChange = (e) => {
    setUpdateUser({
      [e.target.name]: e.target.value,
    })
  }

  const getRuns = async () => {
    try {
      const res = await axios.get(`/api/user/runs/${userId}`)
      // const res = await axios.get(`/api/user/runs/63f3f2c0f1105e076a869468`)
      const pastRuns = res.data.runs.filter((run) => {
        return new Date(run.date) < new Date()
      })
      const currentRuns = res.data.runs.filter((run) => {
        return new Date(run.date) >= new Date()
      })
      setRuns({ past: pastRuns, current: currentRuns })
    } catch (err) {
      console.log(err)
    }
  }


  useEffect(() => {
    getRuns()
  }, [])

  const toggleSortDate = () => {
    const newList = [...runs.current]
    console.log(newList)
    if (new Date(newList[0].date) > new Date(newList[1].date)) {
      newList.sort((a, b) => new Date(a.date) - new Date(b.date))
      setRuns({ past: runs.past, current: newList })
    } else {
      newList.sort((a, b) => new Date(b.date) - new Date(a.date))
      setRuns({ past: runs.past, current: newList })
    }
  }

  const toggleSortSpotsAvailbale = () => {
    const newList = [...runs.current]
    if (newList[0].players.length > newList[1].players.length) {
      newList.sort((a, b) => a.players.length - b.players.length)
      setRuns({ past: runs.past, current: newList })
    } else {
      newList.sort((a, b) => b.players.length - a.players.length)
      setRuns({ past: runs.past, current: newList })
    }
  }

  const toggleSortLocation = () => {
    const newList = [...runs.current]
    if (newList[0].location.toUpperCase() > newList[1].location.toUpperCase()) {
      newList.sort((a, b) => a.location.localeCompare(b.location))
      setRuns({ past: runs.past, current: newList })
    } else {
      newList.sort((a, b) => b.location.localeCompare(a.location))
      setRuns({ past: runs.past, current: newList })
    }
  }

  const toggleSortHost = () => {
    const newList = [...runs.current]
    if (newList[0].host.toUpperCase() > newList[1].host.toUpperCase()) {
      newList.sort((a, b) => a.host.localeCompare(b.host))
      setRuns({ past: runs.past, current: newList })
    } else {
      newList.sort((a, b) => b.host.localeCompare(a.host))
      setRuns({ past: runs.past, current: newList })
    }
  }
  const toggleSortDatePast = () => {
    const newList = [...runs.past]
    if (new Date(newList[0].date) > new Date(newList[1].date)) {
      newList.sort((a, b) => new Date(a.date) - new Date(b.date))
      setRuns({ current: runs.current, past: newList })
    } else {
      newList.sort((a, b) => new Date(b.date) - new Date(a.date))
      setRuns({ current: runs.current, past: newList })
    }
  }

  const toggleSortSpotsAvailbalePast = () => {
    const newList = [...runs.past]
    if (newList[0].players.length > newList[1].players.length) {
      newList.sort((a, b) => a.players.length - b.players.length)
      setRuns({ current: runs.current, past: newList })
    } else {
      newList.sort((a, b) => b.players.length - a.players.length)
      setRuns({ current: runs.current, past: newList })
    }
  }

  const toggleSortLocationPast = () => {
    const newList = [...runs.past]
    if (newList[0].location.toUpperCase() > newList[1].location.toUpperCase()) {
      newList.sort((a, b) => a.location.localeCompare(b.location))
      setRuns({ current: runs.current, past: newList })
    } else {
      newList.sort((a, b) => b.location.localeCompare(a.location))
      setRuns({ current: runs.current, past: newList })
    }
  }

  const toggleSortHostPast = () => {
    const newList = [...runs.past]
    if (newList[0].host.toUpperCase() > newList[1].host.toUpperCase()) {
      newList.sort((a, b) => a.host.localeCompare(b.host))
      setRuns({ current: runs.current, past: newList })
    } else {
      newList.sort((a, b) => b.host.localeCompare(a.host))
      setRuns({ current: runs.current, past: newList })
    }
  }

  return (
    currentUser && (
      <>
        <div className="p-20 mt-24">
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-100">
                    Profile
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    You can edit your experience here.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-slate-100"
                    >
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <img src={currentUser.picture} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-slate-100">
                    Personal Information
                  </h3>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-slate-300"
                    >
                      <span className="text-indigo-400">Full Name:</span>{" "}
                      {currentUser.name}
                    </label>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      <span className="text-indigo-400">Email Address:</span>{" "}
                      {currentUser.email}
                    </label>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium text-slate-300"
                    >
                      <span className="text-indigo-400">Experience:</span>{" "}
                      {currentUser.experience}
                    </label>
                    <div className="mt-1">
                      <button
                        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={(e) => {
                          e.preventDefault()
                          setEditing(!editing)
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>

                {editing && (
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
                      >
                        Update
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </form>


          <div className="sm:col-span-4 mt-8">
            <label
              htmlFor="pastRun"
              className="block text-sm font-medium text-slate-300"
            >
              <span className="text-indigo-400">Current Runs:</span>
              <div className="mt-8 flow-root">
                <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-slate-900">
                    <table className="min-w-full divide-y divide-gray-400">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-0"
                          >
                            <button onClick={toggleSortLocation}>Location</button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button onClick={toggleSortDate}>
                              Date/Time
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button
                              onClick={
                                toggleSortSpotsAvailbale
                              }
                            >
                              Spots
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button onClick={toggleSortHost}>Host</button>
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-400 bg-slate-800">
                        {runs.current && runs.current.map((run) => (
                          <tr key={run._id}>
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                {/* <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={run.image} alt="" />
                        </div> */}
                                <div className="ml-4">
                                  <div className="font-medium text-slate-100">
                                    {run.location}
                                  </div>
                                  <div className="text-slate-300">
                                    {run.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-slate-100">
                                {run.date}
                              </div>
                              <div className="text-slate-300">
                                {run.time}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {run.isFull && "Full"}
                                {!run.isFull &&
                                  `${30 - run.players.length
                                  } spaces available`}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                              {run.host}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/run/${run._id}`)
                                }
                                className="block rounded-md bg-indigo-500 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                More Info
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </label>
            <div className="mt-1"></div>
          </div>


          <div className="sm:col-span-4 mt-8">
            <label
              htmlFor="pastRun"
              className="block text-sm font-medium text-slate-300"
            >
              <span className="text-indigo-400">Past Runs</span>
              {/* {currentUser.pastRuns.location} */}
              <div className="mt-8 flow-root ">
                <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-slate-900">
                    <table className="min-w-full divide-y divide-gray-400">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-0"
                          >
                            <button onClick={toggleSortLocationPast}>Location</button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button onClick={toggleSortDatePast}>
                              Date/Time
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button
                              onClick={
                                toggleSortSpotsAvailbalePast
                              }
                            >
                              Spots
                            </button>
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                          >
                            <button onClick={toggleSortHostPast}>Host</button>
                          </th>
                          <th
                            scope="col"
                            className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                          >
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-400 bg-slate-800">
                        {runs.past.map((run) => (
                          <tr key={run._id}>
                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm sm:pl-0">
                              <div className="flex items-center">
                                {/* <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full" src={run.image} alt="" />
                        </div> */}
                                <div className="ml-4">
                                  <div className="font-medium text-slate-100">
                                    {run.location}
                                  </div>
                                  <div className="text-slate-300">
                                    {run.address}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-slate-100">
                                {run.date}
                              </div>
                              <div className="text-slate-300">
                                {run.time}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {run.isFull && "Full"}
                                {!run.isFull &&
                                  `${30 - run.players.length
                                  } spaces available`}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                              {run.host}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                              <button
                                type="button"
                                onClick={() =>
                                  navigate(`/run/${run._id}`)
                                }
                                className="block rounded-md bg-indigo-500 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                More Info
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </label>
            {/* <div className="mt-1"></div> */}
          </div>
          {/* </div>
            </div>
          </form> */}
        </div>
        {/* <footer>
        <Footer />
      </footer> */}
      </>
    )
  )
}

export default Profile

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { BsFillPersonFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const RunDetails = ({ user }) => {
	const [selectedRun, setSelectedRun] = useState({_id: ""})
	const navigate = useNavigate()
	let { id } = useParams()

	useEffect(() => {
		getRun()
	}, [])

	const getRun = async () => {
		const res = await axios.get(`/api/run/${id}`)
		setSelectedRun(res.data.run)
	}

	return (
    selectedRun && (
      <div className="px-6 lg:px-8 lg:mt-32 mt-44">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-slate-100">
              {selectedRun.location}
            </h1>
            <p className="mt-2 text-sm text-slate-300">{selectedRun.address}</p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            {sessionStorage.getItem("user") ? (
              <form action="/api/stripe/create-checkout-session" method="POST">
                <input type="hidden" name="runId" value={selectedRun._id} />
                <input
                  type="hidden"
                  name="userId"
                  value={sessionStorage.getItem("user")}
                />
                <button className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Register
                </button>
              </form>
            ) : (
              <button
                onClick={() => navigate("/profile")}
                className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign In to Register
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-0"
                    >
                      Player Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                    >
                      Experience
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100"
                    >
                      Number of runs
                    </th>
                    {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Host
                      </th> */}
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-6 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-slate-800">
                  {selectedRun.players &&
                    selectedRun.players.map((player, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 flex items-center justify-center">
                              <BsFillPersonFill
                                className="text-slate-100"
                                size={30}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-slate-100">
                                {player.name}
                              </div>
                              {/* <div className="text-gray-500">{selectedRun.address}</div> */}
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-100">
                          <div className="text-slate-100">
                            {player.experience}
                          </div>
                          {/* <div className="text-gray-500">{selectedRun.time}</div> */}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {player.pastRuns.length &&
                              `${player.pastRuns.length}`}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                        {/* <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-0">
                                <a href={`/run/${run._id}`} className="text-indigo-600 hover:text-indigo-900 mr-8">
                                  More info<span className="sr-only">, {run.name}</span>
                                </a>
                              </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
export default RunDetails

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const RunDetails = () => {

    const [selectedRun, setSelectedRun] = useState({})


    let { id } = useParams()

    useEffect(() => {
        getRun()
    },[])

    const getRun = async () => {
        const res = await axios.get(`/api/run/${id}`)
        setSelectedRun(res.data.run)
    }

	return (
        <div className="px-6 lg:px-8 mt-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">{selectedRun.location}</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of players
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add user
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date/Time
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Vacancy
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Host
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-6 sm:pr-0">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {selectedRun.players.map((player) => (
                      <tr key={player._id}>
                        <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm sm:pl-0">
                          <div className="flex items-center">
                            {/* <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={run.image} alt="" />
                            </div> */}
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{selectedRun.location}</div>
                              <div className="text-gray-500">{selectedRun.address}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="text-gray-900">{selectedRun.date}</div>
                          <div className="text-gray-500">{selectedRun.time}</div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            {selectedRun.isFull && "Full"}
                            {!selectedRun.isFull && `${30 - selectedRun.players.length} spaces available`}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{selectedRun.host}</td>
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
}
export default RunDetails
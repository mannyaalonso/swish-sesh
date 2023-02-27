import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Home = ({ user }) => {
	const [runs, setRuns] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		getRuns()
	}, [])

	const getRuns = async () => {
		const res = await axios.get("/api/runs")
		await res.data.runs.sort((a, b) => new Date(a.date) - new Date(b.date))
		setRuns(res.data.runs)
	}

	const toggleSortDate = () => {
		const newList = [...runs]
		if (new Date(newList[0].date) > new Date(newList[1].date)) {
			newList.sort((a, b) => new Date(a.date) - new Date(b.date))
			setRuns(newList)
		} else {
			newList.sort((a, b) => new Date(b.date) - new Date(a.date))
			setRuns(newList)
		}
	}

	const toggleSortSpotsAvailbale = () => {
		const newList = [...runs]
		if (newList[0].players.length > newList[1].players.length) {
			newList.sort((a, b) => a.players.length - b.players.length)
			setRuns(newList)
		} else {
			newList.sort((a, b) => b.players.length - a.players.length)
			setRuns(newList)
		}
	}

  const toggleSortLocation = () => {
    const newList = [...runs]
		if (newList[0].location.toUpperCase() > newList[1].location.toUpperCase()) {
			newList.sort((a,b) => a.location.localeCompare(b.location))
			setRuns(newList)
      console.log(runs)
		} else {
			newList.sort((a,b) => b.location.localeCompare(a.location))
			setRuns(newList)
      console.log(runs)
		}
	}

  const toggleSortHost = () => {
    const newList = [...runs]
		if (newList[0].host.toUpperCase() > newList[1].host.toUpperCase()) {
			newList.sort((a,b) => a.host.localeCompare(b.host))
			setRuns(newList)
      console.log(runs)
		} else {
			newList.sort((a,b) => b.host.localeCompare(a.host))
			setRuns(newList)
      console.log(runs)
		}
	}

	return (
		runs && (
			<div className="px-6 lg:px-8 bg-slate-900 lg:mt-32 mt-44">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-xl font-semibold text-slate-100">
							Runs
						</h1>
						<p className="mt-2 text-sm text-slate-300">
							Click 'More Info' next to a run to register
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<button
							type="button"
							className="block rounded-md bg-indigo-500 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Add Run
						</button>
					</div>
				</div>
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
											<span className="sr-only">
												Edit
											</span>
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-400 bg-slate-800">
									{runs.map((run) => (
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
														`${
															30 -
															run.players.length
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
														navigate(
															`/run/${run._id}`
														)
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
			</div>
		)
	)
}
export default Home

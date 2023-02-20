import Card from "../components/Card"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {

	const [runs, setRuns] = useState([])

	useEffect(() => {
		getRuns()
	}, [])

	const getRuns = async () => {
		const res = await axios.get("/api/runs")
		setRuns(res.data)
	}

	const runsArray = runs.map((run) => (
		<Card {...run} key={run._id}/>
  ))

	return (
    <div>
      {runsArray}
    </div>
  )
}

export default Home

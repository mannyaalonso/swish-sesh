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

	return <div>RunDetails</div>
}
export default RunDetails

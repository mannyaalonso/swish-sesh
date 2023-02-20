import Card from "../components/Card"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {

  const [runs, setRuns] = useState([])
  
  useEffect(() => {
    setRuns()
  },[])

  const getRuns = async () => {
    //get all runs
    const res = axios.get("")

  }

  return (
    <div>
      
    </div>
  )
}

export default Home

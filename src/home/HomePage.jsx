import React, { useState } from "react"
import Homes from "../components/homes/Homes"
import { Box } from "@material-ui/core"


const data = [
  {}
]

const HomePage = () => {
  const [items, setItems] = useState()
  const [item, setItem] = useState(data)
  const [rec, setRec] = useState(null)
  return ( 
    <>
      <Homes />
    </>
  )
}

export default HomePage

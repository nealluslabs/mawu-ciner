import React, { useState } from "react"
import "./home.css"
import { homeData } from "../../utils/dummyData"
import Home from "./Home"

const Homes = () => {
  const [items, setItems] = useState(homeData)

  return (
    <>
      <section className='home'>
        <Home items={items} />
        <div style={{ height: '25%', width: '100%', backgroundColor: 'black', position: 'relative', bottom: '20px' }}>
        </div><br/><br/>
        
      </section>
      
      <div className='mragin'></div>
    </>
  )
}


export default Homes

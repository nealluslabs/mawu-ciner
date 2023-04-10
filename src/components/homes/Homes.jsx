import React, { useState } from "react"
import "./home.css"
import Home from "./Home"
import { homeData } from "../../pages/data"

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

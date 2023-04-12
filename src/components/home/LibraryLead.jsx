import React, { useState } from "react"
import "./home.css"
import { LibraryData } from "../../utils/dummyLibrary"
import Home from "./Home"

const LibraryLead = () => {
  const [items, setItems] = useState(LibraryData)

  return (
    <>
      <section className='home' >
        <Home items={items} />
        {/*<div style={{ height: '25%', width: '100%', backgroundColor: 'black', position: 'relative', bottom: '20px'}}>
        </div><br/><br/>*/}
        
      </section>
      
     
    </>
  )
}


export default LibraryLead

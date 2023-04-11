import React from "react"
import { Link } from "react-router-dom"

const HomeCard = ({ item: { cover, name, desc} }) => {
  return (
    <>
      <div className='box'>
        <div className='coverImage'>
          <img src={cover} alt='' />
        </div>
        <div className='content flex'>
          <div className='details row'>
            <h1 style={{color: 'white'}}>{name}</h1>
            <p>{desc}</p>
            <button className='primary-btn' style={{backgroundColor: '#FF7D05'}}>
              <i className='fas fa-play'></i> PLAY
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className='primary-btn' style={{background: 'transparent', border: '1px solid white'}}>
              <i className='fas fa-play'></i> TRAILER
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeCard

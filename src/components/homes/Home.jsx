import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import HomeCard from "./HomeCard"

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn'>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn'>

    </div>
  )
}
const Home = ({ items }) => {
  return (
    <>
      <div className='homeContainer'>
          {items.map((item) => {
            return (
              <>
                <HomeCard key={item.id} item={item} />
              </>
            )
          })}
      </div>
    </>
  )
}

export default Home

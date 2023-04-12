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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    <>
      <div className='homeContainer' >
        {/*<Slider {...settings}>*/}
          {items.map((item) => {
            return (
              <>
                <HomeCard key={item.id} item={item} />
              </>
            )
          })}
       {/* </Slider>*/}
      </div>
    </>
  )
}

export default Home

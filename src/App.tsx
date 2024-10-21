import { Button, Container } from "@mui/material"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'swiper/css';
import 'swiper/css/pagination';
import { useState } from "react";

const data = [
  {
    title: "Weather Section",
    image: "/images/weather.jpg",
    description: ""
  },
  {
    title: "CryptoCurrency Section",
    image: "/images/crypto.jpg",
    description: ""
  },
  {
    title: "Covid-19 Section",
    image: "images/covid.jpg",
    description: ""
  }
  
  
]

function App() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);


  return (
    <main className="bg-black">
      <Container maxWidth={false} className="p-2 flex items-center justify-center h-screen">
        <ArrowBackIosIcon className="text-white" style={{ fontSize: "2rem" }} onClick={() => swiperInstance?.slidePrev()} />
        <Swiper
          className="drop-shadow-lg"
          modules={[Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => setSwiperInstance(swiper)} 
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500,  disableOnInteraction: false }}
          loop
        >
          {
            data.map((project, idx) => (
              <SwiperSlide key={idx} className="bg-cover h-[40rem] w-full p-2 bg-center" style={{ backgroundImage: `url(${project.image})`}}>
                <div className="text-5xl p-5 font-bold text-slate-50 drop-shadow-md ">
                  {project.title}
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <ArrowForwardIosIcon className="text-white" style={{ fontSize: "2rem" }} onClick={() => swiperInstance?.slideNext()} />
      </Container>
    </main>
  )
}

export default App

import { useState } from "react";
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Home.module.scss'
import Button from "../../components/Button/Button";

const data = [
  {
    title: "Weather Section",
    image: "/images/weather.jpg",
    description: "Stay informed about the latest weather updates in your area and beyond. This section provides real-time weather forecasts, temperature trends, and severe weather alerts to help you plan your day effectively. Whether you're looking for sunny skies or storm warnings, we've got you covered."
  },
  {
    title: "CryptoCurrency Section",
    image: "/images/crypto.jpg",
    description: "Dive into the dynamic world of cryptocurrencies with up-to-date market trends, price changes, and insightful analysis. This section covers everything from Bitcoin to altcoins, helping you make informed investment decisions. Stay ahead of the curve with our comprehensive resources and expert tips."
  },
  {
    title: "Covid-19 Section",
    image: "/images/covid.jpg",
    description: "Access essential information on the ongoing Covid-19 pandemic, including case statistics, vaccination rates, and health guidelines. This section aims to keep you informed with the latest developments and resources to help you stay safe and healthy. Stay updated on travel restrictions and public health measures affecting your community."
  }
];


const Home = () => {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <MdArrowBackIos className={styles.arrows} onClick={() => swiperInstance?.slidePrev()} />
        <Swiper
          className={styles.slider}
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
              <SwiperSlide key={idx} className={styles.slide} style={{ backgroundImage: `url(${project.image})`}}>
              <div className={styles.content}>
                  <div className={styles.title}>
                    {project.title}
                  </div>
                  <p className={styles.description}>{project.description}</p>
                  <div className={styles.button}>
                    <Button text={"View Section"} style="Contained" />
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <MdArrowForwardIos className={styles.arrows} onClick={() => swiperInstance?.slideNext()} />
      </div>
  </main>
  )
}

export default Home
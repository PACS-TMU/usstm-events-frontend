"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './globals.css';

export default function Home() {
  const [eventData, setEventData] = useState({ message: [] });

  useEffect(() => {
    try {
      fetch('https://backend-events.usstm.ca/get-all')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setEventData(data);
        });
    } catch (error) {
      console.error('Error fetching past-boards data:', error);
    }
    const intervalId = setInterval(() => {
      try {
        fetch('https://backend-events.usstm.ca/get-all')
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setEventData(data);
          });
      } catch (error) {
        console.error('Error fetching past-boards data:', error);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const events = eventData.message;
  events.sort((a, b) => (a.date > b.date) ? 1 : -1);

  return (
    <section id="homepage">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        navigation={true}
        slidesPerView={1}
        className='className="w-full h-screen text-center text-lg flex justify-center items-center"'
      >
        <SwiperSlide>
          <div className='flex flex-col w-full h-full justify-center items-center'>
            <Image
              src={`/images/cover.jpg`}
              alt="Cover/Title"
              width={1920}
              height={1080}
              className='w-full h-auto lg:w-auto lg:h-full'
              priority="true"
            />
          </div>
        </SwiperSlide>
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className='flex flex-col w-full h-full justify-center items-center'>
              <Image
                src={`/images/${event.imageName}`}
                alt={event.title}
                width={500}
                height={500}
                className='w-full h-auto lg:w-auto lg:h-full'
                priority="true"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {(eventData.message == []) && <p>No event data is available, please check back another time.</p>}
    </section>
  )
}

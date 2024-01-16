"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [eventData, setEventData] = useState({ message: [] });

  useEffect(() => {
    const fetchData = async () => {
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
    }
    fetchData();
  }, []);

  return (
    <section id="homepage">
      {eventData.message.map((event, index) => (
        <div key={index}>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <p>{event.location}</p>
          {console.log(event.imageName)}
          <Image
            src={`/images/${event.imageName}`}
            alt={event.title}
            width={500}
            height={500}
          />
          <p>{event.time}</p>
        </div>
      ))}
      {(eventData.message == []) && <p>No event data is available, please check back another time.</p>}
    </section>
  )
}

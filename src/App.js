import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [eventCount, setEventCount] = useState(32);
  const [currentCity, setCurrentCity] = useState('all');


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchEvents = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, eventCount));
  };

  useEffect(() => {
    fetchEvents();
  }, [eventCount, fetchEvents]);

  return (
      <div>
        <CitySearch setCurrentCity={setCurrentCity} />
        <NumberOfEvents setEventCount={setEventCount} />
        <EventList events={events} />
      </div>
  );
};

export default App;

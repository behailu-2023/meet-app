import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState('See all cities');
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState ([]);


  useEffect(() => {
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  };
  fetchData();
}, [currentCity, currentNOE]);

  return (
      <div className='App'>
        <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        <NumberOfEvents currentNOE= {currentNOE} setCurrentNOE={setCurrentNOE} />
        <EventList events={events} />
      </div>
  );
};

export default App;

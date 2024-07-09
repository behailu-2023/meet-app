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
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allEvents = await getEvents();
        if (allEvents && Array.isArray(allEvents)) {
          const filteredEvents = currentCity === "See all cities" ?
            allEvents :
            allEvents.filter(event => event.location === currentCity);
          
          console.log('allEvents:', allEvents);
          console.log('filteredEvents:', filteredEvents);
          console.log('currentNOE:', currentNOE);
          
          setEvents((filteredEvents || []).slice(0, currentNOE));
          setAllLocations(extractLocations(allEvents));
        } else {
          console.error('No events returned from getEvents or not an array');
          setEvents([]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };
    fetchData();
  }, [currentCity, currentNOE]);

  return (
    <div className='App'>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
};

export default App;

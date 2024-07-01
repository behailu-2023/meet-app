import { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2 className="summary">{event.summary}</h2>
      <p className="start-time">{new Date(event.created).toLocaleString()}</p>
      <p className="location">{event.location}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <div className="details">{event.description}</div>}
    </li>
  );
}

export default Event;

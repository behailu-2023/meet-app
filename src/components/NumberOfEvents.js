import React, { useState } from 'react';

const NumberOfEvents = ({ setEventCount }) => {
  const [inputValue, setInputValue] = useState(32);

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setInputValue(value);
    setEventCount(value);
  };

  return (
    <div>
      <label htmlFor="number-of-events">Number of Events: </label>
      <input
        id="number-of-events"
        name="number-of-events"
        type="number"
        className="number-of-events"
        role="spinbutton"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;

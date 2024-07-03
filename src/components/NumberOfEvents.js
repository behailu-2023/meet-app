import React, { useState } from 'react';

const NumberOfEvents = ({ currentNOE, setCurrentNOE }) => {
  const [inputValue, setInputValue] = useState(32);

  const handleInputChanged = (event) => {
    const numberValue = parseInt(event.target.value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setInputValue(numberValue);
      setCurrentNOE(numberValue);
    } else {
      setInputValue(''); // Set to empty string if invalid
    }
  };

  return (
    <div>
      <label htmlFor="number-of-events">Number of Events: </label>
      <input
        type="number"
        className="number-of-events"
        id="number-of-events"
        //name="number-of-events"
        role="spinbutton"
        value={inputValue}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

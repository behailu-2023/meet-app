import React, { useState, useEffect } from 'react';

const NumberOfEvents = ({ currentNOE=32, setCurrentNOE, setErrorAlert }) => {
  const [inputValue, setInputValue] = useState(currentNOE);

  const handleInputChanged = (event) => {
    const numberValue = parseInt(event.target.value, 10);
    if (!isNaN(numberValue) && numberValue > 0) {
      setInputValue(numberValue);
      setCurrentNOE(numberValue);
    } else {
      setInputValue(''); // Set to empty string if invalid
    }
    let numberText;
    if (isNaN(event.target.value) || event.target.value <= 0) {
        numberText = "Only positive numbers are allowed"
    }

    else {
        numberText = ""
    }
    setErrorAlert(numberText);
  };

  useEffect(() => {
    setInputValue(currentNOE);
  }, [currentNOE]);

  return (
    <div>
      <label htmlFor="number-of-events">Number of Events: </label>
      <input
        type="number"
        className="number-of-events"
        id="number-of-events"
        name="number-of-events"
        role="spinbutton"
        value={inputValue}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;

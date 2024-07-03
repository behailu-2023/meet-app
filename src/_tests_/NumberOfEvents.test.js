import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  test('renders the input element correctly', () => {
    render(<NumberOfEvents setEventCount={() => {}} />);
    const inputElement = screen.getByRole('spinbutton', { name: /number of events/i });
    expect(inputElement).toBeInTheDocument();
  });

  test('default value of the input field is 32', () => {
    render(<NumberOfEvents setEventCount={() => {}} />);
    const inputElement = screen.getByRole('spinbutton', { name: /number of events/i });
    expect(inputElement).toHaveValue(32);
  });

  test('update numberOfEvents when user types', () => {
    const setCurrentNOEMock = jest.fn();
    render(<NumberOfEvents setCurrentNOE={setCurrentNOEMock} />);
    
    const input = screen.getByRole('spinbutton');
  fireEvent.change(input, { target: { value: '10' } });
  
  expect(setCurrentNOEMock).toHaveBeenCalledWith(10);
});

    // Clear the input field first
    //await userEvent.clear(numberOfEvents);

    // Type '10' into the input field
    //await userEvent.type(numberOfEvents, '10');

    // Verify that the input field now has the value '10'
    //expect(numberOfEvents).toHaveValue(10);

    // Verify that setEventCount is called correctly
    //expect(setEventCountMock).toHaveBeenCalledWith(10);});
});

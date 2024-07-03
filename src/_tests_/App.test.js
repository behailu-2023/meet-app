import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

describe('<App /> component', () => {
  test('renders list of events', () => {
    render(<App />);
    const eventList = screen.getByRole('list');
    expect(eventList).toBeInTheDocument();
  });
  
  test('renders CitySearch component', () => {
    render(<App />);
    const citySearch = screen.getByPlaceholderText('Search for a city');
    expect(citySearch).toBeInTheDocument();
  });

  test('renders NumberOfEvents component', () => {
    render(<App />);
    const numberOfEvents = screen.getByRole('spinbutton', { name: /number of events/i });
    expect(numberOfEvents).toBeInTheDocument();
  });

  test('changes the number of events displayed when user types in the input', async () => {
    const user = userEvent.setup();
    render(<App />);
    const numberInput = screen.getByRole('spinbutton', { name: /number of events/i });

    await user.clear(numberInput);
    await user.type(numberInput, '10');

    expect(numberInput).toHaveValue(10);
  });


describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    render(<App />);

    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    await user.type(cityTextBox, "Berlin");

    const berlinSuggestionItem = screen.getAllByText('Berlin, Germany')[0];
    await user.click(berlinSuggestionItem);

    const eventListItems = await screen.findAllByRole('listitem');

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(event => event.location === 'Berlin, Germany');

    expect(eventListItems.length).toBe(berlinEvents.length);
    eventListItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});
});

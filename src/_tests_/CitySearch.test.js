import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';


describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    render(<CitySearch allLocations={[]} />);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={[]} />);
    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    await user.click(cityTextBox);
    const suggestionList = screen.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} />);

    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    });

    const suggestionListItems = screen.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // +1 for 'See all cities'
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} />);

    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion = screen.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    render(<App />);

    const cityTextBox = screen.getByPlaceholderText('Search for a city');
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    const suggestionListItems = screen.getAllByRole('listitem');
    expect(suggestionListItems.length).toBe( 35 );
  });
});

import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

  test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {

    given('the user had not provided a number of events to be displayed', () => {});

    let AppComponent;
    when('they open the app', () => {
      AppComponent = render(<App />);
    });

    then('a list of 32 events will be rendered by default', async () => {
      await waitFor(() => {
        const EventListItems = screen.queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test('User can change the number of events displayed.', ({ given, when, then }) => {

    let AppComponent;
    given('the app had rendered the default list of events', async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        const EventListItems = screen.queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      });
    });

    let numberOfEventsInput;
    when('the user updates the number of events to display', async () => {
      const user = userEvent.setup();
      numberOfEventsInput = screen.getByRole('spinbutton', { name: /number of events/i });
      await user.clear(numberOfEventsInput);
      await user.type(numberOfEventsInput, '10');
    });

    then('the app will render the number of events matching the user input', async () => {
      await waitFor(() => {
        const eventList = screen.queryAllByRole('listitem');
        expect(eventList.length).toEqual(10);
      });
    });
  });

});

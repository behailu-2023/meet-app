import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default.', ({ given, when, then }) => {

    let AppComponent;
    given('the user has opened the app', () => {
      AppComponent = render(<App />);
    });

    when('the default list of events render', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      })
    });

    then('the event details will be collapsed by default', () => {
      const EventDOM = AppComponent.container.firstChild;
      const eventDetails = EventDOM.querySelector('.details');
      expect(eventDetails).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details.', ({ given, when, then }) => {

    let AppComponent;
    given('the event details were collapsed after the app rendered', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();
      });
    });

    when('the user clicks on the show details button', async () => {
      const user = userEvent.setup();
      const button = AppComponent.queryAllByText('Show Details')[0];
      await user.click(button);
    });

    then('the event details will be displayed', () => {
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details.', ({ given, when, then }) => {

    let AppComponent;
    given('the event details were displayed', async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = within(AppDOM).queryAllByRole('listitem');
        expect(eventList[0]).toBeTruthy();

      });
    });

    when('the user clicks on the hide details button', async () => {
      const user = userEvent.setup();
      const button = AppComponent.queryAllByText('Show Details')[0];
      await user.click(button);

      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).toBeInTheDocument();
    });

    then('the event details will collapse', async () => {
      const user = userEvent.setup();
      const button = AppComponent.queryAllByText('Hide Details')[0];
      await user.click(button);
      const EventDOM = AppComponent.container.firstChild;
      const details = EventDOM.querySelector('.details');
      expect(details).not.toBeInTheDocument();
    });

  });

});
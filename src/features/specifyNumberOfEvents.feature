Feature: Specify number of events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given the user had not provided a number of events to be displayed
    When they open the app
    Then a list of 32 events will be rendered by default

  Scenario: User can change the number of events displayed.
    Given the app had rendered the default list of events
    When the user updates the number of events to display
    Then the app will render the number of events matching the user input
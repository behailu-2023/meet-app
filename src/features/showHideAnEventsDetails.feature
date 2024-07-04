Feature: Show/hide event details
  Scenario: An event element is collapsed by default.
    Given the user has opened the app
    When the default list of events render
    Then the event details will be collapsed by default

  Scenario: User can expand an event to see details.
    Given the event details were collapsed after the app rendered
    When the user clicks on the show details button
    Then the event details will be displayed

  Scenario: User can collapse an event to hide details.
    Given the event details were displayed
    When the user clicks on the hide details button
    Then the event details will collapse
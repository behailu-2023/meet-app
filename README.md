Meet App

To build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

Project Features & Scenarios 

Feature 1: Filter Events By City

  Scenario: When user hasn’t searched for a city, show upcoming events from all cities
    Given the user is on the events page
    When the user hasn’t searched for a city
    Then the user should see upcoming events from all cities

  Scenario: User should see a list of suggestions when they search for a city
    Given the user is on the events page
    When the user start typing a city name in the search bar
    Then the user should see a list of city suggestions

  Scenario: User can select a city from the suggested list
    Given the user is on the events page and has started typing a city name in the search bar
    When the user see a list of city suggestions
    Then the user can select a city from the suggested list and the user should see upcoming events for the selected city
    
Feature 2.Show/Hide Event Details.

User Story 1:As a user, I should be able to see event elements collapsed by default, so that I can view a concise list of events without overwhelming details.
User Story 2:As a user, I should be able to expand an event to see details, so that I can get more information about a specific event when needed.
User Story 3:As a user, I should be able to collapse an event to hide details, so that I can minimize the event information and view the list more easily.

Scenario 1: An event element is collapsed by default                                                                 		Given the user is viewing the events page
    	When the user open the app
    	Then the user should see the event elements collapsed by default

  Scenario 2: User can expand an event to see details
    	Given the user is on the events page
    	When the user click on an event element
    	Then the user should see the event details expanded

  Scenario 3: User can collapse an event to hide details
    	Given the user has expanded an event element on the events page
    	When the user click on the event element again
    	Then the user should see the event details collapsed

Feature 3.Specify Number of Events.

User Story 1:As a user, I should be able to see 32 events displayed by default when I haven't specified a number, so that I can have a reasonable number of events to browse initially.
 User Story 2:As a user, I should be able to change the number of events displayed, so that I can customize my event browsing experience according to my preference.

Scenario 1: When user hasn’t specified a number, 32 events are shown by default
    	Given the user hasn't specified a number of events to display
    	When the user is on the events page
    	Then I should see 32 events displayed by default

  Scenario 2: User can change the number of events displayed
    	Given the user is on the events page
    	When the user specify the number of events to display as 20
    	Then the user should see 20 events displayed

 Feature 4.Use the App When Offline.
 
User Story 1: As a user, I should be able to see cached event data when there’s no internet connection, so that I can still access previously viewed event information offline.
User Story 2: As a user, I should see an error message when I change search settings (city, number of events) without an internet connection, so that I understand why new data cannot be fetched.

Scenario 1: Show cached data when there’s no internet connection
    	Given the user is offline
    	When the user open the app
    	Then the user should see cached event data

  Scenario: Show error when user changes search settings (city, number of events)
    	Given the user is offline
    	When the user change the search settings
    	Then the user should see an error message indicating no internet connection

 Feature 5.Add an App Shortcut to the Home Screen.

User Story: As a user, I should be able to install the meet app as a shortcut on my device home screen, so that I can quickly access the app without navigating through menus.

 Scenario: User can install the meet app as a shortcut on their device home screen
    	Given the user is on the app installation page
    	When the user click on "Add to Home Screen"
    	Then the user should see the meet app shortcut on my device home screen
 
 Feature 6.Display Charts Visualizing Event Details. 

User Story: As a user, I should be able to see a chart with the number of upcoming events in each city, so that I can visually understand the event distribution across different locations.

 Scenario: Show a chart with the number of upcoming events in each city
    	Given the user is on the event details page
    	When the user view the charts section
    	Then the user should see a chart showing the number of upcoming events in each city


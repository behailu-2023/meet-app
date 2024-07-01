import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Event from '../components/Event';
import mockData from '../mock-data';

describe('<Event /> component', () => {
  let event;

  beforeAll(() => {
    event = mockData[0]; 
  });

  test('renders event elements collapsed by default', () => {
    render(<Event event={event} />);

    expect(screen.getByText(event.summary)).toBeInTheDocument();
    expect(screen.getByText(new Date(event.created).toLocaleString())).toBeInTheDocument();
    expect(screen.getByText(event.location)).toBeInTheDocument();
    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText(event.description)).not.toBeInTheDocument();
  });

  test('expands event details when "Show Details" button is clicked', () => {
    render(<Event event={event} />);
    const button = screen.getByText('Show Details');

    fireEvent.click(button);

    expect(screen.getByText('Hide Details')).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && content.startsWith('Have you wondered how you can ask Google');
    })).toBeInTheDocument();
  });

  test('collapses event details when "Hide Details" button is clicked', () => {
    render(<Event event={event} />);
    const button = screen.getByText('Show Details');

    // First, expand the details
    fireEvent.click(button);

    // Then, collapse the details
    fireEvent.click(button);

    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText('Hide Details')).not.toBeInTheDocument();
    expect(screen.queryByText((content, element) => {
      return element.tagName.toLowerCase() === 'div' && content.startsWith('Have you wondered how you can ask Google');
    })).not.toBeInTheDocument();
  });
});

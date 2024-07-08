import mockData from './mock-data';

/**
 * Extract locations from events and remove duplicates
 * @param {Array} events - Array of event objects
 * @returns {Array} - Array of unique locations
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

/**
 * Check the validity of the token
 * @param {string} accessToken - The access token to check
 * @returns {Object} - Result of token validation
 */
const checkToken = async (accessToken) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`);
  return response.json();
};

/**
 * Get the access token from local storage or fetch a new one
 * @returns {string} - The access token
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && await checkToken(accessToken);

  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem('access_token');
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      const response = await fetch("https://6bum41ul3i.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url");
      const result = await response.json();
      window.location.href = result.authUrl;
      return;
    } else {
      const encodeCode = encodeURIComponent(code);
      const response = await fetch(`https://6bum41ul3i.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`);
      const { access_token } = await response.json();
      if (access_token) localStorage.setItem("access_token", access_token);
      return access_token;
    }
  }

  return accessToken;
};

/**
 * Remove query parameters from the URL
 */
const removeQuery = () => {
  const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState("", "", newurl);
};

/**
 * Fetch the list of all events
 * @returns {Array} - Array of events
 */
export const getEvents = async () => {
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  const token = await getAccessToken();
  if (token) {
    removeQuery();
    const url = `https://6bum41ul3i.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result.events || [];
    } catch (error) {
      console.error("Failed to fetch events:", error);
      return [];
    }
  }

  return [];
};

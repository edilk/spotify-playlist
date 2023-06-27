import axios from 'axios';
import { getHashParams } from '../utils';

const EXPIRATION_TIME = 3600 * 1000;

const setTokenTimestamp = () => window.localStorage.setItem('token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('refresh_token');

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('token_timestamp');
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.location.reload();
};


const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json'
};


export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getFollowing = () =>
  axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });


export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });

export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const search = (searchString, all, artists, songs, albums) => {
  let queryString = `q=${searchString}`;
  if (all) {
    queryString += '&type=track%2Calbum%2Cartist';
  } else if (artists) {
    queryString += '&type=artist'
  } else if (songs) {
    queryString += '&type=track';
  } else if (albums) {
    queryString += '&type=album';
  }

  return axios.get(`https://api.spotify.com/v1/search?${queryString}`, { headers })
}
import axios, { AxiosResponse } from "axios";
import { PlaylistObject } from "./types/PlaylistObject";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

const LOCALSTORAGE_VALUES = {
  accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
  refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
  expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
  timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};

/**
 * Clear localStorage and navigate to homepage
 *
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  window.localStorage.removeItem(LOCALSTORAGE_KEYS["accessToken"]);
  window.localStorage.removeItem(LOCALSTORAGE_KEYS["refreshToken"]);
  window.localStorage.removeItem(LOCALSTORAGE_KEYS["expireTime"]);
  window.localStorage.removeItem(LOCALSTORAGE_KEYS["timestamp"]);

  // Navigate to homepage
  window.location.href = window.location.origin;
};

/**
 * Checks if token has expired
 *
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
  if (!accessToken || !timestamp) {
    return false;
  }

  const timePassed = Date.now() - Number(timestamp); // in milliseconds
  return timePassed / 1000 > Number(expireTime);
};

/**
 * User refresh token to get new access token and store it in localStorage
 * @returns {void}
 */
const refreshToken = async (): Promise<void> => {
  try {
    // If there is no refresh token, logout
    if (
      !LOCALSTORAGE_VALUES.refreshToken ||
      LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
      Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
    ) {
      console.log("No refresh token available");
      logout();
    }

    // Use /refresh_token endpoint
    const { data } = await axios.get(
      `/refresh_token?refresh_token=${LOCALSTORAGE_VALUES.refreshToken}`
    );

    // update localStorage
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.accessToken,
      data.access_token
    );
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now().toString()
    );

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

const getAccessToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryParams = {
    [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token") || "",
    [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token") || "",
    [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in") || "",
  };

  const hasError = urlParams.get("error");

  // If there is an error or the token has expired, refresh the token
  if (
    hasError ||
    hasTokenExpired() ||
    LOCALSTORAGE_VALUES.accessToken === "undefined"
  ) {
    refreshToken();
  }

  // If there is a valid token, return it
  if (
    LOCALSTORAGE_VALUES.accessToken &&
    LOCALSTORAGE_VALUES.accessToken !== "undefined"
  ) {
    return LOCALSTORAGE_VALUES.accessToken;
  }

  // If there is  a token in the URL, user is logged in for the first time
  if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
    // Store the query params in localStorage
    for (const property in queryParams) {
      window.localStorage.setItem(property, queryParams[property]);
    }

    // Set timestamp
    window.localStorage.setItem(
      LOCALSTORAGE_KEYS.timestamp,
      Date.now().toString()
    );

    return queryParams[LOCALSTORAGE_KEYS.accessToken];
  }

  return false;
};

export const accessToken = getAccessToken();

axios.defaults.baseURL = "https://api.spotify.com/v1";
axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
axios.defaults.headers["Content-Type"] = "application/json";

/**
 * Get current user profile
 *
 * @returns {Promise}
 */
export const getCurrentUserProfile = (): Promise<any> => axios.get("/me");

/**
 * Get current user playlists
 *
 * @param {number} limit The number of playlists
 * @returns {Promise}
 */
export const getCurrentUserPlaylists = (limit: number = 20): Promise<any> => {
  return axios.get(`/me/playlists?limit=${limit}`);
};

/**
 * Get user's top artists
 *
 * @param {string} time_range 'long_term' (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks).
 * @returns {Promise}
 */
export const getTopArtists = (
  time_range: string = "short_term"
): Promise<any> => {
  return axios.get(`me/top/artists?time_range=${time_range}`);
};

/**
 * Get user's top tracks
 *
 * @param {number} time_range 'long_term' (calculated from several years of data and including all new data as it becomes available), medium_term (approximately last 6 months), short_term (approximately last 4 weeks).
 * @returns {Promise}
 */
export const getTopTracks = (
  time_range: string = "short_term"
): Promise<any> => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`);
};

/**
 * Get a playlist
 * @param {string} playlist_id The id of the playlist
 * @returns {Promise}
 */
export const getPlaylistById = (
  playlist_id: string
): Promise<AxiosResponse<PlaylistObject>> => {
  return axios.get<PlaylistObject>(`/playlists/${playlist_id}`);
};

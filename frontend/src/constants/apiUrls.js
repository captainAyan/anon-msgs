export const DOMAIN =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:3001"
    : "https://anon-msgs.herokuapp.com";

export const VERSION = "/v1";
export const BASE_URL = `${DOMAIN}/api${VERSION}`;

export const BASE_AUTH_URL = `${BASE_URL}/auth`;
export const REGISTER_URL = `${BASE_AUTH_URL}/register`;
export const LOGIN_URL = `${BASE_AUTH_URL}/login`;

export const BASE_MESSAGE_URL = `${BASE_URL}/message`;
export const SEND_MESSAGE_URL = `${BASE_MESSAGE_URL}/`;
export const GET_MESSAGE_URL = `${BASE_MESSAGE_URL}/`;
export const DELETE_MESSAGE_URL = `${BASE_MESSAGE_URL}/`;

export const BASE_PROFILE_URL = `${BASE_URL}/profile`;
export const GET_PROFILE_URL = `${BASE_PROFILE_URL}/`;
export const EDIT_PROFILE_URL = `${BASE_PROFILE_URL}/`;
export const DELETE_PROFILE_URL = `${BASE_PROFILE_URL}/`;

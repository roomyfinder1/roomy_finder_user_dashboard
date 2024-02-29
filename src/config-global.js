// routes
import { PATH_DASHBOARD } from './routes/paths';

// ----------------------------------------------------------------------

export const HOST_API_KEY =
  process.env.REACT_APP_HOST_API_KEY || 'https://roomy-finder-user-dashboard.vercel.app/';
export const SERVER_URL =
  process.env.REACT_APP_SERVER_URL || 'wss://roomy-finder-app.ap-1.evennode.com';

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

// export const MAP_API = process.env.REACT_APP_MAPBOX_API;
export const MAP_API = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// ROOT PATH AFTER LOGIN SUCCESSFUL

export const PATH_AFTER_USER_LOGIN = PATH_DASHBOARD.c_panel.user_profile;

// API URL
export const LOCAL_API_URL = 'http://localhost:3001/api/v1/admin';
// export const API_URL = 'http://localhost:3001/api/v1/admin';
// export const API_URL = 'https://gsccontrolpanelbackend.onrender.com/api/v1/admin';
export const API_URL = 'https://roomy-finder-dev-crm.onrender.com/api/v1/admin';
// export const API_URL = process.env.REACT_APP_BACKEND_URL;
// export const API_URL = process.env.REACT_APP_BACKEND_URL;

// CHAT
// export const CURRENT_USER_ID = '65ba3a79b8552982267c0321';
export const CURRENT_USER_ID = '65c9df955b5cba34b4c70256';

// firebase
export const FIREBASE_VAPID_KEY =
  'BO-3_Aq1CRnqPI0niMrqFo1SPUnl2qX9aUgwo1UWpeqLkZv9KloLGSHL6xxxY3_-qVh1KGusHtrh4Xs_gW2T7tc';

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

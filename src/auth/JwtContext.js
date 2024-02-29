import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';

// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, jwtDecode, setSession } from './utils';
import { API_URL } from '../config-global';

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isLoggingOut: false,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'ALL_USERS') {
    return {
      ...state,
      allUsers: action.payload.allUsers,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      isLoggingOut: false,
    };
  }
  if (action.type === 'LOGOUT_LOADING') {
    return {
      ...state,
      isLoggingOut: true,
    };
  }

  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      user: {
        ...state.user,
        chatEnabled: action.payload.chatEnabled,
      },
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const storageAvailable = localStorageAvailable();
  const token = localStorage.getItem('accessToken');

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      if (accessToken && isValidToken(accessToken)) {
        const jwtPayload = jwtDecode(accessToken);
        const response = await axios.get(`${API_URL}/c_panel/user_profile/${jwtPayload.userId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const { firstName, lastName, email, type, _id } = response.data.user;
        setSession(accessToken);
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user: {
              firstName,
              lastName,
              email,
              userId: _id,
              chatEnabled: null,
              photoURL:
                'https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg',
              displayName: `${firstName} ${lastName}`,
              role: type,
            },
          },
        });
      } else {
        setSession(null);
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize, token]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const { data } = await axios.post(`${API_URL}/c_panel/user_login`, {
      email,
      password,
    });
    setSession(data.token);
    const { firstName, lastName, type, _id, profilePicture } = data.user;

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          firstName,
          lastName,
          email,
          userId: _id,
          photoURL:
            profilePicture ||
            'https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_default.jpg',
          displayName: `${firstName} ${lastName}`,
          role: type,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post('/api/account/register', {
      email,
      password,
      firstName,
      lastName,
    });
    const { accessToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  // UPDATE USER
  const updateUser = useCallback(async ({ chatEnabled, fcmToken }) => {
    if (chatEnabled) {
      const { data } = await axios.post(`${API_URL}/message/add_admin_device`, {
        fcmToken,
        platform: 'WINDOWS',
        appVersion: '1.2.1',
        appBuildNumber: 1,
        deviceName: 'CRM',
        deviceId: '9C2EDC6D-D8E9-4140-A587-D770D770BD75',
        countryCode: 'AE',
        languageCode: 'en',
        currencyCode: 'AED',
      });

      if (data) {
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            chatEnabled,
          },
        });
      }
    } else {
      const { data } = await axios.delete(`${API_URL}/message/remove_admin_device`);
      if (data) {
        dispatch({
          type: 'UPDATE_USER',
          payload: {
            chatEnabled,
          },
        });
      }
    }
  }, []);
  // LOGOUT
  const logout = useCallback(
    async (email) => {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      const jwtPayload = jwtDecode(accessToken);
      if (jwtPayload.type === 'Landlord') {
        localStorage.removeItem('lastMessageSyncDate');
        localStorage.removeItem('messages');
        setSession(null);
        dispatch({
          type: 'LOGOUT',
        });
      } else {
        dispatch({
          type: 'LOGOUT_LOADING',
          value: true,
        });

        await axios.post(`${API_URL}/admin_logout`, {
          email,
        });
        localStorage.removeItem('lastMessageSyncDate');
        localStorage.removeItem('messages');
        setSession(null);

        dispatch({
          type: 'LOGOUT',
        });
      }
    },
    [storageAvailable]
  );

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      logout,
      updateUser,
      isLoggingOut: state.isLoggingOut,
    }),
    [
      state.isAuthenticated,
      state.isInitialized,
      state.user,
      login,
      logout,
      register,
      updateUser,
      state.isLoggingOut,
    ]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

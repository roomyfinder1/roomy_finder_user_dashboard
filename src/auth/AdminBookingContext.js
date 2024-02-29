import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios from '../utils/axios';
// import { AllUsers } from '../api/Users';
import localStorageAvailable from '../utils/localStorageAvailable';
import { API_URL } from '../config-global';
import {
  percentageChange,
  todayRegistered,
  yesterdayRegistered,
  weekData,
} from '../utils/todayRegistered';
import { isValidToken, setSession } from './utils';

const initialState = {
  allUsers: null,
  todayUsers: null,
  percentageChange: null,
  allLandlords: null,
  todayLandlords: null,
  landlordPercentage: null,
};

const reducer = (state, action) => {
  if (action.type === 'ALL_USERS') {
    return {
      ...state,
      allUsers: action.payload.allUsers,
      todayUsers: action.payload.todayUsers,
      usersPercentage: action.payload.usersPercentage,
      usersWeekData: action.payload.usersWeekData,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AdminBookingContext = createContext(null);

// ----------------------------------------------------------------------

AdminBookingProvider.propTypes = {
  children: PropTypes.node,
};

export function AdminBookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  const roommates = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/roommate//all-users-with-ads`);
      const allRoommates = response.data.reverse();
      const todayRoommates = todayRegistered(allRoommates);
      const yesterdayRoommates = yesterdayRegistered(allRoommates);
      const roommatePercentage = percentageChange(todayRoommates.length, yesterdayRoommates.length);
      const roommateWeekData = weekData(allRoommates);
      dispatch({
        type: 'ALL_ROOMMATES',
        payload: {
          allRoommates,
          todayRoommates,
          roommatePercentage,
          roommateWeekData,
        },
      });
      return {
        allRoommates,
        todayRoommates,
        roommatePercentage,
        roommateWeekData,
      };
    } catch (error) {
      console.log(error);
      return {};
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedValue = useMemo(
    () => ({
      allRoommates: state.allRoommates,
      todayRoommates: state.todayRoommates,
      roommatePercentage: state.roommatePercentage,
      roommateWeekData: state.roommateWeekData,
      roommates,
    }),
    [
      state.allRoommates,
      state.todayRoommates,
      state.roommatePercentage,
      state.roommateWeekData,
      roommates,
    ]
  );

  return (
    <AdminBookingContext.Provider value={memoizedValue}>{children}</AdminBookingContext.Provider>
  );
}

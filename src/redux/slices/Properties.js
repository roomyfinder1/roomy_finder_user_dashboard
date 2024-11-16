import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
// utils
import axiosInstance from '../../utils/axios';
import { API_URL } from '../../config-global';
// import axiosInstance from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  properties: [],
  propertyPosts: [],

  allPropertiesLoading: false,
  propertyPostsLoading: false,

  All_Properies_Date_Wise_count: [],
  dailyWiseAll_Properies_Date_Wise_count: [],
  weekWiseAll_Properies_Date_Wise_count: [],
  monthWiseAll_Properies_Date_Wise_count: [],
  yearWiseAll_Properies_Date_Wise_count: [],

  property: null,
  propertyLoading: false,

  yearlyData: {},
  yearlyDataLoading: false,
  monthlyData: {},
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state, action) {
      state.isLoading = action.payload;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAllPropertiesLoading(state, action) {
      state.allPropertiesLoading = action.payload;
    },

    getPropertiesSuccess(state, action) {
      const allProperties = action.payload;
      state.properties = allProperties;
    },

    getPropertyPostsSuccess(state, action) {
      const allPropertyPosts = action.payload;
      state.propertyPosts = allPropertyPosts;
    },

    setPropertyPostsLoading(state, action) {
      state.propertyPostsLoading = action.payload;
    },
    getProperties_Date_Wise_Success(state, action) {
      state.All_Properies_Date_Wise_count = action.payload.totalUserCount;
      state.dailyWiseAll_Properies_Date_Wise_count = action.payload.DayCount;
      state.weekWiseAll_Properies_Date_Wise_count = action.payload.weekCount;
      state.monthWiseAll_Properies_Date_Wise_count = action.payload.monthCount;
      state.yearWiseAll_Properies_Date_Wise_count = action.payload.yearCount;
    },

    getHistogramSuccess(state, action) {
      state.yearlyData = action.payload;
    },
    yearlyDataLoading(state, action) {
      state.yearlyDataLoading = action.payload;
    },
    getAccountsHistogram(state, action) {
      state.monthlyData = action.payload;
    },
    getPropertyDetailsSuccess(state, action) {
      state.property = action.payload;
    },
    setPropertyLoading(state, action) {
      state.propertyLoading = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getBookingsSuccess } = slice.actions;

// ----------------------------------------------------------------------

export function getProperties() {
  return async (dispatch) => {
    dispatch(slice.actions.setAllPropertiesLoading(true));
    try {
      const response = await axiosInstance.get(`${API_URL}/property/all-properties`);
      dispatch(slice.actions.getPropertiesSuccess(response.data));
      dispatch(slice.actions.setAllPropertiesLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPropertyPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.setPropertyPostsLoading(true));
    try {
      const response = await axiosInstance.get(`${API_URL}/property/all_property_posts`);
      dispatch(slice.actions.getPropertyPostsSuccess(response.data));
      dispatch(slice.actions.setPropertyPostsLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function filterByType(properties, type) {
  return properties.filter((property) => property.isPremium === type);
}

export function deleteProperty(id) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const { properties } = state;

      const answerData = properties.filter((prop) => prop.id !== id);

      dispatch(slice.actions.getPropertiesSuccess(answerData));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

function initializeMonthData() {
  return { landlord: 0, property: 0, roommates: 0, tenants: 0, maintainers: 0 };
}

export function sortData(data) {
  return data.slice().sort((a, b) => {
    const dateA = moment(a.date, 'DD-MM-YYYY');
    const dateB = moment(b.date, 'DD-MM-YYYY');

    if (dateA.isBefore(dateB)) {
      return 1;
    }
    if (dateA.isAfter(dateB)) {
      return -1;
    }
    return 0;
  });
}

export function groupedByMonth(data) {
  const monthsData = data.reduce((acc, landlord) => {
    const month = moment(landlord.date, 'DD-MM-YYYY').format('MMMM YYYY');
    if (!acc[month]) {
      acc[month] = {
        landlordCount: 0,
        propertyCount: 0,
        maintainersCount: 0,
        tenantsCount: 0,
        roommatesCount: 0,
        haveRoomCount: 0,
        needRoomCount: 0,
        landlords: [],
      };
    }
    acc[month].landlordCount += landlord.counts.landlords;
    acc[month].propertyCount += landlord.counts.properties;
    acc[month].maintainersCount += landlord.counts.maintainers;
    acc[month].tenantsCount += landlord.counts.tenants;
    acc[month].roommatesCount += landlord.counts.roommates;
    acc[month].haveRoomCount += landlord.counts.haveRoomAds;
    acc[month].needRoomCount += landlord.counts.needRoomAds;
    acc[month].landlords.push(landlord);
    return acc;
  }, {});

  return monthsData;
}

export function monthlyData(dispatch, histogram) {
  const sortedData = sortData(histogram);

  const monthsData = groupedByMonth(sortedData);

  dispatch(slice.actions.getAccountsHistogram(monthsData));
}

export function getHistogram() {
  return async (dispatch) => {
    dispatch(slice.actions.yearlyDataLoading(true));
    try {
      const { data } = await axiosInstance.get(`${API_URL}/landlord/get-landlord-histogram`);

      const yearlyData = {};

      monthlyData(dispatch, data);

      data.forEach((user, index) => {
        const year = moment(user.date, 'DD-MM-YYYY').format('YYYY');
        const month = moment(user.date, 'DD-MM-YYYY').format('MM');

        if (!yearlyData[year]) {
          yearlyData[year] = {};
          for (let i = 1; i <= 12; i += 1) {
            const monthKey = i < 10 ? `0${i}` : `${i}`;
            yearlyData[year][monthKey] = initializeMonthData();
          }
        }
        yearlyData[year][month].landlord += user.counts.landlords;
        yearlyData[year][month].property += user.counts.properties;
        yearlyData[year][month].maintainers += user.counts.maintainers;
        yearlyData[year][month].roommates += user.counts.roommates;
        yearlyData[year][month].tenants += user.counts.tenants;
      });

      dispatch(slice.actions.getHistogramSuccess(yearlyData));
      dispatch(slice.actions.yearlyDataLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAll_Property_Date_Wise() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading(true));
    try {
      const response = await axiosInstance.get(`${API_URL}/property/all-property-date-wise`);
      dispatch(slice.actions.getProperties_Date_Wise_Success(response.data));
      dispatch(slice.actions.startLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPropertyDetails(propertyId) {
  return async (dispatch) => {
    dispatch(slice.actions.setPropertyLoading(true));
    try {
      const { data } = await axiosInstance.get(
        `${API_URL}/property/property_details/${propertyId}`
      );
      dispatch(slice.actions.getPropertyDetailsSuccess(data));
      dispatch(slice.actions.setPropertyLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

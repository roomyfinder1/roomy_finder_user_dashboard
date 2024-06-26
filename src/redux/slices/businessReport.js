import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { API_URL } from '../../config-global';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  error: null,
  tenantBusinessReport: {},
  tenantAreaBusinessReport: {},
  competitorBusinessReport: {},
  membershipsLoading: false,
};

const slice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Tenant Business report
    getTenantBusinessDataSuccess(state, action) {
      state.isLoading = false;
      state.tenantBusinessReport = action.payload;
    },

    // GET Tenant AREA Business report
    getTenantAreaBusinessDataSuccess(state, action) {
      state.isLoading = false;
      state.tenantAreaBusinessReport = action.payload;
    },

    // GET Competitor business report
    getCompetitorBusinessDataSuccess(state, action) {
      state.isLoading = false;
      state.competitorBusinessReport = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTenantBusinessData(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/tenant_business_report/${userId}`);
      dispatch(slice.actions.getTenantBusinessDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getTenantAreaBusinessData(userId, area) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${API_URL}/c_panel/tenant_area_business_report/${userId}/${area}`
      );
      dispatch(slice.actions.getTenantAreaBusinessDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCompetitorBusinessData(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/competitor_business_report/${userId}`);
      dispatch(slice.actions.getCompetitorBusinessDataSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMails(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mails', { params });
      dispatch(slice.actions.getMailsSuccess(response.data.mails));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMail(mailId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId },
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { API_URL } from '../../config-global';

const initialState = {
  isLoading: false,
  error: null,

  userMemberships: [],
  userTenantChat: [],
  userMaintenances: [],
  userPurchases: [],
  userProperties: [],
  propertyDetails: null,
  unitBookings: [],
  userBookings: [],
  userPosts: [],
  userMembershipPosts: [],
  userNotifications: [],
  userRoomyPay: null,
  userRentPayments: null,
  userPaymentHistory: null,
  userCommissionFee: 50,
  userPost: {},

  userDetails: {},
  userLoading: false,
};

const slice = createSlice({
  name: 'user',
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

    // get user details
    getUserSuccess(state, action) {
      state.userDetails = action.payload;
    },
    setUserLoading(state, action) {
      state.userLoading = action.payload;
    },

    // GET USER MEMBERSHIPS
    getUserMembershipsSuccess(state, action) {
      state.isLoading = false;
      state.userMemberships = action.payload;
    },

    // GET USER TENANT CHAT
    getUserTenantChatSuccess(state, action) {
      state.isLoading = false;
      const tenantChatsData = action.payload;
      tenantChatsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      state.userTenantChat = action.payload;
    },

    // GET USER MAINTENANCES
    getUserMaintenancesSuccess(state, action) {
      state.isLoading = false;
      state.userMaintenances = action.payload;
    },

    // GET USER PURCHASES
    getUserPurchasesSuccess(state, action) {
      state.isLoading = false;
      state.userPurchases = action.payload;
    },

    // GET USER PROPERTIES
    getUserPropertiesSuccess(state, action) {
      state.isLoading = false;
      const data = action.payload;
      const properties = data.filter((d) => d.isDeleted);
      state.userProperties = properties;
    },

    // GET PROPERTY DETAILS
    getUserPropertyDetailsSuccess(state, action) {
      state.isLoading = false;
      state.propertyDetails = action.payload;
    },

    // GET UNIT BOOKINGS
    getUnitBookingsSuccess(state, action) {
      state.isLoading = false;
      state.unitBookings = action.payload;
    },

    // GET USER BOOKINGS
    getUserBookingsSuccess(state, action) {
      state.isLoading = false;
      state.userBookings = action.payload;
    },

    // GET USER POSTS
    getUserPostsSuccess(state, action) {
      state.isLoading = false;
      state.userPosts = action.payload;
    },

    // GET USER MEMBERSHIP POSTS
    getUserMembershipPostsSuccess(state, action) {
      state.isLoading = false;
      state.userMembershipPosts = action.payload;
    },

    // GET USER NOTIFICATIONS
    getUserNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.userNotifications = action.payload;
    },

    // UPDATE DELETE PROPERTY
    deleteUserPropertySuccess(state, action) {
      state.isLoading = false;
      const properties = state.userProperties.filter((item) => item._id !== action.payload);
      state.userProperties = properties;
    },

    // GET USER ROOMY PAY
    getUserRoomyPaySuccess(state, action) {
      state.isLoading = false;
      state.userRoomyPay = action.payload.roomyPay;
      state.userCommissionFee = action.payload.commission;
    },

    // GET USER RENT PAYMENTS
    getUserRentPaymentsSuccess(state, action) {
      state.isLoading = false;
      state.userRentPayments = action.payload;
    },

    // GET USER PAYMENT HISTORY
    getUserRentPaymentHistorySuccess(state, action) {
      state.isLoading = false;
      state.userPaymentHistory = action.payload;
    },

    // GET USER POST
    getUserPostSuccess(state, action) {
      state.isLoading = false;
      state.userPost = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { getAll_Roommate_Success } = slice.actions;

// ----------------------------------------------------------------------

export function getUser(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.setUserLoading(true));
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_profile/user`);
      dispatch(slice.actions.getUserSuccess(response.data));
      dispatch(slice.actions.setUserLoading(false));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserMemberships(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_memberships/user`);
      dispatch(slice.actions.getUserMembershipsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserTenantChat(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_tenant_chat/user`);
      dispatch(slice.actions.getUserTenantChatSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserMaintenances(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_maintenances/user`);
      dispatch(slice.actions.getUserMaintenancesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserPurchases(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_purchases/user`);
      dispatch(slice.actions.getUserPurchasesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserProperties(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_properties/user`);

      dispatch(slice.actions.getUserPropertiesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPropertyDetails(propertyId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/property_details/${propertyId}`);
      dispatch(slice.actions.getUserPropertyDetailsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUnitBookings(propertyId, unitCode) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        `${API_URL}/c_panel/unit_bookings/${propertyId}/${unitCode}`
      );
      dispatch(slice.actions.getUnitBookingsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserBookings() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_bookings/user`);
      dispatch(slice.actions.getUserBookingsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserPosts(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_posts/user`);
      dispatch(slice.actions.getUserPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserMembershipPosts(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_membership_posts/user`);
      dispatch(slice.actions.getUserMembershipPostsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserNotifications(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_notifications/user`);
      dispatch(slice.actions.getUserNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUserProperty(propertyId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/delete_user_property/${propertyId}`);
      if (response.data) {
        dispatch(slice.actions.deleteUserPropertySuccess(propertyId));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserRoomyPay(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_roomy_pay/user`);
      if (response.data) {
        dispatch(slice.actions.getUserRoomyPaySuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserRentPayments(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_rent_payments/user`);
      if (response.data) {
        const filteredData = response.data.filter(
          (val) => val?.objectId?.client && val?.objectId?.ad && val.objectId?.isPayed
        );
        dispatch(slice.actions.getUserRentPaymentsSuccess(filteredData));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserRentPaymentHistory(userId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/user_rent_payment_history/user`);
      if (response.data) {
        dispatch(slice.actions.getUserRentPaymentHistorySuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPostDetails(postId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${API_URL}/c_panel/get_user_post/${postId}`);
      if (response.data) {
        dispatch(slice.actions.getUserPostSuccess(response.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

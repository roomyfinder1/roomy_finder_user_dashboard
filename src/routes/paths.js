// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
export const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,

  coming_soon_page: path(ROOTS_DASHBOARD, '/coming_soon'),

  c_panel: {
    root: path(ROOTS_DASHBOARD, '/user'),
    user_profile: path(ROOTS_DASHBOARD, `/user_profile`), // it needs to pass userId as params

    user_memberships: path(ROOTS_DASHBOARD, `/user_memberships`), // it needs to pass userId as params
    user_memberships_details: path(ROOTS_DASHBOARD, `/user_membership_details`),
    user_properties: path(ROOTS_DASHBOARD, `/user_properties`), // it needs to pass userId as params
    edit_property: (propertyId) => path(ROOTS_DASHBOARD, `/edit_property/${propertyId}`), // it needs to pass userId as params
    user_view_property_details: (propertyId) =>
      path(ROOTS_DASHBOARD, `/user_view_property_details/${propertyId}`), // it needs to pass propertyId as params
    user_view_unit_details: path(ROOTS_DASHBOARD, `/user_view_unit_details`),
    user_tenant_chat: path(ROOTS_DASHBOARD, `/user_tenant_chat`), // it needs to pass userId as params
    user_posts: path(ROOTS_DASHBOARD, `/user_posts`), // it needs to pass userId as params
    view_post: (postId) => path(ROOTS_DASHBOARD, `/view_post/${postId}`),
    user_maintenances: path(ROOTS_DASHBOARD, `/user_maintenances`), // it needs to pass userId as params
    user_maintenance_details: path(ROOTS_DASHBOARD, `/user_maintenances_details`), // it needs to pass userId as params
    user_business_report: path(ROOTS_DASHBOARD, `/user_business_report`), // it needs to pass userId as params
    user_bookings: path(ROOTS_DASHBOARD, `/user_bookings`), // it needs to pass userId as params
    user_booking_history: path(ROOTS_DASHBOARD, `/user_booking_history`), // it needs to pass userId as params
    user_purchases: path(ROOTS_DASHBOARD, `/user_purchases`), // it needs to pass userId as params
    // user_rent_payments: path(ROOTS_DASHBOARD, `/user_rent_payment/${userId}`), // it needs to pass userId as params
    // user_roomy_pay: path(ROOTS_DASHBOARD, `/user_roomy_pay/${userId}`), // it needs to pass userId as params
    user_payments: (userId, type) => path(ROOTS_DASHBOARD, `/user_payments/${userId}/${type}`), // it needs to pass userId as params
    user_edit_profile: path(ROOTS_DASHBOARD, `/user_edit_profile`), // it needs to pass userId as params
    user_notifications: path(ROOTS_DASHBOARD, `/user_notifications`), // it needs to pass userId as params
    profile: path(ROOTS_DASHBOARD, `/profile`), // it needs to pass userId as params
    area_business_report: (area) => path(ROOTS_DASHBOARD, `/area_business_report/user/${area}`), // it needs to pass userId as params
    tenant_area_business_report: (userId, area) =>
      path(ROOTS_DASHBOARD, `/tenant_area_business_report/${userId}/${area}`), // it needs to pass userId as params
    compitator_area_business_report: (userId, area) =>
      path(ROOTS_DASHBOARD, `/compitator_area_business_report/${userId}/${area}`), // it needs to pass userId as params

    user_business_report_landlord: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_crm/${userId}`), // it needs to pass userId as params
    user_business_report_properties_monthly_income: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/properties_monthly_income/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_memberships: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_memberships/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_paid_to_roomy: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_paid_to_roomy/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_vat_fee_payment: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_vat_fee_payment/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_maintenance_payments: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_maintenance_payments/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_preferred_payment_method: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_preferred_payment_method/${userId}`), // it needs to pass userId as params

    user_business_report_landlord_chat_details: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_chat_details/${userId}`), // it needs to pass userId as params
    user_business_report_matched_tenants: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/matched_tenants/${userId}`), // it needs to pass userId as params
    user_business_report_landlord_preferences: (userId) =>
      path(ROOTS_DASHBOARD, `/user_business_report/landlord_preferences/${userId}`), // it needs to pass userId as params
  },
};

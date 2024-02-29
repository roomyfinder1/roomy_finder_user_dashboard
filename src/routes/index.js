/* eslint-disable no-nested-ternary */
import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_USER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,
  Page404,
  Page403,
  ComingSoonPage,

  // USER C-PANEL
  CPanelUserProfile,
  CPanelUserMembership,
  CPanelUserProperties,
  CPanelUserTenantChat,
  CPanelUserPosts,
  CPanelUserMaintenance,
  CPanelUserBusinessReport,
  CPanelUserBookings,
  CPanelUserPurchases,
  // CPanelUserRentPayment,
  // CPanelUserRoomyPay,
  CPanelUserEditProfile,
  CPanelUserNotifications,
  CPanelUserMembershipDetails,
  CPanelUserMaintenanceDetails,
  CPanelUserViewPropertyDetails,
  CPanelUserViewUnitDetails,
  CPanelUserBookingHistory,
  CPanelUserPayments,
  CPanelUserEditProperty,
  CPanelUserViewPost,
} from './elements';

// ----------------------------------------------------------------------

const onlyForLandlord = ['Landlord'];

export default function Router() {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          // need to add userId
          element: <Navigate to={PATH_AFTER_USER_LOGIN} replace />,
          index: true,
        },
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },

        {
          path: '403',
          element: (
            <GuestGuard>
              <Page403 />
            </GuestGuard>
          ),
        },
      ],
    },
    // Auth
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password', element: <NewPasswordPage /> },
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <Navigate to="/dashboard/user/profile" replace />
            </AuthGuard>
          ),
          index: true,
        },
        {
          path: 'user_profile',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserProfile />
            </AuthGuard>
          ),
        },
        // memberships
        {
          path: 'user_Memberships/',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserMembership />
            </AuthGuard>
          ),
        },
        {
          path: 'user_Membership_details',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserMembershipDetails />
            </AuthGuard>
          ),
        },
        {
          path: 'user_properties',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserProperties />
            </AuthGuard>
          ),
        },
        {
          path: 'edit_property/:propertyId',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserEditProperty />
            </AuthGuard>
          ),
        },
        {
          path: 'user_view_property_details/:propertyId',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserViewPropertyDetails />
            </AuthGuard>
          ),
        },
        {
          path: 'user_view_unit_details',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserViewUnitDetails />
            </AuthGuard>
          ),
        },
        {
          path: 'user_tenant_chat',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserTenantChat />
            </AuthGuard>
          ),
        },
        {
          path: 'user_posts',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserPosts />
            </AuthGuard>
          ),
        },
        {
          path: 'view_post/:postId',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserViewPost />
            </AuthGuard>
          ),
        },
        {
          path: 'user_maintenances',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserMaintenance />
            </AuthGuard>
          ),
        },
        {
          path: 'user_maintenances_details',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserMaintenanceDetails />
            </AuthGuard>
          ),
        },
        {
          path: 'user_business_report',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserBusinessReport />
            </AuthGuard>
          ),
        },
        {
          path: 'user_bookings',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserBookings />
            </AuthGuard>
          ),
        },
        {
          path: 'user_booking_history',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserBookingHistory />
            </AuthGuard>
          ),
        },
        {
          path: 'user_purchases',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserPurchases />
            </AuthGuard>
          ),
        },

        {
          path: 'user_payments/:userId/:type',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserPayments />
            </AuthGuard>
          ),
        },
        {
          path: 'user_edit_profile',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserEditProfile />
            </AuthGuard>
          ),
        },
        {
          path: 'user_notifications',
          element: (
            <AuthGuard allowedUserTypes={[...onlyForLandlord]}>
              <CPanelUserNotifications />
            </AuthGuard>
          ),
        },
      ],
    },

    {
      element: <CompactLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    {
      element: <CompactLayout />,
      children: [{ path: 'dashboard/coming_soon', element: <ComingSoonPage /> }],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

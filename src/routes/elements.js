import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const AddNewEmployee = Loadable(lazy(() => import('../pages/auth/AddNewEmployee')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

export const Page403 = Loadable(lazy(() => import('../pages/Page403')));

export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));

// user C-Panel
export const CPanelUserProfile = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserProfile'))
);

export const CPanelUserMembership = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserMemberships'))
);
export const CPanelUserMembershipDetails = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserMembershipDetails'))
);
export const CPanelUserProperties = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserProperties'))
);
export const CPanelUserEditProperty = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/EditProperty'))
);
export const CPanelUserViewPropertyDetails = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserViewPropertyDetails'))
);
export const CPanelUserViewUnitDetails = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserViewUnitDetails'))
);
export const CPanelUserTenantChat = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserTenantChat'))
);
export const CPanelUserPosts = Loadable(lazy(() => import('../pages/dashboard/cPanel/UserPosts')));
export const CPanelUserViewPost = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/ViewPost'))
);
export const CPanelUserMemberships = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserMemberships'))
);

export const CPanelUserMaintenance = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserMaintenance'))
);
export const CPanelUserMaintenanceDetails = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserMaintenanceDetails'))
);
export const CPanelUserBusinessReport = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserBusinessReport'))
);
export const CPanelUserBookings = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserBookings'))
);
export const CPanelUserBookingHistory = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserBookingHistory'))
);
export const CPanelUserPurchases = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserPurchases'))
);

export const CPanelUserPayments = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserPayments'))
);
export const CPanelUserEditProfile = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserEditProfile'))
);
export const CPanelUserNotifications = Loadable(
  lazy(() => import('../pages/dashboard/cPanel/UserNotifications'))
);

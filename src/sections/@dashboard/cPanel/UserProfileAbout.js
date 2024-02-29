import PropTypes from 'prop-types';
import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {
  Button,
  Card,
  Typography,
  CardHeader,
  Stack,
  Grid,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

UserProfileAbout.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  properties: PropTypes.object,
};

export default function UserProfileAbout({ loading, user, properties }) {
  const navigate = useNavigate();

  const handleUserMemberships = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_memberships);
  };

  const handleUserProperties = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_properties);
  };
  const handleUserTenantChat = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_tenant_chat);
  };

  const handleUserPosts = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_posts);
  };
  const handleUserMaintenance = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_maintenances);
  };
  const handleUserBusinessReport = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_business_report);
  };
  const handleUserBookings = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_bookings);
  };
  const handleUserPurchases = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_purchases);
  };
  const handleUserPayments = async (type) => {
    navigate(PATH_DASHBOARD.c_panel.user_payments(user._id, type));
  };

  const handleUserEditProfile = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_edit_profile, { state: user });
  };
  const handleUserNotifications = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_notifications);
  };

  const handleContactUs = () => {
    // Replace the email address, subject, and body with your desired values
    const emailAddress = 'customersupport1@roomyfinder.com';
    const subject = '';
    const body = ',';

    // Constructing the mailto URL
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Opening the default email client with the mailto link
    window.location.href = mailtoLink;
  };

  const [anchorServiceEl, setAnchorServiceEl] = useState(null);
  const [anchorPaymentEl, setAnchorPaymentEl] = useState(null);

  const handleServiceClick = (event) => {
    setAnchorServiceEl(event.currentTarget);
  };

  const handlePaymentClick = (event) => {
    setAnchorPaymentEl(event.currentTarget);
  };

  const handleServiceClose = () => {
    setAnchorServiceEl(null);
  };
  const handlePaymentClose = () => {
    setAnchorPaymentEl(null);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={10}>
        {loading ? (
          <LinearProgress />
        ) : (
          <Card>
            <CardHeader title="About" />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Typography variant="h6">{user?.standardCode || 'N/A'}</Typography>
                  <Typography variant="h6">
                    {user?.firstName} {user?.lastName}
                  </Typography>

                  <Stack direction="row">
                    <StyledIcon icon="eva:email-fill" />
                    <Typography variant="body2">{user?.email}</Typography>
                  </Stack>

                  <Stack direction="row">
                    <StyledIcon icon="bi:phone-fill" />
                    <Typography variant="body2">{user?.phone}</Typography>
                  </Stack>

                  {/* <Stack direction="row">
                    <StyledIcon icon="eva:pin-fill" />

                    <Typography variant="body2">
                      Live at &nbsp;
                      <Link component="span" variant="subtitle2" color="text.primary">
                        {user.country}
                      </Link>
                    </Typography>
                  </Stack> */}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="body1">Nationality:</Typography>
                    <Typography variant="body2">{user?.aboutMe?.nationality || 'N/A'}</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {/* <StyledIcon icon="icons8:gender" /> */}
                    <Typography variant="body1">Gender:</Typography>
                    <Typography variant="body2">{user?.gender}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Typography variant="body1">Location:</Typography>
                    <Typography variant="body2">
                      {user?.city}, {user?.country}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Typography variant="body1">Number Of Properties:</Typography>
                    <Typography variant="body2">{properties?.length}</Typography>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={2} sx={{ p: 3 }}>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="body1">Registered since:</Typography>
                    <Typography variant="body2">{fDate(user?.createdAt)}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <Typography variant="body1">Membership:</Typography>
                    <Typography variant="body2">{user?.isPremium ? 'Yes' : 'No'}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>

      <Grid item xs={12} md={2}>
        <Card>
          <Stack padding={3} spacing={2}>
            <Button variant="contained" color="error" onClick={handleUserEditProfile}>
              Edit Profile
            </Button>
            <Button variant="contained" color="error" onClick={handleUserNotifications}>
              Notification
            </Button>
            <Button variant="contained" color="error" onClick={handleContactUs}>
              Contact us
            </Button>
          </Stack>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <Grid container spacing={3} padding={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handleUserMemberships}>
                Membership
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handleUserProperties}>
                Property
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handleServiceClick}>
                Services
              </Button>
              <Menu
                anchorEl={anchorServiceEl}
                open={Boolean(anchorServiceEl)}
                onClose={handleServiceClose}
              >
                <MenuItem onClick={handleUserTenantChat}>Tenant Chat</MenuItem>
                <MenuItem onClick={handleUserPosts}>Posts</MenuItem>
                <MenuItem onClick={handleUserMaintenance}>Maintenances</MenuItem>
                <MenuItem onClick={handleUserBusinessReport}>Business Report</MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handleUserBookings}>
                Booking
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handleUserPurchases}>
                Purchases
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={handlePaymentClick}>
                Payment
              </Button>
              <Menu
                anchorEl={anchorPaymentEl}
                open={Boolean(anchorPaymentEl)}
                onClose={handlePaymentClose}
              >
                <MenuItem onClick={() => handleUserPayments('Rent Payments')}>
                  Rent Payment
                </MenuItem>
                <MenuItem onClick={() => handleUserPayments('Roomy Pay')}>Roomy Pay</MenuItem>
                <MenuItem onClick={() => handleUserPayments('Payment History')}>
                  Payment History
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

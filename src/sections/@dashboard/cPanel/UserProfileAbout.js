import PropTypes from 'prop-types';
import { useState } from 'react';

// router
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Stack, Grid, Menu, MenuItem } from '@mui/material';
// components
import { PATH_DASHBOARD } from '../../../routes/paths';
import NewProfileAbout from '../user/profile/NewProfileAbout';

import Image from '../../../components/image/Image';

// ------------- icons -----------------------------------
import membership from '../../../assets/category_icons/membership.png';
import propertyImg from '../../../assets/category_icons/property.png';
import tenantChat from '../../../assets/category_icons/tenantChat.png';
import notification from '../../../assets/category_icons/notification.png';
import booking from '../../../assets/category_icons/booking.png';
import transaction from '../../../assets/category_icons/transaction.png';
import payments from '../../../assets/category_icons/payments.png';
import freeOffers from '../../../assets/category_icons/freeOffers.png';

// ----------------------------------------------------------------------

const StyledImage = styled(Image)(({ theme }) => ({
  width: 20,
  height: 18,
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
    navigate(PATH_DASHBOARD.c_panel.user_payments('', type));
  };

  const handleUserNotifications = async () => {
    navigate(PATH_DASHBOARD.c_panel.user_notifications);
  };

  const handleContactUs = () => {
    // Replace the email address, subject, and body with your desired values
    const emailAddress = 'support@roomyfinder.com';
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
    <Grid container>
      <Grid item xs={12}>
        <NewProfileAbout user={user} />
      </Grid>

      <Grid item xs={12} container sx={{ border: '2px solid', borderTop: 'none', padding: 2 }}>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            fullWidth
            sx={{ border: '1px solid' }}
            onClick={handleUserMemberships}
          >
            <Stack direction="row">
              <StyledImage src={membership} />
              <Typography>Membership</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handleUserProperties}
          >
            <Stack direction="row">
              <StyledImage src={propertyImg} />
              <Typography>Property</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            onClick={handleServiceClick}
            fullWidth
          >
            <StyledImage src={freeOffers} />
            <Typography>Services</Typography>
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
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handleUserBookings}
          >
            <Stack direction="row">
              <StyledImage src={booking} />
              <Typography>Bookings</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handleUserPurchases}
          >
            <Stack direction="row">
              <StyledImage src={transaction} />
              <Typography>Purchases</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handlePaymentClick}
          >
            <Stack direction="row">
              <StyledImage src={payments} />
              <Typography>Payments</Typography>
            </Stack>
          </Button>

          <Menu
            anchorEl={anchorPaymentEl}
            open={Boolean(anchorPaymentEl)}
            onClose={handlePaymentClose}
          >
            <MenuItem onClick={() => handleUserPayments('Rent Payments')}>Rent Payment</MenuItem>
            <MenuItem onClick={() => handleUserPayments('Roomy Pay')}>Roomy Pay</MenuItem>
            <MenuItem onClick={() => handleUserPayments('Payment History')}>
              Payment History
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handleUserNotifications}
          >
            <Stack direction="row">
              <StyledImage src={notification} />
              <Typography>Notification</Typography>
            </Stack>
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} sx={{ padding: 2 }}>
          <Button
            variant="textVariant"
            sx={{ border: '1px solid' }}
            fullWidth
            onClick={handleContactUs}
          >
            <Stack direction="row">
              <StyledImage src={tenantChat} />
              <Typography>Contact Us</Typography>
            </Stack>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

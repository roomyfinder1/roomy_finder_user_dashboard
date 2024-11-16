/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, CardHeader, Stack, Grid, Box } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import { NotLazyImage } from '../../../../components/image';

// -------------- icons ---------------
import gender from '../../../../assets/profile_icons/gender.png';
import location from '../../../../assets/profile_icons/location.png';
import createdAt from '../../../../assets/profile_icons/createdAt.png';
import properties from '../../../../assets/profile_icons/properties.png';
import membership from '../../../../assets/profile_icons/membership.png';
import countryImg from '../../../../assets/profile_icons/country.png';
import userAvatar from '../../../../assets/icons/user_avatar.webp';

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const StyledImage = styled(NotLazyImage)(({ theme }) => ({
  width: 20,
  height: 18,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

NewProfileAbout.propTypes = {
  user: PropTypes.object,
  color: PropTypes.string,
};

export default function NewProfileAbout({ user, color }) {
  return (
    <Grid container>
      <style>{`@page {
      size: A3;
    }`}</style>
      <Grid
        item
        xs={12}
        sm={3}
        md={3}
        sx={{
          borderBottom: '2px solid',
          borderLeft: '2px solid',
          borderRight: { xs: '2px solid', sm: 'none' },
          color: color || '',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            top: -70,
          }}
        >
          <NotLazyImage
            alt="cover"
            className="image_component"
            src={user?.profilePicture || userAvatar}
            style={{
              borderRadius: '50%',
              height: '150px',
              width: '150px',
              border: '8px solid #953398',
            }}
          />
        </Box>

        <Box
          sx={{
            mt: { xs: 1, md: 0 },
            textAlign: 'center',
            position: 'relative',
            top: -25,
          }}
        >
          <Typography variant="h4">{user?.fullName}</Typography>

          <Typography sx={{ opacity: 0.72 }}>{user?.type}</Typography>

          <Typography sx={{ opacity: 1 }}>{user?.standardCode}</Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={9}
        md={9}
        sx={{
          borderBottom: '2px solid',
          borderRight: '2px solid',
          borderLeft: { xs: '2px solid', sm: 'none' },
          color: color || '',
        }}
      >
        <CardHeader title="About" textAlign="center" />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center">
                <StyledIcon icon="mdi:email-outline" color="red" />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Email:</Typography>
                <Typography sx={{}}>{user?.email || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledIcon icon="ph:phone-call-thin" color="green" />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Phone: </Typography>
                <Typography>{user?.phone || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={gender} width="30px" />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Gender: </Typography>
                <Typography>{user?.gender || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={location} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Location: {'  '}</Typography>
                <Typography>{user?.city || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={countryImg} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Country: {'  '}</Typography>
                <Typography>{user?.country || 'N/A'}</Typography>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={2} sx={{ p: 3 }}>
              <Stack direction="row" sx={{ visibility: 'hidden' }}>
                <StyledImage src={createdAt} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Created At: </Typography>
                <Typography>{dayjs(user?.createdAt).format('DD, MMM YYYY') || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={createdAt} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Created At: </Typography>
                <Typography>{dayjs(user?.createdAt).format('DD, MMM YYYY') || 'N/A'}</Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={properties} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>
                  {user?.type === 'Landlord' ? 'Properties' : 'Posts'}:{' '}
                </Typography>
                <Typography>
                  {user?.type === 'Landlord'
                    ? user?.properties?.length
                    : user?.type === 'Roommate'
                    ? user?.ads?.length
                    : 0}
                </Typography>
              </Stack>

              <Stack direction="row">
                <StyledImage src={membership} />
                <Typography sx={{ fontWeight: 'bold', mr: 1 }}>Membership: </Typography>
                <Typography>{user?.membership || 'Regular'}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

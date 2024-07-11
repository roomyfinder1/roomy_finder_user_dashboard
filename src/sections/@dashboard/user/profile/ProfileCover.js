import PropTypes from 'prop-types';

// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate } from 'react-router-dom';
// utils
import { bgGradient } from '../../../../utils/cssStyles';
// components

import { PATH_DASHBOARD } from '../../../../routes/paths';
// import LandlordPdf from '../../landlordPdfDownload/LandlordPdf';
// import usePrintPdf from '../../../../utils/DownloadAsPdf';
// import { handleDownloadPdf } from '../../../../utils/DownloadAsPdf';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  user: PropTypes.object,
};

export default function ProfileCover({ user }) {
  const navigate = useNavigate();

  // const { handlePrintWithToast, componentRef } = usePrintPdf();

  const handleUserEditProfile = async () => {
    console.log('edit');
    navigate(PATH_DASHBOARD.c_panel.user_edit_profile, { state: user });
  };

  const StyledRoot = styled('div')(() => ({
    '&:before': {
      ...bgGradient({
        direction: '235deg',
        startColor: `${alpha('#953398', 1)} 0%`,
        endColor: `${alpha('#953398', 1)} 100%`,
      }),
      top: 0,
      zIndex: 9,
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
  }));

  return (
    <>
      <StyledRoot sx={{}}>
        <Box
          sx={{
            position: 'absolute',
            zIndex: 88,
            right: 10,
            top: 5,
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* {user?.type === 'Landlord' && (
            <IconButton
              // onClick={() => handlePrintWithToast('profile-cover', `${user?.fullName} profile`)}
              sx={{ backgroundColor: '#fff' }}
            >
              <DownloadIcon />
            </IconButton>
          )} */}
          <IconButton onClick={handleUserEditProfile} sx={{ backgroundColor: '#fff' }}>
            <EditIcon />
          </IconButton>
        </Box>
      </StyledRoot>

      {/* <div style={{ display: 'none' }}>
        <div style={{ minWidth: '400px' }} id="profile-cover" ref={componentRef}>
          <LandlordPdf user={user} bookings={userBookings} transactions={userTransactions} />
        </div>
      </div> */}
    </>
  );
}

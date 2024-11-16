import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Card, Typography, Stack, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// utils
import { fNumber, fPercent } from '../../../../../utils/formatNumber';
// components
import Iconify from '../../../../../components/iconify';

import AppWidgetSummaryLoading from '../AppWidgetSummaryLoading';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
// ----------------------------------------------------------------------

BookingSummaryWidget.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
  today: PropTypes.number,
};

export default function BookingSummaryWidget({ title, total, today, sx, ...other }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (title === 'Pending') navigate(PATH_DASHBOARD.bookings.pending_page);
            if (title === 'Active') navigate(PATH_DASHBOARD.bookings.active_page);
            if (title === 'Cancel') navigate(PATH_DASHBOARD.bookings.canceled_page);
          }}
        >
          {title}
        </Typography>

        {total !== null ? (
          <Box
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}
          >
            <Tooltip title="Total">
              <Typography>Total: {fNumber(total)}</Typography>
            </Tooltip>

            <Tooltip title="today">
              <Typography>Today: {fNumber(today)}</Typography>
            </Tooltip>
          </Box>
        ) : (
          <AppWidgetSummaryLoading />
        )}
      </Box>
      {/* <Box>
        {percent !== null ? <TrendingInfo percent={percent} /> : <AppWidgetSummaryLoading />}
      </Box> */}
    </Card>
  );
}

// ----------------------------------------------------------------------

TrendingInfo.propTypes = {
  percent: PropTypes.number,
};

function TrendingInfo({ percent }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, mb: 1 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography component="div" variant="subtitle2">
        {percent > 0 && '+'}

        {percent !== 0 ? fPercent(percent) : 0}
      </Typography>
    </Stack>
  );
}

TodayUsersPercentage.propTypes = {
  percent: PropTypes.number,
};

function TodayUsersPercentage({ percent }) {
  return (
    <Stack sx={{ ml: 2 }}>
      <Typography
        component="div"
        variant="subtitle2"
        sx={{
          color: (theme) => alpha(theme.palette.success.main, 0.7),
          ...(+percent < 0 && {
            color: 'error.main',
          }),
        }}
      >
        {percent > 0 && '+'}

        {percent !== 0 ? fPercent(percent) : 0}
      </Typography>
    </Stack>
  );
}

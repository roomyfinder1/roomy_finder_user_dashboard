import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { Card, CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

PropertyBookedRoom.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  BookedRoomLine1: PropTypes.number,
  BookedRoomLine2: PropTypes.number,
  BookedRoomLine3: PropTypes.number,
  BookedRoomLine1Title: PropTypes.string,
  BookedRoomLine2Title: PropTypes.string,
  BookedRoomLine3Title: PropTypes.string,
};

export default function PropertyBookedRoom({
  title,
  subheader,
  BookedRoomLine1,
  BookedRoomLine2,
  BookedRoomLine3,
  BookedRoomLine1Title,
  BookedRoomLine2Title,
  BookedRoomLine3Title,
  ...other
}) {
  const data = [
    {
      status: BookedRoomLine1Title?.toString(),
      quantity: BookedRoomLine1,
      value: BookedRoomLine1,
    },
    {
      status: BookedRoomLine2Title?.toString(),
      quantity: BookedRoomLine2,
      value: BookedRoomLine2,
    },
    {
      status: BookedRoomLine3Title?.toString(),
      quantity: BookedRoomLine3,
      value: BookedRoomLine3,
    },
  ];

  console.log(BookedRoomLine2, BookedRoomLine3, BookedRoomLine1);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ px: 3, my: 5 }}>
        {data.map((progress, index) => (
          <LinearProgress
            variant="determinate"
            key={progress.status}
            value={progress.value}
            color={(index === 0 && 'warning') || (index === 1 && 'error') || 'success'}
            sx={{ height: 8, bgcolor: (theme) => alpha(theme.palette.grey[500], 0.16) }}
          />
        ))}
      </Stack>

      <Stack direction="row" justifyContent="space-between" sx={{ px: 3, pb: 3 }}>
        {data.map((progress, index) => (
          <Stack key={progress.status} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 0.5,
                  bgcolor: 'warning.main',
                  ...(index === 1 && { bgcolor: 'error.main' }),
                  ...(index === 2 && { bgcolor: 'success.main' }),
                }}
              />

              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                {progress.status}
              </Typography>
            </Stack>

            <Typography variant="h6">{fShortenNumber(progress.quantity)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

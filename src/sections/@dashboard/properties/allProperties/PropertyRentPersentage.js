import PropTypes from 'prop-types';
// @mui
import { alpha } from '@mui/material/styles';
import { CardHeader, Typography, Stack, LinearProgress, Box } from '@mui/material';

// ----------------------------------------------------------------------

PropertyRentPersentage.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  BookedRoomLine1: PropTypes.array,
  BookedRoomLine2: PropTypes.array,
  BookedRoomLine3: PropTypes.array,
  BookedRoomLine1Title: PropTypes.string,
  BookedRoomLine2Title: PropTypes.string,
  BookedRoomLine3Title: PropTypes.string,
};

export default function PropertyRentPersentage({
  title,
  subheader,
  BookedRoomLine1,
  BookedRoomLine1Title,
  ...other
}) {
  const data = [
    {
      status: BookedRoomLine1Title,
      quantity: BookedRoomLine1.length,
      value: BookedRoomLine1.length,
    },
  ];
  return (
    <>
      <CardHeader title={title} subheader={subheader} />

      <Stack spacing={3} sx={{ px: 3, my: 2 }}>
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

      <Stack>
        <Box sx={{ p: 1, display: 'flex' }} spacing={1}>
          <Typography> Number of all booking By Roommy</Typography>
          <Typography sx={{ mr: 1 }}> 3000</Typography>
        </Box>
      </Stack>
    </>
  );
}

import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography, Select, MenuItem } from '@mui/material';

// icons
import TenantChat from '@mui/icons-material/Telegram';
import PremiumAd from '@mui/icons-material/WorkspacePremium';
import BookingCalendar from '@mui/icons-material/CalendarMonth';
import Analytics from '@mui/icons-material/QueryStats';
// components
import Carousel, { CarouselDots } from '../../../../../../components/carousel';
import axiosInstance from '../../../../../../utils/axios';
import { API_URL, HOST_API_KEY } from '../../../../../../config-global';
import { useSnackbar } from '../../../../../../components/snackbar';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  // ...bgGradient({
  //   startColor: `${alpha(theme.palette.secondary.light, 0)} 0%`,
  //   endColor: `${theme.palette.secondary.light} 75%`,
  // }),
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
}));

// ----------------------------------------------------------------------

Services.propTypes = {
  //   list: PropTypes.array,
};

export default function Services({ ...other }) {
  const theme = useTheme();
  const list = [
    { id: 1, name: 'TENANT CHAT', icon: <TenantChat fontSize="large" color="warning" /> },
    { id: 2, name: 'BOOKING CALENDAR', icon: <BookingCalendar fontSize="large" color="warning" /> },
    { id: 3, name: 'PREMIUM AD', icon: <PremiumAd fontSize="large" color="warning" /> },
    { id: 4, name: 'ANALYTICS', icon: <Analytics fontSize="large" color="warning" /> },
  ];

  const carouselSettings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        right: 0,
        left: 0,
        position: 'absolute',
      },
    }),
  };

  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Carousel {...carouselSettings}>
        {list.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>
    </Card>
  );
}

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
};

function CarouselItem({ item }) {
  const { name, icon } = item;
  const { enqueueSnackbar } = useSnackbar();
  const [selectedWeek, setSelectedWeek] = useState(1);

  const { userId } = useParams();

  const purchaseRoomyPro = async () => {
    try {
      enqueueSnackbar('Payment Processing');
      const { data } = await axiosInstance.post(
        `${API_URL}/roomy_pro/purchase_roomy_pro/${userId}`,
        {
          type: name,
          numberOfWeeks: selectedWeek,
          successUrl: `${HOST_API_KEY}dashboard/c_panel/payment_success/${userId}`,
          cancelUrl: `${HOST_API_KEY}dashboard/c_panel/payment_cancelled/${userId}`,
        }
      );

      window.location.href = data.paymentUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const handleWeekSelect = (e) => {
    setSelectedWeek(e.target.value);
  };

  return (
    <Box>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="overline" sx={{ opacity: 0.48 }}>
            New
          </Typography>
          <div>{icon}</div>
        </Box>

        <Box sx={{ zIndex: 566 }}>
          <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
            {name}
          </Typography>

          <Select size="small" value={selectedWeek} onChange={handleWeekSelect}>
            <MenuItem value="1">1 Week</MenuItem>
            <MenuItem value="2">2 Weeks</MenuItem>
            <MenuItem value="4">4 Weeks</MenuItem>
          </Select>
        </Box>

        <Button sx={{ zIndex: 55 }} onClick={purchaseRoomyPro}>
          Buy Now
        </Button>
      </CardContent>
    </Box>
  );
}

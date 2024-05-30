import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography, Select, MenuItem } from '@mui/material';
// components
import Image from '../../../../../../components/image/Image';
import Carousel, { CarouselDots } from '../../../../../../components/carousel';
import axiosInstance from '../../../../../../utils/axios';
import { API_URL, HOST_API_KEY, LOCAL_API_URL } from '../../../../../../config-global';
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
    { id: 1, name: 'TENANT CHAT' },
    { id: 2, name: 'BOOKING CALENDAR' },
    { id: 3, name: 'PREMIUM AD' },
    { id: 4, name: 'BOOKING CALENDAR' },
    { id: 5, name: 'ANALYTICS' },
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
        bottom: 24,
        position: 'absolute',
      },
    }),
  };

  return (
    <Card {...other}>
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
  const { image, name } = item;
  const { enqueueSnackbar } = useSnackbar();
  const [selectedWeek, setSelectedWeek] = useState(1);

  const { userId } = useParams();

  const purchaseRoomyPro = async () => {
    try {
      enqueueSnackbar('Payment Processing');
      const { data } = await axiosInstance.post(
        `${LOCAL_API_URL}/roomy_pro/purchase_roomy_pro/${userId}`,
        {
          type: name,
          numberOfWeeks: selectedWeek,
          successUrl: `${HOST_API_KEY}/dashboard/c_panel/payment_success/${userId}`,
          cancelUrl: `${HOST_API_KEY}/dashboard/c_panel/payment_cancelled/${userId}`,
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
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <CardContent
          sx={{
            left: 0,
            bottom: 0,
            zIndex: 9,
            maxWidth: '80%',
            position: 'absolute',
            // color: 'common.white',
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.48 }}>
            New
          </Typography>

          <Box>
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

        <StyledOverlay />

        <Image
          alt={name}
          src={image}
          sx={{
            height: { xs: 200, xl: 250 },
          }}
        />
      </Box>
    </Card>
  );
}

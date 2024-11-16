import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// @mui
import { useTheme } from '@mui/material/styles';
import { Card } from '@mui/material';
// utils
import axiosInstance from '../../../../../../utils/axios';
import { API_URL } from '../../../../../../config-global';
import Carousel, { CarouselDots } from '../../../../../../components/carousel';
import Image from '../../../../../../components/image';
import ImageCard from '../../../../../../components/ImageCard/ImageCard';

// ----------------------------------------------------------------------

Commercials.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function Commercials({ title, description, action, img, ...other }) {
  const theme = useTheme();
  const [commercials, setCommercials] = useState([]);
  const [images, setImages] = useState([]);
  const getCommercials = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${API_URL}/marketing/advertisement/adverts?userType=CRM`
      );

      setCommercials(data.data);
      data.data?.forEach((commercial) => {
        setImages((prevImg) => [...prevImg, commercial?.images[0]]);
      });
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    getCommercials();
  }, []);

  return (
    <Card {...other}>
      <ImageCard imageUrls={images} ratio="4/3" />
      {/* <Carousel {...carouselSettings}>
        {commercials?.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel> */}
    </Card>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
};
export function CarouselItem({ item, ...other }) {
  const { title, images } = item;
  return (
    <Card sx={{ padding: 2, border: '1px solid #DADADA', height: '100%' }}>
      {/* <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          pl: 5,
          py: { xs: 5, md: 0 },
          pr: { xs: 5, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            mb: { xs: 3, xl: 5 },
          }}
        >
          {description}
        </Typography>
      </Stack> */}

      <Image
        alt={title}
        src={images[0]}
        ratio="4/3"
        sx={{
          height: { xs: 200, xl: 250 },
        }}
      />
    </Card>
  );
}

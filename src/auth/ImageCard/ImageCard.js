/* eslint-disable import/no-unresolved */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';
import Image from '../image/Image';

ImageCard.propTypes = {
  imageUrls: PropTypes.array,
  ratio: PropTypes.string,
};
export default function ImageCard({ imageUrls, ratio, ...other }) {
  return (
    <div className="image-card">
      <Swiper
        effect="cards"
        grabCursor
        loop
        autoplay={{
          delay: 3000, // Delay of 2.5 seconds between transitions
          disableOnInteraction: false, // Continue autoplay even after interaction
        }}
        modules={[EffectCards, Autoplay]}
        className="mySwiper"
      >
        {imageUrls
          ?.filter((image) => image?.mimeType?.includes('image'))
          ?.map((image) => (
            <SwiperSlide key={image}>
              <Image
                alt="cover"
                src={image.thumbnail || image.url}
                ratio={ratio ?? '3/4'}
                sx={{ borderRadius: 1.5 }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

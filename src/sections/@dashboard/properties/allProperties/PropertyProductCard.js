/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Box, Card, Stack, Tooltip, Fab, Typography, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// redux
import { useDispatch } from '../../../../redux/store';
import { addToCart } from '../../../../redux/slices/product';
// components
import Iconify from '../../../../components/iconify';
import Image from '../../../../components/image';
import DummyImage from '../../../../assets/demo.jpg';
import { UniqueCode } from '../../general/app';
import axiosInstance from '../../../../utils/axios';
import { API_URL } from '../../../../config-global';
import { useSnackbar } from '../../../../components/snackbar';

import { getProperties } from '../../../../redux/slices/Properties';
import { fToNow } from '../../../../utils/formatTime';
import { fCurrency } from '../../../../utils/formatNumber';
import { getRoommate } from '../../../../redux/slices/RoommateAds';
import { getLandlord } from '../../../../redux/slices/landlord';
import ConfirmDialog from '../../../../components/confirm-dialog';
import ImageCard from '../../../../components/ImageCard/ImageCard';

// ----------------------------------------------------------------------

PropertyProductCard.propTypes = {
  product: PropTypes.object,
};

export default function PropertyProductCard({ product }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const { userId } = useParams();

  const [renewDialog, setRenewDialog] = useState(false);
  const [endingPeriod, setEndingPeriod] = useState(1);
  const [isPremium, setIsPremium] = useState(product?.isPremium || false);

  const { action, type, files, standardCode, currentPost } = product;

  const dispatch = useDispatch();

  const handleViewCart = async () => {
    navigate(PATH_DASHBOARD.properties.property_details, { state: product });
    const newProduct = {};
    try {
      dispatch(addToCart(newProduct));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async () => {
    if (action) {
      handleEditAd();
    } else handleEditProperty();
  };
  const handleEditAd = async () => {
    try {
      navigate(PATH_DASHBOARD.roommate.edit_roommate_ad(product._id), {
        state: { isEdit: true, currentProduct: product },
      });
      await dispatch(getProperties());
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProperty = async () => {
    try {
      navigate(`${PATH_DASHBOARD.properties.edit_properties}/${product._id}`, {
        state: { isEdit: true, currentProduct: product },
      });
      await dispatch(getProperties());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (action) {
      handleDeleteAd();
    } else handleDeleteProperty();
  };

  const handleDeleteProperty = async () => {
    try {
      enqueueSnackbar('Property is being delete', { variant: 'success' });
      const { data } = await axiosInstance.delete(
        `${API_URL}/property/${product._id}?userId=${userId}`
      );
      if (data) {
        enqueueSnackbar(data.message, { variant: 'success' });
        dispatch(getLandlord(userId));
      }
    } catch (error) {
      if (error.code === 'is-booked') {
        enqueueSnackbar('This property contains bookings', { variant: 'error' });
      }
      console.log('AAA', error);
    }
  };
  const handleDeleteAd = async () => {
    try {
      enqueueSnackbar('Ad is being delete', { variant: 'success' });
      const { data } = await axiosInstance.delete(`${API_URL}/roommate/${product._id}`);
      if (data) {
        enqueueSnackbar(data.message, { variant: 'success' });
        dispatch(getRoommate(userId));
      }
    } catch (error) {
      console.log('AAA', error);
    }
  };

  const handlePropertyBookings = () => {
    try {
      navigate(`${PATH_DASHBOARD.properties.property_bookings}/${product._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrice = (monthly, weekly, daily, currency) => {
    let price;
    let period;

    if (monthly) {
      price = monthly;
      period = 'Month';
    } else if (weekly) {
      price = weekly;
      period = 'Week';
    } else {
      price = daily;
      period = 'Day';
    }

    // Assuming fCurrency is a function that formats the currency
    return (
      <Box sx={{ fontSize: '14px' }}>
        <span>{fCurrency(price)}</span> <span style={{ fontSize: '12px' }}>{currency}</span> /{' '}
        <span>{period}</span>
      </Box>
    );
  };

  const handleRenewConfirm = () => {
    setRenewDialog(true);
  };

  const handleRenew = () => {
    setRenewDialog(false);
    if (action) {
      handleRenewAd();
    } else {
      handleRenewProperty();
    }
  };

  const handleRenewAd = async () => {
    try {
      enqueueSnackbar('Renew Ad was being processed', { variant: 'success' });
      const { data } = await axiosInstance.post(`${API_URL}/roommate/renew_roommate_ad/${userId}`, {
        adId: product._id,
        isPremium,
        endingPeriod,
      });

      if (data) {
        dispatch(getRoommate(userId));
        enqueueSnackbar('Ad was successfully renewed', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleRenewProperty = async () => {
    try {
      enqueueSnackbar('Renew Property was being processed', { variant: 'success' });
      const { data } = await axiosInstance.post(`${API_URL}/property/renew_property/${userId}`, {
        adId: product._id,
        isPremium,
        endingPeriod,
      });

      if (data) {
        dispatch(getLandlord(userId));
        enqueueSnackbar('Property was successfully renewed', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  };

  const handleClick = () => {
    if (currentPost && currentPost.endDate) {
      navigate(PATH_DASHBOARD.properties.property_details, { state: product });
    }
  };

  const isExpired =
    currentPost && currentPost.endDate ? new Date(currentPost.endDate) <= new Date() : true;
  const endDateFormatted =
    currentPost && currentPost.endDate ? fToNow(new Date(currentPost.endDate)) : null;

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      <Box sx={{ position: 'relative', p: 1 }}>
        <Tooltip title="View" aria-label="View">
          <Fab
            color="warning"
            size="small"
            className="add-cart-btn"
            onClick={handleViewCart}
            sx={{
              left: '55%',
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Iconify icon="ic:round-book" />
          </Fab>
        </Tooltip>
        <Tooltip title="Edit" aria-label="Edit">
          <Fab
            color="warning"
            size="small"
            className="add-cart-btn"
            onClick={handleEdit}
            sx={{
              left: 16,
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Iconify icon="ic:round-edit" />
          </Fab>
        </Tooltip>
        {!action ? (
          <Tooltip title="Bookings" aria-label="Bookings">
            <Fab
              color="warning"
              size="small"
              className="add-cart-btn"
              onClick={handlePropertyBookings}
              sx={{
                left: '30%',
                bottom: 16,
                zIndex: 9,
                opacity: 0,
                position: 'absolute',
                transition: (theme) =>
                  theme.transitions.create('all', {
                    easing: theme.transitions.easing.easeInOut,
                    duration: theme.transitions.duration.shorter,
                  }),
              }}
            >
              <Iconify icon="solar:book-bold" />
            </Fab>
          </Tooltip>
        ) : (
          ''
        )}
        <Tooltip title="Delete" aria-label="Delete">
          <Fab
            color="warning"
            size="small"
            className="add-cart-btn"
            onClick={handleDelete}
            sx={{
              right: 16,
              bottom: 16,
              zIndex: 9,
              opacity: 0,
              position: 'absolute',
              transition: (theme) =>
                theme.transitions.create('all', {
                  easing: theme.transitions.easing.easeInOut,
                  duration: theme.transitions.duration.shorter,
                }),
            }}
          >
            <Iconify icon="ic:round-delete" />
          </Fab>
        </Tooltip>
        <ImageCard
          imageUrls={
            files?.length > 0
              ? files
              : [{ url: DummyImage, thumbnail: DummyImage, mimeType: 'image' }]
          }
        />

        {/* <Image
          alt={poster?.firstName}
          src={files?.length > 0 ? files[0].url : DummyImage}
          ratio="1/1"
          sx={{ borderRadius: 1.5 }}
        /> */}
      </Box>

      <Stack spacing={1} sx={{ p: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{type}</Typography>

          <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>
            {product.action ? (
              product.action === 'NEED ROOM' ? (
                <Box sx={{ fontSize: '14px' }}>
                  <span>{fCurrency(product.budget)}</span>{' '}
                  <span style={{ fontSize: '12px' }}>{product.currency}</span> /
                  <span>{product.rentType}</span>
                </Box>
              ) : (
                <Box>
                  {handlePrice(
                    product.monthlyPrice,
                    product.weeklyPrice,
                    product.dailyPrice,
                    product.currency
                  )}
                </Box>
              )
            ) : (
              <Box component="span">{`Units: ${product?.units?.length}`}</Box>
            )}
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box
            onClick={() => navigate(PATH_DASHBOARD.properties.property_details, { state: product })}
          >
            {standardCode ? <UniqueCode code={standardCode} /> : '-'}
          </Box>

          <LoadingButton variant="soft" color="blue" onClick={handleRenewConfirm}>
            Renew
          </LoadingButton>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          sx={{
            position: 'absolute',
            top: 5,
            width: '100%', // Ensure it takes full width
          }}
        >
          {product.isPremium ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                visible: product.isPremium ? '' : 'hidden',
              }}
              onClick={handleClick}
            >
              <Iconify icon="noto:fire" />
            </Box>
          ) : (
            ''
          )}
          <Box sx={{}}>
            {isExpired && endDateFormatted == null ? (
              <span
                style={{
                  padding: 2,
                  backgroundColor: 'red',
                  borderRadius: 5,
                  color: '#fff',
                  fontWeight: 600,
                  left: 16,
                  zIndex: 9,
                  position: 'absolute',
                }}
              >
                Expired
              </span>
            ) : (
              <span
                style={{
                  backgroundColor: '#fff',
                  color: '#000',
                  padding: 1.5,
                  borderRadius: 5,

                  left: 16,
                  zIndex: 9,
                  position: 'absolute',
                }}
              >
                Expires in {endDateFormatted}
              </span>
            )}
          </Box>
        </Stack>
      </Stack>

      <ConfirmDialog
        open={renewDialog}
        onClose={() => setRenewDialog(false)}
        title="Renew Property"
        content={
          <Stack>
            <Typography>
              Are you sure want to <strong> Renew </strong>?
            </Typography>
            <Select
              value={endingPeriod}
              onChange={(e) => setEndingPeriod(e.target.value)}
              label="Renew period"
            >
              <MenuItem value={1}>1 Week</MenuItem>
              <MenuItem value={2}>2 Weeks</MenuItem>
              <MenuItem value={4}>4 Weeks</MenuItem>
            </Select>

            <Select
              value={isPremium}
              onChange={(e) => setIsPremium(e.target.value)}
              label="Post Type"
            >
              <MenuItem value={true}>Premium</MenuItem>
              <MenuItem value={false}>Regular</MenuItem>
            </Select>
          </Stack>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => {
              handleRenew();
            }}
          >
            Confirm Renew
          </LoadingButton>
        }
      />
    </Card>
  );
}

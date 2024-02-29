/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { Container, Grid, Card, Stack, Box, Typography, Tabs, Tab, Button } from '@mui/material';
import { useSettingsContext } from '../../../components/settings';
import { fCurrency } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';
import { useDispatch, useSelector } from '../../../redux/store';
import {
  getUser,
  getUserRentPaymentHistory,
  getUserRentPayments,
  getUserRoomyPay,
} from '../../../redux/slices/userCPanel';
import { NoDataFoundCard } from './UserBookings';
import { LoadingSection } from '../../../components/loading';
import { PATH_DASHBOARD } from '../../../routes/paths';
import WithdrawAmountPopover from '../../../sections/@dashboard/cPanel/WithdrawAmountPopover';
import axiosInstance from '../../../utils/axios';
import { API_URL, HOST_API_KEY } from '../../../config-global';
import { useSnackbar } from '../../../components/snackbar';

const STATUS_OPTIONS = ['Rent Payments', 'Roomy Pay', 'Payment History'];

export default function UserRentPaymentsHistory() {
  const { themeStretch } = useSettingsContext();
  const { userId, type } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [filterStatus, setFilterStatus] = useState(type || 'Rent Payments');
  const [dataFiltered, setDataFiltered] = useState([]);
  const [selectedRoomyPayAmount, setSelectedRoomyPayAmount] = useState(0);
  const [selectedPayments, setSelectedPayments] = useState({});
  const [open, setOpen] = useState(false);

  const handleFilterStatus = (event, newValue) => {
    navigate(PATH_DASHBOARD.c_panel.user_payments(userId, newValue), { replace: true });
    setFilterStatus(newValue);
  };

  useEffect(() => {
    dispatch(getUserRentPaymentHistory(userId));
  }, [dispatch, userId]);

  const {
    userDetails,
    userRentPayments,
    userRoomyPay,
    userPaymentHistory,
    userCommissionFee,
    isLoading,
  } = useSelector((store) => store.userCPanel);

  const handleSelectPayment = (selected) => {
    setSelectedPayments((prev) => {
      if (prev[selected._id]) {
        // If the payment with the selected _id is already in the state, remove it
        const updatedState = { ...prev };
        delete updatedState[selected._id];
        return updatedState;
      }
      // If the payment with the selected _id is not in the state, add it
      return { ...prev, [selected._id]: selected };
    });
  };

  const calculateRoomyPayFee = (payments, commission) => {
    const paymentsArray = Object.values(payments);
    const amount = paymentsArray.reduce((acc, payment) => acc + commission, 0);
    return amount;
  };

  useEffect(() => {
    if (Object.values(selectedPayments).length) {
      const amount = calculateRoomyPayFee(selectedPayments, userCommissionFee);
      setSelectedRoomyPayAmount(amount);
    } else {
      setSelectedRoomyPayAmount(0);
    }
  }, [selectedPayments, userCommissionFee]);

  useEffect(() => {
    let dataToSet;

    switch (filterStatus) {
      case 'Rent Payments':
        if (userRentPayments === null) {
          dispatch(getUserRentPayments(userId));
        } else if (userRentPayments.length === 0) {
          setDataFiltered([]);
        } else {
          dataToSet = userRentPayments;
        }
        break;
      case 'Roomy Pay':
        if (userRoomyPay === null) {
          dispatch(getUserRoomyPay(userId));
        } else if (userRoomyPay.length === 0) {
          setDataFiltered([]);
        } else {
          dataToSet = userRoomyPay;
        }
        break;
      default:
        if (userPaymentHistory === null) {
          dispatch(getUserRentPaymentHistory(userId));
        } else if (userPaymentHistory.length === 0) {
          setDataFiltered([]);
        } else {
          dataToSet = userPaymentHistory;
        }
    }

    if (dataToSet !== undefined) {
      setDataFiltered(dataToSet);
    }
  }, [dispatch, filterStatus, userPaymentHistory, userRentPayments, userRoomyPay, userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  const handleRoomyPay = async () => {
    try {
      const bookingIds = Object.keys(selectedPayments);
      const response = await axiosInstance.post(
        `${API_URL}/roomy_pay/stripe/create-pay-roomy-balance-checkout-session/${userId}`,
        {
          bookingIds,
          successUrl: `${HOST_API_KEY}/dashboard/user_payments/${userId}/Roomy%20Pay`,
          cancelUrl: `${HOST_API_KEY}/dashboard/user_payments/${userId}/Roomy%20Pay`,
        }
      );
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      enqueueSnackbar(error.code, { variant: 'error' });
    }
  };

  return (
    <>
      <Helmet>
        <title> Payments | CRM </title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : '90%'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Tabs
                value={filterStatus}
                onChange={handleFilterStatus}
                sx={{
                  px: 2,
                  backgroundColor: 'background.neutral',
                }}
              >
                {STATUS_OPTIONS.map((tab) => (
                  <Tab key={tab} label={tab} value={tab} />
                ))}
              </Tabs>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 2,
                }}
              >
                <Typography variant="h6">{filterStatus}</Typography>
              </Box>
            </Card>
          </Grid>
          {isLoading && !dataFiltered?.length ? (
            <Grid item xs={12}>
              <LoadingSection count={4} />
            </Grid>
          ) : !isLoading && !dataFiltered.length ? (
            <Grid item xs={12}>
              <NoDataFoundCard label="payments" />
            </Grid>
          ) : (
            dataFiltered.map((payment) => (
              <Grid item xs={12} sm={6} md={4} key={payment._id}>
                {filterStatus === 'Rent Payments' ? (
                  <RentPaymentCard payment={payment} style={{ height: '100%' }} />
                ) : (
                  <RoomyPayCard
                    title={type}
                    commission={userCommissionFee}
                    payment={payment}
                    setSelected={filterStatus === 'Roomy Pay' ? handleSelectPayment : () => {}}
                    selected={Boolean(
                      filterStatus === 'Roomy Pay' && selectedPayments[payment._id]
                    )}
                    style={{ height: '100%' }}
                  />
                )}
              </Grid>
            ))
          )}

          {!isLoading && filterStatus !== 'Payment History' ? (
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: 'purple' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 2,
                  }}
                >
                  {filterStatus === 'Rent Payments' ? (
                    <>
                      <Typography variant="h6">
                        {fCurrency(userDetails?.user?.accountBalance) || 0} AED
                      </Typography>

                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => setOpen(true)}
                      >
                        Withdraw
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                  {filterStatus === 'Roomy Pay' ? (
                    <>
                      <Typography variant="h6">
                        {fCurrency(selectedRoomyPayAmount) || 0} AED
                      </Typography>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={handleRoomyPay}
                      >
                        Pay to Roomy
                      </Button>
                    </>
                  ) : (
                    ''
                  )}
                </Box>
              </Card>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Container>
      <WithdrawAmountPopover open={open} onClose={() => setOpen(false)} userId={userId} />
    </>
  );
}

export function RoomyPayCard({ title, payment, commission, setSelected, selected }) {
  const { adUnitCode, ad, client, paymentMethod, rentFee, createdAt } = payment || {};
  return (
    <Card
      sx={{ padding: 2, border: selected ? '2px solid orange' : '', cursor: 'pointer' }}
      onClick={() => {
        if (title === 'Roomy Pay') setSelected(payment);
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography
            sx={{
              maxWidth: '176px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {adUnitCode || 'N/A'}, {ad?.address?.buildingName || 'N/A'}
          </Typography>
          <Typography>Paid by {client?.fullName || 'N/A'}</Typography>
          <Typography>{fDate(createdAt) || 'N/A'}</Typography>
        </Box>
        <Box>
          <Typography>{paymentMethod || 'N/A'}</Typography>
          <Typography variant="h6">
            {fCurrency(title === 'Roomy Pay' ? rentFee + commission : rentFee) || 0} AED
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
}

RoomyPayCard.propTypes = {
  payment: PropTypes.object.isRequired,
  setSelected: PropTypes.func,
  selected: PropTypes.bool,
  title: PropTypes.string,
  commission: PropTypes.number,
};

export function RentPaymentCard({ payment }) {
  const { objectId, createdAt } = payment || {};
  return (
    <Card sx={{ padding: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography
            sx={{
              maxWidth: '176px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {objectId?.adUnitCode || 'N/A'}, {objectId?.ad?.address?.buildingName || 'N/A'}
          </Typography>
          <Typography>Paid By {objectId?.client?.fullName || 'N/A'}</Typography>
          <Typography>{fDate(createdAt) || 'N/A'}</Typography>
        </Box>
        <Box>
          <Typography>{objectId?.paymentMethod || 'N/A'}</Typography>
          <Typography variant="h6">{fCurrency(objectId?.rentFee) || 0} AED</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

RentPaymentCard.propTypes = {
  payment: PropTypes.object.isRequired,
};

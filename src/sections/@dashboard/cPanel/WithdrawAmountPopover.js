import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Popover, Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from '../../../redux/store';
import { getUser } from '../../../redux/slices/userCPanel';
import { API_URL } from '../../../config-global';
import axiosInstance from '../../../utils/axios';
import { useSnackbar } from '../../../components/snackbar';

WithdrawAmountPopover.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  userId: PropTypes.object,
};

export default function WithdrawAmountPopover({ open, onClose, userId }) {
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { userDetails } = useSelector((store) => store.userCPanel);

  const [amount, setAmount] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [paypalWithdrawLoading, setPaypalWithdrawLoading] = useState(false);
  const [stripeConnectLoading, setStripeConnectLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleConnectToStripe = async () => {
    try {
      setStripeConnectLoading(true);
      const response = await axiosInstance.post(
        `${API_URL}/payout/stripe/connected-account/${userId}`,
        { user_login: true }
      );
      window.location.href = response.data.accountLink;
    } catch (error) {
      enqueueSnackbar(error.code, { variant: 'error' });
    } finally {
      setStripeConnectLoading(false);
    }
  };

  const handleStripeWithdraw = async () => {
    if (!amount) {
      setErrors('Please enter amount');
      return;
    }
    try {
      setWithdrawLoading(true);
      const response = await axiosInstance.post(`${API_URL}/payout/stripe/withdraw`, {
        currency: 'AED',
        amount,
      });
      if (response.data.code === 'done') {
        enqueueSnackbar('Withdraw Success', { variant: 'success' });
        dispatch(getUser(userId));
        onClose();
      }
    } catch (error) {
      enqueueSnackbar(error.code, { variant: 'error' });
    } finally {
      setWithdrawLoading(false);
      setErrors(null);
      setSelectedMethod('');
    }
  };

  const handlePaypalWithdraw = async () => {
    if (!amount || !email) {
      setErrors('Please enter both amount and email');
      return;
    }
    try {
      setPaypalWithdrawLoading(true);
      const response = await axiosInstance.post(`${API_URL}/payout/paypal/withdraw/${userId}`, {
        email,
        amount,
      });
      if (response.data.code === 'done') {
        enqueueSnackbar('Withdraw Request Sent Check Your Notification', { variant: 'success' });
        dispatch(getUser(userId));
        onClose();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.code, { variant: 'error' });
    } finally {
      setPaypalWithdrawLoading(false);
      setErrors(null);
      setSelectedMethod('');
    }
  };

  const textFieldStyle = {
    marginBottom: '10px',
  };

  const buttonStyle = {
    marginRight: '10px',
  };

  useEffect(() => {
    setErrors(null);
    setSelectedMethod('');
  }, [open]);

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <Card sx={{ p: 2 }}>
        <Stack spacing={3}>
          {errors && <div style={{ color: 'red' }}>{errors}</div>}
          <TextField
            label="Withdraw Amount"
            onChange={(e) => setAmount(e.target.value)}
            style={textFieldStyle}
          />

          <LoadingButton
            variant="contained"
            color="error"
            loading={withdrawLoading}
            disabled={withdrawLoading}
            onClick={() => setSelectedMethod('STRIPE')}
            // onClick={handleStripeWithdraw}
            style={buttonStyle}
          >
            Credit/ Debit Card
          </LoadingButton>

          <LoadingButton
            variant="contained"
            color="primary"
            style={buttonStyle}
            onClick={() => setSelectedMethod('PAYPAL')}
          >
            Paypal
          </LoadingButton>

          {selectedMethod === 'PAYPAL' && (
            <>
              <TextField
                label="Paypal Email"
                onChange={(e) => setEmail(e.target.value)}
                style={textFieldStyle}
              />
              <LoadingButton
                onClick={handlePaypalWithdraw}
                loading={paypalWithdrawLoading}
                disabled={paypalWithdrawLoading}
                variant="contained"
                color="primary"
              >
                Withdraw
              </LoadingButton>
            </>
          )}

          {selectedMethod === 'STRIPE' && (
            <>
              {userDetails?.user?.stripeConnectId ? (
                <LoadingButton
                  variant="contained"
                  color="error"
                  loading={withdrawLoading}
                  disabled={withdrawLoading}
                  onClick={handleStripeWithdraw}
                  style={buttonStyle}
                >
                  Withdraw
                </LoadingButton>
              ) : (
                <LoadingButton
                  variant="contained"
                  color="error"
                  onClick={handleConnectToStripe}
                  loading={stripeConnectLoading}
                  disabled={stripeConnectLoading}
                  style={buttonStyle}
                >
                  Connect Stripe
                </LoadingButton>
              )}
            </>
          )}
        </Stack>
      </Card>
    </Popover>
  );
}

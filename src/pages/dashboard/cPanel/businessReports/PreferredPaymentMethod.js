import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  CircularProgress,
  Box,
  Avatar,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { API_URL } from '../../../../config-global';

const defaultData = {
  currentUser: {
    userId: '',
    paymentMethods: [],
    totalCommissions: 0,
  },
  otherLandlords: {
    totalOtherLandlords: 0,
    preferredPayment: {
      cash: 0,
      credit: 0,
      mix: 0,
    },
    totalCommissions: {
      cashCommission: 0,
      creditCommission: 0,
      paypalCommission: 0,
    },
  },
};

export default function PreferredPaymentMethod() {
  const { userId } = useParams();
  const [payments, setPayments] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPaymentData() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_preferred_payment_method/${userId}`
        );
        setPayments(data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchPaymentData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const { currentUser, otherLandlords } = payments;

  return (
    <Box sx={{ margin: 'auto', mt: 4, maxWidth: 1200 }}>
      {/* Main Card */}
      <Card sx={{ boxShadow: 4, borderRadius: 4, overflow: 'hidden', backgroundColor: '#f9f9f9' }}>
        <Box sx={{ backgroundColor: '#1976d2', color: 'white', p: 3 }}>
          <Typography variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
            Landlord Preferred Payment Methods
          </Typography>
        </Box>

        {/* Main Content */}
        <CardContent>
          <Grid container spacing={4}>
            {/* Current User Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, boxShadow: 2, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                  Current User Payment Methods
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Payment Methods */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  {currentUser.paymentMethods.length > 0 ? (
                    <>
                      {currentUser.paymentMethods.includes('CASH') && (
                        <Grid item>
                          <IconButton>
                            <LocalAtmIcon fontSize="large" style={{ color: 'green' }} />
                          </IconButton>
                          <Typography variant="body1" align="center">
                            Cash
                          </Typography>
                        </Grid>
                      )}
                      {currentUser.paymentMethods.includes('CARD') && (
                        <Grid item>
                          <IconButton>
                            <CreditCardIcon fontSize="large" style={{ color: 'blue' }} />
                          </IconButton>
                          <Typography variant="body1" align="center">
                            Credit
                          </Typography>
                        </Grid>
                      )}
                      {currentUser.paymentMethods.includes('PAYPAL') && (
                        <Grid item>
                          <IconButton>
                            <CreditCardIcon fontSize="large" style={{ color: '#ffc107' }} />
                          </IconButton>
                          <Typography variant="body1" align="center">
                            Paypal
                          </Typography>
                        </Grid>
                      )}
                    </>
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body2" align="center">
                        No Payment Methods found
                      </Typography>
                    </Grid>
                  )}
                </Grid>

                {/* Total Commissions */}
                <Box
                  sx={{ textAlign: 'center', backgroundColor: '#f1f8e9', p: 2, borderRadius: 2 }}
                >
                  <Typography variant="subtitle1" color="textSecondary">
                    Total Commissions Paid:
                  </Typography>
                  <Typography variant="h5" color="secondary" sx={{ fontWeight: 'bold' }}>
                    ${currentUser.totalCommissions.toLocaleString()}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Other Landlords Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, boxShadow: 2, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
                  Other Landlords Payment Preferences
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {/* Payment Preferences */}
                <Grid container spacing={2} justifyContent="center">
                  {[
                    {
                      type: 'Cash',
                      count: otherLandlords.preferredPayment.cash,
                      icon: <LocalAtmIcon />,
                      color: 'green',
                    },
                    {
                      type: 'Credit',
                      count: otherLandlords.preferredPayment.credit,
                      icon: <CreditCardIcon />,
                      color: 'blue',
                    },
                    {
                      type: 'Mix',
                      count: otherLandlords.preferredPayment.mix,
                      icon: <MonetizationOnIcon />,
                      color: '#ff9800',
                    },
                  ].map((method, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box sx={{ textAlign: 'center', p: 2, borderRadius: 3, bgcolor: '#f3f4f6' }}>
                        <IconButton>{method.icon}</IconButton>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {method.type}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                          {method.count} Landlords
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>

            {/* Total Commission Breakdown */}
            <Grid item xs={12} mt={4}>
              <Typography variant="h6" color="secondary" sx={{ mb: 2, fontWeight: 'bold' }}>
                Total Commission Breakdown
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={2}>
                {[
                  {
                    type: 'Cash Commission',
                    amount: otherLandlords.totalCommissions.cashCommission,
                    color: 'green',
                  },
                  {
                    type: 'Credit Commission',
                    amount: otherLandlords.totalCommissions.creditCommission,
                    color: 'blue',
                  },
                  {
                    type: 'Paypal Commission',
                    amount: otherLandlords.totalCommissions.paypalCommission,
                    color: '#ff9800',
                  },
                ].map((commission, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box sx={{ textAlign: 'center', p: 2, borderRadius: 2, bgcolor: '#e0f7fa' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {commission.type}:
                      </Typography>
                      <Typography
                        variant="h5"
                        color={commission.color}
                        sx={{ fontWeight: 'bold', mt: 1 }}
                      >
                        ${commission.amount.toLocaleString()}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

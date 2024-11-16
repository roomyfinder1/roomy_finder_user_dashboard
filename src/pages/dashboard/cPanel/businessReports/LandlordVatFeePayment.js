import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Divider,
  Paper,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../../config-global';

export default function LandlordVatFeePayment() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [vatData, setVatData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVatData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_vat_fee/${userId}`
        );
        setVatData(data);
      } catch (err) {
        setError('Failed to load VAT payments');
      } finally {
        setLoading(false);
      }
    };

    fetchVatData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!vatData || Object.keys(vatData).length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No VAT data found</Typography>
      </Box>
    );
  }

  const { totalVatPaid, vatDistribution } = vatData;

  return (
    <Box mt={4} p={2}>
      <Typography variant="h4" gutterBottom textAlign="center" color="primary">
        Landlord VAT Fee Payment
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Grid container spacing={3}>
          {/* Total VAT Paid Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total VAT Paid
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Typography variant="h4" color="primary">
                  ${totalVatPaid?.toLocaleString() || '0'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* VAT Distribution Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  VAT Distribution
                </Typography>
                <Divider sx={{ my: 1 }} />
                {vatDistribution ? (
                  <>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>DLD VAT:</strong> ${vatDistribution.dldVat?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>DED VAT:</strong> ${vatDistribution.dedVat?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      <strong>DTD VAT:</strong> ${vatDistribution.dtdVat?.toLocaleString() || '0'}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Roomy VAT:</strong> $
                      {vatDistribution.roomyVat?.toLocaleString() || '0'}
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    VAT distribution data is not available.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

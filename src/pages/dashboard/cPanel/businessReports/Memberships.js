import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  CircularProgress,
  LinearProgress,
  Tooltip,
  Divider,
  Paper,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { API_URL } from '../../../../config-global';

export default function Memberships() {
  const { userId } = useParams();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberships = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_properties_membership_details/${userId}`
        );
        setMemberships(data.membershipHistory || []);
      } catch (err) {
        setError(err?.response?.data?.message || 'Something went wrong');
        toast.error(err?.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchMemberships();
  }, [userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#333' }}>
        Membership History
      </Typography>
      <Grid container spacing={3}>
        {memberships.map((membership, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {membership.type} Membership
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Status:</strong> {membership.status}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Period:</strong> {membership.period}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Price:</strong> {membership.price} {membership.currency}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Start Date:</strong> {dayjs(membership.startDate).format('MMMM D, YYYY')}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>End Date:</strong> {dayjs(membership.endDate).format('MMMM D, YYYY')}
                </Typography>

                <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
                  Usage:
                </Typography>

                {['regularPost', 'premiumPost', 'instagramStory', 'instagramPost'].map((item) => (
                  <Tooltip
                    key={item}
                    title={`${membership.benefits[`${item}Left`]}/${
                      membership.benefits[item]
                    } left`}
                  >
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2">{item.replace(/([A-Z])/g, ' $1')}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={parseFloat(membership.benefits[`${item}UsagePercentage`])}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: '#e0e0e0',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            backgroundColor: '#1976d2',
                          },
                        }}
                      />
                      <Typography variant="caption">
                        {membership.benefits[`${item}UsagePercentage`]}% used
                      </Typography>
                    </Box>
                  </Tooltip>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Toaster />
    </Box>
  );
}

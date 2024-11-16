import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../../config-global'; // Update with your actual API URL

export default function MaintenancePayments() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [maintenanceData, setMaintenanceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_maintenance_payments/${userId}`
        );
        setMaintenanceData(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong');
        setLoading(false);
      }
    };

    fetchMaintenanceData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h4" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  if (!maintenanceData) {
    return (
      <Typography align="center" mt={4}>
        No maintenance payment data found
      </Typography>
    );
  }

  const { totalPaid, majorProblem, similarProblems } = maintenanceData;

  return (
    <Box mt={4} sx={{ width: '90%', maxWidth: '1200px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom color="primary" align="center">
        Maintenance Payments Overview
      </Typography>

      {/* Total Payments Card */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Paid for Maintenance
              </Typography>
              <Typography variant="h4" color="primary">
                ${totalPaid}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Major Problem Card */}
        <Grid item xs={12} sm={6}>
          <Card sx={{ backgroundColor: '#ffe0b2', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Major Maintenance Issue
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {majorProblem.description}
              </Typography>
              <Typography variant="body1">
                <strong>Occurrences:</strong> {majorProblem.count}
              </Typography>
              <Typography variant="body1">
                <strong>First Occurrence:</strong>{' '}
                {new Date(majorProblem.firstOccurrence).toLocaleDateString()}
              </Typography>
              <Typography variant="body1">
                <strong>Locations:</strong>
              </Typography>
              <List>
                {majorProblem.locations.map((location, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={location} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Similar Problems Card */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#c8e6c9', boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Similar Maintenance Issues
              </Typography>
              {similarProblems.length > 0 ? (
                <List>
                  {similarProblems.map((problem, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Problem: ${problem.title || problem.description}`}
                        secondary={`Date: ${new Date(
                          problem.startDate
                        ).toLocaleDateString()} - Location: ${problem.address?.street}, ${
                          problem.address?.city
                        }`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                'No Problems found'
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

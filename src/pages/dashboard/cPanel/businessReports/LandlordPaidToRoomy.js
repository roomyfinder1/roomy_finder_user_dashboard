import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../../config-global';

export default function LandlordPaidToRoomy() {
  const { userId } = useParams();
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_paid_to_roomy/${userId}`
        );
        setTransactionsData(data);
      } catch (err) {
        setError('Error fetching payment data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!transactionsData) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="error">
          No data found
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={3} sx={{ backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <Typography variant="h4" gutterBottom>
        Landlord&apos;s Payment to Roomy
      </Typography>

      {/* Total Payment */}
      <Typography variant="h6" gutterBottom>
        Total Payment:{' '}
        <span style={{ color: '#007bff' }}>${transactionsData.totalPayment.toFixed(2)}</span>
      </Typography>

      {/* Average Monthly Payment */}
      <Typography variant="h6" gutterBottom>
        Average Monthly Payment:{' '}
        <span style={{ color: '#28a745' }}>${transactionsData.avgMonthlyPayment}</span>
      </Typography>

      {/* Benefit Analysis Table */}
      <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Total Payment</TableCell>
              <TableCell>Services</TableCell>
              <TableCell>Bookings Received</TableCell>
              <TableCell>Benefit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionsData.benefitAnalysis.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.month}</TableCell>
                <TableCell>${row.totalPayment.toFixed(2)}</TableCell>
                <TableCell>
                  {Object.entries(row.services).map(([service, amount], i) => (
                    <Typography variant="body2" key={i}>
                      {service}: ${amount.toFixed(2)}
                    </Typography>
                  ))}
                </TableCell>
                <TableCell>{row.bookingsReceived}</TableCell>
                <TableCell>{row.benefit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

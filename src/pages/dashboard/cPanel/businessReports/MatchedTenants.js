/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from '@mui/material';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';
import { API_URL } from '../../../../config-global';

export default function MatchedTenants() {
  const { userId } = useParams(); // Get userId and category from URL parameters
  const location = useLocation();
  const [tenantsData, setTenantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page for pagination

  const categoryPreferences = location.state;

  useEffect(() => {
    async function fetchMatchedTenants() {
      try {
        setLoading(true);
        // Use categoryPreferences in your request body or query
        const { data } = await axios.post(
          `${API_URL}/c_panel/business_report/landlord_property_matched_tenants_by_category/${userId}`,
          categoryPreferences // This will send the preferences to your API
        );
        setTenantsData(data.matchedTenants);
      } catch (err) {
        setError('Error fetching tenants');
      } finally {
        setLoading(false);
      }
    }

    if (categoryPreferences) {
      fetchMatchedTenants(); // Fetch only if categoryPreferences is available
    }
  }, [userId, categoryPreferences]); // Add categoryPreferences to dependencies

  // Handle pagination page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page changes
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Pagination logic
  const paginatedData = tenantsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Matched Tenants
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Id</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Phone</strong>
              </TableCell>
              <TableCell>
                <strong>Gender</strong>
              </TableCell>
              <TableCell>
                <strong>City</strong>
              </TableCell>
              {/* <TableCell>
                <strong>Preferred Location</strong>
              </TableCell> */}
              <TableCell align="right">
                <strong>Nationality</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((tenant, index) => (
              <TableRow key={index}>
                <TableCell>{tenant.standardCode}</TableCell>
                <TableCell>
                  {tenant.firstName} {tenant.lastName}
                </TableCell>
                <TableCell>{tenant.email || '-'}</TableCell>
                <TableCell>{tenant.phone || '-'}</TableCell>
                <TableCell>{tenant.gender || 'Not specified'}</TableCell>
                <TableCell>{tenant.city}</TableCell>
                {/* <TableCell>{tenant.preferedLocations.join(', ')}</TableCell> */}
                <TableCell align="right">{tenant.country || 'Not specified'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={tenantsData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

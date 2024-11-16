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
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../../config-global';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function LandlordPreferences() {
  const { userId } = useParams();
  const [preferencesData, setPreferencesData] = useState([]); // Always initialize as an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Initial rows per page for pagination
  const [expandedRow, setExpandedRow] = useState(null); // Track which row is expanded
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPreferencesData() {
      try {
        setLoading(true);

        // Check if data is cached in localStorage
        const cachedData = localStorage.getItem(`landlordPreferences_${userId}`);
        if (cachedData) {
          setPreferencesData(JSON.parse(cachedData)); // Use cached data
        } else {
          const { data } = await axios.get(
            `${API_URL}/c_panel/business_report/landlord_preferences/${userId}`
          );

          if (data && data.categories && Array.isArray(data.categories)) {
            setPreferencesData(data.categories); // Ensure it's an array

            // Cache the data in localStorage
            localStorage.setItem(`landlordPreferences_${userId}`, JSON.stringify(data.categories));
          } else {
            throw new Error('Invalid data format');
          }
        }
      } catch (err) {
        console.error(err); // Log the actual error for debugging
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPreferencesData();
  }, [userId]);

  // Handle table page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  // Toggle row expansion
  const handleRowExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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

  if (!Array.isArray(preferencesData)) {
    return <Typography color="error">Unexpected data format. Please try again.</Typography>;
  }

  // Pagination logic
  const paginatedData = preferencesData.length
    ? preferencesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : [];

  const handleNavigate = (preferences) => {
    const data = {
      nationality: preferences.nationality,
      gender: preferences.gender,
      workingStatus: preferences.workingStatus,
      relationshipStatus: preferences.relationshipStatus,
      city: preferences.city,
      area: preferences.area,
    };
    navigate(PATH_DASHBOARD.c_panel.user_business_report_matched_tenants(userId), {
      state: data,
    });
  };

  return (
    <Box sx={{ margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Landlord Preferences & Matched Tenants
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Category Name</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Tenant Count</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Details</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((category, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>
                      <Button onClick={() => handleNavigate(category.preferences)}>
                        {category.category || 'N/A'}
                      </Button>
                    </TableCell>
                    <TableCell align="right">{category.matchedTenants || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleRowExpand(index)}
                        aria-expanded={expandedRow === index}
                      >
                        <ExpandMore />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                      <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                        <Box margin={2}>
                          <Typography variant="subtitle1">Category Details</Typography>
                          <Typography variant="body2">
                            <strong>Nationality:</strong>{' '}
                            {category.preferences.nationality || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Gender:</strong> {category.preferences.gender || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Working Status:</strong>{' '}
                            {category.preferences.workingStatus || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Relationship Status:</strong>{' '}
                            {category.preferences.relationshipStatus || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>City:</strong> {category.preferences.city || 'N/A'}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Area:</strong> {category.preferences.area || 'N/A'}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={preferencesData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Box,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkIcon from '@mui/icons-material/Work';
import { API_URL } from '../../../../config-global';

const defaultData = {
  landlordPreferences: [],
};

const colors = [
  '#ffecb3', // Light Yellow
  '#c8e6c9', // Light Green
  '#bbdefb', // Light Blue
  '#f8bbd0', // Light Pink
];

export default function LandlordPreferences() {
  const { userId } = useParams();
  const [preferencesData, setPreferencesData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedProperty, setExpandedProperty] = useState(null);
  const [matchedTenants, setMatchedTenants] = useState([]);
  const [loadingTenants, setLoadingTenants] = useState(false);

  useEffect(() => {
    async function fetchPreferencesData() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}/c_panel/business_report/landlord_preferences/${userId}`
        );
        setPreferencesData(data);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    }

    fetchPreferencesData();
  }, [userId]);

  const fetchMatchedTenants = async (propertyId) => {
    try {
      setLoadingTenants(true);
      const { data } = await axios.get(
        `${API_URL}/c_panel/business_report/landlord_property_matched_tenants/${userId}?propertyId=${propertyId}`
      );
      setMatchedTenants(data.matchedTenants);
    } catch (err) {
      setError('Error fetching matched tenants');
    } finally {
      setLoadingTenants(false);
    }
  };

  const handleToggle = (index, propertyId) => {
    if (expandedProperty === index) {
      setExpandedProperty(null);
      setMatchedTenants([]); // Clear tenants when collapsing
    } else {
      setExpandedProperty(index);
      fetchMatchedTenants(propertyId); // Fetch tenants when expanding
    }
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

  const { landlordPreferences } = preferencesData;

  const renderFallback = (value, fallback = 'Not Available') => value || fallback;

  return (
    <Box sx={{ margin: 'auto', mt: 4, maxWidth: 1000 }}>
      <Typography variant="h5" gutterBottom align="center">
        Landlord Preferences & Matched Tenants
      </Typography>

      {landlordPreferences.length > 0 ? (
        landlordPreferences.map((property, index) => (
          <Card
            key={index}
            sx={{ marginBottom: 4, backgroundColor: colors[index % colors.length], boxShadow: 3 }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Property {index + 1} : {property?.propertyName}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* Property Information */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Nationality:</Typography>
                  <Typography>{renderFallback(property?.preferences?.nationality)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Preferred Gender:</Typography>
                  <Typography>{renderFallback(property?.preferences?.gender)}</Typography>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Age Range:</Typography>
                  <Typography>{renderFallback(property.age)}</Typography>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Work Status:</Typography>
                  <Typography>
                    {renderFallback(property?.preferences?.workingStatus?.workingStatus)}
                  </Typography>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Budget:</Typography>
                  <Typography>
                    {property.budget ? `$${property.budget.join(', ')}` : 'Not Available'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Language:</Typography>
                  <Typography>{renderFallback(property.language)}</Typography>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">RelationShip Status:</Typography>
                  <Typography>
                    {renderFallback(property?.preferences?.relationshipStatus)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">City:</Typography>
                  <Typography>{renderFallback(property?.preferences?.city)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Area:</Typography>
                  <Typography>{renderFallback(property?.preferences?.area)}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Toggle Button for Matched Tenants */}
              <Button
                variant="outlined"
                onClick={() => handleToggle(index, property.propertyId)}
                sx={{ mb: 2, color: 'primary.main', borderColor: 'primary.main' }}
              >
                {expandedProperty === index ? 'Hide Matched Tenants' : 'Show Matched Tenants'}
              </Button>

              {/* Matched Tenants Section */}
              {expandedProperty === index && (
                <>
                  {loadingTenants ? (
                    <CircularProgress />
                  ) : (
                    <>
                      <Typography variant="h6" gutterBottom>
                        Matched Tenants
                      </Typography>

                      {/* Horizontal Scrolling Box for Tenant Cards */}
                      <Box
                        sx={{
                          overflowX: 'auto',
                          display: 'flex',
                          flexWrap: 'nowrap',
                          paddingBottom: 2,
                        }}
                      >
                        {matchedTenants.length > 0 ? (
                          matchedTenants.map((tenant, tIndex) => (
                            <Card key={tIndex} sx={{ minWidth: 250, marginRight: 2, padding: 2 }}>
                              <Avatar sx={{ bgcolor: 'primary.main', marginBottom: 1 }}>
                                <PersonIcon />
                              </Avatar>
                              <ListItemText
                                primary={tenant?.fullName ? tenant?.fullName : 'Name Not Available'}
                                secondary={
                                  <>
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      Nationality: {renderFallback(tenant?.nationality)}
                                    </Typography>
                                    <br />
                                    <Typography
                                      component="span"
                                      variant="body2"
                                      color="textPrimary"
                                    >
                                      Gender: {renderFallback(tenant.gender)}
                                    </Typography>
                                    <br />
                                    <LocationOnIcon fontSize="small" />
                                    {`${renderFallback(
                                      tenant.country,
                                      'Country Not Available'
                                    )}, ${renderFallback(tenant.city, 'City Not Available')}`}
                                    <br />
                                    <LanguageIcon fontSize="small" />{' '}
                                    {renderFallback(tenant.language)}
                                    <br />
                                    <AttachMoneyIcon fontSize="small" /> Budget: $
                                    {tenant.budget || 'N/A'}
                                    <br />
                                    <WorkIcon fontSize="small" /> Work Status:{' '}
                                    {renderFallback(tenant?.aboutMe?.workingStatus)}
                                  </>
                                }
                              />
                            </Card>
                          ))
                        ) : (
                          <Typography>
                            No tenants matched the landlord’s preferences for this property.
                          </Typography>
                        )}
                      </Box>
                    </>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No landlord preferences found.</Typography>
      )}
    </Box>
  );
}

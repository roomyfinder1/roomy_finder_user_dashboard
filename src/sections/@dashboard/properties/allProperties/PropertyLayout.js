/* eslint-disable no-unsafe-optional-chaining */
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Card,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

// components
import { useSettingsContext } from '../../../../components/settings';
// sections
import {
  BookingRoomAvailable,
  BookingWidgetSummary,
  BookingCheckInWidgets,
} from '../../general/booking';
import PropertyBookedRoom from './PropertyBookedRoom';
import { TotalPropertyIncoms } from '../../general/properties';
import { TableHeadCustom } from '../../../../components/table';
import { UniqueCode } from '../../general/app';
import { PATH_DASHBOARD } from '../../../../routes/paths';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Property Id', label: 'Property Id', align: 'left' },
  { id: 'Landlord Id', label: 'Landlord Id', align: 'center' },
  { id: 'Monthly Price', label: 'Monthly Price', align: 'center' },
  { id: 'Deposit Price', label: 'Deposit Price', align: 'center' },
  { id: 'Unit Type', label: 'Unit Type', align: 'center' },
  { id: 'Units', label: 'Units', align: 'center' },
  // { id: 'Available', label: 'Available', align: 'center' },
];

// ----------------------------------------------------------------------

PropertyLayout.propTypes = {
  properties: PropTypes.array,
  totalBookings: PropTypes.array,
  bookings: PropTypes.array,
  title: PropTypes.string,
  todayBookings: PropTypes.array,
  monthlyBookings: PropTypes.array,
  cancelledBookings: PropTypes.array,
  activeBookings: PropTypes.array,
  weekData: PropTypes.array,
  extraData: PropTypes.array,
  state: PropTypes.array,

  BookedRoomLine1Title: PropTypes.string,
  BookedRoomLine2Title: PropTypes.string,
  BookedRoomLine3Title: PropTypes.string,
  BookedRoomLine1: PropTypes.array,
  BookedRoomLine2: PropTypes.array,
  BookedRoomLine3: PropTypes.array,
  isMembership: PropTypes.bool,

  firstRowFirstColumn: PropTypes.object,
  firstRowSecondColumn: PropTypes.object,
  firstRowThirdColumn: PropTypes.object,
};

export default function PropertyLayout({
  properties,
  totalBookings,
  bookings,
  title,
  todayBookings,
  monthlyBookings,
  cancelledBookings,
  activeBookings,
  weekData,
  extraData,
  state,
  BookedRoomLine1Title,
  BookedRoomLine2Title,
  BookedRoomLine3Title,
  BookedRoomLine1,
  BookedRoomLine2,
  BookedRoomLine3,

  firstRowFirstColumn,
  firstRowSecondColumn,
  firstRowThirdColumn,
  isMembership,
}) {
  const navigate = useNavigate();

  const theme = useTheme();
  const { themeStretch } = useSettingsContext();

  const [areaBookings, setAreaBookings] = useState({});

  const calculateUnits = () => {
    const totalQuantity = properties.reduce(
      (accumulator, property) => accumulator + property.quantity,
      0 // 0 is the initial value for the accumulator
    );
    return totalQuantity;
  };

  const calculateUnitTypesCount = () => {
    const unitTypeCounts = {};

    properties.forEach((property) => {
      if (!unitTypeCounts[property.type]) {
        unitTypeCounts[property.type] = property.quantity;
      } else {
        unitTypeCounts[property.type] += property.quantity;
      }
    });

    return unitTypeCounts;
  };

  const calculateGenderUnits = () => {
    const genderTypeCount = {};

    bookings.forEach((booking) => {
      const gender = booking?.client?.gender;
      if (gender) {
        if (!genderTypeCount[gender]) {
          genderTypeCount[gender] = 1;
        } else {
          genderTypeCount[gender] += 1;
        }
      }
    });
    const maxKey = Object.keys(genderTypeCount).reduce((a, b) =>
      genderTypeCount[a] > genderTypeCount[b] ? a : b
    );

    return maxKey;
  };

  const getTopNationality = () => {
    const nationalityCount = {};

    properties.forEach((property) => {
      const nationality = property?.socialPreferences?.nationality;
      if (nationality) {
        if (!nationalityCount[nationality]) {
          nationalityCount[nationality] = 1;
        } else {
          nationalityCount[nationality] += 1;
        }
      }
    });
    const maxKey = Object.keys(nationalityCount).reduce((a, b) =>
      nationalityCount[a] > nationalityCount[b] ? a : b
    );

    return maxKey;
  };

  const getTopRentUnit = () => {
    const topRentUnitCount = {};

    bookings.forEach((booking) => {
      const unit = booking?.ad?.type;
      if (unit) {
        if (!topRentUnitCount[unit]) {
          topRentUnitCount[unit] = 1;
        } else {
          topRentUnitCount[unit] += 1;
        }
      }
    });
    const maxKey = Object.keys(topRentUnitCount).reduce((a, b) =>
      topRentUnitCount[a] > topRentUnitCount[b] ? a : b
    );

    return maxKey;
  };

  const getBookingsStatus = useCallback(() => {
    const unitTypeCounts = {};

    bookings.forEach((booking) => {
      if (!unitTypeCounts[booking.status]) {
        unitTypeCounts[booking.status] = [];
      }
      unitTypeCounts[booking.status].push(booking);
    });
    return unitTypeCounts;
  }, [bookings]);

  useEffect(() => {
    setAreaBookings(getBookingsStatus());
  }, [getBookingsStatus]);

  return (
    <>
      <Helmet>
        <title>Property | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ padding: 3 }}>
              <Typography textAlign="center" variant="h5">
                {title}
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} height="100%">
            <Card height="100%">
              <Stack
                direction="row"
                justifyContent="space-around"
                sx={{ py: 3, px: 1 }}
                alignItems="center"
              >
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Total Properties
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {properties.length || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Total Units
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateUnits() || 0}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} height="100%">
            <Card height="100%">
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ py: 3, px: 1 }}
                alignItems="center"
              >
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Bed
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateUnitTypesCount().Bed || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Room
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateUnitTypesCount().Room || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Partition
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateUnitTypesCount().Partition || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    M.Room
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateUnitTypesCount()['Master Room'] || 0}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} height="100%">
            <Card height="100%">
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ py: 3, px: 1 }}
                alignItems="center"
              >
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Top Rent Unit
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {getTopRentUnit() || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Nationality
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {getTopNationality() || 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ mr: '4px' }}>
                  <Typography variant="body1" textAlign="center" sx={{ marginBottom: 1 }}>
                    Gender
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                      variant="body1"
                      sx={{ paddingX: 3, py: 1, border: '2px solid', borderRadius: 1 }}
                    >
                      {calculateGenderUnits() || 'Male'}
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TotalPropertyIncoms
                  categories={{
                    Month: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                  }}
                  percent={2.6}
                  chart={{
                    series: [111, 136, 76, 108, 74, 54, 57, 84],
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <PropertyBookedRoom
                  title="Booked Room"
                  BookedRoomLine1={areaBookings.pending?.length}
                  BookedRoomLine2={areaBookings.cancelled?.length}
                  BookedRoomLine3={areaBookings.offered?.length}
                  BookedRoomLine1Title="Pending"
                  BookedRoomLine2Title="Cancel"
                  BookedRoomLine3Title="Active"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <BookingCheckInWidgets
                  chart={{
                    colors: [theme.palette.warning.main],
                    series: [
                      {
                        label: `Total LandLord rent`,
                        percent: 90 ? ((90 * 100) / (90 + 50)).toFixed(2) : 0,
                        total: 50 || 0,
                      },
                      {
                        label: 'Total paid roomy',
                        percent: 70 ? ((70 * 100) / (90 + 70)).toFixed(2) : 0,
                        total: 70 || 0,
                      },
                    ],
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <BookingRoomAvailable
              title="All Bookings"
              total={
                getBookingsStatus().offered?.length + getBookingsStatus().cancelled?.length || 0
              }
              chart={{
                series: [
                  { label: 'Active', value: areaBookings?.offered?.length },
                  {
                    label: 'Cancelled',
                    value: areaBookings?.cancelled?.length,
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Table>
                <TableHeadCustom headLabel={TABLE_HEAD} />
                <TableBody>
                  {properties.map((property) => (
                    <TableRow key={property._id}>
                      <TableCell
                        onClick={() =>
                          navigate(PATH_DASHBOARD.properties.property_details, {
                            state: property,
                          })
                        }
                      >
                        <UniqueCode code={property.standardCode} />
                      </TableCell>
                      <TableCell
                        align="center"
                        onClick={() =>
                          navigate(`/dashboard/user/profile/${property.poster._id}`, {
                            state: { state: property.poster },
                          })
                        }
                      >
                        <UniqueCode code={property.poster.standardCode} />
                      </TableCell>
                      <TableCell align="center">{property.monthlyPrice}</TableCell>
                      <TableCell align="center">{property.depositPrice || 'N/A'}</TableCell>
                      <TableCell align="center">{property.type || 'N/A'}</TableCell>
                      <TableCell align="center">{property.quantity || 0}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

FirstRowFirstBox.propTypes = {
  bodyData: PropTypes.object,
};

export function FirstRowFirstBox({ bodyData }) {
  const { title, total, icon } = bodyData;
  const IconComponent = icon;
  return <BookingWidgetSummary title={title} total={total} icon={<IconComponent />} />;
}

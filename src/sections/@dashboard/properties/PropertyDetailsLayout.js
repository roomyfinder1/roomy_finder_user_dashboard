import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// components
import { useSettingsContext } from '../../../components/settings';
// sections
import PropertyWidgetSummary from './PropertyWidgetSummary';
import PropertyWidgetTwoSummary from './PropertyWidgetTwoSummary';
import PropertyTotalIncomes from '../general/properties/PropertyTotalIncomes';
import { BookingCheckInWidgets, BookingRoomChart } from '../general/properties';
import PropertyUnitWidgetSummary from './PropertyUnitWidgetSummary';
import LandlordBookingStatusPercentage from '../accounts/Landlord/LandlordBookingStatusPercentage';
import LoadingSection from '../../../components/loading/LoadingSection';

// ----------------------------------------------------------------------

PropertyDetailsLayout.propTypes = {
  title: PropTypes.string,
  properties: PropTypes.object,
  totalUnits: PropTypes.array,
  totalBookings: PropTypes.array,
  bookingCharges: PropTypes.object,

  showUnits: PropTypes.bool,
  loading: PropTypes.bool,
  filteredBookings: PropTypes.object,

  firstRowFirstColumn: PropTypes.object,
  firstRowSecondColumn: PropTypes.object,
  firstRowThirdColumn: PropTypes.object,
};

export default function PropertyDetailsLayout({
  title,
  properties,
  totalUnits,
  totalBookings,
  bookingCharges,

  showUnits,
  loading,
  filteredBookings,

  firstRowFirstColumn,
  firstRowSecondColumn,
  firstRowThirdColumn,
}) {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const monthlyData = {
    JAN: 0,
    FEB: 0,
    MAR: 0,
    APR: 0,
    MAY: 0,
    JUN: 0,
    JUL: 0,
    AUG: 0,
    SEP: 0,
    OCT: 0,
    NOV: 0,
    DEC: 0,
  };

  totalBookings?.forEach((user) => {
    const createdAtDate = user.createdAt;
    const month = moment(createdAtDate).format('MMM').toUpperCase();
    const bookingMonth = moment(createdAtDate).month();
    const bookingYear = moment(createdAtDate).year();
    const thisMonth = moment().month();
    const thisYear = moment().year();

    if (user.status === 'terminated') {
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }

      if (thisMonth >= bookingMonth && bookingYear === thisYear) {
        monthlyData[month] += user.commissionFee;
      }
    }
  });

  return (
    <>
      <Helmet>
        <title>Booking | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        {loading ? (
          <LoadingSection />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <PropertyWidget bodyData={firstRowFirstColumn} />
            </Grid>

            <Grid item xs={12} md={4}>
              <PropertyWidgetTwo bodyData={firstRowSecondColumn} />
            </Grid>

            {showUnits ? (
              <Grid item xs={12} md={4}>
                <PropertyUnitWidget
                  bodyData={{
                    units: totalUnits,
                    booking: false,
                    country: 'arab',
                    gender: 'male',
                    title: 'units',
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={12} md={4}>
                <PropertyWidget bodyData={firstRowThirdColumn} />
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <PropertyTotalIncomes
                    total={firstRowSecondColumn.total || 0}
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
                      series: Object.keys(monthlyData)?.length
                        ? Object.keys(monthlyData)?.map((week) => monthlyData[week])
                        : [111, 136, 76, 108, 74, 54, 57, 84],
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <LandlordBookingStatusPercentage
                    title="Booked Room"
                    BookedRoomLine1={filteredBookings?.Pending?.length || 0}
                    BookedRoomLine2={filteredBookings?.Cancelled?.length}
                    BookedRoomLine3={filteredBookings?.Active?.length || 0}
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
                          label: `Total landlord Fee`,
                          percent: (
                            (bookingCharges.rent / bookingCharges.total) * 100 || 0
                          ).toFixed(2),
                          total: bookingCharges.rent || 0,
                        },
                        {
                          label: 'Total Paid roomy',
                          percent: (
                            (bookingCharges.commission / bookingCharges.total) * 100 || 0
                          ).toFixed(2),
                          total: bookingCharges?.commission || 0,
                        },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
              <BookingRoomChart
                title="All Users"
                height={390}
                chart={{
                  colors: [
                    theme.palette.info.main,
                    theme.palette.secondary.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ],
                  series: [
                    {
                      label: 'Landlord Rent',
                      value: bookingCharges.rent || 0,
                    },
                    { label: 'Commission FEE', value: bookingCharges.commission },
                    {
                      label: 'VAT Fee',
                      value: bookingCharges.vat || 0,
                    },
                    {
                      label: 'Service Fee',
                      value: bookingCharges.serviceFee || 0,
                    },
                  ],
                }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}

PropertyWidget.propTypes = {
  bodyData: PropTypes.object,
  total: PropTypes.number,
};

export function PropertyWidget({ bodyData }) {
  const { title, total, icon } = bodyData;
  const IconComponent = icon;
  return <PropertyWidgetSummary title={title} total={total} icon={<IconComponent />} />;
}

PropertyWidgetTwo.propTypes = {
  bodyData: PropTypes.object,
  total: PropTypes.number,
};

export function PropertyWidgetTwo({ bodyData }) {
  const { title, total, title2, total2, icon } = bodyData;
  const IconComponent = icon;
  return (
    <PropertyWidgetTwoSummary
      title={title}
      total={total}
      title2={title2}
      total2={total2}
      icon={<IconComponent />}
    />
  );
}

PropertyUnitWidget.propTypes = {
  bodyData: PropTypes.object,
};

export function PropertyUnitWidget({ bodyData }) {
  const { title, country, gender, units, booking } = bodyData;
  return (
    <PropertyUnitWidgetSummary
      booking={booking}
      units={units}
      title={title}
      country={country}
      gender={gender}
    />
  );
}

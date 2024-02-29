import React from 'react';
import { Container, Card, Grid, Stack, Typography, styled } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSettingsContext } from '../../../components/settings';
import { fDate } from '../../../utils/formatTime';

// Styled Typography component for "Stack"
const StylesStack = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
});

// Styled Typography component for "value"
const ValueTypography = styled(Typography)({
  marginLeft: 5,
  fontWeight: 'bold',
});

export default function UserMaintenanceDetails() {
  const { state } = useLocation();
  const maintenance = state;
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : '80%'}>
      <Card sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Category:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.category}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Sub Category:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance.subCategory}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Problems:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.problems.join(', ')}
              </ValueTypography>
            </StylesStack>

            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Budget:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance.budget} {maintenance.currency}
              </ValueTypography>
            </StylesStack>
          </Grid>
          <Grid item xs={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Status:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance.status}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Posted On:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {fDate(maintenance.createdAt)}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Start Date:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {fDate(maintenance.startDate)}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                End Date:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {fDate(maintenance.endDate)}
              </ValueTypography>
            </StylesStack>
          </Grid>
          <Grid item xs={12}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Description:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.description}
              </ValueTypography>
            </StylesStack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Address:</Typography>
          </Grid>
          <Grid item xs={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Apartment Number:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.apartmentNumber}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Building Number:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.buildingNumber}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Building Name:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.buildingName}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Street:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.street}
              </ValueTypography>
            </StylesStack>
          </Grid>
          <Grid item xs={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                State:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.state}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                City:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.city}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Apartment Number:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {maintenance?.address?.apartmentNumber}
              </ValueTypography>
            </StylesStack>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

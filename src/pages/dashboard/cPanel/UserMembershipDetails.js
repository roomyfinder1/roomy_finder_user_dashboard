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

export default function UserMembershipDetails() {
  const { state } = useLocation();
  const membership = state;
  const { themeStretch } = useSettingsContext();

  return (
    <Container maxWidth={themeStretch ? false : '80%'}>
      <Card sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Membership Type:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.type}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Membership Status:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.status}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Purchases On:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {fDate(membership.startDate)}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Expires On:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {fDate(membership.endDate)}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Price:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.price} {membership.currency}
              </ValueTypography>
            </StylesStack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Total Regular Posts:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.regularPost}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Regular Posts Left:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.regularPostLeft}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Total Premium Posts:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.premiumPost}
              </ValueTypography>
            </StylesStack>
            <StylesStack>
              <Typography variant="body1" gutterBottom>
                Premium Posts Left:
              </Typography>
              <ValueTypography variant="body1" gutterBottom>
                {membership.premiumPostLeft}
              </ValueTypography>
            </StylesStack>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

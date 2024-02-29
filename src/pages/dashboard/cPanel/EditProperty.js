import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
// @mui
import { Container, LinearProgress } from '@mui/material';
// components
import { useSettingsContext } from '../../../components/settings';
// sections
import EditUserPropertyForm from '../../../sections/@dashboard/cPanel/EditUserPropertyForm';

// ----------------------------------------------------------------------

export default function EditProperty() {
  const { themeStretch } = useSettingsContext();

  const { state } = useLocation();

  const property = state;

  return (
    <>
      <Helmet>
        <title> Property: Edit Property | CRM</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        {property ? (
          <EditUserPropertyForm isEdit currentProduct={property} />
        ) : (
          <Container maxWidth="sm" height="60vh" my="auto">
            <LinearProgress size="small" />
          </Container>
        )}
      </Container>
    </>
  );
}

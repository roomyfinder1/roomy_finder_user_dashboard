import React, { useEffect, useState } from 'react';
import { Container, Card, Grid, Stack, Typography, styled, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate, useParams } from 'react-router-dom';
import { useSettingsContext } from '../../../components/settings';
import { fDate } from '../../../utils/formatTime';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import axiosInstance from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { API_URL } from '../../../config-global';
import { CardLoading } from '../../../components/loading';

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
  const { enqueueSnackbar } = useSnackbar();
  const [maintenance, setMaintenance] = useState(null);
  const [loading, setLoading] = useState(true);

  const { maintenanceId } = useParams();

  const navigate = useNavigate();
  const { themeStretch } = useSettingsContext();

  const [openConfirm, setOpenConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteMaintenance = async () => {
    try {
      setIsDeleting(true);
      const { data } = await axiosInstance.delete(
        `${API_URL}/maintenance/delete_maintenance/${maintenance._id}`
      );
      if (data) {
        setIsDeleting(false);
        setOpenConfirm(false);
        navigate(-1);
        enqueueSnackbar(`Successfully deleted maintenance`);
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    } finally {
      setOpenConfirm(false);
    }
  };

  const handleNavigateToEditMaintenance = () => {
    navigate(PATH_DASHBOARD.maintenance.edit_maintenance, {
      state: { isEdit: true, maintenanceProject: maintenance },
    });
  };

  useEffect(() => {
    const getMaintenance = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `${API_URL}/maintenance/get_maintenance/${maintenanceId}`
        );
        setMaintenance(data);
      } catch (error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    getMaintenance();
  }, [enqueueSnackbar, maintenanceId]);
  return (
    <>
      {loading ? (
        <CardLoading height={400} />
      ) : (
        <Container maxWidth={themeStretch ? false : '80%'}>
          <Stack direction="row">
            <Button onClick={handleNavigateToEditMaintenance}>Edit</Button>
            <Button onClick={() => setOpenConfirm(true)}>Delete</Button>
          </Stack>
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

          <ConfirmDialog
            open={openConfirm}
            onClose={() => setOpenConfirm(false)}
            title="Delete"
            content={
              <>
                Are you sure want to <strong> Delete </strong>?
              </>
            }
            action={
              <LoadingButton
                variant="contained"
                color="error"
                loading={isDeleting}
                disabled={isDeleting}
                onClick={() => {
                  handleDeleteMaintenance();
                }}
              >
                Logout
              </LoadingButton>
            }
          />
        </Container>
      )}
    </>
  );
}

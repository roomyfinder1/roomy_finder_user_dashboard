/* eslint-disable no-nested-ternary */
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Grid, Container, Stack, Button, CardContent, Card, Typography } from '@mui/material';
// components
import { useSettingsContext } from '../../../components/settings';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsCarousel,
} from '../../../sections/@dashboard/properties/details';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useDispatch, useSelector } from '../../../redux/store';
import { useSnackbar } from '../../../components/snackbar';
import { deleteUserProperty, getPostDetails } from '../../../redux/slices/userCPanel';
import { SkeletonProductDetails } from '../../../components/skeleton';

// ----------------------------------------------------------------------

export default function PropertyDetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userPost, isLoading, error } = useSelector((store) => store.userCPanel);

  const { postId } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettingsContext();

  const { property } = userPost;

  const handleEdit = () => {
    navigate(PATH_DASHBOARD.c_panel.edit_property(property._id), {
      state: property,
    });
  };

  const handleDeleteProperty = async () => {
    dispatch(deleteUserProperty(property._id));
  };

  useEffect(() => {
    dispatch(getPostDetails(postId));
  }, [dispatch, postId]);

  return (
    <>
      <Helmet>
        <title>{`Property: ${property?.name || ''} | CRM`}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : '90%'}>
        {isLoading && !error ? (
          <SkeletonProductDetails />
        ) : !isLoading && !error && property ? (
          <>
            <Stack direction="row" justifyContent="flex-end">
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="warning" onClick={handleDeleteProperty}>
                Delete
              </Button>
            </Stack>
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={property} />
                </Grid>

                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary product={property} />
                </Grid>
              </Grid>
            </Card>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {property?.units?.map((unit) => (
                <Grid item xs={12} sm={6} md={3} sx={{ p: 2 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Unit code: {unit.code}</Typography>
                      <Typography>Monthly Price : {unit.monthlyPrice || 'N/A'}</Typography>
                      <Typography>Weekly Price : {unit.weeklyPrice || 'N/A'}</Typography>
                      <Typography>Daily Price : {unit.dailyPrice || 'N/A'}</Typography>
                      <Typography>
                        Is Available: {unit.isAvailable ? 'Available' : 'Not Available'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Card sx={{ mt: 3, p: 3 }}>
              <Stack>
                <Typography variant="h6">Description: </Typography>
                <Typography>{property?.description}</Typography>
              </Stack>
            </Card>
          </>
        ) : (
          'Something went wrong'
        )}
      </Container>
    </>
  );
}

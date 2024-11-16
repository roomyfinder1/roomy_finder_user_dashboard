/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Card, Typography, Box, Button, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { deleteUserProperty, getUserProperties } from '../../../redux/slices/userCPanel';

// components
import Image from '../../../components/image';
import ConfirmDialog from '../../../components/confirm-dialog';
import CardsLoading from '../../../sections/loading/CardsLoading';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function UserProperties() {
  const dispatch = useDispatch();
  const { userId } = useParams();

  const { userProperties, isLoading } = useSelector((store) => store.userCPanel);
  const [propertyValues, setPropertyValues] = useState({
    properties: 0,
    units: 0,
    availableUnits: 0,
    bookedUnits: 0,
  });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = (property) => {
    setSelectedProperty(property);
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setSelectedProperty(null);
    setOpenConfirm(false);
  };

  const handleDeleteProperty = async () => {
    dispatch(deleteUserProperty(selectedProperty._id));
  };

  useEffect(() => {
    const getPropertiesDetails = () => {
      const units = userProperties.flatMap((property) => property.units);
      const currentDate = new Date();
      const bookedUnits = units.filter(
        (unit) => !unit.availabilityDate || new Date(unit.availabilityDate) >= currentDate
      );
      const availableUnits = units.filter(
        (unit) => unit.availabilityDate && new Date(unit.availabilityDate) < currentDate
      );

      setPropertyValues({
        properties: userProperties.length,
        units: units.length,
        availableUnits: availableUnits.length,
        bookedUnits: bookedUnits.length,
      });
    };

    getPropertiesDetails();
  }, [userProperties]);

  useEffect(() => {
    dispatch(getUserProperties(userId));
  }, [dispatch, userId]);

  const handleOnEditClick = () => {};

  return (
    <>
      <Helmet>
        <title> User Properties | CRM </title>
      </Helmet>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DetailedCard title="Total Properties" value={propertyValues.properties} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DetailedCard title="Total Units" value={propertyValues.units} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DetailedCard title="Available Units" value={propertyValues.availableUnits} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DetailedCard title="Booked Units" value={propertyValues.bookedUnits} />
          </Grid>

          <Grid item container xs={12} spacing={3}>
            {isLoading && !userProperties.length ? (
              <CardsLoading count={4} />
            ) : !isLoading && !userProperties.length ? (
              <Grid item xs={12}>
                <Card sx={{ padding: 2 }}>
                  <Typography textAlign="center" variant="h6">
                    No Properties Found
                  </Typography>
                </Card>
              </Grid>
            ) : (
              userProperties.map((property) => (
                <Grid item xs={12} sm={6} md={3} key={property._id}>
                  <PropertyCard
                    property={property}
                    onEditClick={handleOnEditClick}
                    onDeleteClick={() => handleOpenConfirm(property)}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Container>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> Selected </strong> Property?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteProperty();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

DetailedCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};

export function DetailedCard({ title, value }) {
  return (
    <Card sx={{ padding: 3 }}>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="body1">{title}</Typography>
    </Card>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.object,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

export function PropertyCard({ property, onEditClick, onDeleteClick }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ padding: 2 }}>
      <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 4 }}>
        <Button color="error" onClick={() => onDeleteClick(property)}>
          Delete
        </Button>
      </Box>
      <Image sx={{ borderRadius: 1.5 }} alt="property" src={property.images[0]} ratio="3/4" />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ my: 1 }}>{property.standardCode}</Typography>
        <Typography>Views: {property.viewCounts}</Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button
          variant="contained"
          onClick={() =>
            navigate(PATH_DASHBOARD.c_panel.edit_property(property._id), {
              state: property,
            })
          }
        >
          Edit
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(PATH_DASHBOARD.c_panel.user_view_property_details(property._id))}
        >
          View
        </Button>
      </Stack>
    </Card>
  );
}

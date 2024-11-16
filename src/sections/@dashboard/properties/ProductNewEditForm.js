/* eslint-disable arrow-body-style */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button, IconButton, Alert } from '@mui/material';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFUpload,
  RHFTextField,
  RHFVideoUpload,
  RHFSwitch,
  RHFLocationAutoComplete,
  RHFMultiCheckbox,
} from '../../../components/hook-form';

import { storage } from '../../../firebase/index';
import axiosInstance from '../../../utils/axios';
import { useDispatch } from '../../../redux/store';
import { API_URL } from '../../../config-global';
// import { getAll_Property_Date_Wise, getProperties } from '../../../redux/slices/Properties';
import Iconify from '../../../components/iconify';
import { AMENITIES_OPTIONS } from '../../../utils/PostRoommateOptions';
import { getLandlord } from '../../../redux/slices/landlord';
import { getVideoThumbnail } from '../../../utils/getVideoThumbnail';

// ----------------------------------------------------------------------

// Define your list of amenities

const Gender = ['Male', 'Female', 'Mix'];
const unitCodes = {
  'Master Room': 'MR',
  'Bed Space': 'BE',
  'Regular Room': 'RM',
  Studio: 'ST',
  Partition: 'PA',
};

const Nationality = [
  'Mix',
  'African',
  'American',
  'Arab',
  'Asian',
  'Australian',
  'Bengali',
  'Eastern European',
  'European',
  'Filipino',
  'Indian',
  'Latino',
  'Nepali',
  'Pakistani',
  'Russian',
  'Turkish',
];

const preferedTenants = ['Male', 'Female', 'Mix'];
const partnerStatuses = ['Single', 'Couple', 'Family'];
const workingStatuses = ['Working', 'Not Working', 'Does not  matter'];

// ----------------------------------------------------------------------

ProductNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
  userData: PropTypes.object,
};

export default function ProductNewEditForm({ isEdit, currentProduct, userData }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const [uploading, setUploading] = useState(false);

  const NewProductSchema = Yup.object().shape({
    city: Yup.string().required('City is required'),
    location: Yup.string().required('Area is required'),
    buildingName: Yup.string(),
    appartmentNumber: Yup.string(),
    floorNumber: Yup.string(),

    type: Yup.string().required('Type is required'),
    isBookable: Yup.boolean(),

    // units
    units: Yup.array()
      .of(
        Yup.object().shape({
          type: Yup.string().nullable(),
          monthlyPrice: Yup.string().nullable(),
          weeklyPrice: Yup.string().nullable(),
          dailyPrice: Yup.string().nullable(),
          depositPrice: Yup.string().nullable(),
          commissionFee: Yup.string().nullable(),
          billIncluded: Yup.boolean().nullable(),
        })
      )
      .min(1, 'At least one Unit is required')
      .required('units are required'),
    numberOfPeople: Yup.string(),
    gender: Yup.string(),
    nationality: Yup.string(),
    smoking: Yup.boolean(),
    drinking: Yup.boolean(),
    visitors: Yup.boolean(),
    amenities: Yup.array(),
    images: Yup.array().nullable(),
    videos: Yup.array().nullable(),
    files: Yup.array().of(
      Yup.object().shape({
        url: Yup.string().url().required(),
        thumbnail: Yup.string().url().nullable().optional(),
        size: Yup.number().required(),
        originalName: Yup.string().required(),
        imageData: Yup.mixed().nullable().optional(),
        videoData: Yup.mixed().nullable().optional(),
        documentData: Yup.mixed().nullable().optional(),
        audioData: Yup.mixed().nullable().optional(),
        mimeType: Yup.string().nullable().optional(),
        createdAt: Yup.date().nullable().optional(),
        updatedAt: Yup.date().nullable().optional(),
        status: Yup.string().nullable().optional(),
        description: Yup.string().nullable().optional(),
      })
    ),

    description: Yup.string(),
    isPremium: Yup.boolean(),
    onlyEdit: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      city: currentProduct?.address.city || '',
      location: currentProduct?.address.location || '',
      buildingName: currentProduct?.address.buildingName || '',
      appartmentNumber: currentProduct?.address.appartmentNumber || '',
      floorNumber: currentProduct?.address.floorNumber || '',
      type: currentProduct?.type || '',
      // units
      units: [...(currentProduct?.units || [])],

      isBookable: currentProduct?.isBookable || false,

      endsOn: 1,

      // preferences
      numberOfPeople: currentProduct?.preferences?.numberOfPeople
        ? currentProduct?.preferences?.numberOfPeople
        : 0,
      partneredStatus: currentProduct?.preferences?.partneredStatus || '',
      preferredTenant: currentProduct?.preferences?.preferredTenant || '',
      workingStatus: currentProduct?.preferences?.workingStatus || '',
      gender: currentProduct?.preferences?.gender || Gender[2],
      nationality: currentProduct?.preferences?.nationality || Nationality[0],
      smoking: currentProduct?.preferences?.smoking || false,
      drinking: currentProduct?.preferences?.drinking || false,
      visitors: currentProduct?.preferences?.visitors || false,
      pet: currentProduct?.preferences?.pet || false,
      sharedMealAndCooking: currentProduct?.preferences?.sharedMealAndCooking || false,

      amenities: currentProduct?.amenities || [],

      images: currentProduct?.images || [],
      videos: currentProduct?.videos || [],

      description: currentProduct?.description || '',
      onlyEdit: true,
      isPremium: currentProduct?.isPremium || false,
      files: currentProduct?.files || [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async (data) => {
    try {
      const address = {
        countryCode: 'AE',
        city: values.city,
        location: values.location,
        buildingName: values.buildingName,
        appartmentNumber: values.appartmentNumber,
        floorNumber: values.floorNumber,
      };

      const preferences = {
        partneredStatus: values.partneredStatus,
        preferredTenant: values.preferredTenant,

        workingStatus: values.workingStatus,
        numberOfPeople: values.numberOfPeople,
        gender: values.gender,
        nationality: values.nationality,
        smoking: values.smoking,
        drinking: values.drinking,
        visitors: values.visitors,
        sharedMealAndCooking: values.sharedMealAndCooking,
        pet: values.pet,
      };
      const obj = {
        type: values.type,
        amenities: values.amenities,
        images: values.images,
        videos: values.videos,
        isBookable: values.isBookable,
        isPremium: values.isPremium,
        depositPrice: Number(values.depositPrice),
        description: values.description,
        units: values.units,
        currency: 'AED',
        address,
        preferences,
        files: values.files,
      };

      if (!isEdit) {
        const tokenResponse = await axiosInstance.post(`${API_URL}/landlord/landlord-token`, {
          email: userData.email,
        });

        const landlordToken = `bearer ${tokenResponse.data.token}`;
        await axiosInstance.post(
          `${API_URL}/property/post-property`,
          { ...obj, endsOn: values.endsOn },
          {
            headers: { Authorization: landlordToken },
          }
        );
      } else {
        try {
          const response = await axiosInstance.put(
            `${API_URL}/property/edit-property/${currentProduct._id}`,
            {
              ...obj,
              onlyEdit: values.onlyEdit,
              isPremium: !values.onlyEdit ? values.isPremium : currentProduct.isPremium,
            }
          );
          if (response.status === 200) {
            await dispatch(getLandlord(currentProduct.poster));
            // await dispatch(getAll_Property_Date_Wise());
          }
        } catch (error) {
          enqueueSnackbar('Something went wrong', { variant: 'error' });
          console.log(error);
        }
      }

      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(-1);
    } catch (error) {
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      console.log(error);
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      try {
        setUploading(true);

        // Process each accepted file and upload it to storage
        const newFileURLs = await Promise.all(
          acceptedFiles.map(async (file) => {
            let storageRef = '';
            let thumbnail = '';

            // Determine storage path based on file type
            if (file.type.includes('image')) {
              storageRef = ref(storage, `postAndEditProperty/images/${file.name}`);
            } else if (file.type.includes('video')) {
              storageRef = ref(storage, `postAndEditProperty/videos/${file.name}`);
              thumbnail = await getVideoThumbnail(file);
            }

            // Upload the file to Firebase storage
            await uploadBytesResumable(storageRef, file);

            // Get the download URL after the upload
            const url = await getDownloadURL(storageRef);

            // Create a file object to return
            const newFile = {
              size: file.size,
              url,
              originalName: file.name,
              mimeType: file.type,
              createdAt: new Date(file.lastModified),
              thumbnail: thumbnail || url,
            };

            return newFile;
          })
        );

        // Update form values with the new files
        setValue('files', [...values.files, ...newFileURLs]);
      } catch (error) {
        console.error('Error uploading files:', error);
      } finally {
        setUploading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setValue, values.files]
  );

  // const handleDropVideo = useCallback(
  //   async (acceptedFiles) => {
  //     try {
  //       setUploading(true);
  //       const newImageURLs = await Promise.all(
  //         acceptedFiles.map(async (file) => {
  //           const storageRef = ref(storage, `postAndEditProperty/videos/${file.name}`);
  //           await uploadBytesResumable(storageRef, file);
  //           const url = await getDownloadURL(storageRef);
  //           return url;
  //         })
  //       );
  //       setValue('videos', [...values.videos, newImageURLs]);
  //     } catch (error) {
  //       console.error('Error uploading videos:', error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   },
  //   [setValue, values.videos]
  // );

  const handleRemoveFile = (inputFile) => {
    const filtered =
      values.files && values.files?.filter((file) => file.originalName !== inputFile.originalName);
    setValue('files', filtered);
  };

  const handleRemoveAllFiles = () => {
    const files = values.files.filter((f) => !f.mimeType.includes('image'));
    setValue('files', files);
  };

  // const handleRemoveVideoFile = (inputFile) => {
  //   const filtered = values.videos && values.videos?.filter((file) => file !== inputFile);
  //   setValue('videos', filtered);
  // };

  const handleRemoveAllVideoFiles = () => {
    const files = values.files.filter((f) => !f.mimeType.includes('video'));
    setValue('files', files);
  };

  // Handle checkbox changes
  // const handleAmenityChange = (amenity) => {
  //   const selectedAmenities = values.amenities || [];
  //   if (selectedAmenities.includes(amenity)) {
  //     // If the amenity is already selected, remove it from the list
  //     setValue(
  //       'amenities',
  //       selectedAmenities.filter((item) => item !== amenity)
  //     );
  //   } else {
  //     // If the amenity is not selected, add it to the list
  //     setValue('amenities', [...selectedAmenities, amenity]);
  //   }
  // };

  // add new unit
  const handleAddUnit = () => {
    const { type } = values.units[0] || 'Bed Space';
    const count = values.units.filter((unit) => unit.type === type).length;
    const code = unitCodes[type];

    setValue('units', [
      ...values.units,
      {
        code: code ? `${code}${count + 1}` : '',
        monthlyPrice: null,
        weeklyPrice: null,
        dailyPrice: null,
        depositPrice: null,
        commissionFee: null,
        billIncluded: false,
        type,
      },
    ]);
  };

  const handleSetUnitType = (value, index) => {
    const { units } = values;
    const count = units.filter((unit) => unit.type === value).length;
    const code = unitCodes[value];
    units[index] = { ...units[index], code: `${code}${count + 1}`, type: value };
    setValue('units', units);
  };

  const handleRemoveUnit = (index) => {
    const { units } = values;
    units.splice(index, 1);

    setValue('units', units);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <RHFLocationAutoComplete name="city" label="City" />
                <RHFLocationAutoComplete name="location" label="Area" city={values.city} />

                <RHFTextField name="buildingName" label="Tower Name" />
                <RHFTextField name="appartmentNumber" label="Apartment Number" />
                <RHFTextField name="floorNumber" label="Floor Number" />

                <RHFSelect native name="type" label="Property Type" placeholder="Property Type">
                  <option value="" />
                  {['Bed Space', 'Partition', 'Regular Room', 'Master Room', 'Studio'].map(
                    (value, id) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    )
                  )}
                </RHFSelect>
              </Box>
            </Card>

            {/* units card */}

            {values.units.map((unit, index) => (
              <Card sx={{ p: 3 }} key={index}>
                <IconButton
                  sx={{ position: 'absolute', right: 5 }}
                  color="error"
                  onClick={() => handleRemoveUnit(index)}
                >
                  <Iconify icon="gg:close-o" />
                </IconButton>

                <Typography sx={{ mb: 1 }}>{unit.code ? unit.code : 'xxxx1'}</Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={6}>
                    <RHFSelect
                      native
                      disabled={currentProduct?.haveDifferentUnitPrices || false}
                      name={`units[${index}].type`}
                      label="Unit Type"
                      placeholder="Unit Type"
                      value={unit.type}
                      onChange={(e) => handleSetUnitType(e.target.value, index)}
                    >
                      <option value="" />
                      {['Bed Space', 'Partition', 'Regular Room', 'Master Room', 'Studio'].map(
                        (value, id) => (
                          <option key={id} value={value}>
                            {value}
                          </option>
                        )
                      )}
                    </RHFSelect>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name={`units[${index}].monthlyPrice`} label="Monthly Price" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name={`units[${index}].weeklyPrice`} label="Weekly Price" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name={`units[${index}].dailyPrice`} label="Daily Price" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name={`units[${index}].depositPrice`} label="Deposit Price" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFTextField name={`units[${index}].commissionFee`} label="Commission Fee" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <RHFSwitch name={`units[${index}].billIncluded`} label="Bill Included" />
                  </Grid>
                </Grid>
              </Card>
            ))}
            <Button variant="outlined" name="units" onClick={handleAddUnit}>
              Add Unit
            </Button>
            {errors && errors.units && (
              <Typography color="error" variant="body2">
                Select atleast one unit
              </Typography>
            )}

            {/* images and videos card */}
            <Card sx={{ p: 3 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Images
                    </Typography>

                    <RHFUpload
                      multiple
                      thumbnail
                      name="files"
                      type="image"
                      maxSize={3145728}
                      loading={uploading}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllFiles}
                      onUpload={() => console.log('ON UPLOAD')}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Videos
                    </Typography>

                    <RHFVideoUpload
                      multiple
                      thumbnail
                      name="files"
                      type="video"
                      maxSize={3145733428}
                      loading={uploading}
                      // onDrop={handleDropVideo}
                      onDrop={handleDrop}
                      onRemove={handleRemoveFile}
                      onRemoveAll={handleRemoveAllVideoFiles}
                      onUpload={() => console.log('ON UPLOAD')}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Card>

            <Card sx={{ p: 3 }}>
              <RHFTextField name="description" label="Description" />
            </Card>

            <Card sx={{ p: 3, mt: 3 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Amenities
                </Typography>

                <RHFMultiCheckbox row spacing={4} name="amenities" options={AMENITIES_OPTIONS} />
              </Stack>
            </Card>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Typography>Preferences</Typography>
              <Stack spacing={3} mt={2}>
                <RHFTextField
                  name="numberOfPeople"
                  label="Number of people"
                  placeholder="Number of people"
                />

                <RHFSelect native name="gender" label="Gender" placeholder="Gender">
                  <option value="" />
                  {Gender.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect native name="nationality" label="Nationality">
                  <option value="" />
                  {Nationality.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect native name="preferredTenant" label="Preferred Tenant">
                  <option value="" />
                  {preferedTenants.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect native name="partneredStatus" label="Partner status">
                  <option value="" />
                  {partnerStatuses.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect native name="workingStatus" label="Working Status">
                  <option value="" />
                  {workingStatuses.map((value, id) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </RHFSelect>

                <RHFSelect
                  native
                  name="smoking"
                  label="Smoking Allowed"
                  placeholder="Smoking Allowed"
                  defaultValue={values.smoking ? 'Yes' : 'No'}
                >
                  {[
                    { key: 'Yes', value: true },
                    { key: 'No', value: false },
                  ].map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  native
                  name="drinking"
                  label="Drinking Allowed"
                  placeholder="Drinking Allowed"
                  defaultValue={values.drinking ? 'Yes' : 'No'}
                >
                  {[
                    { key: 'Yes', value: true },
                    { key: 'No', value: false },
                  ].map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  native
                  name="visitors"
                  label="Visitors Allowed"
                  placeholder="Visitors Allowed"
                  defaultValue={values.visitors ? 'Yes' : 'No'}
                >
                  {[
                    { key: 'Yes', value: true },
                    { key: 'No', value: false },
                  ].map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  native
                  name="sharedMealAndCooking"
                  label="Cooking"
                  defaultValue={values.sharedMealAndCooking ? 'Yes' : 'No'}
                >
                  {[
                    { key: 'Yes', value: true },
                    { key: 'No', value: false },
                  ].map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect
                  native
                  name="pet"
                  label="Pets Allowed"
                  defaultValue={values.pet === true ? 'Yes' : 'No'}
                >
                  {[
                    { key: 'Yes', value: true },
                    { key: 'No', value: false },
                  ].map((option, id) => (
                    <option key={id} value={option.value}>
                      {option.key}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <Grid container>
                  <Grid item xs={12}>
                    {!isEdit && (
                      <RHFSelect
                        native
                        name="endsOn"
                        label="Ends Period"
                        placeholder="Property End Period"
                      >
                        <option value="" />
                        {[
                          { value: 1, label: '1 Week' },
                          { value: 2, label: '2 weeks' },
                          { value: 4, label: '4 weeks' },
                        ].map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </RHFSelect>
                    )}
                    <RHFSwitch name="isBookable" label="Easy Booking" />
                    <RHFSwitch name="isPremium" label="Premium Post" />
                    {isEdit && (
                      <Alert
                        severity="info"
                        label="Premium posts are visible to all users and earn more fees."
                      >
                        To Make a PROPERTY PREMIUM need to disable the below edit only property
                      </Alert>
                    )}
                    {isEdit && <RHFSwitch name="onlyEdit" label="Edit only Property " />}
                  </Grid>
                </Grid>
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Post Property' : 'Update Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

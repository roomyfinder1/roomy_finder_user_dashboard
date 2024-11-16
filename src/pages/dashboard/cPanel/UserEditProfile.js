import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// eslint-disable-next-line import/no-extraneous-dependencies

// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';

import { storage } from '../../../firebase/index';

// axios
import axiosInstance from '../../../utils/axios';
// utils
import { fData } from '../../../utils/formatNumber';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFAutocomplete,
  RHFAutocompleteTwo,
  RHFLocationAutoComplete,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import { API_URL } from '../../../config-global';

import { nationalities } from '../../../utils/AllNationalitiesData';

// ----------------------------------------------------------------------

export default function UserNewEditForm() {
  const navigate = useNavigate();

  const { userId } = useParams();
  const { state } = useLocation();
  const user = state;

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    type: Yup.string().required('Type is required'),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Email must be a valid email address'
      ),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    gender: Yup.string().required('Gender is required'),
    languages: Yup.array().nullable(true),
    nationality: Yup.string().nullable(true),
    country: Yup.string().nullable(true),
    city: Yup.string().nullable(true),
    profilePicture: Yup.string().nullable(true),
  });

  const defaultValues = useMemo(
    () => ({
      type: user?.type || 'Landlord',
      email: user?.email || '',
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      gender: user?.gender || '',
      nationality: user?.aboutMe?.nationality || '',
      languages: user?.aboutMe?.languages || [],
      country: user?.country || '',
      city: user?.city || '',
      profilePicture: user?.profilePicture || null,
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      if (!values) {
        return;
      }

      const obj = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        gender: values.gender,
        country: values.country,
        city: values.city,
        aboutMe: {
          languages: values.languages,
          nationality: values.nationality,
        },
      };
      const response = await axiosInstance.put(`${API_URL}/c_panel/user_edit/${userId}`, obj);

      if (response.status === 201) {
        reset();
      }

      enqueueSnackbar('Update success!');
      navigate(-1);
    } catch (error) {
      if (error.code === 'user-exist') {
        enqueueSnackbar(error.code, { variant: 'error' });
      }
      console.log('tr', error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
      const storageRef = ref(storage, `crmUserProfile/images/${file.name}`);
      uploadBytesResumable(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then((url) => {
              setValue('profilePicture', url, { shouldValidate: true });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log('uploadError', err);
        });
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="profilePicture"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
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
              <RHFSelect native name="type" label="Type" placeholder="User Type">
                {['Landlord'].map((value) => (
                  <option key={value} value={value} disabled>
                    {value}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="email" label="Email Address" disabled />

              <RHFTextField name="firstName" label="First Name" />

              <RHFTextField name="lastName" label="Last Name" />

              <RHFSelect native name="gender" label="gender" placeholder="Gender">
                <option value="" />
                {['Male', 'Female'].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </RHFSelect>

              <RHFAutocompleteTwo
                name="languages"
                label="Languages"
                freeSolo
                options={[
                  'Arabic',
                  'Chinese',
                  'English',
                  'French',
                  'Hindi',
                  'Italian',
                  'Persian',
                  'Russian',
                  'Spanish',
                  'Tagalog',
                  'Ukrainian',
                  'Urdu',
                ].map((option) => option)}
                ChipProps={{ size: 'small' }}
              />
              <RHFAutocomplete
                name="nationality"
                label="Nationality"
                freeSolo
                options={nationalities.map((option) => option)}
                ChipProps={{ size: 'small' }}
              />

              <RHFLocationAutoComplete name="country" label="Country" />
              <RHFLocationAutoComplete name="city" label="City" city={values.country} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

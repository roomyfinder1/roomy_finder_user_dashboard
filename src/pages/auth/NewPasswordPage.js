import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
// sections
import AuthNewPasswordForm from '../../sections/auth/AuthNewPasswordForm';
// assets
import { SentIcon } from '../../assets/icons';
import axiosInstance from '../../utils/axios';
import { API_URL } from '../../config-global';
import { useSnackbar } from '../../components/snackbar';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const emailRecovery =
    typeof window !== 'undefined' ? sessionStorage.getItem('email-recovery') : '';

  const resendOtp = async (e) => {
    e.preventDefault();
    try {
      if (emailRecovery) {
        const { data } = await axiosInstance.post(`${API_URL}/send_reset_password_otp`, {
          email: emailRecovery,
        });
        sessionStorage.setItem('email-recovery', emailRecovery);

        if (data) {
          enqueueSnackbar('OTP resent successfully');
        } else {
          enqueueSnackbar('OTP sent failed PLease try again', {
            variant: 'error',
          });
        }
      } else {
        navigate(PATH_AUTH.resetPassword);
      }
    } catch (error) {
      enqueueSnackbar('OTP sent failed PLease try again', {
        variant: 'error',
      });
      console.error(error);
    }
  };

  return (
    <>
      <Helmet>
        <title> New Password | Minimal UI</title>
      </Helmet>

      <SentIcon sx={{ mb: 5, height: 96 }} />

      <Typography variant="h3" paragraph>
        Request sent successfully!
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        We&apos;ve sent a 6-digit confirmation email to your email.
        <br />
        Please enter the code in below box to verify your email.
      </Typography>

      <AuthNewPasswordForm />

      <Typography variant="body2" sx={{ my: 3 }}>
        Don’t have a code? &nbsp;
        <Link variant="subtitle2" onClick={resendOtp}>
          Resend code
        </Link>
      </Typography>

      <Link
        component={RouterLink}
        to={PATH_AUTH.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          mx: 'auto',
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:chevron-left-fill" width={16} />
        Return to sign in
      </Link>
    </>
  );
}

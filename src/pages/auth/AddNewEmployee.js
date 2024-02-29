import { Helmet } from 'react-helmet-async';
// sections
import Signup from '../../sections/auth/Signup';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> New Employee | Minimal UI</title>
      </Helmet>

      <Signup />
    </>
  );
}

/* eslint-disable import/no-extraneous-dependencies */
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckOutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51OmVdLSFQHzMcmo8iJD6e6Imklt4TSAnvbT7TmsClynhBCqBo2fkTyryOdvs6vOw8UxjI02jFbCo0HcRmd469CBM00q7ZwSS0o'
);

export default function Stripe() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret:
      'sk_test_51MxwlzH9LOtxbjsRBZInjzx1g1A8sn0IUQvRl5vuytPhggv6fpCSKF30uu8imu9Xrq5mpbrbSUzfskKez1jLl4tn00nDxEgSpq',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
}

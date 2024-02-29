// eslint-disable-next-line import/no-extraneous-dependencies
import { PaymentElement } from '@stripe/react-stripe-js';

function CheckoutForm() {
  return (
    <form>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CheckoutForm;

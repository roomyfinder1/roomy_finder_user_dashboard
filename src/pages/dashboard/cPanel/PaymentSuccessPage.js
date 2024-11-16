import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment. You will be redirected to the home page shortly.</p>
    </div>
  );
}

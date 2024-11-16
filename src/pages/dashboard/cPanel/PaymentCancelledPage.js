import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentCancellationPage() {
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
      <h1>Payment Cancelled</h1>
      <p>Your payment has been cancelled. You will be redirected to the home page shortly.</p>
    </div>
  );
}

/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async (tourId) => {
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`,
    );

    // 2. Create checkout form + charge credit card
    const stripe = await loadStripe(
      'pk_test_51PC0dKRurF39Vs71009w521eqjsAhfJ6qNo47GfSLGhrnZjIJvBzv5kG1isSxXovFGWG1WYmLzAjv1WhFrOkc1S600D24P2G4i',
    );
    stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

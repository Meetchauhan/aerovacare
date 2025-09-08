import { loadStripe } from '@stripe/stripe-js';

// Your Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51S4xZaE7Wt8CykKBoG4s83z4vnw4Tuj4nPRbE8XPjaG7Zzxub9XpfZWhzZ90jKtIcThd2FZb4PmGLST4cyOd4auv00U7AuYysZ';

let stripePromise;

// Initialize Stripe
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

// Process payment with Stripe
export const processPayment = async (paymentIntent) => {
  try {
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error, paymentIntent: confirmedPaymentIntent } = await stripe.confirmCardPayment(
      paymentIntent.client_secret,
      {
        payment_method: {
          card: {
            // Card details will be collected by Stripe Elements
          },
        },
      }
    );

    if (error) {
      throw new Error(error.message);
    }

    return confirmedPaymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

// Process payment with payment method
export const processPaymentWithMethod = async (clientSecret, paymentMethod) => {
  try {
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
};

// Create payment method
export const createPaymentMethod = async (cardElement) => {
  try {
    const stripe = await getStripe();
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      throw new Error(error.message);
    }

    return paymentMethod;
  } catch (error) {
    console.error('Payment method creation error:', error);
    throw error;
  }
};

export default getStripe;

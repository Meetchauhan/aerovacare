import React, { useState, useEffect, useRef } from 'react';
import { paymentApi, DONATION_TYPES, SUPPORTED_CURRENCIES, PAYMENT_LIMITS } from '../services/paymentApi';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51S4xZaE7Wt8CykKBoG4s83z4vnw4Tuj4nPRbE8XPjaG7Zzxub9XpfZWhzZ90jKtIcThd2FZb4PmGLST4cyOd4auv00U7AuYysZ');

export default function DonationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Donation details, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setSuccess] = useState(false);
  
  const [donationData, setDonationData] = useState({
    amount: '',
    currency: 'usd',
    donationType: 'general',
    donorName: '',
    donorEmail: '',
    message: '',
    isAnonymous: false
  });

  const [paymentIntent, setPaymentIntent] = useState(null);
  const [donationDetails, setDonationDetails] = useState(null);
  const [stripe, setStripe] = useState(null);
  const [elements, setElements] = useState(null);
  const [cardElement, setCardElement] = useState(null);
  const isInitialized = useRef(false);

  // Initialize Stripe Elements
  useEffect(() => {
    if (isOpen && step === 2 && !isInitialized.current) {
      const initializeStripe = async () => {
        const stripeInstance = await stripePromise;
        setStripe(stripeInstance);
        
        if (stripeInstance) {
          const elementsInstance = stripeInstance.elements();
          setElements(elementsInstance);
          
          const cardElementInstance = elementsInstance.create('card', {
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          });
          
          cardElementInstance.mount('#card-element');
          setCardElement(cardElementInstance);
          isInitialized.current = true;
        }
      };
      
      initializeStripe();
    }

    // Cleanup function to unmount elements when component unmounts or step changes
    return () => {
      if (cardElement) {
        cardElement.unmount();
        setCardElement(null);
        isInitialized.current = false;
      }
    };
  }, [isOpen, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const amount = parseFloat(value);
    
    if (amount < PAYMENT_LIMITS.MIN) {
      setError(`Minimum donation amount is $${PAYMENT_LIMITS.MIN}`);
    } else if (amount > PAYMENT_LIMITS.MAX) {
      setError(`Maximum donation amount is $${PAYMENT_LIMITS.MAX.toLocaleString()}`);
    } else {
      setError('');
    }
    
    setDonationData(prev => ({
      ...prev,
      amount: value
    }));
  };

  const handleCreatePaymentIntent = async () => {
    setLoading(true);
    setError('');

    try {
      const amount = parseFloat(donationData.amount);
      if (amount < PAYMENT_LIMITS.MIN || amount > PAYMENT_LIMITS.MAX) {
        throw new Error('Invalid donation amount');
      }

      const paymentData = {
        amount: Math.round(amount * 100), // Convert to cents
        currency: donationData.currency,
        donationType: donationData.donationType,
        donorName: donationData.donorName,
        donorEmail: donationData.donorEmail,
        message: donationData.message,
        isAnonymous: donationData.isAnonymous
      };

      const response = await paymentApi.createPaymentIntent(paymentData);
      console.log('Payment Intent Response:', response);
      
      if (!response?.success || !response?.data?.clientSecret) {
        console.error('Invalid payment intent response:', response);
        throw new Error('Invalid payment intent response from server');
      }
      
      setPaymentIntent(response);
      setStep(2);
      console.log('Moving to step 2 - Payment');
    } catch (err) {
      setError(err.message || 'Failed to create payment intent');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      if (!stripe || !elements) {
        throw new Error('Stripe not initialized');
      }

      if (!paymentIntent || !paymentIntent?.data?.clientSecret) {
        // Try to recreate payment intent
        console.log('Payment intent missing, recreating...');
        const amount = parseFloat(donationData.amount);
        const paymentData = {
          amount: Math.round(amount * 100), // Convert to cents
          currency: donationData.currency,
          donationType: donationData.donationType,
          donorName: donationData.donorName,
          donorEmail: donationData.donorEmail,
          message: donationData.message,
          isAnonymous: donationData.isAnonymous
        };
        
        const newResponse = await paymentApi.createPaymentIntent(paymentData);
        console.log('New Response:', newResponse);
        if (!newResponse || !newResponse?.data?.clientSecret) {
          throw new Error('Failed to create payment intent. Please try again.');
        }
        setPaymentIntent(newResponse);
      }

      // Create payment method using the same Stripe instance
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (pmError) {
        throw new Error(pmError.message);
      }

      // Confirm payment using the same Stripe instance
      const { error: confirmError, paymentIntent: confirmedPayment } = await stripe.confirmCardPayment(
        paymentIntent.data.clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message);
      }

      if (confirmedPayment.status === 'succeeded') {
        // Confirm payment with backend
        const confirmResponse = await paymentApi.confirmPayment(confirmedPayment.id);
        console.log('Payment confirmation response:', confirmResponse);
        
        if (confirmResponse?.success && confirmResponse?.data?.donation) {
          setDonationDetails(confirmResponse.data.donation);
        }
        
        setSuccess(true);
        setStep(3);
      } else {
        throw new Error('Payment was not successful');
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Clean up Stripe elements
    if (cardElement) {
      cardElement.unmount();
      setCardElement(null);
    }
    
    // Reset initialization flag
    isInitialized.current = false;
    
    setStep(1);
    setError('');
    setSuccess(false);
    setPaymentIntent(null);
    setDonationDetails(null);
    setStripe(null);
    setElements(null);
    setDonationData({
      amount: '',
      currency: 'usd',
      donationType: 'general',
      donorName: '',
      donorEmail: '',
      message: '',
      isAnonymous: false
    });
    onClose();
  };

  const getDonationTypeLabel = (type) => {
    const labels = {
      [DONATION_TYPES.GENERAL]: 'General Donations',
      [DONATION_TYPES.EMERGENCY]: 'Emergency Relief Funds',
      [DONATION_TYPES.MEDICAL]: 'Medical Assistance',
      [DONATION_TYPES.EDUCATION]: 'Educational Programs',
      [DONATION_TYPES.INFRASTRUCTURE]: 'Infrastructure Development'
    };
    return labels[type] || type;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 1 && 'Make a Donation'}
            {step === 2 && 'Payment Details'}
            {step === 3 && 'Thank You!'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Type
                </label>
                <select
                  name="donationType"
                  value={donationData.donationType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.values(DONATION_TYPES).map(type => (
                    <option key={type} value={type}>
                      {getDonationTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={donationData.amount}
                  onChange={handleAmountChange}
                  min={PAYMENT_LIMITS.MIN}
                  max={PAYMENT_LIMITS.MAX}
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: ${PAYMENT_LIMITS.MIN} | Maximum: ${PAYMENT_LIMITS.MAX.toLocaleString()}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="donorName"
                  value={donationData.donorName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="donorEmail"
                  value={donationData.donorEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={donationData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Leave a message with your donation"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={donationData.isAnonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Make this donation anonymous
                </label>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-900">Donation Summary</h3>
                <p className="text-blue-700">
                  {getDonationTypeLabel(donationData.donationType)}: ${donationData.amount}
                </p>
                <p className="text-blue-700">
                  Donor: {donationData.isAnonymous ? 'Anonymous' : donationData.donorName}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Information
                </label>
                <div id="card-element" className="p-3 border border-gray-300 rounded-lg">
                  {/* Stripe Elements will create form elements here */}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Test card: 4242 4242 4242 4242 (any future date, any CVC)
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">Donation Successful!</h3>
              <p className="text-gray-600">
                Thank you for your generous donation of ${donationData.amount} to {getDonationTypeLabel(donationData.donationType)}.
              </p>
              
              {donationDetails && (
                <div className="bg-gray-50 p-4 rounded-lg text-left">
                  <h4 className="font-medium text-gray-900 mb-2">Donation Details</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Receipt Number:</span> {donationDetails.receiptNumber}</p>
                    <p><span className="font-medium">Amount:</span> ${donationDetails.amount} {donationDetails.currency}</p>
                    <p><span className="font-medium">Status:</span> <span className="text-green-600 font-medium">{donationDetails.status}</span></p>
                    <p><span className="font-medium">Paid At:</span> {new Date(donationDetails.paidAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to {donationData.donorEmail}.
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t">
          {step === 1 && (
            <>
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePaymentIntent}
                disabled={loading || !donationData.amount || !donationData.donorName || !donationData.donorEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing Payment...' : `Donate $${donationData.amount}`}
              </button>
            </>
          )}

          {step === 3 && (
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

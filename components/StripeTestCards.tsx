const StripeTestCards = () => {
  return (
    <>
      <p className="test-card-notice">
        Use any of the{' '}
        <a
          href="https://stripe.com/docs/testing#cards"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stripe test cards{' '}
        </a>
        for this demo.
      </p>
    </>
  );
};

export default StripeTestCards;

/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";

const apiKey = "pk_01F5EZF3N3X4CB1ZHKVMKR5ZVC";

const SeamlesspayExample = () => {
  const [hostedFields, setHostedFields] = useState(null);

  const handleReady = (fields) => {
    setHostedFields(fields);
  };

  const handleValidityChange = (event) => {
    console.log("event.fields: ", event.fields);
  };

  const handleCardTypeChange = (event) => {
    console.log("event.cards: ", event.cards);
  };

  const handleSdkError = (error) => {
    console.log("SEAMLESSPAY SDK ERROR: ");
    console.error(JSON.stringify(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!hostedFields) {
      return;
    }
    hostedFields.tokenize(function (error, payload) {
      if (error) {
        console.log("SEAMLESSPAY SDK TOKENIZE ERROR: ");
        console.error(error);
        return;
      }
      console.log("payload: ", payload);
      console.log("oo");
      // Send the `payload.token` to your server with AJAX.
      // This is where you would submit payload.token to your server
      alert(`Submit token ${payload.token} to your server here!`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardPayments
        seamless={window.seamlesspay}
        environment="sandbox"
        txnType="CREDIT_CARD"
        authorization={apiKey}
        onReady={handleReady}
        onValidityChange={handleValidityChange}
        onCardTypeChange={handleCardTypeChange}
        onError={handleSdkError}
      >
        <HostedField name="accountNumber" placeholder="4242 4242 4242 4242" />
        <HostedField name="expDate" placeholder="MM / YY" />
      </CardPayments>
      <button>Submit</button>
    </form>
  );
};

export default SeamlesspayExample;

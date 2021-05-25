import ReactDOM from "react-dom";
import "./index.css";

var React = require("react");
var styles = {
  input: {
    "font-size": "12px",
    "font-family": "helvetica, tahoma, calibri, sans-serif",
    color: "#3a3a3a",
  },
  "input.invalid": {
    color: "red",
  },
  "input.valid": {
    color: "green",
  },
  ":focus": {
    color: "black",
  },
};
class SeamlesspayExample extends React.Component {
  initialState = function() {
    return {
      hostedFields: null,
    };
  };
  handleReady = function(hostedFields) {
    this.setState({ hostedFields: hostedFields });
  };
  handleValidityChange = function(event) {
    console.log("event.fields: ", event.fields);
  };
  handleCardTypeChange = function(event) {
    console.log("event.cards: ", event.cards);
  };
  handleSdkError = function(error) {
    console.log("SEAMLESSPAY SDK ERROR: ");
    console.error(error);
  };
  handleSubmit = function(event) {
    event.preventDefault();
    if (!this.state.hostedFields) {
      return;
    }
    this.state.hostedFields.tokenize(function(error, payload) {
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

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {/* <CardPayments
          seamless={window.seamlesspay}
          environment="sandbox"
          paymentType="credit_card"
          styles={styles}
          authorization={"pk_01F5EZF3N3X4CB1ZHKVMKR5ZVC"}
          onReady={this.handleReady.bind(this)}
          onValidityChange={this.handleValidityChange}
          onCardTypeChange={this.handleCardTypeChange}
          onError={this.handleSdkError}
        >
          <HostedField name="accountNumber" placeholder="4242 4242 4242 4242" />
          <HostedField name="expDate" placeholder="MM / YY" />
        </CardPayments> */}
        <button>Submit</button>
      </form>
    );
  }
}
var mainElement = document.getElementById("app");
ReactDOM.render(<SeamlesspayExample />, mainElement);

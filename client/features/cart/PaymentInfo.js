import React from "react";

function PaymentInfo() {
  return (
    <div className="payment">
      <div className="card">
        <h3>Payment info</h3>
        Card No: <input type="number" placeholder="2424-2424-2424-2424" />
        <br />
        Security code:
        <input type="number" placeholder="242" />
        <br />
        expiry:
        <input type="number" placeholder="04" />/
        <input type="number" placeholder="24" />
      </div>
      <div>
        <h3>Delivery info</h3>
        Adress line 1 :<input />
        <br />
        Address line 2 :<input />
        <br />
        Zip code :<input type="number" />
      </div>
    </div>
  );
}

export default PaymentInfo;

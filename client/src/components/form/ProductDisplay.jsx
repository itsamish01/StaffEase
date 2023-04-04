import { useLazyQuery } from "@apollo/client";
// import {useState} from "react"
import { API } from "../../schema/queries";
export function ProductDisplay() {
  const [getCheckout, { data }] = useLazyQuery(API);
  // const [ paymentURL, setPaymentURL] = useState();
  function submitCheckout() {
    getCheckout();
  }
  if (data?.API.session) {
    console.log(data?.API);
    window.location.assign(`${data?.API.session}`);
  }
  return (
    <section>
      <div className="product">
        <img src="" alt="The cover of Stubborn Attachments" />
        <div className="description">
          <h3>Stubborn Attachments</h3>
          <h5>$20.00</h5>
        </div>
      </div>

      <button onClick={submitCheckout}>Checkout</button>
    </section>
  );
}

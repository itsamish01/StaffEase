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
    // console.log(data?.API);
    window.location.assign(`${data?.API.session}`);
  }
  return (
    <section className="text-center">
      <div className="text-center">
        <div className="description">
          <h3>Business Subscription</h3>
          <h5>$10.00</h5>
        </div>
      </div>

      <button
        className="button mt-4 bg-green-500 hover:bg-green-300"
        onClick={submitCheckout}
      >
        Checkout
      </button>
    </section>
  );
}

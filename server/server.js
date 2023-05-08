import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import { resolvers, typeDefs } from "./app/schema/index.js";
import config from "./config.js";
import { decodeToken } from "./middleware.js";
import { Business } from "./models/Business.js";

import Stripe from "stripe";
const { skStripeKey, endpointSecret } = config;
const stripe = new Stripe(skStripeKey);

const { port } = config;

const app = express();
// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   "whsec_e1ce5c7f6ba02921201ee13e53293d324f2900c566aa2a686a921afc282e431f";

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function init() {
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  app.use(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
      const sig = request.headers["stripe-signature"];
      console.log("helloSERVER", request.headers);
      let event;

      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        );
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      console.log("EVENT1", event);

      // Handle the event
      switch (event.type) {
        case "payment_intent.succeeded":
          const paymentIntentSucceeded = event.data.object;
          console.log("helloPayInSuc", paymentIntentSucceeded);
          stripe.customers
            .retrieve(paymentIntentSucceeded.customer)
            .then(async (customer) => {
              console.log(customer);
              await Business.findOneAndUpdate(
                { _id: customer.metadata.businessID },
                { $set: { paid: true } }
              );
            });
          // Then define and call a function to handle the event payment_intent.succeeded
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      // Return a 200 response to acknowledge receipt of the event
      response.send();
    }
  );

  // Specify the path where we'd like to mount our server
  app.use(
    "/",
    cors(),
    express.json(),
    decodeToken,
    expressMiddleware(server, {
      context({ req }) {
        return {
          user: req.user,
        };
      },
    })
  );

  // Modified server startup
  await new Promise((resolve) => httpServer.listen({ port }, resolve));

  console.info(`🚀 Server ready at http://localhost:${port}`);
}

export default init;

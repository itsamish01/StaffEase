import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";
import config from "./config.js";
import { resolvers, typeDefs } from "./schema/index.js";
import { decodeToken } from "./middleware.js";
import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51Msd5EIxLdcd64gLzZtsExg1n5m6TrOy1G6uAftpGJ4922N78j7gb9pzIcHoimTlbDJvCVDOmHUPc6jV4lsycRQI00CpMgY3By"
);

const { port } = config;

const app = express();

const YOUR_DOMAIN = "http://localhost:5173";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log("Running on port 4242"));
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

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          books: {
            merge(existing = [], incoming) {
              /**
               * When removing a 📖, we get a ⚠️ b/c caching cannot determine identical 📖s.
               * Not all of the 📖 fields are uniquely identifiable 🤷🏾‍♀️.
               *
               * `incoming` is the update array of 📚s with a 📖 removed.
               *
               * We tell the cache to use this `incoming` array of 📚s.
               * https://www.apollographql.com/docs/react/caching/cache-field-behavior/#the-merge-function
               */
              return [...incoming];
            },
          },
        },
      },
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

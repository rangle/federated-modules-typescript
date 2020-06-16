import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./app";
import Loading from "./loading";

const Home = React.lazy(() => import("applicationHome/HomeRemote"));
// const Product = React.lazy(() => import("applicationProduct/ProductRemote"));
const Cart = React.lazy(() => import("applicationCart/CartRemote"));

ReactDOM.render(
  <App>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/cart">
          <Cart
            callback={() => {
              console.log("hi from callback");
            }}
          />
        </Route>
        <Route path="/products">
          <h1>Products</h1>
          {/* Make this an app later */}
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </App>,
  document.getElementById("root")
);

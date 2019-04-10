import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import Home from "./components/Home";
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middleware";
import reducer from "./reducers";

const store = createStore(reducer, middleware);

render(
    <Provider store={store}>
        <Home />
    </Provider>,
    document.getElementById('app')
);
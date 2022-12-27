import React from "react";

import { BrowserRouter } from "react-router-dom";
// import { connect } from 'react-redux';
import { compose } from "recompose";
import { ToastContainer } from "react-toastify";

import { withStore } from "./store";
import "./App.scss";
import "./App.css";

import Header from "./component/Main/Header";
import Routes from "./Routes";
import FooterComponent from "./component/Main/Footer";

// Material Icons
import "material-design-icons-iconfont";

// Font awesome icons
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";
require("@fortawesome/fontawesome-free/js/all");

const App = () => {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes />
        <FooterComponent />
      </BrowserRouter>
    </>
  );
};

export default compose(withStore)(App);

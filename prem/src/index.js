import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

$(window).bind('resize', function () {
    var viewportWidth = window.innerWidth;
    if (viewportWidth < 767) {
      $(".logo_width").css("display","block");

    }
    else{
        $(".logo_width").css("display","block");

    }
});

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();

 //reportWebVitals();
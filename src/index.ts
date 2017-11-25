import './index.scss';
import {App} from "./components/App";

window.onload = function() {
    let app:App = new App(),
        body:HTMLElement = document.getElementsByTagName("body")[0];

    body.appendChild(app.getContainer());
};

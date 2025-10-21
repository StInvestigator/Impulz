import ReactDOM from 'react-dom/client';
import App from "./App";
import './i18n';
import {setupStore} from "./store/store.ts";
import {Provider} from "react-redux";

const style = document.createElement('style');
style.textContent = `
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  * {
    scrollbar-width: none;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background: transparent;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
`;
document.head.appendChild(style);

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <App />
    </Provider>,
);
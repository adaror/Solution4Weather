import React from 'react';
import Layout from './components/layout/layout';
import Routers from './routes';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import combineReducers from './store/combiner';
import 'bootstrap/dist/css/bootstrap.min.css';
const applyReduxDevTools = (middleware: any) => composeWithDevTools(middleware);

function App() {
  const store = createStore(combineReducers, applyReduxDevTools(applyMiddleware(thunk)));
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routers />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

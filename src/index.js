import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {createStore,applyMiddleware,compose,combineReducers} from "redux";
import burgerBuilderReducer from "./store/reducers/BurgerBuilderR";
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk";
import orderReducer from "./store/reducers/OrderR";
import authReducer from "./store/reducers/authR";
import createSagaMiddleware from "redux-saga";
import {watchAuth,watchBurgerBuilder,watchOrder} from "./store/sagas/index";

const composeEnhancers = process.env.NODE_ENV==='development'? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :null|| compose;
const rootReducer =combineReducers({
      burgerBuilerR:burgerBuilderReducer,
      orderR:orderReducer,
      authR:authReducer
});
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk,sagaMiddleware)));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
 const app =(
   <Provider store={store}>
        <BrowserRouter>
           <App />
        </BrowserRouter>
    </Provider>
 )
 
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

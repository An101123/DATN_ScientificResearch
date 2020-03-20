import { createStore, applyMiddleware, compose } from "redux";
// import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import reducers from "../reducers";
import sagas from "../sagas";

const initialState = {};

// const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = compose(
  applyMiddleware(
    sagaMiddleware,
    // loggerMiddleware
  )
)(createStore);

export const store = createStoreWithMiddleware(reducers, initialState);

sagaMiddleware.run(sagas);

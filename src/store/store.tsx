import { createStore, compose, applyMiddleware } from "redux";
import bookReducer from "./reducers/booksReducer";
import thunkMidlleWare from "redux-thunk";

let rootReducer = bookReducer;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMidlleWare))
);

store.subscribe(() => {
  window.localStorage.setItem(
    "favorite",
    JSON.stringify(store.getState().addToFavorite)
  );
});
//@ts-ignore
window.___store__ = store;

export default store;

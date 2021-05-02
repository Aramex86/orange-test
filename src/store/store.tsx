import { createStore, compose, applyMiddleware } from "redux";
import bookReducer from "./reducers/booksReducer";
import thunkMidlleWare from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistPartial } from "redux-persist/es/persistReducer";

let rootReducer = bookReducer;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;



const persistConfig={
  key:'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<AppStateType & PersistPartial, any, any, any>(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunkMidlleWare))
  );
  let persistor = persistStore(store)
  
// store.subscribe(() => {
//   window.localStorage.setItem(
//     "favorite",
//     JSON.stringify(store.getState().addToFavorite)
//   );
//   window.localStorage.setItem('searchVal',store.getState().searchValue)
// });
//@ts-ignore
window.___store__ = store;

export {store,persistor} 
  

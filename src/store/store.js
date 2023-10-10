import { configureStore } from '@reduxjs/toolkit';
import notationReducer from './notationSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 


const persistConfig = {
    key: 'notate',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig,notationReducer)
const store = configureStore({
    reducer:persistedReducer
})

export let persistor = persistStore(store)

export default store

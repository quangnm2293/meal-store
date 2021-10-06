import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mealReducer from './mealSlice';
import modalReducer from './modalSlice';
import { combineReducers } from 'redux';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	meals: mealReducer,
	modals: modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
});
export const persistor = persistStore(store);

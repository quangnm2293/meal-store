import '../styles/globals.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from '../app/store';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<PersistGate loading={<p>Loading...</p>} persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
}

export default MyApp;

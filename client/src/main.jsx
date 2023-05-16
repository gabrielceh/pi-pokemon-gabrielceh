import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './normalize.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store.js';
import DarkModeProvider from './context/DarkModeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<DarkModeProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</DarkModeProvider>
	</Provider>
);

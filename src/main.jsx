import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import { SidebarProvider } from './context/SidebarContext';
import App from './App.jsx';
import './index.css';
import './colors.css';

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<LoadingProvider>
			<SidebarProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SidebarProvider>
		</LoadingProvider>
	</React.StrictMode>
);

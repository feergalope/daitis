import { AppLayout } from './ui/AppLayout';
import { Sidebar } from './ui/Sidebar';
import { Main } from './ui/Main';
import { LoadingProvider } from './context/LoadingContext';

function App() {
	return (
		<LoadingProvider>
			<AppLayout>
				<Sidebar />
				<Main />
			</AppLayout>
		</LoadingProvider>
	);
}

export default App;

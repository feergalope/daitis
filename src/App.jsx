import { AppLayout } from './components/AppLayout';
import { Sidebar } from './components/Sidebar';
import { Main } from './components/Main';

function App() {
	return (
		<AppLayout>
			<Sidebar />
			<Main />
		</AppLayout>
	);
}

export default App;

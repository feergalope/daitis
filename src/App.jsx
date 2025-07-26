import { AppLayout } from './ui/AppLayout';
import { Sidebar } from './ui/Sidebar';
import { Main } from './ui/Main';

function App() {
	return (
		<AppLayout>
			<Sidebar />
			<Main />
		</AppLayout>
	);
}

export default App;

import { AppLayout } from './components/AppLayout';
import { Navbar } from './components/Navbar';
import { Main } from './components/Main';

function App() {
	return (
		<AppLayout>
			<Navbar />
			<Main />
		</AppLayout>
	);
}

export default App;

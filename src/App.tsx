import { useState } from 'react';

import './App.css';

import Textbox from './components/Textbox';

interface Settings {
	theme: 'comfy' | 'compact';
	openModal: boolean;
}

function App() {
	const defaultSettings: Settings = {
		theme: 'comfy',
		openModal: false,
	};
	const [modalOpen, setModalOpen] = useState(false);
	const [hide, setHide] = useState(false);
	const [settings, setSettings] = useState<Settings>(defaultSettings);

	function openModal(): void {
		setModalOpen(!modalOpen);
		setSettings({ ...settings, theme: modalOpen ? 'comfy' : 'compact' });
	}
	function hideButton(): void {
		setHide(true);
	}
	function showButton(): void {
		setHide(false);
	}
	return (
		<div className="App" onMouseEnter={showButton} onMouseLeave={hideButton}>
			<button onClick={openModal} className={hide ? 'hide button' : 'show button'}>
				Change mode
			</button>
			<Textbox theme={settings.theme} />
		</div>
	);
}

export default App;

import { useState, useEffect } from 'react';

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
	const [mouseOverButton, setMouseOverButton] = useState(false);

	function openModal(): void {
		setModalOpen(!modalOpen);
		setSettings({ ...settings, theme: modalOpen ? 'comfy' : 'compact' });
	}

	function handleMouseOver() {
		setMouseOverButton(true);
	}

	function handleMouseOut() {
		setMouseOverButton(false);
	}

	useEffect(() => {
		let timeoutId: any;

		const handleMouseMove = () => {
			setHide(false);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(() => {
				if (!mouseOverButton) {
					setHide(true);
				}
			}, 1000);
		};

		document.addEventListener('mousemove', handleMouseMove);

		return () => {
			document.removeEventListener('mousemove', handleMouseMove);
			clearTimeout(timeoutId);
		};
	}, [mouseOverButton]);

	return (
		<div className="App">
			<button
				onClick={openModal}
				className={hide ? 'hide button' : 'show button'}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			>
				Change mode: {settings.theme === 'comfy' ? 'Comfy' : 'Compact'}
			</button>
			<Textbox theme={settings.theme} />
		</div>
	);
}

export default App;

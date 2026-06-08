import { useState } from 'react';
import { useIdle } from './hooks/useIdle';
import { useAppStore } from './store/useAppStore';

import './App.css';

import Textbox from './components/Textbox';
import Controls from './components/Controls';
import Modal from './components/Modal';
import SettingsModal from './components/SettingsModal';

export type { LayoutMode, ThemeMode } from './store/useAppStore';

function App() {
	const { themeMode, layoutMode } = useAppStore();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { isIdle, setIsHoveringControl } = useIdle(1500);

	return (
		<div className={`min-h-screen w-full transition-colors duration-300 font-sans flex flex-col ${themeMode === 'dark' ? 'dark bg-stone-900 text-stone-100' : 'bg-stone-50 text-stone-900'} ${layoutMode === 'comfy' ? 'items-center' : 'items-start justify-start'}`}>
			<Controls 
				isIdle={isIdle}
				onHoverStart={() => setIsHoveringControl(true)}
				onHoverEnd={() => setIsHoveringControl(false)}
				onOpenSettings={() => setIsSettingsOpen(true)}
			/>
			<Textbox />

			<Modal 
				isOpen={isSettingsOpen} 
				onClose={() => setIsSettingsOpen(false)}
				title="Reading Preferences"
			>
				<SettingsModal />
			</Modal>
		</div>
	);
}

export default App;

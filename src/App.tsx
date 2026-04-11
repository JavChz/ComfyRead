import { useState, useEffect } from 'react';
import { useIdle } from './hooks/useIdle';

import './App.css';

import Textbox from './components/Textbox';
import Controls from './components/Controls';

export type LayoutMode = 'comfy' | 'compact';
export type ThemeMode = 'light' | 'dark';

function App() {
	const [layoutMode, setLayoutMode] = useState<LayoutMode>('comfy');
	// Check standard user preference for initial state
	const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark';
    });
	const { isIdle, setIsHoveringControl } = useIdle(1500);

	const handleToggleLayout = () => {
		setLayoutMode((prev) => (prev === 'comfy' ? 'compact' : 'comfy'));
	};

	const handleToggleTheme = () => {
		setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return (
		<div className={`min-h-screen w-full transition-colors duration-300 font-sans flex flex-col ${themeMode === 'dark' ? 'dark bg-stone-900 text-stone-100' : 'bg-stone-50 text-stone-900'} ${layoutMode === 'comfy' ? 'items-center' : 'items-start justify-start'}`}>
			<Controls 
				layoutMode={layoutMode} 
				onToggleLayout={handleToggleLayout}
				themeMode={themeMode}
				onToggleTheme={handleToggleTheme}
				isIdle={isIdle}
				onHoverStart={() => setIsHoveringControl(true)}
				onHoverEnd={() => setIsHoveringControl(false)}
			/>
			<Textbox layoutMode={layoutMode} />
		</div>
	);
}

export default App;

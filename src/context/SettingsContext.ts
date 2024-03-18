// settingsContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface Settings {
	username?: string;
	// Add more settings here
}

interface SettingsContextType {
	settings: Settings;
	updateSettings: (newSettings: Settings) => void;
}

const initialSettings: Settings = {
	username: '',
};

// Create the context
const SettingsContext = createContext<SettingsContextType>({
	settings: initialSettings,
	updateSettings: () => {},
});

// Export the context
export { SettingsContext };

// Define the provider and hook
export const useSettings = () => {
	const context = useContext(SettingsContext);
	if (!context) {
		throw new Error('useSettings must be used within a SettingsProvider');
	}
	return context;
};

export const SettingsProvider: React.FC = ({ children }) => {
	const [settings, setSettings] = useState<Settings>(initialSettings);

	const updateSettings = (newSettings: Settings) => {
		setSettings({ ...settings, ...newSettings });
	};

	return (
		<SettingsContext.Provider value={{ settings, updateSettings }}>
			{children}
		</SettingsContext.Provider>
	);
};

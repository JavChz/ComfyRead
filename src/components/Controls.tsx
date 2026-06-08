import { MdDarkMode, MdLightMode, MdSettings } from "react-icons/md";
import { useAppStore } from "../store/useAppStore";

interface ControlsProps {
	isIdle: boolean;
	onHoverStart: () => void;
	onHoverEnd: () => void;
	onOpenSettings: () => void;
}

const Controls = ({
	isIdle,
	onHoverStart,
	onHoverEnd,
	onOpenSettings,
}: ControlsProps) => {
	const { themeMode, toggleThemeMode, layoutMode, toggleLayoutMode } = useAppStore();

	const btnClasses = "bg-stone-150/60 dark:bg-stone-800/60 border border-black/10 dark:border-white/10 text-stone-900 dark:text-stone-100 backdrop-blur-md rounded-full px-5 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-sm hover:-translate-y-[1px] hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer";

	const iconBtnClasses = "bg-stone-150/60 dark:bg-stone-800/60 border border-black/10 dark:border-white/10 text-stone-900 dark:text-stone-100 backdrop-blur-md rounded-full p-2.5 flex items-center justify-center shadow-sm hover:-translate-y-[1px] hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500 dark:hover:border-amber-400 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 cursor-pointer";

	return (
		<div
			className={`fixed top-6 right-6 z-50 flex gap-3 transition-all duration-500 ease-out transform ${
				isIdle ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
			}`}
			onMouseEnter={onHoverStart}
			onMouseLeave={onHoverEnd}
		>
			<button onClick={toggleThemeMode} className={btnClasses} aria-label="Toggle Theme">
				{themeMode === 'light' ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
				{themeMode === 'light' ? 'Dark' : 'Light'}
			</button>
			<button onClick={toggleLayoutMode} className={btnClasses}>
				Mode: {layoutMode === 'comfy' ? 'Comfy' : 'Compact'}
			</button>
			<button onClick={onOpenSettings} className={iconBtnClasses} aria-label="Open Settings">
				<MdSettings size={18} />
			</button>
		</div>
	);
};

export default Controls;

import { MdDarkMode, MdLightMode } from "react-icons/md";

interface ControlsProps {
	layoutMode: 'comfy' | 'compact';
	onToggleLayout: () => void;
	themeMode: 'light' | 'dark';
	onToggleTheme: () => void;
	isIdle: boolean;
	onHoverStart: () => void;
	onHoverEnd: () => void;
}

const Controls = ({
	layoutMode,
	onToggleLayout,
	themeMode,
	onToggleTheme,
	isIdle,
	onHoverStart,
	onHoverEnd,
}: ControlsProps) => {
	const btnClasses = "bg-neutral-100/60 dark:bg-zinc-800/60 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-zinc-100 backdrop-blur-md rounded-full px-5 py-2 flex items-center justify-center gap-2 text-sm font-medium shadow-sm hover:-translate-y-[1px] hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer";

	return (
		<div
			className={`fixed top-6 right-6 z-50 flex gap-3 transition-all duration-500 ease-out transform ${
				isIdle ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
			}`}
			onMouseEnter={onHoverStart}
			onMouseLeave={onHoverEnd}
		>
			<button onClick={onToggleTheme} className={btnClasses} aria-label="Toggle Theme">
				{themeMode === 'light' ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
				{themeMode === 'light' ? 'Dark' : 'Light'}
			</button>
			<button onClick={onToggleLayout} className={btnClasses}>
				Mode: {layoutMode === 'comfy' ? 'Comfy' : 'Compact'}
			</button>
		</div>
	);
};

export default Controls;

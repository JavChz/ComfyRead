import { useState, useEffect } from 'react';

export function useIdle(timeoutMs: number = 1500) {
	const [isIdle, setIsIdle] = useState(false);
	const [isHoveringControl, setIsHoveringControl] = useState(false);

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>;

		const handleActivity = () => {
			setIsIdle(false);
			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				if (!isHoveringControl) {
					setIsIdle(true);
				}
			}, timeoutMs);
		};

		// Initial start
		handleActivity();

		document.addEventListener('mousemove', handleActivity);
		document.addEventListener('keydown', handleActivity);

		return () => {
			document.removeEventListener('mousemove', handleActivity);
			document.removeEventListener('keydown', handleActivity);
			clearTimeout(timeoutId);
		};
	}, [timeoutMs, isHoveringControl]);

	return {
		isIdle,
		setIsHoveringControl,
	};
}

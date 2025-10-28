// plugins/media-control-custom/controls/forward.js
import { createButton } from '../../../utils/create-button.js';

export const createForward = (container, step = 15) => {
	const btn = createButton('./img/icons/forward.svg');
	const playback = container?.playback;
	if (!playback) return btn;

	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const current = playback.getCurrentTime();
		const duration = playback.getDuration ? playback.getDuration() : Infinity;
		const newTime = Math.min(current + step, duration);
		playback.seek(newTime);
	});

	return btn;
};

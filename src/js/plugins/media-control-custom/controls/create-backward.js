// plugins/media-control-custom/controls/backward.js
import { createButton } from '../../../utils/create-button.js';

export const createBackward = (container, step = 15) => {
	const btn = createButton('./img/icons/backward.svg');
	const playback = container?.playback;
	if (!playback) return btn;

	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const current = playback.getCurrentTime();
		const newTime = Math.max(current - step, 0);
		playback.seek(newTime);
	});

	return btn;
};

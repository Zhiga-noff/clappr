import { createButton } from '../../../utils/create-button.js';

export const createMute = (container) => {
	const btn = createButton('./img/icons/Volume.svg');
	const playback = container?.playback;
	if (!playback) return btn;

	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const video = playback.el;
		if (!video) return;

		video.muted = !video.muted;

		const icon = btn.firstChild;
		if (icon) {
			icon.src = video.muted ? './img/icons/VolumeMute.svg' : './img/icons/Volume.svg';
		}
	});

	return btn;
};

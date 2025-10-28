// plugins/media-control-custom/controls/fullscreen.js
import { createButton } from '../../../utils/create-button.js';

export const createFullscreen = (container) => {
	const btn = createButton('./img/icons/FullScreen.svg');
	const playback = container?.playback;
	if (!playback) return btn;

	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		const video = playback.el;
		if (!video) return;

		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else if (video.requestFullscreen) {
			video.requestFullscreen();
		} else if (video.webkitEnterFullscreen) {
			video.webkitEnterFullscreen();
		}
	});

	return btn;
};

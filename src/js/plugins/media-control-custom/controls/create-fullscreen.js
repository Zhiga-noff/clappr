// plugins/media-control-custom/controls/fullscreen.js
import { createButton } from '../../../utils/create-button.js';

export const createFullscreen = (container) => {
	const btn = createButton('./img/icons/FullScreen.svg');
	if (!container) return btn;

	const playback = container.playback;
	const video = playback?.el;
	const playerRoot = container.core?.el || container.$el?.get(0);
	const target = playerRoot || video;

	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	btn.addEventListener('click', (e) => {
		e.stopPropagation();

		// ✅ Safari / iOS
		if (isIOS && video && video.webkitEnterFullscreen) {
			video.webkitEnterFullscreen();
			return;
		}

		// ✅ Остальные браузеры
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else if (target.requestFullscreen) {
			target.requestFullscreen().catch((err) => {
				console.warn('Fullscreen error:', err);
				// fallback для Safari старых версий
				if (video?.webkitEnterFullscreen) video.webkitEnterFullscreen();
			});
		}
	});

	return btn;
};

import { createButton } from '../../../utils/create-button.js';

export const createPlayPause = (container) => {
	const btn = createButton('./img/icons/Pause.svg');
	const icon = btn.firstChild;
	const playback = container?.playback;
	if (!playback) return btn;

	container.listenTo(playback, 'playback:play', () =>
		icon.setAttribute('src', './img/icons/Pause.svg'),
	);
	container.listenTo(playback, 'playback:pause', () =>
		icon.setAttribute('src', './img/icons/Play.svg'),
	);

	btn.addEventListener('click', (e) => {
		e.stopPropagation();
		if (playback.isPlaying()) playback.pause();
		else playback.play();
	});

	return btn;
};

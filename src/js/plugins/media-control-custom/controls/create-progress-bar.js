export const createProgressBar = (container) => {
	const wrapper = document.createElement('div');
	wrapper.classList.add('media-progress');

	const bar = document.createElement('div');
	bar.classList.add('media-progress-bar');
	wrapper.appendChild(bar);

	const playback = container?.playback;
	if (!playback) return wrapper;

	const update = () => {
		const duration = playback.getDuration?.() || 0;
		const current = playback.getCurrentTime?.() || 0;
		const percent = duration ? (current / duration) * 100 : 0;
		bar.style.width = `${percent}%`;
	};

	playback.listenTo?.(playback, 'playback:timeupdate playback:seek', update);

	wrapper.addEventListener('click', (e) => {
		e.stopPropagation();

		const rect = wrapper.getBoundingClientRect();
		const clickX = e.clientX - rect.left;
		const percent = clickX / rect.width;

		const duration = playback.getDuration?.() || 0;
		if (duration) playback.seek(percent * duration);
	});

	return wrapper;
};

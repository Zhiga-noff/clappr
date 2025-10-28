export const createTime = (container) => {
	const timeEl = document.createElement('div');
	timeEl.classList.add('media-time');

	const playback = container?.playback;
	if (!playback) {
		timeEl.textContent = '00:00 / 00:00';
		return timeEl;
	}

	const format = (s) => {
		const m = String(Math.floor(s / 60)).padStart(2, '0');
		const sec = String(Math.floor(s % 60)).padStart(2, '0');
		return `${m}:${sec}`;
	};

	const update = () => {
		const current = playback.getCurrentTime?.() || 0;
		const duration = playback.getDuration?.() || 0;
		timeEl.textContent = `${format(current)} / ${format(duration)}`;
	};

	// Подписываемся на обновления
	playback.listenTo?.(
		playback,
		'playback:timeupdate playback:seek playback:ready',
		update,
	);

	return timeEl;
};

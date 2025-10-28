import Clappr from 'clappr';

export class DoubleClickRewindPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'double_tap_seek';
	}

	bindEvents() {
		this.listenTo(this.container, 'container:ready', () => {
			this.enableDoubleTapSeek();
		});
	}

	enableDoubleTapSeek() {
		const playback = this.container?.playback;
		if (!playback) return;
		const videoEl = playback.el;
		if (!videoEl) return;

		let lastTapTime = 0;

		const handleDouble = (e, clientX) => {
			const rect = videoEl.getBoundingClientRect();
			const isLeft = clientX - rect.left < rect.width / 2;

			const current = playback.getCurrentTime();
			const duration = playback.getDuration ? playback.getDuration() : Infinity;

			if (isLeft) {
				playback.seek(Math.max(current - 5, 0));
			} else {
				playback.seek(Math.min(current + 5, duration));
			}

			e.preventDefault();
			e.stopPropagation();
		};

		const handleTapOrClick = (clientX, e) => {
			const now = Date.now();
			if (now - lastTapTime < 300) {
				handleDouble(e, clientX);
				lastTapTime = 0; // сброс таймера после срабатывания
			} else {
				lastTapTime = now;
			}
		};

		// Двойной тап
		videoEl.addEventListener('touchend', (e) => {
			if (e.changedTouches && e.changedTouches.length > 0) {
				handleTapOrClick(e.changedTouches[0].clientX, e);
			}
		});

		// Двойной клик
		videoEl.addEventListener('dblclick', (e) => {
			handleDouble(e, e.clientX);
		});
	}
}

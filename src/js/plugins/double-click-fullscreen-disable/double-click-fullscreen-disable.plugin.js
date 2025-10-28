import Clappr from 'clappr';

export class DoubleClickFullscreenDisablePlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'disable_double_click_fullscreen';
	}

	bindEvents() {
		this.listenTo(this.container, 'container:ready', () => {
			this.disableDoubleClickFullscreen();
		});
	}

	disableDoubleClickFullscreen() {
		const playback = this.container?.playback;
		if (!playback) return;
		const videoEl = playback.el;
		if (!videoEl) return;

		// Отменяем стандартный dblclick для всего видео
		videoEl.addEventListener('dblclick', (e) => {
			e.preventDefault();
			e.stopPropagation();
		});

		// Отменяем двойной тап на мобильных устройствах
		let lastTap = 0;
		videoEl.addEventListener('touchend', (e) => {
			const currentTime = new Date().getTime();
			const tapLength = currentTime - lastTap;

			if (tapLength < 300 && tapLength > 0) {
				// двойной тап
				e.preventDefault();
				e.stopPropagation();
			}

			lastTap = currentTime;
		});

		// Обязательно блокируем любые события клика, которые могли бы вызывать cancel-fullscreen-on-ios
		videoEl.addEventListener(
			'click',
			(e) => {
				e.stopPropagation();
			},
			true,
		); // useCapture=true чтобы перехватывать на фазе capture
	}
}

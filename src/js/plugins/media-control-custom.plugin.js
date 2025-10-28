import Clappr from 'clappr';

export default class MediaControlCustomPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'media_control_custom_plugin';
	}

	bindEvents() {
		this.listenTo(this.container, 'container:ready', this.render);
	}

	render() {
		if (!this.container) return this;
		if (this._controls) return this; // защита от дубликатов

		// Создаём контейнер для кнопок
		const controls = document.createElement('div');
		controls.classList.add('media-container');

		// --- кнопка Play/Pause ---
		const playPause = this.createButton('./img/icons/Pause.svg');
		playPause.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container.playback;
			const imgIcon = playPause.firstChild;
			if (!playback) return;
			if (playback.isPlaying()) {
				imgIcon.setAttribute('src', './img/icons/Play.svg');
				playback.pause();
			} else {
				imgIcon.setAttribute('src', './img/icons/Pause.svg');
				playback.play();
			}
		});

		// --- кнопка перемотки на 15 секунд вперёд ---
		const forward = this.createButton('./img/icons/Buttons-2.svg');
		forward.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container.playback;

			const current = playback.getCurrentTime();
			const duration = playback.getDuration ? playback.getDuration() : Infinity;
			const newTime = Math.min(current + 15, duration);

			playback.seek(newTime);
		});

		const backward = this.createButton('./img/icons/Buttons-1.svg');
		backward.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container.playback;

			const current = playback.getCurrentTime();
			const newTime = Math.max(current - 15, 0);

			playback.seek(newTime);
		});

		controls.append(backward, playPause, forward);
		this.container.$el.append(controls);
		return this;
	}

	// Функция создания кнопки (цветной квадрат 32x32)
	createButton(icon) {
		const btn = document.createElement('div');
		btn.classList.add('icon');

		const iconElement = document.createElement('img');
		iconElement.setAttribute('src', icon);
		btn.appendChild(iconElement);

		return btn;
	}
}

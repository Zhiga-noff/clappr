import Clappr from 'clappr';
import {
	createPlayPause,
	createForward,
	createBackward,
	createMute,
	createFullscreen,
	createProgressBar,
	createTime,
	createTitle,
} from './controls/index.js';

export class MediaControlCustomPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'media_control_custom_plugin';
	}

	bindEvents() {
		this.listenTo(this.container, 'container:ready', () => {
			this.render();
		});
	}

	render() {
		if (!this.container) return this;
		if (this._controls) return this; // защита от дубликатов

		// Создаём контейнер для кнопок
		const container = document.createElement('div');
		container.addEventListener('click', (e) => e.stopPropagation());
		container.classList.add('media-custom');

		const topElem = document.createElement('div');
		topElem.classList.add('media-custom__description-video');

		const time = createTime(this.container);
		const titleEl = createTitle('Это точно не то о чем ты подумал');

		topElem.append(titleEl, time);

		// Прогресс бар
		const progress = createProgressBar(this.container);

		// Контейнер кнопок снизу
		const controls = document.createElement('div');
		controls.classList.add('media-custom__play-controls', 'play-controls');

		// Кнопки паузы и перемотки
		const leftControls = document.createElement('div');
		leftControls.classList.add('play-controls__left');

		const playPause = createPlayPause(this.container);
		const forward = createForward(this.container);
		const backward = createBackward(this.container);
		leftControls.append(playPause, backward, forward);

		// Кнопки во весь экран и мьют
		const rightControls = document.createElement('div');
		rightControls.classList.add('play-controls__right');

		const fullscreen = createFullscreen(this.container);
		const volume = createMute(this.container);
		rightControls.append(volume, fullscreen);

		// Добавляем все эелементы
		controls.append(leftControls, rightControls);
		container.append(topElem, progress, controls);
		this.container.$el.append(container);
		return this;
	}
}

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
		this.listenTo(this.container, 'container:ready', this.render);
	}

	render = () => {
		if (!this.container || this._controls) return this;

		this._controls = document.createElement('div');
		this._controls.classList.add('media-container');
		this._controls.addEventListener('click', (e) => e.stopPropagation());

		// Верзняя часть вместе с именем и временем
		const top = document.createElement('div');
		top.classList.add('top-elem');

		const title = createTitle('Это точно не то о чем ты подумал');
		const time = createTime(this.container);
		top.append(title, time);

		// Прогресс бар
		const progress = createProgressBar(this.container);

		// Кнопки паузы перемотки и полного экрана с мьютом
		const controls = document.createElement('div');
		controls.classList.add('media-controls');

		const left = document.createElement('div');
		left.classList.add('media-left');
		left.append(
			createPlayPause(this.container),
			createBackward(this.container),
			createForward(this.container),
		);

		const right = document.createElement('div');
		right.classList.add('media-right');
		right.append(createMute(this.container), createFullscreen(this.container));

		controls.append(left, right);
		this._controls.append(top, progress, controls);
		this.container.$el.append(this._controls);

		return this;
	};
}

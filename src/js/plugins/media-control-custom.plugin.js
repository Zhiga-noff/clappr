import Clappr from 'clappr';
import { createButton } from '../utils/create-button.js';

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
		const container = document.createElement('div');
		container.classList.add('media-container');

		const progress = this.buttonProgress();

		const controls = document.createElement('div');
		controls.classList.add('media-controls');

		const leftControls = document.createElement('div');
		leftControls.classList.add('media-left');

		const rightControls = document.createElement('div');
		rightControls.classList.add('media-right');

		const playPause = this.buttonPlayPause();
		const forward = this.buttonForward();
		const backward = this.buttonBackward();
		leftControls.append(playPause, backward, forward);

		const fullscreen = this.buttonFullscreen();
		const volume = this.buttonMute();
		rightControls.append(volume, fullscreen);

		controls.append(leftControls, rightControls);
		container.append(progress, controls);
		this.container.$el.append(container);
		return this;
	}

	buttonPlayPause() {
		const playPause = createButton('./img/icons/Pause.svg');
		const imgIcon = playPause.firstChild;

		const playback = this.container?.playback;
		if (!playback) return playPause;

		this.listenTo(playback, 'playback:play', () => {
			imgIcon?.setAttribute('src', './img/icons/Pause.svg');
		});

		this.listenTo(playback, 'playback:pause', () => {
			imgIcon?.setAttribute('src', './img/icons/Play.svg');
		});

		playPause.addEventListener('click', (e) => {
			e.stopPropagation();
			if (playback.isPlaying()) playback.pause();
			else playback.play();
		});

		return playPause;
	}

	buttonForward() {
		const forward = createButton('./img/icons/forward.svg');
		forward.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container.playback;

			const current = playback.getCurrentTime();
			const duration = playback.getDuration ? playback.getDuration() : Infinity;
			const newTime = Math.min(current + 15, duration);

			playback.seek(newTime);
		});
		return forward;
	}

	buttonBackward() {
		const backward = createButton('./img/icons/backward.svg');
		backward.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container.playback;

			const current = playback.getCurrentTime();
			const newTime = Math.max(current - 15, 0);

			playback.seek(newTime);
		});
		return backward;
	}

	buttonFullscreen() {
		const fullscreen = createButton('./img/icons/FullScreen.svg');

		fullscreen.addEventListener('click', (e) => {
			e.stopPropagation();
			const playback = this.container?.playback;
			const video = playback?.el;
			if (!video) return;

			// Если видео на паузе, сначала запускаем воспроизведение
			if (video.paused && typeof video.play === 'function') {
				video.play().catch(() => {
					// Иногда браузер блокирует autoplay, просто продолжаем
				});
			}

			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else if (video.requestFullscreen) {
				video.requestFullscreen();
			} else if (video.webkitEnterFullscreen) {
				video.webkitEnterFullscreen();
			}
		});

		return fullscreen;
	}

	buttonMute() {
		const muteBtn = createButton('./img/icons/Volume.svg');

		muteBtn.addEventListener('click', (e) => {
			e.stopPropagation();

			const playback = this.container?.playback;
			if (!playback) return;

			const video = playback.el;
			if (!video) return;

			// Переключаем mute
			video.muted = !video.muted;

			// Меняем иконку
			const icon = muteBtn.firstChild; // предполагаем, что внутри <img>
			if (icon) {
				icon.setAttribute(
					'src',
					video.muted ? './img/icons/VolumeMute.svg' : './img/icons/Volume.svg',
				);
			}
		});

		return muteBtn;
	}

	buttonProgress() {
		const progressContainer = document.createElement('div');
		progressContainer.classList.add('media-progress');

		const progressBar = document.createElement('div');
		progressBar.classList.add('media-progress-bar');

		progressContainer.appendChild(progressBar);

		const playback = this.container?.playback;
		if (!playback) return progressContainer;

		// Обновление прогресса по мере воспроизведения
		const updateProgress = () => {
			const duration = playback.getDuration ? playback.getDuration() : 0;
			const current = playback.getCurrentTime ? playback.getCurrentTime() : 0;
			if (duration > 0) {
				const percent = (current / duration) * 100;
				progressBar.style.width = `${percent}%`;
			}
		};

		// Слушаем события плеера
		this.listenTo(playback, 'playback:timeupdate', updateProgress);
		this.listenTo(playback, 'playback:seek', updateProgress);

		// Перемотка при клике на прогресс
		progressContainer.addEventListener('click', (e) => {
			const rect = progressContainer.getBoundingClientRect();
			const clickX = e.clientX - rect.left;
			const percent = clickX / rect.width;

			const duration = playback.getDuration ? playback.getDuration() : 0;
			if (duration > 0) {
				playback.seek(percent * duration);
			}
		});

		return progressContainer;
	}
}

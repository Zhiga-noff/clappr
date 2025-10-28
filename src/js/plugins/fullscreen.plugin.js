import Clappr from 'clappr';

export default class FullscreenPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'no_fullscreen_plugin';
	}

	bindEvents() {
		const video = this.container.playback.el;
		video.setAttribute('playsinline', '');
	}
}

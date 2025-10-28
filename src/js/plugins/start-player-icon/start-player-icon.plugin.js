import Clappr from 'clappr';

export class StartPlayerIconPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'start_player_icon';
	}

	bindEvents() {
		this.listenTo(this.container, 'container:ready', this.render);
	}

	render() {
		if (!this.container) return;

		const containerEl = this.container.$el[0];
		if (!containerEl) return;

		const playWrapper = containerEl.querySelector('.play-wrapper');
		if (!playWrapper) return;

		const iconChild = playWrapper.firstElementChild;
		if (iconChild) iconChild.remove();

		const newIcon = document.createElement('img');
		newIcon.setAttribute('src', './img/icons/PlayBig.svg');
		playWrapper.appendChild(newIcon);
	}
}

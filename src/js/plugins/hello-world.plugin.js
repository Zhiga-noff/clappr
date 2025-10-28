import Clappr from 'clappr';

export default class HelloWorldPlugin extends Clappr.UIContainerPlugin {
	get name() {
		return 'hello_world_plugin';
	}

	bindEvents() {
		// Слушаю все события
		this.listenTo(this.container, 'all', (eventName, ...args) => {
			console.log(`[Container Event] ${eventName}`, ...args);
		});

		// Слушаю событие, готовый контейнер выводит надпись
		this.listenTo(this.container, 'container:ready', this.render);
	}

	render() {
		const helloElement = document.createElement('div');
		helloElement.innerText = 'Hello World';
		helloElement.classList.add('hello');

		this.container.$el.append(helloElement);
		return this;
	}
}

import Clappr from 'clappr';

export class HelloWorldPlugin extends Clappr.UIContainerPlugin {
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

		this._el = helloElement;
		this.container.$el.append(helloElement);
		return this;
	}

	disable() {
		if (this._el && this._el.parentNode) this._el.parentNode.removeChild(this._el);
		super.disable && super.disable();
	}
}

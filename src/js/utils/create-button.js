export function createButton(icon) {
	const btn = document.createElement('div');
	btn.classList.add('icon');

	const iconElement = document.createElement('img');
	iconElement.setAttribute('src', icon);
	btn.appendChild(iconElement);

	return btn;
}

export const createTitle = (titleText = '') => {
	const title = document.createElement('div');
	title.classList.add('media-title');
	title.textContent = titleText.trim() || 'Без названия';
	return title;
};

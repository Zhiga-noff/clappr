import Clappr from 'clappr';
import {
	DoubleClickFullscreenDisablePlugin,
	DoubleClickRewindPlugin,
	CancelFullscreenOnIosPlugin,
	MediaControlCustomPlugin,
	StartPlayerIconPlugin,
} from './plugins/index.js';
// import HelloWorldPlugin from './plugins/hello-world.plugin.js';

const player = new Clappr.Player({
	source: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
	parentId: '#player',
	plugins: [
		CancelFullscreenOnIosPlugin,
		MediaControlCustomPlugin,
		StartPlayerIconPlugin,
		DoubleClickFullscreenDisablePlugin,
		DoubleClickRewindPlugin,
	],
	mediacontrol: false,
	hideMediaControl: false,
	autoPlay: false,
	width: '100%',
	height: '100%',
	poster:
		'https://images2.minutemediacdn.com/image/upload/c_crop,h_1613,w_2400,x_0,y_116/v1628703164/shape/mentalfloss/649273-youtube-rick_astley.jpg',
});

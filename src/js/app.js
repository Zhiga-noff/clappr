import Clappr from 'clappr';
import FullscreenPlugin from './plugins/fullscreen.plugin.js';
import MediaControlCustomPlugin from './plugins/media-control-custom.plugin.js';
import StartPlayerIconPlugin from './plugins/start-player-icon.plugin.js';
// import HelloWorldPlugin from './plugins/hello-world.plugin.js';

const player = new Clappr.Player({
	source: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
	parentId: '#player',
	plugins: [FullscreenPlugin, MediaControlCustomPlugin, StartPlayerIconPlugin],
	// mediacontrol: { enabled: false },
});

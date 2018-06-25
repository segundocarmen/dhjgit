const { mix } = require('laravel-mix');

mix.react('resources/assets/js/App.jsx','public/js')
mix.scripts([
		'public/bower_components/jquery/dist/jquery.min.js',
		'public/bower_components/bootstrap/dist/js/bootstrap.min.js',
		'public/bower_components/toastr/toastr.min.js',
		'resources/assets/js/vendor/axios.js'
	], 'public/js/bundle/Libraries.js')
.styles([
		'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
		'public/bower_components/toastr/toastr.min.css',
		'public/bower_components/components-font-awesome/css/font-awesome_4.css',
		'resources/assets/css/animate.css',
		'resources/assets/css/Defaults.css',
	], 'public/css/bundle/Libraries.css',)
.babelConfig({
	presets: [
		'env', 
		'stage-2'
	]
});
mix.browserSync({
	proxy: 'http://dhjsystem.test/'
});
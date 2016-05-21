module.exports = function(grunt) {
	
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
		connect: {
			server: {
			  options: {
				port: 9000,
				hostname: 'localhost',
				keepalive:true,
				open:'http://localhost:9000/index.html'
			  }
			}
		}
    });

    // Load the plugin that provides the "less" task.
	grunt.loadNpmTasks('grunt-contrib-connect');

    // Creates the `server` task
	grunt.registerTask('server', ['connect']);

};

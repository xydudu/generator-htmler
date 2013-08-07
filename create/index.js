'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');


var HtmlerGenerator = module.exports = function HtmlerGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    if (args.length) {
        this.projectName = args[0]; 
    } else {
        console.error('no project name !!!'.red.bold); 
        return;
    }

    this.on('end', function () {
        console.log('------------------------------------------------')
        console.log(this.projectName.red.bold +' is ready for hack...'); 
        console.log('------------------------------------------------')
      //this.installDependencies({ skipInstall: options['skip-install'] });
    });
};

util.inherits(HtmlerGenerator, yeoman.generators.Base);

HtmlerGenerator.prototype.app = function app() {
    var project_path = 'projects/'+ this.projectName;
    this.mkdir(project_path);
    this.mkdir(project_path +'/src');

    this.mkdir(project_path +'/src/jade');
    this.mkdir(project_path +'/src/less');

    // TODO support coffeescript
    this.mkdir(project_path +'/src/scripts');
    this.mkdir(project_path +'/src/images');

    this.mkdir(project_path +'/build');
    this.mkdir(project_path +'/build/html');
    this.mkdir(project_path +'/build/css');
    this.mkdir(project_path +'/build/scripts');
    this.mkdir(project_path +'/build/images');
     
};


HtmlerGenerator.prototype.projectfiles = function projectfiles() {
    this.template('../_index.jade', 
            'projects/'+ this.projectName +'/src/jade/index.jade');

    this.write('projects/'+ this.projectName +'/src/less/main.less', 
            'h1 {color: red}');
};

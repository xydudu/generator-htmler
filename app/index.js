'use strict';

var util = require('util');
var yeoman = require('yeoman-generator');


var HtmlerGenerator = module.exports = function HtmlerGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.on('end', function () {
        this.installDependencies({
            bower: false,
            skipInstall: options['skip-install'],
            callback: function() {
                console.log('Everything is ready!');
                console.log('Next: yo htmler:create your_project_name'.yellow.bold);
            }
        });
    });
};

util.inherits(HtmlerGenerator, yeoman.generators.Base);

HtmlerGenerator.prototype.app = function app() {
    this.mkdir('projects');
};

HtmlerGenerator.prototype.projectfiles = function projectfiles() {

    this.copy('_package.json', 'package.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_editorconfig', '.editorconfig');
    this.copy('_list-item.html', '.list-item.html');
    this.copy('_list-list.html', '.list-list.html');
    //this.write('/less/main.less', 'h1 {color: red}');
};

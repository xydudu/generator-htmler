'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var HtmlerGenerator = module.exports = function HtmlerGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HtmlerGenerator, yeoman.generators.Base);

HtmlerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  //console.log(this.yeoman);

  //var prompts = [{
  //  type: 'confirm',
  //  name: 'someOption',
  //  message: 'Would you like to enable this option?',
  //  default: true
  //}];

  var prompts = [{
    name: 'projectName',
    message: 'Set a name for your project: ',
    default: 'myProject'
  }];
  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    cb();
  }.bind(this));
};

HtmlerGenerator.prototype.app = function app() {

  this.mkdir('dev');
  this.mkdir('dev/jade');
  this.mkdir('dev/less');
  this.mkdir('dev/scripts');
  this.mkdir('dev/images');

  this.mkdir('product');
  this.mkdir('product/templates');
  this.mkdir('product/css');
  this.mkdir('product/scripts');
  this.mkdir('product/images');
  

  this.template('_package.json', 'package.json');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

HtmlerGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.template('../jade/index.jade', 'dev/jade/index.jade');
};

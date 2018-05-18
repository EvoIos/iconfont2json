#!/usr/bin/env node --harmony
var fs = require('fs');
var program = require('commander');
var chalk = require('chalk');
var opentype = require('opentype.js');

var outputFileName = 'output.json'

program
.arguments('<file>')
.option('-o, --output <filename>', 'The output filename, default: output.json')
.action(function(file) {
	if (program.output) { 
		outputFileName = program.output; 
	}
	var font = opentype.loadSync(file);
	var html, tablename, table, property, value;

	// Array: name
	var names = font.tables['post']['names'].filter ( function(x) { return x.length !== 0 });
	// Object ： key - hex ，value - index 
	var indexMap = font.tables['cmap']['glyphIndexMap'];

	// process
	var sortable = [];
	for (var key in indexMap) {
	    sortable.push([key, indexMap[key]]);
	}
	sortable.sort(function(a, b) {
	    return a[1] - b[1];
	});

	//output json
	var json = {};
	for (var i = 0 ; i < sortable.length; i++) {
		var value = sortable[i][0];
		var key = names[i];
		json[key] = Number(value);
	}
	var jsonContent = JSON.stringify(json);
	fs.writeFile(outputFileName, jsonContent, 'utf8', function (err) {
    	if (err) {
			console.log(chalk.red("An error occured while writing JSON Object to File."));
        	return console.log(chalk.red(err));
   		}
    	console.log(chalk.green("success"));
	});
})
.parse(process.argv);
var sys = require('sys')
   , fs = require('fs')
   , M = require('./Mustache');
   
   


var code = '';
var docs = {};

docs.main = '';
docs.API = '';

// read in the the main.js file as our main boilerplate code 
code += fs.readFileSync('./main.js', encoding='utf8');
code = M.Mustache.to_html(code, {"today":new Date().getTime()});

docs.main += fs.readFileSync('./docs.js', encoding='utf8');

// parse entire lib directory and concat it into one file for the browser
var lib = paths('./lib');


var format= require('../index');


function moduleTree(level, context){
  // generate bundle for code on the browser
  for(var module in level){
    code += ( '\n' + ''+context+'.' + module + ' = {};');
    for(var method in level[module]){
      code += ( '\n' + ''+context+'.' + module);
      code += ( '.' + method + ' = ');
      if( typeof level[module][method] == 'object'){
        moduleTree( level[module][method], method);
      }
      else{
        try{
          code += (level[module][method].toString() + ';\n');
        }
        catch(err){
          code += ('fiiii' + ';\n');
          
        }
      }
    }
  }
}

moduleTree(format, 'format');



function docsTree(level){

  // generate nice tree of api for docs
  docs.API += '<ul>';
  for(var method in level){
    docs.API += '<li>' + method;
      docs.API += '<ul>'
      if(typeof level[method] == 'object' && method != 'CultureInfo'){
        docsTree(level[method]);
      }
      else{
       // docs.API += '<li>' + method + '</li>';
      }
      docs.API += '</ul>';
    docs.API += '</li>';
  }
  docs.API += '</ul>';


}


docsTree(format);



// exports hack for dual sided stuff
// if we are running in a CommonJS env, export everything out
code += 'if(typeof exports != "undefined"){for(var prop in format){exports[prop] = format[prop];}}';

// generate some samples sets (move this code to another section)
fs.writeFile('../js-fu.js', code, function() {
  sys.puts("js-fu.js generated successfully!");
});

var docOutput = M.Mustache.to_html(docs.main, {"API":docs.API});

// generate some samples sets (move this code to another section)
fs.writeFile('../Readme.md', docOutput, function() {
  sys.puts("Docs generated successfully!");
});

/*********************** BUILD HELPER METHODS *********************/

  // Recursively traverse a hierarchy, returning a list of all relevant .js files.
  function paths(dir) {
      var paths = [];

      try { fs.statSync(dir) }
      catch (e) { return e }

      (function traverse(dir, stack) {
          stack.push(dir);
          fs.readdirSync(stack.join('/')).forEach(function (file) {
              var path = stack.concat([file]).join('/'),
                  stat = fs.statSync(path);

              if (file[0] == '.' || file === 'vendor') {
                  return;
              } else if (stat.isFile() && /\.js$/.test(file)) {
                  paths.push(path);
              } else if (stat.isDirectory()) {
                  paths.push(path);
                  traverse(file, stack);
              }
          });
          stack.pop();
      })(dir || '.', []);

      return paths;
  }


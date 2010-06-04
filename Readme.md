## how do i use javascript-fu?

[if you don't like reading documentation, check out the interactive javascript-fu demo](http://maraksquires.com/javascript-fu/)

### browser

    <script src = "js-fu.js" type = "text/javascript"></script>
    <script>
      var x = fu.isNumber(13); // true
      var x = fu.isDate('07/01/2010'); // true
    </script>

### node.js

    var fu = require('./js-fu');
    var x = fu.isNumber(13); // true
    var x = fu.isDate('07/01/2010'); // true

once you have required the js-fu library, you have access to the "fu" object. inside this object you will find ...
 

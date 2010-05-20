
var vows = require('../vows/lib/vows'),
    assert = require('assert');

var sys = require('sys');

var format = require('../index');


vows.describe('format.js lib/types').addVows({
  "isNumber()": {
    "on a number instance": {
      topic: new Number(1234),
      "this is a number":function( s ){
        var result = format.types.isNumber( s );
        if( result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a number');
        }
      }
    },
    "on a string number ": {
      topic: '1234',
      "this is not a number":function( s ){
        var result = format.types.isNumber( s );
        if( !result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a number');
        }
      }
    },
    "on number literal": {
      topic: 1234,
      "this is not a number":function( s ){
        var result = format.types.isNumber( s );
        if( !result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a number');
        }
      }
    },
    "on string with randomly placed numbers": {
      topic: 'kjas(^12p/)^&34mm6',
      "this is not a number":function( s ){
        var result = format.types.isNumber( s );
        if( !result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a number');
        }
      }
    }
  },
  "isString()": {
    "on a string instance": {
      topic: new String('foo'),
      "this is a string":function( s ){
        var result = format.types.isString( s );
        if( result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is a string');
        }
      }
    },
    "on a string literal ": {
      topic: 'foo',
      "this is not a string":function( s ){
        var result = format.types.isString( s );
        if( !result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is a string');
        }
      }
    },
    "on a number literal": {
      topic: 1234,
      "this is not a number":function( s ){
        var result = format.types.isString( s );
        if( !result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a string');
        }
      }
    },
    "on an array": {
      topic: new Array(1,2,3),
      "this is not a string":function( s ){
        var result = format.types.isString( s );
        if( result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a string');
        }
      }
    },
    "on an object": {
      topic: {},
      "this is not a string":function( s ){
        var result = format.types.isString( s );
        if( result ){
          assert.ok( true );
        }
        else{
          assert.ok( false, '"' + s + '"' + ' is not a string');
        }
      }
    }
  }
});

require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Paginate = require('react-simple-paginate');

var App = React.createClass({
  displayName: 'App',

  componentWillMount: function componentWillMount() {
    var list = [];
    for (var i = 1; i <= 100; i++) {
      list.push("Element : " + i);
    }
    var currenPageElems = list.slice(0, 10);
    this.setState({ 'list': list, 'offset': 0, currentElements: currenPageElems });
  },

  handler: function handler(offset) {
    var pageElems = this.state.list.slice(offset, offset + 10);
    this.setState({ offset: offset, currentElements: pageElems });
  },

  render: function render() {
    var self = this;
    return React.createElement(
      'div',
      null,
      React.createElement(
        'ul',
        null,
        self.state.currentElements.map(function (element) {
          return React.createElement(
            'li',
            null,
            element
          );
        })
      ),
      React.createElement(
        'div',
        null,
        React.createElement(Paginate, {
          total: '100',
          containerClassName: 'pages-list',
          currentPageClassName: 'active-page',
          pageClassName: 'page-link',
          handler: this.handler
        })
      )
    );
  }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-simple-paginate":undefined}]},{},[1]);

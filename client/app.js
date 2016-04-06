//var m = require('mithril')
//var MyComponent = require('./components/MyComponent')
//var TestComponent = require('./components/TestComponent')
////
//// Global variable for global state (e.g. currentUser)
////
//window.App = {}
//
////
//// Client-side routing
////
//m.route.mode = 'pathname'
//m.route(document.getElementById('app'), '/', {
//
//  '/': MyComponent,
//	'/test': TestComponent
//})


var React = require('react');
var ReactDOM = require('react-dom');

var Hello = React.createClass({
  render: function () {
    return (
      <div>Hello ReactJS Program!</div>
    )
  }
});

ReactDOM.render(<Hello />, document.getElementById('app'));

var React = require('react');
var ReactDOM = require('react-dom');
var Paginate = require('react-simple-paginate');

var App = React.createClass({
	render () {
		return (
			<div>
				<Paginate />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

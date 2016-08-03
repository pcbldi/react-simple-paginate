var React = require('react');
var ReactDOM = require('react-dom');
var Paginate = require('react-simple-paginate');

var App = React.createClass({

	handler: function(offs){
			console.log(offs);
	},
	
	render () {
		return (
			<div>
				<Paginate 
				total="50"
				handler={this.handler}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));

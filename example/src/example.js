var React = require('react');
var ReactDOM = require('react-dom');
var Paginate = require('react-simple-paginate');

var App = React.createClass({

  componentWillMount: function(){
    var list=[];
    for(var i=1;i<=100; i ++){
      list.push("Element : "+ i);
    }
    var currenPageElems = list.slice(0,10);
    this.setState({'list':list,'offset':0,currentElements:currenPageElems});
  },

  handler: function(offset){
    var pageElems = this.state.list.slice(offset,offset+10);
    this.setState({offset:offset,currentElements:pageElems});
  },

  render () {
    var self=this;
    return (
	<div>
	<ul>
	{self.state.currentElements.map(function(element) {
          return (
              <li>
              {element}
            </li>
          );
        })}
      </ul>
	<div>
	<Paginate
      total="100"
      containerClassName="pages-list"
      currentPageClassName = "active-page"
      pageClassName = "page-link"
      handler={this.handler}
	/>
	</div>
	</div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));

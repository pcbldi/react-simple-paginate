var React = require('react');
var update = require('react-addons-update');

var Paginate = React.createClass({

  getDefaultProps: function(){
    return {
      prevLabel: "previous",
      nextLabel: "next",
      offset: 0,
      limit: 10,
      pageClassName: "pagination-link",
      containerClassName: "pagination-container"
    }

  },

  componentWillMount: function(){
    this.setState(update(this.state,{
      $set: {'currentPage':(Math.max(Math.ceil(this.props.offset/this.props.limit)),1)}
    }));
  },

  pages: function(){
    var pageCount=(Math.ceil(this.props.total/this.props.limit));
    var pages=[]
    for(int i=1;i<=pageCount;i++){
    	pages.push(i);
    }
    return pages;
  },

  onClick: function(pageNumber) {
    var self=this;
    this.setState(update(this.state,{
      $set: {'currentPage':pageNumber}
    }),function(){
      self.props.handler((pageNumber-1)*this.props.limit);
    });
  },

  render () {
    let prevLink;
    let nextLink;
    let lastPage= this.state.pages[this.state.pages.length-1];
    if(this.state.currentPage > 1){
      prevLink = (<li class="{this.props.pageClassName}">
		  <a onClick="(event) => this.onClick(currentPage-1)"> {this.props.prevLabel}</a>
		  </li>)
    }
    else{
      prevLink="";
    }
    if(this.state.currentPage < lastPage)){
      nextLink = (<li class="{this.props.pageClassName}">
		  <a onClick="(event) => this.onClick(currentPage+1)"> {this.props.nextLabel}</a>
		  </li>)
    }
    else{
      nextLink="";
    }
    return <ul rt-scope="this.state.currentPage as currentPage" class="{this.props.containerClassName}">
      {prevLink}
    {this.pages.map(function(pageNumber, idx) {
      return (
	  <li class="{this.props.pageClassName}">
	  <a onClick="(event) => this.onClick(pageNumber)"> {pageNumber}</a>
	  </li>
      );
    })}
    {nextLink}
    </ul>
  }
});

export default Paginate;

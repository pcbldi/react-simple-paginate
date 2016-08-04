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
    for(var i=1;i<=pageCount;i++){
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
    var pages= this.pages();
    var self=this;
    let lastPage= pages[pages.length-1];

    if(this.state.currentPage > 1){
      prevLink = (<li className={this.props.pageClassName + (this.state.currentPage==0 ? " "+ this.props.currentPageClassName:"") } key={0}>
		  <a onClick={(event) => self.onClick(this.state.currentPage-1)}> {this.props.prevLabel}</a>
		  </li>)
    }
    else{
      prevLink="";
    }

    if(this.state.currentPage < lastPage){
      nextLink = (<li className={this.props.pageClassName + (this.state.currentPage==lastPage ? " "+ this.props.currentPageClassName:"")} key={lastPage+1}>
		  <a onClick={(event) => self.onClick(this.state.currentPage+1)}> {this.props.nextLabel}</a>
		  </li>)
    }
    else{
      nextLink="";
    }
    return <ul className={this.props.containerClassName}>
      {prevLink}
    {pages.map(function(pageNumber, idx) {
      return (
	  <li className={self.props.pageClassName + (self.state.currentPage==pageNumber ? " "+ self.props.currentPageClassName:"")} key={idx}>
	  <a onClick={(event) => self.onClick(pageNumber)}> {pageNumber}</a>
	  </li>
      );
    })}
    {nextLink}
    </ul>
  }
});

export default Paginate;

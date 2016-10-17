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
      containerClassName: "pagination-container",
      centerPagesCount: 5,
      cornerPagesCount:2,
      leftMarker:"...",
      rightMarker:"..."
    }
  },

  getInitialState: function(){
    return {
      'currentPage':(Math.max(Math.ceil(this.props.offset/this.props.limit)),1),
      'pages':this.pages(),
      'initialPages':[],
      'centerPages':[],
      'finalPages':[],
      'showLeftMarker':false,
      'showRightMarker':false
    }
  },

  componentDidMount: function(){
    this.updateLinks();
  },

  updateLinks: function(){
    var cornerLinkLimit = this.props.cornerPagesCount;
    var pages =this.state.pages;
    var count = pages.length;
    var currentPage = this.state.currentPage;
    var initialPages = pages.slice(0,cornerLinkLimit);
    var finalPages = pages.slice(Math.max(cornerLinkLimit, count- cornerLinkLimit),count);
    var centerStartIndex = Math.max(cornerLinkLimit, currentPage - this.props.centerPagesCount);
    var centerEndIndex = Math.min(currentPage + this.props.centerPagesCount, count-cornerLinkLimit);
    var showLeftMarker = (centerStartIndex > cornerLinkLimit);
    var showRightMarker = (centerEndIndex < count-cornerLinkLimit-1);
    var centerPages = pages.slice(centerStartIndex,centerEndIndex);

    this.setState(update(this.state,{
      $set: {'initialPages':initialPages,
	     'finalPages': finalPages,
	     'centerPages':centerPages,
	     'showLeftMarker': showLeftMarker,
	     'showRightMarker':showRightMarker}
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
      self.updateLinks();
      self.props.handler((pageNumber-1)*this.props.limit);
    });
  },

  render () {
    let prevLink;
    let nextLink;
    var self=this;
    let lastPage= this.state.pages[this.state.pages.length-1];
    var leftMarker="";
    var rightMarker="";

    if(this.state.currentPage > 1){
      prevLink = (<li className={this.props.pageClassName + (this.state.currentPage==0 ? " "+ this.props.currentPageClassName:"") } key={0}>
		  <a onClick={(event) => self.onClick(this.state.currentPage-1)} href="javascript:void(0)"> {this.props.prevLabel}</a>
		  </li>)
    }
    else{
      prevLink="";
    }

    if(this.state.showLeftMarker){
      leftMarker=(<li className="left-marker">{this.props.leftMarker}</li>);
    }

    if(this.state.showRightMarker){
      rightMarker=(<li className="right-marker">{this.props.rightMarker}</li>);
    }

    if(this.state.currentPage < lastPage){
      nextLink = (<li className={this.props.pageClassName + (this.state.currentPage==lastPage ? " "+ this.props.currentPageClassName:"")} key={lastPage+1}>
		  <a onClick={(event) => self.onClick(this.state.currentPage+1)} href="javascript:void(0)"> {this.props.nextLabel}</a>
		  </li>)
    }
    else{
      nextLink="";
    }
    return <ul className={this.props.containerClassName}>
      {prevLink}
    {this.state.initialPages.map(function(pageNumber, idx) {
      return (
	  <li className={self.props.pageClassName + (self.state.currentPage==pageNumber ? " "+ self.props.currentPageClassName:"")} key={idx}>
	  <a onClick={(event) => self.onClick(pageNumber)} href="javascript:void(0)"> {pageNumber}</a>
	  </li>
      );
    })}
    {leftMarker}
    {this.state.centerPages.map(function(pageNumber, idx) {
      return (
	  <li className={self.props.pageClassName + (self.state.currentPage==pageNumber ? " "+ self.props.currentPageClassName:"")} key={idx}>
	  <a onClick={(event) => self.onClick(pageNumber)} href="javascript:void(0)"> {pageNumber}</a>
	  </li>
      );
    })}
    {rightMarker}
    {this.state.finalPages.map(function(pageNumber, idx) {
      return (
	  <li className={self.props.pageClassName + (self.state.currentPage==pageNumber ? " "+ self.props.currentPageClassName:"")} key={idx}>
	  <a onClick={(event) => self.onClick(pageNumber)} href="javascript:void(0)"> {pageNumber}</a>
	  </li>
      );
    })}
    {nextLink}
    </ul>
  }
});

export default Paginate;

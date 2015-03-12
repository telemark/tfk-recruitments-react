'use strict';

var React = require('react');
var getOpenings = require('./utils/getOpenings');
var fixDateFormat = require('./utils/fixDateFormat');
var apiUrl = 'https://api.t-fk.no/recruitments';

var ShowMoreLink = React.createClass({
  render: function(){
    return(
      <div className="clearfix">
        <a href="https://hrm.btvregion.no/tfk_recruitment/" target="_blank" className="see-more">Se alle ledige stillinger</a>
      </div>
    );
  }
});

var Opening = React.createClass({
  render: function(){
    return (
      <div className="grid__item--4-12">
        <div className="item media">
          <div className="item__icon media__img icon--person"></div>
          <div className="media__bd">
            <h3 className="item__header">
              <a href={this.props.opening.link} target="_blank">{this.props.opening.title}</a></h3>
              <span className="sidenote">Søknadsfrist: {fixDateFormat(this.props.opening.deadline)}</span>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
  return {
    openings: [],
    showMore: false
  };
},
  componentDidMount: function() {
    var that = this;
    getOpenings({
      url: apiUrl
      }, function(error, data){
      if(error){
        console.error(error);
      } else {
        that.setState({
          openings:data.openings,
          showMore: data.showMore
        });
      }
    });
  },

render: function() {
  var openings = this.state.openings.map(function (opening) {
    return (
      <Opening opening={opening} key={opening.jobid} />
    );
  });
  var showMoreLinkOrNot = this.state.showMore ? <ShowMoreLink />: '';
  return (
    <div className="constrained-content">
  <h2>Ledige stillinger</h2>
      <div className="clearfix grid">
      {openings}
        </div>

    {showMoreLinkOrNot}
</div>
);
}
});

React.render(<App />, document.getElementById('tfk-recruitments'));
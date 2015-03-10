'use strict';

var React = require('react');
var getOpenings = require('./utils/getOpenings');
var apiUrl = 'https://api.t-fk.no/recruitments';

var Opening = React.createClass({
  render: function(){
    return (
      <div className="grid__item--4-12">
        <div className="item media">
          <div className="item__icon media__img icon--person"></div>
          <div className="media__bd">
            <h3 className="item__header">
              <a href={this.props.opening.link} target="_blank">{this.props.opening.title}</a></h3>
              <span className="sidenote">Søknadsfrist: {this.props.opening.deadline}</span>
          </div>
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
  return {
    openings: []
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
          openings:data
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
  return (
    <div className="constrained-content">
  <h2>Ledige stillinger</h2>
      <div className="clearfix grid">
      {openings}
        </div>
</div>
);
}
});

React.render(<App />, document.getElementById('tfk-recruitments'));
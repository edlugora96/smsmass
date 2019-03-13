/* jshint unused:false */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '$redux/actions.js';
import store from '$redux/store.js';

import './styles/home.styl';

class Home extends Component {

  render() {
    return pug`
      React.Fragment
        .card
          .card-header
            h5.card-title Users Behavior
            p.card-category 24 Hours performance

          .card-body
            canvas#chartHours(width="400", height="100")

          .card-footer
            hr
            .stats
              i.fa.fa-history
              |  Updated 3 minutes ago

        .card.card-stats
          .card-body
            .icon-big.text-center.icon-warning
              i.nc-icon.nc-globe.text-warning

            .numbers
              p.card-category Capacity
              p.card-title
                | 150GB

          .card-footer
            hr
            .stats
              i.fa.fa-refresh
              |  Update Now

        .card.card-stats
          .card-body
            .icon-big.text-center.icon-warning
              i.nc-icon.nc-vector.text-danger

            .numbers
              p.card-category Errors
              p.card-title
                | 23

          .card-footer
            hr
            .stats
              i.fa.fa-clock-o
              |  In the last hour

        .card.card-stats
          .card-body
            .icon-big.text-center.icon-warning
              i.nc-icon.nc-money-coins.text-success

            .numbers
              p.card-category Revenue
              p.card-title
                | $ 1,345

          .card-footer
            hr
            .stats
              i.fa.fa-calendar-o
              |  Last day

        .card.card-stats
          .card-body
            .icon-big.text-center.icon-warning
              i.nc-icon.nc-favourite-28.text-primary

            .numbers
              p.card-category Followers
              p.card-title
                | +45K

          .card-footer
            hr
            .stats
              i.fa.fa-refresh
              |  Update now

        .card
          .card-header
            h5.card-title Email Statistics
            p.card-category Last Campaign Performance

          .card-body
            canvas#chartEmail

          .card-footer
            .legend
              i.fa.fa-circle.text-primary
              |  Opened
              i.fa.fa-circle.text-warning
              |  Read
              i.fa.fa-circle.text-danger
              |  Deleted
              i.fa.fa-circle.text-gray
              |  Unopened

            hr
            .stats
              i.fa.fa-calendar
              |  Number of emails sent

        .card.card-chart
          .card-header
            h5.card-title NASDAQ: AAPL
            p.card-category Line Chart with Points

          .card-body
            canvas#speedChart(width="400", height="100")

          .card-footer
            .chart-legend
              i.fa.fa-circle.text-info
              |  Tesla Model S
              i.fa.fa-circle.text-warning
              |  BMW 5 Series

            hr
            .stats
              i.fa.fa-check
              |  Data information certified
    `;
  }
}

const mapStateToProps = () => ({
  ...store.getState()
});
const mapDispatchToProps = {
  ...actions
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
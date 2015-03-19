// @flow
var Store = require('./store')
var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate, entriesForWeek, entriesForDay, entryProject} = Store
var moment = require("moment")
var Style = require('./style')
var React = require('react')
var {Day} = require('./day')

var Weeks = React.createClass({
  render():any {
    var {entries} = this.props

    // not sure what I should be doing with this
    var weeks = weeksBack(lastWeekOfMonth(moment()), 24)

    var content = weeks.reverse().map(function(date) {
      return <Week date={date} key={date} entries={entriesForWeek(entries, date)}/>
    })

    return <div style={Style.weeks}>
      {content}
    </div>
  }
}) 

var Week = React.createClass({
  render():any {
    var {date, entries} = this.props
    var dates = Store.weekDates(date)

    var content = dates.map(function(d) {
      return <Day date={d} key={d} entries={entriesForDay(entries, d)}/>
    })

    var style = {}

    return <div style={style}>
      {content}
    </div>
  }
})

module.exports = {Week, Weeks}


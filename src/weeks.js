// @flow
var Store = require('./store')
var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate, entriesForWeek, entriesForDay, entryProject} = Store
var moment = require("moment")
var Style = require('./style')
var React = require('react')
var {Day} = require('./day')

class Weeks extends React.Component {
  render() {
    var {entries, open} = this.props

    // not sure what I should be doing with this
    var weeks = weeksBack(lastWeekOfMonth(moment()), 24)

    var content = weeks.reverse().map(function(date) {
      return <Week date={date} key={date} entries={entriesForWeek(entries, date)} open={open}/>
    })

    return <div style={Style.weeks}>
      {content}
    </div>
  }
}

class Week extends React.Component {
  render() {
    var {date, entries, open} = this.props
    var dates = Store.weekDates(date)

    var content = dates.map(function(d) {
      return <Day date={d} key={d} entries={entriesForDay(entries, d)} open={open}/>
    })

    var style = {}

    return <div style={style}>
      {content}
    </div>
  }
}

module.exports = {Week, Weeks}


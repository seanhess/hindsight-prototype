// @flow
var Store = require('./store')
var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate, entriesForWeek, entriesForDay, entryProject} = Store
var moment = require("moment")
var Style = require('./style')
var React = require('react')
var {assign} = require('lodash')


// TODO: get the current month (hmm, and a sneak peek of the next month, hmm)
// back 8 weeks


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

var Day = React.createClass({
  render():any {
    var {date, entries} = this.props
    var format = dayFormat(date)
    var image = dayImageUrl(entries)

    var style = assign(Style.dayCell(date), Style.backgroundImage(image))

    var projects = entries.filter(entryProject).map(entryProject)

    var activities = projects.map(function(project) {
      return <Activity>{project}</Activity>
    })

    return <div style={style} onClick={() => console.log("HI")}>
      <span style={Style.dayDateLabel}>{date.format(format)}</span>
      <div>{activities}</div>
    </div>
  }
})

var Activity = React.createClass({
  render() {
    return <div style={Style.activity}>{this.props.children}</div>
  }
})

module.exports = {Week, Day, Weeks}

function dayFormat(date) {
  var format = "D"

  if (date.get('date') === 1 || date.get('date') === Store.lastDayOfMonth(date).get('date')) {
    format = "MMM D"
  }

  return format
}

function dayImageUrl(entries):?string {
  if (!entries || !entries.length) {
    return null
  }
  return "/data/"+entries[0].image
}

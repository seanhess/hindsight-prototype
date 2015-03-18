// @flow
var Store = require('./store')
var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate} = Store
var moment = require("moment")
var Style = require('./style')
var React = require('react')


// TODO: get the current month (hmm, and a sneak peek of the next month, hmm)
// back 8 weeks


var Weeks = React.createClass({
  render():any {
    var {entries} = this.props

    //var weeks = groupByWeek(entries)
    var weeks = weeksBack(lastWeekOfMonth(moment()), 20)

    var content = weeks.reverse().map(function(date) {
      return <Week date={date} key={date}/>
    })

    return <div style={Style.weeks}>
      {content}
    </div>
  }
}) 

var Week = React.createClass({
  render():any {
    var {date} = this.props
    var dates = Store.weekDates(date)
    var content = dates.map(function(d) {
      return <Day date={d} key={d} />
    })

    var style = {}

    return <div style={style}>
      {content}
    </div>
  }
})

var Day = React.createClass({
  render():any {
    var {date} = this.props
    var style = Style.day(date)
    var format = dayFormat(date)

    return <div style={style}>
      <span style={{fontSize: 'smaller', paddingLeft: 4}}>{date.format(format)}</span>
    </div>
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

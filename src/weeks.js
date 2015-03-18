// @flow
var Store = require('./store')
var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate} = Store
var moment = require("moment")
var Style = require('./style')
var React = require('react')


// TODO: get the current month (hmm, and a sneak peek of the next month, hmm)
// back 8 weeks

var DayWidth = 120

var Weeks = React.createClass({
  render():any {
    var {entries} = this.props

    //var weeks = groupByWeek(entries)
    var weeks = weeksBack(lastWeekOfMonth(moment()), 20)

    var content = weeks.reverse().map(function(date) {
      return <Week date={date} key={date}/>
    })

    var style = {
      margin: 10,
    }

    return <div style={style}>
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

    //var borderLeft = 1
    //var borderTop = 1

    var leftIsBorder = false
    var rightIsBorder = false
    var bottomIsBorder = false
    var topIsBorder = false

    if (isOtherMonthLeft(date) || isStartOfWeek(date)) {
      leftIsBorder = true
    }

    if (isEndOfWeek(date)) {
      rightIsBorder = true
    }

    var style = {
      display: 'inline-block',
      width: DayWidth,
      height: DayWidth,
      border: 'solid 1px #DDDDDD',
      borderBottomWidth: 0,
      borderRightWidth: rightIsBorder ? 1 : 0,
      borderLeftColor: leftIsBorder ? 'black' : '#DDD',
      borderRightColor: rightIsBorder ? 'black' : '#DDD',
      borderTopColor: isOtherMonthUp(date) ? 'black' : '#DDD',
      //borderLeftWidth: borderLeft,
      //borderTopWidth: borderTop,
      boxSizing: 'border-box',
    }

    // If day + 7 is a different month, then you want to change the border
    // ooooh ok!

    var format = "D"

    if (date.get('date') === 1 || date.get('date') === Store.lastDayOfMonth(date).get('date')) {
      format = "MMM D"
    }

    return <div style={style}>
      <span style={{fontSize: 'smaller', paddingLeft: 4}}>{date.format(format)}</span>
    </div>
  }
})

module.exports = {Week, Day, Weeks}

function isOtherMonthLeft(date) {
  return (moment(date).subtract(1, 'day').get('month') != date.get('month'))
}

function isOtherMonthUp(date) {
  return (moment(date).subtract(7, 'day').get('month') != date.get('month'))
}

function isStartOfWeek(date) {
  return date.day() === 0
}

function isEndOfWeek(date) {
  return date.day() === 6
}


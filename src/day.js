// @flow
var React = require('react')
var {assign} = require('lodash')
var Store = require('./store')
var Style = require('./style')


class Day extends React.Component {
  render() {
    var {date, entries, open} = this.props
    var format = dayFormat(date)
    var image = dayImageUrl(entries)

    var style = assign(Style.dayCell(date), Style.backgroundImage(image))

    var projects = entries.filter(Store.entryProject).map(Store.entryProject)

    var activities = projects.map(function(project) {
      return <Activity>{project}</Activity>
    })

    return <div style={style} onClick={() => open(entries)}>
      <span style={Style.dayDateLabel}>{date.format(format)}</span>
      <div>{activities}</div>
    </div>
  }
}

class Activity extends React.Component {
  render() {
    return <div style={Style.activity}>{this.props.children}</div>
  }
}


module.exports = {Day, Activity}

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
  return Store.imageUrl(entries[0].image)
}

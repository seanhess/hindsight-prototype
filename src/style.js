// @flow

var {weeksBack, lastWeekOfMonth, EntriesWeeks, formatDate, isOtherMonthUp, isOtherMonthLeft, isStartOfWeek, isEndOfWeek} = require('./store')

var DayWidth = 120
var CellFontSize = 12

function dayCell(date:any):Object {

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

  return {
    fontSize: CellFontSize,
    display: 'table-cell',
    verticalAlign: 'bottom',
    position: 'relative',
    width: DayWidth,
    height: DayWidth,
    marginBottom: -5,
    border: 'solid 1px #DDDDDD',
    borderBottomWidth: 0,
    borderRightWidth: rightIsBorder ? 1 : 0,
    borderLeftColor: leftIsBorder ? 'black' : '#DDD',
    borderRightColor: rightIsBorder ? 'black' : '#DDD',
    borderTopColor: isOtherMonthUp(date) ? 'black' : '#DDD',
    boxSizing: 'border-box',
  }
}

function backgroundImage(url:?string):Object {

  var background = 'none'

  if (url) {
    background = "url('"+url+"')"
  }

  return {
    background: background,
    backgroundSize: 'cover'
  }   
}

var weeks = {
  margin: 10,
}

var dayDateLabel = {
  position: 'absolute',
  top: 2,
  left: 2,
  textAlign: 'center',
  color: 'black',
  paddingLeft: 2,
  paddingRight: 2,
  backgroundColor: 'rgba(255,255,255,0.7)',
}

var activity = {
  border: 'solid 1px #1155CC',
  background: '#D4E3FC',
  margin: 1,
  padding: 0,
  textAlign: 'center',
  fontSize: 12
}



module.exports = {dayCell, DayWidth, weeks, backgroundImage, dayDateLabel, activity}

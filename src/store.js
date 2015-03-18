var {groupBy, compose, range} = require('lodash')
var moment = require('moment')

type Entry = {
  date: string;
}

//var entry:Entry = {date: 'woot'}


// ENTRIES is a global variable exported in data.json so I can avoid cross domain issues
declare var GLOBAL_ENTRY_DATA
var Entries = GLOBAL_ENTRY_DATA
var EntriesWeeks = groupedWeeks(Entries)

var dateFormat = "YYYY-MM-DD"

function groupedWeeks(entries:Array<Entry>) {
  return groupBy(entries, compose(formatDate, weekStartSunday, entryDate))
}

function groupedDays(entries:Array<Entry>) {
  return groupBy(entries, entryDate)
}

function lastWeekOfMonth(date:string) {
  return weekStartSunday(lastDayOfMonth(date))
}

function weeksBack(start:string, n:number) {
  return range(0, n).map(function(x) {
    return moment(start).subtract(x * 7, 'days')
  })
}

function weekDates(date:string) {
  return range(0, 7).map(function(x) {
    return moment(date).add(x, 'days')
  })
}

// make it a moment or clone it
function weekStartSunday(date:string) {
  var d = moment(date)
  return d.day(0)
}

function weekStartMonday(date:string) {
  var d = moment(date)
  var day = d.day()

  if (day === 0) {
    d = d.day(-6)
    return d
  }
  else {
    return d.day(1)
  }
}

function formatDate(dateMoment:any, format:string = dateFormat):string {
  return dateMoment.format(format)
}


function entryDate(e:Entry):string { 
  return e.date 
}

function lastDayOfMonth(m:string) { 
  return moment(m).endOf('month') 
}

module.exports = {Entries, EntriesWeeks, dateFormat, groupedWeeks, groupedDays, lastWeekOfMonth, weeksBack, weekDates, weekStartSunday, weekStartMonday, formatDate, entryDate, lastDayOfMonth}



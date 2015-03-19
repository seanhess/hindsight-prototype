// @flow
var {groupBy, compose, range} = require('lodash')
var moment = require('moment').utc

type Entry = {
  date: string;
  project: string;
  image: string;
}

type Moment = {
  get(name:string):number;
  day():number;
}

//var entry:Entry = {date: 'woot'}


// ENTRIES is a global variable exported in data.json so I can avoid cross domain issues
var DateFormat = "YYYY-MM-DD"

declare var GLOBAL_ENTRY_DATA
var Entries = GLOBAL_ENTRY_DATA
var EntriesWeeks = groupedWeeks(Entries)


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

function formatDate(dateMoment:any, format:string = DateFormat):string {
  return dateMoment.format(format)
}

function entriesForWeek(entries:any, date:Moment):Array<Entry> {
  return entries[formatDate(date)]
}

function entriesForDay(entries:Array<Entry> = [], date:Moment):Array<Entry> {
  return entries.filter(function(entry) {
    var entryDate = moment(entry.date)
    return formatDate(moment(entry.date)) == formatDate(date)
  })
}

function entryDate(e:Entry):string { 
  return e.date 
}

function lastDayOfMonth(m:string) { 
  return moment(m).endOf('month') 
}

function isOtherMonthLeft(date:Moment):boolean {
  return (moment(date).subtract(1, 'day').get('month') != date.get('month'))
}

function isOtherMonthUp(date:Moment):boolean {
  return (moment(date).subtract(7, 'day').get('month') != date.get('month'))
}

function isStartOfWeek(date:Moment):boolean {
  return date.day() === 0
}

function isEndOfWeek(date:Moment):boolean {
  return date.day() === 6
}

function entryProject(entry:Entry):string {
  return entry.project
}

module.exports = {Entries, EntriesWeeks, DateFormat, groupedWeeks, groupedDays, lastWeekOfMonth, weeksBack, weekDates, weekStartSunday, weekStartMonday, formatDate, entryDate, lastDayOfMonth, isOtherMonthLeft, isOtherMonthUp, isStartOfWeek, isEndOfWeek, entriesForWeek, entriesForDay, entryProject}



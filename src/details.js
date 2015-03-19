// @flow
var React = require('react')
var {first} = require('lodash')
var Store = require('./store')
var moment = require('moment').utc

type Entry = {
  date: string;
  project: string;
  image: string;
}

class Details extends React.Component {
  render() {
    var {entries} = this.props

    var content = entries.map(function(entry) {
      return <DetailEntry entry={entry} />
    })

    return <div className="row columns small-12">
      <button style={{float: 'left', margin: 10}} onClick={this.props.close}>Close</button>
      <h1>{firstEntryDate(entries)}</h1>
      <div>{content}</div>
    </div>
  }
}

class DetailEntry extends React.Component {
  render() {
    var {entry} = this.props
    return <div>
      <p>{entry.comment}</p>
      <div><img src={Store.imageUrl(entry.image)}/></div>
    </div>
  }
}

function firstEntryDate(entries:Array<Entry>) {
  if (!entries.length) { 
    return ""
  }

  return Store.formatDate(moment(entries[0].date))
}

module.exports = {Details}

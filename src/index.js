// @flow

var React = window.React = require('react')
var {Weeks} = require('./weeks')
var {EntriesWeeks} = require('./store')

var App = React.createClass({
  render() {
    return <Weeks entries={EntriesWeeks}/>
  }
})

React.render(
  <App/>,
  document.getElementById('content')
)


//function* whatever() {
  //var asdf = yield blah()
  //return asdf
//}

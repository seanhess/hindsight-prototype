// @flow

var React = window.React = require('react')
var {Weeks} = require('./weeks')
var {EntriesWeeks} = require('./store')
var {Details} = require('./details')

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {details: null}
    this.closeDetails = this.closeDetails.bind(this)
    this.openDetails = this.openDetails.bind(this)
  }

  render() {
    var content:?ReactElement;
    if (this.state.details) {
      content = this.renderDetails()
    }

    else {
      content = this.renderWeeks()
    }

    return <div>{content}</div>
  }

  renderWeeks() {
    return <Weeks entries={EntriesWeeks} open={this.openDetails}/>
  }

  renderDetails() {
    return <Details entries={this.state.details} close={this.closeDetails}/>
  }

  closeDetails() {
    this.setState({details: null})
  }

  openDetails(entries) {
    this.setState({details: entries})
  }
}


React.render(
  <App/>,
  document.getElementById('content')
)


//function* whatever() {
  //var asdf = yield blah()
  //return asdf
//}

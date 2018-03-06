import React, { Component } from 'react';
import '../assests/css/custom.css'
import '../assests/css/custom.min.css'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }


  render() {
    return (
      <footer>
        <div className="pull-right">© 2018 Compliance Compendium.</div>
        <div className="clearfix"></div>
      </footer>
    );
  }
}

export default Footer;

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import Footer from '../../../../../components/Footer';

import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class Licence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md'
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.licenceModule = this.licenceModule.bind(this);
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    } 
    licenceModule() {
        browserHistory.push('/sar/admin/license-payment')
    }
    render() {
        return (
            <div>
                <div className={this.state.navBar}>
                    <div className="container body">
                        <div className="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div className="right_col" role="main">
                                <div className="">
                                    <div className="page-title">
                                        <div className="title_left">
                                            <h3>Licenses</h3>
                                        </div>
                                        {/* <div className="title_right">
                                            <div className="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Search for..." />
                                                    <span className="input-group-btn">
                                                        <button className="btn btn-default" type="button">Go!</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">
                                                <div className="x_title">
                                                    <h2>Licenses </h2>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <table className="table table-bordered table-striped">
                                                        <tbody>
                                                            <tr>
                                                                <th>License ID</th>
                                                                <th>Module Name</th>
                                                                <th>Type of License</th>
                                                                <th>Purchase&nbsp;Date</th>
                                                                <th>Expiry Date</th>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">001</a></td>
                                                                <td>UK DPA &amp; EU GDPR AWARENESS &amp; TRAINING</td>
                                                                <td>Charities &amp; N4P</td>
                                                                <td>15-Jan-2018</td>
                                                                <td>15-Jan-2019</td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">002</a></td>
                                                                <td>SUBJECT ACCESS REQUEST MANAGEMENT</td>
                                                                <td>Private Organization</td>
                                                                <td>02-Feb-2018</td>
                                                                <td>02-Feb-2019</td>
                                                            </tr>
                                                            <tr>
                                                                <td><a href="#">003</a></td>
                                                                <td>DPIA / PIA ASSESSMENT</td>
                                                                <td>Charities &amp; N4P</td>
                                                                <td>18-Jan-2018</td>
                                                                <td>18-Jan-2019</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <a className="btn btn-primary btn-round" onClick={this.licenceModule} style={{ color: '#fff' }}>Add License</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <footer>
                                <div className="pull-right">
                                    © 2018 Compliance Compendium.
                                </div>
                                <div className="clearfix"></div>
                            </footer> */}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Licence;





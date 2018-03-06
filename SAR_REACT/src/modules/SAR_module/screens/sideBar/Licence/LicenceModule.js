import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class LicenceModuleComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md'
        }
        this.handleNavBar = this.handleNavBar.bind(this);
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }
    render() {
        return (
            <div>
                <div className={this.state.navBar}>
                    <div class="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div class="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
                            <div class="right_col" role="main">
                                <div class="row">
                                    <div>
                                        <div class="page-title">
                                            <div class="title_left">
                                                <h3>License Selection</h3>
                                            </div>

                                            {/* <div class="title_right">
                                                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" placeholder="Search for..." />
                                                        <span class="input-group-btn">
                                                            <button class="btn btn-default" type="button">Go!</button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>

                                        <div class="clearfix"></div>


                                        <div class="row">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="x_panel">
                                                    <div class="x_title">
                                                        <h2>License Selection </h2>



                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="x_content">
                                                        <div class="row">
                                                            <div class="col-md-9 col-md-offset-1">
                                                                <h4>Module Selection</h4>
                                                                <table class="table table-bordered licence-table" cellspacing="0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Module</th>
                                                                            <th>select</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>UK DPA & EU GDPR AWARENESS & TRAINING </td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" checked="checked" />
                                                                                </label>
                                                                            </div></td>

                                                                        </tr>
                                                                        <tr>
                                                                            <td>SUBJECT ACCESS REQUEST MANAGEMENT </td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>

                                                                        </tr>

                                                                        <tr>
                                                                            <td>DPIA / PIA ASSESSMENT </td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>

                                                                        </tr>

                                                                    </tbody>
                                                                </table>
                                                                <h4>License Selection</h4>

                                                                <table class="table table-bordered licence-table" cellspacing="0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Type of License</th>
                                                                            <th>Number of Users</th>
                                                                            <th>select</th>
                                                                            <th>No of Licenses Required</th>
                                                                            <th>Cost</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Charities & N4P  </td>
                                                                            <td>1-50</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">200</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Charities & N4P  </td>
                                                                            <td>50-100</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">500</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Charities & N4P  </td>
                                                                            <td>500+</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">1500</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Private Organization  </td>
                                                                            <td>1-50</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">1500</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Private Organization  </td>
                                                                            <td>50-100</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">1000</span></td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Private Organization  </td>
                                                                            <td>100-500</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>

                                                                            <td class="lpricec"><span class="label label-success">15 per user</span></td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Private Organization  </td>
                                                                            <td>500+</td>
                                                                            <td><div class="checkbox">
                                                                                <label>
                                                                                    <input type="checkbox" class="flat" />
                                                                                </label>
                                                                            </div></td>
                                                                            <td><div class="col-md-12"> <input type="text" id="fullname" class="form-control" name="charities" required="" /></div></td>
                                                                            <td class="lpricec"><span class="label label-success">10 per user</span></td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>

                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <table class="table table-bordered licence-table" cellspacing="0">
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>Options</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><div class="checkbox">
                                                                                        <label>
                                                                                            <input type="checkbox" class="flat" checked="checked" />
                                                                                        </label> Cloud Based Access
                          </div>  </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><div class="checkbox">
                                                                                        <label>
                                                                                            <input type="checkbox" class="flat" />
                                                                                        </label> Download Installer
                          </div>  </td>

                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <table class="table table-bordered licence-table" cellspacing="0">
                                                                            <thead>
                                                                                <tr>

                                                                                    <th>Payment Gateway</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><div class="checkbox">
                                                                                        <label>
                                                                                            <input type="radio" class="flat" name="pcheck" />
                                                                                        </label> Stripe
                                        </div>  </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><div class="checkbox">
                                                                                        <label>
                                                                                            <input type="radio" class="flat" name="pcheck" />
                                                                                        </label> Paypal
                                        </div>  </td>

                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                    </div>


                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <center><button class="btn btn-primary btn-lg">Buy Now</button></center>
                                                                    </div>
                                                                </div>




                                                            </div>

                                                        </div>







                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LicenceModuleComponent;





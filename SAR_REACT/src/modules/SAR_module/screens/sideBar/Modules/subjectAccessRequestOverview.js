import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class SubjectAccessRequestOverviewComponent extends Component {
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
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div class="right_col" role="main">
                                <div>
                                    <div class="page-title">
                                        <div class="title_left">
                                            <h3>Tickets overview</h3>
                                        </div>

                                        <div class="title_right">
                                            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search for..." />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-default" type="button">Go!</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="clearfix"></div>
                                    <div class="row">
                                        <div class="col-md-12 col-sm-12 col-xs-12">
                                            <div class="x_panel">
                                                <div class="x_title">
                                                    <h2>RUn Trac test suite against environments - after #115</h2>



                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="x_content">
                                                    <div class="row">
                                                        <div class="col-md-8">
                                                            <div class="" role="tabpanel" data-example-id="togglable-tabs">
                                                                <ul id="myTab" class="nav nav-tabs bar_tabs" style={{ display: "inline-flex" }} role="tablist">
                                                                    <li role="presentation" class="active"><a href="#tab_content1" id="home-tab" role="tab" data-toggle="tab" aria-expanded="true">Overview</a>
                                                                    </li>
                                                                    <li role="presentation" class=""><a href="#" role="tab" id="profile-tab" data-toggle="tab" aria-expanded="false">Attachements</a>
                                                                    </li>
                                                                    <li role="presentation" class=""><a href="#" role="tab" id="profile-tab2" data-toggle="tab" aria-expanded="false">Comments</a>
                                                                    </li>

                                                                    <li role="presentation" class=""><a href="#" role="tab" id="profile-tab3" data-toggle="tab" aria-expanded="false">Modify Ticket</a>
                                                                    </li>
                                                                    <li role="presentation" class=""><a href="#" role="tab" id="profile-tab4" data-toggle="tab" aria-expanded="false">Reject Ticket</a>
                                                                    </li>
                                                                </ul>
                                                                <div id="myTabContent" class="tab-content">
                                                                    <div role="tabpanel" class="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <label for="">Reporter:</label>
                                                                                <a href="#">olemis</a>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                                <label for="">Opened:</label>
                                                                                <a href="#">2 months ago</a>
                                                                            </div>

                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <label for="">Type:</label>
                                                                                task
                        </div>

                                                                            <div class="col-md-6">
                                                                                <label for="">Status:</label>
                                                                                assigned
                        </div>

                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <label for="">Priority:</label>
                                                                                <a href="#">major</a>
                                                                            </div>

                                                                            <div class="col-md-6">
                                                                                <label for="">SAR ID:</label>
                                                                                1234
                        </div>

                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-6">
                                                                                <label for="">Department:</label>
                                                                                <a href="#">Finance</a>
                                                                            </div>



                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-12 t-description">
                                                                                <a href="#">environmet testing QA</a> <br />
                                                                                <h4 class="t-desc">Description </h4>
                                                                                <h6 class="pull-right">(last modified by olmis) (<a href="#">diff</a>)</h6>
                                                                                <p>Apache Bloodhound inherits Trac functionality. By design the same behavior is expectedd for built-in components on top of product environments, and thereby Trac</p>

                                                                                <button class="btn btn-default">Reply</button>


                                                                            </div>
                                                                        </div>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4 t-activity">
                                                            <fieldset class="sar-dbox ">
                                                                <legend>Activity</legend>
                                                                <a href="#" class="btn btn-default pull-right">Download</a>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <label for="">Mar 5, 2013:</label>

                                                                        <table class="table table-bordered">

                                                                            <tbody>

                                                                                <tr>
                                                                                    <td>12:56 <a href="#">Ticket #355 (Run Trac test suite against product environments - after #115 #288) updated</a> by <a href="#">jure</a> <br />

                                                                                        jftr, r1452769 removes automatic multi product upgrades from within test</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>12:56 <a href="#">Ticket #355 (Run Trac test suite against product environments - after #115 #288) updated</a> by <a href="#">jure</a> <br />

                                                                                        jftr, r1452769 removes automatic multi product upgrades from within test
</td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>




                                                                    </div>

                                                                </div>




                                                            </fieldset>
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

export default SubjectAccessRequestOverviewComponent;





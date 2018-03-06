import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class SubjectAccessRequestTicketsComponent extends Component {
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
                                <div class="">
                                    <div class="page-title">
                                        <div class="title_left">
                                            <h3>Tickets</h3>
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
                                                    <h2>Tickets </h2>

                                                    <a class="btn btn-default create-tick">Create Ticket</a>

                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="x_content">
                                                    <div class="row">
                                                        <div class="col-md-7">
                                                            <fieldset class="sar-dbox ">
                                                                <legend>Dashboard</legend>
                                                                <h3>Tickets overview</h3>

                                                                <table class="table table-bordered" cellspacing="0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Date</th>
                                                                            <th>Ticket</th>
                                                                            <th>Summary</th>
                                                                            <th>Owner</th>
                                                                            <th>Priority</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Today</td>
                                                                            <td><a href="#">Wiki-5476</a>

                                                                            </td>
                                                                            <td>All tickets reports (on this site) <br />

                                                                            </td>
                                                                            <td>Me (<a href="#">View all</a>)

                </td>
                                                                            <td>High
                </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td><a href="#">E-5476</a>

                                                                            </td>
                                                                            <td>Grouping doesn't work in <br />

                                                                            </td>
                                                                            <td><a href="#">Warren</a></td>
                                                                            <td>Medium
                </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td></td>
                                                                            <td><a href="#">EF-492</a>

                                                                            </td>
                                                                            <td>Protocol http is hard coded </td>
                                                                            <td>Me (<a href="#">View all</a>)</td>
                                                                            <td>Medium
                </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>Tomorrow</td>
                                                                            <td><a href="#">TR-2930</a></td>
                                                                            <td>Change main button</td>
                                                                            <td><a href="#">Warren</a></td>
                                                                            <td>Medium</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td></td>
                                                                            <td><a href="#">mobile-281</a></td>
                                                                            <td>Attachment manipulators</td>
                                                                            <td><a href="#">Warren</a></td>
                                                                            <td>Medium</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td></td>
                                                                            <td><a href="#">PL-8491</a></td>
                                                                            <td>Use of svn</td>
                                                                            <td><a href="#">Warren</a></td>
                                                                            <td>Medium</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>15-Jan-2018</td>
                                                                            <td><a href="#">Wiki-5476</a></td>
                                                                            <td>All tickets reports (on this site)</td>
                                                                            <td>Me (<a href="#">View all</a>)</td>
                                                                            <td>Medium</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>16-Jan-2018</td>
                                                                            <td><a href="#">Wiki-5476</a></td>
                                                                            <td>All tickets reports (on this site)</td>
                                                                            <td>Me (<a href="#">View all</a>)</td>
                                                                            <td>Low</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>21-Jan-2018</td>
                                                                            <td><a href="#">Wiki-5476</a></td>
                                                                            <td>All tickets reports (on this site)</td>
                                                                            <td>Me (<a href="#">View all</a>)</td>
                                                                            <td>Low</td>
                                                                        </tr>

                                                                        <tr>
                                                                            <td>23-Jan-2018</td>
                                                                            <td><a href="#">E-4512</a></td>
                                                                            <td>Protocol http is hard coded </td>
                                                                            <td><a href="#">Mark</a></td>
                                                                            <td>Low</td>
                                                                        </tr>



                                                                    </tbody>
                                                                </table>





                                                            </fieldset>
                                                        </div>
                                                        <div class="col-md-5 t-activity">
                                                            <fieldset class="sar-dbox ">
                                                                <legend>Activity</legend>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <label for="">Today</label>

                                                                        <table class="table table-bordered">

                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><a href="#">Warren</a> commented on <a href="#">E-5476</a> (Fix header graphic) saying: <br />
                                                                                        "The header graphic is going to need a re-think"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Warren</a> changed the Assignee to 'Ian' on <a href="">E-5476</a> (Fix header graphic) saying <br />
                                                                                        "Can you review this please Ian?"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Rich</a> commented on <a href="">E-5465</a> (Change main button) saying: <br />
                                                                                        "I like the button used on the front page of the side"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Ian</a> changed the Assignee to 'Mai' on <a href="#">E-4512</a> (Load front banner) saying: <br />
                                                                                        "In your hands now"</td>
                                                                                </tr>

                                                                            </tbody>
                                                                        </table>
                                                                        <label for="">Yesterday</label>

                                                                        <table class="table table-bordered">

                                                                            <tbody>
                                                                                <tr>
                                                                                    <td><a href="#">Warren</a> commented on <a href="#">E-5476</a> (Fix header graphic) saying: <br />
                                                                                        "The header graphic is going to need a re-think"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Warren</a> changed the Assignee to 'Ian' on <a href="">E-5476</a> (Fix header graphic) saying <br />
                                                                                        "Can you review this please Ian?"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Rich</a> commented on <a href="">E-5465</a> (Change main button) saying: <br />
                                                                                        "I like the button used on the front page of the side"</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><a href="">Ian</a> changed the Assignee to 'Mai' on <a href="#">E-4512</a> (Load front banner) saying: <br />
                                                                                        "In your hands now"</td>
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

export default SubjectAccessRequestTicketsComponent;





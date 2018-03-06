import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import SarAction from '../../../../SAR_module/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'
import $ from "jquery";

class SubjectAccessRequestDetailsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sarData: {},
            userData:{},
            navBar: 'nav-md'

        }
        this.sarValue = this.sarValue.bind(this);
        this.userId = this.userId.bind(this);
        this.close_sar = this.close_sar.bind(this);
        this.close_sar_value = this.close_sar_value.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.reopen_sar = this.reopen_sar.bind(this);
        this.reopen_sar_value = this.reopen_sar_value.bind(this);

    }

    
    
    close_sar(){
        console.log("sar details "+this.state.sarData.id)
        this.props.SarAction.close_sar(this.state.sarData.id,this.close_sar_value);
       
    }

    close_sar_value(value){
        console.log("the status code ---->",value)
        $(".modal-backdrop.in").css("opacity", "0");
        $(".modal-backdrop").css("position", "initial");
        browserHistory.push('/sar/admin/SAR-dashboard')
    }

    reopen_sar() {
        console.log("sar details " + this.state.sarData.id)
        this.setState({ loading: true })
        this.props.SarAction.reopen_sar(this.state.sarData.id, this.reopen_sar_value);

    }

    reopen_sar_value(value) {
        this.setState({ loading: false })
        console.log("the status code ---->", value)
        var successCode = value.data.success.code;
        if (successCode) {
            browserHistory.push({
                pathname: '/sar/admin/SAR-dashboard'
            })
        }
    }



    componentWillMount() {
        this.props.SarAction.getSarById(this.props.location.state.sar.id, this.sarValue);
        this.props.SarAction.getUserById(this.props.location.state.sar.user_id,this.userId);
        console.log("the ", this.props.location.state.sar.id);
        console.log("eygeygf", this.state)
    }
    sarValue(value) {
            console.log("the sar data value",value.data.data);
            this.setState({sarData :value.data.data});
           
    }
    userId(user){
        console.log("the user value",user.data)
        
        this.setState({userData :user.data})
    }

    componentWillReceiveProps(nextProps) {

        console.log("nextProps", nextProps)
       
       
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    render() {
        console.log("the sar id",this.state.sarData.id)
        return (
            <div>
                <div className={this.state.navBar}>
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar}/>
                            <div className="right_col" role="main">
                                <div className="">
                                    <div className="page-title">    
                                        <div className="title_left">
                                            <h3>SAR Details</h3>
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
                                                    <h2>SAR Details </h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">
                                                    <div className="" role="tabpanel" data-example-id="togglable-tabs">
                                                        <ul id="myTab" style={{ display: "inline-flex" }} className="nav nav-tabs bar_tabs" role="tablist">
                                                            <li role="presentation" className="active"><a href="#tab_content1" id="sardetail-tab" role="tab" data-toggle="tab" aria-expanded="true">SAR Details</a>
                                                            </li>
                                                            <li role="presentation" className=""><a href="#tab_content2" role="tab" id="userdetail-tab" data-toggle="tab" aria-expanded="false">User Details</a>
                                                            </li>
                                                            <li role="presentation" className=""><a href="#tab_content3" role="tab" id="comments-tab" data-toggle="tab" aria-expanded="false">Representative Details</a>
                                                            </li>

                                                            <li role="presentation" className=""><a href="#tab_content4" role="tab" id="Modify-tab3" data-toggle="tab" aria-expanded="false">Responses</a>
                                                            </li>
                                                            <li role="presentation" className=""><a href="#tab_content5" role="tab" id="profile-tab4" data-toggle="tab" aria-expanded="false">Tickets</a>
                                                            </li>
                                                            <li role="presentation" className=""><a href="#tab_content6" role="tab" id="profile-tab4" data-toggle="tab" aria-expanded="false">SAR History</a>
                                                            </li>
                                                        </ul>
                                                        <div id="myTabContent" className="tab-content">
                                                            <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">SAR ID:</label>
                                                                        {this.state.sarData.id}
                                                                </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Priority:</label>
                                                                        {this.state.sarData.priority}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Assigned To:</label>
                                                                        {this.state.userData.name}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Escalated:</label>
                                                                        {this.state.sarData.assignedTo}
                                                                     </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Creation Date:</label>
                                                                        {this.state.sarData.creation_time}
                                                                     </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Status:</label>
                                                                        {this.state.sarData.status}
                                                                       
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label htmlFor="">Modified Date:</label>
                                                                        {this.state.sarData.modification_time}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label htmlFor="">Description:</label>
                                                                        {this.state.sarData.sarDescription}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content2" aria-labelledby="home-tab">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Name:</label>
                                                                        Tintin
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Email Id:</label>
                                                                        test@test.com
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Phone:</label>
                                                                        123 456 7890
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label htmlFor="" className="pull-left pl1">Address: </label>
                                                                        <p className="pull-left">line1 line 1, <br />
                                                                            line2, line 2, <br />
                                                                            City, State, Country, <br />
                                                                            Pin: 400094</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content3" aria-labelledby="home-tab">

                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Name:</label>
                                                                        Tintin
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Email Id:</label>
                                                                        test@test.com
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label htmlFor="">Phone:</label>
                                                                        123 456 7890
                                                                    </div>
                                                                </div>


                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label htmlFor="" className="pull-left pl1">Address: </label>
                                                                        <p className="pull-left">line1 line 1, <br />
                                                                            line2, line 2, <br />
                                                                            City, State, Country, <br />
                                                                            Pin: 400094</p>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content4" aria-labelledby="home-tab">

                                                                <div className="trow">
                                                                    <a href="#" className="btn btn-default pull-right">Add Response</a>
                                                                    <div className="clearfix"></div>
                                                                </div>

                                                                <div className="responses">
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <label htmlFor="">From:</label>
                                                                            Tom Alter
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <label htmlFor="">Date:</label>
                                                                            15-Jan-2018
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <p>Response text. Some more text. And more text.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="responses">
                                                                    <div className="row">
                                                                        <div className="col-md-2">
                                                                            <label htmlFor="">From:</label>
                                                                            CTM Name
                                                                        </div>

                                                                        <div className="col-md-2">
                                                                            <label htmlFor="">Date:</label>
                                                                            14-Jan-2018
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <p>Response text. Some more text. And more text.</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>


                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content5" aria-labelledby="home-tab">

                                                                <div className="trow">
                                                                    <a href="#" className="btn btn-default pull-right">Add New Department</a>
                                                                    <div className="clearfix"></div>
                                                                </div>

                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Department Name</th>
                                                                            <th>Creation Date</th>
                                                                            <th>Modified Date</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Marketing</td>
                                                                            <td>15-Jan-2018</td>
                                                                            <td>16-Jan-2018</td>
                                                                            <td>Complete</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Fianance</td>
                                                                            <td>15-Jan-2018</td>
                                                                            <td>16-Jan-2018</td>
                                                                            <td>In Progress</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Accounts</td>
                                                                            <td>15-Jan-2018</td>
                                                                            <td>16-Jan-2018</td>
                                                                            <td>In Progress</td>
                                                                        </tr>

                                                                    </tbody>
                                                                </table>


                                                            </div>

                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content6" aria-labelledby="home-tab">

                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-5 col-md-offset-4">
                                                            <button className="btn btn-primary" onClick={this.close_sar}>Close SAR</button>
                                                            <button className="btn btn-primary" onClick={this.reopen_sar}>Re-Assign SAR</button>
                                                            <button className="btn btn-default">Set Priority</button>

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
function mapStateToProps(state, ownProps) {
    console.log("state0,", state)

    return {
        getSarSuccess: state.sar.sarSuccess
    };
}
function mapDispatchToProps(dispatch) {
    return {
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestDetailsComponent);







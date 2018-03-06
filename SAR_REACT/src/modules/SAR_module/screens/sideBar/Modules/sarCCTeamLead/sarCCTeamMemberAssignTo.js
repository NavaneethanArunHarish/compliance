import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import Action from '../../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'
import { PulseLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import SarAction from '../../../../actions';

import UserAction from '../../../../actions'


class SARCCTeamLeaderAssignTo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            allUserDetails: [],
            teamMember: 0,
            sarData: {},
            sarId: 0,
            userId: 0,
            userInfo: {},
            userAddr: {},
            repInfo: {},
            repAddr: {},
            loading: false,
            tab:"Sar Details",
            sarcss: 'active',
            usercss: '',
            repcss: '',
        }
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.getTeamMember = this.getTeamMember.bind(this);
        this.AssignSar = this.AssignSar.bind(this);
        this.userResponse = this.userResponse.bind(this);
        this.userInfoResponse = this.userInfoResponse.bind(this);
        this.sarValue = this.sarValue.bind(this);
        this.handleDetails = this.handleDetails.bind(this);

    }

    componentWillMount() {
        this.setState({ loading: true })
        if (this.props.params) {
            this.props.SarAction.getSarById(this.props.params.id, this.sarValue);
        }
        if (this.props.location.state) {
            var sarId1 = this.props.location.state.data.id;
            var userId = this.props.location.state.data.user_id;
            var sarData = this.props.location.state.data;
            this.setState({ sarId: sarId1, userId: userId, sarData: sarData })
        }
        // this.props.UserAction.getallUser(this.getallUserResponse);
        var usertype = 'ComplainceTeamMember'
        this.props.UserAction.getUserByType(usertype, this.getallUserResponse);
    }

    getallUserResponse(value) {
        this.setState({ allUserDetails: value.data.data })
    }

    sarValue(value) {
        this.setState({ sarData: value.data.data.sar, loading: false });
        this.props.UserAction.getUserById(value.data.data.sar.user_id, this.userResponse);
    }

    getTeamMember(e) {
        console.log("slected team------------->", e.target.value)
        this.setState({
            teamMember: e.target.value
        })
    }

    userResponse(value) {
        this.setState({
            userInfo: value.data.data,
            userAddr: value.data.data.address
        })
        this.props.UserAction.getUserById(this.state.sarData.representative, this.userInfoResponse);
    }


 handleDetails(value) {
        
        if (value === 'Sar Details') {
            this.setState({
                sarcss: 'active',
                usercss: '',
                repcss: ''
            });
            this.setState({ tab: value });
        }
        if (value === 'User Details') {
            this.setState({
                sarcss: '',
                usercss: 'active',
                repcss: '',
            });
            this.setState({ tab: value });
        }
        if (value === 'Rep Details') {
            this.setState({
                sarcss: '',
                usercss: '',
                repcss: 'active',
               
            });
            this.setState({ tab: value });
          
    }
}
    userInfoResponse(value) {
        
        if (value) {
            this.setState({
                repInfo: value.data.data,
                repAddr: value.data.data.address
            })
        }
    }

    AssignSar(e) {
        e.preventDefault();
        var obj = {
            sarId: this.props.params.id,
            assignedTo: this.state.teamMember
        }
        this.props.SarAction.AssignSar(obj, this.AssignSar_value);

    }

    AssignSar_value(value) {
        toast("Assign successfully ", {
            position: toast.POSITION.RIGHT,
            className: css({
                height: '80px',
                top: '300',
                background: '#43b900',
                color: 'white',
                fontSize: '20px'
            })
        });
        var successCode = value.data.success.code;
        if (successCode) {
            browserHistory.push({
                pathname: '/sar/leader/SAR-dashboard'
            })
        }
    }


    handleNavBar(value) {
        this.setState({ navBar: value })
    }



    render() {
console.log("tab------------->",this.state.tab)
        return (
            <div>
                <div className={this.state.navBar}>
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar handleTab={this.handleTab} />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div className="right_col" role="main">
                                <div className="">
                                    <div className="page-title">
                                        <div className="title_left">
                                            <h3>SAR - Assign</h3>
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
                                                    <h2>SAR - Assign </h2>

                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">

                                                    {/* <div className="alertbox">
                                                        <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            SAR assigned Successfully
                  </div>
                                                        <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            Error in SAR assign
                  </div>
                                                    </div> */}

                                                    <div className="assign-tabs" role="tabpanel" data-example-id="togglable-tabs">
                                                        <ul id="myTab" className="nav nav-tabs bar_tabs" role="tablist">
                                                        <li role="presentation" className={this.state.sarcss}><a onClick={() => this.handleDetails('Sar Details')}>SAR Details</a>
                                                        </li>
                                                        <li role="presentation" className={this.state.usercss}><a onClick={() => this.handleDetails('User Details')}>User Details</a>
                                                        </li>
                                                        <li role="presentation" className={this.state.repcss}><a onClick={() => this.handleDetails('Rep Details')}>Representative Details</a>
                                                        </li>

                                                        </ul>
                                                        <div id="myTabContent" className="tab-content">
                                                            {this.state.loading === true ? <div>
                                                                <center>
                                                                    <PulseLoader
                                                                        color={'#F15A25'}
                                                                        loading={this.state.loading}
                                                                    />
                                                                </center>
                                                            </div> : ''}
                                                            {this.state.tab === "Sar Details" ?
                                                                    this.state.sarData.length !== 0 ?
                                                            <div role="tabpanel" className="tab-pane fade active in" id="tab_content1" aria-labelledby="home-tab">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label for="">SAR ID:</label>
                                                                        {this.state.sarData.id}
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label for="">Description:</label>
                                                                        {this.state.sarData.sarDescription}

                                                                    </div>

                                                                </div>



                                                                <div className="row">
                                                                    <div className="col-md-12">

                                                                    </div>
                                                                </div>
                                                                <form action="#" className="form-horizontal form-label-left">
                                                                    <div className="form-group">
                                                                        <label className="control-label col-md-2 col-sm-3 col-xs-12" for="first-name">Assign to member<span className="required">*</span>
                                                                        </label>
                                                                        <div className="col-md-3 col-sm-6 col-xs-12">
                                                                            

                                                                            <select name="assign" className="form-control" onChange={(e) => this.getTeamMember(e)} required="" >
                                                                            <option value="">--Select CTM--</option>
                                                                                {this.state.allUserDetails.map(function (obj, index) {

                                                                                    return (
                                                                                        <option value={obj.id}>{obj.name}</option>

                                                                                    )
                                                                                }.bind(this))}
                                                                            </select>

                                                                        </div>
                                                                    </div>
                                                                    <div className="ln_solid"></div>
                                                                    <div className="form-group">
                                                                        <div className="col-md-12 col-sm-6 col-xs-12">
                                                                            <center><input type="submit" name="" className="btn btn-round btn-primary" value="Submit" onClick={this.AssignSar} /> </center>

                                                                        </div>

                                                                    </div>

                                                                </form>
                                                            </div>
                                                          : <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No SAR Details  Found </p> </div> : ''}
                                                           
                                                           {this.state.tab == "User Details" ?
                                                           <div>
                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content2" aria-labelledby="home-tab">
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label for="">Name:</label>
                                                                        {this.state.userInfo.name}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label for="">Email Id:</label>
                                                                        {this.state.userInfo.email}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label for="">Phone:</label>
                                                                        {this.state.userInfo.phone}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label for="" className="pull-left pl1">Address: </label>
                                                                        <p className="pull-left">{this.state.userAddr.addressline1} <br />
                                                                            {this.state.userAddr.addressline2} <br />
                                                                            {this.state.userAddr.city} <br />
                                                                            Pin: {this.state.userAddr.pincode}</p>
                                                                    </div>
                                                                </div>

                                                            </div> </div> : '' }
                                                        
                                                            
                                                                {this.state.tab === "Rep Details" ?
                                                                    Object.keys(this.state.repInfo).length !== 0 ?<div>
                                                            <div role="tabpanel" className="tab-pane fade in" id="tab_content3" aria-labelledby="home-tab">
                                                           
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <label for="">Name:</label>
                                                                        {this.state.repInfo.name}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label for="">Email Id:</label>
                                                                        {this.state.repInfo.email}
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <label for="">Phone:</label>
                                                                        {this.state.repInfo.phone}
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <label for="" className="pull-left pl1">Address: </label>
                                                                        <p className="pull-left">{this.state.repAddr.addressline1} <br />
                                                                            {this.state.repAddr.addressline2} <br />
                                                                            {this.state.repAddr.city} <br />
                                                                            Pin: {this.state.repAddr.pincode}</p>
                                                                    </div>
                                                                </div>

                                                            </div></div>
                                                            : "" : ""}
                                                            {this.state.tab === "Rep Details" && Object.keys(this.state.repInfo).length === 0 ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Representative Details  Found </p> </div> : ''}

                                                        </div>
                                                        

                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            {/* <form action="#" className="form-horizontal form-label-left">
                                                                <div className="form-group">
                                                                    <label className="control-label col-md-2 col-sm-3 col-xs-12" for="first-name">Assign to member<span className="required">*</span>
                                                                    </label>
                                                                    <div className="col-md-3 col-sm-6 col-xs-12">
                                                                        {/*<select id="assign" name="assign" className="form-control" required="">
                                                                            <option value="">Choose..</option>
                                                                            <option value="press">Bob</option>
                                                                            <option value="net">Alice</option>
                                                                            <option value="mouth">Kipling</option>
                                                                        </select>
                                                                        <select name="assign" className="form-control" onChange={(e) => this.getTeamMember(e)} required="" >
                                                                            {this.state.allUserDetails.map(function (obj, index) {

                                                                                return (
                                                                                    <option value={obj.name}>{obj.name}</option>

                                                                                )
                                                                            }.bind(this))}
                                                                        </select>

                                                                    </div>
                                                                </div>
                                                                <div className="ln_solid"></div>
                                                                <div className="form-group">
                                                                    <div className="col-md-12 col-sm-6 col-xs-12">
                                                                        <center><input type="submit" name="" className="btn btn-round btn-primary" value="Submit" onClick={this.AssignSar} /> </center>

                                                                    </div>

                                                                </div>

                                                            </form> */}
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
                </div>
            </div>
        );
    }
}
// function mapStateToProps(state, ownProps) {
//   console.log("state0,", state)

//   return {
//     getSarSuccess: state.sar.getSarDetails
//   };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     Action: bindActionCreators(Action, dispatch)
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SARCCTeamLeaderAssignTo);

function mapStateToProps(state, props) {
    //console.log("response data----->",state.login)
    return {
        getUserSuccess: state.login.userSuccess,
        getUserById: state.login.getUserSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserAction: bindActionCreators(UserAction, dispatch),
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARCCTeamLeaderAssignTo);

//export default SARCCTeamLeaderAssignTo;







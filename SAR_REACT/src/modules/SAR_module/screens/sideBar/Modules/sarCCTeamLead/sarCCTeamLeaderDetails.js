import React, { Component } from 'react';
import Header from '../../../../../../components/Header';
import SideBar from '../../../../../../components/SideBar';
import SarAction from '../../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { BaseUrl } from '../../../../../../serviceUrl/serviceUrl';
import Moment from 'react-moment';

import '../../../../../../assests/css/custom.css'

import '../../../../../../assests/css/custom.min.css'
import { PulseLoader } from 'react-spinners';
import $ from "jquery";

class SARCCTeamLeaderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sarData: {},
            ticket: {},
            ticketData: [],
            tab: "Sar Details",
            userAddr: {},
            assignedDetails: {},
            name: '',
            email: '',
            phone: '',
            navBar: 'nav-md',
            departments: [],
            selecteddepartment: [],
            selectdpriority: '',
            loading: false,
            loadingReassign: false,
            loaderDept: false,
            sarLoading: false,
            userLoading: false,
            repLoading: false,
            resLoading: false,
            ticketLoading: false,
            historyLoading: false,
            sarcss: 'active',
            usercss: '',
            repcss: '',
            respcss: '',
            ticketcss: '',
            sarhcss: '',
            allUserDetails: [],
            sar_response: [],
            success: false,
            ticketDetails: [],
            ticketinfoDetails: [],
            availableticket: [],
            sarUserDetails: {},
            sarRepDetails: {},
            sarHistory: {},
            priority: 'High',
            filenamevalidate: true,
            sarHistoryDetails: []
        }

        this.handleDetails = this.handleDetails.bind(this);
        this.sarValue = this.sarValue.bind(this);
        this.userId = this.userId.bind(this);
        this.close_sar = this.close_sar.bind(this);
        this.close_sar_value = this.close_sar_value.bind(this);
        this.reopen_sar = this.reopen_sar.bind(this);
        this.reopen_sar_value = this.reopen_sar_value.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.departments = this.departments.bind(this);
        this.checkBoxSelection = this.checkBoxSelection.bind(this);
        this.getPriorityValue = this.getPriorityValue.bind(this);
        this.create_ticket = this.create_ticket.bind(this);
        this.ticket_result = this.ticket_result.bind(this);
        this.ticket_info_result = this.ticket_info_result.bind(this);
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.getTeamMember = this.getTeamMember.bind(this);
        this.AssignSar = this.AssignSar.bind(this);
        this.AssignSar_value = this.AssignSar_value.bind(this);
        this.sarResponse = this.sarResponse.bind(this);
        this.ticket_info_response = this.ticket_info_response.bind(this);
        this.getPriorityChange = this.getPriorityChange.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.afterPriorityChange = this.afterPriorityChange.bind(this);
        this.sarHistoryDetails = this.sarHistoryDetails.bind(this);
        this.sarGetImages = this.sarGetImages.bind(this);
        this.getUsertypeResponse = this.getUsertypeResponse.bind(this);
        this.checkUserName = this.checkUserName.bind(this);
       // this.createResponse = this.createResponse.bind(this);
        this.responseTextArea = this.responseTextArea.bind(this);
        this.addResponseCall = this.addResponseCall.bind(this);
        this.onChange = this.onChange.bind(this);
        this.imageUploadResponse = this.imageUploadResponse.bind(this);
    }

    onChange(e) {
        this.setState({ file: e.target.files[0] })
    }

    // createResponse(e) {
    //     var userName = localStorage.getItem("userName");
    //     var data = {
    //         "responseText": this.state.textAreas,
    //         "user_id": this.state.sarData.user_id,
    //         "user_name": userName
    //     }
    //     this.props.SarAction.AddResponse(this.state.sarData.id, data, this.addResponseCall)
    // }

    addResponseCall(value) {
        var cookie = localStorage.getItem("user");
        var user = JSON.parse(cookie)
        var $el = $('#fileUploads');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        var filename = this.state.file.name.split("."); 
        var regex = /^[0-9a-zA-Z]+$/ 
        var result = regex.test(filename[0])
        this.setState({filenamevalidate :result })
        if(result){ 
        this.props.SarAction.ImageUpload(this.state.file, this.state.sarData.id, user.name, this.state.textAreas, this.imageUploadResponse)
        }else{
            window.scrollTo(0, 100);
        }   
     }

    imageUploadResponse(value) {
        var $el = $('#fileUploads');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        this.setState({
            textAreas: '',
        })
        this.props.SarAction.getSarImages(this.state.sarData.id, this.sarGetImages);
    }

    responseTextArea(e) {
        this.setState({
            textAreas: e.target.value
        })
    }

    checkBoxSelection(data, e) {

        this.state.selecteddepartment.push(data);
    }

    sarResponse(value) {
        this.setState({ sar_response: value.data.data })
    }

    getPriorityValue(e) {
        this.state.selectdpriority = e.target.value
    }

    getUsertypeResponse(value) {
        this.setState({ allUserDetails: value.data.data })
        //this.props.UserAction.getUserById(this.state.userId, this.userResponse);
    }

    getTeamMember(e) {
        this.setState({
            teamMember: e.target.value
        })
    }

    AssignSar(e) {
        e.preventDefault();
        this.setState({ loadingReassign: true })
        var obj = {
            sarId: this.state.sarData.id,
            assignedTo: this.state.teamMember
        }
        this.props.SarAction.AssignSar(obj, this.AssignSar_value);

    }

    AssignSar_value(value) {
        this.setState({ loadingReassign: false })
        $(".modal-backdrop.in").css("opacity", "0");
        $(".modal-backdrop").css("position", "initial");
        var successCode = value.data.success.code;
        if (successCode) {
            browserHistory.push({
                pathname: '/sar/leader/SAR-dashboard'
            })
        }
    }

    close_sar(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.props.SarAction.close_sar(this.state.sarData.id, this.close_sar_value);

    }

    close_sar_value(value) {
        this.setState({ loading: false })
        $(".modal-backdrop.in").css("opacity", "0");
        $(".modal-backdrop").css("position", "initial");
        browserHistory.push('/sar/leader/SAR-dashboard')
    }

    reopen_sar() {
        this.setState({ loading: true })
        this.props.SarAction.reopen_sar(this.state.sarData.id, this.reopen_sar_value);

    }

    reopen_sar_value(value) {
        this.setState({ loading: false })
        var successCode = value.data.success.code;
        if (successCode) {
            browserHistory.push({
                pathname: '/sar/leader/SAR-dashboard'
            })
        }
    }


    componentWillMount() {
        this.setState({ sarLoading: true })
        if (this.props.params) {
            this.props.SarAction.getSarById(this.props.params.id, this.sarValue);
        }
        if (this.props.location.state) {
            this.setState({ loaderDept: true })
            this.props.SarAction.getalldepartment(this.departments);
            if (this.props.location.state.sar.id) {
                this.props.SarAction.getResponseById(this.props.location.state.sar.id, this.sarResponse);
            }
            var usertype = 'ComplainceTeamMember'
            this.props.SarAction.getUserByType(usertype, this.getUsertypeResponse);
        }
        this.props.SarAction.getallUser(this.getallUserResponse);
    }

    getallUserResponse(data) {
        this.setState({
            allUser: data.data.data,
        })
    }

    checkUserName(id) {
        if (!isNaN(id)) {
            for (var i = 0; i < this.state.allUser.length; i++) {
                if (this.state.allUser[i].id === Number(id)) {
                    return this.state.allUser[i].name;
                }
            }
        } else {
            return id;
        }
    }

    departments(value) {
        this.setState({ loaderDept: false, success: true })
        this.setState({ departments: value.data });
    }


    sarValue(value) {
        this.setState({ sarData: value.data.data.sar, sarLoading: false, assignedDetails: value.data.data.assignedTO });
        // this.props.SarAction.getUserById(value.data.data.user_id, this.sarUserDetails);
    }
    userId(user) {

        this.setState({ userData: user.data })
    }

    componentWillReceiveProps(nextProps) {



    }
    create_ticket() {

        for (var i = 0; i < this.state.selecteddepartment.length; i++) {
            var data = {
                "type": "enhancement",
                "time": 12,
                "changetime": 12,
                "component": "",
                "severity": "",
                "priority": this.state.selectdpriority,
                "owner": "CTM",
                "reporter": "",
                "cc": "corbon",
                "milestone": "",
                "version": "1.0",
                "status": "open",
                "resolution": "",
                "summary": "work",
                "description": this.state.sarData.sarDescription,
                "keywords": "key",
                "product": "@",
                "sar_id": this.state.sarData.id,
            }
            this.props.SarAction.create_ticket(data, this.state.selecteddepartment[i].id, this.ticket_result)
        }

    }

    ticket_result(value, department) {
        var successCode = value.status;
        if (successCode == 200 || successCode == 201) {
            var data = {
                "ticket": value.data.data.ticket_id,
                "department_id": department,
                "sar_id": this.state.sarData.id
            }
            this.props.SarAction.create_ticket_info(data, this.ticket_info_result)
            // }
        }


    }

    ticket_info_result(value) {
        $(".modal-backdrop.in").css("opacity", "0");
        $(".modal-backdrop").css("position", "initial");
        var successCode = value.status;
        if (successCode == 200 || successCode == 201) {
            browserHistory.push('/sar/leader/SAR-dashboard')
        }
    }

    handleDetails(value) {
        this.setState({ tab: value });
        if (value === 'Sar Details') {
            this.setState({
                sarcss: 'active',
                usercss: '',
                repcss: '',
                respcss: '',
                ticketcss: '',
                sarhcss: ''
            });
        }
        if (value === 'User Details') {
            this.state.sarUserDetails = [];
            this.setState({ sarUserDetails: this.state.sarUserDetails });
            this.setState({
                sarcss: '',
                usercss: 'active',
                repcss: '',
                respcss: '',
                ticketcss: '',
                sarhcss: '',
                userLoading: true
            });
            this.props.SarAction.getUserById(this.state.sarData.user_id, this.sarUserDetails);
        }
        if (value === 'Rep Details') {
            this.state.sarRepDetails = {};
            this.setState({ sarRepDetails: this.state.sarRepDetails });
            this.setState({
                sarcss: '',
                usercss: '',
                repcss: 'active',
                respcss: '',
                ticketcss: '',
                sarhcss: ''
            });
            if (this.state.sarData.representative) {
                this.setState({ repLoading: true })
                this.props.SarAction.getUserById(this.state.sarData.representative, this.sarRepDetails);
            }
        }
        if (value === 'Response') {
            this.setState({
                sarcss: '',
                usercss: '',
                repcss: '',
                respcss: 'active',
                ticketcss: '',
                sarhcss: ''
            });
            this.props.SarAction.getSarImages(this.state.sarData.id, this.sarGetImages);
        }
        if (value === 'Ticket') {
            this.setState({
                sarcss: '',
                usercss: '',
                repcss: '',
                respcss: '',
                ticketcss: 'active',
                sarhcss: '',
                ticketLoading: true
            });
         //   this.props.SarAction.getTicketBySarId(this.state.sarData.id, this.ticketResponse);
            this.props.SarAction.getTicketInfoBySarId(this.state.sarData.id, this.ticket_info_response)
        }
        if (value === 'Sar History') {
            this.setState({
                sarcss: '',
                usercss: '',
                repcss: '',
                respcss: '',
                ticketcss: '',
                sarhcss: 'active',
                historyLoading: true,
                sarHistoryDetails: []
            });
            this.props.SarAction.getSarHistory(this.state.sarData.id, this.sarHistoryDetails);
        }
    }

    sarGetImages(data) {
        this.setState({
            sar_response: data.data.data
        })
    }
    ticket_info_response(value) {
        if (value.data.count === 0) {
            this.setState({ ticketLoading: false })
        }

        var successCode = value.status;
        if (successCode == 200 || successCode == 201) {
            this.setState({ ticketinfoDetails: value.data.data, ticketLoading: false });
            console.log("the ticket info detials ---->", this.state.ticketinfoDetails)
        }

    }


    sarHistoryDetails(value) {
        this.setState({ sarHistoryDetails: value.data.data, historyLoading: false });
    }
    getPriorityChange(e) {
        this.state.priority = e.target.value;
        this.props.SarAction.getSarHistory(this.state.sarData.id, this.sarHistoryDetails);
    }

    ticketResponse(value) {
        this.setState({ ticketDetails: value.data.data });
    }

    sarUserDetails = (data) => {
        this.setState({ userLoading: false });
        if (data) {
            this.setState({ sarUserDetails: data.data.data });
        }
    }
    sarRepDetails = (data) => {
        this.setState({ repLoading: false });
        if (data) {
            this.setState({ sarRepDetails: data.data.data });
        }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    changePriority() {
        var data = {
            "priority": this.state.priority
        }
        this.props.SarAction.changeSarPriority(this.props.params.id, data, this.afterPriorityChange);
    }

    afterPriorityChange(data) {
        if (this.props.params) {
            this.props.SarAction.getSarById(this.props.params.id, this.sarValue);
        }
        if (this.props.location.state) {
            this.setState({ loaderDept: true })
            if (this.props.location.state.sar.user_id) {
                this.props.SarAction.getUserById(this.props.location.state.sar.user_id, this.userId);
            }
            this.props.SarAction.getalldepartment(this.departments);
            if (this.props.location.state.sar.id) {
                this.props.SarAction.getResponseById(this.props.location.state.sar.id, this.sarResponse);
            }
            var usertype = 'ComplainceTeamMember'
            this.props.SarAction.getUserByType(usertype, this.getUsertypeResponse);
        }
        //$('.priority-modal').hide();
        //$('.modal-backdrop.in').css("opacity", "0");
        //$('.modal-backdrop.in').css("display", "none");
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
                            {!this.state.filenamevalidate  && 
                                                        
                                                        <div class="alert alert-danger alert-dismissible fade in" role="alert">
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                        </button>
                                                         File name should not have any special character
                                                       </div>
                                                             }
                                <div class="">
                                    <div class="page-title">
                                        <div class="title_left">
                                            <h3>SAR Details</h3>
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
                                                    <h2>SAR Details </h2>

                                                    <div class="clearfix"></div>
                                                </div>
                                                <div class="x_content">
                                                    <div class="" role="tabpanel" data-example-id="togglable-tabs">
                                                        <ul id="myTab" style={{ display: "inline-flex" }} class="nav nav-tabs bar_tabs" role="tablist">
                                                            <li role="presentation" className={this.state.sarcss}><a onClick={() => this.handleDetails('Sar Details')}>SAR Details</a>
                                                            </li>
                                                            <li role="presentation" className={this.state.usercss}><a onClick={() => this.handleDetails('User Details')}>User Details</a>
                                                            </li>
                                                            <li role="presentation" className={this.state.repcss}><a onClick={() => this.handleDetails('Rep Details')}>Representative Details</a>
                                                            </li>

                                                            <li role="presentation" className={this.state.respcss}><a onClick={() => this.handleDetails('Response')}>Responses</a>
                                                            </li>
                                                            <li role="presentation" className={this.state.ticketcss}><a onClick={() => this.handleDetails('Ticket')}>Tickets</a>
                                                            </li>
                                                            <li role="presentation" className={this.state.sarhcss}><a onClick={() => this.handleDetails('Sar History')}>SAR History</a>
                                                            </li>


                                                        </ul>
                                                        <div id="myTabContent" class="tab-content">

                                                            {this.state.tab === "Sar Details" ?
                                                                this.state.sarData !== null ?
                                                                    <div role="tabpanel" class="tab-pane fade active in">
                                                                        {this.state.sarLoading === true ? <div>
                                                                            <center>
                                                                                <PulseLoader
                                                                                    color={'#F15A25'}
                                                                                    loading={this.state.sarLoading}
                                                                                />
                                                                            </center>
                                                                        </div> : ''}
                                                                        <div class="row">
                                                                            <div class="col-md-4">
                                                                                <label for="">SAR ID:</label>
                                                                                {this.state.sarData.id}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Priority:</label>
                                                                                {this.state.sarData.priority}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Assigned To:</label>
                                                                                {this.state.assignedDetails.name}

                                                                            </div>
                                                                        </div>
                                                                        <div class="row">
                                                                            <div class="col-md-4">
                                                                                <label for="">Escalated:</label>
                                                                                {this.state.sarData.isEscalated === true ? 'Yes' : 'No'}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Creation Date:</label>
                                                                                {this.state.sarData.creation_time}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Status:</label>
                                                                                {this.state.sarData.status}
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <label for="">Modified Date:</label>
                                                                                {this.state.sarData.modification_time}
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <label for="">Description:</label>
                                                                                {this.state.sarData.sarDescription}
                                                                            </div>
                                                                        </div>

                                                                    </div> : <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No SAR Details  Found </p> </div> : ''}

                                                            {this.state.userLoading === true ? <div>
                                                                <center>
                                                                    <PulseLoader
                                                                        color={'#F15A25'}
                                                                        loading={this.state.userLoading}
                                                                    />
                                                                </center>
                                                            </div> : ''}
                                                            {this.state.tab === "User Details" ?
                                                                this.state.sarUserDetails.length !== 0 && this.state.userLoading === false ?

                                                                    <div role="tabpanel" class="tab-pane fade active in">

                                                                        <div class="row">
                                                                            <div class="col-md-4">
                                                                                <label for="">Name:</label>
                                                                                {this.state.sarUserDetails.name}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Email Id:</label>
                                                                                {this.state.sarUserDetails.email}
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Phone:</label>
                                                                                {this.state.sarUserDetails.phone}
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <label for="" class="pull-left pl1" >Address: </label>
                                                                                {this.state.sarUserDetails.address !== undefined && <p class="pull-left" style={{ paddingTop: '2px' }}>{this.state.sarUserDetails.address.addressline1} {this.state.sarUserDetails.address.addressline1 === "" ? "" : <br />}
                                                                                    {this.state.sarUserDetails.address.addressline2}{this.state.sarUserDetails.address.addressline2 === "" ? "" : <br />}
                                                                                    {this.state.sarUserDetails.address.city}{this.state.sarUserDetails.address.city === "" ? "" : <br />}
                                                                                    Pin: {this.state.sarUserDetails.address.pincode} </p>}
                                                                            </div>
                                                                        </div>


                                                                    </div> : "" : ""}
                                                            {this.state.tab === "User Details" && this.state.sarUserDetails.length === 0 && this.state.userLoading === false ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No User Details  Found </p> </div> : ''}


                                                            {this.state.repLoading === true ? <div>
                                                                <center>
                                                                    <PulseLoader
                                                                        color={'#F15A25'}
                                                                        loading={this.state.repLoading}
                                                                    />
                                                                </center>
                                                            </div> : ''}
                                                            {this.state.tab === "Rep Details" ?
                                                                Object.keys(this.state.sarRepDetails).length !== 0 && this.state.repLoading === false ?
                                                                    <div role="tabpanel" class="tab-pane fade active in">
                                                                        {this.state.sarRepDetails.name ?
                                                                            <div>
                                                                                <div class="row">
                                                                                    <div class="col-md-4">
                                                                                        <label for="">Name:</label>
                                                                                        {this.state.sarRepDetails.name}
                                                                                    </div>

                                                                                    <div class="col-md-4">
                                                                                        <label for="">Email Id:</label>
                                                                                        {this.state.sarRepDetails.email}
                                                                                    </div>

                                                                                    <div class="col-md-4">
                                                                                        <label for="">Phone:</label>
                                                                                        {this.state.sarRepDetails.phone}
                                                                                    </div>
                                                                                </div>

                                                                                <div class="row">
                                                                                    <div class="col-md-12">
                                                                                        <label for="" class="pull-left pl1">Address: </label>
                                                                                        {this.state.sarRepDetails.address !== undefined && <p class="pull-left">{this.state.sarRepDetails.address.addressline1}{this.state.sarRepDetails.address.addressline1 === "" ? '' : <br />}
                                                                                            {this.state.sarRepDetails.address.addressline2}{this.state.sarRepDetails.address.addressline2 === "" ? '' : <br />}
                                                                                            {this.state.sarRepDetails.address.city} {this.state.sarRepDetails.address.city === "" ? '' : <br />}
                                                                                            Pin: {this.state.sarRepDetails.address.pincode} </p>}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Representative Details  Found </p> </div>
                                                                        }

                                                                    </div> : "" : ""}


                                                            {this.state.historyLoading === true ? <div>
                                                                <center>
                                                                    <PulseLoader
                                                                        color={'#F15A25'}
                                                                        loading={this.state.historyLoading}
                                                                    />
                                                                </center>
                                                            </div> : ''}
                                                            {this.state.tab === "Sar History" ?


                                                                <div role="tabpanel" class="tab-pane fade active in">
                                                                    {this.state.sarHistoryDetails.length !== 0 ? <table class="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Attribute Name</th>
                                                                                <th>Old Value</th>
                                                                                <th>New Value</th>
                                                                                <th>Modified By</th>
                                                                                <th>Modified Date</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            {this.state.sarHistoryDetails.map(function (obj, index) {
                                                                                return (

                                                                                    <tr>
                                                                                        <td>{obj.fieldName}</td>
                                                                                        <td>{this.checkUserName(obj.oldValue)}</td>
                                                                                        <td>{this.checkUserName(obj.newValue)}</td>
                                                                                        <td>{obj.modifiedBy}</td>
                                                                                        <td>{obj.creationTime}</td>
                                                                                    </tr>


                                                                                )
                                                                            }.bind(this))}
                                                                        </tbody>
                                                                    </table> : ''}



                                                                    {this.state.sarHistoryDetails.length === 0 && this.state.historyLoading === false ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Sar History Found </p> </div> : ""}
                                                                </div> : ''}



                                                            {this.state.tab === "Response" ? <div role="tabpanel" class="tab-pane fade active in">
                                                                <div class="row">
                                                                    <div class="trow">
                                                                        {/* <a href="#" class="btn btn-round btn-primary pull-right" data-toggle="modal" data-target=".bs-example-modal-md1">Add Response</a> */}
                                                                        <div class="modal fade bs-example-modal-md1" tabindex="-1" role="dialog" aria-hidden="true">
                                                                            <div class="modal-dialog modal-sm">
                                                                                <div class="modal-content">
                                                                                    <div class="modal-header">
                                                                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                                                        </button>
                                                                                        <h4 class="modal-title" id="myModalLabel2">Add Response</h4>
                                                                                    </div>
                                                                                    <div class="modal-body">
                                                                                        <div class="form-group">
                                                                                            <div class="">
                                                                                                <textarea name="responses" id="" rows="6" class="form-control" onChange={this.responseTextArea} value={this.state.textAreas}></textarea>
                                                                                                <input type="file" class="form-control-file" id="fileUploads" onChange={this.onChange} />
                                                                                            </div>
                                                                                        </div>
                                                                                        <div class="clearfix"></div>
                                                                                    </div>
                                                                                    <div class="modal-footer">
                                                                                        <button type="button" class="btn btn-round btn-primary" data-dismiss="modal" onClick={this.addResponseCall}>Add Response</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="clearfix"></div>
                                                                    </div>
                                                                    {this.state.sar_response.map(function (obj, index) {
                                                                        return (<div class="responses">
                                                                            <div class="row">
                                                                                <div class="col-md-3">
                                                                                    <label for="">From:</label>
                                                                                    {obj.fromUser}
                                                                                </div>

                                                                                <div class="col-md-3">
                                                                                    <label for="">Date:</label>
                                                                                    <Moment format="DD-MMM-YYYY">{this.state.sarDate}</Moment>
                                                                                </div>
                                                                                <div class="col-md-3">
                                                                                </div>
                                                                                {obj.sar_attachment.fileName != null ? <div class="col-md-3" className="pull-right">
                                                                                        <a href={BaseUrl.RestUrl + "sar/download/" + obj.sar_attachment.fileName} download>download</a>
                                                                                    </div> : ''}
                                                                            </div>

                                                                            <div class="row">
                                                                                <div class="col-md-12">
                                                                                    <p>{obj.responseText}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>)
                                                                    }.bind(this))}
                                                                </div>
                                                                {this.state.sar_response.length == 0 ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Response  Found </p> </div> : ""}
                                                            </div> : ''}


                                                            {this.state.tab === "Ticket" ? <div role="tabpanel" className="tab-pane fade active in" >
                                                                {this.state.ticketLoading === true ? <div>
                                                                    <center>
                                                                        <PulseLoader
                                                                            color={'#F15A25'}
                                                                            loading={this.state.ticketLoading}
                                                                        />
                                                                    </center>
                                                                </div> : ''}
                                                                <div className="row">
                                                                    {/* <button className="btn btn-round btn-primary pull-right"
                                                                        data-toggle="modal" data-target="#cstmModel">Create Department Ticket</button> */}
                                                                    <div id="cstmModel" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog"
                                                                        aria-hidden="true">
                                                                        <div class="modal-dialog modal-sm">
                                                                            <div class="modal-content">
                                                                                <div class="modal-header">
                                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                                        <span aria-hidden=" ">×</span>
                                                                                    </button>
                                                                                    <h4 class="modal-title" id="myModalLabel2" onClick={this.create_ticket}>Create Ticket</h4>
                                                                                </div>
                                                                                <div class="modal-body">
                                                                                    <h4>Select Departments</h4>
                                                                                    {this.state.departments.map((data) =>
                                                                                        <div class="checkbox">
                                                                                            <label>
                                                                                                <input onChange={(e) => this.checkBoxSelection(data, e)} type="checkbox" value="" /> {data.name}
                                                                                            </label>
                                                                                        </div>
                                                                                    )}
                                                                                    <div class="form-group">
                                                                                        <label class="control-label col-md-3 col-sm-3 col-xs-12">Priority</label>
                                                                                        <div class="col-md-9 col-sm-9 col-xs-12">
                                                                                            <select class="form-control" onChange={(e) => this.getPriorityValue(e)}>
                                                                                                <option>select</option>
                                                                                                <option value="High">High</option>
                                                                                                <option value="Medium">Medium</option>
                                                                                                <option value="Low">Low</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="clearfix"></div>
                                                                                </div>
                                                                                <div class="modal-footer">
                                                                                    <button type="button" class="btn btn-round btn-primary" data-dismiss="modal" onClick={this.create_ticket}>Create Ticket</button>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>



                                                                {this.state.ticketinfoDetails.length !== 0 ? <table class="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Department Name</th>
                                                                            <th>Creation Time</th>
                                                                            <th>Modified Time</th>
                                                                            <th>Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.ticketinfoDetails.map(function (obj, index) {
                                                                            return (<tr>
                                                                                    <td>{obj.department.name}</td>
                                                                                    <td>{obj.ticket.created_time}</td>
                                                                                    <td>{obj.ticket.modified_time}</td>
                                                                                    <td>{obj.ticket.status}</td>
                                                                            </tr>)
                                                                        }.bind(this))}
                                                                    </tbody>
                                                                </table> : ''}


                                                                {this.state.loaderDept === true ? <div>
                                                                    <center>
                                                                        <PulseLoader
                                                                            color={'#F15A25'}
                                                                            loading={this.state.loaderDept}
                                                                        />
                                                                    </center>
                                                                </div> : ''}
                                                                {this.state.ticketinfoDetails.length === 0 && this.state.ticketLoading === false ? <center><p>No Records Found</p></center> : ''}
                                                            </div>

                                                                : ''}

                                                        </div>
                                                    </div>
                                                </div>




                                                <div class="row">
                                                    <div>
                                                        <center>

                                                            {this.state.sarData.status === "Closed" ? <button class="btn btn-round btn-primary" onClick={this.reopen_sar}>Reopen SAR</button> :
                                                                <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".closesar-modal">Close SAR</button>}
                                                            <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".reassign-modal">Re-Assign SAR</button>
                                                            {this.state.sarData.status !== "Closed" ? <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".priority-modal">Set Priority</button> : ''}
                                                        </center>
                                                    </div>

                                                </div>


                                            </div>
                                            <div class="modal fade bs-example-modal-md reassign-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-md">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <h4 class="modal-title" id="myModalLabel2">Re-Assign SAR</h4>
                                                        </div>
                                                        <div class="modal-body">

                                                            <form action="#" class="form-horizontal form-label-left">
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name">Assign to<span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-7 col-sm-6 col-xs-12">
                                                                        <select name="assign" className="form-control" onChange={this.getTeamMember.bind(this)} required="" >
                                                                            {this.state.allUserDetails.map(function (obj, index) {
                                                                                return (
                                                                                    <option value={obj.id}>{obj.name}</option>

                                                                                )
                                                                            }.bind(this))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="ln_solid"></div>
                                                                <div class="form-group">
                                                                    <div class="col-md-12 col-sm-6 col-xs-12">
                                                                        <center><input type="submit" name="" class="btn btn-round btn-primary" data-dismiss="modal" value="Submit" onClick={this.AssignSar.bind(this)} /> </center><br />
                                                                        {this.state.loadingReassign === true ? <div>
                                                                            <center>
                                                                                <PulseLoader
                                                                                    color={'#F15A25'}
                                                                                    loading={this.state.loadingReassign}
                                                                                />
                                                                            </center>
                                                                        </div> : ''}
                                                                    </div>

                                                                </div>

                                                            </form>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="modal fade bs-example-modal-md priority-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-md">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <h4 class="modal-title" id="myModalLabel2">Set Priority</h4>
                                                        </div>
                                                        <div class="modal-body">

                                                            <div class="form-horizontal form-label-left">
                                                                <div class="form-group">
                                                                    <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name"> Priority <span class="required">*</span>
                                                                    </label>
                                                                    <div class="col-md-7 col-sm-6 col-xs-12">
                                                                        <select id="assign" name="priority" onChange={this.getPriorityChange} class="form-control" required="">
                                                                            {/* <option value="">Choose..</option> */}
                                                                            <option value="High">High</option>
                                                                            <option value="Medium">Medium</option>
                                                                            <option value="Low">Low</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div class="ln_solid"></div>
                                                                <div class="form-group">
                                                                    <div class="col-md-12 col-sm-6 col-xs-12">
                                                                        <center><input type="submit" name="" onClick={this.changePriority} class="btn btn-round btn-primary" data-dismiss="modal" value="Submit" /> </center>

                                                                    </div>

                                                                </div>

                                                            </div>
                                                            <div class="clearfix"></div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            <div class="modal fade bs-example-modal-md closesar-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div class="modal-dialog modal-md">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <h4 class="modal-title" id="myModalLabel2">Close SAR</h4>
                                                        </div>
                                                        <div class="modal-body">

                                                            <form action="#" class="form-horizontal form-label-left">
                                                                <h2 class="text-center">Do you want to close this SAR ?</h2> <br />
                                                                <div class="ln_solid"></div>
                                                                <div class="form-group">
                                                                    <div class="col-md-12 col-sm-6 col-xs-12">
                                                                        <center><button type="button" class="btn btn-round btn-primary" data-dismiss="modal">Cancel</button>
                                                                            <input type="submit" name="" class="btn btn-round btn-primary" data-dismiss="modal" value="OK" onClick={this.close_sar} /> </center><br />
                                                                        {this.state.loading === true ? <div>
                                                                            <center>
                                                                                <PulseLoader
                                                                                    color={'#F15A25'}
                                                                                    loading={this.state.loading}
                                                                                />
                                                                            </center>
                                                                        </div> : ''}

                                                                    </div>

                                                                </div>

                                                            </form>
                                                            <div class="clearfix"></div>
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
function mapStateToProps(state, ownProps) {

    return {
        getUserSuccess: state.login.getUserSuccess,

    };
}
function mapDispatchToProps(dispatch) {
    return {
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SARCCTeamLeaderDetails);







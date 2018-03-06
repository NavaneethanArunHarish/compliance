import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import Footer from '../../../../../components/Footer';
import Action from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'
import SarAction from '../../../actions';
import { PulseLoader } from 'react-spinners';
import $ from "jquery";
import Moment from 'react-moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const entityArray = [
    { label: 'The right to information', value: 'the_right_to_information' },
    { label: 'Copy of data', value: 'copy_of_data' },
    { label: 'Length data was held', value: 'lenght_data_was_held' },
    { label: 'Right to rectification', value: 'right_to_rectification' },
    { label: 'Right to erasure (right to be forgotten)', value: 'right_to_erasure' },
    { label: 'Right to restrict processing', value: 'right_to_restrict_processing' },
    { label: 'Right to object', value: 'right_to_object' },
    { label: 'The right to not', value: 'right_not_to_be_evaluated' },
    { label: 'The right to bring class actions', value: 'the_right_to_bring_class_actions' },
    { label: 'The right of subject access', value: 'the_right_of_subject_acess' },
];
var arrayData = [];
class SubjectAccessRequestDetailExUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sarData: {},
            tab: "Sar Details",
            userAddr: {},
            assignedDetails: {},
            sar_response: [],
            ticketInfo: {},
            name: '',
            email: '',
            phone: '',
            navBar: 'nav-md',
            sarcss: 'active',
            sarLoading: false,
            userLoading: false,
            repLoading: false,
            resLoading: false,
            ticketLoading: false,
            usercss: '',
            repcss: '',
            respcss: '',
            ticketcss: '',
            sarhcss: '',
            sarUserDetails: {},
            sarRepDetails: {},
            escalateReson: '',
            escalateTextArea: '',
            fileErr: '',
            priority: 'High'
        }
        this.handleDetails = this.handleDetails.bind(this);
        //this.userResponse = this.userResponse.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.sarValue = this.sarValue.bind(this);
        this.userId = this.userId.bind(this);
        this.departments = this.departments.bind(this);
        this.checkBoxSelection = this.checkBoxSelection.bind(this);
        this.getPriorityValue = this.getPriorityValue.bind(this);
        this.close_sar = this.close_sar.bind(this);
        this.close_sar_value = this.close_sar_value.bind(this);
        this.reopen_sar = this.reopen_sar.bind(this);
        this.reopen_sar_value = this.reopen_sar_value.bind(this);
        this.changePriority = this.changePriority.bind(this);
        this.ticketInfoDetails = this.ticketInfoDetails.bind(this);
        this.getPriorityChange = this.getPriorityChange.bind(this);
        this.sarGetImages = this.sarGetImages.bind(this);
        this.afterPriorityChange = this.afterPriorityChange.bind(this);
        //this.createResponse = this.createResponse.bind(this);
        this.responseTextArea = this.responseTextArea.bind(this);
        this.addResponseCall = this.addResponseCall.bind(this);
        this.onChange = this.onChange.bind(this);
        this.imageUploadResponse = this.imageUploadResponse.bind(this);
        this.onChangeEscalateionData = this.onChangeEscalateionData.bind(this);
        this.submitEscalation = this.submitEscalation.bind(this);
        this.escalateionReturnResponse = this.escalateionReturnResponse.bind(this);
        this.handleEntityChange = this.handleEntityChange.bind(this);
    }
    handleEntityChange = (newValue) => {
        var data = newValue;
        this.setState({
            totalObject: data
        })
    }
    submitEscalation() {
        var pushdata = [];
        var str = this.state.totalObject
        var str_array = str.split(',');
        for (var i = 0; i < str_array.length; i++) {
            pushdata.push({
                "escalation_data": str_array[i].split(/\s*,\s*/).toString(),
                "user_id": this.state.sarData.user_id,
                "justify": this.state.escalateTextArea
            })
        }
        var data = {
            "data": pushdata
        }
        this.props.SarAction.escalated(this.props.params.id, data, this.escalateionReturnResponse)
    }
    escalateionReturnResponse(value) {
    }
    onChangeEscalateionData(e) {
        this.setState({
            escalateTextArea: e.target.value
        })
    }
    componentWillMount() {
        this.setState({ sarLoading: true });
        if (this.props.params) {
            this.props.SarAction.getSarById(this.props.params.id, this.sarValue);
        }
        if (this.props.location.state) {
            if (this.props.location.state.sar.id) {
                this.props.SarAction.getResponseById(this.props.location.state.sar.id, this.sarResponse);
            }
        }
    }

    onChange(e) {
        var size = e.target.files[0].size;
        if (size > 5000000) {
            document.getElementById("fileUploads").value = "";
            this.setState({ fileErr: 'Error' })
        } else {
            this.setState({ file: e.target.files[0], fileErr: '' })
        }
    }

    // createResponse(e) {
    //     if (this.state.fileErr === '') {
    //         var cookie = localStorage.getItem("user");
    //         var user = JSON.parse(cookie)
    //         var data = {
    //             "responseText": this.state.textAreas,
    //             "user_id": this.state.sarData.user_id,
    //             "fromUser": user.name,
    //             "toUser": ""
    //         }
    //         this.props.SarAction.AddResponse(this.state.sarData.id, data, this.addResponseCall)
    //     } else {
    //         this.setState({ fileErr: 'Error' })
    //     }
    // }

    addResponseCall(e) {
        var cookie = localStorage.getItem("user");
        var user = JSON.parse(cookie)
        var $el = $('#fileUploads');
        $el.wrap('<form>').closest('form').get(0).reset();
        $el.unwrap();
        // this.setState({
        //     textAreas: '',
        // })
        this.props.SarAction.ImageUpload(this.state.file, this.state.sarData.id, user.name, this.state.textAreas, this.imageUploadResponse)
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

    getPriorityChange(e) {
        this.state.priority = e.target.value;
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
            this.props.SarAction.getUserById(this.props.location.state.sar.user_id, this.userId);
            // this.props.SarAction.getTicketInfoBySarId(this.props.location.state.sar.id, this.ticketInfoDetails);
            this.props.SarAction.getalldepartment(this.departments);
        }

        //$('.priority-modal').hide();
        //$('.modal-backdrop.in').css("opacity", "0");
        //$('.modal-backdrop.in').css("display", "none");
    }
    ticketInfoDetails = (value) => {
        this.setState({
            ticketInfo: value.data.data
        })
    }
    sarValue(value) {
        this.setState({ sarData: value.data.data.sar, sarLoading: false, sarDate: value.data.data.creation_time, assignedDetails: value.data.data.assignedTO });
        // this.props.SarAction.getUserById(value.data.data.user_id, this.sarUserDetails);
    }
    userId(user) {

        this.setState({ userData: user.data })
    }

    sarResponse(value) {
        this.setState({ sar_response: value.data.data })
    }


    checkBoxSelection(data, e) {
        this.state.selecteddepartment.push(data);
    }

    getPriorityValue(e) {

        this.state.selectdpriority = e.target.value
    }

    close_sar(e) {
        e.preventDefault();
        this.setState({ loading: true })
        this.props.SarAction.close_sar(this.state.sarData.id, this.close_sar_value);

    }

    close_sar_value(value) {
        this.setState({ loading: false })
        //$(".modal-backdrop.in").css("opacity", "0");
        //$(".modal-backdrop").css("position", "initial");
        browserHistory.push('/sar/Exuser/SAR-dashboard')
    }

    checkDepartmentName = (id) => {
        for (var i = 0; i < this.state.departments.length; i++) {
            if (this.state.departments[i].id === id) {
                return this.state.departments[i].name;
            }
        }
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
                pathname: '/sar/Exuser/SAR-dashboard'
            })
        }
    }


    departments(value) {
        this.setState({ departments: value.data });
    }

    handleDetails(value) {
        this.setState({ tab: value })
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
    }

    sarGetImages(data) {
        this.setState({
            sar_response: data.data.data
        })
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
    componentWillReceiveProps(nextProps) {

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
                                <div class="modal fade bs-example-modal-md escalate-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                    <div class="modal-dialog modal-md">
                                        <div class="modal-content">

                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                </button>
                                                <h4 class="modal-title" id="myModalLabel2">Escalate</h4>
                                            </div>
                                            <div class="modal-body">

                                                <form action="#" class="form-horizontal form-label-left">
                                                    <div class="form-group">
                                                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name"> Escalation <span class="required">*</span>
                                                        </label>
                                                        <div class="col-md-7 col-sm-6 col-xs-12">
                                                            <Select multi
                                                                options={entityArray}
                                                                simpleValue
                                                                value={this.state.totalObject}
                                                                onChange={this.handleEntityChange}
                                                                searchable={false} />
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first-name"> Justify <span class="required">*</span>
                                                        </label>
                                                        <div class="col-md-7 col-sm-6 col-xs-12">
                                                            <textarea name="justify" class="form-control" id="" cols="30" rows="5" required="" onChange={this.onChangeEscalateionData}></textarea>
                                                        </div>
                                                    </div>

                                                    <div class="ln_solid"></div>
                                                    <div class="form-group">
                                                        <div class="col-md-12 col-sm-6 col-xs-12">
                                                            <center><input type="button" data-dismiss="modal" class="btn btn-round btn-primary" value="Submit" onClick={this.submitEscalation} /> </center>
                                                        </div>
                                                    </div>
                                                </form>
                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
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

                                                        </ul>
                                                        <div id="myTabContent" class="tab-content">

                                                            {this.state.tab === "Sar Details" ?
                                                                this.state.sarData.length !== 0 ?
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
                                                                                <Moment format="DD-MMM-YYYY">{this.state.sarData.creation_time}</Moment>
                                                                            </div>

                                                                            <div class="col-md-4">
                                                                                <label for="">Status:</label>
                                                                                {this.state.sarData.status}
                                                                            </div>
                                                                        </div>

                                                                        <div class="row">
                                                                            <div class="col-md-12">
                                                                                <label for="">Modified Date:</label>
                                                                                <Moment format="DD-MMM-YYYY">{this.state.sarData.modification_time}</Moment>
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

                                                                    </div> : "" : ""}
                                                            {this.state.tab === "Rep Details" && Object.keys(this.state.sarRepDetails).length === 0 && this.state.repLoading === false ? <div style={{ textAlign: "center", fontWeight: 'bold' }}><p> No Representative Details  Found </p> </div> : ''}

                                                            {this.state.tab === "Response" ? <div role="tabpanel" class="tab-pane fade active in">
                                                                <div class="row">
                                                                    <div class="trow">
                                                                        <a href="#" class="btn btn-round btn-primary pull-right" data-toggle="modal" data-target=".bs-example-modal-md1">Add Response</a>
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
                                                                                                {this.state.fileErr === 'Error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                                                                    </button>
                                                                                                    <span>File size max 5mb</span>
                                                                                                </div>}
                                                                                                <textarea name="responses" id="" rows="6" class="form-control" onChange={this.responseTextArea} value={this.state.textAreas}></textarea>
                                                                                                <input type="file" class="form-control-file" id="fileUploads" onChange={this.onChange} />
                                                                                                <span>File size max 5mb</span><br />
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

                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-5 col-md-offset-4">
                                                            {this.state.sarData.status === "Closed" ? <button class="btn btn-round btn-primary" onClick={this.reopen_sar}>Reopen SAR</button> :
                                                                <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".closesar-modal-member">Close SAR</button>}
                                                            {this.state.sarData.status !== "Closed" ? <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".priority-modal">Set Priority</button> : ''}
                                                            {this.state.sarData.status !== "Closed" ? <button class="btn btn-round btn-primary" data-toggle="modal" data-target=".escalate-modal">Escalate </button> : ''}
                                                        </div>
                                                    </div><br />
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

                                                    <div class="modal fade bs-example-modal-md closesar-modal-member" tabindex="-1" role="dialog" aria-hidden="true">
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
                                                                                    <input type="submit" name="" class="btn btn-round btn-primary" value="OK" data-dismiss="modal" onClick={this.close_sar} /> </center><br />
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
                    <Footer />
                </div>
            </div >
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        getUserSuccess: state.login.getUserSuccess
    };
}
function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch),
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestDetailExUser);
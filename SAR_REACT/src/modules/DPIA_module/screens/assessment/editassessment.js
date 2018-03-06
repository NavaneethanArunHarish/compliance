import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Select from 'react-select';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import Nestable from 'react-nestable';
import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import { PulseLoader } from 'react-spinners';

import assessmentAction from '../../actions/dpiaAction/assessmentAction';
import SarAction from '../../../SAR_module/actions';
import questionAction from '../../actions/dpiaAction/questionAction'

import 'react-select/dist/react-select.css';
import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

class EditAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            addSecErr: '',
            mailSend: false,
            totalInputField: 0,
            secInputs: [],
            assessmentDetails: {},
            assOption: [],
            selectedOption: {},
            secToEdit: '',
            checkedSec: '',
            createdStatus: '',
            allQuesForSec: [],
            allQuestionData: [],
            equalQuesData: [],
            allAssigneeMember: [],
            sendingMail : {
                to_email:'',
                to_name:''
            },
            secInputs: [{
                id: '',
                name: '',
                owner_id: Number(localStorage.getItem("userId")),
                parentSectionId: null,
                assessment_id: Number(this.props.location.state.id)
            }],
            ssecInputs: [],
            addquesArr: {
                "question_type": "single",
                "question_label": "",
                "section_id": null,
                "action_status": 'open',
                "owner_id": Number(localStorage.getItem("userId")),
                "comments": "",
                "risk_weightage_status": "",
                "checked": false
            },
            allQuestionRow: '',
            loading: false,
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: ''

        }
        this.getCTLUser = this.getCTLUser.bind(this);
        this.allSecQuestion = this.allSecQuestion.bind(this);
        this.afterCreate = this.afterCreate.bind(this);
        this.createQuesForSec = this.createQuesForSec.bind(this);
        this.updateSection = this.updateSection.bind(this);
        this.afterDeleteSec = this.afterDeleteSec.bind(this);
        this.afterAddQues = this.afterAddQues.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.afterUpdateAss = this.afterUpdateAss.bind(this);
        this.handleUpdateAss = this.handleUpdateAss.bind(this);
        this.addSubSectionInput = this.addSubSectionInput.bind(this);
        this.addSectionInput = this.addSectionInput.bind(this);
        this.createSections = this.createSections.bind(this);
        this.createSSections = this.createSSections.bind(this);
        this.handleAssUpChange = this.handleAssUpChange.bind(this);
        this.afterGetAssessment = this.afterGetAssessment.bind(this);
        this.removeSectionInput = this.removeSectionInput.bind(this);
        this.removeSSectionInput = this.removeSSectionInput.bind(this);
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.selSectionsToEdit = this.selSectionsToEdit.bind(this);
        this.handleSecCheck = this.handleSecCheck.bind(this);
        this.handleQuesChange = this.handleQuesChange.bind(this);
        this.afterGetSectionByAssID = this.afterGetSectionByAssID.bind(this);
        this.handleTemplateChange = this.handleTemplateChange.bind(this);
        this.afterQuestionData = this.afterQuestionData.bind(this);
        this.handleQuestionRow = this.handleQuestionRow.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
        this.deletelistofQues = this.deletelistofQues.bind(this);
        this.afterDeleteQueRes = this.afterDeleteQueRes.bind(this);
    }

    reloadPage() {
        window.location.reload();
    }
    componentWillMount() {
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
            this.setState({ loading: true })
            this.props.assessmentAction.getAssessmentById(this.props.location.state.id, this.afterGetAssessment);
            this.props.assessmentAction.getSectionByAssId(this.props.location.state.id, this.afterGetSectionByAssID);
            this.props.assessmentAction.getAssignedByAssId(this.props.location.state.id, this.afterGetAssessmentAssign);
            // this.props.SarAction.getallUser(this.getallUserResponse);
            this.props.questionAction.getQuestion(this.afterQuestionData);
            this.props.SarAction.getUserByType("ComplainceTeamMember", this.getallUserResponse);
        }
    }

    afterGetAssessmentAssign = (data) => {
        if (data.status === 200) {
            var data = {
                value: data.data[0].assignedTo,
                label: ''
            }
            this.setState({
                selectedOption: data
            })
        }
    }

    afterQuestionData(value) {
        this.setState({ allQuestionData: value.data })

    }

    afterGetSectionByAssID(data) {
        var allSections = data.data;
        var section = [];
        var ssection = [];
        for (var i = 0; i < allSections.length; i++) {
            if (allSections[i].parentSectionId !== null && allSections[i].parentSectionId > 0) {
                ssection.push(allSections[i]);
            } else {
                section.push(allSections[i]);
            }
        }
        this.setState({
            secInputs: section,
            ssecInputs: ssection
        })
    }

    handleTemplateChange(e) {
        var data = this.state.assessmentDetails;
        data.template = !data.template;
        this.setState({
            assessmentDetails: data
        })
    }

    handleQuesChange(e) {
        var data = this.state.addquesArr;
        data.question_label = e.target.value;
        this.setState({
            addquesArr: data
        });
    }

    handleAssUpChange(e) {
        var data = this.state.assessmentDetails;
        if (e.target.name === "name") {
            data.name = e.target.value
        }
        if (e.target.name === "ass_desc") {
            data.ass_desc = e.target.value
        }
        this.setState({
            assessmentDetails: data
        })
    }

    handleUpdateAss() {
        var assdata = {
            "assessment_id": Number(this.props.location.state.id),
            "assignedTo": Number(this.state.selectedOption.value),
            "assginedBy": Number(localStorage.getItem("userId"))
        }
        var data = this.state.assessmentDetails;
        data.sending_mail = this.state.mailSend;
        this.setState({assessmentDetails: data})
        this.props.assessmentAction.assignToAssessment(assdata, this.afterAssignedAssessment);
        this.props.assessmentAction.updateAssessment(this.props.location.state.id, this.state.assessmentDetails, this.afterUpdateAss);
    }

    afterAssignedAssessment(data) {
    }

    getCTLUser(data) {
    }

    afterUpdateAss(data) {
        this.props.assessmentAction.getAssessmentById(this.props.location.state.id, this.afterGetAssessment);
        if (data.status === 200) {
            this.setState({
                createdStatus: 'success'
            });
        }
        if (data.status === undefined) {
            this.setState({
                createdStatus: 'error'
            });
        }
    }

    createQuesForSec() {
        var data = this.state.addquesArr;
        data.section_id = this.state.checkedSec;
        this.props.questionAction.CreateQuestion(data, this.afterAddQues);
    }

    afterAddQues(data) {
        this.setState({
            addquesArr: {
                "question_type": "single",
                "question_label": "",
                "section_id": null,
                "action_status": 'open',
                "owner_id": Number(localStorage.getItem("userId")),
                "comments": "",
                "risk_weightage_status": "",
                "checked": false
            }
        })
        this.props.questionAction.getQuesBySecId(this.state.checkedSec, this.allSecQuestion)
        this.props.questionAction.getQuestion(this.afterQuestionData);
    }

    getallUserResponse(data) {
        if (data.status === 200) {
            var totalUser = data.data.data;
            var assOption = [];
            for (var i = 0; i < totalUser.length; i++) {
                // if (totalUser[i].user_type === "External User") {
                assOption.push({
                    "value": totalUser[i].id,
                    "label": totalUser[i].name + ' ( ' + totalUser[i].email + ' )',
                    "email": totalUser[i].email,
                    "name": totalUser[i].name
                })
                // }
            }
            this.setState({
                assOption: assOption,
            });
        }
    }

    afterGetAssessment(data) {
        this.setState({
            assessmentDetails: data.data,
            loading: false
        });
    }

    handleAssChange = (selectedOption) => {
        var myData = { ...this.state.sendingMail };
        myData.to_email = selectedOption.email;
        myData.to_name = selectedOption.name;
        this.setState({ selectedOption: selectedOption,sendingMail:myData });
    }
    sendToMail = () => {
        var data = {
            "to_email": this.state.sendingMail.to_email,
            "to_name": this.state.sendingMail.to_name
        }
        this.props.questionAction.sendMail(data, this.mailSendSuccess)
    }
    mailSendSuccess = (value) => {
        this.setState({mailSend:"true"});
        this.handleUpdateAss();
    }
    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    handleSecCheck(e, data) {
        if (data.id > 0) {
            this.setState({
                checkedSec: data.id
            });
            this.props.questionAction.getQuesBySecId(data.id, this.allSecQuestion)
        }
    }

    allSecQuestion(data) {
        if(data.response === 200){
            this.setState({
                allQuesForSec: data.data
            })
        }
    }

    removeSectionInput(id, index) {
        if (id === '') {
            var secInputs = this.state.secInputs;
            secInputs.splice(index, 1);
            this.setState({ secInputs: secInputs });
        }
        if (id !== '' && id > -1) {
            this.props.assessmentAction.deleteSection(this.state.secInputs[index].id, this.afterDeleteSec);
        }
    }

    removeSSectionInput(id, index) {
        if (id === '') {
            var ssecInputs = this.state.ssecInputs;
            ssecInputs.splice(index, 1);
            this.setState({ ssecInputs: ssecInputs });
        }
        if (id !== '' && id > -1) {
            this.props.assessmentAction.deleteSection(this.state.ssecInputs[index].id, this.afterDeleteSec);
        }
    }

    afterDeleteSec(data) {
        this.props.assessmentAction.getSectionByAssId(this.props.location.state.id, this.afterGetSectionByAssID);
        this.props.questionAction.getQuesBySecId(this.state.checkedSec, this.allSecQuestion)
        this.props.questionAction.getQuestion(this.afterQuestionData);
    }

    handleSecName = (e, index) => {
        var allSecData = this.state.secInputs;
        allSecData[index].name = e.target.value;
        this.setState({
            secInputs: allSecData
        })
    }

    handleSSecName = (e, index) => {
        var allSecData = this.state.ssecInputs;
        allSecData[index].name = e.target.value;
        this.setState({
            ssecInputs: allSecData
        })
    }

    createSections(e, index) {
        for (var i = 0; i < this.state.secInputs.length; i++) {
            if (this.state.secInputs[i].name === '') {
                this.setState({ addSecErr: 'Enter Section' })
                break;
            } else if (this.state.secInputs.length === i + 1) {
                this.setState({ addSecErr: '' })
                this.props.assessmentAction.createSection([this.state.secInputs[index]], this.afterCreate);
            }
        }
    }

    createSSections(e, index) {
        for (var i = 0; i < this.state.secInputs.length; i++) {
            if (this.state.secInputs[i].name === '') {
                this.setState({ addSecErr: 'Enter Section' })
                break;
            } else if (this.state.secInputs.length === i + 1) {
                this.setState({ addSecErr: '' })
                this.props.assessmentAction.createSection([this.state.ssecInputs[index]], this.afterCreate);
            }
        }
    }

    updateSection(e, index) {
        this.props.assessmentAction.updateSections(this.state.secInputs[index].id, this.state.secInputs[index], this.afterCreate);
    }

    afterCreate(data) {
        this.props.assessmentAction.getSectionByAssId(this.props.location.state.id, this.afterGetSectionByAssID);
        var data = this.state.assessmentDetails;
        data.ass_status = 'Open'
        this.setState({
            secToEdit: ''
        });
        this.props.assessmentAction.updateAssessment(this.props.location.state.id, data, this.afterUpdateAss);
    }

    selSectionsToEdit(e, index) {
        this.setState({
            secToEdit: index
        })
    }

    addSectionInput() {
        var secInputs = this.state.secInputs;
        secInputs.push({
            id: '',
            name: '',
            owner_id: Number(localStorage.getItem("userId")),
            parentSectionId: null,
            assessment_id: Number(this.props.location.state.id)
        });
        this.setState({ secInputs: secInputs });
    }

    addSubSectionInput(e, id) {
        var ssecInputs = this.state.ssecInputs;
        ssecInputs.push({
            id: '',
            name: '',
            owner_id: Number(localStorage.getItem("userId")),
            parentSectionId: id,
            assessment_id: Number(this.props.location.state.id)
        });
        this.setState({ ssecInputs: ssecInputs });
    }


    handleQuestionRow(e, secQues, index) {

        var data = secQues;
        data.section_id = this.state.checkedSec;
        this.props.questionAction.CreateQuestion(data, this.afterAddQues);

    }
    deletelistofQues(e, id, index) {
        if (id === '') {
            var allQuesForSec = this.state.allQuesForSec;
            allQuesForSec.splice(index, 1);
            this.setState({ allQuesForSec: allQuesForSec });
        }
        if (id !== '' && id > -1) {
            this.props.questionAction.deleteQuestion(this.state.allQuesForSec[index].id, this.afterDeleteQueRes)
        }


    }
    afterDeleteQueRes(value) {
        this.props.questionAction.getQuesBySecId(this.state.checkedSec, this.allSecQuestion)
        this.props.questionAction.getQuestion(this.afterQuestionData);
    }


    render() {
        const { selectedOption } = this.state;
        const value = selectedOption && selectedOption.value;
        return (
            <div className={this.state.navBar}>
                {this.state.isLoggedIn ?
                    <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                        <div className="main_container">
                            <SideBar />
                            <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                            <div className="right_col" role="main">
                                <div className="">
                                    <div className="page-title">
                                        <div className="title_left">
                                            <h3>Edit Assessment : {this.state.assessmentDetails.name}</h3>
                                        </div>


                                    </div>

                                    <div className="clearfix"></div>

                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 col-xs-12">
                                            <div className="x_panel">
                                                {this.state.createdStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                    </button>
                                                    <span>Assessment updated successfully</span>
                                                </div>}
                                                {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                    </button>
                                                    <span>Error in Assessment update</span>
                                                </div>}
                                                <div className="x_title">
                                                    <h2>Details</h2>
                                                    <span className="label label-success" style={{ color: 'white', fontSize: '13px', float: 'right' }}>{this.state.assessmentDetails.ass_status}</span>
                                                    <div className="clearfix"></div>
                                                </div>
                                                <div className="x_content">

                                                    <div className="row">
                                                        {/* <div className="col-md-6">
                                                        <label htmlFor="" className="padt10">Save As Template:</label>
                                                        <input style={{ marginLeft: '15px' }} checked={this.state.assessmentDetails.template} onChange={this.handleTemplateChange} type="checkbox" />
                                                    </div> */}
                                                    </div>
                                                    {this.state.loading === true ? <div>
                                                        <center>
                                                            <PulseLoader
                                                                color={'#F15A25'}
                                                                loading={this.state.loading}
                                                            />
                                                        </center>
                                                    </div> : ''}

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="" className="padt10">Name:</label>
                                                                <input type="text" name="name" value={this.state.assessmentDetails.name} onChange={this.handleAssUpChange} className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label htmlFor="" className="padt10">Assigned to:</label>
                                                            <Select
                                                                value={value}
                                                                onChange={this.handleAssChange}
                                                                options={this.state.assOption}
                                                                searchable={true} />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="" className="pull-left pl1">Description: </label>
                                                                <textarea name="description" name="ass_desc" onChange={this.handleAssUpChange} value={this.state.assessmentDetails.ass_desc} id="" cols="30" rows="5" className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row padt10">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="" className="pull-left pl1">Project: </label>
                                                                <p className="pull-left"> {this.state.assessmentDetails.name} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>




                                                <div id="example" className="manage-sec">

                                                    <div className="row">

                                                        <div className="col-md-4" >
                                                            <div className="x_title">
                                                                <h2>Manage Sections</h2>
                                                                <input type="button" disabled={this.state.assessmentDetails.sending_mail} className="btn btn-primary" style={{ float: 'right' }} id="addrow" value="Add Section" onClick={this.addSectionInput} />
                                                                <div className="clearfix"></div>
                                                            </div>
                                                            <div className="x_content">
                                                                <div id="div1" className="single anstype">
                                                                    <table id="myTable12" className="order-list table">
                                                                        <tbody>
                                                                            {this.state.secInputs.map((input, index) => {
                                                                                var ref = "input_" + index;
                                                                                var sec_id = input.id;
                                                                                return [
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            <input type="radio" name="anssingle" checked={input.id === this.state.checkedSec} onClick={(e) => this.handleSecCheck(e, input)} ref={ref} />
                                                                                        </td>
                                                                                        <td className="col-sm-10">
                                                                                            <input type="text" name="name" onChange={(e) => this.handleSecName(e, index)} className="form-control" required="required" value={input.name} />
                                                                                        </td>
                                                                                        <td className="col-sm-2">
                                                                                            <div style={{ display: 'flex' }}>
                                                                                                {input.id !== '' && !this.state.assessmentDetails.sending_mail && <i className="material-icons" aria-hidden="true" onClick={(e) => this.addSubSectionInput(e, input.id)} title="add sub-section" style={{ fontSize: '35px', color: 'red', cursor: 'pointer' }}>add_box</i>}
                                                                                                {input.id === '' && <i className="material-icons" onClick={(e) => this.createSections(e, index)} aria-hidden="true" title="save section" style={{ fontSize: '35px', color: 'red', cursor: 'pointer' }}>check_box</i>}
                                                                                                {input.id !== '' && this.state.secToEdit !== index && <i className="material-icons" aria-hidden="true" title="edit section name" onClick={(e) => this.selSectionsToEdit(e, index)} style={{ fontSize: '27px', padding: '4px', width: '30px', color: 'red', cursor: 'pointer' }}>edit_box</i>}
                                                                                                {this.state.secToEdit === index && <i className="material-icons" aria-hidden="true" title="update section name" onClick={(e) => this.updateSection(e, index)} style={{ fontSize: '27px', padding: '4px', width: '30px', color: 'red', cursor: 'pointer' }}>check_box</i>}
                                                                                                {<i className="material-icons" aria-hidden="true" title="Delete section" onClick={this.removeSectionInput.bind(this, input.id, index)} style={{ fontSize: '35px', color: 'red', cursor: 'pointer' }}>delete</i>}
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>,
                                                                                    this.state.ssecInputs.map((input, index) => {
                                                                                        var ref = "input_" + index;
                                                                                        if (input.parentSectionId === sec_id)
                                                                                            return (
                                                                                                <tr key={index}>
                                                                                                    <td></td>
                                                                                                    <td>
                                                                                                        <input type="radio" name="anssingle" checked={input.id === this.state.checkedSec} onClick={(e) => this.handleSecCheck(e, input)} ref={ref} />
                                                                                                    </td>
                                                                                                    <td className="col-sm-10">
                                                                                                        <input type="text" name="name" onChange={(e) => this.handleSSecName(e, index)} className="form-control" required="required" value={input.name} />
                                                                                                    </td>
                                                                                                    <td className="col-sm-2">
                                                                                                        <div style={{ display: 'flex' }}>
                                                                                                            {input.id === '' && <i className="material-icons" onClick={(e) => this.createSSections(e, index)} aria-hidden="true" title="save section" style={{ fontSize: '35px', color: 'red', cursor: 'pointer' }}>check_box</i>}
                                                                                                            {input.id !== '' && this.state.secToEdit !== index && <i className="material-icons" aria-hidden="true" title="edit section name" onClick={(e) => this.selSectionsToEdit(e, index)} style={{ fontSize: '27px', padding: '4px', width: '30px', color: 'red', cursor: 'pointer' }}>edit_box</i>}
                                                                                                            {this.state.secToEdit === index && <i className="material-icons" aria-hidden="true" title="update section name" onClick={(e) => this.updateSection(e, index)} style={{ fontSize: '27px', padding: '4px', width: '30px', color: 'red', cursor: 'pointer' }}>check_box</i>}
                                                                                                            {<i className="material-icons" aria-hidden="true" title="Delete section" onClick={this.removeSSectionInput.bind(this, input.id, index)} style={{ fontSize: '35px', color: 'red', cursor: 'pointer' }}>delete</i>}
                                                                                                        </div>
                                                                                                    </td>
                                                                                                </tr>
                                                                                            )
                                                                                    })


                                                                                ]
                                                                            })}
                                                                            <span style={{ color: 'red' }}>{this.state.addSecErr}</span>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="x_title">
                                                                <h2 style={{ paddingBottom: '5px' }}>Manage Questions</h2>
                                                                <div className="clearfix"></div>
                                                            </div>
                                                            <div className="x_content">

                                                                <div className="col-xs-2">

                                                                    <ul className="nav nav-tabs tabs-left">
                                                                        <li className="active"><a href="#list-of-questions" data-toggle="tab">Browse list of Questions</a>
                                                                        </li>
                                                                        <li><a href="#add-ldap-user" data-toggle="tab">Add New Question</a> </li>
                                                                        <li><a href="#all-question-fromuser" data-toggle="tab">Add from Question Bank</a></li>

                                                                    </ul>
                                                                </div>

                                                                <div className="col-xs-10">
                                                                    {/* <!-- Tab panes --> */}
                                                                    <div className="tab-content">
                                                                        <div className="tab-pane active" id="list-of-questions">
                                                                            <p className="lead">Browse list of Questions</p>


                                                                            <div className="no-overflow"><table className="table generaltable" id="users">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="header c0 centeralign" scope="col">Sr.No</th>
                                                                                        <th className="header c1 centeralign" scope="col">Question<a /></th>
                                                                                        <th className="header c2" scope="col">Action<a /></th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {this.state.allQuesForSec !==undefined && this.state.allQuesForSec.length > 0 ?
                                                                                        this.state.allQuesForSec.map((secQues, index) =>

                                                                                            <tr className="lastrow" key={index}>
                                                                                                <td className="cell c2" >{index + 1}</td>
                                                                                                <td className="cell c3" >{secQues.question_label}</td>

                                                                                                <td className="cell c5" >

                                                                                                    <a ><i className="material-icons" aria-hidden="true" title="Delete section" onClick={(e) => this.deletelistofQues(e, secQues.id, index)} style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}>delete</i></a>
                                                                                                </td>

                                                                                            </tr>) :
                                                                                        "No Question for this section"}
                                                                                </tbody>
                                                                            </table>
                                                                            </div>


                                                                        </div>
                                                                        <div className="tab-pane" id="add-ldap-user">
                                                                            <p className="lead">Add New Question</p>


                                                                            {this.state.checkedSec !== '' ? <div className="form-group row  fitem   ">
                                                                                <div className="col-md-2">

                                                                                    <label className="col-form-label d-inline " htmlFor="id_firstname">
                                                                                        Question
									                                        </label>
                                                                                </div>
                                                                                <div className="col-md-8" data-fieldtype="text">
                                                                                    <textarea className="form-control" onChange={this.handleQuesChange} value={this.state.addquesArr.question_label} rows="4" cols="50" />
                                                                                    <div className="form-control-feedback" id="id_error_firstname" style={{ display: "none" }}>

                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-2">
                                                                                    <input type="button" value="Add" onClick={this.createQuesForSec} className="btn btn-primary btn-round" />
                                                                                </div>
                                                                            </div> :
                                                                                "No Section selected"}

                                                                        </div>

                                                                        <div className="tab-pane" id="all-question-fromuser">
                                                                            <p className="lead">Add from Question Bank</p>



                                                                            <div className="no-overflow"><table className="table generaltable" id="users">

                                                                                <thead>
                                                                                    <tr>
                                                                                        <th className="header c0 centeralign" scope="col">Sr.No</th>
                                                                                        <th className="header c1 centeralign" scope="col">Question<a /></th>
                                                                                        <th className="header c2" scope="col">Action<a /></th>

                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {this.state.allQuestionData.length > 0 ?

                                                                                        this.state.allQuestionData.map((secQuestions, index) => {
                                                                                            if (secQuestions.section_id === null)
                                                                                                return (
                                                                                                    <tr className="lastrow" key={index}>
                                                                                                        <td className="cell c2" >
                                                                                                            {index + 1}</td>
                                                                                                        <td className="cell c3" >{secQuestions.question_label}</td>
                                                                                                        <td className="cell c5" >
                                                                                                            {secQuestions.section_id == this.state.checkedSec ?
                                                                                                                <i className="material-icons" aria-hidden="true" title="update section name" style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}>check_box</i>
                                                                                                                : <i className="material-icons" aria-hidden="true" title="update section name" onClick={(e) => this.handleQuestionRow(e, secQuestions, index)} style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}>add_box</i>
                                                                                                            }
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                        }) :
                                                                                        "No Question for this section"}
                                                                                </tbody>
                                                                            </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="clearfix"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <center>
                                                            <input type="button" disabled={this.state.assessmentDetails.sending_mail} onClick={this.handleUpdateAss} value="Save" className="btn btn-primary btn-round" />
                                                            <input type="button" style={{ marginLeft: '75px' }} value="Send Assessment" className="btn btn-primary btn-round" data-toggle="modal" data-target=".send-modal" />
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade bs-example-modal-md send-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog modal-md">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                            </button>
                                            <h4 class="modal-title" id="myModalLabel2">Send Assessment</h4>
                                        </div>
                                        <div class="modal-body">
                                            <form action="#" class="form-horizontal form-label-left">
                                                {Object.keys(this.state.selectedOption).length !== 0 ? <p class="text-center lead">Assessment will not be editable once it is sent. This assessment will be sent to {this.state.selectedOption.label}. Do you want to send it now?</p>
                                                    : <p class="text-center lead">Before send assessment select assigned to.</p>}<br />
                                                <div class="ln_solid"></div>
                                                <div class="form-group">
                                                    <div class="col-md-12 col-sm-6 col-xs-12">
                                                        <center><button type="button" class="btn btn-round btn-primary" data-dismiss="modal">Cancel</button>
                                                            {Object.keys(this.state.selectedOption).length !== 0 ? <input type="button" onClick={this.sendToMail} data-dismiss="modal" name="" class="btn btn-round btn-primary" value="OK" /> : ''}                                                            </center><br />
                                                    </div>
                                                </div>
                                            </form>
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div >
                    </div >
                    :
                    <div>
                        <PopUpLogin prvUrl={this.state.previousUrl} redirectAferSuccess={this.reloadPage} />
                    </div>
                }
            </div >
        );
    }
}

function mapStateToProps(state, props) {
    return {
        // getSarSuccess: state.sar.sarSuccess
    };
}

function mapDispatchToProps(dispatch) {
    return {
        assessmentAction: bindActionCreators(assessmentAction, dispatch),
        questionAction: bindActionCreators(questionAction, dispatch),
        SarAction: bindActionCreators(SarAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAssessment);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import { BaseUrl } from '../../../../serviceUrl/serviceUrl';
import $ from 'jquery';
import SarAction from '../../../SAR_module/actions';

import { Pagination, Icon, Table } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import assessmentAction from '../../actions/dpiaAction/assessmentAction'
import questionAction from '../../actions/dpiaAction/questionAction'

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

class DPIAAnswerSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBar: 'nav-md',
      selectedValue: '',
      selectSection: '',
      isLoggedIn: false,
      openPopUpLogin: false,
      previousUrl: '',
      quesNo: this.props.location.state.ques,
      allSection: [],
      allQuestion: [],
      backColor: '',
      answerToUpload: {
        question_id: '',
        section_id: '',
        comments: '',
        answer_sel: ''
      },
      risk_weightage: '',
      question: '',
      allFiles: [],
      notes: {
        notes: '',
        type: '',
        question_id: '',
        owner_id: localStorage.getItem("userId")
      },
      allNotes: [],
      clearFile: '',
      username: '',
      allUser: [],
      quesAssigned: {
        question_id: '',
        assignedTo: '',
        assignedBy: localStorage.getItem("userId"),
        section_id: '',
        assessment_id: ''
      }
    }
    this.gotAnswer = this.gotAnswer.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
    this.afterSavingAnswer = this.afterSavingAnswer.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.changeQuestionPrev = this.changeQuestionPrev.bind(this);
    this.handleNavBar = this.handleNavBar.bind(this);
    this.getAllSecQuestion = this.getAllSecQuestion.bind(this);
    this.getAllSection = this.getAllSection.bind(this);
    this.getCurrentSession = this.getCurrentSession.bind(this);
    this.getAllQuestion = this.getAllQuestion.bind(this);
  }

  editUserName = (e) => {
    console.log("------->> ", e.target.value)
    this.setState({
      username: e.target.value
    });
  }

  searchUser = () => {
    this.props.SarAction.getUserById(this.state.username, this.afterSearchUser);
  }

  afterSearchUser = (data) => {
    console.log("------>> ", data)
    var allUser = [];
    if (data.status === 200) {
      allUser.push(data.data.data);
      this.setState({
        allUser: allUser
      })
    }
  }

  selectUserFromList = (e, obj) => {
    var data = obj;
    var dataToedit = this.state.quesAssigned;
    dataToedit.assignedTo = obj.id
    this.setState({
        quesAssigned: dataToedit
    })
  }

  clickDelegate = (e, obj) => {
    this.setState({
      quesAssigned: {
        question_id: obj.id,
        assignedTo: obj.id,
        assignedBy: Number(localStorage.getItem("userId")),
        section_id: obj.section_id,
        assessment_id: this.state.assessment_id
      }
    })
  }

  assignQuestion = () => {
    this.props.questionAction.assignQuestion(this.state.quesAssigned, this.afterDelegate)
  }

  afterDelegate = (data) => {
    console.log("-------------------------------->> ", data)
  }

  handleNotes = (e, id) => {
    var data = this.state.notes;
    if (e.target.name === 'notes') {
      data.notes = e.target.value
      data.question_id = id
    }
    if (e.target.name === 'type') {
      data.type = e.target.value
      data.question_id = id
    }
    this.setState({
      notes: data
    })
  }

  saveNotes = () => {
    this.props.questionAction.addNotes(this.state.notes, this.afterSaveNotes);
  }

  afterSaveNotes = (data, id) => {
    if (data.status === 200)
      this.props.questionAction.getNotes(id, this.getAllNotes)
  }
  getAllNotes = (data) => {
    if (data.status === 200) {
      this.setState({
        allNotes: data.data
      })
    }
  }

  handleAnswerChange = (e) => {
    var data = this.state.answerToUpload;
    data.answer_sel = e.target.value
    this.setState({
      answerToUpload: data
    })
  }

  reloadPage() {
    window.location.reload();
  }

  componentWillMount(e) {
    var userId = localStorage.getItem("userId");
    if (userId == null) {
      var prevUrl = this.props.location.pathname;
      this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
    } else {
      this.setState({ isLoggedIn: true });
      this.props.assessmentAction.getSectionByAssId(this.props.location.state.id, this.getAllSection);
      this.props.questionAction.getAnswerByQuesId(this.props.location.state.ques, this.gotAnswer);
      this.props.questionAction.getAttachment(this.props.location.state.ques, this.afterGetAllFile)
      this.props.questionAction.getNotes(this.props.location.state.ques, this.getAllNotes)
      this.getCurrentSession(e, this.props.location.state.sec);
    }
  }

  gotAnswer(data) {
    if (data.status === 200) {
      if (data.data.length > 0) {
        this.setState({
          answerToUpload: data.data[0]
        });
      }
    }
  }

  saveAnswer(e, ques) {
    var data = {
      question_id: ques.id,
      section_id: ques.section_id,
      comments: this.state.answerToUpload.comments,
      answer_sel: this.state.answerToUpload.answer_sel
    }

    if (!this.state.answerToUpload.id) {
      this.props.questionAction.saveAnswer(data, this.afterSavingAnswer);
    } else {
      this.props.questionAction.updateAnswer(data, this.state.answerToUpload.id, this.afterSavingAnswer);
    }

    var riskData = {
      risk_weightage_status: this.state.risk_weightage,
      question_type: ques.question_type,
      question_label: ques.question_label,
      section_id: ques.section_id,
      action_status: ques.action_status,
      comments: ques.comments,
      isAnswered: true
    }
    this.props.questionAction.updateQuestion(riskData, ques.id, this.afterUpdatingRisk);
  }

  requestSignOff = (e, ques) => {
    var riskData = {
      risk_weightage_status: this.state.risk_weightage,
      question_type: ques.question_type,
      question_label: ques.question_label,
      section_id: ques.section_id,
      action_status: "Sign-Off Requested",
      comments: ques.comments,
      isAnswered: true
    }
    this.props.questionAction.updateQuestion(riskData, ques.id, this.afterUpdatingRisk);
  }

  afterUpdatingRisk(data) {
    // this.setState({
    //   risk_weightage: ''
    // })
  }

  afterSavingAnswer(data) {

  }

  handleRiskChange = (e, obj) => {
    if (e.target.value !== '') {
      if (e.target.value >= 5) {
        this.setState({
          risk_weightage: e.target.value,
          question: obj.id,
          backColor: 'red'
        })
      } else {
        this.setState({
          risk_weightage: e.target.value,
          question: obj.id,
          backColor: 'yellow'
        })
      }
    }
  }

  changeQuestion(e, rid) {
    var id = rid + 1;
    if (id <= (this.state.allQuestion.length - 1)) {
      this.setState({
        quesNo: this.state.allQuestion[id].id,
        risk_weightage: this.state.allQuestion[id].risk_weightage_status,
        answerToUpload: {
          question_id: '',
          section_id: '',
          comments: '',
          answer_sel: ''
        },
        allNotes: [],
        allFiles: []
      });
      this.props.questionAction.getAnswerByQuesId(this.state.allQuestion[id].id, this.gotAnswer);
      this.props.questionAction.getAttachment(this.state.allQuestion[id].id, this.afterGetAllFile);
      this.props.questionAction.getNotes(this.state.allQuestion[id].id, this.getAllNotes);
    }
  }

  changeQuestionPrev(e, rid) {
    var id = rid - 1;
    if (id >= 0) {
      this.setState({
        quesNo: this.state.allQuestion[id].id,
        risk_weightage: this.state.allQuestion[id].risk_weightage_status,
        answerToUpload: {
          question_id: '',
          section_id: '',
          comments: '',
          answer_sel: ''
        },
        allNotes: [],
        allFiles: []
      });
      this.props.questionAction.getAnswerByQuesId(this.state.allQuestion[id].id, this.gotAnswer);
      this.props.questionAction.getAttachment(this.state.allQuestion[id].id, this.afterGetAllFile);
      this.props.questionAction.getNotes(this.state.allQuestion[id].id, this.getAllNotes);
    }
  }

  getAllSection(data) {
    this.setState({
      allSection: data.data,
      assessment_id: data.data[0].assessment_id
    })
  }

  getCurrentSession(e, id) {
    this.props.questionAction.getQuesBySecId(id, this.getAllQuestion);
  }

  getAllQuestion(data) {
    for (var i = 0; i < data.data.length; i++) {
      if (data.data[i].id === Number(this.props.location.state.ques)) {
        this.setState({
          allQuestion: data.data,
          risk_weightage: data.data[i].risk_weightage_status
        });
      }
    }
    // browserHistory.push('/')
  }

  handleFile = (e, quesid) => {
    this.props.questionAction.uploadAnswerAttachment(e.target.files[0], quesid, this.afterFileSave);
  }

  afterFileSave = (data, id) => {
    if (data === 'File uploaded successfully!') {
      this.setState({ clearFile: '' })
      this.props.questionAction.getAttachment(id, this.afterGetAllFile)
    }
  }

  afterGetAllFile = (data) => {
    this.setState({
      allFiles: data.data
    })
  }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }

  handleTextChange = (e) => {
    var data = this.state.answerToUpload;
    if (e.target.name === "comments") {
      data.comments = e.target.value
    }
    this.setState({
      answerToUpload: data
    })
  }

  changeSection(e, id) {
    this.setState({
      answerToUpload: {
        question_id: '',
        section_id: '',
        comments: '',
        answer_sel: '',
        risk_weightage: ''
      },
      allNotes: [],
      allFiles: []
    });
    this.props.questionAction.getQuesBySecId(id, this.getAllSecQuestion);
  }

  getAllSecQuestion(data) {
    this.setState({
      allQuestion: data.data,
      quesNo: data.data[0].id,
      risk_weightage: data.data[0].risk_weightage_status
    });
    this.props.questionAction.getAnswerByQuesId(data.data[0].id, this.gotAnswer);
    this.props.questionAction.getAttachment(data.data[0].id, this.afterGetAllFile);
    this.props.questionAction.getNotes(data.data[0].id, this.getAllNotes)
  }

  render() {
    return (
      <div className={this.state.navBar}>
        {this.state.isLoggedIn ?
          <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
            <div className="main_container">
              <SideBar />
              <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
              <div className="right_col" role="main">
                <div className="">
                  <div className="clearfix"></div>
                  <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="x_panel">
                        <div className="x_title">
                          <h2> <a href="#">Assessment</a> &gt; Assessment 1  </h2>
                          <input className="star" type="checkbox" title="Mark complete" />
                          <div className="clearfix"></div>
                        </div>
                        <div className="x_content">
                          <div className="col-xs-2">
                            <ul className="nav nav-tabs tabs-left">
                              {this.state.allSection.map((obj, index) => {
                                return (
                                  <li className="">
                                    <a onClick={(e) => this.changeSection(e, obj.id)} data-toggle="tab">{obj.name}
                                      {obj.status == 'full' && <span className="status-green"></span>}
                                      {obj.status == 'partial' && <span className="status-yellow"></span>}
                                      {obj.status == 'none' && <span className="status-red"></span>}</a>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                          {this.state.allQuestion.map((ques, index) => {
                            if (Number(this.state.quesNo) === ques.id) {
                              return [
                                <div className="col-xs-10" key={index}>
                                  <div className="tab-content">
                                    <div className="tab-pane active" id="list-of-questions">
                                      <div>
                                        <div className="form-group ">
                                          {ques.action_status === 'open' && <span className="status-red"></span>}
                                          {ques.action_status === 'Sign-Off Requested' && <span className="status-yellow"></span>}
                                          {ques.action_status === 'Completed' && <span className="status-green"></span>}
                                          <p className="head_question_cls">{index + 1}. {ques.question_label}<br /> </p>
                                          <p className="ans_cls"><input type="radio" onChange={this.handleAnswerChange} checked={this.state.answerToUpload.answer_sel.trim() === 'Yes'} name="answer_sel" value="Yes" /> Yes</p>
                                          <p className="ans_cls"><input type="radio" onChange={this.handleAnswerChange} checked={this.state.answerToUpload.answer_sel.trim() === 'No'} name="answer_sel" value="No" /> No</p>
                                          <p className="ans_cls"><input type="radio" onChange={this.handleAnswerChange} checked={this.state.answerToUpload.answer_sel.trim() === 'Not Applicable'} name="answer_sel" value="Not Applicable" /> Not Applicable</p>
                                          <p className="ans_cls"><input type="radio" onChange={this.handleAnswerChange} checked={this.state.answerToUpload.answer_sel.trim() === 'Other'} name="answer_sel" value="Other" /> Other</p>
                                        </div>
                                        <div className="form-group ">
                                          <p className="head_question_cls">Justify Your Answer Below</p>
                                          <p><textarea className="form-control" name="comments" value={this.state.answerToUpload.comments} onChange={this.handleTextChange} rows="4" cols="50"></textarea></p>
                                        </div>
                                        <div className="form-group ">
                                          <label className="control-label col-md-2" htmlFor="name">Risk Weightage</label>
                                          <div className="col-md-2">
                                            {/* <div className="col-md-2"> */}
                                            <select name="datatable_length" value={this.state.risk_weightage} onChange={(e) => this.handleRiskChange(e, ques)} aria-controls="datatable" className="form-control input-sm">
                                              <option value=''>--Select--</option>
                                              <option value="10">10</option>
                                              <option value="9">9</option>
                                              <option value="8">8</option>
                                              <option value="7">7</option>
                                              <option value="6">6</option>
                                              <option value="5">5</option>
                                              <option value="4">4</option>
                                              <option value="3">3</option>
                                              <option value="2">2</option>
                                              <option value="1">1</option>
                                            </select>
                                            {/* </div> */}
                                          </div>
                                          <div className="col-md-2 showRiskColor" style={{ backgroundColor: this.state.backColor }}>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="col-md-1">
                                            </div>
                                            <div className="col-md-3 showHighRiskColor">
                                            </div>
                                            <div className="col-md-2">
                                              10-5
                                            </div>
                                            <div className="col-md-3 showLowRiskColor">
                                            </div>
                                            <div className="col-md-2">
                                              4-0
                                            </div>
                                          </div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="form-group space_cls ">
                                          <div className="col-md-2">

                                            <label className="col-form-label d-inline " htmlFor="id_userfile"> File </label>
                                          </div>
                                          <div className="col-md-10 form-inline felement" data-fieldtype="filepicker">

                                            <div id="filepicker-wrapper-5a5dfbd9b1982" className="mdl-left">
                                              <div>
                                                <input type="file" onChange={(e) => this.handleFile(e, ques.id)} value={this.state.clearFile} className="btn btn-secondary fp-btn-choose" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                      </div>

                                      <br />
                                      <div className="x_content">

                                        <Table celled fixed singleLine>
                                          <Table.Header>
                                            <Table.Row>
                                              <Table.HeaderCell>SI NO</Table.HeaderCell>
                                              {/* <Table.HeaderCell>IMAGE</Table.HeaderCell> */}
                                              <Table.HeaderCell>ATTACHMENT</Table.HeaderCell>
                                            </Table.Row>
                                          </Table.Header>

                                          <Table.Body>
                                            {this.state.allFiles.map((fl, index) => {
                                              return (
                                                <Table.Row>
                                                  <Table.Cell>{index + 1}</Table.Cell>
                                                  {/* <Table.Cell><i className="fa fa-file-word-o"></i></Table.Cell> */}
                                                  <Table.Cell><a href={BaseUrl.DPIARestUrl + 'attachment/download/' + fl.fileName} download>{fl.fileName}</a></Table.Cell>
                                                </Table.Row>
                                              )
                                            })}
                                          </Table.Body>
                                        </Table>
                                        <br />

                                      </div>

                                      <br />
                                      <div className="row">
                                        <div className="col-md-12 form-inline felement">
                                          <button type="button" className="btn btn-primary" data-toggle="modal" onClick={(e) => this.clickDelegate(e,ques)} data-target=".delegate-modal">Delegate</button>
                                          <input type="submit" className="btn btn-primary" onClick={(e) => this.requestSignOff(e, ques)} name="submitbutton" id="id_submitbutton" value="Request Sign-Off" />
                                          <input type="submit" className="btn btn-primary" onClick={(e) => this.saveAnswer(e, ques)} name="submitbutton" id="id_submitbutton" value="Save" />

                                        </div>
                                      </div>
                                      <br />
                                      <div className="row">
                                        <div className="col-md-12 form-inline felement">
                                          <input type="submit" onClick={(e) => this.changeQuestionPrev(e, index)} className="btn btn-primary" name="submitbutton" id="id_submitbutton" value="< Previous" />
                                          <input type="submit" onClick={(e) => this.changeQuestion(e, index)} className="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Next >" />
                                        </div>
                                      </div>

                                      <br />
                                      <br />
                                      <br />
                                      <div className="form-group">
                                        <div className="row">
                                          <div className="col-md-12">
                                            <label className="col-form-label d-inline " htmlFor="id_userfile">
                                              NOTE
							</label>
                                            <div className="form-group">




                                              <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".priority-modal">Add New Note</button>

                                              {/* <!-- Modal --> */}

                                              <div className="modal fade bs-example-modal-md delegate-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-lg">
                                                  <div className="modal-content">

                                                    <div className="modal-header">
                                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                      </button>
                                                      <h4 className="modal-title" id="myModalLabel2">Search Users</h4>
                                                    </div>
                                                    <div className="modal-body">




                                                      <div className="tab-pane active" id="add-ldap-user">

                                                        {/* <div className="form-group fitem row">
                                                          <div className="col-md-2"></div>
                                                          <div className="col-md-2">
                                                            <label className="col-form-label d-inline " for="id_firstname">
                                                              Email
							</label>
                                                          </div>
                                                          <div className="col-md-4 form-inline felement" data-fieldtype="text">
                                                            <input type="text" className="form-control " name="ldap-email" id="id_ldapemail" value="" size="30" maxlength="100" />


                                                          </div>

                                                        </div> */}

                                                        <div className="form-group fitem row">
                                                          <div className="col-md-2"></div>
                                                          <div className="col-md-2">

                                                            <label className="col-form-label d-inline " for="id_firstname">  Name  </label>
                                                          </div>
                                                          <div className="col-md-6 form-inline felement" data-fieldtype="text">
                                                            <input type="text" value={this.state.username} name="username" onChange={(e) => this.editUserName(e)} className="form-control" id="id_ldapfname" size="30" maxlength="100" />

                                                          </div>

                                                        </div>

                                                        <div className="form-group fitem row">
                                                          <div className="col-md-4"></div>
                                                          <div className="col-md-2 form-inline felement" data-fieldtype="text">
                                                            <input type="submit" onClick={this.searchUser} value="Search" className="btn btn-primary " />

                                                          </div>

                                                        </div>


                                                        <div className="no-overflow"><table className="table table-bordered">
                                                          <thead>
                                                            <tr>
                                                              <th></th>
                                                              <th>First name / Surname</th>
                                                              <th>Email address</th>
                                                              <th>City/town</th>
                                                            </tr>
                                                          </thead>
                                                          <tbody>
                                                            {this.state.allUser.map((user, index) => {
                                                              return (
                                                                <tr>
                                                                  <td> <input type="checkbox" onChange={(e) => this.selectUserFromList(e,user)} /> </td>
                                                                  <td>{user.name}</td>
                                                                  <td>{user.email}</td>
                                                                  <td>{user.address.city}</td>
                                                                </tr>
                                                              )
                                                            })}

                                                          </tbody>
                                                        </table>
                                                          <center><button onClick={this.assignQuestion} className="btn btn-primary">OK</button></center>
                                                        </div>
                                                      </div>
                                                      <div className="clearfix"></div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>

                                              <div className="modal fade bs-example-modal-md priority-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-md">
                                                  <div className="modal-content">

                                                    <div className="modal-header">
                                                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                      </button>
                                                      <h4 className="modal-title" id="myModalLabel2">NOTE</h4>
                                                    </div>
                                                    <div className="modal-body">

                                                      <div action="#" className="form-horizontal form-label-left">
                                                        <div className="row">
                                                          <label className="control-label col-md-3 " htmlFor="first-name"> Type
                        </label>
                                                          <div className="col-md-9">
                                                            <select id="assign" name="type" value={this.state.notes.type} onChange={(e) => this.handleNotes(e, ques.id)} className="form-control" required="">
                                                              <option value="">Choose..</option>
                                                              <option value="Need Info">Need Info</option>
                                                              <option value="Info"> Info</option>
                                                              <option value="Need Clarification">Need Clarification</option>
                                                              <option value="Clarification">Clarification</option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <br />
                                                        <div className="row">
                                                          <label className="control-label col-md-3 " htmlFor="first-name"> Note </label>
                                                          <div className="col-md-9">
                                                            <textarea id="description" required="required" className="form-control" value={this.state.notes.notes} name="notes" onChange={(e) => this.handleNotes(e, ques.id)} cols="30" rows="4" data-parsley-trigger="keyup" data-parsley-minlength="20" data-parsley-maxlength="500" data-parsley-minlength-message="Come on! You need to enter at least a 20 caracters long comment.." data-parsley-validation-threshold="10"></textarea>
                                                          </div>
                                                        </div>

                                                        <div className="ln_solid"></div>
                                                        <div className="form-group">
                                                          <div className="col-md-12 col-sm-6 col-xs-12">
                                                            <center><input type="submit" name="" onClick={this.saveNotes} data-dismiss="modal" className="btn btn-round btn-primary" value="Submit" /> </center>

                                                          </div>

                                                        </div>

                                                      </div>
                                                      <div className="clearfix"></div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>

                                            </div>

                                          </div>
                                        </div>
                                      </div>
                                      {this.state.allNotes.map((nt, index) => {
                                        return (
                                          <div className="responses">
                                            <div className="row">
                                              <div className="col-md-2">
                                                <label htmlFor="">From:</label>
                                                <span>{nt.owner_id}</span>
                                              </div>

                                              <div className="col-md-2">
                                                <label htmlFor="">Type:</label>
                                                <span>{nt.type}</span>
                                              </div>

                                              <div className="col-md-2">
                                                <label htmlFor="">Date:</label>
                                                <span>{nt.created_date}</span>
                                              </div>
                                            </div>

                                            <div className="row">
                                              <div className="col-md-12">
                                                <p>{nt.notes}</p>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })}
                                    </div>

                                  </div>
                                </div>

                              ]
                            }
                          }, this)}
                          <div className="clearfix"></div>

                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              <Footer />
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DPIAAnswerSheet);
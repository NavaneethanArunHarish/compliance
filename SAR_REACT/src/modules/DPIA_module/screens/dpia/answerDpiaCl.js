import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import $ from 'jquery';

import { Pagination, Icon, Table } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import assessmentAction from '../../actions/dpiaAction/assessmentAction'
import questionAction from '../../actions/dpiaAction/questionAction'

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

class DPIACLListQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            selectedValue: '',
            selectSection: '',
            isLoggedIn: false,
            openPopUpLogin: false,
            previousUrl: '',
            quesNo: 0,
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
            question: ''
        }
        this.saveAnswer = this.saveAnswer.bind(this);
        this.afterSavingAnswer = this.afterSavingAnswer.bind(this);
        this.changeQuestion = this.changeQuestion.bind(this);
        this.changeQuestionPrev = this.changeQuestionPrev.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);
        this.getAllSection = this.getAllSection.bind(this);
        this.getCurrentSession = this.getCurrentSession.bind(this);
        this.getAllQuestion = this.getAllQuestion.bind(this);
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

    componentWillMount() {
        console.log("------>> ", this)
        var userId = localStorage.getItem("userId");
        if (userId == null) {
            console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ', prevUrl);
            this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
        } else {
            this.setState({ isLoggedIn: true });
            this.props.assessmentAction.getSectionByAssId(this.props.location.state.id, this.getAllSection);
        }
    }

    saveAnswer(e, ques) {
        console.log("----answers we have selected ----> > ", this.state.answerToUpload, ques);
        var data = {
            question_id: ques.id,
            section_id: ques.section_id,
            comments: this.state.answerToUpload.comments,
            answer_sel: this.state.answerToUpload.answer_sel
        }
        this.props.questionAction.saveAnswer(data, this.afterSavingAnswer);
        var riskData = {
            risk_weightage_status: this.state.risk_weightage,
            question_type: ques.question_type,
            question_label: ques.question_label,
            section_id: ques.section_id,
            action_status: ques.action_status,
            comments: ques.comments
        }
        this.props.questionAction.updateQuestion(riskData, this.state.question, this.afterUpdatingRisk);
    }

    afterUpdatingRisk(data) {
        console.log("-------------------->>>>>>", data.data);
        // this.setState({
        //   risk_weightage: ''
        // })
    }

    afterSavingAnswer(data) {
        console.log("-------------------->>>>>>", data.data);
        this.setState({
            answerToUpload: {
                question_id: '',
                section_id: '',
                comments: '',
                answer_sel: '',
                risk_weightage: ''
            }
        })
    }

    handleRiskChange = (e, obj) => {
        console.log("---------<> < > <><> <> < > < > <>>< <>  <> ", obj)
        if (e.target.value !== '--Select--') {
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

    editQuestions(e, obj) {
        browserHistory.push({
            pathname: '/dpia/checkAnswer',
            state: {
                id: this.props.location.state.id,
                sec: obj.section_id,
                ques: obj.id
            }
        })
        // browserHistory.push('/dpia/checkAnswer/' + this.props.location.state.id + '/' + obj.section_id + '/' + obj.id)
    }

    changeQuestion() {
        // console.log("---------> ", id);
        var id = this.state.quesNo + 1;
        if (id <= (this.state.allQuestion.length - 1)) {
            this.setState({
                quesNo: id
            })
        }
    }

    changeQuestionPrev() {
        var id = this.state.quesNo - 1;
        if (id >= 0) {
            this.setState({
                quesNo: id
            })
        }
    }

    getAllSection(data) {
        this.setState({
            allSection: data.data
        })
        this.getCurrentSession("aa", data.data[0].id);
    }

    getCurrentSession(e, id) {
        console.log("------I got hitted --------> ", id)
        this.setState({
            quesNo: 0
        });
        this.props.questionAction.getQuesBySecId(id, this.getAllQuestion);
    }

    getAllQuestion(data) {
        this.setState({
            allQuestion: data.data
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
                                                <div class="x_title"><h2>Sections: </h2><div class="clearfix"></div></div>
                                                <div className="x_content">
                                                    <div className="col-xs-2">
                                                        <ul class="nav nav-tabs tabs-left">
                                                            {this.state.allSection.map((obj, index) => {
                                                                return (
                                                                    <li class="">
                                                                        <a onClick={(e) => this.getCurrentSession(e, obj.id)} data-toggle="tab">{obj.name}
                                                                            {obj.status == 'full' && <span class="status-green"></span>}
                                                                            {obj.status == 'partial' && <span class="status-yellow"></span>}
                                                                            {obj.status == 'none' && <span class="status-red"></span>}</a>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>


                                                    <div className="col-xs-10">
                                                        {/* <!-- Tab panes --> */}
                                                        <div className="tab-content">
                                                            <div className="tab-pane active" id="list-of-questions">
                                                                <div method="post" action="mailto:raizen@mail.utexas.edu?subject=Vocabulary Quiz 1" encType="text/plain">
                                                                    <div className="form-group ">
                                                                        <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" style={{ width: "100%" }}>
                                                                            <thead>
                                                                                <tr role="row">
                                                                                    <th>S.No.</th>
                                                                                    <th>Question</th>
                                                                                    <th>Assignee</th>
                                                                                    <th>Status</th>
                                                                                    <th>Actions</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {this.state.allQuestion.map((ques, index) => {
                                                                                    if(ques.action_status !== 'open')
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td>{index + 1}</td>
                                                                                            <td>{ques.question_label}</td>
                                                                                            <td></td>
                                                                                            <td>{ques.action_status}</td>
                                                                                            <td className="text-center"> <a className="btn btn-default sar-action" onClick={(e) => this.editQuestions(e, ques)} data-toggle="tooltip" data-placement="bottom" title="Open Question" data-original-title="Edit"><em className="fa fa-pencil"></em></a> </td>
                                                                                        </tr>

                                                                                    )
                                                                                }, this)}
                                                                            </tbody>
                                                                        </table>

                                                                    </div>
                                                                </div>
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
        questionAction: bindActionCreators(questionAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DPIACLListQuestion);
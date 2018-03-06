import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import { Pagination, Icon } from 'semantic-ui-react';
import { PulseLoader } from 'react-spinners';
import SearchInput, { createFilter } from 'react-search-input';
import questionAction from '../../actions/dpiaAction/questionAction'

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBar: 'nav-md',
      createdStatus: '',
      loading: false,
      AssQuesErr: '',
       isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:'',
      question: {
        "question_label": ''
      }
    }
    this.handleNavBar = this.handleNavBar.bind(this);
    this.saveQuestion = this.saveQuestion.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.afterData = this.afterData.bind(this);
   this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
    }

  componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
        console.log('need to login');
            var prevUrl = this.props.location.pathname;
            console.log('prev url ',prevUrl);
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
      }
    }

  handleNavBar(value) {
    this.setState({ navBar: value })
  }
  handleQuestion(e) {
    var data = this.state.question;
    data.question_label = e.target.value;
    console.log("queestion label>>>>", e.target.value)
    this.setState({
      question: data
    })

  }

  saveQuestion() {
    if (this.state.question.question_label !== '') {
      this.setState({ AssQuesErr: '' });
      var obj = {
        "question_type": "single",
        "question_label": this.state.question.question_label,
        "section_id": null,
        "action_status": 'open',
        "owner_id": Number(localStorage.getItem("userId")),
        "comments": "nothing",
        "risk_weightage_status": ''
      }
      this.setState({ loading: true })
      this.props.questionAction.CreateQuestion(obj, this.afterData);
    } else {
      this.setState({ AssQuesErr: 'Please enter the Question' });
    }
  }
  afterData(value) {
    this.setState({ loading: false })
    if (value.status === 200) {
      this.setState({
        question: {
          "question_label": ''
        },
        createdStatus: 'success'
      });
      setTimeout(function () { browserHistory.push('/dpia/question'); }, 2000);
    }
    if (value.status === undefined) {
      this.setState({
        createdStatus: 'error'
      });
    }
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
                <div className="page-title">
                  <div className="title_left">
                    <h3>Questions</h3>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                      <div className="x_title">
                        <h2>Add new question</h2>

                        <div className="clearfix"></div>
                      </div>


                      <div className="x_content">
                        <div className="row">
                          <div className="col-md-6 col-md-offset-3">
                            {this.state.createdStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                              </button>
                              <span>Question added successfully</span>
                            </div>}
                            {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                              <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                              </button>
                              <span>Error in Question creation</span>
                            </div>}
                          </div>
                        </div>
                        <div className="form-horizontal form-label-left" >
                          <div className="form-group">
                            <label className="control-label col-md-2 col-sm-3 col-xs-12" htmlFor="name">Question <span className="required">*</span>
                            </label>
                            <div className="col-md-10 col-sm-6 col-xs-12">
                              <textarea name="question" id="" cols="30" rows="5" className="form-control" required="required" value={this.state.question.question_label} onChange={(e) => this.handleQuestion(e)} data-parsley-trigger="keyup"></textarea>
                              <span style={{ color: 'red' }}>{this.state.AssQuesErr}</span>
                            </div>
                          </div>

                          <div className="clearfix"></div>
                          <div className="ln_solid"></div>
                          <div className="form-group">
                            <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-2">
                              <center><button className="btn btn-primary btn-round" onClick={this.saveQuestion}>Save</button></center>
                              <br /> <br />
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
                        </div>
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
    questionAction: bindActionCreators(questionAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
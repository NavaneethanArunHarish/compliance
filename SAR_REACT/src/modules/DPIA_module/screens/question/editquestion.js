import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import { Pagination, Icon } from 'semantic-ui-react';
import { PulseLoader } from 'react-spinners';
import SearchInput, { createFilter } from 'react-search-input';

import questionAction from '../../actions/dpiaAction/questionAction';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';

class EditQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBar: 'nav-md',
      selectedOption: 'single',
      singleCheck: true,
      multipleCheck: false,
      freeCheck: false,
      questionData: {},
      updatedStatus: '',
      loading: false,
      isLoggedIn: false,
      openPopUpLogin: false,
      previousUrl: ''
    }
    this.handleNavBar = this.handleNavBar.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.handleQuestion = this.handleQuestion.bind(this);
    this.aftergetQuestionById = this.aftergetQuestionById.bind(this);
    this.afterQuesUpdate = this.afterQuesUpdate.bind(this);
    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
    window.location.reload();
  }


  componentWillMount() {
    var userId = localStorage.getItem("userId");
    if (userId == null) {
      console.log('need to login');
      var prevUrl = this.props.location.pathname;
      console.log('prev url ', prevUrl);
      this.setState({ isLoggedIn: false, openPopUpLogin: true, previousUrl: prevUrl });
    } else {
      this.setState({ isLoggedIn: true });
      this.props.questionAction.getQuestionById(this.props.location.state.id, this.aftergetQuestionById);
    }
  }
  aftergetQuestionById(value) {
    this.setState({ questionData: value.data })

  }
  handleQuestion(e) {
    var data = this.state.questionData;
    data.question_label = e.target.value;
    this.setState({
      questionData: data
    })

  }

  updateQuestion() {

    this.setState({ loading: true })
    this.props.questionAction.updateQuestion(this.state.questionData, this.props.location.state.id, this.afterQuesUpdate);
  }
  afterQuesUpdate(value) {
    this.setState({ loading: false })
    if (value.status === 200) {
      this.setState({

        updatedStatus: 'success'
      });
    }
    if (value.status === undefined) {
      this.setState({
        updatedStatus: 'error'
      });
    }

  }
  handleNavBar(value) {
    this.setState({ navBar: value })
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
                          <h2>Edit question</h2>

                          <div className="clearfix"></div>
                        </div>


                        <div className="x_content">
                          <div className="row">
                            <div className="col-md-6 col-md-offset-3">
                              {this.state.updatedStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                </button>
                                <span>Question updated successfully</span>
                              </div>}
                              {this.state.updatedStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                </button>
                                <span>Error in Question updated</span>
                              </div>}
                            </div>
                          </div>
                          <div className="form-horizontal form-label-left" >
                            <div className="form-group">
                              <label className="control-label col-md-2 col-sm-3 col-xs-12" htmlFor="name">Question <span className="required">*</span>
                              </label>
                              <div className="col-md-10 col-sm-6 col-xs-12">
                                <textarea name="question" id="" cols="30" rows="5" className="form-control" value={this.state.questionData.question_label} onChange={this.handleQuestion} />
                              </div>
                            </div>

                            <div className="clearfix"></div>
                            <div className="ln_solid"></div>
                            <div className="form-group">
                              <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-2">
                                <center><button type="submit" className="btn btn-primary btn-round" onClick={this.updateQuestion}>Save</button></center>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditQuestion);
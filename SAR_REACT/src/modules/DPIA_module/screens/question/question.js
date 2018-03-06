import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import { PulseLoader } from 'react-spinners';
import questionAction from '../../actions/dpiaAction/questionAction';
import $ from 'jquery';
import _ from 'lodash';
import DataTable from 'datatables.net';
import projectAction from '../../actions/dpiaAction/projectAction';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';
import 'datatables.net-bs/js/dataTables.bootstrap';

import 'datatables.net-bs/css/dataTables.bootstrap.css';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navBar: 'nav-md',
      questionsData: [],
      loading: false,
      isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:''
    }
    this.handleNavBar = this.handleNavBar.bind(this);
    this.goToAddQuestion = this.goToAddQuestion.bind(this);
    this.getData = this.getData.bind(this);
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
       this.setState({ loading: true })
    this.props.questionAction.getQuestion(this.getData)
    $(document).ready(function () {
      $('#datatable1').DataTable();
    });
      }
    }
  
  getData(value) {
    this.setState({ loading: false })
    console.log("value", value.data)
    this.setState({ questionsData: value.data })
    if (this.state.questionsData.length > 0) {
      $(document).ready(function () {
        $('#datatable').DataTable();
      });
    }

  }
  handleSort = clickedColumn => () => {
    const { column, questionsData, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        questionsData: _.sortBy(questionsData, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      questionsData: questionsData.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }
  handleNavBar(value) {
    this.setState({ navBar: value })
  }
  goToAddQuestion() {
    browserHistory.push('/dpia/addQuestion');
  }
  // goToEditQuestion(){
  //   browserHistory.push('/dpia/editQuestion/1');
  // }

  editQues = (e, obj) => {
    browserHistory.push({
      pathname: '/dpia/editQuestion',
      state: {
        id: obj.id
      }
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
                <div className="page-title">
                  <div className="title_left">
                    <h3>Question Bank</h3>
                  </div>
                </div>

                <div className="clearfix"></div>

                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="x_panel">
                      <div className="x_title">
                        <h2>Browse List of Question</h2>

                        <a onClick={this.goToAddQuestion} className="btn btn-primary pull-right">Add Question</a>

                        <div className="clearfix"></div>
                      </div>
                      <div className="x_content">
                        <table id="datatable" className="table table-striped table-bordered" width="100%" cellSpacing="0">
                          <thead>
                            <tr>
                              <th>Question </th>
                              <th style={{ width: "70px" }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.questionsData.map((obj, index) => {
                              if(obj.section_id === null)
                              return (
                                <tr>
                                  <td>{obj.question_label}</td>
                                  <td className="text-center">
                                    <a className="btn btn-default sar-action" onClick={(e) => this.editQues(e,obj)} data-toggle="tooltip" data-placement="bottom" title="Edit Question" data-original-title="Edit"><em className="fa fa-pencil" ></em></a>
                                  </td>
                                </tr>)
                            })}

                          </tbody>
                        </table>


                      </div>
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

            <Footer />
          </div>
        </div>
         :
        <div>
            <PopUpLogin prvUrl={this.state.previousUrl} redirectAferSuccess={this.reloadPage} />
                </div>
       }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  console.log("state", state);
  return {
    // getSarSuccess: state.sar.sarSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    questionAction: bindActionCreators(questionAction, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question);
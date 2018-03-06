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
import _ from 'lodash';
import { Table } from 'semantic-ui-react'
import $ from 'jquery';
import DataTable from 'datatables.net';
import projectAction from '../../actions/dpiaAction/projectAction';
import UserAction from '../../../SAR_module/actions';

import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css';
import 'datatables.net-bs/js/dataTables.bootstrap';

import 'datatables.net-bs/css/dataTables.bootstrap.css';

class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            allProjects: [],
            column: null,
            direction: null,
            loading: false,
            allUser: [],
             isLoggedIn:false,
            openPopUpLogin:false,
            previousUrl:''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.checkForUserName = this.checkForUserName.bind(this);
        this.getallUserResponse = this.getallUserResponse.bind(this);
        this.getAllProjectByuser = this.getAllProjectByuser.bind(this);
        this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
  }

    componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
       this.setState({ loading: true })
        this.props.UserAction.getallUser(this.getallUserResponse);
        this.props.projectAction.getProjectByuser(Number(localStorage.getItem("userId")), this.getAllProjectByuser);
        this.props.projectAction.getAllProject(this.getAllProjects);
        $(document).ready(function () {
            $('#datatable1').DataTable();
        });
      }
    }


    getallUserResponse(data){
        this.setState({
            allUser: data.data.data
        })
    }

    checkForUserName(id){
        for(var i=0; i<this.state.allUser.length; i++){
            if(Number(this.state.allUser[i].id) === id){
                return this.state.allUser[i].name
            }
        }
    }

    getAllProjects(data) {
        this.setState({ loading: false })
        if (data.status === 200) {
            this.setState({
                allProjects: data.data
            });
            if (this.state.allProjects.length > 0) {
                $(document).ready(function () {
                    $('#datatable').DataTable();
                });
            }
        }
    }

    getAllProjectByuser(data) {
    }

    handleSort = clickedColumn => () => {
        const { column, allProjects, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                allProjects: _.sortBy(allProjects, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            allProjects: allProjects.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    assignAssmt = (e,obj) => {
        browserHistory.push({
            pathname: '/dpia/assignAssessment',
            state: {
                name: obj.proj_name,
                id: obj.id
            }
        })
    }

    editProj = (e, obj) => {
        browserHistory.push({
            pathname: '/dpia/editProject',
            state: {
                id: obj.id
            }
        })
    }

    render() {
        const { column, allProjects, direction } = this.state
        return (
            <div className={this.state.navBar}>
            {this.state.isLoggedIn ? 
                <div className="container body" style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <div className="main_container">
                        <SideBar />
                        <Header handleNavBar={this.handleNavBar} navBarValue={this.state.navBar} />
                        <div className="right_col" role="main">
                            <div>
                                <div className="page-title">
                                    <div className="title_left">
                                        <h3>Projects</h3>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">
                                            <div className="x_title">
                                                <h2>Browse List of projects</h2>

                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content">
                                                {<table id="datatable" className="table table-striped table-bordered" width="100%" cellSpacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Project ID</th>
                                                            <th>Project Number</th>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>Creation Date</th>
                                                            <th>Owner</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.allProjects.map(function (obj, index) {
                                                            return (
                                                                <tr>
                                                                    <td>{obj.id}</td>
                                                                    <td><a onClick={(e)=>this.editProj(e, obj)} style={{textDecoration: 'underline', fontWeight: '900'}}>{obj.proj_id}</a></td>
                                                                    <td>{obj.proj_name}</td>
                                                                    <td>{obj.proj_desc}</td>
                                                                    <td>{obj.created_date}</td>
                                                                    <td>{this.checkForUserName(obj.created_by)}</td>
                                                                    <td><span class="label label-success">{obj.proj_status}</span></td>
                                                                    <td className="text-center">
                                                                        <a className="btn btn-default sar-action" onClick={(e)=>this.editProj(e, obj)} data-toggle="tooltip" data-placement="bottom" title="Edit Project" data-original-title="View">
                                                                            <em className="fa fa-pencil"></em></a>
                                                                        <a className="btn btn-default sar-action" onClick={(e) => this.assignAssmt(e,obj)} data-toggle="tooltip" data-placement="bottom" title="Add Assessment" data-original-title="Add new assessment">
                                                                            <em className="fa fa-plus"></em></a></td>
                                                                </tr>
                                                            )
                                                        }, this)}
                                                    </tbody>
                                                </table>}
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
    return {
        cereatedProject: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        UserAction: bindActionCreators(UserAction, dispatch),
        projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import Select from 'react-select';
import $ from 'jquery';
import PopUpLogin from '../../../SAR_module/screens/LoginPage/PopUpLogin';
import Header from '../../../../components/Header';
import SideBar from '../../../../components/SideBar';
import Footer from '../../../../components/Footer';

import { Pagination, Icon } from 'semantic-ui-react';
import SearchInput, { createFilter } from 'react-search-input';
import { PulseLoader } from 'react-spinners';

import assessmentAction from '../../actions/dpiaAction/assessmentAction';
import projectAction from '../../actions/dpiaAction/projectAction';

import 'react-select/dist/react-select.css';
import '../../../../assests/css/custom.css'
import '../../../../assests/css/custom.min.css';

class AssignAssessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            project_id: '',
            projectName: '',
            assessment: {
                name: '',
                template: false,
                ass_desc: '',
                template_id: null
            },
            templateData: {
                tname: '',
                tdesc: ''
            },
            createdStatus: '',
            allProjects: [],
            projectOption: [],
            selectedOption: {},
            allTemplate: [],
            selTemplate: '',
            loading: false,
            isLoggedIn:false,
            openPopUpLogin:false,
            previousUrl:'',
            temp_name: ''
        }
        this.handleNavBar = this.handleNavBar.bind(this);
        this.createAssessment = this.createAssessment.bind(this);
        this.afterAssCreated = this.afterAssCreated.bind(this);
        this.getAllProjects = this.getAllProjects.bind(this);
        this.searchTemplate = this.searchTemplate.bind(this);
        this.afterTempSearch = this.afterTempSearch.bind(this);
        this.selectTemplate = this.selectTemplate.bind(this);
        this.handleTemplateInput = this.handleTemplateInput.bind(this);
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
        this.setState({
            project_id: Number(this.props.location.state.id),
            projectName: this.props.location.state.name
        })
        this.props.projectAction.getAllProject(this.getAllProjects);
      }
    }

    getAllProjects(data) {
        if (data.status === 200) {
            var totalProject = data.data;
            var projectOption = [];
            var selProj = {}
            for (var i = 0; i < totalProject.length; i++) {
                projectOption.push({
                    "value": totalProject[i].id,
                    "label": totalProject[i].proj_name
                })
                if (totalProject[i].id === Number(this.props.location.state.id)) {
                    selProj = {
                        "value": totalProject[i].id,
                        "label": totalProject[i].proj_name
                    }
                }
            }
            this.setState({
                projectOption: projectOption,
                allProjects: totalProject,
                selectedOption: selProj
            });
        }
    }

    handleAssSelChange(e, index) {
        this.setState({
            selTemplate: index
        })
        console.log("------sel change ", index)
    }

    selectTemplate(){
        if(this.state.selTemplate !== '') {
            this.setState({
                assessment: {
                    name: this.state.allTemplate[this.state.selTemplate].name,
                    template: false,
                    template_id: this.state.allTemplate[this.state.selTemplate].id,
                    ass_desc: this.state.allTemplate[this.state.selTemplate].ass_desc,
                    temp_name: this.state.allTemplate[this.state.selTemplate].name
                }
            })
        }
        $('.modal').hide();
        $('.fade.in').hide();
    }

    handleTemplateInput(e) {
        var data = this.state.templateData;

        if (e.target.name === 'temp_name') {
            data.tname = e.target.value
        }

        if (e.target.name === 'temp_desc') {
            data.tdesc = e.target.value
        }

        this.setState({
            templateData: data
        })
    }

    searchTemplate() {
        this.props.assessmentAction.searchTemplate(this.state.templateData.tname, this.state.templateData.tdesc, this.afterTempSearch)
    }

    afterTempSearch(data) {
        if(data.status === 200) {
            this.setState({
                allTemplate: data.data
            })
        }
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    handleChange(e) {
        var data = this.state.assessment;

        if (e.target.name === "name") {
            data.name = e.target.value;
            this.setState({
                assessment: data
            })
        }
        if (e.target.name === "ass_desc") {
            data.ass_desc = e.target.value;
            this.setState({
                assessment: data
            })
        }
    }

    createAssessment() {
        var data = {
            "name": this.state.assessment.name,
            "template": false,
            "ass_status": 'new',
            "template_id": this.state.assessment.template_id,
            "project_id": this.state.selectedOption.value,
            "ass_desc": this.state.assessment.ass_desc
        }
        this.setState({ loading: true })
        this.props.assessmentAction.createAssessment(data, this.afterAssCreated);
    }

    handleProjectChange = (selectedOption) => {
        this.setState({ selectedOption });
    }

    afterAssCreated(data) {
        this.setState({ loading: false })
        if (data.status === 200) {
            this.setState({
                assessment: {
                    "name": "",
                    "ass_desc": ""
                },
                createdStatus: 'success'
            });
            setTimeout(function () { browserHistory.push('/dpia/Projects'); }, 3000);
        }
        if (data.status === undefined) {
            this.setState({
                createdStatus: 'error'
            });
        }
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
                                        <h3>Add Assessment</h3>
                                    </div>
                                </div>

                                <div className="clearfix"></div>

                                <div className="row">
                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                        <div className="x_panel">
                                            <div className="x_title">
                                                <h2>Add Assessment</h2>

                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="x_content">
                                                <br />

                                                <div className="row">
                                                    <div className="col-md-6 col-md-offset-3">
                                                        {this.state.createdStatus === 'success' && <div className="alert alert-success alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Assessment added successfully</span>
                                                        </div>}
                                                        {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Error in Assessment creation</span>
                                                        </div>}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 col-md-offset-3">

                                                    </div>
                                                </div>

                                                <div id="demo-form2" data-parsley-validate="" className="form-horizontal form-label-left" >

                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Project Name <span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-4 col-sm-6 col-xs-12">
                                                            <Select
                                                                value={value}
                                                                onChange={this.handleProjectChange}
                                                                options={this.state.projectOption}
                                                                searchable={false}
                                                                disabled={true} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Template</label>
                                                        <div className="col-md-4 col-sm-4 col-xs-12">
                                                            <input type="text" id="template_id" value={this.state.assessment.temp_name} required="required" className="form-control col-md-7 col-xs-12" disabled />
                                                        </div>
                                                        <div className="col-md-2 col-sm-2 col-xs-12">
                                                            <a href="#" className="btn btn-round btn-primary pull-right" data-toggle="modal" data-target=".bs-example-modal-sm">Search</a>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Name <span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                                            <input type="text" id="name" name="name" value={this.state.assessment.name} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="name">Description<span className="required">*</span>
                                                        </label>
                                                        <div className="col-md-6 col-sm-6 col-xs-12">
                                                            <textarea type="text" id="description" name="ass_desc" value={this.state.assessment.ass_desc} onChange={(e) => this.handleChange(e)} required="required" className="form-control col-md-7 col-xs-12" />
                                                        </div>
                                                    </div>

                                                    <div className="modal fade bs-example-modal-sm" tabIndex="-1" role="dialog" aria-hidden="true">
                                                        <div className="modal-dialog modal-lg">
                                                            <div className="modal-content">

                                                                <div className="modal-header">
                                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                                    </button>
                                                                    <h4 className="modal-title" id="myModalLabel2">Search Assessment Template</h4>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <div className="form-group">
                                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Name
                                                                        </label>
                                                                        <div className="col-md-5 col-sm-4 col-xs-12">
                                                                            <input type="text" id="template_id" name="temp_name" onChange={this.handleTemplateInput} required="required" className="form-control col-md-7 col-xs-12" />
                                                                        </div>

                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label className="control-label col-md-3 col-sm-3 col-xs-12" htmlFor="description">Description
                                                                        </label>
                                                                        <div className="col-md-5 col-sm-4 col-xs-12">
                                                                            <input type="text" id="template_id" name="temp_desc" onChange={this.handleTemplateInput} required="required" className="form-control col-md-7 col-xs-12" />
                                                                        </div>

                                                                    </div>

                                                                    <div className="form-group">

                                                                        <div className="col-md-5 col-md-offset-3 col-sm-4 col-xs-12">
                                                                            <a className="btn btn-round btn-primary" onClick={this.searchTemplate}>Search</a>
                                                                        </div>

                                                                    </div>

                                                                    <div className="col-sm-12">
                                                                        <table id="datatable" className="table table-striped table-bordered dataTable no-footer" width="100%" cellSpacing="0" role="grid" >
                                                                            <thead>
                                                                                <tr role="row">
                                                                                    <th></th>
                                                                                    <th className="sorting_asc" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: '190px' }}>Name</th>
                                                                                    <th className="sorting" tabIndex="0" aria-controls="datatable" rowSpan="1" colSpan="1" aria-label="Description: activate to sort column ascending" style={{ width: '675px' }}>Description</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>

                                                                                {this.state.allTemplate.map((data, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td><input type="radio" name="someName" checked={index === this.state.selTemplate} onChange={(e) => this.handleAssSelChange(e, index)}  /></td>
                                                                                            <td>{data.name}</td>
                                                                                            <td>{data.ass_desc}</td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </tbody>
                                                                        </table></div>
                                                                    <button type="button" onClick={this.selectTemplate} data-dismiss="modal" className="btn btn-round btn-primary">Select</button>
                                                                    <div className="clearfix"></div>
                                                                </div>
                                                                <div className="modal-footer">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form-group">
                                                        <div className="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                                           <center> <button type="submit" onClick={this.createAssessment} className="btn btn-primary btn-round">Create</button></center><br/>
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
                                                    <div className="ln_solid"></div>
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
            </div>
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
        projectAction: bindActionCreators(projectAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignAssessment);
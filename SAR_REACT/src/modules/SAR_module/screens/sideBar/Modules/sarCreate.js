import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import Action from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PopUpLogin from '../../LoginPage/PopUpLogin';
import { formatPattern } from 'react-router/lib/PatternUtils';
import { BaseUrl } from '../../../../../serviceUrl/serviceUrl';
import { PulseLoader } from 'react-spinners';
import $ from "jquery";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { browserHistory } from 'react-router';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../../../assests/css/custom.css'
import '../../../../../assests/css/custom.min.css'

var userID;
class SubjectAccessRequestCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            representative: {
                name: '',
                isLoggedIn:false,
      openPopUpLogin:false,
      previousUrl:'',
                email: '',
                password: '123',
                user_type: '',
                created_by: '',
                modified_by: '',
                phone: '',
                address: {
                    addressline1: '',
                    addressline2: '',
                    pincode: 0,
                    city: '',
                    created_by: '',
                    modified_by: 'adfa',
                    state: '',
                    country: ''
                },
            },
            otherInfo: '',
            info_requested: '',
            file: null,
            createdStatus: '',
            fileErr:''

        }
        this.handlePdDateChange = this.handlePdDateChange.bind(this);
        this.handleRepdataSubChange = this.handleRepdataSubChange.bind(this);
        this.handleRepAddressChange = this.handleRepAddressChange.bind(this);
        this.handleRepContactChange = this.handleRepContactChange.bind(this);
        this.handleRepEmailChange = this.handleRepEmailChange.bind(this);
        this.handleRepNameChange = this.handleRepNameChange.bind(this);
        this.handleConfirmRepNameChange = this.handleConfirmRepNameChange.bind(this);
        this.handleConfirmSignChange = this.handleConfirmSignChange.bind(this);
        this.handleConfirmRepSignChange = this.handleConfirmRepSignChange.bind(this);
        this.handleCompletedNameChange = this.handleCompletedNameChange.bind(this);
        this.handleCompletedAddressChange = this.handleCompletedAddressChange.bind(this);
        this.handleCompletedCityChange = this.handleCompletedCityChange.bind(this);
        this.handleCompletedCompanyChange = this.handleCompletedCompanyChange.bind(this);
        this.handleCompletedPostcodeChange = this.handleCompletedPostcodeChange.bind(this);
        this.onChange = this.onChange.bind(this)
        this.submit = this.submit.bind(this);
        this.handlespecInfoChange = this.handlespecInfoChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.validateExtension = this.validateExtension.bind(this);
        this.imageUploadSuccess = this.imageUploadSuccess.bind(this);
     this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
        window.location.reload();
    }
    handlePdDateChange(e) {
        this.setState({ startDate: e })
    }
    imageUploadSuccess(value) {
        browserHistory.push('/sar/Exuser/SAR-dashboard')
    }
    handleRepdataSubChange(e) {
        //
    }
    handleRepAddressChange(e) {
        var myData = { ...this.state.representative };
        myData.address.addressline1 = e.target.value;
        this.setState({ representative: myData })

    }
    handleRepContactChange(e) {
        var myData = { ...this.state.representative };
        myData.phone = e.target.value;
        this.setState({ representative: myData, repPhoneErr: '' })
    }
    handleRepEmailChange(e) {
        var myData = { ...this.state.representative };
        myData.email = e.target.value;
        this.setState({ representative: myData, repEmailErr: '' })

    }
    handleRepNameChange(e) {
        var myData = { ...this.state.representative };
        myData.name = e.target.value;
        this.setState({ representative: myData, repNameErr: '' })
    }
    handleConfirmRepNameChange(e) {
    }

    validateEmail(email) {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(email);
    };

    validateName(name) {
        var re = /^[A-Za-z\s0-9\.\-]+$/;
        return re.test(name);
    };

    validatePhone(phone) {
        var re = /^\d{10}$/;
        return re.test(phone);
    };

    validateExtension() {
        var allowedFiles = ['.txt', '.pdf', '.png', '.jpg', '.jpeg', '.gif','.zip'];
        var fileUpload = document.getElementById("fileUpload");
        var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + allowedFiles.join('|') + ")$");
        if (!regex.test(fileUpload.value.toLowerCase())) {
            return false;
        }
        return true;
    }

    onChange(e) {
        var size = e.target.files[0].size;
        if(size > 5000000){
          document.getElementById("fileUpload").value = "";  
          this.setState({ createdStatus: 'error', fileErr:'Error'})
        }else{
        this.setState({ file: e.target.files[0], createdStatus:'', fileErr:'' })
        }
        

    }

    handleConfirmSignChange(e) {
        //
    }
    handleConfirmRepSignChange(e) {
        //

    }
    handleCompletedNameChange(e) {
        //
    }
    handleCompletedAddressChange(e) {
        //
    }
    handleCompletedCityChange(e) {
        //
    }
    handleCompletedCompanyChange(e) {
        //
    }
    handleCompletedPostcodeChange(e) {
        //
    }
    handlespecInfoChange(e) {
        this.setState({ info_requested: e.target.value, infoErr: '' });
    }

    submit(e) {
        e.preventDefault();

        if (this.state.info_requested === '') {
            this.setState({ infoErr: ' Enter the SAR Details. ' });
        } else {
            this.setState({ infoErr: '' });
        }

        if (this.state.representative.email !== '') {
            if (!this.validateEmail(this.state.representative.email)) {
                this.setState({ repEmailErr: " Enter the valid Representative Email." });
            } else {
                this.setState({ repEmailErr: '' });
            }

        }

        if (this.state.representative.name !== '') {
            if (!this.validateName(this.state.representative.name)) {
                this.setState({ repNameErr: " Enter the valid Representative name. " });
            } else {
                this.setState({ repNameErr: '' });
            }
        }

        if (this.state.representative.phone !== '') {
            if (!this.validatePhone(this.state.representative.phone)) {
                this.setState({ repPhoneErr: " Enter the valid Representative Contact Number. " });
            } else {
                this.setState({ repPhoneErr: '' });
            }
        }

        if (this.state.file != null) {
            if (!this.validateExtension()) {
                this.setState({ fileErr: " Uploaded File Extention .txt, .pdf, .png, .jpg, .jpeg, .gif" });
            } else {
                this.setState({ fileErr: '' });
            }
        }

        var data = {
            representative: {
                "name": this.state.representative.name,
                "email": this.state.representative.email,
                "password": this.state.representative.password,
                "user_type": this.state.representative.user_type,
                "created_by": this.state.representative.created_by,
                "modified_by": this.state.representative.modified_by,
                "phone": this.state.representative.phone,
                "address": {
                    "addressline1": this.state.representative.address.addressline1,
                    "addressline2": this.state.representative.address.addressline2,
                    "pincode": this.state.representative.address.pincode,
                    "city": this.state.representative.address.city,
                    "created_by": this.state.representative.address.created_by,
                    "modified_by": this.state.representative.address.modified_by,
                    "state": this.state.representative.address.state,
                    "country": this.state.representative.address.country
                }
            },
            otherInfo: this.state.otherInfo,
            info_requested: this.state.info_requested
        }

        if ((this.state.representative.name === '') && (this.state.representative.phone === '') && (this.state.representative.email === '')) {
            this.setState({ repEmailErr: " Enter the Email.", repPhoneErr: 'Enter The Phone',repNameErr: 'Enter The Name' });
            
            this.setState({ createdStatus: 'error'})
            window.scrollTo(0, 600);
        } else if ((this.state.representative.name !== '') && (this.state.representative.phone === '') && (this.state.representative.email === '')) {
            this.setState({ repEmailErr: " Enter the Email.", repPhoneErr: 'Enter The Phone' });
            
            this.setState({ createdStatus: 'error'})
            window.scrollTo(0, 600);
        } else if ((this.state.representative.email !== '') && (this.state.representative.phone === '') && (this.state.representative.name === '')) {
            this.setState({ repNameErr: 'Enter The Name', repPhoneErr: 'Enter The Phone' });
            
            this.setState({ createdStatus: 'error'})
            window.scrollTo(0, 600);
        } else if ((this.state.representative.phone !== '') && (this.state.representative.name === '') && (this.state.representative.email === '')) {
            this.setState({ repPhoneErr: 'Enter The Phone', repNameErr: 'Enter The Name' });
            this.setState({ createdStatus: 'error'})
            
            window.scrollTo(0, 600);
        } else if ((this.state.representative.name !== '') && (this.state.representative.phone !== '') && (this.state.representative.email === '')) {
            this.setState({ repEmailErr: " Enter the Email." });
            this.setState({ createdStatus: 'error'})
            
            window.scrollTo(0, 600);
        } else if ((this.state.representative.email !== '') && (this.state.representative.phone !== '') && (this.state.representative.name === '')) {
            this.setState({ repNameErr: 'Enter The Name' });
            this.setState({ createdStatus: 'error'})
            
            window.scrollTo(0, 600);
        } else if ((this.state.representative.email !== '') && (this.state.representative.name !== '') && (this.state.representative.phone === '')) {
            this.setState({ repPhoneErr: 'Enter The Phone' });
            this.setState({ createdStatus: 'error'})
            
            window.scrollTo(0, 600);
        } else {
            if ((this.validateEmail(this.state.representative.email) &&
                    this.validateName(this.state.representative.name) &&
                    this.validatePhone(this.state.representative.phone) && (this.state.fileErr !== 'Error'))) {
                this.setState({ loading: true })
                this.props.Action.createNewSar(data, userID);
            } else {
                this.setState({ createdStatus: 'error'})
                window.scrollTo(0, 100);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.createNewSAR != undefined){
            if(nextProps.createNewSAR.data.sar_id){
                this.props.Action.ImageUpload(this.state.file,nextProps.createNewSAR.data.sar_id,this.state.representative.name,this.imageUploadSuccess)
            }
        }
    }

   
    componentWillMount() {
      var userId = localStorage.getItem("userId");
      if(userId == null) {
            var prevUrl = this.props.location.pathname;
            this.setState({isLoggedIn:false,openPopUpLogin:true,previousUrl:prevUrl});
      }else{
       this.setState({isLoggedIn:true });
        userID = localStorage.getItem("userId")
      }
    }

    render() {
        return (
            <div>
            {this.state.isLoggedIn ? 
                <div class="">
                    <Container>
                        <div class="container" style={{ marginLeft: '0px', marginRight: '0px' }}>
                            <div class="main_container">
                                <div class="right_col" role="main">
                                    <div class="">
                                        <br /><br />
                                        <div class="clearfix"></div>
                                        <div class="row">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div class="x_panel">
                                                    <div class="x_title">
                                                        <h2>Subject Access Request Form</h2>
                                                        <div class="clearfix"></div>
                                                    </div>
                                                    <div class="x_content">

                                                    {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Error in SAR creation</span>
                                                        </div>}
                                                        <div class="sar-create">
                                                            <form action="#">
                                                                <p>Under the General Data Protection Regulation, you are entitled as a data subject to obtain from [Your Company Name], confirmation as to whether or not we are processing personal data concerning you, as well as to request details about the purposes, categories and disclosures of such data.<br /><br />
                                                                    You can use this form to request information about, and access to any personal data we hold about you. Details on where to return the completed form can be found at the end of this document.
                                                                </p>
                                                                <h4>1. Specific Details of the Information Requested:</h4>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label for="phone">SAR Details *</label>
                                                                            <textarea class="form-control" rows="5" id="comment" placeholder="" onChange={this.handlespecInfoChange}></textarea>
                                                                            <span style={{ color: 'red' }}>{this.state.infoErr}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>2. Representatives <span>(only complete if you are acting as the representative for a data subject)</span><br />
                                                                    <span><b>[Please Note</b>: We may still need to contact the Data Subject where proof of authorisation or identity are required]</span></h4>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="first">Representative's Name </label>
                                                                            <input type="text" class="form-control" placeholder="" id="first" onChange={this.handleRepNameChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.repNameErr}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="last">Relationship to data subject</label>
                                                                            <input type="text" class="form-control" placeholder="" id="last" onChange={this.handleRepdataSubChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company">Contact Number </label>
                                                                            <input type="name" class="form-control" placeholder="" id="company" onChange={this.handleRepContactChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.repPhoneErr}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">

                                                                        <div class="form-group">
                                                                            <label for="phone">Email </label>
                                                                            <input type="tel" class="form-control" id="phone" placeholder="" onChange={this.handleRepEmailChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.repEmailErr}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label for="address">Representitive's Address</label>
                                                                            <textarea class="form-control" rows="5" id="comment" placeholder="" onChange={this.handleRepAddressChange}></textarea>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h5>I confirm that I am the authorised representative of the named data subject:</h5>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="first">Representative's Name </label>
                                                                            <input type="text" class="form-control" placeholder="" id="first" onChange={this.handleConfirmRepNameChange} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="last">Signature (Full Name)</label>
                                                                            <input type="text" class="form-control" placeholder="" id="last" onChange={this.handleConfirmRepSignChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>3. Confirmation:</h4>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="first">Data Subjects Name </label>
                                                                            <input type="text" class="form-control" placeholder="" id="first" onChange={this.handleConfirmDataSubNameChange} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-6">
                                                                        <p class="text-pri"> [Print Name]   </p>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company">Signature</label>
                                                                            <input type="text" class="form-control" placeholder="" id="company" onChange={this.handleConfirmSignChange} />
                                                                        </div>
                                                                    </div>
                                                                    <div class="col-md-3">
                                                                        <div class="form-group">
                                                                            <label for="phone">Date</label>
                                                                            <DatePicker
                                                                                selected={this.state.startDate}
                                                                                minDate={moment()}
                                                                                placeholderText="dd/mm/yyyy"
                                                                                dateFormat="DD/MM/YYYY"
                                                                                onChange={this.handlePdDateChange} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>4. Attachments</h4>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <input type="file" class="form-control-file" id="fileUpload" onChange={this.onChange} />
                                                                            <span>File size max 5mb</span><br />
                                                                            <span style={{ color: 'red' }}>{this.state.fileErr}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>5. Completed Forms</h4>
                                                
                                                                <h5>For postal requests, please return this form to:</h5>
                                                               
                                                                To, <br />
                                                                [Data Protection Officer Name] <br />
                                                                [Company Name] <br />
                                                                [Address] <br />
                                                                [Town City / Post Code]<br />                                                           
                                                                    <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="btm-sar">
                                                                            <center>{/* <button class="btn btn-primary btn-lg">Submit</button> */}
                                                                                <button class="btn btn-primary btn-lg btn-round" onClick={this.submit}>Submit</button>
                                                                                <button class="btn btn-primary btn-lg btn-round">Print</button>
                                                                            </center>
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
                                                            </form>
                                                        </div>
                                                    </div>

                                                    <div class="modal fade bs-example-modal-md closesar-modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                        <div class="modal-dialog modal-md">
                                                            <div class="modal-content">

                                                                <div class="modal-header">
                                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                                                                    </button>
                                                                    <h4 class="modal-title" id="myModalLabel2"></h4>
                                                                </div>
                                                                <div class="modal-body">

                                                                    <form action="#" class="form-horizontal form-label-left">
                                                                        <h2 class="text-center">Do you want to close this SAR ?</h2> <br />
                                                                        <div class="ln_solid"></div>
                                                                        <div class="form-group">
                                                                            <div class="col-md-12 col-sm-6 col-xs-12">
                                                                                <center><button type="button" class="btn btn-round btn-primary" data-dismiss="modal">Cancel</button>
                                                                                </center>
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
                                    <br />
                                </div>
                            </div>
                        </div>
                    </Container>
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


function mapStateToProps(state, ownProps) {
    return {
        getSarSuccess: state.sar.createSar,
        createNewSAR: state.sar.createNewSAR
    };
}
function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestCreateComponent);
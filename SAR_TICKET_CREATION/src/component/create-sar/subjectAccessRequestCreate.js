import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import '../../css/custom.css'
import '../../css/all.css'
import '../../css/custom.min.css';
import Action from '../../action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formatPattern } from 'react-router/lib/PatternUtils';
import axios, { post } from 'axios';
import configureStore from '../../store/configure-store';
import { BaseUrl } from '../../serviceurl';
import { PulseLoader } from 'react-spinners';
//import $ from "jquery";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class SubjectAccessRequestCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                startDate: '',
                date: '',
                name: '',
                email: '',
                password: '123',
                loading: false,
                nameErr: '',
                emailErr: '',
                phoneErr: '',
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
                    modified_by: 'sdfdsf',
                    state:'',
                    country:''
                }

            },
            representative: {
                name: '',
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
                    state:'',
                    country:''
                }

            },
            otherInfo: '',
            info_requested: '',
            file: null,
            createdStatus: '',

        }
        this.handlePdNameChange = this.handlePdNameChange.bind(this);
        this.handlePdEmailChange = this.handlePdEmailChange.bind(this);
        this.handlePdAddressChange = this.handlePdAddressChange.bind(this);
        this.handlePdContactNOChange = this.handlePdContactNOChange.bind(this);
        this.handlePdDateChange = this.handlePdDateChange.bind(this);
        this.handlePdInfoChange = this.handlePdInfoChange.bind(this);
        this.handleRepdataSubChange = this.handleRepdataSubChange.bind(this);
        this.handleRepAddressChange = this.handleRepAddressChange.bind(this);
        this.handleRepContactChange = this.handleRepContactChange.bind(this);
        this.handleRepEmailChange = this.handleRepEmailChange.bind(this);
        this.handleRepNameChange = this.handleRepNameChange.bind(this);
        this.handleConfirmRepNameChange = this.handleConfirmRepNameChange.bind(this);
        this.handleConfirmFileChange = this.handleConfirmFileChange.bind(this);
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



    }
    handlePdNameChange(e) {
        console.log(e.target.value)
        var myData = { ...this.state.user };
        myData.name = e.target.value;
        this.setState({ user: myData, nameErr: '' });
        console.log(this.state)
    }

    handlePdEmailChange(e) {
        var myData = { ...this.state.user };
        myData.email = e.target.value;
        this.setState({ user: myData, emailErr: '' });
    }
    handlePdAddressChange(e) {
        var myData = { ...this.state.user };
        myData.address.addressline1 = e.target.value;
        this.setState({ user: myData });
    }
    handlePdContactNOChange(e) {
        var myData = { ...this.state.user };
        myData.phone = e.target.value;
        this.setState({ user: myData, phoneErr: '' });
    }
    handlePdDateChange(e) {
        this.setState({ startDate: e })

    }
    handlePdInfoChange(e) {
        //
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
        console.log(e.target.value)
        var myData = { ...this.state.representative };
        myData.email = e.target.value;
        this.setState({ representative: myData, repEmailErr: '' })

    }
    handleRepNameChange(e) {
        console.log(e.target.value)
        var myData = { ...this.state.representative };
        myData.name = e.target.value;
        this.setState({ representative: myData, repNameErr: '' })
    }
    handleConfirmRepNameChange(e) {
        this.setState({ date: e })
    }

    handleConfirmFileChange(file, sar_id, user) {
        this.setState({ createdStatus: 'success'})
        console.log("Inside upload file", file);
        const url = BaseUrl.RestUrl + 'sar/upload';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('sar_id', sar_id);
        formData.append('user', user);
        const config = {
            headers: {
                'content-type': 'multiple/form-data'
            }
        }
        return post(url, formData, config);
        //this.setState({ createdStatus: 'success'})
    }

    validateEmail(email) {
        var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return re.test(email);
    };

    validateName(name) {
        //var re = /^[A-Za-z\s]+$/;
        var re = /^[A-Za-z\s0-9\.\-]+$/;
        return re.test(name);
    };

    validatePhone(phone) {
        var re = /^[0-9\.\-\+]+$/;
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
          alert('max size is 5mb !!!');
        }else{
        this.setState({ file: e.target.files[0] })
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
        console.log(e.target.value)
        this.setState({ info_requested: e.target.value, infoErr: '' });
    }

    submit(e) {
        e.preventDefault();

        if (this.state.user.email == '') {
            this.setState({ emailErr: " Enter the Email." });
        } else if (!this.validateEmail(this.state.user.email)) {
            this.setState({ emailErr: " Enter the valid Email." });
        } else {
            this.setState({ emailErr: '' });
        }

        if (this.state.user.name === '') {
            this.setState({ nameErr: ' Enter the Name. ' });
        } else if (!this.validateName(this.state.user.name)) {
            this.setState({ nameErr: " Enter the valid name. " });
        } else {
            this.setState({ nameErr: '' });
        }

        if (this.state.user.phone === '') {
            this.setState({ phoneErr: ' Enter the Contact Number. ' });
        } else if (!this.validatePhone(this.state.user.phone)) {
            this.setState({ phoneErr: " Enter the valid Contact Number. " });
        } else {
            this.setState({ phoneErr: '' });
        }

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
                this.setState({ fileErr: " Uploaded File Extention .txt, .pdf, .png, .jpg, .jpeg, .gif, .zip" });
            } else {
                this.setState({ fileErr: " " });
            }
        }

        var data = {
            user: {
                "name": this.state.user.name,
                "email": this.state.user.email,
                "password": this.state.user.password,
                "user_type": this.state.user.user_type,
                "created_by": this.state.user.created_by,
                "modified_by": this.state.user.modified_by,
                "phone": this.state.user.phone,
                "address": {
                    "addressline1": this.state.user.address.addressline1,
                    "addressline2": this.state.user.address.addressline2,
                    "pincode": this.state.user.address.pincode,
                    "city": this.state.user.address.city,
                    "created_by": this.state.user.address.created_by,
                    "modified_by": this.state.user.address.modified_by,
                    "state": this.state.user.address.state,
                    "country": this.state.user.address.country
                }

            },
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

        console.log("teh create sar data", data)

        // this.props.Action.createSar(data);
        // this.handleConfirmFileChange(this.state.file, value.data.sar_id);
        // this.handleConfirmFileChange(this.state.file, 15).then((response) =>  {
        //     console.log("file upload response-->", response);
        //   });
        //if((this.state.representative.name !== '') || (this.state.representative.phone !== '') || (this.state.representative.email !=='')) {
            if((this.state.representative.name !== '') && (this.state.representative.phone === '') && (this.state.representative.email ==='')) { 
                this.setState({ repEmailErr: " Enter the Email.", repPhoneErr: 'Enter The Phone' }); 
               
                this.setState({ createdStatus: 'error'})
                window.scrollTo(0, 600); 
            }  else if((this.state.representative.email !== '') && (this.state.representative.phone === '') && (this.state.representative.name === '')) {
                this.setState({ repNameErr: 'Enter The Name', repPhoneErr: 'Enter The Phone'  });
                this.setState({ createdStatus: 'error'})
                
                window.scrollTo(0, 600);
            } else if((this.state.representative.phone !== '') && (this.state.representative.name === '') && (this.state.representative.email === '')) {
                this.setState({ repPhoneErr: 'Enter The Phone', repNameErr: 'Enter The Name' });
                this.setState({ createdStatus: 'error'})
                
                window.scrollTo(0, 600);
            } else if((this.state.representative.name !== '') && (this.state.representative.phone !== '') && (this.state.representative.email ==='')) { 
                this.setState({ repEmailErr: " Enter the Email." }); 
                this.setState({ createdStatus: 'error'})
            
                window.scrollTo(0, 600); 
            }  else if((this.state.representative.email !== '') && (this.state.representative.phone !== '') && (this.state.representative.name === '')) {
                this.setState({ repNameErr: 'Enter The Name' });
                this.setState({ createdStatus: 'error'})
                
                window.scrollTo(0, 600);
            } else if((this.state.representative.email !== '') && (this.state.representative.name !== '') && (this.state.representative.phone === '')) {
                this.setState({ repPhoneErr: 'Enter The Phone' });
                this.setState({ createdStatus: 'error'})
                
                window.scrollTo(0, 600);
            } else{
            if ((this.validateEmail(this.state.user.email) &&
            this.validateName(this.state.user.name) &&
            this.validatePhone(this.state.user.phone) &&
            (this.state.info_requested !== '')) ||
            (this.validateEmail(this.state.representative.email) &&
                this.validateName(this.state.representative.name) &&
                this.validatePhone(this.state.representative.phone))) {
            this.setState({ loading: true })
            axios({
                method: 'post',
                url: BaseUrl.RestUrl + "sar/create",
                data: data
            })
                .then(response => {
                    var data = response;
                    console.log("response while create sar -- > ", data);
                    console.log("File -- > ", this.state.file);
                    console.log("sar id -- > ", data.data.data.sar_id);
                    this.setState({ loading: false })
                    
                    this.handleConfirmFileChange(this.state.file, data.data.data.sar_id, this.state.user.name);
                    //this.setState({ createdStatus: 'success'})
                    window.scrollTo(0, 100);
                }).catch(error => {
                    this.setState({ loading: false })
                   
                    console.log("got error while updating sara---> ", JSON.stringify(error.response.data.error.message));
                    var msg = error.response.data.error.message;
                    
                    this.setState({ createdStatus: 'error'})
                    window.scrollTo(0, 100);

                });
        } else {
            this.setState({ createdStatus: 'error'})
            window.scrollTo(0, 100);
        }
     }

    }

    //   getCreatedSAR(value) {
    //     console.log("-------------cerated data ------> " , value);
    //     console.log("inside getting data")
    //     var fd = new FormData();    
    //     fd.append( 'file', this.state.file );
    //     fd.append( 'sar_id', 1);

    //     $.ajax({
    //       url: 'http://localhost:5000/sar/upload',
    //       data: fd,
    //       processData: false,
    //       contentType: false,
    //       type: 'POST',
    //       success: function(data) {
    //         console.log("Inside success ---->", data)
    //       }
    //     });
    //   }

    componentWillReceiveProps(nextProps) {
        console.log("Inside receive props", nextProps);
    }

    componentWillMount() {
        // $(document).ready(function () {
        //     $("#datepicker").datepicker({ minDate: 0 });
        // });
    }


    render() {
        return (
            <div>
                <div class="">
                    <Container>
                        <div class="container" style={{ marginLeft: '0px', marginRight: '0px' }}>
                            <div class="main_container">
                                {/* <SideBar handleTab={this.handleTab} />
                            <Header /> */}
                                <div class="right_col" role="main">
                                    <div class="">
                                        {/* <div class="page-title">
                                        <div class="title_left">
                                            <h3>Subject Access Request Form</h3>
                                        </div>

                                        <div class="title_right">
                                            <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" placeholder="Search for..." />
                                                    <span class="input-group-btn">
                                                        <button class="btn btn-default" type="button">Go!</button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
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
                                                    <br />

                                                    <div className="row">
                                                    <div className="col-md-6 col-md-offset-3">
                                                        {this.state.createdStatus === 'success' && 
                                                        
                                                        <div class="alert alert-success alert-dismissible fade in" role="alert">
                                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                        </button>
                                                         SAR Created Successfully
                                                       </div>
                                                             }
                                                        {this.state.createdStatus === 'error' && <div className="alert alert-danger alert-dismissible fade in" role="alert">
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span>
                                                            </button>
                                                            <span>Error in SAR creation</span>
                                                        </div>}
                                                    </div>
                                                </div>
                                                        <div class="sar-create">

                                                            <form action="#">

                                                                <p>Under the General Data Protection Regulation, you are entitled as a data subject to obtain from [Your Company Name], confirmation as to whether or not we are processing personal data concerning you, as well as to request details about the purposes, categories and disclosures of such data.<br /><br />
                                                                    You can use this form to request information about, and access to any personal data we hold about you. Details on where to return the completed form can be found at the end of this document.
</p>
                                                                <h4>1. Personal Details</h4>
                                                                <div class="row">

                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="first">Name *</label>
                                                                            <input type="text" class="form-control" placeholder="" id="first" onChange={this.handlePdNameChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.nameErr}</span>
                                                                        </div>
                                                                    </div>


                                                                    <div class="col-md-3">
                                                                        <div class="form-group">
                                                                            <label for="last">DOB *</label>
                                                                            {/* <div class='input-group date' id='myDatepicker2'>
                                                                                {/* <input id="datepicker" type='date' class="form-control" name="dob" onChange={this.handlePdDateChange} /> */}
                                                                            {/* <input type="text" id="datepicker" />
                                                                                <span class="input-group-addon">
                                                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                                                </span>
                                                                            </div> */}
                                                                            <DatePicker
                                                                                selected={this.state.startDate}
                                                                                onChange={this.handlePdDateChange}
                                                                                maxDate={moment()}
                                                                                placeholderText="   dd/mm/yyyy"
                                                                                dateFormat="DD/MM/YYYY"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company">Contact Number *</label>
                                                                            <input type="name" class="form-control" placeholder="" id="contact-number" onChange={this.handlePdContactNOChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.phoneErr}</span>
                                                                        </div>


                                                                    </div>


                                                                    <div class="col-md-6">

                                                                        <div class="form-group">
                                                                            <label for="phone">Email *</label>
                                                                            <input type="tel" class="form-control" id="phone" placeholder="" onChange={this.handlePdEmailChange} />
                                                                            <span style={{ color: 'red' }}>{this.state.emailErr}</span>
                                                                        </div>
                                                                    </div>

                                                                </div>



                                                                <div class="row">
                                                                    <div class="col-md-12">

                                                                        <div class="form-group">
                                                                            <label for="address">Address</label>
                                                                            <textarea class="form-control" rows="5" id="address" placeholder="" onChange={this.handlePdAddressChange}></textarea>
                                                                        </div>
                                                                    </div>


                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <label for="information">Any other information that may help us to locate your personal data:</label>
                                                                            <textarea class="form-control" rows="5" id="comment" placeholder="" onChange={this.handlePdInfoChange}></textarea>
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                <h4>2. Specific Details of the Information Requested:</h4>
                                                                <div class="row">
                                                                    <div class="col-md-12">

                                                                        <div class="form-group">
                                                                            <label for="phone">SAR Details *</label>
                                                                            <textarea class="form-control" rows="5" id="comment" placeholder="" onChange={this.handlespecInfoChange}></textarea>
                                                                            <span style={{ color: 'red' }}>{this.state.infoErr}</span>
                                                                        </div>
                                                                    </div>




                                                                </div>
                                                                <h4>3. Representatives <span>(only complete if you are acting as the representative for a data subject)</span><br />
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
                                                                            <input type="text" class="form-control" placeholder="" id="first" />
                                                                        </div>
                                                                    </div>


                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="last">Signature (Full Name)</label>
                                                                            <input type="text" class="form-control" placeholder="" id="last" onChange={this.handleConfirmRepSignChange} />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <h4>4. Confirmation:</h4>
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
                                                                            {/* <div class='input-group date' id='myDatepicker3'>
                                                                                <input type='date' class="form-control" name="date" onChange={this.handleConfirmRepNameChange} />
                                                                                <span class="input-group-addon">
                                                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                                                </span>
                                                                            </div> */}
                                                                            <DatePicker
                                                                                selected={this.state.date}
                                                                                minDate={moment()}
                                                                                placeholderText="   dd/mm/yyyy"
                                                                                dateFormat="DD/MM/YYYY"
                                                                                onChange={this.handleConfirmRepNameChange}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                <h4>5. Attachments</h4>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <input type="file" class="form-control-file" id="fileUpload" onChange={this.onChange} />

                                                                            <span>File size max 5mb</span><br />
                                                                            <span style={{ color: 'red' }}>{this.state.fileErr}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>6. Completed Forms</h4>
                                                                <h5>For postal requests, please return this form to:</h5>
                                                               
                                                                To, <br />
                                                                [Data Protection Officer Name] <br />
                                                                [Company Name] <br />
                                                                [Address] <br />
                                                                [Town City / Post Code]<br />
  
 


                                                               {/* <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company"></label>
                                                                            <input type="text" class="form-control" placeholder="Insert Company Name" id="company" onChange={this.handleCompletedCompanyChange} />
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company"></label>
                                                                            <input type="text" class="form-control" placeholder="Insert Address" id="company" onChange={this.handleCompletedAddressChange} />
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company"></label>
                                                                            <input type="text" class="form-control" placeholder="Insert Town/City" id="company" onChange={this.handleCompletedCityChange} />
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company"></label>
                                                                            <input type="number" class="form-control" placeholder="Insert Postcode" id="company" onChange={this.handleCompletedPostcodeChange} />
                                                                        </div>


                                                                    </div>
                                                                        </div>*/}
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
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    console.log("state0,", state)

    return {
        getSarSuccess: state.sar.createSar
    };
}
function mapDispatchToProps(dispatch) {
    return {
        Action: bindActionCreators(Action, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectAccessRequestCreateComponent);




//export default SubjectAccessRequestCreateComponent;






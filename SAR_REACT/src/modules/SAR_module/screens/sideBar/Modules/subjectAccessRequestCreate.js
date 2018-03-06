import React, { Component } from 'react';
import Header from '../../../../../components/Header';
import SideBar from '../../../../../components/SideBar';
import { Container } from 'semantic-ui-react'
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'
import Action from '../../../../SAR_module/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SubjectAccessRequestCreateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'nav-md',
            user: {
                name: '',
                email: '',
                password: '123',
                user_type: '',
                created_by: '',
                modified_by: '',
                phone: 0,
                address: {
                    addressline1: '',
                    addressline2: '',
                    pincode: 0,
                    city: '',
                    created_by: '',
                    modified_by: 'sdfdsf'
                }

            },
            representative: {
                name: '',
                email: '',
                password: '123',
                user_type: '',
                created_by: '',
                modified_by: '',
                phone: 0,
                address: {
                    addressline1: '',
                    addressline2: '',
                    pincode: 0,
                    city: '',
                    created_by: '',
                    modified_by: 'adfa'
                }

            },
            otherInfo: '',
            info_requested: ''

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
        this.submit = this.submit.bind(this);
        this.handleNavBar = this.handleNavBar.bind(this);




    }
    handlePdNameChange(e) {
        console.log(e.target.value)
        var myData = { ...this.state.user };
        myData.name = e.target.value;
        this.setState({ user: myData });
        console.log(this.state)
    }

    handleNavBar(value) {
        this.setState({ navBar: value })
    }

    handlePdEmailChange(e) {
        var myData = { ...this.state.user };
        myData.email = e.target.value;
        this.setState({ user: myData });
    }
    handlePdAddressChange(e) {
        var myData = { ...this.state.user };
        myData.address.addressline1 = e.target.value;
        this.setState({ user: myData });
    }
    handlePdContactNOChange(e) {
        var myData = { ...this.state.user };
        myData.phone = e.target.value;
        this.setState({ user: myData });
    }
    handlePdDateChange(e) {
        //
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
        this.setState({ representative: myData })
    }
    handleRepEmailChange(e) {
        console.log(e.target.value)
        var myData = { ...this.state.representative };
        myData.email = e.target.value;
        this.setState({ representative: myData })

    }
    handleRepNameChange(e) {
        console.log(e.target.value)
        var myData = { ...this.state.representative };
        myData.name = e.target.value;
        this.setState({ representative: myData })
    }
    handleConfirmRepNameChange(e) {
        //
    }
    handleConfirmFileChange(e) {

        // this.setState({attchmentFile:})
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

    submit(e) {
        e.preventDefault();
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
                }


            },
            otherInfo: this.state.otherInfo,
            info_requested: this.state.info_requested
        }

        console.log("teh create sar data", data)

        this.props.Action.createSar(data);
    }


    render() {
        return (
            <div>
                <div className="">
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
                                                                        </div>
                                                                    </div>


                                                                    <div class="col-md-3">
                                                                        <div class="form-group">
                                                                            <label for="last">DOB *</label>
                                                                            <div class='input-group date' id='myDatepicker2'>
                                                                                <input type='date' class="form-control" name="dob" onChange={this.handlePdDateChange} />
                                                                                <span class="input-group-addon">
                                                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company">Contact Number *</label>
                                                                            <input type="name" class="form-control" placeholder="" id="contact-number" onChange={this.handlePdContactNOChange} />
                                                                        </div>


                                                                    </div>


                                                                    <div class="col-md-6">

                                                                        <div class="form-group">
                                                                            <label for="phone">Email *</label>
                                                                            <input type="tel" class="form-control" id="phone" placeholder="" onChange={this.handlePdEmailChange} />
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
                                                                            <textarea class="form-control" rows="5" id="comment" placeholder="" onChange={this.handlespecInfoChange}></textarea>
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
                                                                        </div>


                                                                    </div>


                                                                    <div class="col-md-6">

                                                                        <div class="form-group">
                                                                            <label for="phone">Email </label>
                                                                            <input type="tel" class="form-control" id="phone" placeholder="" onChange={this.handleRepEmailChange} />
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
                                                                            <div class='input-group date' id='myDatepicker3'>
                                                                                <input type='date' class="form-control" name="date" onChange={this.handleConfirmRepNameChange} />
                                                                                <span class="input-group-addon">
                                                                                    <span class="glyphicon glyphicon-calendar"></span>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                <h4>5. Attachments</h4>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="form-group">
                                                                            <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={this.handleConfirmFileChange} />

                                                                            <span>File size max 5mb</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <h4>6. Completed Forms</h4>
                                                                <div class="row">
                                                                    <div class="col-md-6">
                                                                        <div class="form-group">
                                                                            <label for="company"></label>
                                                                            <input type="text" class="form-control" placeholder="Insert Data Protection Officer Name" id="company" onChange={this.handleCompletedNameChange} />
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                                <div class="row">
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
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-md-12">
                                                                        <div class="btm-sar">
                                                                            <center><button class="btn btn-primary btn-lg" onClick={this.submit}>Submit</button>
                                                                                <button class="btn btn-primary btn-lg">Print</button>
                                                                            </center>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </form>
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






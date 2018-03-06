import React, { Component } from 'react';
import logo from '../../../../assests/images/Compliance-Compendium-Logo-Transparentx-1024x339.png';
import '../../../../assests/css/custom.css'

import '../../../../assests/css/custom.min.css'


class RegisterTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }
  render() {
    return (
      <div class="register_wrapper">
        <div class="animate form ">
          <div class="login_head"><img src={logo} alt="" width="240" /></div>
          <section class="reg_content">

            <form id="register-next" data-parsley-validate>
              <h1>Welcome to Compliance Compendium - Billing Information</h1>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="first">Companies House Registration Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">Company Name<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" />
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="first">Company Contact Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">Company VAT Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" />
                  </div>
                </div>

              </div>
              <div class="row">
                <div class="col-md-6">

                  <div class="form-group">
                    <label for="first">Accounts Department E-mail<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>


              </div>
              <div class="row">

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> Accounts Department Office Address<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="1st Line" id="last" required="" />

                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="2ndline">  </label>
                    <input type="text" class="form-control" placeholder="2nd Line" id="last" />

                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Postcode<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>



              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> Contact Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" />
                  </div>
                </div>

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">E-mail Address<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>




              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Auto Renewal</label>
                    <p>
                      Yes:
                        <input type="radio" class="flat" name="renewal" id="renewYes" value="Yes" checked="" required /> No:
                        <input type="radio" class="flat" name="renewal" id="renewNo" value="No" />
                    </p>
                  </div>
                </div>


              </div>

              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="first">Bank Name<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>



              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Bank Address<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="1st Line" id="first" required="" />
                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last">  </label>
                    <input type="text" class="form-control" placeholder="2nd Line" id="last" required="" />
                  </div>
                </div>

              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">Bank Postcode<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>



              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="last"> Bank Account Number<span class="text-danger">*</span></label>
                    <input type="text" class="form-control" placeholder="" id="last" required="" />
                  </div>
                </div>


              </div>
              <div class="row">

                <div class="col-md-6">

                  <div class="form-group">
                    <label for="paddress">E-mail Address<span class="text-danger">*</span></label>
                    <input type="email" class="form-control" placeholder="" id="first" required="" />
                  </div>
                </div>


              </div>

              <div>
                <button class="btn btn-orange" href="index.html">Submit</button>

              </div>

              <div class="clearfix"></div>


            </form>
          </section>

        </div>


      </div>

    );
  }
}

export default RegisterTwo;

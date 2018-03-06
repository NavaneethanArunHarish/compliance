import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class badgesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
  <div class="right_col" role="main" style={{marginLeft:'0px'}}>
          <div class="">
            <div class="page-title">
              <div class="title_left">
                <h3>Badges </h3>
              </div>

              <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for..."/>
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="button">Go!</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="clearfix"></div>

            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                  <div class="x_title">
                    <h2>Badges </h2>
   
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                     <div class="col-xs-2">
                      <ul class="nav nav-tabs tabs-left">
                        <li class="active"><a href="#badges-settings" data-toggle="tab">Badges settings</a>
                        </li>
                        <li><a href="#manage-badges" data-toggle="tab">Manage badges</a>
                        </li>
                        <li><a href="#add-badge" data-toggle="tab">Add a new badge</a>
                        </li>
                      </ul>
                    </div>

                    <div class="col-xs-10">
                      <div class="tab-content">
                        <div class="tab-pane active" id="badges-settings">
                          <p class="lead">Badges settings</p>

                          <fieldset class="adminsettings" id="yui_3_17_2_1_1516091109701_21"><div class="clearer"></div><div class="form-item row" id="admin-badges_defaultissuername">
    <div class="form-label col-sm-3 text-sm-right" id="yui_3_17_2_1_1516091109701_20">
        <label for="id_s__badges_defaultissuername" id="yui_3_17_2_1_1516091109701_19">
            Default badge issuer name
        </label>
        <span class="form-shortname d-block small text-muted">badges_defaultissuername</span>
    </div>
    <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516091109701_26">
        <div class="form-text defaultsnext" id="yui_3_17_2_1_1516091109701_25">
    <input type="text" name="s__badges_defaultissuername" value="" size="30" id="id_s__badges_defaultissuername" class="form-control "/>
</div>
            <div class="form-defaultinfo text-muted ">Default: ComplianceCompendium</div>
        <div class="form-description m-t-1"><p>Name of the issuing agent or authority.</p>
</div>
    </div>
</div><div class="clearer"></div><div class="form-item row" id="admin-badges_defaultissuercontact">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__badges_defaultissuercontact">
            Default badge issuer contact details
        </label>
        <span class="form-shortname d-block small text-muted">badges_defaultissuercontact</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__badges_defaultissuercontact" value="" size="30" id="id_s__badges_defaultissuercontact" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>An email address associated with the badge issuer.</p>
</div>
    </div>
</div><div class="clearer"></div><div class="form-item row" id="admin-badges_badgesalt">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__badges_badgesalt">
            Salt for hashing the recipient's email address
        </label>
        <span class="form-shortname d-block small text-muted">badges_badgesalt</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__badges_badgesalt" value="badges1515494534" size="30" id="id_s__badges_badgesalt" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: badges1515494534</div>
        <div class="form-description m-t-1"><p>Using a hash allows backpack services to confirm the badge earner without having to expose their email address. This setting should only use numbers and letters.</p>

<p>Note: For recipient verification purposes, please avoid changing this setting once you start issuing badges.</p>
</div>
    </div>
</div><div class="clearer"></div><div class="form-item row" id="admin-badges_allowexternalbackpack">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__badges_allowexternalbackpack">
            Enable connection to external backpacks
        </label>
        <span class="form-shortname d-block small text-muted">badges_allowexternalbackpack</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__badges_allowexternalbackpack" value="0"/>
    <input type="checkbox" name="s__badges_allowexternalbackpack" value="1" id="id_s__badges_allowexternalbackpack" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Allow users to set up connections and display badges from their external backpack providers.</p>

<p>Note: It is recommended to leave this option disabled if the website cannot be accessed from the Internet (e.g. because of the firewall).</p>
</div>
    </div>
</div><div class="clearer"></div><div class="form-item row" id="admin-badges_allowcoursebadges">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__badges_allowcoursebadges">
            Enable course badges
        </label>
        <span class="form-shortname d-block small text-muted">badges_allowcoursebadges</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__badges_allowcoursebadges" value="0"/>
    <input type="checkbox" name="s__badges_allowcoursebadges" value="1" id="id_s__badges_allowcoursebadges" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Allow badges to be created and awarded in the course context.</p>
</div>
    </div>
</div></fieldset>



                        </div>
                        <div class="tab-pane" id="manage-badges">
                          <p class="lead">Manage badges</p>

                          <div class="alert alert-danger alert-block fade in " role="alert" id="yui_3_17_2_1_1516091467395_36">
    <button type="button" class="close" data-dismiss="alert">×</button>
    There are no badges available.
</div>
        <div class="singlebutton">
    <form method="post" action="newbadge.php">
            <input type="hidden" name="type" value="1"/>
            <input type="hidden" name="id" value="0"/>
            <input type="hidden" name="sesskey" value="20GiwB4Ohl"/>
        <button type="submit" class="btn btn-default" id="single_button5a5db84cbe7a714" title="">Add a new badge</button>
    </form>
</div>


                        </div>
                        <div class="tab-pane" id="add-badge">
                          <p class="lead">Add a new badge</p>

                          <fieldset class="clearfix collapsible" id="id_badgedetails">
    <legend class="ftoggler" id="yui_3_17_2_1_1516091468183_329"><a href="#" class="fheader" role="button" aria-controls="id_badgedetails" aria-expanded="true" id="yui_3_17_2_1_1516091468183_172">Badge details</a></legend>
    <div class="fcontainer clearfix">
    <div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            
        </span>
        <label class="col-form-label d-inline " for="id_name">
            Name
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="text">
        <input type="text" class="form-control " name="name" id="id_name" value="" size="70"/>
        <div class="form-control-feedback" id="id_error_name" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            
        </span>
        <label class="col-form-label d-inline " for="id_description">
            Description
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="textarea">
        <textarea name="description" id="id_description" class="form-control " wrap="virtual" rows="8" cols="70"></textarea>
        <div class="form-control-feedback" id="id_error_description" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>This is an image that will be used when this badge is issued.</p><p>To add a new image, browse and select an image (in JPG or PNG format) then click &quot;Save changes&quot;. The image will be cropped to a square and resized to match badge image requirements.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Image" aria-label="Help with Image"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_image">
            Image
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="filepicker">
        <div class="filemanager-loading mdl-align" id="filepicker-loading-5a5db84d1db46" style={{display: 'none'}}>
<i class="icon fa fa-circle-o-notch fa-spin fa-fw " aria-hidden="true" title="Loading..." aria-label="Loading..."></i>
</div>
<div id="filepicker-wrapper-5a5db84d1db46" class="mdl-left" style={{}}>
    <div>
        <input type="button" class="btn btn-secondary fp-btn-choose" id="filepicker-button-5a5db84d1db46" value="Choose a file..." name="imagechoose"/>
        <span>  </span>
    </div>    <div id="file_info_5a5db84d1db46" class="mdl-left filepicker-filelist" style={{position: 'relative'}}>
    <div class="filepicker-filename">
        <div class="filepicker-container"><div class="dndupload-message">You can drag and drop files here to add them. <br/><div class="dndupload-arrow"></div></div></div>
        <div class="dndupload-progressbars"></div>
    </div>
    <div><div class="dndupload-target">Drop files here to upload<br/><div class="dndupload-arrow"></div></div></div>
    </div></div><input type="hidden" name="image" id="id_image" value="149539370" class="filepickerhidden"/><noscript>&lt;div&gt;&lt;object type='text/html' data='http://35.169.62.69/repository/draftfiles_manager.php?env=filepicker&amp;amp;action=browse&amp;amp;itemid=149539370&amp;amp;subdirs=0&amp;amp;maxbytes=-1&amp;amp;maxfiles=1&amp;amp;ctx_id=1&amp;amp;course=1&amp;amp;sesskey=20GiwB4Ohl' height='160' width='600' style='border:1px solid #000'&gt;&lt;/object&gt;&lt;/div&gt;</noscript><p>Accepted file types:</p><div class="form-filetypes-descriptions">
    <ul class="list-unstyled unstyled">
        <li>Image (GIF) <small class="text-muted muted">.gif</small></li>
        <li>Image (JPEG) <small class="text-muted muted">.jpe .jpeg .jpg</small></li>
        <li>Image (PNG) <small class="text-muted muted">.png</small></li>
        <li>Image (SVG+XML) <small class="text-muted muted">.svg .svgz</small></li>
    </ul>
</div>
        <div class="form-control-feedback" id="id_error_image" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    </div></fieldset>


    <fieldset class="clearfix collapsible" id="id_issuerdetails">
    <legend class="ftoggler"><a href="#" class="fheader" role="button" aria-controls="id_issuerdetails" aria-expanded="true" id="yui_3_17_2_1_1516091468183_179">Issuer details</a></legend>
    <div class="fcontainer clearfix">
    <div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Name of the issuing agent or authority.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Issuer name" aria-label="Help with Issuer name"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_issuername">
            Name
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="text">
        <input type="text" class="form-control " name="issuername" id="id_issuername" value="" size="70"/>
        <div class="form-control-feedback" id="id_error_issuername" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>An email address associated with the badge issuer.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Contact" aria-label="Help with Contact"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_issuercontact">
            Contact
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="text">
        <input type="text" class="form-control " name="issuercontact" id="id_issuercontact" value="" size="70"/>
        <div class="form-control-feedback" id="id_error_issuercontact" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    </div></fieldset>

    <fieldset class="clearfix collapsible" id="id_issuancedetails">
    <legend class="ftoggler" id="yui_3_17_2_1_1516091468183_317"><a href="#" class="fheader" role="button" aria-controls="id_issuancedetails" aria-expanded="true" id="yui_3_17_2_1_1516091468183_183">Badge expiry</a></legend>
    <div class="fcontainer clearfix">
    <div class="form-group row  fitem   " data-groupname="expirydategr">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Optionally, badges can expire on a specific date, or the date can be calculated based on the date when the badge was issued to a user.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Expiry date" aria-label="Help with Expiry date"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="fgroup_id_expirydategr">
            Expiry date
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="group">
            
            <label class="form-check-inline form-check-label  fitem  ">

<input type="radio" name="expiry" id="id_expiry_0" value="0" checked=""/>
    Never
</label>

<span class="form-control-feedback" id="id_error_expiry" style={{display: 'none'}}>
    
</span>
             
            <br/>
             
            <label class="form-check-inline form-check-label  fitem  ">

<input type="radio" name="expiry" id="id_expiry_1" value="1"/>
    Fixed date
</label>

<span class="form-control-feedback" id="id_error_expiry" style={{display: 'none'}}>
    
</span>
             
            <div class="form-group  fitem  " data-groupname="expiredate">
    <label class="col-form-label " for="id_expiredate">
         
        
        
    </label>
    <span data-fieldtype="date_selector">
        <span class="fdate_selector" id="yui_3_17_2_1_1516091468183_131">
            
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516091468183_294">
    <label class="col-form-label sr-only" for="id_expiredate_day">
        Day 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516091468183_293">
    <select class="custom-select" name="expiredate[day]" id="id_expiredate_day" disabled="disabled">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16" selected="">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
        <option value="24">24</option>
        <option value="25">25</option>
        <option value="26">26</option>
        <option value="27">27</option>
        <option value="28">28</option>
        <option value="29">29</option>
        <option value="30">30</option>
        <option value="31">31</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_expiredate[day]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516091468183_296">
    <label class="col-form-label sr-only" for="id_expiredate_month">
        Month 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516091468183_295">
    <select class="custom-select" name="expiredate[month]" id="id_expiredate_month" disabled="disabled">
        <option value="1" selected="">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_expiredate[month]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516091468183_298">
    <label class="col-form-label sr-only" for="id_expiredate_year">
        Year 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516091468183_297">
    <select class="custom-select" name="expiredate[year]" id="id_expiredate_year" disabled="disabled">
        <option value="1900">1900</option>
        <option value="1901">1901</option>
        <option value="1902">1902</option>
        <option value="1903">1903</option>
        <option value="1904">1904</option>
        <option value="1905">1905</option>
        <option value="1906">1906</option>
        <option value="1907">1907</option>
        <option value="1908">1908</option>
        <option value="1909">1909</option>
        <option value="1910">1910</option>
        <option value="1911">1911</option>
        <option value="1912">1912</option>
        <option value="1913">1913</option>
        <option value="1914">1914</option>
        <option value="1915">1915</option>
        <option value="1916">1916</option>
        <option value="1917">1917</option>
        <option value="1918">1918</option>
        <option value="1919">1919</option>
        <option value="1920">1920</option>
        <option value="1921">1921</option>
        <option value="1922">1922</option>
        <option value="1923">1923</option>
        <option value="1924">1924</option>
        <option value="1925">1925</option>
        <option value="1926">1926</option>
        <option value="1927">1927</option>
        <option value="1928">1928</option>
        <option value="1929">1929</option>
        <option value="1930">1930</option>
        <option value="1931">1931</option>
        <option value="1932">1932</option>
        <option value="1933">1933</option>
        <option value="1934">1934</option>
        <option value="1935">1935</option>
        <option value="1936">1936</option>
        <option value="1937">1937</option>
        <option value="1938">1938</option>
        <option value="1939">1939</option>
        <option value="1940">1940</option>
        <option value="1941">1941</option>
        <option value="1942">1942</option>
        <option value="1943">1943</option>
        <option value="1944">1944</option>
        <option value="1945">1945</option>
        <option value="1946">1946</option>
        <option value="1947">1947</option>
        <option value="1948">1948</option>
        <option value="1949">1949</option>
        <option value="1950">1950</option>
        <option value="1951">1951</option>
        <option value="1952">1952</option>
        <option value="1953">1953</option>
        <option value="1954">1954</option>
        <option value="1955">1955</option>
        <option value="1956">1956</option>
        <option value="1957">1957</option>
        <option value="1958">1958</option>
        <option value="1959">1959</option>
        <option value="1960">1960</option>
        <option value="1961">1961</option>
        <option value="1962">1962</option>
        <option value="1963">1963</option>
        <option value="1964">1964</option>
        <option value="1965">1965</option>
        <option value="1966">1966</option>
        <option value="1967">1967</option>
        <option value="1968">1968</option>
        <option value="1969">1969</option>
        <option value="1970">1970</option>
        <option value="1971">1971</option>
        <option value="1972">1972</option>
        <option value="1973">1973</option>
        <option value="1974">1974</option>
        <option value="1975">1975</option>
        <option value="1976">1976</option>
        <option value="1977">1977</option>
        <option value="1978">1978</option>
        <option value="1979">1979</option>
        <option value="1980">1980</option>
        <option value="1981">1981</option>
        <option value="1982">1982</option>
        <option value="1983">1983</option>
        <option value="1984">1984</option>
        <option value="1985">1985</option>
        <option value="1986">1986</option>
        <option value="1987">1987</option>
        <option value="1988">1988</option>
        <option value="1989">1989</option>
        <option value="1990">1990</option>
        <option value="1991">1991</option>
        <option value="1992">1992</option>
        <option value="1993">1993</option>
        <option value="1994">1994</option>
        <option value="1995">1995</option>
        <option value="1996">1996</option>
        <option value="1997">1997</option>
        <option value="1998">1998</option>
        <option value="1999">1999</option>
        <option value="2000">2000</option>
        <option value="2001">2001</option>
        <option value="2002">2002</option>
        <option value="2003">2003</option>
        <option value="2004">2004</option>
        <option value="2005">2005</option>
        <option value="2006">2006</option>
        <option value="2007">2007</option>
        <option value="2008">2008</option>
        <option value="2009">2009</option>
        <option value="2010">2010</option>
        <option value="2011">2011</option>
        <option value="2012">2012</option>
        <option value="2013">2013</option>
        <option value="2014">2014</option>
        <option value="2015">2015</option>
        <option value="2016">2016</option>
        <option value="2017">2017</option>
        <option value="2018">2018</option>
        <option value="2019" selected="">2019</option>
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
        <option value="2031">2031</option>
        <option value="2032">2032</option>
        <option value="2033">2033</option>
        <option value="2034">2034</option>
        <option value="2035">2035</option>
        <option value="2036">2036</option>
        <option value="2037">2037</option>
        <option value="2038">2038</option>
        <option value="2039">2039</option>
        <option value="2040">2040</option>
        <option value="2041">2041</option>
        <option value="2042">2042</option>
        <option value="2043">2043</option>
        <option value="2044">2044</option>
        <option value="2045">2045</option>
        <option value="2046">2046</option>
        <option value="2047">2047</option>
        <option value="2048">2048</option>
        <option value="2049">2049</option>
        <option value="2050">2050</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_expiredate[year]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <a class="visibleifjs" name="expiredate[calendar]" href="#" id="id_expiredate_calendar"><i class="icon fa fa-calendar fa-fw " aria-hidden="true" title="Calendar" aria-label="Calendar"></i></a>
        </span>
    </span>
    <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
        
    </div>
</div>
             
            <br/>
             
            <label class="form-check-inline form-check-label  fitem  ">

<input type="radio" name="expiry" id="id_expiry_2" value="2"/>
    Relative date
</label>

<span class="form-control-feedback" id="id_error_expiry" style={{display: 'none'}}>
    
</span>
             
            <div class="form-group  fitem  " data-groupname="expireperiod">
    <label class="col-form-label " for="id_expireperiod">
         
        
        
    </label>
    <span data-fieldtype="duration">
            
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516091468183_300">
    <label class="col-form-label sr-only" for="id_expireperiod_number">
        Time 
        
        
    </label>
    <span data-fieldtype="text" id="yui_3_17_2_1_1516091468183_299">
    <input type="text" class="form-control " name="expireperiod[number]" id="id_expireperiod_number" value="0" size="3" disabled="disabled"/>
    </span>
    <div class="form-control-feedback" id="id_error_expireperiod[number]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516091468183_302">
    <label class="col-form-label sr-only" for="id_expireperiod_timeunit">
        Time unit 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516091468183_301">
    <select class="custom-select" name="expireperiod[timeunit]" id="id_expireperiod_timeunit" disabled="disabled">
        <option value="604800">weeks</option>
        <option value="86400" selected="">days</option>
        <option value="3600">hours</option>
        <option value="60">minutes</option>
        <option value="1">seconds</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_expireperiod[timeunit]" style={{display: 'none'}}>
        
    </div>
</div>
    </span>
    <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
        
    </div>
</div>
             
            after the date of issue.
        <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    </div></fieldset>
    <div class="form-group row  fitem femptylabel  " data-groupname="buttonar" id="yui_3_17_2_1_1516091468183_306">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="fgroup_id_buttonar">
            
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="group" id="yui_3_17_2_1_1516091468183_305">
            
            <div class="form-group  fitem  ">
    <label class="col-form-label " for="id_submitbutton">
         
        
        
    </label>
    <span data-fieldtype="submit">
        <input type="submit" class="btn btn-primary " name="submitbutton" id="id_submitbutton" value="Create badge"/>
    </span>
    <div class="form-control-feedback" id="id_error_submitbutton" style={{display: 'none'}}>
        
    </div>
</div>
             
            <div class="form-group  fitem   btn-cancel">
    <label class="col-form-label " for="id_cancel">
         
        
        
    </label>
    <span data-fieldtype="submit">
        <input type="submit" class="btn btn-secondary" name="cancel" id="id_cancel" value="Cancel" onclick="skipClientValidation = true; return true;"/>
    </span>
    <div class="form-control-feedback" id="id_error_cancel" style={{display: 'none'}}>
        
    </div>
</div>
        <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
<div class="fdescription required">There are required fields in this form marked <i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required field" aria-label="Required field"></i>.</div>


                        </div>
          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            </div>

        );
    }
}

export default badgesComponent;

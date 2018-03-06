import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class competenciesComponent extends Component {
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
                <h3>Competencies </h3>
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
                    <h2>Competencies </h2>
   
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">
                     <div class="col-xs-2">
                      <ul class="nav nav-tabs tabs-left">
                        <li class="active"><a href="#competencies-settings" data-toggle="tab">Competencies Settings</a>
                        </li>
                        <li><a href="#migrate-frameworks" data-toggle="tab">Migrate Frameworks</a>
                        </li>
                        <li><a href="#import-competency" data-toggle="tab">Import competency framework</a>
                        </li>
                        <li><a href="#export-competency" data-toggle="tab">Export competency frameworks</a>
                        </li>
                       <li><a href="#competency-frameworks" data-toggle="tab">Competency frameworks</a>
                        </li> 

                        <li><a href="#learning-plan-templates" data-toggle="tab">Learning plan templates</a>
                        </li> 
        

                      </ul>
                    </div>

                    <div class="col-xs-10">
                      <div class="tab-content">
                        <div class="tab-pane active" id="competencies-settings">
                          <p class="lead">Competencies settings</p>
                          <fieldset id="yui_3_17_2_1_1516089094960_43">
<div class="clearer"></div>
<div class="form-item row" id="admin-enabled">
    <div class="form-label col-sm-3 text-sm-right" id="yui_3_17_2_1_1516089094960_42">
        <label for="id_s_core_competency_enabled" id="yui_3_17_2_1_1516089094960_41">
            Enable competencies
        </label>
        <span class="form-shortname d-block small text-muted">core_competency | enabled</span>
    </div>
    <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516089094960_57">
        <div class="form-checkbox defaultsnext" id="yui_3_17_2_1_1516089094960_56">
    <input type="hidden" name="s_core_competency_enabled" value="0"/>
    <input type="checkbox" name="s_core_competency_enabled" value="1" id="id_s_core_competency_enabled" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Competencies allow users to be assessed according to learning plans.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-pushcourseratingstouserplans">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s_core_competency_pushcourseratingstouserplans">
            Push course ratings to individual learning plans
        </label>
        <span class="form-shortname d-block small text-muted">core_competency | pushcourseratingstouserplans</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s_core_competency_pushcourseratingstouserplans" value="0"/>
    <input type="checkbox" name="s_core_competency_pushcourseratingstouserplans" value="1" id="id_s_core_competency_pushcourseratingstouserplans" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Default value for the course setting to update individual learning plans when course competencies are rated.</p>
</div>
    </div>
</div></fieldset> 
  <div class="row">
                <div class="col-md-offset-3 col-md-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>



                        </div>
                        <div class="tab-pane" id="migrate-frameworks">
                          <p class="lead">Migrate frameworks</p>

                          <p>This tool can be used to update a competency framework to a newer version. It searches for competencies in courses and activities using the older framework, and updates the links to point to the new framework.

It is not recommended to edit the old set of competencies directly, as this would change all of the competencies that have already been awarded in users' learning plans.

Typically you would import the new version of a framework, hide the old framework, then use this tool to migrate new courses to the new framework.</p>

<form autocomplete="off" action="http://35.169.62.69/admin/tool/lpmigrate/frameworks.php" method="post" accept-charset="utf-8" id="mform1" class="mform">
  <div style={{display: 'none'}}><input name="sesskey" type="hidden" value="20GiwB4Ohl"/>
<input name="_qf__tool_lpmigrate_form_migrate_framework" type="hidden" value="1"/>
<input name="mform_isexpanded_id_hdrcourses" type="hidden" value="1"/>
</div>


  <fieldset class="clearfix collapsible" id="id_hdrcourses">
    <legend class="ftoggler"><a href="#" class="fheader" role="button" aria-controls="id_hdrcourses" aria-expanded="true">Frameworks</a></legend>
    <div class="fcontainer clearfix">
    <div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Select the older framework currently in use.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Migrate from" aria-label="Help with Migrate from"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="form_autocomplete_input-1516089097448">
            Migrate from
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="autocomplete">
        <select class="custom-select " name="from" id="id_from" data-contextid="1" data-onlyvisible="0" aria-hidden="true" style={{visibility: 'hidden', display: 'none'}}>
        </select><div class="form-autocomplete-selection " id="form_autocomplete_selection-1516089097448" role="list" aria-atomic="true">
<span class="accesshide">Selected items:</span>
        <span class="m-b-1 m-r-1">No selection</span>
</div><input type="text" id="form_autocomplete_input-1516089097448" class="form-control" list="form_autocomplete_suggestions-1516089097448" placeholder="Search" role="combobox" aria-expanded="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-autocomplete="list" aria-owns="form_autocomplete_suggestions-1516089097448 form_autocomplete_selection-1516089097448"/><span class="form-autocomplete-downarrow" id="form_autocomplete_downarrow-1516089097448">▼</span><ul class="form-autocomplete-suggestions" id="form_autocomplete_suggestions-1516089097448" role="listbox" aria-hidden="true" style={{display: 'none'}}>
</ul>
        <div class="form-control-feedback" id="id_error_from" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Select the newer version of the framework. It is only possible to select a framework which is not hidden.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Migrate to" aria-label="Help with Migrate to"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="form_autocomplete_input-1516089097449">
            Migrate to
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="autocomplete">
        <select class="custom-select " name="to" id="id_to" data-contextid="1" data-onlyvisible="1" aria-hidden="true" style={{visibility: 'hidden', display: 'none'}}>
        </select><div class="form-autocomplete-selection " id="form_autocomplete_selection-1516089097449" role="list" aria-atomic="true">
<span class="accesshide">Selected items:</span>
        <span class="m-b-1 m-r-1">No selection</span>
</div><input type="text" id="form_autocomplete_input-1516089097449" class="form-control" list="form_autocomplete_suggestions-1516089097449" placeholder="Search" role="combobox" aria-expanded="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-autocomplete="list" aria-owns="form_autocomplete_suggestions-1516089097449 form_autocomplete_selection-1516089097449"/><span class="form-autocomplete-downarrow" id="form_autocomplete_downarrow-1516089097449">▼</span><ul class="form-autocomplete-suggestions" id="form_autocomplete_suggestions-1516089097449" role="listbox" aria-hidden="true" style={{display: 'none'}}>
</ul>
        <div class="form-control-feedback" id="id_error_to" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    </div></fieldset>
  <fieldset class="clearfix collapsible" id="id_hdrcourses">
    <legend class="ftoggler"><a href="#" class="fheader" role="button" aria-controls="id_hdrcourses" aria-expanded="true">Courses</a></legend>
    <div class="fcontainer clearfix">
    <div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Select courses to be migrated to the new framework. If no course is specified, then all courses will be migrated.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Courses allowed" aria-label="Help with Courses allowed"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="form_autocomplete_input-1516089097450">
            Limit to these
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="autocomplete">
        <select class="custom-select " name="allowedcourses[]" id="id_allowedcourses" multiple="" data-requiredcapabilities="" data-exclude="" data-limittoenrolled="0" aria-hidden="true" style={{visibility: 'hidden', display: 'none'}}>
        </select><div class="form-autocomplete-selection form-autocomplete-multiple" id="form_autocomplete_selection-1516089097450" role="list" aria-atomic="true" tabindex="0" aria-multiselectable="true">
<span class="accesshide">Selected items:</span>
        <span class="m-b-1 m-r-1">No selection</span>
</div><input type="text" id="form_autocomplete_input-1516089097450" class="form-control" list="form_autocomplete_suggestions-1516089097450" placeholder="Search" role="combobox" aria-expanded="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-autocomplete="list" aria-owns="form_autocomplete_suggestions-1516089097450 form_autocomplete_selection-1516089097450"/><span class="form-autocomplete-downarrow" id="form_autocomplete_downarrow-1516089097450">▼</span><ul class="form-autocomplete-suggestions" id="form_autocomplete_suggestions-1516089097450" role="listbox" aria-hidden="true" style={{display: 'none'}}>
</ul>
        <div class="form-control-feedback" id="id_error_allowedcourses[]" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>Select any courses which should NOT be migrated to the new framework.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Disallowed courses" aria-label="Help with Disallowed courses"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="form_autocomplete_input-1516089097451">
            Exclude these
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="autocomplete">
        <select class="custom-select " name="disallowedcourses[]" id="id_disallowedcourses" multiple="" data-requiredcapabilities="" data-exclude="" data-limittoenrolled="0" aria-hidden="true" style={{visibility: 'hidden', display: 'none'}}>
        </select><div class="form-autocomplete-selection form-autocomplete-multiple" id="form_autocomplete_selection-1516089097451" role="list" aria-atomic="true" tabindex="0" aria-multiselectable="true">
<span class="accesshide">Selected items:</span>
        <span class="m-b-1 m-r-1">No selection</span>
</div><input type="text" id="form_autocomplete_input-1516089097451" class="form-control" list="form_autocomplete_suggestions-1516089097451" placeholder="Search" role="combobox" aria-expanded="false" autocomplete="off" autocorrect="off" autocapitalize="off" aria-autocomplete="list" aria-owns="form_autocomplete_suggestions-1516089097451 form_autocomplete_selection-1516089097451"/><span class="form-autocomplete-downarrow" id="form_autocomplete_downarrow-1516089097451">▼</span><ul class="form-autocomplete-suggestions" id="form_autocomplete_suggestions-1516089097451" role="listbox" aria-hidden="true" style={{display: 'none'}}>
</ul>
        <div class="form-control-feedback" id="id_error_disallowedcourses[]" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   " data-groupname="coursestartdate">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>If enabled, courses with a start date prior to the date specified will not be migrated.</p></div> " data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with Courses start date" aria-label="Help with Courses start date"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_coursestartdate">
            Start date from
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="date_time_selector">
        <div class="fdate_time_selector" id="yui_3_17_2_1_1516089095929_115">
            
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516089095929_214">
    <label class="col-form-label sr-only" for="id_coursestartdate_day">
        Day 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516089095929_213">
    <select class="custom-select" name="coursestartdate[day]" id="id_coursestartdate_day" disabled="disabled">
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
    <div class="form-control-feedback" id="id_error_coursestartdate[day]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516089095929_216">
    <label class="col-form-label sr-only" for="id_coursestartdate_month">
        Month 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516089095929_215">
    <select class="custom-select" name="coursestartdate[month]" id="id_coursestartdate_month" disabled="disabled">
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
    <div class="form-control-feedback" id="id_error_coursestartdate[month]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516089095929_218">
    <label class="col-form-label sr-only" for="id_coursestartdate_year">
        Year 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516089095929_217">
    <select class="custom-select" name="coursestartdate[year]" id="id_coursestartdate_year" disabled="disabled">
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
        <option value="2018" selected="">2018</option>
        <option value="2019">2019</option>
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
    <div class="form-control-feedback" id="id_error_coursestartdate[year]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516089095929_220">
    <label class="col-form-label sr-only" for="id_coursestartdate_hour">
        Hour 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516089095929_219">
    <select class="custom-select" name="coursestartdate[hour]" id="id_coursestartdate_hour" disabled="disabled">
        <option value="0">00</option>
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7" selected="">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
        <option value="21">21</option>
        <option value="22">22</option>
        <option value="23">23</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_coursestartdate[hour]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <div class="form-group  fitem  " id="yui_3_17_2_1_1516089095929_222">
    <label class="col-form-label sr-only" for="id_coursestartdate_minute">
        Minute 
        
        
    </label>
    <span data-fieldtype="select" id="yui_3_17_2_1_1516089095929_221">
    <select class="custom-select" name="coursestartdate[minute]" id="id_coursestartdate_minute" disabled="disabled">
        <option value="0">00</option>
        <option value="5">05</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50" selected="">50</option>
        <option value="55">55</option>
    </select>
    </span>
    <div class="form-control-feedback" id="id_error_coursestartdate[minute]" style={{display: 'none'}}>
        
    </div>
</div>
            &nbsp;
            <a class="visibleifjs" name="coursestartdate[calendar]" href="#" id="id_coursestartdate_calendar" style={{cursor: 'default'}}><i class="icon fa fa-calendar fa-fw " aria-hidden="true" title="Calendar" aria-label="Calendar"></i></a>
            &nbsp;
            <label class="form-check  fitem  ">
<input type="checkbox" name="coursestartdate[enabled]" class="" id="id_coursestartdate_enabled" value="1" size=""/>
    Enable
</label>

<span class="form-control-feedback" id="id_error_coursestartdate[enabled]" style={{display: 'none'}}>
    
</span>
        </div>
        <div class="form-control-feedback" id="id_error_" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    </div></fieldset><div class="form-group row  fitem femptylabel  " data-groupname="buttonar">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="fgroup_id_buttonar">
            
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="group">
            
            <div class="form-group  fitem  ">
    <label class="col-form-label " for="id_submitbutton">
         
        
        
    </label>
    <span data-fieldtype="submit">
        <input type="submit" class="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Perform migration"/>
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
</form>

                        </div>

                        <div class="tab-pane" id="import-competency">
                          <p class="lead">Import competency framework</p>
                          <form autocomplete="off" action="http://35.169.62.69/admin/tool/lpimportcsv/index.php" method="post" accept-charset="utf-8" id="mform1" class="mform">
  <div style={{display: 'none'}}><input name="confirm" type="hidden" value="0"/>
<input name="sesskey" type="hidden" value="20GiwB4Ohl"/>
<input name="_qf__tool_lpimportcsv_form_import" type="hidden" value="1"/>
</div>

<div class="form-group row  fitem   " id="yui_3_17_2_1_1516090184927_80">
    <div class="col-md-3" id="yui_3_17_2_1_1516090184927_79">
        <span class="pull-right text-nowrap">
            <abbr class="initialism text-danger" title="Required"><i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required" aria-label="Required"></i></abbr>
            
            <a class="btn btn-link p-a-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>A competency framework may be imported via text file. The format of the file can be determined by creating a new competency framework on the site and then exporting it.</p></div> <div class=&quot;helpdoclink&quot;><a href=&quot;http://docs.moodle.org/34/en/admin/tool/lpimportcsv&quot;><i class=&quot;icon fa fa-info-circle fa-fw iconhelp icon-pre&quot; aria-hidden=&quot;true&quot;  aria-label=&quot;&quot;></i>More help</a></div>" data-html="true" tabindex="0" data-trigger="focus">
  <i class="icon fa fa-question-circle text-info fa-fw " aria-hidden="true" title="Help with CSV framework description file" aria-label="Help with CSV framework description file"></i>
</a>
        </span>
        <label class="col-form-label d-inline " for="id_importfile" id="yui_3_17_2_1_1516090184927_78">
            CSV framework <br/> description file
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="filepicker">
        <div class="filemanager-loading mdl-align" id="filepicker-loading-5a5db34a2d9e0" style={{display: 'none'}}>
<i class="icon fa fa-circle-o-notch fa-spin fa-fw " aria-hidden="true" title="Loading..." aria-label="Loading..."></i>
</div>
<div id="filepicker-wrapper-5a5db34a2d9e0" class="mdl-left" style={{}}>
    <div>
        <input type="button" class="btn btn-secondary fp-btn-choose" id="filepicker-button-5a5db34a2d9e0" value="Choose a file..." name="importfilechoose"/>
        <span>  </span>
    </div>    <div id="file_info_5a5db34a2d9e0" class="mdl-left filepicker-filelist" style={{position: 'relative'}}>
    <div class="filepicker-filename">
        <div class="filepicker-container"><div class="dndupload-message">You can drag and drop files here to add them. <br/><div class="dndupload-arrow"></div></div></div>
        <div class="dndupload-progressbars"></div>
    </div>
    <div><div class="dndupload-target">Drop files here to upload<br/><div class="dndupload-arrow"></div></div></div>
    </div></div><input type="hidden" name="importfile" id="id_importfile" value="719612275" class="filepickerhidden"/><noscript>&lt;div&gt;&lt;object type='text/html' data='http://35.169.62.69/repository/draftfiles_manager.php?env=filepicker&amp;amp;action=browse&amp;amp;itemid=719612275&amp;amp;subdirs=0&amp;amp;maxbytes=-1&amp;amp;maxfiles=1&amp;amp;ctx_id=1&amp;amp;course=1&amp;amp;sesskey=20GiwB4Ohl' height='160' width='600' style='border:1px solid #000'&gt;&lt;/object&gt;&lt;/div&gt;</noscript>
        <div class="form-control-feedback" id="id_error_importfile" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="id_delimiter_name">
            CSV delimiter
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="select">
        <select class="custom-select" name="delimiter_name" id="id_delimiter_name">
            <option value="comma" selected="">,</option>
            <option value="semicolon">;</option>
            <option value="colon">:</option>
            <option value="tab">\t</option>
        </select>
        <div class="form-control-feedback" id="id_error_delimiter_name" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem   ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="id_encoding">
            Encoding
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="select">
        <select class="custom-select" name="encoding" id="id_encoding">
            <option value="UTF-8" selected="">UTF-8</option>
            <option value="ISO-8859-1">ISO-8859-1</option>
            <option value="ASCII">ASCII</option>
            <option value="ISO-8859-2">ISO-8859-2</option>
            <option value="ISO-8859-3">ISO-8859-3</option>
            <option value="ISO-8859-4">ISO-8859-4</option>
            <option value="ISO-8859-5">ISO-8859-5</option>
            <option value="ISO-8859-6">ISO-8859-6</option>
            <option value="ISO-8859-7">ISO-8859-7</option>
            <option value="ISO-8859-8">ISO-8859-8</option>
            <option value="ISO-8859-9">ISO-8859-9</option>
            <option value="ISO-8859-10">ISO-8859-10</option>
            <option value="ISO-8859-13">ISO-8859-13</option>
            <option value="ISO-8859-14">ISO-8859-14</option>
            <option value="ISO-8859-15">ISO-8859-15</option>
            <option value="ISO-8859-11">ISO-8859-11</option>
            <option value="WINDOWS-874">WINDOWS-874</option>
            <option value="WINDOWS-1250">WINDOWS-1250</option>
            <option value="WINDOWS-1251">WINDOWS-1251</option>
            <option value="WINDOWS-1252">WINDOWS-1252</option>
            <option value="WINDOWS-1253">WINDOWS-1253</option>
            <option value="WINDOWS-1254">WINDOWS-1254</option>
            <option value="WINDOWS-1255">WINDOWS-1255</option>
            <option value="WINDOWS-1256">WINDOWS-1256</option>
            <option value="WINDOWS-1257">WINDOWS-1257</option>
            <option value="WINDOWS-1258">WINDOWS-1258</option>
            <option value="KOI-8R">KOI-8R</option>
            <option value="MACROMAN">MACROMAN</option>
            <option value="GB2312">GB2312</option>
            <option value="BIG5">BIG5</option>
            <option value="EUC-JP">EUC-JP</option>
            <option value="SHIFT_JIS">SHIFT_JIS</option>
            <option value="EUC-KR">EUC-KR</option>
            <option value="UTF-7">UTF-7</option>
            <option value="UTF-16">UTF-16</option>
            <option value="UTF-32">UTF-32</option>
            <option value="UCS-2">UCS-2</option>
            <option value="UCS-4">UCS-4</option>
        </select>
        <div class="form-control-feedback" id="id_error_encoding" style={{display: 'none'}}>
            
        </div>
    </div>
</div><div class="form-group row  fitem femptylabel  ">
    <div class="col-md-3">
        <span class="pull-right text-nowrap">
            
            
            
        </span>
        <label class="col-form-label d-inline " for="id_submitbutton">
            
        </label>
    </div>
    <div class="col-md-9 form-inline felement" data-fieldtype="submit">
            <input type="submit" class="btn btn-primary" name="submitbutton" id="id_submitbutton" value="Import"/>
        <div class="form-control-feedback" id="id_error_submitbutton" style={{display: 'none'}}>
            
        </div>
    </div>
</div>
    <div class="fdescription required">There are required fields in this form marked <i class="icon fa fa-exclamation-circle text-danger fa-fw " aria-hidden="true" title="Required field" aria-label="Required field"></i>.</div>
</form>
                        </div>

                        <div class="tab-pane" id="export-competency">
                          <p class="lead">Export competency framework</p>

                          No competency frameworks have been created yet



                        </div>

                        <div class="tab-pane" id="competency-frameworks">
                          <p class="lead">Competency frameworks</p>

                          <div data-region="managecompetencies">
<div class="">
    <div class="pull-left">
    <form method="get" action="http://35.169.62.69/admin/tool/lp/editcompetencyframework.php">
            <input type="hidden" name="pagecontextid" value="1"/>
        <button type="submit" class="btn btn-default" id="single_button5a5db4795d04213" title="">Add new competency framework</button>
    </form>
</div>
    <div class="pull-left">
    <form method="get" action="https://moodle.net/competencies">
        <button type="submit" class="btn btn-default" id="single_button5a5db4795d04214" title="">Competency frameworks repository</button>
    </form>
</div>
</div>
<table class="table fullwidth managecompetencies">
    <caption>List of competency frameworks</caption>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Competencies</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody class="drag-parentnode">
    </tbody>
</table>
<p class="alert alert-info">
    No competency frameworks have been created yet.
</p>


</div>


                        </div>

                        <div class="tab-pane" id="learning-plan-templates">
                          <p class="lead">Learning plan templates</p>

                          <div data-region="managetemplates" id="yui_3_17_2_1_1516091017520_21">
<div class="pull-left">
    <div class="singlebutton">
    <form method="get" action="http://35.169.62.69/admin/tool/lp/edittemplate.php">
            <input type="hidden" name="pagecontextid" value="1"/>
        <button type="submit" class="btn btn-default" id="single_button5a5db68b0786613" title="">Add new learning plan template</button>
    </form>
</div>
</div>
<table class="table fullwidth managetemplates" id="yui_3_17_2_1_1516091017520_20">
    <caption id="yui_3_17_2_1_1516091017520_19">List of learning plan templates</caption>
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Cohorts</th>
            <th scope="col">Learning plans</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody class="drag-parentnode">
    </tbody>
</table>
<p class="alert alert-info">
    No learning plan templates have been created yet.
</p>


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
            </div>

        );
    }
}

export default competenciesComponent;

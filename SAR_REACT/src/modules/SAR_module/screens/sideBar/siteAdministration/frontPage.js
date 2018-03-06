import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class frontPageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
            <div>
                <div class="right_col" role="main" style={{ marginLeft: '0px' }}>
                    <div class="">
                        <div class="page-title">
                            <div class="title_left">
                                <h3>Front page settings</h3>
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
                        </div>

                        <div class="clearfix"></div>

                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="x_panel">
                                    <div class="x_title">
                                        <h2>Front page settings</h2>

                                        <div class="clearfix"></div>
                                    </div>
                                    <div class="x_content">
                                        <div class="col-md-10">
                                            <p class="lead">Front page settings </p>
                                            <fieldset id="yui_3_17_2_1_1516095189572_301">
                                                <div class="clearer"></div>
                                                <div class="form-item row" id="admin-fullname">
                                                    <div class="form-label col-sm-3 text-sm-right" id="yui_3_17_2_1_1516095189572_355">
                                                        <label for="id_s__fullname" id="yui_3_17_2_1_1516095189572_354">
                                                            Full site name
        </label>
                                                        <span class="form-shortname d-block small text-muted">fullname</span>
                                                    </div>
                                                    <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516095189572_363">
                                                        <div class="form-text defaultsnext" id="yui_3_17_2_1_1516095189572_362">
                                                            <input type="text" name="s__fullname" value="ComplianceCompendium" size="30" id="id_s__fullname" class="form-control " />
                                                        </div>
                                                        <div class="form-description m-t-1"></div>
                                                    </div>
                                                </div><div class="form-item row" id="admin-shortname">
                                                    <div class="form-label col-sm-3 text-sm-right">
                                                        <label for="id_s__shortname">
                                                            Short name for site (eg single word)
        </label>
                                                        <span class="form-shortname d-block small text-muted">shortname</span>
                                                    </div>
                                                    <div class="form-setting col-sm-9">
                                                        <div class="form-text defaultsnext">
                                                            <input type="text" name="s__shortname" value="compliance" size="30" id="id_s__shortname" class="form-control "/>
</div>
                                                            <div class="form-description m-t-1"></div>
                                                        </div>
                                                    </div><div class="form-item row" id="admin-summary">
                                                        <div class="form-label col-sm-3 text-sm-right">
                                                            <label for="id_s__summary" id="yui_3_17_2_1_1516095189572_51">
                                                                Front page summary
        </label>
                                                            <span class="form-shortname d-block small text-muted">summary</span>
                                                        </div>
                                                        <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516095189572_300">
                                                            <div class="btn-toolbar editor" data-role="editor-toolbar" data-target="#editor-one">
                                                                <div class="btn-group">
                                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font"><i class="fa fa-font"></i><b class="caret"></b></a>
                                                                    <ul class="dropdown-menu">
                                                                    </ul>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Font Size"><i class="fa fa-text-height"></i>&nbsp;<b class="caret"></b></a>
                                                                    <ul class="dropdown-menu">
                                                                        <li>
                                                                            <a data-edit="fontSize 5">
                                                                                <p style={{fontSize:'17px'}}>Huge</p>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a data-edit="fontSize 3">
                                                                                <p style={{fontSize:'14px'}}>Normal</p>
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a data-edit="fontSize 1">
                                                                                <p style={{fontSize:'11px'}}>Small</p>
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn" data-edit="bold" title="Bold (Ctrl/Cmd+B)"><i class="fa fa-bold"></i></a>
                                                                    <a class="btn" data-edit="italic" title="Italic (Ctrl/Cmd+I)"><i class="fa fa-italic"></i></a>
                                                                    <a class="btn" data-edit="strikethrough" title="Strikethrough"><i class="fa fa-strikethrough"></i></a>
                                                                    <a class="btn" data-edit="underline" title="Underline (Ctrl/Cmd+U)"><i class="fa fa-underline"></i></a>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn" data-edit="insertunorderedlist" title="Bullet list"><i class="fa fa-list-ul"></i></a>
                                                                    <a class="btn" data-edit="insertorderedlist" title="Number list"><i class="fa fa-list-ol"></i></a>
                                                                    <a class="btn" data-edit="outdent" title="Reduce indent (Shift+Tab)"><i class="fa fa-dedent"></i></a>
                                                                    <a class="btn" data-edit="indent" title="Indent (Tab)"><i class="fa fa-indent"></i></a>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn" data-edit="justifyleft" title="Align Left (Ctrl/Cmd+L)"><i class="fa fa-align-left"></i></a>
                                                                    <a class="btn" data-edit="justifycenter" title="Center (Ctrl/Cmd+E)"><i class="fa fa-align-center"></i></a>
                                                                    <a class="btn" data-edit="justifyright" title="Align Right (Ctrl/Cmd+R)"><i class="fa fa-align-right"></i></a>
                                                                    <a class="btn" data-edit="justifyfull" title="Justify (Ctrl/Cmd+J)"><i class="fa fa-align-justify"></i></a>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn dropdown-toggle" data-toggle="dropdown" title="Hyperlink"><i class="fa fa-link"></i></a>
                                                                    <div class="dropdown-menu input-append">
                                                                        <input class="span2" placeholder="URL" type="text" data-edit="createLink" />
                                                                        <button class="btn" type="button">Add</button>
                                                                    </div>
                                                                    <a class="btn" data-edit="unlink" title="Remove Hyperlink"><i class="fa fa-cut"></i></a>
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>
                                                                    <input type="file" data-role="magic-overlay" data-target="#pictureBtn" data-edit="insertImage" />
                                                                </div>

                                                                <div class="btn-group">
                                                                    <a class="btn" data-edit="undo" title="Undo (Ctrl/Cmd+Z)"><i class="fa fa-undo"></i></a>
                                                                    <a class="btn" data-edit="redo" title="Redo (Ctrl/Cmd+Y)"><i class="fa fa-repeat"></i></a>
                                                                </div>
                                                            </div>

                                                            <div id="editor-one" class="editor-wrapper"></div>

                                                            <textarea name="descr" id="descr" style={{display:'none'}}></textarea>

                                                            <br />

                                                            <div class="ln_solid"></div>

                                                            <div class="form-description m-t-1"><p>This summary can be displayed on the front page using the course/site summary block.</p>
                                                            </div>
                                                        </div>
                                                    </div><div class="form-item row" id="admin-frontpage">
                                                        <div class="form-label col-sm-3 text-sm-right">
                                                            <label>
                                                                Front page
        </label>
                                                            <span class="form-shortname d-block small text-muted">frontpage</span>
                                                        </div>
                                                        <div class="form-setting col-sm-9">
                                                            <div class="form-group">
                                                                <select id="id_s__frontpage0" name="s__frontpage[]" class="custom-select">
                                                                    <option value="0">Announcements</option>
                                                                    <option value="6" selected="">List of courses</option>
                                                                    <option value="2">List of categories</option>
                                                                    <option value="4">Combo list</option>
                                                                    <option value="7">Course search box</option>
                                                                    <option value="none">None</option>
                                                                </select>
                                                                <br/>
                                                                    <select id="id_s__frontpage1" name="s__frontpage[]" class="custom-select">
                                                                        <option value="0" selected="">Announcements</option>
                                                                        <option value="6">List of courses</option>
                                                                        <option value="2">List of categories</option>
                                                                        <option value="4">Combo list</option>
                                                                        <option value="7">Course search box</option>
                                                                        <option value="none" selected="">None</option>
                                                                    </select>
                                                                    <br/>
                                                                        <select id="id_s__frontpage2" name="s__frontpage[]" class="custom-select">
                                                                            <option value="0" selected="">Announcements</option>
                                                                            <option value="6">List of courses</option>
                                                                            <option value="2">List of categories</option>
                                                                            <option value="4">Combo list</option>
                                                                            <option value="7">Course search box</option>
                                                                            <option value="none" selected="">None</option>
                                                                        </select>
                                                                        <br/>
                                                                            <select id="id_s__frontpage3" name="s__frontpage[]" class="custom-select">
                                                                                <option value="0" selected="">Announcements</option>
                                                                                <option value="6">List of courses</option>
                                                                                <option value="2">List of categories</option>
                                                                                <option value="4">Combo list</option>
                                                                                <option value="7">Course search box</option>
                                                                                <option value="none" selected="">None</option>
                                                                            </select>
                                                                            <br/>
                                                                                <select id="id_s__frontpage4" name="s__frontpage[]" class="custom-select">
                                                                                    <option value="0" selected="">Announcements</option>
                                                                                    <option value="6">List of courses</option>
                                                                                    <option value="2">List of categories</option>
                                                                                    <option value="4">Combo list</option>
                                                                                    <option value="7">Course search box</option>
                                                                                    <option value="none" selected="">None</option>
                                                                                </select>
                                                                                <br/>
</div>
                                                                                <div class="form-description m-t-1"><p>The items selected above will be displayed on the site's front page.</p>
                                                                                </div>
    </div>
</div><div class="form-item row" id="admin-frontpageloggedin">
                                                                            <div class="form-label col-sm-3 text-sm-right">
                                                                                <label>
                                                                                    Front page items when logged in
        </label>
                                                                                <span class="form-shortname d-block small text-muted">frontpageloggedin</span>
                                                                            </div>
                                                                            <div class="form-setting col-sm-9">
                                                                                <div class="form-group">
                                                                                    <select id="id_s__frontpageloggedin0" name="s__frontpageloggedin[]" class="custom-select">
                                                                                        <option value="0">Announcements</option>
                                                                                        <option value="6" selected="">List of courses</option>
                                                                                        <option value="5">Enrolled courses</option>
                                                                                        <option value="2">List of categories</option>
                                                                                        <option value="4">Combo list</option>
                                                                                        <option value="7">Course search box</option>
                                                                                        <option value="none">None</option>
                                                                                    </select>
                                                                                    <br/>
                                                                                        <select id="id_s__frontpageloggedin1" name="s__frontpageloggedin[]" class="custom-select">
                                                                                            <option value="0" selected="">Announcements</option>
                                                                                            <option value="6">List of courses</option>
                                                                                            <option value="5">Enrolled courses</option>
                                                                                            <option value="2">List of categories</option>
                                                                                            <option value="4">Combo list</option>
                                                                                            <option value="7">Course search box</option>
                                                                                            <option value="none" selected="">None</option>
                                                                                        </select>
                                                                                        <br/>
                                                                                            <select id="id_s__frontpageloggedin2" name="s__frontpageloggedin[]" class="custom-select">
                                                                                                <option value="0" selected="">Announcements</option>
                                                                                                <option value="6">List of courses</option>
                                                                                                <option value="5">Enrolled courses</option>
                                                                                                <option value="2">List of categories</option>
                                                                                                <option value="4">Combo list</option>
                                                                                                <option value="7">Course search box</option>
                                                                                                <option value="none" selected="">None</option>
                                                                                            </select>
                                                                                            <br/>
                                                                                                <select id="id_s__frontpageloggedin3" name="s__frontpageloggedin[]" class="custom-select">
                                                                                                    <option value="0" selected="">Announcements</option>
                                                                                                    <option value="6">List of courses</option>
                                                                                                    <option value="5">Enrolled courses</option>
                                                                                                    <option value="2">List of categories</option>
                                                                                                    <option value="4">Combo list</option>
                                                                                                    <option value="7">Course search box</option>
                                                                                                    <option value="none" selected="">None</option>
                                                                                                </select>
                                                                                                <br/>
                                                                                                    <select id="id_s__frontpageloggedin4" name="s__frontpageloggedin[]" class="custom-select">
                                                                                                        <option value="0" selected="">Announcements</option>
                                                                                                        <option value="6">List of courses</option>
                                                                                                        <option value="5">Enrolled courses</option>
                                                                                                        <option value="2">List of categories</option>
                                                                                                        <option value="4">Combo list</option>
                                                                                                        <option value="7">Course search box</option>
                                                                                                        <option value="none" selected="">None</option>
                                                                                                    </select>
                                                                                                    <br/>
                                                                                                        <select id="id_s__frontpageloggedin5" name="s__frontpageloggedin[]" class="custom-select">
                                                                                                            <option value="0" selected="">Announcements</option>
                                                                                                            <option value="6">List of courses</option>
                                                                                                            <option value="5">Enrolled courses</option>
                                                                                                            <option value="2">List of categories</option>
                                                                                                            <option value="4">Combo list</option>
                                                                                                            <option value="7">Course search box</option>
                                                                                                            <option value="none" selected="">None</option>
                                                                                                        </select>
                                                                                                        <br/>
</div>
                                                                                                        <div class="form-description m-t-1"><p>The items selected above will be displayed on the site's front page when a user is logged in.</p>
                                                                                                        </div>
    </div>
</div><div class="form-item row" id="admin-maxcategorydepth">
                                                                                                    <div class="form-label col-sm-3 text-sm-right">
                                                                                                        <label for="id_s__maxcategorydepth">
                                                                                                            Maximum category depth
        </label>
                                                                                                        <span class="form-shortname d-block small text-muted">maxcategorydepth</span>
                                                                                                    </div>
                                                                                                    <div class="form-setting col-sm-9">
                                                                                                        <div class="form-select defaultsnext">
                                                                                                            <select id="id_s__maxcategorydepth" name="s__maxcategorydepth" class="custom-select">
                                                                                                                <option value="0">Unlimited</option>
                                                                                                                <option value="1">1</option>
                                                                                                                <option value="2" selected="">2</option>
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
                                                                                                                <option value="16">16</option>
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
                                                                                                                <option value="32">32</option>
                                                                                                                <option value="33">33</option>
                                                                                                                <option value="34">34</option>
                                                                                                                <option value="35">35</option>
                                                                                                                <option value="36">36</option>
                                                                                                                <option value="37">37</option>
                                                                                                                <option value="38">38</option>
                                                                                                                <option value="39">39</option>
                                                                                                                <option value="40">40</option>
                                                                                                                <option value="41">41</option>
                                                                                                                <option value="42">42</option>
                                                                                                                <option value="43">43</option>
                                                                                                                <option value="44">44</option>
                                                                                                                <option value="45">45</option>
                                                                                                                <option value="46">46</option>
                                                                                                                <option value="47">47</option>
                                                                                                                <option value="48">48</option>
                                                                                                                <option value="49">49</option>
                                                                                                                <option value="50">50</option>
                                                                                                                <option value="51">51</option>
                                                                                                                <option value="52">52</option>
                                                                                                                <option value="53">53</option>
                                                                                                                <option value="54">54</option>
                                                                                                                <option value="55">55</option>
                                                                                                                <option value="56">56</option>
                                                                                                                <option value="57">57</option>
                                                                                                                <option value="58">58</option>
                                                                                                                <option value="59">59</option>
                                                                                                                <option value="60">60</option>
                                                                                                                <option value="61">61</option>
                                                                                                                <option value="62">62</option>
                                                                                                                <option value="63">63</option>
                                                                                                                <option value="64">64</option>
                                                                                                                <option value="65">65</option>
                                                                                                                <option value="66">66</option>
                                                                                                                <option value="67">67</option>
                                                                                                                <option value="68">68</option>
                                                                                                                <option value="69">69</option>
                                                                                                                <option value="70">70</option>
                                                                                                                <option value="71">71</option>
                                                                                                                <option value="72">72</option>
                                                                                                                <option value="73">73</option>
                                                                                                                <option value="74">74</option>
                                                                                                                <option value="75">75</option>
                                                                                                                <option value="76">76</option>
                                                                                                                <option value="77">77</option>
                                                                                                                <option value="78">78</option>
                                                                                                                <option value="79">79</option>
                                                                                                                <option value="80">80</option>
                                                                                                                <option value="81">81</option>
                                                                                                                <option value="82">82</option>
                                                                                                                <option value="83">83</option>
                                                                                                                <option value="84">84</option>
                                                                                                                <option value="85">85</option>
                                                                                                                <option value="86">86</option>
                                                                                                                <option value="87">87</option>
                                                                                                                <option value="88">88</option>
                                                                                                                <option value="89">89</option>
                                                                                                                <option value="90">90</option>
                                                                                                                <option value="91">91</option>
                                                                                                                <option value="92">92</option>
                                                                                                                <option value="93">93</option>
                                                                                                                <option value="94">94</option>
                                                                                                                <option value="95">95</option>
                                                                                                                <option value="96">96</option>
                                                                                                                <option value="97">97</option>
                                                                                                                <option value="98">98</option>
                                                                                                                <option value="99">99</option>
                                                                                                            </select>
                                                                                                        </div>
                                                                                                        <div class="form-defaultinfo text-muted ">Default: 2</div>
                                                                                                        <div class="form-description m-t-1"><p>This specifies the maximum depth of child categories expanded when displaying categories or combo list. Deeper level categories will appear as links and user can expand them with AJAX request.</p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div><div class="form-item row" id="admin-frontpagecourselimit">
                                                                                                    <div class="form-label col-sm-3 text-sm-right">
                                                                                                        <label for="id_s__frontpagecourselimit">
                                                                                                            Maximum number of courses
        </label>
                                                                                                        <span class="form-shortname d-block small text-muted">frontpagecourselimit</span>
                                                                                                    </div>
                                                                                                    <div class="form-setting col-sm-9">
                                                                                                        <div class="form-text defaultsnext">
                                                                                                            <input type="text" name="s__frontpagecourselimit" value="200" size="5" id="id_s__frontpagecourselimit" class="form-control text-ltr"/>
</div>
                                                                                                            <div class="form-defaultinfo text-muted text-ltr">Default: 200</div>
                                                                                                            <div class="form-description m-t-1"><p>Maximum number of courses to be displayed on the site's front page in course listings.</p>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div><div class="form-item row" id="admin-numsections">
                                                                                                        <div class="form-label col-sm-3 text-sm-right">
                                                                                                            <label for="id_s__numsections">
                                                                                                                Include a topic section
        </label>
                                                                                                            <span class="form-shortname d-block small text-muted">numsections</span>
                                                                                                        </div>
                                                                                                        <div class="form-setting col-sm-9">
                                                                                                            <div class="form-checkbox defaultsnext">
                                                                                                                <input type="hidden" name="s__numsections" value="0"/>
                                                                                                                    <input type="checkbox" name="s__numsections" value="1" id="id_s__numsections" checked=""/>
</div>
                                                                                                                    <div class="form-defaultinfo text-muted ">Default: Yes</div>
                                                                                                                    <div class="form-description m-t-1"><p>If selected, a topic section will be displayed on the site's front page.</p>
                                                                                                                    </div>
    </div>
                                                                                                            </div><div class="form-item row" id="admin-newsitems">
                                                                                                                <div class="form-label col-sm-3 text-sm-right">
                                                                                                                    <label for="id_s__newsitems">
                                                                                                                        Number of announcements
        </label>
                                                                                                                    <span class="form-shortname d-block small text-muted">newsitems</span>
                                                                                                                </div>
                                                                                                                <div class="form-setting col-sm-9">
                                                                                                                    <div class="form-select defaultsnext">
                                                                                                                        <select id="id_s__newsitems" name="s__newsitems" class="custom-select">
                                                                                                                            <option value="0">0</option>
                                                                                                                            <option value="1">1</option>
                                                                                                                            <option value="2">2</option>
                                                                                                                            <option value="3" selected="">3</option>
                                                                                                                            <option value="4">4</option>
                                                                                                                            <option value="5">5</option>
                                                                                                                            <option value="6">6</option>
                                                                                                                            <option value="7">7</option>
                                                                                                                            <option value="8">8</option>
                                                                                                                            <option value="9">9</option>
                                                                                                                            <option value="10">10</option>
                                                                                                                        </select>
                                                                                                                    </div>
                                                                                                                    <div class="form-defaultinfo text-muted ">Default: 3</div>
                                                                                                                    <div class="form-description m-t-1"></div>
                                                                                                                </div>
                                                                                                            </div><div class="form-item row" id="admin-commentsperpage">
                                                                                                                <div class="form-label col-sm-3 text-sm-right">
                                                                                                                    <label for="id_s__commentsperpage">
                                                                                                                        Comments displayed per page
        </label>
                                                                                                                    <span class="form-shortname d-block small text-muted">commentsperpage</span>
                                                                                                                </div>
                                                                                                                <div class="form-setting col-sm-9">
                                                                                                                    <div class="form-text defaultsnext">
                                                                                                                        <input type="text" name="s__commentsperpage" value="15" size="5" id="id_s__commentsperpage" class="form-control text-ltr"/>
</div>
                                                                                                                        <div class="form-defaultinfo text-muted text-ltr">Default: 15</div>
                                                                                                                        <div class="form-description m-t-1"></div>
                                                                                                                    </div>
                                                                                                                </div><div class="form-item row" id="admin-defaultfrontpageroleid">
                                                                                                                    <div class="form-label col-sm-3 text-sm-right">
                                                                                                                        <label for="id_s__defaultfrontpageroleid">
                                                                                                                            Default frontpage role
        </label>
                                                                                                                        <span class="form-shortname d-block small text-muted">defaultfrontpageroleid</span>
                                                                                                                    </div>
                                                                                                                    <div class="form-setting col-sm-9">
                                                                                                                        <div class="form-select defaultsnext">
                                                                                                                            <select id="id_s__defaultfrontpageroleid" name="s__defaultfrontpageroleid" class="custom-select">
                                                                                                                                <option value="5">Student (student)</option>
                                                                                                                                <option value="6">Guest (guest)</option>
                                                                                                                                <option value="8" selected="">Authenticated user on frontpage (frontpage)</option>
                                                                                                                            </select>
                                                                                                                        </div>
                                                                                                                        <div class="form-defaultinfo text-muted ">Default: Authenticated user on frontpage (frontpage)</div>
                                                                                                                        <div class="form-description m-t-1"></div>
                                                                                                                    </div>
                                                                                                                </div></fieldset>

                                                                                                            <div class="row form-group">
                                                                                                                <div class="col-sm-offset-3 col-sm-3">
                                                                                                                    <button type="submit" class="btn btn-primary">Save changes</button>
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

export default frontPageComponent;

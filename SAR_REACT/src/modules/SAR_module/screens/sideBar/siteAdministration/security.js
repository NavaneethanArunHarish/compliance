import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class securityComponent extends Component {
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
                <h3>Security</h3>
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
                    <h2>Security</h2>
                   
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <div class="col-xs-2">
                      <ul class="nav nav-tabs tabs-left">
                        <li class="active"><a href="#ip-blocker" data-toggle="tab">IP blocker</a>
                        </li>
                        <li><a href="#site-policies" data-toggle="tab">Site policies</a>
                        </li>
                        <li><a href="#http-security" data-toggle="tab">HTTP security</a>
                        </li>
                        <li><a href="#snotifications" data-toggle="tab">Notifications</a>
                        </li>
                      </ul>
                    </div>

                    <div class="col-xs-10">
                      <div class="tab-content">
                        <div class="tab-pane active" id="ip-blocker">
                          <p class="lead">IP blocker</p>
                          <fieldset id="yui_3_17_2_1_1516094583003_43">
<div class="clearer"></div>
<div class="form-item row" id="admin-allowbeforeblock">
    <div class="form-label col-sm-3 text-sm-right" id="yui_3_17_2_1_1516094583003_42">
        <label for="id_s__allowbeforeblock" id="yui_3_17_2_1_1516094583003_41">
            Allowed list will be processed first
        </label>
        <span class="form-shortname d-block small text-muted">allowbeforeblock</span>
    </div>
    <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516094583003_57">
        <div class="form-checkbox defaultsnext" id="yui_3_17_2_1_1516094583003_56">
    <input type="hidden" name="s__allowbeforeblock" value="0"/>
    <input type="checkbox" name="s__allowbeforeblock" value="1" id="id_s__allowbeforeblock"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>By default, entries in the blocked IPs list are matched first. If this option is enabled, entries in the allowed IPs list are processed before the blocked list.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-allowedip">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__allowedip">
            Allowed IP list
        </label>
        <span class="form-shortname d-block small text-muted">allowedip</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-textarea">
    <textarea rows="8" cols="60" id="id_s__allowedip" name="s__allowedip" spellcheck="true" class="form-control text-ltr"></textarea>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>Put every entry on one line. Valid entries are either full IP address (such as <b>192.168.10.1</b>) which matches a single host; or partial address (such as <b>192.168</b>) which matches any address starting with those numbers; or CIDR notation (such as <b>231.54.211.0/20</b>); or a range of IP addresses (such as <b>231.3.56.10-20</b>) where the range applies to the last part of the address. Text domain names (like 'example.com') are not supported. Blank lines are ignored.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-blockedip">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__blockedip">
            Blocked IP List
        </label>
        <span class="form-shortname d-block small text-muted">blockedip</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-textarea">
    <textarea rows="8" cols="60" id="id_s__blockedip" name="s__blockedip" spellcheck="true" class="form-control text-ltr"></textarea>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>Put every entry on one line. Valid entries are either full IP address (such as <b>192.168.10.1</b>) which matches a single host; or partial address (such as <b>192.168</b>) which matches any address starting with those numbers; or CIDR notation (such as <b>231.54.211.0/20</b>); or a range of IP addresses (such as <b>231.3.56.10-20</b>) where the range applies to the last part of the address. Text domain names (like 'example.com') are not supported. Blank lines are ignored.</p>
</div>
    </div>
</div></fieldset>

<div class="row">
                <div class="col-md-offset-3 col-md-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
                          
                        </div>
                        <div class="tab-pane" id="site-policies">
                          <p class="lead">Site policies</p>
                          <fieldset>
<div class="clearer"></div>
<div class="form-item row" id="admin-protectusernames">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__protectusernames">
            Protect usernames
        </label>
        <span class="form-shortname d-block small text-muted">protectusernames</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__protectusernames" value="0"/>
    <input type="checkbox" name="s__protectusernames" value="1" id="id_s__protectusernames" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>By default forget_password.php does not display any hints that would allow guessing of usernames or email addresses.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-forcelogin">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__forcelogin">
            Force users to log in
        </label>
        <span class="form-shortname d-block small text-muted">forcelogin</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__forcelogin" value="0"/>
    <input type="checkbox" name="s__forcelogin" value="1" id="id_s__forcelogin"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>Normally, the front page of the site and the course listings (but not courses) can be read by people without logging in to the site.  If you want to force people to log in before they do ANYTHING on the site, then you should enable this setting.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-forceloginforprofiles">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__forceloginforprofiles">
            Force users to log in for profiles
        </label>
        <span class="form-shortname d-block small text-muted">forceloginforprofiles</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__forceloginforprofiles" value="0"/>
    <input type="checkbox" name="s__forceloginforprofiles" value="1" id="id_s__forceloginforprofiles" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>This setting forces people to log in as a real (non-guest) account before viewing any user's profile. If you disabled this setting, you may find that some users post advertising (spam) or other inappropriate content in their profiles, which is then visible to the whole world.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-forceloginforprofileimage">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__forceloginforprofileimage">
            Force users to log in to view user pictures
        </label>
        <span class="form-shortname d-block small text-muted">forceloginforprofileimage</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__forceloginforprofileimage" value="0"/>
    <input type="checkbox" name="s__forceloginforprofileimage" value="1" id="id_s__forceloginforprofileimage"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If enabled, users must log in in order to view user profile pictures and the default user picture will be used in all notification emails.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-opentogoogle">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__opentogoogle">
            Open to Google
        </label>
        <span class="form-shortname d-block small text-muted">opentogoogle</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__opentogoogle" value="0"/>
    <input type="checkbox" name="s__opentogoogle" value="1" id="id_s__opentogoogle"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If you enable this setting, then Google will be allowed to enter your site as a Guest.  In addition, people coming in to your site via a Google search will automatically be logged in as a Guest.  Note that this only provides transparent access to courses that already allow guest access.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-allowindexing">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__allowindexing">
            Allow indexing by search engines
        </label>
        <span class="form-shortname d-block small text-muted">allowindexing</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__allowindexing" name="s__allowindexing" class="custom-select">
            <option value="0" selected="">Everywhere except login and signup pages</option>
            <option value="1">Everywhere</option>
            <option value="2">Nowhere</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: Everywhere except login and signup pages</div>
        <div class="form-description m-t-1"><p>This determines whether to allow search engines to index your site. "Everywhere" will allow the search engines to search everywhere including login and signup pages, which means sites with Force Login turned on are still indexed. To avoid the risk of spam involved with the signup page being searchable, use "Everywhere except login and signup pages". "Nowhere" will tell search engines not to index any page. Note this is only a tag in the header of the site. It is up to the search engine to respect the tag.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-profileroles">
    <div class="form-label col-sm-3 text-sm-right">
        <label>
            Profile visible roles
        </label>
        <span class="form-shortname d-block small text-muted">profileroles</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-multicheckbox">
    <input type="hidden" name="s__profileroles[xxxxx]" value="1"/>
        <ul>
                <li>
                    <input type="checkbox" name="s__profileroles[1]" value="1" id="id_s__profileroles_1"/>
                    <label for="id_s__profileroles_1">Manager</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[2]" value="1" id="id_s__profileroles_2"/>
                    <label for="id_s__profileroles_2">Course creator</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[3]" value="1" id="id_s__profileroles_3" checked=""/>
                    <label for="id_s__profileroles_3">Teacher</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[4]" value="1" id="id_s__profileroles_4" checked=""/>
                    <label for="id_s__profileroles_4">Non-editing teacher</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[5]" value="1" id="id_s__profileroles_5" checked=""/>
                    <label for="id_s__profileroles_5">Student</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[6]" value="1" id="id_s__profileroles_6"/>
                    <label for="id_s__profileroles_6">Guest</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[7]" value="1" id="id_s__profileroles_7"/>
                    <label for="id_s__profileroles_7">Authenticated user</label>
                </li>
                <li>
                    <input type="checkbox" name="s__profileroles[8]" value="1" id="id_s__profileroles_8"/>
                    <label for="id_s__profileroles_8">Authenticated user on frontpage</label>
                </li>
        </ul>
</div>
            <div class="form-defaultinfo text-muted ">Default: Teacher, Non-editing teacher, Student</div>
        <div class="form-description m-t-1"><p>List of roles that are visible on user profiles and participation page.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-maxbytes">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__maxbytes">
            Maximum uploaded file size
        </label>
        <span class="form-shortname d-block small text-muted">maxbytes</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__maxbytes" name="s__maxbytes" class="custom-select">
            <option value="0" selected="">Site upload limit (2MB)</option>
            <option value="2097152">2MB</option>
            <option value="1048576">1MB</option>
            <option value="512000">500KB</option>
            <option value="102400">100KB</option>
            <option value="51200">50KB</option>
            <option value="10240">10KB</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: Site upload limit (2MB)</div>
        <div class="form-description m-t-1"><p>This specifies a maximum size that uploaded files can be throughout the whole site. This setting is limited by the PHP settings post_max_size and upload_max_filesize, as well as the Apache setting LimitRequestBody. In turn, maxbytes limits the range of sizes that can be chosen at course level or module level. If 'Server Limit' is chosen, the server maximum allowed by the server will be used.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-userquota">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__userquota">
            User quota
        </label>
        <span class="form-shortname d-block small text-muted">userquota</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__userquota" value="104857600" size="30" id="id_s__userquota" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 104857600</div>
        <div class="form-description m-t-1"><p>The maximum number of bytes that a user can store in their own private file area. 104857600 bytes == 100MB</p>
</div>
    </div>
</div><div class="form-item row" id="admin-allowobjectembed">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__allowobjectembed">
            Allow EMBED and OBJECT tags
        </label>
        <span class="form-shortname d-block small text-muted">allowobjectembed</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__allowobjectembed" value="0"/>
    <input type="checkbox" name="s__allowobjectembed" value="1" id="id_s__allowobjectembed"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>As a default security measure, normal users are not allowed to embed multimedia (like Flash) within texts using explicit EMBED and OBJECT tags in their HTML (although it can still be done safely using the mediaplugins filter).  If you wish to allow these tags then enable this option.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-enabletrusttext">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__enabletrusttext">
            Enable trusted content
        </label>
        <span class="form-shortname d-block small text-muted">enabletrusttext</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__enabletrusttext" value="0"/>
    <input type="checkbox" name="s__enabletrusttext" value="1" id="id_s__enabletrusttext"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>By default Moodle will always thoroughly clean text that comes from users to remove any possible bad scripts, media etc that could be a security risk.  The Trusted Content system is a way of giving particular users that you trust the ability to include these advanced features in their content without interference.  To enable this system, you need to first enable this setting, and then grant the Trusted Content permission to a specific Moodle role.  Texts created or uploaded by such users will be marked as trusted and will not be cleaned before display.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-maxeditingtime">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__maxeditingtime">
            Maximum time to edit posts
        </label>
        <span class="form-shortname d-block small text-muted">maxeditingtime</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__maxeditingtime" name="s__maxeditingtime" class="custom-select">
            <option value="60">1 minutes</option>
            <option value="300">5 minutes</option>
            <option value="900">15 minutes</option>
            <option value="1800" selected="">30 minutes</option>
            <option value="2700">45 minutes</option>
            <option value="3600">60 minutes</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: 30 minutes</div>
        <div class="form-description m-t-1"><p>This specifies the amount of time people have to re-edit forum postings, glossary comments etc.  Usually 30 minutes is a good value.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-extendedusernamechars">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__extendedusernamechars">
            Allow extended characters in usernames
        </label>
        <span class="form-shortname d-block small text-muted">extendedusernamechars</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__extendedusernamechars" value="0"/>
    <input type="checkbox" name="s__extendedusernamechars" value="1" id="id_s__extendedusernamechars"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>Enable this setting to allow students to use any characters in their usernames (note this does not affect their actual names).  The default is "false" which restricts usernames to be alphanumeric lowercase characters, underscore (_), hyphen (-), period (.) or at symbol (@).</p>
</div>
    </div>
</div><div class="form-item row" id="admin-sitepolicy">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__sitepolicy">
            Site policy URL
        </label>
        <span class="form-shortname d-block small text-muted">sitepolicy</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__sitepolicy" value="" size="30" id="id_s__sitepolicy" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>If you have a site policy that all registered users must see and agree to before using this site, then specify the URL to it here, otherwise leave this field blank. This setting can contain any public URL.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-sitepolicyguest">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__sitepolicyguest">
            Site policy URL for guests
        </label>
        <span class="form-shortname d-block small text-muted">sitepolicyguest</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__sitepolicyguest" value="" size="30" id="id_s__sitepolicyguest" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>If you have a site policy that all guests must see and agree to before using this site, then specify the URL to it here, otherwise leave this field blank. This setting can contain any public URL. Note: access of not-logged-in users may be prevented with forcelogin setting.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-keeptagnamecase">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__keeptagnamecase">
            Keep tag name casing
        </label>
        <span class="form-shortname d-block small text-muted">keeptagnamecase</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__keeptagnamecase" value="0"/>
    <input type="checkbox" name="s__keeptagnamecase" value="1" id="id_s__keeptagnamecase" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Check this if you want tag names to keep the original casing as entered by users who created them</p>
</div>
    </div>
</div><div class="form-item row" id="admin-profilesforenrolledusersonly">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__profilesforenrolledusersonly">
            Profiles for enrolled users only
        </label>
        <span class="form-shortname d-block small text-muted">profilesforenrolledusersonly</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__profilesforenrolledusersonly" value="0"/>
    <input type="checkbox" name="s__profilesforenrolledusersonly" value="1" id="id_s__profilesforenrolledusersonly" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>To prevent misuse by spammers, profile descriptions of users who are not yet enrolled in any course are hidden. New users must enrol in at least one course before they can add a profile description.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-cronclionly">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__cronclionly">
            Cron execution via command line only
        </label>
        <span class="form-shortname d-block small text-muted">cronclionly</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__cronclionly" value="0"/>
    <input type="checkbox" name="s__cronclionly" value="1" id="id_s__cronclionly" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Running the cron from a web browser can expose privileged information to anonymous users. Thus it is recommended to only run the cron from the command line or set a cron password for remote access.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-cronremotepassword">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__cronremotepassword">
            Cron password for remote access
        </label>
        <span class="form-shortname d-block small text-muted">cronremotepassword</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-password">
    <span data-passwordunmask="wrapper" data-passwordunmaskid="id_s__cronremotepassword">
        <span data-passwordunmask="editor">
            <input type="hidden" name="s__cronremotepassword" id="id_s__cronremotepassword" value="" data-size="30" class="form-control d-inline-block"/>
        </span>
        <a href="#" data-passwordunmask="edit" title="">
            <span data-passwordunmask="displayvalue"><span>

<em>Click to enter text</em>
</span></span>
            <i class="icon fa fa-pencil fa-fw " aria-hidden="true" title="Edit password" aria-label="Edit password"></i>
        </a>
        <a href="#" data-passwordunmask="unmask" title="">
            <i class="icon fa fa-eye fa-fw " aria-hidden="true" title="Reveal" aria-label="Reveal"></i>
        </a>
        <span data-passwordunmask="instructions" class="form-text text-muted" style={{display: 'none'}} id="id_s__cronremotepassword_instructions">
            Press enter to save changes
        </span>
    </span>
</div>
        <div class="form-description m-t-1"><p>This means that the cron.php script cannot be run from a web browser without supplying the password using the following form of URL:</p>

<pre>    http://site.example.com/admin/cron.php?password=opensesame
</pre>

<p>If this is left empty, no password is required.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-enablerunnow">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s_tool_task_enablerunnow">
            Allow 'Run now' for scheduled tasks
        </label>
        <span class="form-shortname d-block small text-muted">tool_task | enablerunnow</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s_tool_task_enablerunnow" value="0"/>
    <input type="checkbox" name="s_tool_task_enablerunnow" value="1" id="id_s_tool_task_enablerunnow" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Allows administrators to run a single scheduled task immediately, rather than waiting for it to run as scheduled. The task runs on the web server, so some sites may wish to disable this feature to avoid potential performance issues.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-lockoutthreshold">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__lockoutthreshold">
            Account lockout threshold
        </label>
        <span class="form-shortname d-block small text-muted">lockoutthreshold</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__lockoutthreshold" name="s__lockoutthreshold" class="custom-select">
            <option value="0" selected="">No</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>Select number of failed login attempts that result in account lockout. This feature may be abused in denial of service attacks.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-lockoutwindow">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__lockoutwindowv">
            Account lockout observation window
        </label>
        <span class="form-shortname d-block small text-muted">lockoutwindow</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-duration defaultsnext">
    <div class="form-inline">
        <input type="text" size="5" id="id_s__lockoutwindowv" name="s__lockoutwindow[v]" value="30" class="form-control text-ltr"/>
        <label class="sr-only" for="id_s__lockoutwindowu">duration units</label>
        <select id="id_s__lockoutwindowu" name="s__lockoutwindow[u]" class="form-control">
                <option value="604800">weeks</option>
                <option value="86400">days</option>
                <option value="3600">hours</option>
                <option value="60" selected="">minutes</option>
                <option value="1">seconds</option>
        </select>
    </div>
</div>
            <div class="form-defaultinfo text-muted ">Default: 30 minutes</div>
        <div class="form-description m-t-1"><p>Observation time for lockout threshold, if there are no failed attempts the threshold counter is reset after this time.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-lockoutduration">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__lockoutdurationv">
            Account lockout duration
        </label>
        <span class="form-shortname d-block small text-muted">lockoutduration</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-duration defaultsnext">
    <div class="form-inline">
        <input type="text" size="5" id="id_s__lockoutdurationv" name="s__lockoutduration[v]" value="30" class="form-control text-ltr"/>
        <label class="sr-only" for="id_s__lockoutdurationu">duration units</label>
        <select id="id_s__lockoutdurationu" name="s__lockoutduration[u]" class="form-control">
                <option value="604800">weeks</option>
                <option value="86400">days</option>
                <option value="3600">hours</option>
                <option value="60" selected="">minutes</option>
                <option value="1">seconds</option>
        </select>
    </div>
</div>
            <div class="form-defaultinfo text-muted ">Default: 30 minutes</div>
        <div class="form-description m-t-1"><p>Locked out account is automatically unlocked after this duration.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-passwordpolicy">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__passwordpolicy">
            Password policy
        </label>
        <span class="form-shortname d-block small text-muted">passwordpolicy</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__passwordpolicy" value="0"/>
    <input type="checkbox" name="s__passwordpolicy" value="1" id="id_s__passwordpolicy" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Turning this on will make Moodle check user passwords against a valid password policy. Use the settings below to specify your policy (they will be ignored if you set this to 'No').</p>
</div>
    </div>
</div><div class="form-item row" id="admin-minpasswordlength">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__minpasswordlength">
            Password length
        </label>
        <span class="form-shortname d-block small text-muted">minpasswordlength</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__minpasswordlength" value="8" size="5" id="id_s__minpasswordlength" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 8</div>
        <div class="form-description m-t-1"><p>Passwords must be at least these many characters long.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-minpassworddigits">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__minpassworddigits">
            Digits
        </label>
        <span class="form-shortname d-block small text-muted">minpassworddigits</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__minpassworddigits" value="1" size="5" id="id_s__minpassworddigits" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 1</div>
        <div class="form-description m-t-1"><p>Passwords must have at least these many digits.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-minpasswordlower">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__minpasswordlower">
            Lowercase letters
        </label>
        <span class="form-shortname d-block small text-muted">minpasswordlower</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__minpasswordlower" value="1" size="5" id="id_s__minpasswordlower" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 1</div>
        <div class="form-description m-t-1"><p>Passwords must have at least these many lower case letters.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-minpasswordupper">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__minpasswordupper">
            Uppercase letters
        </label>
        <span class="form-shortname d-block small text-muted">minpasswordupper</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__minpasswordupper" value="1" size="5" id="id_s__minpasswordupper" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 1</div>
        <div class="form-description m-t-1"><p>Passwords must have at least these many upper case letters.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-minpasswordnonalphanum">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__minpasswordnonalphanum">
            Non-alphanumeric characters
        </label>
        <span class="form-shortname d-block small text-muted">minpasswordnonalphanum</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__minpasswordnonalphanum" value="1" size="5" id="id_s__minpasswordnonalphanum" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 1</div>
        <div class="form-description m-t-1"><p>Passwords must have at least these many non-alphanumeric characters.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-maxconsecutiveidentchars">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__maxconsecutiveidentchars">
            Consecutive identical characters
        </label>
        <span class="form-shortname d-block small text-muted">maxconsecutiveidentchars</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__maxconsecutiveidentchars" value="0" size="5" id="id_s__maxconsecutiveidentchars" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 0</div>
        <div class="form-description m-t-1"><p>Passwords must not have more than this number of consecutive identical characters. Use 0 to disable this check.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-passwordreuselimit">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__passwordreuselimit">
            Password rotation limit
        </label>
        <span class="form-shortname d-block small text-muted">passwordreuselimit</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__passwordreuselimit" value="0" size="5" id="id_s__passwordreuselimit" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: 0</div>
        <div class="form-description m-t-1"><p>Number of times a user must change their password before they are allowed to reuse a password. Hashes of previously used passwords are stored in local database table. This feature might not be compatible with some external authentication plugins.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-pwresettime">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__pwresettime">
            Maximum time to validate password reset request
        </label>
        <span class="form-shortname d-block small text-muted">pwresettime</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__pwresettime" name="s__pwresettime" class="custom-select">
            <option value="300">5 minutes</option>
            <option value="900">15 minutes</option>
            <option value="1800" selected="">30 minutes</option>
            <option value="2700">45 minutes</option>
            <option value="3600">60 minutes</option>
            <option value="7200">120 minutes</option>
            <option value="14400">240 minutes</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: 30 minutes</div>
        <div class="form-description m-t-1"><p>This specifies the amount of time people have to validate a password reset request before it expires. Usually 30 minutes is a good value.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-passwordchangelogout">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__passwordchangelogout">
            Log out after password change
        </label>
        <span class="form-shortname d-block small text-muted">passwordchangelogout</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__passwordchangelogout" value="0"/>
    <input type="checkbox" name="s__passwordchangelogout" value="1" id="id_s__passwordchangelogout"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If enabled, when a password is changed, all browser sessions are terminated, apart from the one in which the new password is specified. (This setting does not affect password changes via bulk user upload.)</p>
</div>
    </div>
</div><div class="form-item row" id="admin-passwordchangetokendeletion">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__passwordchangetokendeletion">
            Remove web service access tokens after password change
        </label>
        <span class="form-shortname d-block small text-muted">passwordchangetokendeletion</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__passwordchangetokendeletion" value="0"/>
    <input type="checkbox" name="s__passwordchangetokendeletion" value="1" id="id_s__passwordchangetokendeletion"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If enabled, when a password is changed, all the user web service access tokens are deleted.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-tokenduration">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__tokendurationv">
            User created token duration
        </label>
        <span class="form-shortname d-block small text-muted">tokenduration</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-duration defaultsnext">
    <div class="form-inline">
        <input type="text" size="5" id="id_s__tokendurationv" name="s__tokenduration[v]" value="12" class="form-control text-ltr"/>
        <label class="sr-only" for="id_s__tokendurationu">duration units</label>
        <select id="id_s__tokendurationu" name="s__tokenduration[u]" class="form-control">
                <option value="604800" selected="">weeks</option>
                <option value="86400">days</option>
                <option value="3600">hours</option>
                <option value="60">minutes</option>
                <option value="1">seconds</option>
        </select>
    </div>
</div>
            <div class="form-defaultinfo text-muted ">Default: 12 weeks</div>
        <div class="form-description m-t-1"><p>Length of time for which a web services token created by a user (for example via the mobile app) is valid.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-groupenrolmentkeypolicy">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__groupenrolmentkeypolicy">
            Group enrolment key policy
        </label>
        <span class="form-shortname d-block small text-muted">groupenrolmentkeypolicy</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__groupenrolmentkeypolicy" value="0"/>
    <input type="checkbox" name="s__groupenrolmentkeypolicy" value="1" id="id_s__groupenrolmentkeypolicy" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Turning this on will make Moodle check group enrolment keys against a valid password policy.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-disableuserimages">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__disableuserimages">
            Disable user profile images
        </label>
        <span class="form-shortname d-block small text-muted">disableuserimages</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__disableuserimages" value="0"/>
    <input type="checkbox" name="s__disableuserimages" value="1" id="id_s__disableuserimages"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>Disable the ability for users to change user profile images.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-emailchangeconfirmation">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__emailchangeconfirmation">
            Email change confirmation
        </label>
        <span class="form-shortname d-block small text-muted">emailchangeconfirmation</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__emailchangeconfirmation" value="0"/>
    <input type="checkbox" name="s__emailchangeconfirmation" value="1" id="id_s__emailchangeconfirmation" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Require an email confirmation step when users change their email address in their profile.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-rememberusername">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__rememberusername">
            Remember username
        </label>
        <span class="form-shortname d-block small text-muted">rememberusername</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__rememberusername" name="s__rememberusername" class="custom-select">
            <option value="1">Yes</option>
            <option value="0">No</option>
            <option value="2" selected="">optional</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: optional</div>
        <div class="form-description m-t-1"><p>Enable if you want to store permanent cookies with usernames during user login. Permanent cookies may be considered a privacy issue if used without consent.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-strictformsrequired">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__strictformsrequired">
            Strict validation of required fields
        </label>
        <span class="form-shortname d-block small text-muted">strictformsrequired</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__strictformsrequired" value="0"/>
    <input type="checkbox" name="s__strictformsrequired" value="1" id="id_s__strictformsrequired"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If enabled, users are prevented from entering a space or line break only in required fields in forms.</p>
</div>
    </div>
</div></fieldset>

<div class="row">
                <div class="col-md-offset-3 col-md-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>

                        </div>
                        <div class="tab-pane" id="http-security">
                           <p class="lead">HTTP security</p>
                           <fieldset id="yui_3_17_2_1_1516095017665_43">
<div class="clearer"></div>
<div class="form-item row" id="admin-cookiesecure">
    <div class="form-label col-sm-3 text-sm-right" id="yui_3_17_2_1_1516095017665_42">
        <label for="id_s__cookiesecure" id="yui_3_17_2_1_1516095017665_41">
            Secure cookies only
        </label>
        <span class="form-shortname d-block small text-muted">cookiesecure</span>
    </div>
    <div class="form-setting col-sm-9" id="yui_3_17_2_1_1516095017665_57">
        <div class="form-checkbox defaultsnext" id="yui_3_17_2_1_1516095017665_56">
    <input type="hidden" name="s__cookiesecure" value="0"/>
    <input type="checkbox" name="s__cookiesecure" value="1" id="id_s__cookiesecure" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>If server is accepting only https connections it is recommended to enable sending of secure cookies. If enabled please make sure that web server is not accepting http:// or set up permanent redirection to https:// address and ideally send HSTS headers. When <em>wwwroot</em> address does not start with https:// this setting is ignored.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-cookiehttponly">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__cookiehttponly">
            Only http cookies
        </label>
        <span class="form-shortname d-block small text-muted">cookiehttponly</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__cookiehttponly" value="0"/>
    <input type="checkbox" name="s__cookiehttponly" value="1" id="id_s__cookiehttponly"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>Enables new PHP 5.2.0 feature - browsers are instructed to send cookie with real http requests only, cookies should not be accessible by scripting languages. This is not supported in all browsers and it may not be fully compatible with current code. It helps to prevent some types of XSS attacks.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-allowframembedding">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__allowframembedding">
            Allow frame embedding
        </label>
        <span class="form-shortname d-block small text-muted">allowframembedding</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__allowframembedding" value="0"/>
    <input type="checkbox" name="s__allowframembedding" value="1" id="id_s__allowframembedding"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>If enabled, this site may be embedded in a frame in a remote system, as recommended when using the 'Publish as LTI tool' enrolment plugin. Otherwise, it is recommended to leave frame embedding disabled for security reasons.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-curlsecurityblockedhosts">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__curlsecurityblockedhosts">
            cURL blocked hosts list
        </label>
        <span class="form-shortname d-block small text-muted">curlsecurityblockedhosts</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-textarea">
    <textarea rows="8" cols="60" id="id_s__curlsecurityblockedhosts" name="s__curlsecurityblockedhosts" spellcheck="true" class="form-control text-ltr"></textarea>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>Put each entry on a new line. Valid entries are either full IPv4 or IPv6 addresses (such as 192.168.10.1, 0:0:0:0:0:0:0:1, ::1, fe80::) which match a single host; or CIDR notation (such as 231.54.211.0/20 or fe80::/64); or a range of IP addresses (such as 231.3.56.10-20 or fe80::1111-bbbb) where the range applies to the last group of the address; or domain names (such as localhost or example.com); or wildcard domain names (such as *.example.com or *.sub.example.com). Blank lines are not allowed.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-curlsecurityallowedport">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__curlsecurityallowedport">
            cURL allowed ports list
        </label>
        <span class="form-shortname d-block small text-muted">curlsecurityallowedport</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-textarea">
    <textarea rows="8" cols="60" id="id_s__curlsecurityallowedport" name="s__curlsecurityallowedport" spellcheck="true" class="form-control text-ltr"></textarea>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>List of port numbers that cURL can connect to. Valid entries are integer numbers only. Put each entry on a new line. If left empty, then all ports are allowed. If set, in almost all cases, both 443 and 80 should be specified for cURL to connect to standard HTTPS and HTTP ports.</p>
</div>
    </div>
</div><h3 class="main">HTTPS conversion tool</h3>
    <div class="generalbox formsettingheading"><p>If you are planning on converting your site to HTTPS, you can use the <a href="http://35.169.62.69/admin/tool/httpsreplace/index.php">HTTPS conversion tool</a> to convert your embedded content to HTTPS.</p>
</div></fieldset>
<div class="row">
                <div class="col-md-offset-3 col-md-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
                        </div>
                        <div class="tab-pane" id="snotifications">
                           <p class="lead">Notifications</p>

                           <fieldset>
<div class="clearer"></div>
<div class="form-item row" id="admin-displayloginfailures">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__displayloginfailures">
            Display login failures
        </label>
        <span class="form-shortname d-block small text-muted">displayloginfailures</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__displayloginfailures" value="0"/>
    <input type="checkbox" name="s__displayloginfailures" value="1" id="id_s__displayloginfailures"/>
</div>
            <div class="form-defaultinfo text-muted ">Default: No</div>
        <div class="form-description m-t-1"><p>This will display information to users about previous failed logins.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-notifyloginfailures">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__notifyloginfailures">
            Email login failures to
        </label>
        <span class="form-shortname d-block small text-muted">notifyloginfailures</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select">
    <input type="hidden" name="s__notifyloginfailures[xxxxx]" value="1"/>
    <select id="id_s__notifyloginfailures" name="s__notifyloginfailures[]" size="3" class="form-control" multiple="">
            <option value="$@NONE@$" selected="">Nobody</option>
            <option value="$@ALL@$">Everyone who can 'Change site configuration'</option>
            <option value="2">Admin User</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: Nobody</div>
        <div class="form-description m-t-1"><p>Send login failure notification messages to these selected users. This requires an internal logstore (eg Standard Logstore) to be enabled.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-notifyloginthreshold">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__notifyloginthreshold">
            Threshold for email notifications
        </label>
        <span class="form-shortname d-block small text-muted">notifyloginthreshold</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__notifyloginthreshold" name="s__notifyloginthreshold" class="custom-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10" selected="">10</option>
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
            <option value="100">100</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: 10</div>
        <div class="form-description m-t-1"><p>If notifications about failed logins are active, how many failed login attempts by one user or one IP address is it worth notifying about?</p>
</div>
    </div>
</div></fieldset>

<div class="row">
                <div class="col-sm-offset-3 col-sm-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
                        </div>
                      </div>
                    </div>

                    <div class="clearfix"></div>

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

export default securityComponent;

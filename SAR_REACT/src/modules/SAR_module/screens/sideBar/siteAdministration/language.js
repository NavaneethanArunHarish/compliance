import React, { Component } from 'react';
import '../../../../../assests/css/custom.css'

import '../../../../../assests/css/custom.min.css'

class languageComponent extends Component {
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
                <h3>Language</h3>
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
                    <h2>Language</h2>
                   
                    <div class="clearfix"></div>
                  </div>
                  <div class="x_content">

                    <div class="col-xs-3">
                      <ul class="nav nav-tabs tabs-left">



                        <li class="active"><a href="#language-settings" data-toggle="tab">Language settings</a>
                        </li>
                        <li><a href="#language-customisation" data-toggle="tab">Language customisation</a>
                        </li>
                        <li><a href="#language-packs" data-toggle="tab">Language packs</a>
                        </li>
                      </ul>
                    </div>

                    <div class="col-xs-9">
                      <div class="tab-content">
                        <div class="tab-pane active" id="language-settings">
                          <p class="lead">Language settings</p>

                          <fieldset>
<div class="clearer"></div>
<div class="form-item row" id="admin-autolang">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__autolang">
            Language autodetect
        </label>
        <span class="form-shortname d-block small text-muted">autolang</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__autolang" value="0"/>
    <input type="checkbox" name="s__autolang" value="1" id="id_s__autolang" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Detect default language from browser setting, if disabled site default is used.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-lang">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__lang">
            Default language
        </label>
        <span class="form-shortname d-block small text-muted">lang</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__lang" name="s__lang" class="custom-select">
            <option value="en" selected="">English ‎(en)‎</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: English ‎(en)‎</div>
        <div class="form-description m-t-1"><p>Choose a default language for the whole site. Users can override this setting using the language menu or the setting in their personal profile.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-langmenu">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__langmenu">
            Display language menu
        </label>
        <span class="form-shortname d-block small text-muted">langmenu</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__langmenu" value="0"/>
    <input type="checkbox" name="s__langmenu" value="1" id="id_s__langmenu" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Choose whether or not you want to display the general-purpose language menu on the home page, login page etc.  This does not affect the user's ability to set the preferred language in their own profile.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-langlist">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__langlist">
            Languages on language menu
        </label>
        <span class="form-shortname d-block small text-muted">langlist</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__langlist" value="" size="30" id="id_s__langlist" class="form-control "/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Empty</div>
        <div class="form-description m-t-1"><p>Leave this blank to allow users to choose from any language you have in this installation of Moodle.  However, you can shorten the language menu by entering a comma-separated list of language codes that you want.  For example:  en,es_es,fr,it</p>
</div>
    </div>
</div><div class="form-item row" id="admin-langcache">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__langcache">
            Cache language menu
        </label>
        <span class="form-shortname d-block small text-muted">langcache</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__langcache" value="0"/>
    <input type="checkbox" name="s__langcache" value="1" id="id_s__langcache" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Cache the language menu. If enabled, the list of available translations is cached. The cache is automatically refreshed when you install or delete a language pack via the in-built language packs management tool. If you install a new language pack manually, you have to use Purge all caches feature to refresh the cached list.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-langstringcache">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__langstringcache">
            Cache all language strings
        </label>
        <span class="form-shortname d-block small text-muted">langstringcache</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-checkbox defaultsnext">
    <input type="hidden" name="s__langstringcache" value="0"/>
    <input type="checkbox" name="s__langstringcache" value="1" id="id_s__langstringcache" checked=""/>
</div>
            <div class="form-defaultinfo text-muted ">Default: Yes</div>
        <div class="form-description m-t-1"><p>Caches all the language strings into compiled files in the data directory.  If you are translating Moodle or changing strings in the Moodle source code then you may want to switch this off.  Otherwise leave it on to see performance benefits.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-locale">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__locale">
            Sitewide locale
        </label>
        <span class="form-shortname d-block small text-muted">locale</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-text defaultsnext">
    <input type="text" name="s__locale" value="" size="30" id="id_s__locale" class="form-control text-ltr"/>
</div>
            <div class="form-defaultinfo text-muted text-ltr">Default: Empty</div>
        <div class="form-description m-t-1"><p>Choose a sitewide locale - this will override the format and language of dates for all language packs (though names of days in calendar are not affected). You need to have this locale data installed on your operating system (eg for linux en_US.UTF-8 or es_ES.UTF-8). In most cases this field should be left blank.</p>
</div>
    </div>
</div><div class="form-item row" id="admin-latinexcelexport">
    <div class="form-label col-sm-3 text-sm-right">
        <label for="id_s__latinexcelexport">
            Excel encoding
        </label>
        <span class="form-shortname d-block small text-muted">latinexcelexport</span>
    </div>
    <div class="form-setting col-sm-9">
        <div class="form-select defaultsnext">
    <select id="id_s__latinexcelexport" name="s__latinexcelexport" class="custom-select">
            <option value="0" selected="">Unicode</option>
            <option value="1">Latin</option>
    </select>
</div>
            <div class="form-defaultinfo text-muted ">Default: Unicode</div>
        <div class="form-description m-t-1"><p>Choose the encoding for Excel exports.</p>
</div>
    </div>
</div></fieldset>

<div class="row">
                <div class="col-md-offset-3 col-md-3">
                    <button type="submit" class="btn btn-primary">Save changes</button>
                </div>
            </div>
                          
                        </div>
                        <div class="tab-pane" id="language-customisation">
                        <p class="lead">Language customisation</p>

                        <div class="box langselectorbox p-y-1" id="yui_3_17_2_1_1516092602823_20"><div class="langselector d-inline-block" id="yui_3_17_2_1_1516092602823_19">
    <form method="get" action="http://35.169.62.69/admin/tool/customlang/index.php" class="form-inline" id="single_select_f5a5dbcbc9089e14">
            <label for="single_select5a5dbcbc9089e15">
                <span class="accesshide ">Language</span>
            </label>
        <select id="single_select5a5dbcbc9089e15" class="custom-select langselector" name="lng">
                    <option data-ignore="" value="" selected="">Choose...</option>
                    <option value="en">English ‎(en)‎</option>
        </select>
        <noscript>
            &lt;input type="submit" role="button" class="btn btn-secondary" value="Go"&gt;
        </noscript>
    </form>
</div></div>
                        </div>
                        <div class="tab-pane" id="language-packs">
                          <p class="lead">Language import utility</p>

                          <div class="container-fluid langimport" id="yui_3_17_2_1_1516092604773_32">
    <div class="row row-fluid rtl-compatible" id="yui_3_17_2_1_1516092604773_31">
        <div class="col-md-6 span6 m-b-1" id="yui_3_17_2_1_1516092604773_30">
            <form id="uninstallform" action="http://35.169.62.69/admin/tool/langimport/index.php?mode=4" method="post">
                <fieldset id="yui_3_17_2_1_1516092604773_29">
                    <div class="form-group" id="yui_3_17_2_1_1516092604773_28">
                        <label for="menuuninstalllang" id="yui_3_17_2_1_1516092604773_27">Installed language packs</label>
                        <select size="15" multiple="multiple" id="menuuninstalllang" class="form-control input-block-level" name="uninstalllang[]">
                                <option value="en">English ‎(en)‎‎</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="hidden" name="sesskey" value="20GiwB4Ohl"/>
                        <input id="languninstallbutton" type="submit" value="Uninstall selected language pack(s)" class="btn btn-default"/>
                    </div>
                </fieldset>
            </form>
                <div>
                    <form id="updateform" action="http://35.169.62.69/admin/tool/langimport/index.php?mode=5" method="post">
                        <fieldset>
                            <input type="submit" value="Update all installed language packs" class="btn btn-default"/>
                        </fieldset>
                    </form>
                </div>
        </div>
            <div class="col-md-6 span6 m-b-1">
                <form id="installform" action="http://35.169.62.69/admin/tool/langimport/index.php?mode=2" method="post">
                    <fieldset>
                        <div class="form-group">
                            <label for="menupack">Available language packs</label>
                            <select size="15" multiple="multiple" class="form-control input-block-level" id="menupack" name="pack[]">
                                    <option value="af">Afrikaans ‎(af)‎‎</option>
                                    <option value="am"> አማርኛ ‎(am)‎‎</option>
                                    <option value="an">Aragonés ‎(an)‎‎</option>
                                    <option value="ar">عربي ‎(ar)‎‎</option>
                                    <option value="ast">Asturianu ‎(ast)‎‎</option>
                                    <option value="az">Azərbaycanca ‎(az)‎‎</option>
                                    <option value="ba">Башҡорт теле ‎(ba)‎‎</option>
                                    <option value="be">Беларуская ‎(be)‎‎</option>
                                    <option value="bg">Български ‎(bg)‎‎</option>
                                    <option value="bi">Bislama ‎(bi)‎‎</option>
                                    <option value="bn">বাংলা ‎(bn)‎‎</option>
                                    <option value="br">Breizh ‎(br)‎‎</option>
                                    <option value="bs">Bosanski ‎(bs)‎‎</option>
                                    <option value="ca">Català ‎(ca)‎‎</option>
                                    <option value="ca_valencia">Català (Valencià) ‎(ca_valencia)‎‎</option>
                                    <option value="ckb">سۆرانی ‎(ckb)‎‎</option>
                                    <option value="cs">Čeština ‎(cs)‎‎</option>
                                    <option value="cy">Cymraeg ‎(cy)‎‎</option>
                                    <option value="da">Dansk ‎(da)‎‎</option>
                                    <option value="da_kursus">Dansk (kursus) ‎(da_kursus)‎‎</option>
                                    <option value="da_rum">Dansk Rum ‎(da_rum)‎‎</option>
                                    <option value="de">Deutsch ‎(de)‎‎</option>
                                    <option value="de_comm">Deutsch community ‎(de_comm)‎‎</option>
                                    <option value="de_du">Deutsch - Du ‎(de_du)‎‎</option>
                                    <option value="de_kids">Deutsch - Kids ‎(de_kids)‎‎</option>
                                    <option value="dsb">Dolnoserbski ‎(dsb)‎‎</option>
                                    <option value="dv">ދިވެހި ‎(dv)‎‎</option>
                                    <option value="dz">རྫོང་ཁ ‎(dz)‎‎</option>
                                    <option value="ee">Èʋegbe ‎(ee)‎‎</option>
                                    <option value="el">Ελληνικά ‎(el)‎‎</option>
                                    <option value="en_ar">English - Pirate ‎(en_ar)‎‎</option>
                                    <option value="en_kids">English for kids ‎(en_kids)‎‎</option>
                                    <option value="en_us">English - United States ‎(en_us)‎‎</option>
                                    <option value="en_us_k12">English US - K12 ‎(en_us_k12)‎‎</option>
                                    <option value="eo">Esperanto ‎(eo)‎‎</option>
                                    <option value="es">Español - Internacional ‎(es)‎‎</option>
                                    <option value="es_co">Español - Colombia ‎(es_co)‎‎</option>
                                    <option value="es_mx">Español - México ‎(es_mx)‎‎</option>
                                    <option value="es_mx_kids">Español - México para niños ‎(es_mx_kids)‎‎</option>
                                    <option value="es_ve">Español Venezuela ‎(es_ve)‎‎</option>
                                    <option value="et">eesti ‎(et)‎‎</option>
                                    <option value="eu">Euskara ‎(eu)‎‎</option>
                                    <option value="fa">فارسی ‎(fa)‎‎</option>
                                    <option value="fi">Suomi ‎(fi)‎‎</option>
                                    <option value="fi_co">Suomi+ ‎(fi_co)‎‎</option>
                                    <option value="fil">Filipino ‎(fil)‎‎</option>
                                    <option value="fj">VakaViti ‎(fj)‎‎</option>
                                    <option value="fo">Føroyskt ‎(fo)‎‎</option>
                                    <option value="fr">Français ‎(fr)‎‎</option>
                                    <option value="fr_ca">Français - Canada ‎(fr_ca)‎‎</option>
                                    <option value="ga">Gaeilge ‎(ga)‎‎</option>
                                    <option value="gd">Gàidhlig ‎(gd)‎‎</option>
                                    <option value="gl">Galego ‎(gl)‎‎</option>
                                    <option value="gu">ગુજરાતી ‎(gu)‎‎</option>
                                    <option value="ha">Hausa ‎(ha)‎‎</option>
                                    <option value="hat">Kreyòl Ayisyen ‎(hat)‎‎</option>
                                    <option value="haw">ʻŌlelo Hawaiʻi ‎(haw)‎‎</option>
                                    <option value="he">עברית ‎(he)‎‎</option>
                                    <option value="he_kids">עברית בתי־ספר ‎(he_kids)‎‎</option>
                                    <option value="hi">हिंदी ‎(hi)‎‎</option>
                                    <option value="hr">Hrvatski ‎(hr)‎‎</option>
                                    <option value="hu">magyar ‎(hu)‎‎</option>
                                    <option value="hy">Հայերեն ‎(hy)‎‎</option>
                                    <option value="id">Indonesian ‎(id)‎‎</option>
                                    <option value="ig">Igbo ‎(ig)‎‎</option>
                                    <option value="is">Íslenska ‎(is)‎‎</option>
                                    <option value="it">Italiano ‎(it)‎‎</option>
                                    <option value="ja">日本語 ‎(ja)‎‎</option>
                                    <option value="ja_kids">Japanese - kids ‎(ja_kids)‎‎</option>
                                    <option value="ka">ქართული ‎(ka)‎‎</option>
                                    <option value="kab">Taqbaylit ‎(kab)‎‎</option>
                                    <option value="kk">Қазақша ‎(kk)‎‎</option>
                                    <option value="kl">Kalaallisut ‎(kl)‎‎</option>
                                    <option value="km">ខ្មែរ ‎(km)‎‎</option>
                                    <option value="kmr">Kurmanji ‎(kmr)‎‎</option>
                                    <option value="kn">ಕನ್ನಡ ‎(kn)‎‎</option>
                                    <option value="ko">한국어 ‎(ko)‎‎</option>
                                    <option value="ky">Кыргызча ‎(ky)‎‎</option>
                                    <option value="la">Latin ‎(la)‎‎</option>
                                    <option value="lb">Lëtzebuergesch ‎(lb)‎‎</option>
                                    <option value="lo">Laotian ‎(lo)‎‎</option>
                                    <option value="lt">Lietuvių ‎(lt)‎‎</option>
                                    <option value="lt_uni">Lithuanian (university) ‎(lt_uni)‎‎</option>
                                    <option value="lv">Latviešu ‎(lv)‎‎</option>
                                    <option value="mg">Malagasy ‎(mg)‎‎</option>
                                    <option value="mh">Ebon ‎(mh)‎‎</option>
                                    <option value="mi">Māori (Te Reo) ‎(mi)‎‎</option>
                                    <option value="mi_tn">Māori - Tainui ‎(mi_tn)‎‎</option>
                                    <option value="mi_wwow">Māori - Waikato ‎(mi_wwow)‎‎</option>
                                    <option value="mis">Crnogorski ‎(mis)‎‎</option>
                                    <option value="mk">Македонски ‎(mk)‎‎</option>
                                    <option value="ml">മലയാളം ‎(ml)‎‎</option>
                                    <option value="mn">Монгол ‎(mn)‎‎</option>
                                    <option value="mn_mong">Mongolian ‎(mn_mong)‎‎</option>
                                    <option value="mr">मराठी ‎(mr)‎‎</option>
                                    <option value="ms">Bahasa Melayu ‎(ms)‎‎</option>
                                    <option value="my">myanma bhasa ‎(my)‎‎</option>
                                    <option value="ne">नेपाली ‎(ne)‎‎</option>
                                    <option value="nl">Nederlands ‎(nl)‎‎</option>
                                    <option value="nn">Norsk - nynorsk ‎(nn)‎‎</option>
                                    <option value="no">Norsk - bokmål ‎(no)‎‎</option>
                                    <option value="no_gr">Norsk ‎(no_gr)‎‎</option>
                                    <option value="oc_es">Aranés ‎(oc_es)‎‎</option>
                                    <option value="oc_gsc">Gascon ‎(oc_gsc)‎‎</option>
                                    <option value="oc_lnc">Lengadocian ‎(oc_lnc)‎‎</option>
                                    <option value="or">ଓଡ଼ିଆ ‎(or)‎‎</option>
                                    <option value="pan">ਪੰਜਾਬੀ ‎(pan)‎‎</option>
                                    <option value="pcm">Pidgin ‎(pcm)‎‎</option>
                                    <option value="pl">Polski ‎(pl)‎‎</option>
                                    <option value="ps">پښتو ‎(ps)‎‎</option>
                                    <option value="pt">Português - Portugal ‎(pt)‎‎</option>
                                    <option value="pt_br">Português - Brasil ‎(pt_br)‎‎</option>
                                    <option value="rm_surs">Romansh Sursilvan ‎(rm_surs)‎‎</option>
                                    <option value="ro">Română ‎(ro)‎‎</option>
                                    <option value="ru">Русский ‎(ru)‎‎</option>
                                    <option value="se">Davvisámegiella ‎(se)‎‎</option>
                                    <option value="si">සිංහල ‎(si)‎‎</option>
                                    <option value="sk">Slovenčina ‎(sk)‎‎</option>
                                    <option value="sl">Slovenščina ‎(sl)‎‎</option>
                                    <option value="sm">Samoan ‎(sm)‎‎</option>
                                    <option value="sma">Sørsamisk ‎(sma)‎‎</option>
                                    <option value="smj">Lulesamisk ‎(smj)‎‎</option>
                                    <option value="so">Soomaali ‎(so)‎‎</option>
                                    <option value="sq">Shqip ‎(sq)‎‎</option>
                                    <option value="sr_cr">Српски ‎(sr_cr)‎‎</option>
                                    <option value="sr_lt">Srpski ‎(sr_lt)‎‎</option>
                                    <option value="sv">Svenska ‎(sv)‎‎</option>
                                    <option value="sv_fi">Finlandssvenska ‎(sv_fi)‎‎</option>
                                    <option value="sw">Kiswahili ‎(sw)‎‎</option>
                                    <option value="ta">Tamil ‎(ta)‎‎</option>
                                    <option value="ta_lk">தமிழ் ‎(ta_lk)‎‎</option>
                                    <option value="te">తెలుగు  ‎(te)‎‎</option>
                                    <option value="tg">Тоҷикӣ ‎(tg)‎‎</option>
                                    <option value="th">Thai ‎(th)‎‎</option>
                                    <option value="ti">ትግርኛ ‎(ti)‎‎</option>
                                    <option value="tk">Turkmen ‎(tk)‎‎</option>
                                    <option value="tl">Tagalog ‎(tl)‎‎</option>
                                    <option value="tn">Setswana ‎(tn)‎‎</option>
                                    <option value="to">Tongan ‎(to)‎‎</option>
                                    <option value="tr">Türkçe ‎(tr)‎‎</option>
                                    <option value="tt">татар теле ‎(tt)‎‎</option>
                                    <option value="ug_lt">Uyghur - latin ‎(ug_lt)‎‎</option>
                                    <option value="ug_ug">ئۇيغۇرچە ‎(ug_ug)‎‎</option>
                                    <option value="uk">Українська ‎(uk)‎‎</option>
                                    <option value="ur">اردو ‎(ur)‎‎</option>
                                    <option value="uz">O'zbekcha ‎(uz)‎‎</option>
                                    <option value="vi">Vietnamese ‎(vi)‎‎</option>
                                    <option value="wo">Wolof ‎(wo)‎‎</option>
                                    <option value="xct">བོད་ཡིག ‎(xct)‎‎</option>
                                    <option value="zgh">ⵜⴰⵎⴰⵣⵉⵖⵜ ‎(zgh)‎‎</option>
                                    <option value="zh_cn">简体中文 ‎(zh_cn)‎‎</option>
                                    <option value="zh_tw">正體中文 ‎(zh_tw)‎‎</option>
                                    <option value="zu">isiZulu ‎(zu)‎‎</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input type="hidden" name="sesskey" value="20GiwB4Ohl"/>
                            <input type="submit" value="Install selected language pack(s)" class="btn btn-default"/>
                        </div>
                    </fieldset>
                </form>
            </div>
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

export default languageComponent;

<!-- Nav Bar -->
<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <!-- Brand Logo Section: Displays the company logo and provides a link to redirect to the dashboard -->
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center act_background">
        <a class="navbar-brand brand-logo mr-5 dashboard_redirect_option" href="javascript:void(0);"><img src="images/G-Analysis/g_analysisNeu6.png" class="mr-2 logo-g-analysis" alt="logo"/></a>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end act_background">
      
        <ul class="navbar-nav mr-lg-2 menu_dashboard_ul">
          <!-- Database Selection: Dropdown to switch between different project databases -->
          <li class="text-muted menu_dashboard_database">
            <select id="dashboard_database_list">
            </select>
          </li>
          <!-- Dashboard Link: Quick access to the main overview page -->
          <li><a href="javascript:void(0);" class="text-muted menu_dashboard dashboard_redirect_option">Dashboard</a></li>

          <li>
            <!-- Evaluations (Auswertungen): Dropdown containing reports, charts, and export options -->
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard">Auswertungen 
              </button>
              <div class="dropdown-content">
                <div class="row">
                  <div class="column">
                    <h3>Berichte</h3>
                    <a href="javascript:void(0);">ISO</a>
                    <div class="sub_menu_open">
                      <span> Berichte </span>
                      <i class="ti-angle-down angle-down"></i>
                      <div class="sub_menu_1_div">
                        <a href="javascript:void(0);" id="spaEfVTab1Menu" class="dashboard_sub_menu_1 dashboard_menu_click">SpaEfV_Tabelle_1</a>
                        <a href="javascript:void(0);" id="spaEfVTab2Menu" class="dashboard_sub_menu_1 dashboard_menu_click">SpaEfV_Tabelle_2</a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <h3>Diagramme</h3>
                    <div class="sub_menu_open">
                      <span>Neu erstellen</span>
                      <i class="ti-angle-down angle-down-diag"></i>
                      <div class="sub_menu_1_div">
                        <a href="javascript:void(0);" id="mstVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Messstellenvergleich</a>
                        <a href="javascript:void(0);" id="zeitVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Zeitvergleich</a>
                        <a href="javascript:void(0);" id="knzDarst" class="dashboard_sub_menu_1 dashboard_menu_click">Kennzahlendarstellung</a>
                      </div>
                    </div>
                    <div class="sub_menu_open">
                      <span>Gespeichertes Laden</span>
                      <i class="ti-angle-down angle-down-diagramme"></i>
                      <div class="sub_menu_1_div">
                        <a href="javascript:void(0);" id="mstVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click messstellen_graph">Messstellen Graph</a>
                        <a href="javascript:void(0);" id="zeitVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click zeitvergleich_graph">Zeitvergleich Graph</a>
                        <a href="javascript:void(0);" id="knzDarst" class="dashboard_sub_menu_1 dashboard_menu_click kennzahlen_graph">Kennzahlen Graph</a>
                      </div>
                    </div>
                  </div>
                  <div class="column">
                    <h3 id="verbExportMenu" class="dashboard_menu_click cursor_pointer">Verbrauchsdatenexport</h3>
                  </div>
                  <div class="column">
                    <h3 id="menuProduktionAusw" class="dashboard_menu_click cursor_pointer">Production</h3>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <!-- Master Data (Stammdaten): Management of users, organizational structure, equipment, and configuration -->
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard">Stammdaten 
              </button>
              <div class="dropdown-content">
                <div class="row">
                  <div class="column">
                    <h3>Rechteverwaltung</h3>
                    <a href="http://20.113.70.139/admin" id="adminPortalMenu" data-menus="3-1-6" class="dashboard_menu_click_admin admin_panel" target="_blank">Admin Portal</a>
                  </div>
            
                  <div class="column">
                    <h3>Unternehmensstruktur</h3>
                    <a href="javascript:void(0);" id="manMenu" class="dashboard_menu_click">Mandanten</a>
                    <a href="javascript:void(0);" id="orgMenu" class="dashboard_menu_click">Organisationen</a>
                    <a href="javascript:void(0);" id="liegMenu" class="dashboard_menu_click">Liegenschaften</a>
                    <a href="javascript:void(0);" id="berMenu" class="dashboard_menu_click">Vers.Bereiche</a>
                    <a href="javascript:void(0);" id="mstEMenu" class="dashboard_menu_click">Messstellen-E</a>
                    <a href="javascript:void(0);" id="mstBMenu" class="dashboard_menu_click">Messstellen-B</a>
                    <a href="javascript:void(0);" id="stdMenu" class="dashboard_menu_click">Standorte</a>
                    <a href="javascript:void(0);" id="stdDrMenu" class="dashboard_menu_click">Standortdaten 3.</a>
                  </div>

                  <div class="column">
                    <h3>Anlagenverwaltung</h3>
                    <a href="javascript:void(0);" id="anl_Menu" class="dashboard_menu_click">Anlagen</a>
                    <a href="javascript:void(0);" id="anl_Eng_Menu" class="dashboard_menu_click">Energieversorgung</a>
                    <a href="javascript:void(0);" id="anl_Konfig_Menu" class="dashboard_menu_click">weitere Konfiguration</a>
                    <a href="javascript:void(0);" id="anl_Dok_Menu" class="dashboard_menu_click">Dokumente</a>
                    <a href="javascript:void(0);" id="anl_Hist_Menu" class="dashboard_menu_click">Historie</a>
                    <a href="javascript:void(0);" id="channel_Menu" class="dashboard_menu_click">Channel</a>
                  </div>

                  <div class="column">
                    <h3 id="msmMenu" class="cursor_pointer dashboard_menu_click">Messmittelverwaltung</h3>
                  </div>
                  
                  <div class="column">
                    <h3>Produkteverwaltung</h3>
                    <a href="javascript:void(0);" id="prd_Menu" class="dashboard_menu_click">Produkte</a>
                    <a href="javascript:void(0);" id="prd_Konfig_Menu" class="dashboard_menu_click">weitere Konfiguration</a>
                    <a href="javascript:void(0);" id="prd_Hist_Menu" class="dashboard_menu_click">Historie</a>
                  </div>
                  
                  <div class="column">
                    <h3>Kennzahlen/Alarme</h3>
                    <a href="javascript:void(0);" id="knzMenu" class="dashboard_menu_click">Kennzahlen</a>
                    <a href="javascript:void(0);" id="almMenu" class="dashboard_menu_click">Alarme</a>
                  </div>
                  
                  <div class="column">
                    <h3>Editor</h3>
                    <a href="javascript:void(0);" id="menuBerechnungsformeln" class="dashboard_menu_click">Berechnungsformeln</a>
                    <a href="javascript:void(0);" id="menuVorlagenformeln" class="dashboard_menu_click">Vorlagenformeln</a>
                  </div>
                  
                </div>
              </div>
            </div>
          </li>

          <li>
            <!-- Manual Data Entry (Manuell): Interface for importing manual measurements and invoices -->
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard">Manuell 
              </button>
              <div class="dropdown-content">
                <div class="row">
                  <div class="column">
                    <h3>In. Messwerte</h3>
                    <a href="javascript:void(0);" id="intEngIMwMenu" class="dashboard_menu_click">Interne Betriebsdaten</a>
                    <a href="javascript:void(0);" id="intBdeIMwMenu" class="dashboard_menu_click">Interne Energiedaten</a>
                  </div>
            
                  <div class="column">
                    <h3>Ex. Rechnungen</h3>
                    <a href="javascript:void(0);" id="extRngMenu" class="dashboard_menu_click">Rechnungen</a>
                    <a href="javascript:void(0);" id="eRngVergleichMenu" class="dashboard_menu_click">Rechnungsvergleich</a>
                  </div>

                  <div class="column">
                    <a href="/import-manuell-data.html" class="dashboard_menu_click">Import Manuell Data</a>
                    <a href="/import-manuell-15min-data.html" class="dashboard_menu_click">Import 15min Data</a>
                  </div>

                </div>
              </div>
            </div>
          </li>

          <li>
            <!-- Options: Basic configuration data like energy types and system extensions -->
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard">Optionen 
              </button>
              <div class="dropdown-content">
                <div class="row">
                  <div class="column">
                    <h3>Basisdaten</h3>
                    <a href="javascript:void(0);" class="dashboard_menu_click" id="entMenu">Energieträger</a>
                    <a href="javascript:void(0);" class="dashboard_menu_click" id="enfMenu">Energieformen</a>
                    <a href="javascript:void(0);" class="dashboard_menu_click" id="zpMenu">Zählpunktnummern</a>
                    
                    <div class="sub_menu_open">
                      <span>Erweiterungen</span>
                      <i class="ti-angle-down angle-down"></i>
                      <div class="sub_menu_1_div">
                        <a href="javascript:void(0);" id="erwAnlMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Erweiterung Anlagen</a>
                        <a href="javascript:void(0);" id="erwPrdMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Erweiterung Produkte</a>
                        <a href="javascript:void(0);" id="korrekturFaktorMenu" class="dashboard_sub_menu_1 dashboard_menu_click">statische Korrekturfaktoren</a>
                        <a href="javascript:void(0);" id="korrekturFaktorMenuDynamischer" class="dashboard_sub_menu_1 dashboard_menu_click">dynamischer Korrekturfaktoren</a>
                      </div>
                    </div>

                    <a href="javascript:void(0);" id="grpDiagMenu" class="dashboard_menu_click">Gruppierung Diagramme</a>
                  </div>
            
                  <div class="column">
                    <h3 id="schtDatMenu" class="cursor_pointer dashboard_menu_click">Schichtdaten</h3>
                  </div>

                </div>
              </div>
            </div>
          </li>
          <li><a href="javascript:void(0);" class="text-muted menu_dashboard">Hilfe</a></li>
          <!-- Logout: Terminates the session and redirects to login -->
          <li><a href="javascript:void(0);" id="logout" class="text-muted menu_dashboard"><img src="images/logout2.png"></a></li>
        </ul>
        <!-- Right Navbar Items: Help and Home shortcuts -->
        <ul class="navbar-nav navbar-nav-right">
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle nav_bar_redirect" href="javascript:void(0);" data-toggle="dropdown" id="help_nav_bar" title="Help">
              <i class="ti-help text-muted"></i>
              <span class="menu-title"></span>
            </a>
          </li>
          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle nav_bar_redirect" href="javascript:void(0);" data-toggle="dropdown" id="home_nav_bar" title="Home">
              <i class="ti-home text-muted"></i>
            </a>
            
          </li>        
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="ti-view-list"></span>
        </button>
      </div>
    </nav>
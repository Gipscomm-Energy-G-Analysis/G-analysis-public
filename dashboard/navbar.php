<!-- Nav Bar -->
<nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center act_background">
        <a class="navbar-brand brand-logo mr-5" href="javascript:void(0);"><img src="images/G-Analysis/g_analysisNeu6.png" class="mr-2 logo-g-analysis" alt="logo"/></a>
        <!-- <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo"/></a> -->
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end act_background">
      
        <ul class="navbar-nav mr-lg-2 menu_dashboard_ul">
          <li class="text-muted menu_dashboard_database font-weight-bold">
            <select id="dashboard_database_list">
              <!-- <option>Agrodur Bad Berleburg</option>
              <option>Agrodur Kunststofftechnik</option>
              <option>Alfried Krupp KH</option>
              <option>AST</option><option>Benjamins</option>
              <option>ELB</option><option>EST-Edelstahl</option>
              <option>Familie Derichsweiler</option>
              <option>Gipscomm Holding</option>
              <option>HBS-gipshold</option>
              <option>HBS-Herholz-Tueren</option>
              <option>Henkedruck</option>
              <option>Heute + Comp</option>
              <option>hpg plastics gmbh</option>
              <option>Huendgen Swisttal</option>
              <option>InduRade</option>
              <option>K.H.Schumacher</option>
              <option>Linsen Druckcenter GmbH</option>
              <option>MB-DAH-Energy</option>
              <option>Mustermandant</option>
              <option>Raderplast</option>
              <option>Spies</option> -->
            </select>
          </li>
          <li><a href="javascript:void(0);" class="text-muted menu_dashboard font-weight-bold">Dashboard</a></li>
          
          <!-- <li class="dropdown">
            <a href="#" class="text-muted menu_dashboard font-weight-bold dropbtn">Auswertungen</a>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </li> -->
          <li>
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard font-weight-bold">Auswertungen 
                <!-- <i class="fa fa-caret-down"></i> -->
              </button>
              <div class="dropdown-content">
                <!-- <div class="header">
                  <h2>Mega Menu</h2>
                </div>    -->
                <div class="row">
                  <div class="column">
                    <h3>Berichte</h3>
                    <a href="javascript:void(0);">ISO</a>
                    <div class="sub_menu_open">
                      <span> Berichte </span>
                      <i class="ti-angle-down"></i>
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
                      <i class="ti-angle-down"></i>
                      <div class="sub_menu_1_div">
                        <a href="javascript:void(0);" id="mstVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Messstellenvergleich</a>
                        <a href="javascript:void(0);" id="zeitVerglMenu" class="dashboard_sub_menu_1 dashboard_menu_click">Zeitvergleich</a>
                        <a href="javascript:void(0);" id="knzDarst" class="dashboard_sub_menu_1 dashboard_menu_click">Kennzahlendarstellung</a>
                      </div>
                    </div>
                    <a href="javascript:void(0);" id="zeitVerglMenu" class="dashboard_menu_click">Gespeichertes Laden</a>
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



          <!-- 27-9-2021- -->
          <li>
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard font-weight-bold">Stammdaten 
                <!-- <i class="fa fa-caret-down"></i> -->
              </button>
              <div class="dropdown-content">
                <!-- <div class="header">
                  <h2>Mega Menu</h2>
                </div>    -->
                <div class="row">
                  <div class="column">
                    <h3>Rechteverwaltung</h3>
                    <a href="javascript:void(0);" id="betrGrpMenu" class="dashboard_menu_click">Betreuergruppen</a>
                    <a href="javascript:void(0);" id="manGrpMenu" class="dashboard_menu_click">Mandantengruppen</a>
                    <a href="javascript:void(0);" id="betrGrpMenu" class="dashboard_menu_click">Superadmins</a>
                    <a href="javascript:void(0);" id="admMenu" class="dashboard_menu_click">Admins</a>
                    <a href="javascript:void(0);" id="benMenu" class="dashboard_menu_click">Benutzer</a>
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
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard font-weight-bold">Manuell 
                <!-- <i class="fa fa-caret-down"></i> -->
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

                </div>
              </div>
            </div>
          </li>

          <li>
            <div class="dropdown">
              <button class="dropbtn text-muted menu_dashboard font-weight-bold">Optionen 
                <!-- <i class="fa fa-caret-down"></i> -->
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
                      <i class="ti-angle-down"></i>
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
                    <!-- <a href="javascript:void(0);">Rechnungen</a>
                    <a href="javascript:void(0);">Rechnungsvergleich</a> -->
                  </div>

                </div>
              </div>
            </div>
          </li>
          <!-- --end-- -->

          <li><a href="javascript:void(0);" class="text-muted menu_dashboard font-weight-bold">Hilfe</a></li>
          <li><a href="javascript:void(0);" id="logout" class="dashboard_menu_click text-muted menu_dashboard font-weight-bold"><img src="images/logout2.png"></a></li>
        </ul>
        <ul class="navbar-nav navbar-nav-right">
         
          <li class="nav-item dropdown">
            <a class="nav-link count-indicator dropdown-toggle nav_bar_redirect" id="notification_nav_bar" href="javascript:void(0);" data-toggle="dropdown" title="Alerts">
              <i class="ti-bell text-muted"></i>
              <span class="count"></span>
            </a>
           
          </li>

          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle nav_bar_redirect" href="javascript:void(0);" data-toggle="dropdown" id="help_nav_bar" title="Help">
              <!-- <img src="images/faces/face28.jpg" alt="profile"/> -->
              <i class="ti-help text-muted"></i>
              <span class="menu-title"></span>
            </a>
            
          </li>
          

          <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle nav_bar_redirect" href="javascript:void(0);" data-toggle="dropdown" id="home_nav_bar" title="Home">
              <!-- <img src="images/faces/face28.jpg" alt="profile"/> -->
              <i class="ti-home text-muted"></i>
            </a>
            
          </li>

          <!-- <li class="nav-item nav-profile dropdown">
            <a class="nav-link dropdown-toggle" href="javascript:void(0);" data-toggle="dropdown" id="profileDropdown">
              <img src="images/faces/face28.jpg" alt="profile"/>
              <i class="ti-user icon-md mb-0 mb-md-3 mb-xl-0"></i>
            </a>
            
          </li> -->
        
        </ul>
        <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
          <span class="ti-view-list"></span>
        </button>
      </div>
    </nav>
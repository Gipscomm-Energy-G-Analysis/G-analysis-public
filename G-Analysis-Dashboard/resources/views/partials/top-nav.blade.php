<!-- Navbar -->
<!-- <nav class="main-header navbar navbar-expand navbar-dark">
     <ul class="navbar-nav">
        <li class="nav-item">
            <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center act_background">
                <a class="navbar-brand brand-logo mr-5" href="javascript:void(0);">
                    <img src="{{asset('template/img/g_analysisNeu6.png')}}" class="mr-2 logo-g-analysis" alt="logo">
                </a>
            </div>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="javascript:void(0)" class="nav-link">Auswertungen</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="javascript:void(0)" class="nav-link">Stammdaten</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="javascript:void(0)" class="nav-link">Manuell</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="javascript:void(0)" class="nav-link">Optionen</a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="javascript:void(0)" class="nav-link">Hilfe</a>
        </li>
    </ul>
</nav> -->
<!-- /.navbar -->


<!-- shrey nav bar start-->
<nav class="main-header navbar navbar-expand navbar-dark">
<ul class="navbar-nav mr-lg-2 menu_dashboard_ul">
    <li class="nav-item">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center act_background">
            <a class="navbar-brand brand-logo mr-5" href="javascript:void(0);">
                <img src="{{asset('template/img/g_analysisNeu6.png')}}" class="mr-2 logo-g-analysis" alt="logo">
            </a>
        </div>
    </li>    
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

    <li>
        <div class="dropdown">
            <button class="dropbtn text-muted menu_dashboard font-weight-bold">Hilfe 
              <!-- <i class="fa fa-caret-down"></i> -->
            </button>
        </div>
        <!-- <a href="javascript:void(0);" class="text-muted menu_dashboard font-weight-bold"></a></li> -->
    <li>
        <div class="dropdown">
            <button class="dropbtn text-muted menu_dashboard font-weight-bold">
                <img src="images/logout2.png">
            </button>
        </div>
        <!-- <a href="javascript:void(0);" id="logout" class="dashboard_menu_click text-muted menu_dashboard font-weight-bold"></a>
     -->
    </li>
  </ul>
</nav>
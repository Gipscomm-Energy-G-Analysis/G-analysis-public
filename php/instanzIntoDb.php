<?php
include('top-cache.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require 'DbOperations.php';

$nameDB = $_POST['nameDB'];
$conn = connectToDB($nameDB);
$id = $_POST['id'];

if($id == "gipscAdm") {

        $modus = $_POST['modus'];
        $username = $_POST['benutzername'];
        $passwort = $_POST['passwort'];

      	if($modus == "new"){

      		$tsql = "INSERT INTO gipscommAdmins(username,passHash) ";
      		$tsql .= "VALUES ('$username','$passwort') ";
        }
      	else{
      		$gipscAdmID = $_POST['gipscAdmID'];

      		$tsql =  "UPDATE gipscommAdmins SET username = '$username',passHash = '$passwort' ";
      		$tsql .= "WHERE gipsAdm_ID = '$gipscAdmID' ";
      	}
   }
elseif($id == "betrGrp") {

    $modus = $_POST['modus'];


   	if($modus == "new"){

   		$tsql = "INSERT INTO betreuerGruppen(firma,anzahlMitarbeiter, anschrift, plz, ort, ";
   		$tsql .= "geschaeftsfuehrer, telefon, eMail, notiz) ";
   		$tsql .= "VALUES ('$firma','$anzahlMitarbeiter','$anschrift', '$plz','$ort','$geschaeftsfuehrer', ";
   		$tsql .= "'$telefon','$eMail','$notiz') ";
   }
   	else{
   		$betrGrpID = $_POST['betrGrpID'];

   		$tsql =  "UPDATE betreuerGruppen SET firma = '$firma',anzahlMitarbeiter = '$anzahlMitarbeiter', ";
   		$tsql .= "anschrift = '$anschrift',plz = '$plz',ort = '$ort',geschaeftsfuehrer = '$geschaeftsfuehrer', ";
   		$tsql .= "telefon = '$telefon',eMail = '$eMail',notiz = '$notiz' ";
   		$tsql .= "WHERE betrGrp_ID = '$betrGrpID' ";
   	}
}
elseif($id == "sAdm") {

    $modus = $_POST['modus'];
    $titel = $_POST['titel'];
    $name = $_POST['name'];
    $vorname = $_POST['vorname'];
    $eMail = $_POST['eMail'];
    $telefon = $_POST['telefon'];
    $fax = $_POST['fax'];
    $mobiltelefon = $_POST['mobiltelefon'];
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];

   	if($modus == "new"){
      $betrGrpID = $_POST['betrGrpID'];

   		$tsql = "INSERT INTO superAdmins(betrGrp_ID,titelSAdm,nameSAdm, vornameSAdm, emailSAdm, telefonSAdm, ";
   		$tsql .= "faxSAdm, mobiltelefonSAdm, benutzernameSAdm, passwortSAdm) ";
   		$tsql .= "VALUES ('$betrGrpID','$titel', '$name','$vorname','$eMail', ";
   		$tsql .= "'$telefon','$fax','$mobiltelefon','$benutzername','$passwort') ";
   }
   	else{
   		$sAdmID = $_POST['sAdmID'];

   		$tsql =  "UPDATE superAdmins SET titelSAdm = '$titel',nameSAdm = '$name', ";
   		$tsql .= "vornameSAdm = '$vorname',emailSAdm = '$eMail',telefonSAdm = '$telefon', ";
   		$tsql .= "faxSAdm = '$fax',mobiltelefonSAdm = '$mobiltelefon',benutzernameSAdm = '$benutzername', ";
      $tsql .= "passwortSAdm = '$passwort' ";
   		$tsql .= "WHERE sAdm_ID = '$sAdmID' ";
   	}
}
elseif($id == "manGrp") {
    $modus = $_POST['modus'];

    $name = $_POST['name'];
    $kurz = $_POST['kurz'];
    $notiz = $_POST['notiz'];
    $mandantenIDs = $_POST['mandatenIDs'];

   	if($modus == "new"){
      $betrGrpID = $_POST['betrGrpID'];

   		$tsql = "INSERT INTO mandantenGruppen(betrGrp_ID,name,kurz, notiz, mandantenIDs) ";
   		$tsql .= "VALUES ('$betrGrpID','$name', '$kurz','$notiz','$mandantenIDs') ";
   }
   	else{
   		$manGrpID = $_POST['manGrpID'];

   		$tsql =  "UPDATE mandantenGruppen SET name = '$name',kurz = '$kurz',notiz = '$notiz', mandantenIDs = '$mandantenIDs' ";
   		$tsql .= "WHERE manGrp_ID = '$manGrpID' ";
   	}
}
elseif($id == "adm") {
    $modus = $_POST['modus'];
    $instanz = $_POST['ins'];
    $insID = $_POST['insID'];

    $titel = $_POST['titel'];
    $name = $_POST['name'];
    $vorname = $_POST['vorname'];
    $eMail = $_POST['eMail'];
    $telefon = $_POST['telefon'];
    $fax = $_POST['fax'];
    $mobiltelefon = $_POST['mobiltelefon'];
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];

   	if($modus == "new"){

   		$tsql = "INSERT INTO admins($instanz,titel,name, vorname, email, telefon, ";
   		$tsql .= "fax, mobiltelefon, benutzername, passHash) ";
   		$tsql .= "VALUES ('$insID','$titel', '$name','$vorname','$eMail', ";
   		$tsql .= "'$telefon','$fax','$mobiltelefon','$benutzername','$passwort') ";
   }
   	else{
   		$admID = $_POST['admID'];

   		$tsql =  "UPDATE admins SET titel = '$titel',name = '$name', ";
   		$tsql .= "vorname = '$vorname',email = '$eMail',telefon = '$telefon', ";
   		$tsql .= "fax = '$fax',mobiltelefon = '$mobiltelefon',benutzername = '$benutzername', ";
      $tsql .= "passHash = '$passwort' ";
   		$tsql .= "WHERE adm_ID = '$admID' ";
   	}
}
elseif($id == "ben") {
    $modus = $_POST['modus'];
    $instanz = $_POST['ins'];
    $insID = $_POST['insID'];

    $titel = $_POST['titel'];
    $name = $_POST['name'];
    $vorname = $_POST['vorname'];
    $eMail = $_POST['eMail'];
    $telefon = $_POST['telefon'];
    $fax = $_POST['fax'];
    $mobiltelefon = $_POST['mobiltelefon'];
    $benutzername = $_POST['benutzername'];
    $passwort = $_POST['passwort'];

   	if($modus == "new"){
      $manID = $_POST['manID'];

   		$tsql = "INSERT INTO benutzer($instanz,titel,name, vorname, email, telefon, ";
   		$tsql .= "fax, mobiltelefon, benutzername, passHash) ";
   		$tsql .= "VALUES ('$insID','$titel', '$name','$vorname','$eMail', ";
   		$tsql .= "'$telefon','$fax','$mobiltelefon','$benutzername','$passwort') ";
   }
   	else{
   		$benID = $_POST['benID'];

   		$tsql =  "UPDATE benutzer SET titel = '$titel',name = '$name', ";
   		$tsql .= "vorname = '$vorname',email = '$eMail',telefon = '$telefon', ";
   		$tsql .= "fax = '$fax',mobiltelefon = '$mobiltelefon',benutzername = '$benutzername', ";
      $tsql .= "passHash = '$passwort' ";
   		$tsql .= "WHERE ben_ID = '$benID' ";
   	}
}
elseif($id == "org") {
    $modus = $_POST['modus'];
    $nameAllgemein = $_POST['nameAllgemein'];
    $gesellschaftsform = $_POST['gesellschaftsform'];
    $firmenanschrift = $_POST['firmenanschrift'];
    $land = $_POST['land'];
    $plz = $_POST['plz'];
    $ort = $_POST['ort'];
    $hrbNummer = $_POST['hrbNummer'];
    $titelGeschaeftsfuehrung = $_POST['titelGeschaeftsfuehrung'];
    $nameGeschaeftsfuehrung = $_POST['nameGeschaeftsfuehrung'];
    $vornameGeschaeftsfuehrung = $_POST['vornameGeschaeftsfuehrung'];
    $eMailGeschaeftsfuehrung = $_POST['eMailGeschaeftsfuehrung'];
    $telefonGeschaeftsfuehrung = $_POST['telefonGeschaeftsfuehrung'];
    $faxGeschaeftsfuehrung = $_POST['faxGeschaeftsfuehrung'];
    $mobiltelefonGeschaeftsfuehrung = $_POST['mobiltelefonGeschaeftsfuehrung'];
    $titelEnergiemanagement = $_POST['titelEnergiemanagement'];
    $nameEnergiemanagement = $_POST['nameEnergiemanagement'];
    $vornameEnergiemanagement = $_POST['vornameEnergiemanagement'];
    $eMailEnergiemanagement = $_POST['eMailEnergiemanagement'];
    $telefonEnergiemanagement = $_POST['telefonEnergiemanagement'];
    $faxEnergiemanagement = $_POST['faxEnergiemanagement'];
    $mobiltelefonEnergiemanagement = $_POST['mobiltelefonEnergiemanagement'];


	if($modus == "new"){
		$tsql = "
		INSERT INTO organisationen(datumOrg,nameOrg,gesellschaftsformOrg,anschriftOrg,landOrg,plzOrg,ortOrg,hrbNummerOrg,titelGeschaeftsfuehrungOrg,nameGeschaeftsfuehrungOrg,vornameGeschaeftsfuehrungOrg,eMailGeschaeftsfuehrungOrg,telefonGeschaeftsfuehrungOrg, faxGeschaeftsfuehrungOrg,mobiltelefonGeschaeftsfuehrungOrg,titelEnergiemanagementOrg,nameEnergiemanagementOrg,vornameEnergiemanagementOrg,eMailEnergiemanagementOrg,telefonEnergiemanagementOrg, faxEnergiemanagementOrg,mobiltelefonEnergiemanagementOrg,deleted)
		VALUES (getdate(),'$nameAllgemein','$gesellschaftsform',' $firmenanschrift','$land','$plz','$ort','$hrbNummer','$titelGeschaeftsfuehrung','$nameGeschaeftsfuehrung','$vornameGeschaeftsfuehrung','$eMailGeschaeftsfuehrung','$telefonGeschaeftsfuehrung','$faxGeschaeftsfuehrung','$mobiltelefonGeschaeftsfuehrung','$titelEnergiemanagement','$nameEnergiemanagement','$vornameEnergiemanagement','$eMailEnergiemanagement','$telefonEnergiemanagement','$faxEnergiemanagement','$mobiltelefonEnergiemanagement',0)";
	}
	elseif($modus == "save"){
		$orgID = $_POST['orgID'];

		$tsql = "UPDATE organisationen SET datumOrg=getdate(),nameOrg='$nameAllgemein',gesellschaftsformOrg='$gesellschaftsform',anschriftOrg='$firmenanschrift',";
        $tsql .= "landOrg='$land',plzOrg='$plz',ortOrg='$ort',hrbNummerOrg='$hrbNummer',titelGeschaeftsfuehrungOrg='$titelGeschaeftsfuehrung',";
        $tsql .= "nameGeschaeftsfuehrungOrg='$nameGeschaeftsfuehrung',vornameGeschaeftsfuehrungOrg='$vornameGeschaeftsfuehrung',";
        $tsql .= "eMailGeschaeftsfuehrungOrg='$eMailGeschaeftsfuehrung',telefonGeschaeftsfuehrungOrg='$telefonGeschaeftsfuehrung',";
        $tsql .= "faxGeschaeftsfuehrungOrg='$faxGeschaeftsfuehrung',mobiltelefonGeschaeftsfuehrungOrg='$mobiltelefonGeschaeftsfuehrung',";
        $tsql .= "titelEnergiemanagementOrg = '$titelEnergiemanagement',nameEnergiemanagementOrg='$nameEnergiemanagement',";
        $tsql .= "vornameEnergiemanagementOrg='$vornameEnergiemanagement',eMailEnergiemanagementOrg='$eMailEnergiemanagement',";
        $tsql .= "telefonEnergiemanagementOrg='$telefonEnergiemanagement', faxEnergiemanagementOrg='$faxEnergiemanagement',";
        $tsql .= "mobiltelefonEnergiemanagementOrg='$mobiltelefonEnergiemanagement' ";
		$tsql .= "WHERE org_ID = '$orgID'";
	}
  elseif ($modus == "delete") {
    $tsql = "UPDATE organisationen SET datumOrg = getdate(), deleted = 1";
		$tsql .= "WHERE org_ID = '$orgID'";
  }

}
elseif($id == "lieg") {
	$modus = $_POST['modus'];
	$orgID = $_POST['orgID'];
	$nameAllgemein = $_POST['nameAllgemein'];
  $kuerzel = $_POST['kuerzel'];
	$eigenstaendigeForm = $_POST['eigenstaendigeForm'];
    $aktiv = $_POST['aktiv'];
    $gesellschaftsform = $_POST['gesellschaftsform'];
    $anschrift = $_POST['anschrift'];
    $land = $_POST['land'];
    $plz = $_POST['plz'];
    $ort = $_POST['ort'];
    $typ= $_POST['typ'];
    $hatDl = $_POST['hatDl'];
    $titelAnsprechpartner = $_POST['titelAnsprechpartner'];
    $nameAnsprechpartner = $_POST['nameAnsprechpartner'];
    $vornameAnsprechpartner = $_POST['vornameAnsprechpartner'];
    $eMailAnsprechpartner = $_POST['eMailAnsprechpartner'];
    $telefonAnsprechpartner = $_POST['telefonAnsprechpartner'];
    $faxAnsprechpartner = $_POST['faxAnsprechpartner'];
    $mobiltelefonAnsprechpartner = $_POST['mobiltelefonAnsprechpartner'];
    $titelEnergiebeauftragter = $_POST['titelEnergiebeauftragter'];
    $nameEnergiebeauftragter = $_POST['nameEnergiebeauftragter'];
    $vornameEnergiebeauftragter = $_POST['vornameEnergiebeauftragter'];
    $eMailEnergiebeauftragter = $_POST['eMailEnergiebeauftragter'];
    $telefonEnergiebeauftragter = $_POST['telefonEnergiebeauftragter'];
    $faxEnergiebeauftragter = $_POST['faxEnergiebeauftragter'];
    $mobiltelefonEnergiebeauftragter = $_POST['mobiltelefonEnergiebeauftragter'];
	$energietraeger1 =$_POST['energietraeger1'];
	$energietraeger2 =$_POST['energietraeger2'];
	$energietraeger3 =$_POST['energietraeger3'];
	$energietraeger4 =$_POST['energietraeger4'];
	$energietraeger5 =$_POST['energietraeger5'];
	$energietraeger6 =$_POST['energietraeger6'];
	$energietraeger7 =$_POST['energietraeger7'];
	$energietraeger8 =$_POST['energietraeger8'];
	$energietraeger9 =$_POST['energietraeger9'];
	$energieform1 =$_POST['energieform1'];
	$energieform2 =$_POST['energieform2'];
	$energieform3 =$_POST['energieform3'];
	$energieform4 =$_POST['energieform4'];
	$energieform5 =$_POST['energieform5'];
	$energieform6 =$_POST['energieform6'];
	$energieform7 =$_POST['energieform7'];
	$managementsystem1 = $_POST['managementsystem1'];
	$erstzertifizierung1 = $_POST['erstzertifizierung1'];
	$managementsystem2 = $_POST['managementsystem2'];
	$erstzertifizierung2 = $_POST['erstzertifizierung2'];
	$managementsystem3 = $_POST['managementsystem3'];
	$erstzertifizierung3 = $_POST['erstzertifizierung3'];


	if($modus == "new"){
		$tsql = "INSERT INTO liegenschaften(org_ID,datumLieg,nameLieg,kuerzelLieg,eigenstaendigeFormLieg,aktivLieg,gesellschaftsformLieg,anschriftLieg,";
		$tsql .= "landLieg,plzLieg,ortLieg,typLieg,hatDl,titelAnsprechpartnerLieg,nameAnsprechpartnerLieg,vornameAnsprechpartnerLieg,eMailAnsprechpartnerLieg,";
		$tsql .= "telefonAnsprechpartnerLieg, faxAnsprechpartnerLieg,mobiltelefonAnsprechpartnerLieg,titelEnergiebeauftragterLieg,";
		$tsql .= "nameEnergiebeauftragterLieg,vornameEnergiebeauftragterLieg,eMailEnergiebeauftragterLieg,telefonEnergiebeauftragterLieg,";
		$tsql .= "faxEnergiebeauftragterLieg,mobiltelefonEnergiebeauftragterLieg,energietraeger1,energietraeger2,energietraeger3,";
		$tsql .= "energietraeger4,energietraeger5,energietraeger6,energietraeger7,energietraeger8,energietraeger9,energieform1,energieform2,energieform3,energieform4,energieform5,energieform6,energieform7,managementsystem1,";
		$tsql .= "erstzertifizierung1,managementsystem2,erstzertifizierung2,managementsystem3,erstzertifizierung3,deleted) ";

		$tsql .= "VALUES ('$orgID',getdate(),'$nameAllgemein','$kuerzel','$eigenstaendigeForm','$aktiv','$gesellschaftsform','$anschrift','$land','$plz','$ort','$typ','$hatDl',";
		$tsql .= "'$titelAnsprechpartner','$nameAnsprechpartner','$vornameAnsprechpartner','$eMailAnsprechpartner','$telefonAnsprechpartner',";
		$tsql .= "'$faxAnsprechpartner','$mobiltelefonAnsprechpartner','$titelEnergiebeauftragter','$nameEnergiebeauftragter',";
		$tsql .= "'$vornameEnergiebeauftragter','$eMailEnergiebeauftragter','$telefonEnergiebeauftragter','$faxEnergiebeauftragter',";
		$tsql .= "'$mobiltelefonEnergiebeauftragter','$energietraeger1','$energietraeger2','$energietraeger3','$energietraeger4',";
		$tsql .= "'$energietraeger5','$energietraeger6','$energietraeger7','$energietraeger8','$energietraeger9','$energieform1',";
		$tsql .= "'$energieform2','$energieform3','$energieform4','$energieform5','$energieform6','$energieform7','$managementsystem1',";
		$tsql .= "'$erstzertifizierung1','$managementsystem2','$erstzertifizierung2','$managementsystem3','$erstzertifizierung3','false')";
	}
	else{
		$liegID = $_POST['liegID'];

		$tsql = "UPDATE liegenschaften SET datumLieg = getdate(),nameLieg = '$nameAllgemein',kuerzelLieg = '$kuerzel',eigenstaendigeFormLieg = '$eigenstaendigeForm',aktivLieg = '$aktiv',";
		$tsql .= "gesellschaftsformLieg = '$gesellschaftsform',anschriftLieg = '$anschrift',landLieg = '$land',plzLieg = '$plz',ortLieg = '$ort',typLieg = '$typ',";
		$tsql .= "hatDl = '$hatDl',titelAnsprechpartnerLieg = '$titelAnsprechpartner',nameAnsprechpartnerLieg = '$nameAnsprechpartner',";
		$tsql .= "vornameAnsprechpartnerLieg = '$vornameAnsprechpartner',eMailAnsprechpartnerLieg = '$eMailAnsprechpartner',";
		$tsql .= "telefonAnsprechpartnerLieg = '$telefonAnsprechpartner',faxAnsprechpartnerLieg = '$faxAnsprechpartner',";
		$tsql .= "mobiltelefonAnsprechpartnerLieg = '$mobiltelefonAnsprechpartner',titelEnergiebeauftragterLieg = '$titelEnergiebeauftragter',";
		$tsql .= "nameEnergiebeauftragterLieg = '$nameEnergiebeauftragter',vornameEnergiebeauftragterLieg = '$vornameEnergiebeauftragter',";
		$tsql .= "eMailEnergiebeauftragterLieg = '$eMailEnergiebeauftragter',telefonEnergiebeauftragterLieg = '$telefonEnergiebeauftragter',";
		$tsql .= "faxEnergiebeauftragterLieg = '$faxEnergiebeauftragter',mobiltelefonEnergiebeauftragterLieg = '$mobiltelefonEnergiebeauftragter',";
		$tsql .= "energietraeger1 = '$energietraeger1',energietraeger2 = '$energietraeger2',energietraeger3 = '$energietraeger3',";
		$tsql .= "energietraeger4 = '$energietraeger4',energietraeger5 = '$energietraeger5',energietraeger6 = '$energietraeger6',";
		$tsql .= "energietraeger7 = '$energietraeger7',energietraeger8 = '$energietraeger8',energietraeger9 = '$energietraeger9',";
		$tsql .= "energieform1 = '$energieform1',energieform2 = '$energieform2',";
		$tsql .= "energieform3 = '$energieform3',energieform4 = '$energieform4',energieform5 = '$energieform5',energieform6 = '$energieform6',";
		$tsql .= "energieform7 = '$energieform7',managementsystem1 = '$managementsystem1',erstzertifizierung1 ='$erstzertifizierung1',";
		$tsql .= "managementsystem2 = '$managementsystem2',erstzertifizierung2 = '$erstzertifizierung2',managementsystem3 = '$managementsystem3',";
		$tsql .= "erstzertifizierung3 = '$erstzertifizierung3'";
		$tsql .= "WHERE lieg_ID = '$liegID'";
	}
}
elseif($id == "extDl") {
	$modus = $_POST['modus'];
	$nameAllgemein = $_POST['nameAllgemein'];
    $aktiv = $_POST['aktiv'];
    $gesellschaftsform = $_POST['gesellschaftsform'];
    $anschrift = $_POST['anschrift'];
    $land = $_POST['land'];
    $plz = $_POST['plz'];
    $ort = $_POST['ort'];
    $typ= $_POST['typ'];
    $standortdatenDritte = $_POST['standortdatenDritte'];
    $titelAnsprechpartner = $_POST['titelAnsprechpartner'];
    $nameAnsprechpartner = $_POST['nameAnsprechpartner'];
    $vornameAnsprechpartner = $_POST['vornameAnsprechpartner'];
    $eMailAnsprechpartner = $_POST['eMailAnsprechpartner'];
    $telefonAnsprechpartner = $_POST['telefonAnsprechpartner'];
    $faxAnsprechpartner = $_POST['faxAnsprechpartner'];
    $mobiltelefonAnsprechpartner = $_POST['mobiltelefonAnsprechpartner'];

	$energietraeger1 =$_POST['energietraeger1'];
    $messstelle1Ent =$_POST['messstelle1Ent'];
    $standort1Ent = $_POST['standort1Ent'];
	$energietraeger2 =$_POST['energietraeger2'];
    $messstelle2Ent =$_POST['messstelle2Ent'];
    $standort2Ent = $_POST['standort2Ent'];
	$energietraeger3 =$_POST['energietraeger3'];
    $messstelle3Ent =$_POST['messstelle3Ent'];
    $standort3Ent = $_POST['standort3Ent'];
	$energietraeger4 =$_POST['energietraeger4'];
    $messstelle4Ent =$_POST['messstelle4Ent'];
    $standort4Ent = $_POST['standort4Ent'];
	$energietraeger5 =$_POST['energietraeger5'];
    $messstelle5Ent =$_POST['messstelle5Ent'];
    $standort5Ent = $_POST['standort5Ent'];
	$energietraeger6 =$_POST['energietraeger6'];
    $messstelle6Ent =$_POST['messstelle6Ent'];
    $standort6Ent = $_POST['standort6Ent'];

	$energieRes1 =$_POST['energieRes1'];
    $messstelle1EnfRes =$_POST['messstelle1EnfRes'];
    $standort1EnfRes = $_POST['standort1EnfRes'];
	$energieRes2 =$_POST['energieRes2'];
    $messstelle2EnfRes =$_POST['messstelle2EnfRes'];
    $standort2EnfRes = $_POST['standort2EnfRes'];
	$energieRes3 =$_POST['energieRes3'];
    $messstelle3EnfRes =$_POST['messstelle3EnfRes'];
    $standort3EnfRes = $_POST['standort3EnfRes'];
	$energieRes4 =$_POST['energieRes4'];
    $messstelle4EnfRes =$_POST['messstelle4EnfRes'];
    $standort4EnfRes = $_POST['standort4EnfRes'];
	$energieRes5 =$_POST['energieRes5'];
    $messstelle5EnfRes =$_POST['messstelle5EnfRes'];
    $standort5EnfRes = $_POST['standort5EnfRes'];
	$energieRes6 =$_POST['energieRes6'];
    $messstelle6EnfRes =$_POST['messstelle6EnfRes'];
    $standort6EnfRes = $_POST['standort6EnfRes'];

	if($modus == "new"){
    $liegID = $_POST['liegID'];

		$tsql = "INSERT INTO externeDurchleitungen(lieg_ID,datumExtDl,nameExtDl,aktivExtDl,gesellschaftsformExtDl,anschriftExtDl,";
		$tsql .= "landExtDl,plzExtDl,ortExtDl,typExtDl,standortdatenDritte,titelAnsprechpartnerExtDl,nameAnsprechpartnerExtDl,vornameAnsprechpartnerExtDl,eMailAnsprechpartnerExtDl,";
		$tsql .= "telefonAnsprechpartnerExtDl, faxAnsprechpartnerExtDl,mobiltelefonAnsprechpartnerExtDl,";
    $tsql .= "energietraeger1,messstelle1ExtDl,standort1ExtDl,energietraeger2,messstelle2ExtDl,standort2ExtDl,";
    $tsql .= "energietraeger3,messstelle3ExtDl,standort3ExtDl,energietraeger4,messstelle4ExtDl,standort4ExtDl,";
		$tsql .= "energietraeger5,messstelle5ExtDl,standort5ExtDl,energietraeger6,messstelle6ExtDl,standort6ExtDl,";
    $tsql .= "energieRes1ExtDl,messstelleEngRes1ExtDl,standortEngRes1ExtDl,energieRes2ExtDl,messstelleEngRes2ExtDl,standortEngRes2ExtDl,";
    $tsql .= "energieRes3ExtDl,messstelleEngRes3ExtDl,standortEngRes3ExtDl,energieRes4ExtDl,messstelleEngRes4ExtDl,standortEngRes4ExtDl,";
    $tsql .= "energieRes5ExtDl,messstelleEngRes5ExtDl,standortEngRes5ExtDl,energieRes6ExtDl,messstelleEngRes6ExtDl,standortEngRes6ExtDl) ";

		$tsql .= "VALUES ('$liegID',getdate(),'$nameAllgemein','$aktiv','$gesellschaftsform','$anschrift','$land','$plz','$ort','$typ','$standortdatenDritte',";
		$tsql .= "'$titelAnsprechpartner','$nameAnsprechpartner','$vornameAnsprechpartner','$eMailAnsprechpartner','$telefonAnsprechpartner',";
		$tsql .= "'$faxAnsprechpartner','$mobiltelefonAnsprechpartner',";
    $tsql .= "'$energietraeger1','$messstelle1Ent','$standort1Ent','$energietraeger2','$messstelle2Ent','$standort2Ent',";
    $tsql .= "'$energietraeger3','$messstelle3Ent','$standort3Ent','$energietraeger4','$messstelle4Ent','$standort4Ent',";
		$tsql .= "'$energietraeger5','$messstelle5Ent','$standort5Ent','$energietraeger6','$messstelle6Ent','$standort6Ent',";
    $tsql .= "'$energieRes1','$messstelle1EnfRes','$standort1EnfRes','$energieRes2','$messstelle2EnfRes','$standort2EnfRes',";
		$tsql .= "'$energieRes3','$messstelle3EnfRes','$standort3EnfRes','$energieRes4','$messstelle4EnfRes','$standort4EnfRes',";
    $tsql .= "'$energieRes5','$messstelle5EnfRes','$standort5EnfRes','$energieRes6','$messstelle6EnfRes','$standort6EnfRes')";
	}
	else{
		$extDlID = $_POST['extDlID'];

		$tsql = "UPDATE externeDurchleitungen SET datumExtDl = getdate(),nameExtDl = '$nameAllgemein',aktivExtDl = '$aktiv',";
		$tsql .= "gesellschaftsformExtDl = '$gesellschaftsform',anschriftExtDl = '$anschrift',landExtDl = '$land',plzExtDl = '$plz',ortExtDl = '$ort',typExtDl = '$typ',";
		$tsql .= "standortdatenDritte = '$standortdatenDritte',titelAnsprechpartnerExtDl = '$titelAnsprechpartner',nameAnsprechpartnerExtDl = '$nameAnsprechpartner',";
		$tsql .= "vornameAnsprechpartnerExtDl = '$vornameAnsprechpartner',eMailAnsprechpartnerExtDl = '$eMailAnsprechpartner',";
		$tsql .= "telefonAnsprechpartnerExtDl = '$telefonAnsprechpartner',faxAnsprechpartnerExtDl = '$faxAnsprechpartner',";
		$tsql .= "mobiltelefonAnsprechpartnerExtDl = '$mobiltelefonAnsprechpartner',";
		$tsql .= "energietraeger1 = '$energietraeger1',messstelle1ExtDl = '$messstelle1Ent',standort1ExtDl = '$standort1Ent',";
    $tsql .= "energietraeger2 = '$energietraeger2',messstelle2ExtDl = '$messstelle2Ent',standort2ExtDl = '$standort2Ent',";
    $tsql .= "energietraeger3 = '$energietraeger3',messstelle3ExtDl = '$messstelle3Ent',standort3ExtDl = '$standort3Ent',";
    $tsql .= "energietraeger4 = '$energietraeger4',messstelle4ExtDl = '$messstelle4Ent',standort4ExtDl = '$standort4Ent',";
		$tsql .= "energietraeger5 = '$energietraeger5',messstelle5ExtDl = '$messstelle5Ent',standort5ExtDl = '$standort5Ent',";
    $tsql .= "energietraeger6 = '$energietraeger6',messstelle6ExtDl = '$messstelle6Ent',standort6ExtDl = '$standort6Ent',";

    $tsql .= "energieRes1ExtDl = '$energieRes1',messstelleEngRes1ExtDl = '$messstelle1EnfRes',standortEngRes1ExtDl = '$standort1EnfRes',";
		$tsql .= "energieRes2ExtDl = '$energieRes2',messstelleEngRes2ExtDl = '$messstelle2EnfRes',standortEngRes2ExtDl = '$standort2EnfRes',";
    $tsql .= "energieRes3ExtDl = '$energieRes3',messstelleEngRes3ExtDl = '$messstelle3EnfRes',standortEngRes3ExtDl = '$standort3EnfRes',";
    $tsql .= "energieRes4ExtDl = '$energieRes4',messstelleEngRes4ExtDl = '$messstelle4EnfRes',standortEngRes4ExtDl = '$standort4EnfRes',";
    $tsql .= "energieRes5ExtDl = '$energieRes5',messstelleEngRes5ExtDl = '$messstelle5EnfRes',standortEngRes5ExtDl = '$standort5EnfRes',";
    $tsql .= "energieRes6ExtDl = '$energieRes6',messstelleEngRes6ExtDl = '$messstelle6EnfRes',standortEngRes6ExtDl = '$standort6EnfRes' ";
		$tsql .= "WHERE extDl_ID = '$extDlID'";
	}
}
elseif($id == "ber") {
  $modus = $_POST['modus'];
  $liegID = $_POST['liegID'];

  $nameAllgemein = $_POST['nameAllgemein'];
  $kurzbezeichnung = $_POST['kurzbezeichnung'];
  $kostenstelle = $_POST['kostenstelle'];
  $ort = $_POST['ort'];
  $ausgewaehltesLevel = $_POST['ausgewaehltesLevel'];

  $vorgelagerterBereich1 = $_POST['vorgelagerterBereich1'];
	$vorgelagerterBereich2 = $_POST['vorgelagerterBereich2'];
	$notiz = $_POST['notiz'];

	$energietraeger1 = $_POST['energietraeger1'];
	$energietraeger2 = $_POST['energietraeger2'];
	$energietraeger3 = $_POST['energietraeger3'];
	$energietraeger4 = $_POST['energietraeger4'];

	if($modus == "new"){
		$tsql = "
		INSERT INTO bereiche(lieg_ID,datumBer,nameBer,kurzbezeichnungBer,kostenstelleBer,ortBer,ausgewaehltesLevelBer,vorgelagerterBereich1Ber, vorgelagerterBereich2Ber,notizBer,energietraeger1Ber,energietraeger2Ber,energietraeger3Ber,energietraeger4Ber)
		VALUES ('$liegID',getdate(),'$nameAllgemein',' $kurzbezeichnung','$kostenstelle','$ort','$ausgewaehltesLevel','$vorgelagerterBereich1','$vorgelagerterBereich2','$notiz','$energietraeger1','$energietraeger2','$energietraeger3','$energietraeger4')";
}
	else{
		$berID = $_POST['berID'];

		$tsql = "UPDATE bereiche SET datumBer = getdate(), nameBer = '$nameAllgemein', kurzbezeichnungBer = '$kurzbezeichnung',";
		$tsql .= "kostenstelleBer = '$kostenstelle',ortBer = '$ort',ausgewaehltesLevelBer = '$ausgewaehltesLevel',";
		$tsql .= "vorgelagerterBereich1Ber = '$vorgelagerterBereich1', vorgelagerterBereich2Ber = '$vorgelagerterBereich2',";
		$tsql .= "notizBer = '$notiz', energietraeger1Ber = '$energietraeger1', energietraeger2Ber = '$energietraeger2',";
		$tsql .= "energietraeger3Ber = '$energietraeger3', energietraeger4Ber = '$energietraeger4'";
        $tsql .= "WHERE ber_ID = '$berID'";
	}
}
elseif($id == "mst") {

    $modus = $_POST['modus'];

    $messstellenbezeichnung= $_POST['messstellenbezeichnung'];
    $kurzbezeichnung= $_POST['kurzbezeichnung'];
    $kostenstelle = $_POST['kostenstelle'];
    $aktiv = $_POST['aktiv'];
    $isDurchleitung = $_POST['isDurchleitung'];
    $energietraeger = $_POST['energietraeger'];
    $energieform = $_POST['energieform'];
    $ort = $_POST['ort'];
    $messart = $_POST['messart'];
	  $vorgelagerteMessstelle = $_POST['vorgelagerteMessstelle'];
	  $messmittelBerechnungslogik = $_POST['messmittelBerechnungslogik'];
    $msmID = $_POST['msmID'];
    $anlID = $_POST['anlID'];
    $notiz = $_POST['notiz'];

	if($modus == "new"){
    $berID = $_POST['berID'];

		$tsql = "INSERT INTO messstellen(ber_ID,datumMst,nameMSt,kurzbezeichnungMst,kostenstelleMst,aktivMst,energietraegerMst,energieformMst,ortMst,messartMst,vorgelagerteMessstelleMst,messmittelBerechnungslogikMst,notizMst, deleted, anl_ID, msm_ID, isDurchleitung)
		         VALUES ('$berID',getdate(),'$messstellenbezeichnung',' $kurzbezeichnung','$kostenstelle','$aktiv','$energietraeger','$energieform','$ort','$messart','$vorgelagerteMessstelle','$messmittelBerechnungslogik','$notiz', 0, '$anlID', '$msmID', '$isDurchleitung') ";
  }
	else{
		$mstID = $_POST['mstID'];

		$tsql =  "UPDATE messstellen SET datumMst = getdate(),nameMSt = '$messstellenbezeichnung', kurzbezeichnungMst = '$kurzbezeichnung', anl_ID = '$anlID', msm_ID = '$msmID', ";
		$tsql .= "kostenstelleMst = '$kostenstelle',aktivMst = '$aktiv', energietraegerMst ='$energietraeger', messartMst = '$messart', vorgelagerteMessstelleMst = '$vorgelagerteMessstelle', " ;
    $tsql .= "messmittelBerechnungslogikMst = '$messmittelBerechnungslogik', notizMst = '$notiz', ortMst = '$ort', energieformMst = '$energieform', isDurchleitung = '$isDurchleitung' " ;
		$tsql .= "WHERE mst_ID = '$mstID' ";
	}
}
elseif($id == "prd") {
  $modus = $_POST['modus'];
  $orgID = $_POST['orgID'];
  $bezeichnung= $_POST['bezeichnung'];
  $artikelnummer= $_POST['artikelnummer'];
  $custom1 = $_POST['custom1'];
  $custom2 = $_POST['custom2'];
  $custom3 = $_POST['custom3'];
  $custom4 = $_POST['custom4'];
  $custom5 = $_POST['custom5'];
  $custom6 = $_POST['custom6'];
  $anl01ID = $_POST['anl01ID'];
  $anl02ID = $_POST['anl02ID'];
  $anl03ID = $_POST['anl03ID'];
  $anl04ID = $_POST['anl04ID'];
  $anl05ID = $_POST['anl05ID'];
  $anl06ID = $_POST['anl06ID'];
  $anl07ID = $_POST['anl07ID'];
  $anl08ID = $_POST['anl08ID'];
  $anl09ID = $_POST['anl09ID'];
  $grpID = $_POST['grpID'];

  if($modus == "new"){
  	$tsql = "INSERT INTO produkte(datum, org_ID, namePrd, artikelNrPrd, custom1, custom2, custom3, custom4, custom5, custom6, ";
  	$tsql .= "anl01_ID, anl02_ID, anl03_ID, anl04_ID, anl05_ID, anl06_ID, anl07_ID, anl08_ID, anl09_ID, gruppenID, deleted, archiviert) ";
  	$tsql .= "VALUES (getdate(), '$orgID', '$bezeichnung', '$artikelnummer', '$custom1', '$custom2', '$custom3', '$custom4', '$custom5', '$custom6', ";
    $tsql .= "'$anl01ID', '$anl02ID', '$anl03ID', '$anl04ID', '$anl05ID', '$anl06ID', '$anl07ID', '$anl08ID', '$anl09ID', $grpID,'false','false') ";
  }
  else {
    $archiviert = $_POST['archiviert'];
    $prdID = $_POST['prdID'];

    if($archiviert == "true"){
      $bemerkung = $_POST['bemerkung'];
      $info = $_POST['info'];
      $gueltigVon = $_POST['gueltigVon'];
      $gueltigBis = $_POST['gueltigBis'];

      $tsql = "UPDATE produkte SET archiviert = 'true', ";
      $tsql .= "aenderungsBemerkung = '$bemerkung', aenderungsInfo = '$info', ";
      $tsql .= "gueltigVonPrd = '$gueltigVon', gueltigBisPrd = '$gueltigBis' ";
      $tsql .= "WHERE prd_ID = '$prdID' ";
    }
    else {
      $tsql = "UPDATE produkte SET datum = getdate(), namePrd = '$bezeichnung', artikelNrPrd = '$artikelnummer', custom1 = '$custom1', custom2 = '$custom2', ";
      $tsql .= "custom3 = '$custom3',custom4 = '$custom4',custom5 = '$custom5',custom6 = '$custom6', anl01_ID = '$anl01ID', anl02_ID = '$anl02ID', anl03_ID = '$anl03ID', ";
      $tsql .= "anl04_ID = '$anl04ID', anl05_ID = '$anl05ID', anl06_ID = '$anl06ID', anl07_ID = '$anl07ID', anl08_ID = '$anl08ID', anl09_ID = '$anl09ID', gruppenID = '$grpID' ";
      $tsql .= "WHERE prd_ID = $prdID ";
    }
  }
}
elseif($id == "std") {

    $modus = $_POST['modus'];

    $ort = $_POST['ort'];
    $kuerzel = $_POST['kuerzel'];
    $flaeche = $_POST['flaeche'];

    $customLabel1 = $_POST['customLabel1'];
    $customInput1 = $_POST['customInput1'];

    $customLabel2 = $_POST['customLabel2'];
    $customInput2 = $_POST['customInput2'];

	$customLabel3 = $_POST['customLabel3'];
    $customInput3 = $_POST['customInput3'];

	$customLabel4 = $_POST['customLabel4'];
    $customInput4 = $_POST['customInput4'];

	$customLabel5 = $_POST['customLabel5'];
    $customInput5 = $_POST['customInput5'];

	$customLabel6 = $_POST['customLabel6'];
    $customInput6 = $_POST['customInput6'];

    $notiz = $_POST['notiz'];

	if($modus == "new"){
		$liegID = $_POST['liegID'];

		$tsql = "INSERT INTO standorte(lieg_ID,datumStd,nameStd, kurzbezeichnungStd, flaecheStd, custom1LabelStd, custom1InputStd, custom2LabelStd, custom2InputStd,";
		$tsql .= "custom3LabelStd, custom3InputStd, custom4LabelStd, custom4InputStd, custom5LabelStd, custom5InputStd, custom6LabelStd,";
		$tsql .= "custom6InputStd, notizStd)";
		$tsql .= "VALUES ('$liegID', getdate(), '$ort','$kuerzel','$flaeche','$customLabel1','$customInput1','$customLabel2','$customInput2','$customLabel3',";
		$tsql .= "'$customInput3','$customLabel4','$customInput4','$customLabel5','$customInput5','$customLabel6','$customInput6','$notiz')";

}
	else{
		$stdID = $_POST['stdID'];

		$tsql =  "UPDATE standorte SET datumStd = getdate(),nameStd = '$ort', kurzbezeichnungStd = '$kuerzel', flaecheStd = '$flaeche',";
		$tsql .= "custom1LabelStd = '$customLabel1',custom1InputStd = '$customInput1',custom2InputStd = '$customInput3',";
		$tsql .= "custom3InputStd = '$customInput3',custom4InputStd = '$customInput4',custom5InputStd = '$customInput5',";
		$tsql .= "custom6InputStd = '$customInput6',";
		$tsql .= "custom2LabelStd = '$customLabel2',custom3LabelStd = '$customLabel3',";
		$tsql .= "custom4LabelStd = '$customLabel4',custom5LabelStd = '$customLabel5',custom6LabelStd = '$customLabel6',";
		$tsql .= "notizStd = '$notiz'";
		$tsql .= "WHERE std_ID = '$stdID'";
	}
}
elseif($id == "stdDr") {

  $modus = $_POST['modus'];

  $ort = $_POST['ort'];
  $kuerzel = $_POST['kuerzel'];
  $flaeche = $_POST['flaeche'];

  $customLabel1 = $_POST['customLabel1'];
  $customInput1 = $_POST['customInput1'];

  $customLabel2 = $_POST['customLabel2'];
  $customInput2 = $_POST['customInput2'];

	$customLabel3 = $_POST['customLabel3'];
    $customInput3 = $_POST['customInput3'];

	$customLabel4 = $_POST['customLabel4'];
    $customInput4 = $_POST['customInput4'];

	$customLabel5 = $_POST['customLabel5'];
    $customInput5 = $_POST['customInput5'];

	$customLabel6 = $_POST['customLabel6'];
    $customInput6 = $_POST['customInput6'];

    $notiz = $_POST['notiz'];

	if($modus == "new"){
		$liegID = $_POST['liegID'];

		$tsql = "INSERT INTO standorteDritter(lieg_ID,datumStdDr,nameStdDr, kurzbezeichnungStdDr, flaecheStdDr, custom1LabelStdDr, custom1InputStdDr, custom2LabelStdDr, custom2InputStdDr,";
		$tsql .= "custom3LabelStdDr, custom3InputStdDr, custom4LabelStdDr, custom4InputStdDr, custom5LabelStdDr, custom5InputStdDr, custom6LabelStdDr,";
		$tsql .= "custom6InputStdDr, notizStdDr)";
		$tsql .= "VALUES ('$liegID', getdate(), '$ort','$kuerzel','$flaeche','$customLabel1','$customInput1','$customLabel2','$customInput2','$customLabel3',";
		$tsql .= "'$customInput3','$customLabel4','$customInput4','$customLabel5','$customInput5','$customLabel6','$customInput6','$notiz')";
}
	else{
		$stdDrID = $_POST['stdDrID'];

		$tsql =  "UPDATE standorteDritter SET datumStdDr = getdate(),nameStdDr = '$ort', kurzbezeichnungStdDr = '$kuerzel', flaecheStdDr = '$flaeche',";
		$tsql .= "custom1LabelStdDr = '$customLabel1',custom1InputStdDr = '$customInput1',custom2InputStdDr = '$customInput3',";
		$tsql .= "custom3InputStdDr = '$customInput3',custom4InputStdDr = '$customInput4',custom5InputStdDr = '$customInput5',";
		$tsql .= "custom6InputStdDr = '$customInput6',";
		$tsql .= "custom2LabelStdDr = '$customLabel2',custom3LabelStdDr = '$customLabel3',";
		$tsql .= "custom4LabelStdDr = '$customLabel4',custom5LabelStdDr = '$customLabel5',custom6LabelStdDr = '$customLabel6',";
		$tsql .= "notizStdDr = '$notiz'";
		$tsql .= "WHERE stdDr_ID = '$stdDrID'";
	}
}
elseif($id == "anl") {

	$modus = $_POST['modus'];
	$liegID = $_POST['liegID'];

	$anlagennummer = $_POST['anlagennummer'];
	$bezeichnung = $_POST['bezeichnung'];
	$aktiv = $_POST['aktiv'];
	$typ = $_POST['typ'];
    $seriennummer = $_POST['seriennummer'];
	$standort = $_POST['standort'];
	$anschaffungsdatum = $_POST['anschaffungsdatum'];
    $baujahr = $_POST['baujahr'];

	if($_POST['jahresbetriebsstunden'] == ''){
    $jahresbetriebsstunden = 0;
	}
	else{
		$jahresbetriebsstunden = $_POST['jahresbetriebsstunden'];
	}

    $notizAllgemein = $_POST['notizAllgemein'];
    $produkt = $_POST['produkt'];

	if($_POST['produktionsmenge'] == ''){
    $produktionsmenge = 0;
	}
	else{
		$produktionsmenge = $_POST['produktionsmenge'];
	}

    $produktionsmengeEinheit = $_POST['produktionsmengeEinheit'];
    $produktnummer = $_POST['produktnummer'];
    $mehrProdukte = $_POST['mehrProdukte'];

    $zugeordneterVerbraucherID1 = $_POST['zugeordneterVerbraucherID1'];
    $zugeordneterVerbraucherID2 = $_POST['zugeordneterVerbraucherID2'];
    $zugeordneterVerbraucherID3 = $_POST['zugeordneterVerbraucherID3'];
    $zugeordneterVerbraucherID4 = $_POST['zugeordneterVerbraucherID4'];
    $zugeordneterVerbraucherID5 = $_POST['zugeordneterVerbraucherID5'];
    $zugeordneterVerbraucherID6 = $_POST['zugeordneterVerbraucherID6'];

    $energietraeger1 = $_POST['energietraeger1'];
    $energieform1 = $_POST['energieform1'];
    $einheit1 = $_POST['einheit1'];

	if($_POST['anschlussleistung1'] == ''){
    $anschlussleistung1 = 0;
	}
	else{
		$anschlussleistung1 = $_POST['anschlussleistung1'];
	}

	if($_POST['mittlereAuslastungProzent1'] == ''){
    $mittlereAuslastungProzent1 = 0;
	}
	else{
		$mittlereAuslastungProzent1 = $_POST['mittlereAuslastungProzent1'];
	}

	if($_POST['mittlereAuslastungKw1'] == ''){
    $mittlereAuslastungKw1 = 0;
	}
	else{
		$mittlereAuslastungKw1 = $_POST['mittlereAuslastungKw1'];
	}

    if($_POST['betriebstemperatur1'] == ''){
    $betriebstemperatur1 = 0;
	}
	else{
		$betriebstemperatur1 = $_POST['betriebstemperatur1'];
	}

	$messstelle1 = $_POST['messstelle1'];
	$messstelle1ID = $_POST['messstelle1ID'];
	$versBereich1 = $_POST['versBereich1'];

	if($_POST['abwaerme1'] == ''){
    $abwaerme1 = 0;
	}
	else{
		$abwaerme1 = $_POST['abwaerme1'];
	}

    $abwaermeNutzbarkeit1 = $_POST['abwaermeNutzbarkeit1'];
    $bewertungAbwaermeNutzbarkeit1 = $_POST['bewertungAbwaermeNutzbarkeit1'];

	$energietraeger2 = $_POST['energietraeger2'];
    $energieform2 = $_POST['energieform2'];
    $einheit2 = $_POST['einheit2'];

	if($_POST['anschlussleistung2'] == ''){
    $anschlussleistung2 = 0;
	}
	else{
		$anschlussleistung2 = $_POST['anschlussleistung2'];
	}

	if($_POST['mittlereAuslastungProzent2'] == ''){
    $mittlereAuslastungProzent2 = 0;
	}
	else{
		$mittlereAuslastungProzent2 = $_POST['mittlereAuslastungProzent2'];
	}

	if($_POST['mittlereAuslastungKw2'] == ''){
    $mittlereAuslastungKw2 = 0;
	}
	else{
		$mittlereAuslastungKw2 = $_POST['mittlereAuslastungKw2'];
	}

    if($_POST['betriebstemperatur2'] == ''){
    $betriebstemperatur2 = 0;
	}
	else{
		$betriebstemperatur2 = $_POST['betriebstemperatur2'];
	}

	$messstelle2 = $_POST['messstelle2'];
	$messstelle2ID = $_POST['messstelle2ID'];
	$versBereich2 = $_POST['versBereich2'];

	if($_POST['abwaerme2'] == ''){
    $abwaerme2 = 0;
	}
	else{
		$abwaerme2 = $_POST['abwaerme2'];
	}

    $abwaermeNutzbarkeit2 = $_POST['abwaermeNutzbarkeit2'];
    $bewertungAbwaermeNutzbarkeit2 = $_POST['bewertungAbwaermeNutzbarkeit2'];


	$energietraeger3 = $_POST['energietraeger3'];
    $energieform3 = $_POST['energieform3'];
    $einheit3 = $_POST['einheit3'];

	if($_POST['anschlussleistung3'] == ''){
    $anschlussleistung3 = 0;
	}
	else{
		$anschlussleistung3 = $_POST['anschlussleistung3'];
	}

	if($_POST['mittlereAuslastungProzent3'] == ''){
    $mittlereAuslastungProzent3 = 0;
	}
	else{
		$mittlereAuslastungProzent3 = $_POST['mittlereAuslastungProzent3'];
	}

	if($_POST['mittlereAuslastungKw3'] == ''){
    $mittlereAuslastungKw3 = 0;
	}
	else{
		$mittlereAuslastungKw3 = $_POST['mittlereAuslastungKw3'];
	}

    if($_POST['betriebstemperatur3'] == ''){
    $betriebstemperatur3 = 0;
	}
	else{
		$betriebstemperatur3 = $_POST['betriebstemperatur3'];
	}

	$messstelle3 = $_POST['messstelle3'];
	$messstelle3ID = $_POST['messstelle3ID'];
	$versBereich3 = $_POST['versBereich3'];

	if($_POST['abwaerme3'] == ''){
    $abwaerme3 = 0;
	}
	else{
		$abwaerme3 = $_POST['abwaerme3'];
	}

    $abwaermeNutzbarkeit3 = $_POST['abwaermeNutzbarkeit3'];
    $bewertungAbwaermeNutzbarkeit3 = $_POST['bewertungAbwaermeNutzbarkeit3'];

	$energietraeger4 = $_POST['energietraeger4'];
    $energieform4 = $_POST['energieform4'];
    $einheit4 = $_POST['einheit4'];


	if($_POST['anschlussleistung4'] == ''){
    $anschlussleistung4 = 0;
	}
	else{
		$anschlussleistung4 = $_POST['anschlussleistung4'];
	}

	if($_POST['mittlereAuslastungProzent4'] == ''){
    $mittlereAuslastungProzent4 = 0;
	}
	else{
		$mittlereAuslastungProzent4 = $_POST['mittlereAuslastungProzent4'];
	}

	if($_POST['mittlereAuslastungKw4'] == ''){
    $mittlereAuslastungKw4 = 0;
	}
	else{
		$mittlereAuslastungKw4 = $_POST['mittlereAuslastungKw4'];
	}

    if($_POST['betriebstemperatur4'] == ''){
    $betriebstemperatur4 = 0;
	}
	else{
		$betriebstemperatur4 = $_POST['betriebstemperatur4'];
	}

	$messstelle4 = $_POST['messstelle4'];
	$messstelle4ID = $_POST['messstelle4ID'];
	$versBereich4 = $_POST['versBereich4'];

	if($_POST['abwaerme4'] == ''){
    $abwaerme4 = 0;
	}
	else{
		$abwaerme4 = $_POST['abwaerme4'];
	}

    $abwaermeNutzbarkeit4 = $_POST['abwaermeNutzbarkeit4'];
    $bewertungAbwaermeNutzbarkeit4 = $_POST['bewertungAbwaermeNutzbarkeit4'];

    $custom1 = $_POST['custom1'];
    $custom2 = $_POST['custom2'];
    $custom3 = $_POST['custom3'];
    $custom4 = $_POST['custom4'];
    $custom5 = $_POST['custom5'];
    $custom6 = $_POST['custom6'];

	if($modus == "new") {

		$tsql = "INSERT INTO anlagen(lieg_ID, archiviertAnl, datumAnl, nummerAnl, bezeichnungAnl, aktivAnl, typAnl, serienNrAnl, standortAnl, datumAnschaffungAnl, baujahrAnl,";
		$tsql .= "jahresbetriebsstundenAnl, notizAnl, produktAnl, produktionsmengeAnl, produktionsmengeEinheitAnl, ";
		$tsql .= "produktnummerAnl, mehrProdukteAnl, zugeordneterVerbraucherID1, zugeordneterVerbraucherID2, zugeordneterVerbraucherID3, ";
        $tsql .= "zugeordneterVerbraucherID4, zugeordneterVerbraucherID5, zugeordneterVerbraucherID6,";

		$tsql .= "energietraeger1Anl, energieform1Anl, einheitEnergie1Anl, anschlussleistung1Anl, mittlereAuslastungProzent1Anl, ";
		$tsql .= "mittlereAuslastungKw1Anl, betriebstemperatur1Anl,messstelle1Anl,messstelle1IDAnl,versBereich1Anl, abwaerme1Anl, abwaermeNutzbarkeit1Anl, bewertungNutzbarkeitAbwaerme1Anl, ";

		$tsql .= "energietraeger2Anl, energieform2Anl, einheitEnergie2Anl, anschlussleistung2Anl, mittlereAuslastungProzent2Anl, ";
		$tsql .= "mittlereAuslastungKw2Anl, betriebstemperatur2Anl,messstelle2Anl,messstelle2IDAnl,versBereich2Anl, abwaerme2Anl, abwaermeNutzbarkeit2Anl, bewertungNutzbarkeitAbwaerme2Anl, ";

		$tsql .= "energietraeger3Anl, energieform3Anl, einheitEnergie3Anl, anschlussleistung3Anl, mittlereAuslastungProzent3Anl, ";
		$tsql .= "mittlereAuslastungKw3Anl, betriebstemperatur3Anl,messstelle3Anl,messstelle3IDAnl,versBereich3Anl, abwaerme3Anl, abwaermeNutzbarkeit3Anl, bewertungNutzbarkeitAbwaerme3Anl, ";

		$tsql .= "energietraeger4Anl, energieform4Anl, einheitEnergie4Anl, anschlussleistung4Anl, mittlereAuslastungProzent4Anl, ";
		$tsql .= "mittlereAuslastungKw4Anl, betriebstemperatur4Anl,messstelle4Anl,messstelle4IDAnl,versBereich4Anl, abwaerme4Anl, abwaermeNutzbarkeit4Anl, bewertungNutzbarkeitAbwaerme4Anl, ";
        $tsql .= "custom1Anl, custom2Anl, custom3Anl, custom4Anl, custom5Anl, custom6Anl, deleted) ";

		$tsql .= "VALUES ('$liegID', 'false', getdate(), '$anlagennummer', '$bezeichnung', '$aktiv', '$typ', '$seriennummer', '$standort', '$anschaffungsdatum', ";
		$tsql .= "'$baujahr',$jahresbetriebsstunden, '$notizAllgemein', '$produkt', $produktionsmenge,";
		$tsql .= "'$produktionsmengeEinheit', '$produktnummer', '$mehrProdukte', '$zugeordneterVerbraucherID1', '$zugeordneterVerbraucherID2', ";
        $tsql .= "'$zugeordneterVerbraucherID3', '$zugeordneterVerbraucherID4', '$zugeordneterVerbraucherID5', '$zugeordneterVerbraucherID6', ";

		$tsql .= "'$energietraeger1', '$energieform1', '$einheit1', $anschlussleistung1, $mittlereAuslastungProzent1, $mittlereAuslastungKw1, ";
		$tsql .= "$betriebstemperatur1,'$messstelle1','$messstelle1ID','$versBereich1', $abwaerme1, '$abwaermeNutzbarkeit1', '$bewertungAbwaermeNutzbarkeit1', ";

		$tsql .= "'$energietraeger2', '$energieform2', '$einheit2', $anschlussleistung2, $mittlereAuslastungProzent2, $mittlereAuslastungKw2, ";
		$tsql .= "$betriebstemperatur2,'$messstelle2','$messstelle2ID','$versBereich2', $abwaerme2, '$abwaermeNutzbarkeit2', '$bewertungAbwaermeNutzbarkeit2', ";

		$tsql .= "'$energietraeger3', '$energieform3', '$einheit3', $anschlussleistung3, $mittlereAuslastungProzent3, $mittlereAuslastungKw3, ";
		$tsql .= "$betriebstemperatur3,'$messstelle3','$messstelle3ID','$versBereich3', $abwaerme3, '$abwaermeNutzbarkeit3', '$bewertungAbwaermeNutzbarkeit3', ";

		$tsql .= "'$energietraeger4', '$energieform4', '$einheit4', $anschlussleistung4, $mittlereAuslastungProzent4, $mittlereAuslastungKw4, ";
		$tsql .= "$betriebstemperatur4,'$messstelle4','$messstelle4ID','$versBereich4', $abwaerme4, '$abwaermeNutzbarkeit4', '$bewertungAbwaermeNutzbarkeit4', ";
        $tsql .= "'$custom1','$custom2','$custom3','$custom4','$custom5','$custom6', 0)";
  }
	else{
	$anlID = $_POST['anlID'];
    $archiviert = $_POST['archiviert'];

    if($archiviert === "true"){
      $bemerkung = $_POST['bemerkung'];
      $info = $_POST['info'];
      $gueltigVon = $_POST['gueltigVon'];
      $gueltigBis = $_POST['gueltigBis'];

      $tsql = "UPDATE anlagen SET archiviertAnl = 'true', ";
      $tsql .= "aenderungsBemerkung = '$bemerkung', aenderungsInfo = '$info', ";
      $tsql .= "gueltigVonAnl = '$gueltigVon', gueltigBisAnl = '$gueltigBis' ";
      $tsql .= "WHERE anl_ID = '$anlID'";
    }
    else {
      $tsql =  "UPDATE anlagen SET lieg_ID = '$liegID', datumAnl = getdate(),nummerAnl = '$anlagennummer', bezeichnungAnl = '$bezeichnung', aktivAnl = '$aktiv',";
  	  $tsql .= "typAnl = '$typ', serienNrAnl = '$seriennummer', standortAnl = '$standort',baujahrAnl = '$baujahr', datumAnschaffungAnl = '$anschaffungsdatum', ";
  	  $tsql .= "jahresbetriebsstundenAnl = $jahresbetriebsstunden, notizAnl = '$notizAllgemein', produktAnl = '$produkt',";
  	  $tsql .= "produktionsmengeAnl = $produktionsmenge, produktionsmengeEinheitAnl = '$produktionsmengeEinheit',";
  	  $tsql .= "produktnummerAnl = '$produktnummer', mehrProdukteAnl = '$mehrProdukte', zugeordneterVerbraucherID1 = '$zugeordneterVerbraucherID1',";
  	  $tsql .= "zugeordneterVerbraucherID2 = '$zugeordneterVerbraucherID2', zugeordneterVerbraucherID3 = '$zugeordneterVerbraucherID3',";
  	  $tsql .= "zugeordneterVerbraucherID4 = '$zugeordneterVerbraucherID4', zugeordneterVerbraucherID5 = '$zugeordneterVerbraucherID5',";
  	  $tsql .= "zugeordneterVerbraucherID6 = '$zugeordneterVerbraucherID6',";

  	  $tsql .= "energietraeger1Anl = '$energietraeger1', energieform1Anl = '$energieform1', einheitEnergie1Anl = '$einheit1',";
  	  $tsql .= "anschlussleistung1Anl = $anschlussleistung1, mittlereAuslastungProzent1Anl = $mittlereAuslastungProzent1,";
  	  $tsql .= "mittlereAuslastungKw1Anl = $mittlereAuslastungKw1, betriebstemperatur1Anl = $betriebstemperatur1,";
      $tsql .= "messstelle1Anl = '$messstelle1',messstelle1IDAnl = '$messstelle1ID',versBereich1Anl = '$versBereich1', abwaerme1Anl = $abwaerme1,";
      $tsql .= "abwaermeNutzbarkeit1Anl = '$abwaermeNutzbarkeit1', bewertungNutzbarkeitAbwaerme1Anl = '$bewertungAbwaermeNutzbarkeit1',";

  	  $tsql .= "energietraeger2Anl = '$energietraeger2', energieform2Anl = '$energieform2', einheitEnergie2Anl = '$einheit2',";
  	  $tsql .= "anschlussleistung2Anl = $anschlussleistung2, mittlereAuslastungProzent2Anl = $mittlereAuslastungProzent2,";
  	  $tsql .= "mittlereAuslastungKw2Anl = $mittlereAuslastungKw2, betriebstemperatur2Anl = $betriebstemperatur2, ";
      $tsql .= "messstelle2Anl = '$messstelle2',messstelle2IDAnl = '$messstelle2ID',versBereich2Anl = '$versBereich2', abwaerme2Anl = $abwaerme2,";
      $tsql .= "abwaermeNutzbarkeit2Anl = '$abwaermeNutzbarkeit2', bewertungNutzbarkeitAbwaerme2Anl = '$bewertungAbwaermeNutzbarkeit2',";

  	  $tsql .= "energietraeger3Anl = '$energietraeger3', energieform3Anl = '$energieform3', einheitEnergie3Anl = '$einheit3',";
  	  $tsql .= "anschlussleistung3Anl = $anschlussleistung3, mittlereAuslastungProzent3Anl = $mittlereAuslastungProzent3,";
  	  $tsql .= "mittlereAuslastungKw3Anl = $mittlereAuslastungKw3, betriebstemperatur3Anl = $betriebstemperatur3, ";
      $tsql .= "messstelle3Anl = '$messstelle3',messstelle3IDAnl = '$messstelle3ID',versBereich3Anl = '$versBereich3', abwaerme3Anl = $abwaerme3,";
      $tsql .= "abwaermeNutzbarkeit3Anl = '$abwaermeNutzbarkeit3', bewertungNutzbarkeitAbwaerme3Anl = '$bewertungAbwaermeNutzbarkeit3',";

  	  $tsql .= "energietraeger4Anl = '$energietraeger4', energieform4Anl = '$energieform4', einheitEnergie4Anl = '$einheit4',";
  	  $tsql .= "anschlussleistung4Anl = $anschlussleistung4, mittlereAuslastungProzent4Anl = $mittlereAuslastungProzent4,";
  	  $tsql .= "mittlereAuslastungKw4Anl = $mittlereAuslastungKw4, betriebstemperatur4Anl = $betriebstemperatur4, ";
      $tsql .= "messstelle4Anl = '$messstelle4',messstelle4IDAnl = '$messstelle4ID',versBereich4Anl = '$versBereich4', abwaerme4Anl = $abwaerme4,";
  	  $tsql .= "abwaermeNutzbarkeit4Anl = '$abwaermeNutzbarkeit4', bewertungNutzbarkeitAbwaerme4Anl = '$bewertungAbwaermeNutzbarkeit4', ";
  	  $tsql .= "custom1Anl = '$custom1',custom2Anl = '$custom2',custom3Anl = '$custom3',custom4Anl = '$custom4',custom5Anl = '$custom5',custom6Anl = '$custom6' ";
  	  $tsql .= "WHERE anl_ID = '$anlID'";
    }
	}
}
elseif($id == "anlVersch") {
  $anlID = $_POST['anlID'];
  $liegID = $_POST['liegID'];

  $tsql = "UPDATE anlagen ";
  $tsql .= "SET lieg_ID = '$liegID' ";
  $tsql .= "WHERE anl_ID = '$anlID' ";
}
elseif($id == "anlHist") {

	$modus = $_POST['modus'];
	$liegID = $_POST['liegID'];

	$anlagennummer = $_POST['anlagennummer'];
	$bezeichnung = $_POST['bezeichnung'];
	$aktiv = $_POST['aktiv'];
	$typ = $_POST['typ'];
  $seriennummer = $_POST['seriennummer'];
	$standort = $_POST['standort'];
	$anschaffungsdatum = $_POST['anschaffungsdatum'];
  $baujahr = $_POST['baujahr'];

	if($_POST['jahresbetriebsstunden'] == ''){
    $jahresbetriebsstunden = 0;
	}
	else{
		$jahresbetriebsstunden = $_POST['jahresbetriebsstunden'];
	}

    $notizAllgemein = $_POST['notizAllgemein'];
    $produkt = $_POST['produkt'];

	if($_POST['produktionsmenge'] == ''){
    $produktionsmenge = 0;
	}
	else{
		$produktionsmenge = $_POST['produktionsmenge'];
	}

    $produktionsmengeEinheit = $_POST['produktionsmengeEinheit'];
    $produktnummer = $_POST['produktnummer'];
    $mehrProdukte = $_POST['mehrProdukte'];

    $zugeordneterVerbraucher1 = $_POST['zugeordneterVerbraucher1'];
    $zugeordneterVerbraucher2 = $_POST['zugeordneterVerbraucher2'];
    $zugeordneterVerbraucher3 = $_POST['zugeordneterVerbraucher3'];
    $zugeordneterVerbraucher4 = $_POST['zugeordneterVerbraucher4'];
    $zugeordneterVerbraucher5 = $_POST['zugeordneterVerbraucher5'];
    $zugeordneterVerbraucher6 = $_POST['zugeordneterVerbraucher6'];

    $energietraeger1 = $_POST['energietraeger1'];
    $energieform1 = $_POST['energieform1'];
    $einheit1 = $_POST['einheit1'];

	if($_POST['anschlussleistung1'] == ''){
    $anschlussleistung1 = 0;
	}
	else{
		$anschlussleistung1 = $_POST['anschlussleistung1'];
	}

	if($_POST['mittlereAuslastungProzent1'] == ''){
    $mittlereAuslastungProzent1 = 0;
	}
	else{
		$mittlereAuslastungProzent1 = $_POST['mittlereAuslastungProzent1'];
	}

	if($_POST['mittlereAuslastungKw1'] == ''){
    $mittlereAuslastungKw1 = 0;
	}
	else{
		$mittlereAuslastungKw1 = $_POST['mittlereAuslastungKw1'];
	}

    if($_POST['betriebstemperatur1'] == ''){
    $betriebstemperatur1 = 0;
	}
	else{
		$betriebstemperatur1 = $_POST['betriebstemperatur1'];
	}

	$messstelle1 = $_POST['messstelle1'];
	$versBereich1 = $_POST['versBereich1'];

	if($_POST['abwaerme1'] == ''){
    $abwaerme1 = 0;
	}
	else{
		$abwaerme1 = $_POST['abwaerme1'];
	}

    $abwaermeNutzbarkeit1 = $_POST['abwaermeNutzbarkeit1'];
    $bewertungAbwaermeNutzbarkeit1 = $_POST['bewertungAbwaermeNutzbarkeit1'];

	$energietraeger2 = $_POST['energietraeger2'];
    $energieform2 = $_POST['energieform2'];
    $einheit2 = $_POST['einheit2'];

	if($_POST['anschlussleistung2'] == ''){
    $anschlussleistung2 = 0;
	}
	else{
		$anschlussleistung2 = $_POST['anschlussleistung2'];
	}

	if($_POST['mittlereAuslastungProzent2'] == ''){
    $mittlereAuslastungProzent2 = 0;
	}
	else{
		$mittlereAuslastungProzent2 = $_POST['mittlereAuslastungProzent2'];
	}

	if($_POST['mittlereAuslastungKw2'] == ''){
    $mittlereAuslastungKw2 = 0;
	}
	else{
		$mittlereAuslastungKw2 = $_POST['mittlereAuslastungKw2'];
	}

    if($_POST['betriebstemperatur2'] == ''){
    $betriebstemperatur2 = 0;
	}
	else{
		$betriebstemperatur2 = $_POST['betriebstemperatur2'];
	}

	$messstelle2 = $_POST['messstelle2'];
	$versBereich2 = $_POST['versBereich2'];

	if($_POST['abwaerme2'] == ''){
    $abwaerme2 = 0;
	}
	else{
		$abwaerme2 = $_POST['abwaerme2'];
	}

    $abwaermeNutzbarkeit2 = $_POST['abwaermeNutzbarkeit2'];
    $bewertungAbwaermeNutzbarkeit2 = $_POST['bewertungAbwaermeNutzbarkeit2'];


	$energietraeger3 = $_POST['energietraeger3'];
    $energieform3 = $_POST['energieform3'];
    $einheit3 = $_POST['einheit3'];

	if($_POST['anschlussleistung3'] == ''){
    $anschlussleistung3 = 0;
	}
	else{
		$anschlussleistung3 = $_POST['anschlussleistung3'];
	}

	if($_POST['mittlereAuslastungProzent3'] == ''){
    $mittlereAuslastungProzent3 = 0;
	}
	else{
		$mittlereAuslastungProzent3 = $_POST['mittlereAuslastungProzent3'];
	}

	if($_POST['mittlereAuslastungKw3'] == ''){
    $mittlereAuslastungKw3 = 0;
	}
	else{
		$mittlereAuslastungKw3 = $_POST['mittlereAuslastungKw3'];
	}

    if($_POST['betriebstemperatur3'] == ''){
    $betriebstemperatur3 = 0;
	}
	else{
		$betriebstemperatur3 = $_POST['betriebstemperatur3'];
	}

	$messstelle3 = $_POST['messstelle3'];
	$versBereich3 = $_POST['versBereich3'];

	if($_POST['abwaerme3'] == ''){
    $abwaerme3 = 0;
	}
	else{
		$abwaerme3 = $_POST['abwaerme3'];
	}

    $abwaermeNutzbarkeit3 = $_POST['abwaermeNutzbarkeit3'];
    $bewertungAbwaermeNutzbarkeit3 = $_POST['bewertungAbwaermeNutzbarkeit3'];

	$energietraeger4 = $_POST['energietraeger4'];
    $energieform4 = $_POST['energieform4'];
    $einheit4 = $_POST['einheit4'];


	if($_POST['anschlussleistung4'] == ''){
    $anschlussleistung4 = 0;
	}
	else{
		$anschlussleistung4 = $_POST['anschlussleistung4'];
	}

	if($_POST['mittlereAuslastungProzent4'] == ''){
    $mittlereAuslastungProzent4 = 0;
	}
	else{
		$mittlereAuslastungProzent4 = $_POST['mittlereAuslastungProzent4'];
	}

	if($_POST['mittlereAuslastungKw4'] == ''){
    $mittlereAuslastungKw4 = 0;
	}
	else{
		$mittlereAuslastungKw4 = $_POST['mittlereAuslastungKw4'];
	}

    if($_POST['betriebstemperatur4'] == ''){
    $betriebstemperatur4 = 0;
	}
	else{
		$betriebstemperatur4 = $_POST['betriebstemperatur4'];
	}

	$messstelle4 = $_POST['messstelle4'];
	$versBereich4 = $_POST['versBereich4'];

	if($_POST['abwaerme4'] == ''){
    $abwaerme4 = 0;
	}
	else{
		$abwaerme4 = $_POST['abwaerme4'];
	}

    $abwaermeNutzbarkeit4 = $_POST['abwaermeNutzbarkeit4'];
    $bewertungAbwaermeNutzbarkeit4 = $_POST['bewertungAbwaermeNutzbarkeit4'];

    $custom1 = $_POST['custom1'];
    $custom2 = $_POST['custom2'];
    $custom3 = $_POST['custom3'];
    $custom4 = $_POST['custom4'];
    $custom5 = $_POST['custom5'];
    $custom6 = $_POST['custom6'];

		$anlID = $_POST['anlID'];
    $archiviert = $_POST['archiviert'];
    $gueltigVon = $_POST['gueltigVon'];
    $gueltigBis = $_POST['gueltigBis'];

    $tsql =  "UPDATE anlagen SET lieg_ID = '$liegID', archiviertAnl = '$archiviert', datumAnl = getdate(),nummerAnl = '$anlagennummer', bezeichnungAnl = '$bezeichnung', aktivAnl = '$aktiv',";
		$tsql .= "gueltigVonAnl = '$gueltigVon', gueltigBisAnl = '$gueltigBis', typAnl = '$typ', serienNrAnl = '$seriennummer', standortAnl = '$standort',baujahrAnl = '$baujahr', datumAnschaffungAnl = '$anschaffungsdatum', ";
		$tsql .= "jahresbetriebsstundenAnl = $jahresbetriebsstunden, notizAnl = '$notizAllgemein', produktAnl = '$produkt',";
		$tsql .= "produktionsmengeAnl = $produktionsmenge, produktionsmengeEinheitAnl = '$produktionsmengeEinheit',";
		$tsql .= "produktnummerAnl = '$produktnummer', mehrProdukteAnl = '$mehrProdukte', zugeordneterVerbraucher1 = '$zugeordneterVerbraucher1',";
		$tsql .= "zugeordneterVerbraucher2 = '$zugeordneterVerbraucher2', zugeordneterVerbraucher3 = '$zugeordneterVerbraucher3',";
		$tsql .= "zugeordneterVerbraucher4 = '$zugeordneterVerbraucher4', zugeordneterVerbraucher5 = '$zugeordneterVerbraucher5',";
		$tsql .= "zugeordneterVerbraucher6 = '$zugeordneterVerbraucher6',";

		$tsql .= "energietraeger1Anl = '$energietraeger1', energieform1Anl = '$energieform1', einheitEnergie1Anl = '$einheit1',";
		$tsql .= "anschlussleistung1Anl = $anschlussleistung1, mittlereAuslastungProzent1Anl = $mittlereAuslastungProzent1,";
		$tsql .= "mittlereAuslastungKw1Anl = $mittlereAuslastungKw1, betriebstemperatur1Anl = $betriebstemperatur1,messstelle1Anl = '$messstelle1',versBereich1Anl = '$versBereich1', abwaerme1Anl = $abwaerme1,";
    $tsql .= "abwaermeNutzbarkeit1Anl = '$abwaermeNutzbarkeit1', bewertungNutzbarkeitAbwaerme1Anl = '$bewertungAbwaermeNutzbarkeit1',";

		$tsql .= "energietraeger2Anl = '$energietraeger2', energieform2Anl = '$energieform2', einheitEnergie2Anl = '$einheit2',";
		$tsql .= "anschlussleistung2Anl = $anschlussleistung2, mittlereAuslastungProzent2Anl = $mittlereAuslastungProzent2,";
		$tsql .= "mittlereAuslastungKw2Anl = $mittlereAuslastungKw2, betriebstemperatur2Anl = $betriebstemperatur2,messstelle2Anl = '$messstelle2',versBereich2Anl = '$versBereich2', abwaerme2Anl = $abwaerme2,";
    $tsql .= "abwaermeNutzbarkeit2Anl = '$abwaermeNutzbarkeit2', bewertungNutzbarkeitAbwaerme2Anl = '$bewertungAbwaermeNutzbarkeit2',";

		$tsql .= "energietraeger3Anl = '$energietraeger3', energieform3Anl = '$energieform3', einheitEnergie3Anl = '$einheit3',";
		$tsql .= "anschlussleistung3Anl = $anschlussleistung3, mittlereAuslastungProzent3Anl = $mittlereAuslastungProzent3,";
		$tsql .= "mittlereAuslastungKw3Anl = $mittlereAuslastungKw3, betriebstemperatur3Anl = $betriebstemperatur3,messstelle3Anl = '$messstelle3',versBereich3Anl = '$versBereich3', abwaerme3Anl = $abwaerme3,";
    $tsql .= "abwaermeNutzbarkeit3Anl = '$abwaermeNutzbarkeit3', bewertungNutzbarkeitAbwaerme3Anl = '$bewertungAbwaermeNutzbarkeit3',";

		$tsql .= "energietraeger4Anl = '$energietraeger4', energieform4Anl = '$energieform4', einheitEnergie4Anl = '$einheit4',";
		$tsql .= "anschlussleistung4Anl = $anschlussleistung4, mittlereAuslastungProzent4Anl = $mittlereAuslastungProzent4,";
		$tsql .= "mittlereAuslastungKw4Anl = $mittlereAuslastungKw4, betriebstemperatur4Anl = $betriebstemperatur4,messstelle4Anl = '$messstelle4',versBereich4Anl = '$versBereich4', abwaerme4Anl = $abwaerme4,";
		$tsql .= "abwaermeNutzbarkeit4Anl = '$abwaermeNutzbarkeit4', bewertungNutzbarkeitAbwaerme4Anl = '$bewertungAbwaermeNutzbarkeit4', ";
		$tsql .= "custom1Anl = '$custom1',custom2Anl = '$custom2',custom3Anl = '$custom3',custom4Anl = '$custom4',custom5Anl = '$custom5',custom6Anl = '$custom6' ";
		$tsql .= "WHERE anl_ID = '$anlID'";
}
elseif($id == "msm") {
	$modus = $_POST['modus'];

	$liegID = $_POST['liegID'];
	$nr = $_POST['nr'];
	$bezeichnung = $_POST['bezeichnung'];
    $mstID = $_POST['mstID'];
	$anlID = $_POST['anlID'];
	$typ = $_POST['typ'];
	$nrTyp = $_POST['nrTyp'];
	$datumInstallation = $_POST['datumInstallation'];
	$energietraeger = $_POST['energietraeger'];
	$einheit = $_POST['einheit'];
	$multibox = $_POST['multibox'];
	$unit = $_POST['unit'];
	$typUnit = $_POST['typUnit'];
    $verbrauchswertbildung = $_POST['verbrauchswertbildung'];

	if ($_POST['anzahlKanaele'] == ""){
		$anzahlKanaele = 0;
	}
	else{
	$anzahlKanaele = $_POST['anzahlKanaele'];
	}

	$messungsform = $_POST['messungsform'];

	$kanal1 = $_POST['kanal1'];
	$kanal2 = $_POST['kanal2'];
	$kanal3 = $_POST['kanal3'];

	$notizAllgemein = $_POST['notizAllgemein'];

	$nameBeauftragter = $_POST['nameBeauftragter'];
	$emailBeauftragter = $_POST['emailBeauftragter'];
	$pruefzyklus = $_POST['pruefzyklus'];
	$letztePruefung = $_POST['letztePruefung'];
	$naechstePruefung = $_POST['naechstePruefung'];
	$notizPruef = $_POST['notizPruef'];

	$messmethode = $_POST['messmethode'];
	$messzyklus = $_POST['messzyklus'];

	if ($_POST['messtoleranz'] == ""){
		$messtoleranz = 0;
	}
	else{
	$messtoleranz = $_POST['messtoleranz'];
	}

	$notizAllgInfos = $_POST['notizAllgInfos'];

	if ($_POST['wandlerfaktor'] == ""){
		$wandlerfaktor = 1;
	}
	else{
	$wandlerfaktor = $_POST['wandlerfaktor'];
	}

	$geraetetyp = $_POST['geraetetyp'];
	$ipAddresse = $_POST['ipAddresse'];
	$subnetMaske = $_POST['subnetMaske'];
	$gateway = $_POST['gateway'];

	if ($_POST['cgiPort'] == ""){
		$cgiPort = 0;
	}
	else{
	$cgiPort = $_POST['cgiPort'];
	}

	if ($_POST['modbusPort'] == ""){
		$modbusPort = 0;
	}
	else{
	$modbusPort = $_POST['modbusPort'];
	}

	if ($_POST['ftpPort'] == ""){
		$ftpPort = 0;
	}
	else{
	$ftpPort = $_POST['ftpPort'];
	}
	$notizTechnDetails = $_POST['notizTechnDetails'];

	if($modus == "new"){
		$tsql = "INSERT INTO messmittel ";
    $tsql .= "(lieg_ID, datum, nrMsm, bezeichnungMsm, typMsm, installationsdatumMsm, energietraegerMsm, einheitMsm, multiboxMsm, unitMsm ";
    $tsql .= ",unitTypMsm, anzahlKanaeleMsm, messungsformMsm, notizAllgemeinMsm, nameBeauftragterMsm, emailBeauftragterMsm, pruefzyklusMsm ";
    $tsql .= ",letztePruefungMsm, naechstePruefungMsm, notizPruefungsinformationenMsm, messmethodeConfig, messzyklusConfig, messtoleranzConfig ";
    $tsql .= ",kanal1Msm, kanal2Msm, kanal3Msm, notizAllgemeinConfig, ipAdresseConfig, subnetMaskConfig, gatewayConfig, cgiPortConfig ";
    $tsql .= ",modbusPortConfig, ftpPortConfig, notizTechnischeDetailsConfig, typNrMsm, verbrauchswertbildungConfig, wandlungsfaktorMsm, geraeteTypMsm, mst_ID, anl_ID) ";

    $tsql .= "VALUES ";
    $tsql .= "('$liegID', getdate(), '$nr', '$bezeichnung', '$typ', '$datumInstallation', '$energietraeger', '$einheit', '$multibox', '$unit', '$typUnit', $anzahlKanaele ";
    $tsql .= ",'$messungsform', '$notizAllgemein', '$nameBeauftragter', '$emailBeauftragter', '$pruefzyklus', '$letztePruefung', '$naechstePruefung' ";
		$tsql .= ",'$notizPruef', '$messmethode', '$messzyklus' ,$messtoleranz, '$kanal1', '$kanal2', '$kanal3', '$notizAllgInfos', '$ipAddresse', '$subnetMaske' ";
    $tsql .= ",'$gateway', $cgiPort, $modbusPort, $ftpPort, '$notizTechnDetails', '$nrTyp', '$verbrauchswertbildung', $wandlerfaktor, '$geraetetyp', '$mstID', '$anlID') ";
	}
	else{
		$msmID = $_POST['msmID'];

		$tsql = "UPDATE messmittel ";
		$tsql .= "SET nrMsm = '$nr' ";
        $tsql .= ",datum = getdate() ";
        $tsql .= ",bezeichnungMsm = '$bezeichnung' ";
		$tsql .= ",mst_ID = '$mstID' ";
        $tsql .= ",anl_ID = '$anlID' ";
		$tsql .= ",typMsm = '$typ' ";
		$tsql .= ",installationsdatumMsm = '$datumInstallation' ";
		$tsql .= ",energietraegerMsm = '$energietraeger' ";
		$tsql .= ",einheitMsm = '$einheit' ";
		$tsql .= ",multiboxMsm = '$multibox' ";
		$tsql .= ",unitMsm = '$unit' ";
		$tsql .= ",unitTypMsm = '$typUnit' ";
		$tsql .= ",anzahlKanaeleMsm = $anzahlKanaele ";
		$tsql .= ",messungsformMsm = '$messungsform' ";
		$tsql .= ",notizAllgemeinMsm = '$notizAllgemein' ";
		$tsql .= ",nameBeauftragterMsm = '$nameBeauftragter' ";
		$tsql .= ",emailBeauftragterMsm = '$emailBeauftragter' ";
		$tsql .= ",pruefzyklusMsm = '$pruefzyklus' ";
		$tsql .= ",letztePruefungMsm = '$letztePruefung' ";
		$tsql .= ",naechstePruefungMsm = '$naechstePruefung' ";
		$tsql .= ",notizPruefungsinformationenMsm = '$notizPruef' ";
		$tsql .= ",messmethodeConfig = '$messmethode' ";
		$tsql .= ",messzyklusConfig = '$messzyklus' ";
		$tsql .= ",messtoleranzConfig = $messtoleranz ";
		$tsql .= ",kanal1Msm = '$kanal1' ";
		$tsql .= ",kanal2Msm = '$kanal2' ";
		$tsql .= ",kanal3Msm = '$kanal3' ";
		$tsql .= ",notizAllgemeinConfig = '$notizAllgInfos' ";
		$tsql .= ",ipAdresseConfig = '$ipAddresse' ";
		$tsql .= ",subnetMaskConfig = '$subnetMaske' ";
		$tsql .= ",gatewayConfig = '$gateway' ";
		$tsql .= ",cgiPortConfig = $cgiPort ";
		$tsql .= ",modbusPortConfig = $modbusPort ";
		$tsql .= ",ftpPortConfig = $ftpPort ";
		$tsql .= ",notizTechnischeDetailsConfig = '$notizTechnDetails' ";
		$tsql .= ",typNrMsm = '$nrTyp' ";
        $tsql .= ",verbrauchswertbildungConfig = '$verbrauchswertbildung' ";
		$tsql .= ",wandlungsfaktorMsm = $wandlerfaktor ";
		$tsql .= ",geraeteTypMsm = '$geraetetyp' ";
		$tsql .= "WHERE msm_ID = '$msmID' ";
	}
}
elseif($id == "ent") {

  $modus = $_POST['modus'];
  $entID = $_POST['entID'];
  $name = $_POST['name'];
  $kuerzel = $_POST['kuerzel'];
  $allgemEnt = $_POST['allgemEnt'];
  $notiz = $_POST['notiz'];

	$versorgerEvu = $_POST['versorgerEvu'];
  $versorgerUenb = $_POST['versorgerUenb'];
  $versorgerMsb = $_POST['versorgerMsb'];
	$einheit1 = $_POST['einheit1'];
	$einheit2 = $_POST['einheit2'];
	$einheit3 = $_POST['einheit3'];

	if($_POST['einh1FaktorKwh'] == ""){
		$einh1FaktorKwh = 1;
	}
	else{
		$einh1FaktorKwh = $_POST['einh1FaktorKwh'];
	}
	if($_POST['einh2FaktorKwh'] == ""){
		$einh2FaktorKwh = 1;
	}
	else{
		$einh2FaktorKwh = $_POST['einh2FaktorKwh'];
	}
	if($_POST['einh3FaktorKwh'] == ""){
		$einh3FaktorKwh = 1;
	}
	else{
		$einh3FaktorKwh = $_POST['einh3FaktorKwh'];
	}

	if($_POST['einh1FaktorCO2'] == ""){
		$einh1FaktorCO2 = 0;
	}
	else{
		$einh1FaktorCO2 = $_POST['einh1FaktorCO2'];
	}
	if($_POST['einh2FaktorCO2'] == ""){
		$einh2FaktorCO2 = 0;
	}
	else{
		$einh2FaktorCO2 = $_POST['einh2FaktorCO2'];
	}
	if($_POST['einh3FaktorCO2'] == ""){
		$einh3FaktorCO2 = 0;
	}
	else{
		$einh3FaktorCO2 = $_POST['einh3FaktorCO2'];
	}
	$lblEinh1FaktorX1 = $_POST['lblEinh1FaktorX1'];
	$lblEinh2FaktorX1 = $_POST['lblEinh2FaktorX1'];
	$lblEinh3FaktorX1 = $_POST['lblEinh3FaktorX1'];
	if($_POST['einh1FaktorX1'] == ""){
		$einh1FaktorX1 = 0;
	}
	else{
		$einh1FaktorX1 = $_POST['einh1FaktorX1'];
	}
	if($_POST['einh2FaktorX1'] == ""){
		$einh2FaktorX1 = 0;
	}
	else{
		$einh2FaktorX1 = $_POST['einh2FaktorX1'];
	}
	if($_POST['einh3FaktorX1'] == ""){
		$einh3FaktorX1 = 0;
	}
	else{
		$einh3FaktorX1 = $_POST['einh3FaktorX1'];
	}
	$lblEinh1FaktorX2 = $_POST['lblEinh1FaktorX2'];
	$lblEinh2FaktorX2 = $_POST['lblEinh2FaktorX2'];
	$lblEinh3FaktorX2 = $_POST['lblEinh3FaktorX2'];
	if($_POST['einh1FaktorX2'] == ""){
		$einh1FaktorX2 = 0;
	}
	else{
		$einh1FaktorX2 = $_POST['einh1FaktorX2'];
	}
	if($_POST['einh2FaktorX2'] == ""){
		$einh2FaktorX2 = 0;
	}
	else{
		$einh2FaktorX2 = $_POST['einh2FaktorX2'];
	}
	if($_POST['einh3FaktorX2'] == ""){
		$einh3FaktorX2 = 0;
	}
	else{
		$einh3FaktorX2 = $_POST['einh3FaktorX2'];
	}
	$lblEinh1FaktorX3 = $_POST['lblEinh1FaktorX3'];
	$lblEinh2FaktorX3 = $_POST['lblEinh2FaktorX3'];
	$lblEinh3FaktorX3 = $_POST['lblEinh3FaktorX3'];
	if($_POST['einh1FaktorX3'] == ""){
		$einh1FaktorX3 = 0;
	}
	else{
		$einh1FaktorX3 = $_POST['einh1FaktorX3'];
	}
	if($_POST['einh2FaktorX3'] == ""){
		$einh2FaktorX3 = 0;
	}
	else{
		$einh2FaktorX3 = $_POST['einh2FaktorX3'];
	}
	if($_POST['einh3FaktorX3'] == ""){
		$einh3FaktorX3 = 0;
	}
	else{
		$einh3FaktorX3 = $_POST['einh3FaktorX3'];
	}
	$gueltigVom = $_POST['gueltigVom'];
	$gueltigBis = $_POST['gueltigBis'];

	if($modus == "new"){
    echo "New Ent!!";
    $liegID = $_POST['liegID'];

		$tsql = "INSERT INTO energietraeger(lieg_ID,nameEnt,kuerzelEnt,allgemeinerEnt,notizEnt) ";
    $tsql .= "VALUES ('$liegID', '$name', '$kuerzel','$allgemEnt', '$notiz') ";
    queryDB($conn, $tsql, "write");

    $query  = "SELECT ent_ID FROM energietraeger ";
    $query .= "ORDER BY ent_ID ";
    $records = queryDB($conn, $query, "read");

    if(count($records) == 0){
      $entID = 1;
    }
    else {
      $entID = $records[count($records) - 1]["ent_ID"];
    }
    echo json_encode($records);
    echo $entID;

    $tsql = "INSERT INTO versorger(ent_ID,eingabeDatum,versorgerEvu,versorgerUenb,versorgerMsb,";
    $tsql .= "einheit1Ent, einheit2Ent, einheit3Ent,";
		$tsql .= "entEinh1FaktorKwh,entEinh2FaktorKwh,entEinh3FaktorKwh,entEinh1FaktorCO2,entEinh2FaktorCO2,entEinh3FaktorCO2,";
		$tsql .= "lblEntEinh1FaktorX1,lblEntEinh2FaktorX1,lblEntEinh3FaktorX1,entEinh1FaktorX1,entEinh2FaktorX1,entEinh3FaktorX1,";
		$tsql .= "lblEntEinh1FaktorX2,lblEntEinh2FaktorX2,lblEntEinh3FaktorX2,entEinh1FaktorX2,entEinh2FaktorX2,entEinh3FaktorX2,";
		$tsql .= "lblEntEinh1FaktorX3,lblEntEinh2FaktorX3,lblEntEinh3FaktorX3,entEinh1FaktorX3,entEinh2FaktorX3,entEinh3FaktorX3,";
		$tsql .= "gueltigVomEnt, gueltigBisEnt) ";
    $tsql .= "VALUES ('$entID',getdate(),'$versorgerEvu','$versorgerUenb','$versorgerMsb',";
		$tsql .= "'$einheit1', '$einheit2', '$einheit3',";
		$tsql .= "$einh1FaktorKwh, $einh2FaktorKwh, $einh3FaktorKwh, $einh1FaktorCO2, $einh2FaktorCO2, $einh3FaktorCO2,";
		$tsql .= "'$lblEinh1FaktorX1', '$lblEinh2FaktorX1', '$lblEinh3FaktorX1', $einh1FaktorX1, $einh2FaktorX1, $einh3FaktorX1,";
		$tsql .= "'$lblEinh1FaktorX2', '$lblEinh2FaktorX2', '$lblEinh3FaktorX2', $einh1FaktorX2, $einh2FaktorX2, $einh3FaktorX2,";
		$tsql .= "'$lblEinh1FaktorX3', '$lblEinh2FaktorX3', '$lblEinh3FaktorX3', $einh1FaktorX3, $einh2FaktorX3, $einh3FaktorX3,";
		$tsql .= "'$gueltigVom', '$gueltigBis')";
}
else{
  $modusVers = $_POST['modusVers'];

	$tsql =  "UPDATE energietraeger SET nameEnt = '$name', kuerzelEnt = '$kuerzel', allgemeinerEnt = '$allgemEnt', notizEnt = '$notiz' ";
  $tsql .= "WHERE ent_ID = '$entID' ";

  if($modusVers == "neu"){
    $tsql .= "INSERT INTO versorger(ent_ID,eingabeDatum,versorgerEvu,versorgerUenb,versorgerMsb,";
    $tsql .= "einheit1Ent, einheit2Ent, einheit3Ent,";
		$tsql .= "entEinh1FaktorKwh,entEinh2FaktorKwh,entEinh3FaktorKwh,entEinh1FaktorCO2,entEinh2FaktorCO2,entEinh3FaktorCO2,";
		$tsql .= "lblEntEinh1FaktorX1,lblEntEinh2FaktorX1,lblEntEinh3FaktorX1,entEinh1FaktorX1,entEinh2FaktorX1,entEinh3FaktorX1,";
		$tsql .= "lblEntEinh1FaktorX2,lblEntEinh2FaktorX2,lblEntEinh3FaktorX2,entEinh1FaktorX2,entEinh2FaktorX2,entEinh3FaktorX2,";
		$tsql .= "lblEntEinh1FaktorX3,lblEntEinh2FaktorX3,lblEntEinh3FaktorX3,entEinh1FaktorX3,entEinh2FaktorX3,entEinh3FaktorX3,";
		$tsql .= "gueltigVomEnt, gueltigBisEnt) ";
    $tsql .= "VALUES ('$entID',getdate(),'$versorgerEvu','$versorgerUenb','$versorgerMsb',";
		$tsql .= "'$einheit1', '$einheit2', '$einheit3',";
		$tsql .= "$einh1FaktorKwh, $einh2FaktorKwh, $einh3FaktorKwh, $einh1FaktorCO2, $einh2FaktorCO2, $einh3FaktorCO2,";
		$tsql .= "'$lblEinh1FaktorX1', '$lblEinh2FaktorX1', '$lblEinh3FaktorX1', $einh1FaktorX1, $einh2FaktorX1, $einh3FaktorX1,";
		$tsql .= "'$lblEinh1FaktorX2', '$lblEinh2FaktorX2', '$lblEinh3FaktorX2', $einh1FaktorX2, $einh2FaktorX2, $einh3FaktorX2,";
		$tsql .= "'$lblEinh1FaktorX3', '$lblEinh2FaktorX3', '$lblEinh3FaktorX3', $einh1FaktorX3, $einh2FaktorX3, $einh3FaktorX3,";
		$tsql .= "'$gueltigVom', '$gueltigBis')";
  }
  else{
    $versID = $_POST['versID'];

    $tsql .= "UPDATE versorger SET eingabeDatum = getdate(), versorgerEvu = '$versorgerEvu',versorgerUenb = '$versorgerUenb',";
    $tsql .= "versorgerMsb = '$versorgerMsb', einheit1Ent = '$einheit1',einheit2Ent = '$einheit2',einheit3Ent = '$einheit3',";
    $tsql .= "entEinh1FaktorKwh = $einh1FaktorKwh,entEinh2FaktorKwh = $einh2FaktorKwh,entEinh3FaktorKwh = $einh3FaktorKwh,";
    $tsql .= "entEinh1FaktorCO2 = $einh1FaktorCO2,entEinh2FaktorCO2 = $einh2FaktorCO2,entEinh3FaktorCO2 = $einh3FaktorCO2,";
    $tsql .= "lblEntEinh1FaktorX1 = '$lblEinh1FaktorX1',lblEntEinh2FaktorX1 = '$lblEinh2FaktorX1',lblEntEinh3FaktorX1 = '$lblEinh3FaktorX1',";
    $tsql .= "entEinh1FaktorX1 = $einh1FaktorX1,entEinh2FaktorX1 = $einh2FaktorX1,entEinh3FaktorX1 = $einh3FaktorX1,";
    $tsql .= "lblEntEinh1FaktorX2 = '$lblEinh1FaktorX2',lblEntEinh2FaktorX2 = '$lblEinh2FaktorX2',lblEntEinh3FaktorX2 = '$lblEinh3FaktorX2',";
    $tsql .= "entEinh1FaktorX2 = $einh1FaktorX2,entEinh2FaktorX2 = $einh2FaktorX2,entEinh3FaktorX2 = $einh3FaktorX2,";
    $tsql .= "lblEntEinh1FaktorX3 = '$lblEinh1FaktorX3',lblEntEinh2FaktorX3 = '$lblEinh2FaktorX3',lblEntEinh3FaktorX3 = '$lblEinh3FaktorX3',";
    $tsql .= "entEinh1FaktorX3 = $einh1FaktorX3,entEinh2FaktorX3 = $einh2FaktorX3,entEinh3FaktorX3 = $einh3FaktorX3,";
    $tsql .= "gueltigVomEnt = '$gueltigVom', gueltigBisEnt = '$gueltigBis' ";

    $tsql .= "WHERE vers_ID = '$versID'";
    }
  }
}
elseif($id == "eRng") {

    $modus = $_POST['modus'];
	$liegID = $_POST['liegID'];
    $versorger = $_POST['versorger'];
	$rechnungsmodus = $_POST['rechnungsmodus'];
    $rechnungsnummer = $_POST['rechnungsnummer'];
	$zaehlpunktnummer = $_POST['zaehlpunktnummer'];
	$mstID = $_POST['mstID'];
    $rechnungsdatum = $_POST['rechnungsdatum'];
	$abrechnungszeitVom = $_POST['abrechnungszeitVom'];
	$abrechnungszeitBis = $_POST['abrechnungszeitBis'];
	$energietraeger = $_POST['energietraeger'];
	$einheit = $_POST['einheit'];
    $kostenstelle = $_POST['kostenstelle'];


	if($_POST['menge'] == ""){
		$menge = 0;
	}
	else{
		$menge = $_POST['menge'];
	}
	if($_POST['kosten'] == ""){
		$kosten = 0;
	}
	else{
		$kosten = $_POST['kosten'];
	}

	if($_POST['verbrauch'] == ""){
		$verbrauch = 0;
	}
	else{
		$verbrauch = $_POST['verbrauch'];
	}

	if($_POST['tagstromVerbr'] == ""){
		$tagstromVerbr = 0;
	}
	else{
		$tagstromVerbr = $_POST['tagstromVerbr'];
	}

	if($_POST['tagstromKost'] == ""){
		$tagstromKost = 0;
	}
	else{
		$tagstromKost = $_POST['tagstromKost'];
	}

	if($_POST['nachtstromVerbr'] == ""){
		$nachtstromVerbr = 0;
	}
	else{
		$nachtstromVerbr = $_POST['nachtstromVerbr'];
	}

	if($_POST['nachtstromKost'] == ""){
		$nachtstromKost = 0;
	}
	else{
		$nachtstromKost = $_POST['nachtstromKost'];
	}
	if($_POST['blindstrom'] == ""){
		$blindstrom = 0;
	}
	else{
		$blindstrom = $_POST['blindstrom'];
	}

	if($_POST['lastspitze'] == ""){
		$lastspitze = 0;
	}
	else{
		$lastspitze = $_POST['lastspitze'];
	}

	if($_POST['leistungspreis'] == ""){
		$leistungspreis = 0;
	}
	else{
		$leistungspreis = $_POST['leistungspreis'];
	}

	if($_POST['arbeitspreisWirkstrom'] == ""){
		$arbeitspreisWirkstrom = 0;
	}
	else{
		$arbeitspreisWirkstrom = $_POST['arbeitspreisWirkstrom'];
	}

	if($_POST['stromsteuer'] == ""){
		$stromsteuer = 0;
	}
	else{
		$stromsteuer = $_POST['stromsteuer'];
	}

	if($_POST['eegUmlage'] == ""){
		$eegUmlage = 0;
	}
	else{
		$eegUmlage = $_POST['eegUmlage'];
	}

	if($_POST['eegUmlageUntMill'] == ""){
		$eegUmlageUntMill = 0;
	}
	else{
		$eegUmlageUntMill = $_POST['eegUmlageUntMill'];
	}

	if($_POST['eegUmlageUebMill'] == ""){
		$eegUmlageUebMill = 0;
	}
	else{
		$eegUmlageUebMill = $_POST['eegUmlageUebMill'];
	}

	if($_POST['arbeitspreisNetz'] == ""){
		$arbeitspreisNetz = 0;
	}
	else{
		$arbeitspreisNetz = $_POST['arbeitspreisNetz'];
	}

	if($_POST['konzessionsabgabe'] == ""){
		$konzessionsabgabe = 0;
	}
	else{
		$konzessionsabgabe = $_POST['konzessionsabgabe'];
	}

	if($_POST['kwkUnter'] == ""){
		$kwkUnter = 0;
	}
	else{
		$kwkUnter = $_POST['kwkUnter'];
	}

	if($_POST['kwkUeber'] == ""){
		$kwkUeber = 0;
	}
	else{
		$kwkUeber = $_POST['kwkUeber'];
	}

	if($_POST['nevUnter'] == ""){
		$nevUnter = 0;
	}
	else{
		$nevUnter = $_POST['nevUnter'];
	}

	if($_POST['nevUeber'] == ""){
		$nevUeber = 0;
	}
	else{
		$nevUeber = $_POST['nevUeber'];
	}

	if($_POST['offUnter'] == ""){
		$offUnter = 0;
	}
	else{
		$offUnter = $_POST['offUnter'];
	}

	if($_POST['offUeber'] == ""){
		$offUeber = 0;
	}
	else{
		$offUeber = $_POST['offUeber'];
	}

	$lblCustom1 = $_POST['lblCustom1'];
	$lblCustom2 = $_POST['lblCustom2'];
	$lblCustom3 = $_POST['lblCustom3'];
	$lblCustom4 = $_POST['lblCustom4'];
	$lblCustom5 = $_POST['lblCustom5'];
	$lblCustom6 = $_POST['lblCustom6'];

	if($_POST['Custom1'] == ""){
		$Custom1 = 0;
	}
	else{
		$Custom1 = $_POST['Custom1'];
	}

	if($_POST['Custom2'] == ""){
		$Custom2 = 0;
	}
	else{
		$Custom2 = $_POST['Custom2'];
	}

	if($_POST['Custom3'] == ""){
		$Custom3 = 0;
	}
	else{
		$Custom3 = $_POST['Custom3'];
	}

	if($_POST['Custom4'] == ""){
		$Custom4 = 0;
	}
	else{
		$Custom4 = $_POST['Custom4'];
	}

	if($_POST['Custom5'] == ""){
		$Custom5 = 0;
	}
	else{
		$Custom5 = $_POST['Custom5'];
	}

	if($_POST['Custom6'] == ""){
		$Custom6 = 0;
	}
	else{
		$Custom6 = $_POST['Custom6'];
	}


	if($modus == "new"){

		$tsql = "INSERT INTO externeRechnungen(lieg_ID,versorgerERng,rechnungsmodusERng,nrERng,zpNrERng,mst_ID,datumERng,vomERng,bisERng,entERng,einERng,mengeERng,verbrauchERng,kostenERng,";
		$tsql .= "tagstromVerbrERng,tagstromKostERng,nachtstromVerbrERng,nachtstromKostERng,blindstromERng,lastspitzeERng,leistungspreisERng,abpWirkERng,strSteuERng,eegERng,";
		$tsql .= "eegUntERng,eegUebERng,abpNetzERng,konzERng,kwkUntERng,kwkObERng,nevUntERng,nevObERng,offUntERng,offObERng,";
		$tsql .= "lblCustom1ERng,Custom1ERng,lblCustom2ERng,Custom2ERng,lblCustom3ERng,Custom3ERng,lblCustom4ERng,Custom4ERng,lblCustom5ERng,Custom5ERng,lblCustom6ERng,Custom6ERng,kostenstelleERng) ";

		$tsql .= "VALUES ('$liegID', '$versorger', '$rechnungsmodus','$rechnungsnummer', '$zaehlpunktnummer','$mstID','$rechnungsdatum', '$abrechnungszeitVom','$abrechnungszeitBis','$energietraeger',";
		$tsql .= "'$einheit',$menge,$verbrauch,$kosten, $tagstromVerbr, $tagstromKost, $nachtstromVerbr, $nachtstromKost, $blindstrom, $lastspitze, $leistungspreis, $arbeitspreisWirkstrom, $stromsteuer, $eegUmlage,";
		$tsql .= "$eegUmlageUntMill, $eegUmlageUebMill, $arbeitspreisNetz, $konzessionsabgabe, ";
		$tsql .= "$kwkUnter, $kwkUeber, $nevUnter, $nevUeber, $offUnter, $offUeber,";

		$tsql .= "'$lblCustom1', $Custom1, '$lblCustom2', $Custom2, '$lblCustom3', $Custom3, '$lblCustom4', $Custom4, '$lblCustom5', $Custom5,";
		$tsql .= "'$lblCustom6', $Custom6, '$kostenstelle')";
}
else {
		$eRngID = $_POST['eRngID'];

		$tsql =  "UPDATE externeRechnungen SET versorgerERng = '$versorger',rechnungsmodusERng = '$rechnungsmodus', nrERng = '$rechnungsnummer', zpNrERng = '$zaehlpunktnummer',mst_ID = $mstID, datumERng = '$rechnungsdatum', vomERng = '$abrechnungszeitVom',";
		$tsql .= "bisERng = '$abrechnungszeitBis',entERng = '$energietraeger',einERng = '$einheit',mengeERng = $menge, verbrauchERng = $verbrauch,";
		$tsql .= "kostenERng = $kosten, tagstromVerbrERng = $tagstromVerbr, tagstromKostERng = $tagstromKost,nachtstromVerbrERng = $nachtstromVerbr,nachtstromKostERng = $nachtstromKost, blindstromERng= $blindstrom,lastspitzeERng = $lastspitze,";
		$tsql .= "leistungspreisERng = $leistungspreis,abpWirkERng = $arbeitspreisWirkstrom,strSteuERng = $stromsteuer,";
		$tsql .= "eegERng = $eegUmlage,eegUntERng = $eegUmlageUntMill,eegUebERng = $eegUmlageUebMill, abpNetzERng = $arbeitspreisNetz, konzERng = $konzessionsabgabe,";
		$tsql .= "kwkUntERng = $kwkUnter, kwkObERng = $kwkUeber, nevUntERng = $nevUnter,";
		$tsql .= "nevObERng = $nevUeber, offUntERng = $offUnter, offObERng = $offUeber,";

		$tsql .= "lblCustom1ERng = '$lblCustom1',Custom1ERng = $Custom1,lblCustom2ERng = '$lblCustom2',Custom2ERng = $Custom2,";
		$tsql .= "lblCustom3ERng = '$lblCustom3',Custom3ERng = $Custom3,lblCustom4ERng = '$lblCustom4',Custom4ERng = $Custom4,";
		$tsql .= "lblCustom5ERng = '$lblCustom5',Custom5ERng = $Custom5,lblCustom6ERng = '$lblCustom6',Custom6ERng = $Custom6, kostenstelleERng = '$kostenstelle' ";

		$tsql .= "WHERE eRng_ID = '$eRngID'";
	}
}
elseif($id == "intEngIMw") {
	$modus = $_POST['modus'];
  $mstID = $_POST['mstID'];

	$zeitintervall = $_POST['zeitintervall'];
	$einheit = $_POST['einheit'];
	$notiz = $_POST['notiz'];

	$tsql = "UPDATE messstellen SET zeitintervallMst = '$zeitintervall', einheitMst = '$einheit', notizMesswertManuell = '$notiz' ";
	$tsql .= "WHERE mst_ID = '$mstID'";
}
elseif ($id == "intBdeIMw") {
  $modus = $_POST['modus'];
  $anlID = $_POST['anlID'];

	$zeitintervall = $_POST['zeitintervall'];
	$einheit = $_POST['einheit'];
	$notiz = $_POST['notiz'];

	$tsql = "UPDATE anlagen SET zeitintervallAnl = '$zeitintervall', einheitAnl = '$einheit', notizMesswertManuell = '$notiz' ";
	$tsql .= "WHERE anl_ID = '$anlID'";
}
elseif($id == "eAnl") {
	$modus = $_POST['modus'];
  $name = $_POST['name'];
  $kurz = $_POST['kurz'];
	$beschreibung = $_POST['beschreibung'];
	$optionen = $_POST['optionen'];

	if($modus == "new"){
		$tsql = "INSERT INTO erweiterungenAnlagen(name, kurz, beschreibung, optionen) ";
		$tsql .= "VALUES ('$name','$kurz','$beschreibung','$optionen') ";
  }
	else{
		$eAnlID = $_POST['eAnlID'];

		$tsql = "UPDATE erweiterungenAnlagen SET name = '$name', kurz = '$kurz', beschreibung = '$beschreibung',";
    $tsql .= "optionen = '$optionen' ";
    $tsql .= "WHERE eAnl_ID = '$eAnlID' ";
	}
}
elseif($id == "ePrd") {
	$modus = $_POST['modus'];
  $name = $_POST['name'];
  $kurz = $_POST['kurz'];
	$beschreibung = $_POST['beschreibung'];
	$optionen = $_POST['optionen'];

  $ePrdID = $_POST['ePrdID'];

	/*if($modus == "new"){*/
  if($modus == "new" || $ePrdID ==""){
    //echo '1st';die;
		$tsql = "INSERT INTO erweiterungenProdukte(name, kurz, beschreibung, optionen, deleted) ";
		$tsql .= "VALUES ('$name','$kurz','$beschreibung','$optionen', 'false') ";
  }
	else{
		//$ePrdID = $_POST['ePrdID'];
    //echo '2nd';die;
		$tsql = "UPDATE erweiterungenProdukte SET name = '$name', kurz = '$kurz', beschreibung = '$beschreibung',";
    $tsql .= "optionen = '$optionen' ";
    $tsql .= "WHERE ePrd_ID = '$ePrdID' ";
	}
}  /*24-02-2020 Insert data into database using php*/
elseif($id == "ePrdKFE") {
  $modus = $_POST['modus'];
  
  if($modus == "save" && isset($_POST['xOptionName']) && isset($_POST['yOptionWert'])){
      $xOptionNames = $_POST['xOptionName'];
      $yOptionWert = $_POST['yOptionWert'];
      $zOptionDesc = $_POST['zOptionDesc'];
      $zOptionGroupTxt = $_POST['zOptionGroupTxt'];
      $zOptionGroupID = $_POST['zOptionGroupID'];

      $i=0;
      foreach ($xOptionNames as $key => $xOptionName) {
        
        $name = $xOptionName;
        $wert = $yOptionWert[$key];
        $desc = $zOptionDesc[$i];
        /*$groupName = $zOptionGroupTxt[$i];*/
        $groupID = $zOptionGroupID[$i];

        $kfeQuery = "INSERT INTO korrekturFaktorEinfugen(name,wert,description,ePrdKFE_GrpID,deleted)";
        $kfeQuery .= "VALUES ('$name','$wert','$desc','$groupID','false')";
          queryDB( $conn, $kfeQuery, "write" ); 
        $i++;
        
      }  
      echo "Daten erfolgreich gespeichert";
  }
}
elseif($id == "ePrdKFEUpdate") { /*25-03-2020 update the record korector faktor*/
 $modus = $_POST['modus'];
 
 if($modus == "update" && isset($_POST['optionName']) && isset($_POST['optionWert']) && isset($_POST['optionDescription']) && isset($_POST['ePrdIdStore'])){
      $optionName = $_POST['optionName'];
      $optionWert = $_POST['optionWert'];
      $optionDescription = $_POST['optionDescription'];
      $ePrdIdStore = $_POST['ePrdIdStore'];
      $optionGrpID = $_POST['optionGrpID'];
      //$optionGrpTxt = $_POST['optionGrpTxt'];
     // print_r($_POST);

    $tsql= "UPDATE korrekturFaktorEinfugen SET 
    name = '$optionName', 
    wert = '$optionWert',
    description = '$optionDescription',
    ePrdKFE_GrpID = '$optionGrpID'";
    $tsql .= "WHERE ePrdKFE_id = $ePrdIdStore ";
  }
} /*25-03-2020 update the record korector faktor*/
elseif($id == "ePrdKFEDelete") { /*25-03-2020 delete the record korector faktor*/

 $modus = $_POST['modus'];
 
 if($modus == "delete" && isset($_POST['ePrdKFE_id'])){
       //print_r($_POST['ePrdKFE_id']);die;
      $ePrdKFE_id = $_POST['ePrdKFE_id'];
      
    $tsql = "UPDATE korrekturFaktorEinfugen SET deleted = 1";
    $tsql .= " WHERE ePrdKFE_id = '$ePrdKFE_id'";
  }
}elseif($id == "ePrdDKFE") { /*13-04-2020 Insert data into database using php*/
  $modus = $_POST['modus'];
  //print_r($_POST);die;
  
  if($modus == "save" && isset($_POST['xOptionName'])){
   // print_r($_POST);die;
      $xOptionNames = $_POST['xOptionName'];
      $yOptionBezug = $_POST['yOptionBezug'];
      $tOptionTemp = $_POST['tOptionTemp'] ;//15-05-20 New Added filed temperature

      $zOptionFaktore = $_POST['zOptionFaktore'];
      $ePrdDMainIdStore = $_POST['ePrdDMainIdStore'];

      $aOptionBasisFaktorName = $_POST['aOptionBasisFaktorName'];
      $bOptionBasisFaktorCalc = $_POST['bOptionBasisFaktorCalc'];
      $cOptionBasisFaktorWert = $_POST['cOptionBasisFaktorWert'];
      $dBasisType = $_POST['basisType'];
      $eOptionBasisFaktorResult = $_POST['dOptionResults'];    

      $optionNameDKff = $_POST["optionNameDKff"];
      $optionBeschreibungDKff = $_POST["optionBeschreibungDKff"];
      $typeDynamicCF = $_POST["typeDynamicCF"];
      $subtypeTimeDynamicCF = $_POST["subtypeTimeDynamicCF"];

      $calculationTypeDKff = $_POST["calculationTypeDKff"]; //This option for the faktor 5

      $formatDynamicType = $_POST['formatDynamicType'];

      $bezugStartTxt = $_POST['yOptionBezugStart'];
      $bezugEndTxt = $_POST['yOptionBezugEnd'];
      $tempStartTxt = $_POST['yOptionTempStart'];
      $tempEndTxt = $_POST['yOptionTempEnd'];
      //echo '<pre>';print_r($_POST);echo '</pre>';die;
      
      if($ePrdDMainIdStore){
        $optionId = $_POST['ePrdDMainIdStore'];
      }else{
        $dkfeQueryMain = "INSERT INTO dynamischeKorrekturFaktoren(optionNameDKff,optionBeschreibungDKff,typeDynamicCF,subtypeTimeDynamicCF,basisType,calculationTypeDKff,deleted)";
        $dkfeQueryMain .= "VALUES ('$optionNameDKff','$optionBeschreibungDKff','$typeDynamicCF','$subtypeTimeDynamicCF','$dBasisType','$calculationTypeDKff','false')";

        queryDB( $conn, $dkfeQueryMain, "write" );
           
        $getLastId = "SELECT dKff_id AS last_inserted_id FROM dynamischeKorrekturFaktoren WHERE dKff_id = @@Identity";
        $lastID = queryDB( $conn, $getLastId, "read" );
        $optionId = $lastID[0]['last_inserted_id'];
      }      
      if($optionId){
        $i=0;
        foreach ($xOptionNames as $key => $xOptionName) {
          
          $name = $xOptionName;
          $bezug = $yOptionBezug[$key];
          $temperature = $tOptionTemp[$key];
          $faktore = $zOptionFaktore[$i];
          $bezugStart = $bezugStartTxt[$i];
          $bezugEnd = $bezugEndTxt[$i];
          $tempStart = $tempStartTxt[$i];
          $tempEnd = $tempEndTxt[$i];

          $basisFktrName = $aOptionBasisFaktorName[$i];

          $basisFktrCalc = $bOptionBasisFaktorCalc[$i];
          $basisFktrWert = $cOptionBasisFaktorWert[$i];          
          $basisFktrResult = $eOptionBasisFaktorResult[$i];
          
          if($formatDynamicType){
            $formatDynamicTypeVal= $formatDynamicType[$i];
          }else{
            $formatDynamicTypeVal= '';
          }
          
            $dkfeQuery = "INSERT INTO dynamischeKorrekturFaktorenOption(subtypeTxtOptNameDKff,subtypeTxtoptzBezugDkff,subtypeTxtoptzTempDkff,subtypeTxtoptzFaktoreDkff,dKff_id,deleted,formatDynamicType,bezugStartTxt,bezugEndTxt,tempStartTxt,tempEndTxt)";
          $dkfeQuery .= "VALUES ('$name','$bezug','$temperature','$faktore','$optionId','false','$formatDynamicTypeVal','$bezugStart','$bezugEnd','$tempStart','$tempEnd')";
          /*}*/
          queryDB( $conn, $dkfeQuery, "write" );

          $getLastdKffOptionID = "SELECT dKffOption_id AS last_dKffOption_id FROM dynamischeKorrekturFaktorenOption WHERE dKffOption_id = @@Identity";
          $lastdKffOptionID = queryDB( $conn, $getLastdKffOptionID, "read" );
          $dKffOption_id = $lastdKffOptionID[0]['last_dKffOption_id'];

          if($dBasisType != '1' && $dBasisType != '6' && $dBasisType != '4' && $dBasisType != '8'){
            $basisFktrQuery = "INSERT INTO dynamischeKorrekturFaktorenBasisFaktor(faktorName,faktorCalc,faktorWert,dKff_id,result,dKffOption_id,deleted)";

            $basisFktrQuery .= "VALUES ('$basisFktrName','$basisFktrCalc','$basisFktrWert','$optionId','$basisFktrResult',$dKffOption_id,'false')";
            //echo $basisFktrQuery;die;
            queryDB( $conn, $basisFktrQuery, "write" );

          }
          $i++;          
        }       
    }
    echo $optionId;
      //echo "Daten erfolgreich gespeichert";
  }  /*13-04-2020 Insert data into database using php*/
}
elseif($id == "ePrdDKFEUpdate") { /*14-04-2020 update the record dynamische korector faktor*/
 $modus = $_POST['modus'];
 $faktorType = $_POST['faktorType'];
  if($modus == "update" && isset($_POST['optionName']) && isset($_POST['optionBezug']) && isset($_POST['optionFaktore']) && isset($_POST['ePrdDIdStore']) && isset($_POST['basisFktr2Name']) && isset($_POST['basisFktr2Calc']) && isset($_POST['basisFktr2Wert'])){
      $parentOptName = $_POST['parentOptName'];
      $parentBeschreibunDesc = $_POST['parentBeschreibunDesc'];
      $ePrdDMainIdStore = $_POST['ePrdDMainIdStore'];

      $optionName = $_POST['optionName'];
      $optionBezug = $_POST['optionBezug'];
      $optionTemp = $_POST['optionTemp'];
      $optionFaktore = $_POST['optionFaktore'];
      $ePrdDIdStore = $_POST['ePrdDIdStore'];

      $basisFktr2Name = $_POST['basisFktr2Name'];
      $basisFktr2Calc = $_POST['basisFktr2Calc'];
      $basisFktr2Wert = $_POST['basisFktr2Wert'];
      $result = $_POST['result'];

      $ePrddKffOptionIDStore = $_POST['ePrddKffOptionIDStore'];

      $bezugStartTxt = $_POST['bezugStartTxt'];
      $bezugEndTxt = $_POST['bezugEndTxt'];
      $tempStartTxt = $_POST['tempStartTxt'];
      $tempEndTxt = $_POST['tempEndTxt'];
      $faktoreDynamictype = $_POST['faktoreDynamictypeVal'];

      $parentSql= "UPDATE dynamischeKorrekturFaktoren SET 
      optionNameDKff = '$parentOptName', 
      optionBeschreibungDKff = '$parentBeschreibunDesc'";
      $parentSql .= "WHERE dKff_id = $ePrdDMainIdStore ";
      queryDB( $conn, $parentSql, "write" ); 

      $basisFktrSql= "UPDATE dynamischeKorrekturFaktorenBasisFaktor SET 
      faktorName = '$basisFktr2Name', 
      faktorCalc = '$basisFktr2Calc',
      faktorWert = '$basisFktr2Wert',
      result = '$result' ";
      $basisFktrSql .= "WHERE dKffOption_id = $ePrddKffOptionIDStore ";
      queryDB( $conn, $basisFktrSql, "write" ); 

      $tsql= "UPDATE dynamischeKorrekturFaktorenOption SET 
      subtypeTxtOptNameDKff = '$optionName', 
      subtypeTxtoptzBezugDkff = '$optionBezug',
      subtypeTxtoptzTempDkff = '$optionTemp',
      subtypeTxtoptzFaktoreDkff = '$optionFaktore',
      formatDynamicType = '$faktoreDynamictype',
      bezugStartTxt = '$bezugStartTxt',
      bezugEndTxt = '$bezugEndTxt',
      tempStartTxt = '$tempStartTxt',
      tempEndTxt = '$tempEndTxt' ";
      $tsql .= "WHERE dKffOption_id = $ePrddKffOptionIDStore ";

  }else if(empty($_POST['basisFktr2Name']) && empty($_POST['basisFktr2Calc']) && empty($_POST['basisFktr2Wert'])){
      $parentOptName = $_POST['parentOptName'];
      $parentBeschreibunDesc = $_POST['parentBeschreibunDesc'];
      $ePrdDMainIdStore = $_POST['ePrdDMainIdStore'];
      $optionName = $_POST['optionName'];
      $optionBezug = $_POST['optionBezug'];
      $optionTemp = $_POST['optionTemp'];
      $optionFaktore = $_POST['optionFaktore'];
      $ePrdDIdStore = $_POST['ePrdDIdStore'];
      $faktoreDynamictype = $_POST['faktoreDynamictypeVal'];
      $ePrddKffOptionIDStore = $_POST['ePrddKffOptionIDStore'];
      $bezugStartTxt = $_POST['bezugStartTxt'];
      $bezugEndTxt = $_POST['bezugEndTxt'];
      $tempStartTxt = $_POST['tempStartTxt'];
      $tempEndTxt = $_POST['tempEndTxt'];
     
      $parentSql= "UPDATE dynamischeKorrekturFaktoren SET 
      optionNameDKff = '$parentOptName', 
      optionBeschreibungDKff = '$parentBeschreibunDesc' ";
      $parentSql .= "WHERE dKff_id = $ePrdDMainIdStore ";
      queryDB( $conn, $parentSql, "write" ); 

      $tsql= "UPDATE dynamischeKorrekturFaktorenOption SET 
      subtypeTxtOptNameDKff = '$optionName', 
      subtypeTxtoptzBezugDkff = '$optionBezug',
      subtypeTxtoptzTempDkff = '$optionTemp',
      subtypeTxtoptzFaktoreDkff = '$optionFaktore',
      formatDynamicType = '$faktoreDynamictype',
      bezugStartTxt = '$bezugStartTxt',
      bezugEndTxt = '$bezugEndTxt',
      tempStartTxt = '$tempStartTxt',
      tempEndTxt = '$tempEndTxt' ";
      $tsql .= "WHERE dKffOption_id = $ePrddKffOptionIDStore ";
      //echo  $tsql;die;
 
  }
}  /*14-04-2020 update the record dynamische korector faktor*/
elseif($id == "ePrdDKFEDelete") { /*14-04-2020 delete the record dynamische korector faktor*/

 $modus = $_POST['modus'];
 if($modus == "delete" && isset($_POST['dKffOption_id'])){
    //   print_r($_POST);die;
      $dKffOption_id = $_POST['dKffOption_id'];
    if(isset($_POST['faktorType']) && !empty($_POST['faktorType'])){
      $tsql = "UPDATE dynamischeKorrekturFaktorenOption SET deleted = 1";
      $tsql .= " WHERE dKffOption_id = '$dKffOption_id'";
    }
    
  }
}/*14-04-2020 delete the record dynamische korector faktor*/
  elseif($id == "knz") {
  $modus = $_POST['modus'];
  $bezug = $_POST['bezug'];
  $instanzID = $_POST['instanzID'];
  $orgID = $_POST['orgID'];
  $zustaendigerMitarbeiter = $_POST['zustaendigerMitarbeiter'];
  $beschreibung = $_POST['beschreibung'];
  $lenLoop = 11;
  $nKnzs = $_POST['nKnzs'];
  $tsql = "";

  if($modus == "new"){
    $tsql = "DECLARE @cntRows int = (SELECT COUNT(*) FROM kennzahlenInstanzen) ";
		$tsql .= "INSERT INTO kennzahlenInstanzen(knzIns_ID, org_ID, nKnzs, ".$bezug."_ID, zustaendigerMitarbeiter, beschreibung, bezug, deleted) ";
		$tsql .= "VALUES (@cntRows + 1, '$orgID', $nKnzs, '$instanzID', '$zustaendigerMitarbeiter', '$beschreibung', '$bezug', 'false') ";

    $tsql .= "INSERT INTO kennzahlen(knzIns_ID, knzInsNum, bezeichnung, anwendungsbereich, aktiv, datumEinfuehrung, ";
    $tsql .= "letzteUeberpruefung, datumDeaktivierung, einheit, frm_ID, kennzahl, grenzwertO, grenzwertU, zielwert, zielVon, zielBis) ";
    $tsql .= "VALUES ";
    for($i = 1; $i < $lenLoop; $i++){
      $bezeichnung = $_POST['bezeichnung'.$i];
      $anwendungsbereich = $_POST['anwendungsbereich'.$i];
      $status = $_POST['status'.$i];
      $einfuehrung = $_POST['einfuehrung'.$i];
      $letzteUeberpruefung = $_POST['letzteUeberpruefung'.$i];
      $deaktivierung = $_POST['deaktivierung'.$i];
      $einheit = $_POST['einheit'.$i];
      $zielVon = $_POST['zielVon'.$i];
      $zielBis = $_POST['zielBis'.$i];

      if($_POST['formelID'.$i] == "") {
        $formelID = "NULL";
      }
      else {
        $formelID = $_POST['formelID'.$i];
      }
      if(is_numeric($_POST['kennzahl'.$i] ) ) {
        $kennzahl = $_POST['kennzahl'.$i];
      }
      else {
        $kennzahl = 0;
      }
      if(is_numeric($_POST['toleranzgrenzeOben'.$i])){
        $toleranzgrenzeOben = $_POST['toleranzgrenzeOben'.$i];
      }
      else {
        $toleranzgrenzeOben = 0;
      }
      if(is_numeric($_POST['toleranzgrenzeUnten'.$i])){
        $toleranzgrenzeUnten = $_POST['toleranzgrenzeUnten'.$i];
      }
      else {
        $toleranzgrenzeUnten = 0;
      }
      if(is_numeric($_POST['zielwert'.$i])){
        $zielwert = $_POST['zielwert'.$i];
      }
      else {
        $zielwert = 0;
      }
      $tsql .= "( ";
      $tsql .= "@cntRows + 1, $i, ";
      $tsql .= "'$bezeichnung', '$anwendungsbereich', '$status', '$einfuehrung', '$letzteUeberpruefung', ";
      $tsql .= "'$deaktivierung', '$einheit', $formelID, $kennzahl, $toleranzgrenzeOben, $toleranzgrenzeUnten, ";
      $tsql .= "$zielwert, '$zielVon', '$zielBis' ";
      if ($i < $lenLoop - 1) {
        $tsql .= "), ";
      }
      else {
        $tsql .= ") ";
      }
    }
  }
	else {
    $knzInsID = $_POST['knzInsID'];

		$tsql .= "UPDATE kennzahlenInstanzen SET ";
		$tsql .= $bezug."_ID = '$instanzID', zustaendigerMitarbeiter = '$zustaendigerMitarbeiter', beschreibung = '$beschreibung', bezug = '$bezug', nKnzs = $nKnzs ";
    $tsql .= "WHERE knzIns_ID = $knzInsID ";

    for($i = 1; $i < $lenLoop ; $i++) {
      $bezeichnung = $_POST['bezeichnung'.$i];
      $anwendungsbereich = $_POST['anwendungsbereich'.$i];
      $status = $_POST['status'.$i];
      $einfuehrung = $_POST['einfuehrung'.$i];
      $letzteUeberpruefung = $_POST['letzteUeberpruefung'.$i];
      $deaktivierung = $_POST['deaktivierung'.$i];
      $einheit = $_POST['einheit'.$i];
      $zielVon = $_POST['zielVon'.$i];
      $zielBis = $_POST['zielBis'.$i];

      if($_POST['formelID'.$i] == "") {
        $formelID = "NULL";
      }
      else {
        $formelID = $_POST['formelID'.$i];
      }
      if (is_numeric($_POST['kennzahl'.$i] ) ) {
        $kennzahl = $_POST['kennzahl'.$i];
      }
      else {
        $kennzahl = 0;
      }
      if (is_numeric($_POST['toleranzgrenzeOben'.$i] ) ) {
        $toleranzgrenzeOben = $_POST['toleranzgrenzeOben'.$i];
      }
      else {
        $toleranzgrenzeOben = 0;
      }
      if(is_numeric($_POST['toleranzgrenzeUnten'.$i] ) ) {
        $toleranzgrenzeUnten = $_POST['toleranzgrenzeUnten'.$i];
      }
      else {
        $toleranzgrenzeUnten = 0;
      }
      if(is_numeric($_POST['zielwert'.$i])){
        $zielwert = $_POST['zielwert'.$i];
      }
      else {
        $zielwert = 0;
      }
      $tsql .= "UPDATE kennzahlen SET anwendungsbereich = '$anwendungsbereich', aktiv = '$status', ";
      $tsql .= "letzteUeberpruefung = '$letzteUeberpruefung', datumDeaktivierung = '$deaktivierung', einheit = '$einheit', ";
      $tsql .= "frm_ID = $formelID, kennzahl = $kennzahl, grenzwertO = '$toleranzgrenzeOben', ";
      $tsql .= "grenzwertU = '$toleranzgrenzeUnten', datumEinfuehrung = '$einfuehrung', bezeichnung = '$bezeichnung', ";
      $tsql .= "zielwert = $zielwert, zielVon = '$zielVon', zielBis = '$zielBis' ";
      $tsql .= "WHERE knzIns_ID = $knzInsID AND knzInsNum = $i ";
    }
	}
}
elseif ($id == "knzUpd") {
    $knzID = $_POST['knzID'];
    $kennzahl = $_POST['kennzahl'];
    $grenzwertO = $_POST['grenzwertO'];
    $grenzwertU = $_POST['grenzwertU'];

    $tsql = "UPDATE kennzahlen SET kennzahl = $kennzahl, ";
    $tsql .= "grenzwertO = $grenzwertO, grenzwertU = $grenzwertU ";
    $tsql .= "WHERE knz_ID = $knzID";
}
elseif($id == "zp") {
	$modus = $_POST['modus'];
  $liegID = $_POST['liegID'];
  $nr = $_POST['nr'];
	$messstelle = $_POST['messstelle'];
	$energietraeger = $_POST['energietraeger'];
  $messsystem = $_POST['messsystem'];
  $messgenauigkeit = $_POST['messgenauigkeit'];

	if($modus == "new"){
		$tsql = "INSERT INTO zaehlpunktnummern(lieg_ID, zaehlpunktNr,mstZp,energietraegerZp,messsystemZp,messgenauigkeitZp) ";
		$tsql .= "VALUES ('$liegID','$nr','$messstelle','$energietraeger','$messsystem','$messgenauigkeit') ";
}
	else{
		$zpID = $_POST['zpID'];

		$tsql = "UPDATE zaehlpunktnummern SET zaehlpunktNr = '$nr', mstZp = '$messstelle', energietraegerZp = '$energietraeger', ";
    $tsql .= "messsystemZp = '$messsystem', messgenauigkeitZp = '$messgenauigkeit' ";
    $tsql .= "WHERE zp_ID = '$zpID' ";
	}
}
elseif ($id == "vorlFrm") {
  $bezeichnung = $_POST['bezeichnung'];
  $formula = $_POST['formula'];
  $notiz = $_POST['notiz'];

  $tsql = "INSERT INTO vorlagenFormeln (bezeichnung, formel, notiz) ";
  $tsql .= "VALUES ('$bezeichnung', '$formula', '$notiz') ";
}
elseif ($id == "frm") {
  $berechneteMstID = $_POST['berechneteMstID'];
  $formelString = $_POST['formelString'];
  $idString = $_POST['idString'];

  $formelStringNormal =base64_decode($_POST['formelString']);
  /*05-03-2020 update default option berechnet in messartMst*/
  $tsql = "UPDATE messstellen SET messmittelBerechnungslogikMst = '$formelString', 
  messmittelBerechnungslogikMstNormal = '$formelStringNormal',
  berLogikIdString = '$idString',messartMst = 'berechnet'";
  $tsql .= "WHERE mst_ID = $berechneteMstID ";
}
elseif ($id == "frmKnz") {
  $typ = $_POST['bezug'];
  $formelString = $_POST['formelString'];
  $idString = $_POST['idString'];

  $tsql = "INSERT INTO formeln (typ, formelString, idString) ";
  $tsql .= "VALUES ('$typ', '$formelString', '$idString') ";
}
elseif ($id == "betrPar") {
  $tblName = $_POST['tblName'];
  $parJson = $_POST['parJson'];

  $tsql = "INSERT INTO config.betriebsparameter ( tblName, parJson ) " ;
  $tsql .= "VALUES ( '$tblName', '$parJson' ) " ;
}

if($id != "ePrdKFE" && $id != "ePrdDKFE" ) {
  $retState = queryDB( $conn, $tsql, "write" );
  echo $tsql;
}


include('bottom-cache.php');
?>

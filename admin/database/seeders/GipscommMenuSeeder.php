<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GipscommMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('gipscomm_menu')->insert([  
            //['name' => "All" , 'parent_id' => "#" , 'menu_id' => "" ],  
            ['name' => "Auswertungen" , 'parent_id' => "#" , 'menu_id' => "" ],
            ['name' => "Stanndaten" , 'parent_id' => "#" , 'menu_id' => "" ],
            ['name' => "Manuell" , 'parent_id' => "#" , 'menu_id' => "" ],
            ['name' => "Optionen" , 'parent_id' => "#" , 'menu_id' => "" ],
            ['name' => "Hilfe" , 'parent_id' => "#" , 'menu_id' => "" ],
            ['name' => "Berichte" , 'parent_id' =>"2" , 'menu_id' => "" ],
            ['name' => "Diagramme" , 'parent_id' =>"2" , 'menu_id' => "" ],
            ['name' => "Verbrauchsdatenexport" , 'parent_id' =>"2" , 'menu_id' => "#verbExportMenu" ],
            ['name' => "Produktion" , 'parent_id' =>"2" , 'menu_id' => "#menuProduktionAusw" ],
            ['name' => "ISO" , 'parent_id' =>"7" , 'menu_id' => "" ],
            ['name' => "Neu Erstellen" , 'parent_id' =>"8" , 'menu_id' => "" ],
            ['name' => "Gespeichertes Laden" , 'parent_id' =>"8" , 'menu_id' => "#zeitVerglMenu" ],
            ['name' => "Berichte" , 'parent_id' => "11" , 'menu_id' => "" ],
            ['name' => "SpaEfV_Tabelle_1" , 'parent_id' => "14" , 'menu_id' => "#spaEfVTab1Menu" ],
            ['name' => "SpaEfV_Tabelle_2" , 'parent_id' => "14" , 'menu_id' => "#spaEfVTab2Menu" ],
            ['name' => "Messstellenvergleich" , 'parent_id' => "12" , 'menu_id' => "#mstVerglMenu" ],
            ['name' => "Zeitvergleich" , 'parent_id' => "12" , 'menu_id' => "#zeitVerglMenu" ],
            ['name' => "Kennzahlendarstellung" , 'parent_id' => "12" , 'menu_id' => "#knzDarst" ],
            ['name' => "Rechteverwaltung" , 'parent_id' =>"3" , 'menu_id' => "" ],
            ['name' => "Betreuergruppen" , 'parent_id' => "20" , 'menu_id' => "#betrGrpMenu" ],
            ['name' => "Mandantengruppen" , 'parent_id' => "20" , 'menu_id' => "#manGrpMenu" ],
            ['name' => "Superadmins" , 'parent_id' => "20" , 'menu_id' => "#betrGrpMenu" ],
            ['name' => "Admins" , 'parent_id' => "20" , 'menu_id' => "#admMenu" ],
            ['name' => "Benutzer" , 'parent_id' => "20" , 'menu_id' => "#benMenu" ],
            ['name' => "Unternehmensstruktur" , 'parent_id' =>"3" , 'menu_id' => "" ],
            ['name' => "Mandanten" , 'parent_id' => "26" , 'menu_id' => "#manMenu" ],
            ['name' => "Organisationen" , 'parent_id' => "26" , 'menu_id' => "#orgMenu" ],
            ['name' => "Liegenschaften" , 'parent_id' => "26" , 'menu_id' => "#liegMenu" ],
            ['name' => "Vers.Bereiche" , 'parent_id' => "26" , 'menu_id' => "#berMenu" ],
            ['name' => "Messstellen-E" , 'parent_id' => "26" , 'menu_id' => "#mstEMenu" ],
            ['name' => "Messstellen-B" , 'parent_id' => "26" , 'menu_id' => "#mstBMenu" ],
            ['name' => "Standorte" , 'parent_id' => "26" , 'menu_id' => "#stdMenu" ],
            ['name' => "Standortdaten 3." , 'parent_id' => "26" , 'menu_id' => "#stdDrMenu" ],
            ['name' => "Anlagenverwaltung" , 'parent_id' =>"3" , 'menu_id' => "" ],
            ['name' => "Anlagen" , 'parent_id' => "35" , 'menu_id' => "#anl_Menu" ],
            ['name' => "Energieversorgung" , 'parent_id' => "35" , 'menu_id' => "#anl_Eng_Menu" ],
            ['name' => "Weitere Konfiguration" , 'parent_id' => "35" , 'menu_id' => "#anl_Konfig_Menu" ],
            ['name' => "Dokumente" , 'parent_id' => "35" , 'menu_id' => "#anl_Dok_Menu" ],
            ['name' => "Historie" , 'parent_id' => "35" , 'menu_id' => "#anl_Hist_Menu" ],
            ['name' => "Messmittelverwaltung" , 'parent_id' =>"3" , 'menu_id' => "#msmMenu" ],
            ['name' => "Produkteverwaltung" , 'parent_id' =>"3" , 'menu_id' => "" ],
            ['name' => "Produkte" , 'parent_id' => "42" , 'menu_id' => "#prd_Menu" ],
            ['name' => "Weitere Konfiguration" , 'parent_id' => "42" , 'menu_id' => "#prd_Konfig_Menu" ],
            ['name' => "Historie" , 'parent_id' => "42" , 'menu_id' => "#prd_Hist_Menu" ],
            ['name' => "Kennzahlen/Alarme" , 'parent_id' =>"3" , 'menu_id' => "" ],
            ['name' => "Kennzahlen" , 'parent_id' => "46" , 'menu_id' => "#knzMenu" ],
            ['name' => "Alarme" , 'parent_id' => "46" , 'menu_id' => "#almMenu" ],
            ['name' => "In.Messwerte" , 'parent_id' =>"4" , 'menu_id' => "" ],
            ['name' => "Interne Betriebsdaten" , 'parent_id' => "49" , 'menu_id' => "#intEngIMwMenu" ],
            ['name' => "Interne Energiedaten" , 'parent_id' => "49" , 'menu_id' => "#intBdeIMwMenu" ],
            ['name' => "Ex.Rechnungen" , 'parent_id' =>"4" , 'menu_id' => "" ],
            ['name' => "Rechnungen" , 'parent_id' => "52" , 'menu_id' => "#extRngMenu" ],
            ['name' => "Rechnungsvergleich" , 'parent_id' => "52" , 'menu_id' => "#eRngVergleichMenu" ],
            ['name' => "Basisdaten" , 'parent_id' =>"5" , 'menu_id' => "" ],
            ['name' => "Energieträger" , 'parent_id' => "55" , 'menu_id' => "#entMenu" ],
            ['name' => "Energieformen" , 'parent_id' => "55" , 'menu_id' => "#enfMenu" ],
            ['name' => "Zählpunktnummern" , 'parent_id' => "55" , 'menu_id' => "#zpMenu" ],
            ['name' => "Erweiterungen" , 'parent_id' => "55" , 'menu_id' => "" ],
            ['name' => "Erweiterung Anlagen" , 'parent_id' => "59" , 'menu_id' => "#erwAnlMenu" ],
            ['name' => "Erweiterung Produkte" , 'parent_id' => "59" , 'menu_id' => "#erwPrdMenu" ],
            ['name' => "Statischer Korrekturfaktoren" , 'parent_id' => "59" , 'menu_id' => "#korrekturFaktorMenu" ],
            ['name' => "Dynamischer Korrekturfaktoren" , 'parent_id' => "59" , 'menu_id' => "#korrekturFaktorMenuDynamischer" ],
            ['name' => "Gruppierung Diagramme" , 'parent_id' => "55" , 'menu_id' => "#grpDiagMenu" ],
            ['name' => "Schichtdaten" , 'parent_id' => "5" , 'menu_id' => "#schtDatMenu" ]
        ]);
    }
}

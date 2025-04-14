<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BetreuerGruppen;

class BetreuerGruppenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BetreuerGruppen::insert([
            ['betrGrp_ID' => '21','firma' => 'Gipscomm-Energie','anzahlMitarbeiter'=>7,'anschrift'=>"Fuhr 12",'plz'=> "42499",'ort'=>"HÃ¼ckeswagen",'geschaeftsfuehrer'=>"A.Wieland",'telefon'=>"+49 (2192) 791986-16",'eMail'=>"info@energie-gipscomm.de",'notiz'=>"FÃ¼rs Testen notwendig !",'deleted'=>0,'mandantenIDs'=>"1,2,3,4,5,6,7,8,9,10,14,15,17,18,19,20,21,22,23,24,25"]
        ]);
    }
}

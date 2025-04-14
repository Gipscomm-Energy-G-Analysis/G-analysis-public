<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MandantenGruppenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('mandantenGruppen')->insert([   
                    ['manGrp_ID' => 21,	'name' =>"Sgruppe", 'kurz' => "SG", 'notiz' => "", 'betrGrp_ID' => "22", 'mandantenIDs' => "20,24", 'deleted' => 0 ],
                    ['manGrp_ID' => 22,	'name' =>"ZweiteGruppe", 'kurz' => "ZG", 'notiz' => "", 'betrGrp_ID' => "22", 'mandantenIDs' => "22,20", 'deleted' => 0 ],
                    ['manGrp_ID' => 23,	'name' =>"HBS-Gruppe", 'kurz' => "HBSG", 'notiz' => "", 'betrGrp_ID' => "23", 'mandantenIDs' => "15,14", 'deleted' => 0 ],
                    ['manGrp_ID' => 24,	'name' =>"Agrodur-Gruppe", 'kurz' => "AG", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "2,4,3", 'deleted' => 0 ],
                    ['manGrp_ID' => 25,	'name' =>"NichtNeu", 'kurz' => "NN", 'notiz' => "", 'betrGrp_ID' => "22", 'mandantenIDs' => "22", 'deleted' => 0 ],
                    ['manGrp_ID' => 26,	'name' =>"NeueHBS", 'kurz' => "NHBS", 'notiz' => "", 'betrGrp_ID' => "23", 'mandantenIDs' => "15", 'deleted' => 1 ],
                    ['manGrp_ID' => 27,	'name' =>"Name", 'kurz' => "Kurz", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 28,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 29,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 30,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 31,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 32,	'name' =>"Name", 'kurz' => "Kurz", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 33,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 34,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 35,	'name' =>"Name", 'kurz' => "Kurz", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 36,	'name' =>"NameNeuTest", 'kurz' => "Kurz223", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 37,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 38,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 39,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 40,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 41,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 42,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 43,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 44,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 45,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 46,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 47,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 48,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 49,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 50,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 51,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 52,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 53,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 54,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 55,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 56,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 57,	'name' =>"Name", 'kurz' => "Kurz", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20", 'deleted' => 1 ],
                    ['manGrp_ID' => 58,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 59,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 60,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 61,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 62,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 63,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 64,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 65,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 66,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 67,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 68,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 69,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 70,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 71,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 72,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 73,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 74,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 75,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 76,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 77,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 78,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 79,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 80,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 81,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 82,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 83,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 84,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 85,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 86,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 87,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ],
                    ['manGrp_ID' => 88,	'name' =>"NameNeu", 'kurz' => "Kurz22", 'notiz' => "", 'betrGrp_ID' => "21", 'mandantenIDs' => "3,17,20,8,5", 'deleted' => 1 ]
        ]);
    }
}

//
// DONT FORGET TO UNCOMMENT THE EXPORTS IN THE ORIGIN FILE !!

const test = require('tape');
core = require('../src/js/fpCore.js');
fn = require('../src/js/DataTranslator.js');


M901DruckluftMaschine =
[
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:00:00",
"Phase": 1,
"Value": "29,1235",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:01:00",
"Phase": 1,
"Value": "31,5091",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:02:00",
"Phase": 1,
"Value": "32,1473",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:03:00",
"Phase": 1,
"Value": "28,7285",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:04:00",
"Phase": 1,
"Value": "30,6042",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:05:00",
"Phase": 1,
"Value": "28,0671",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:06:00",
"Phase": 1,
"Value": "30,0558",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:07:00",
"Phase": 1,
"Value": "35,0208",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:08:00",
"Phase": 1,
"Value": "29,5864",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:09:00",
"Phase": 1,
"Value": "29,1466",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:10:00",
"Phase": 1,
"Value": "28,7201",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:11:00",
"Phase": 1,
"Value": "29,4221",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:12:00",
"Phase": 1,
"Value": "29,1067",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:13:00",
"Phase": 1,
"Value": "34,6122",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:14:00",
"Phase": 1,
"Value": "33,0841",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:15:00",
"Phase": 1,
"Value": "32,3719",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:16:00",
"Phase": 1,
"Value": "28,3125",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:17:00",
"Phase": 1,
"Value": "30,3688",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:18:00",
"Phase": 1,
"Value": "28,6122",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:19:00",
"Phase": 1,
"Value": "32,059",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:20:00",
"Phase": 1,
"Value": "32,0601",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:21:00",
"Phase": 1,
"Value": "27,7862",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:22:00",
"Phase": 1,
"Value": "31,4795",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:23:00",
"Phase": 1,
"Value": "30,8564",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:24:00",
"Phase": 1,
"Value": "28,9247",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:25:00",
"Phase": 1,
"Value": "30,2391",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:26:00",
"Phase": 1,
"Value": "33,9655",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:27:00",
"Phase": 1,
"Value": "29,9131",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:28:00",
"Phase": 1,
"Value": "30,2927",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:29:00",
"Phase": 1,
"Value": "34,2133",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:30:00",
"Phase": 1,
"Value": "25,3551",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:31:00",
"Phase": 1,
"Value": "27,1868",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:32:00",
"Phase": 1,
"Value": "31,6701",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:33:00",
"Phase": 1,
"Value": "31,2054",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:34:00",
"Phase": 1,
"Value": "32,5616",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:35:00",
"Phase": 1,
"Value": "33,13",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:36:00",
"Phase": 1,
"Value": "30,5762",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:37:00",
"Phase": 1,
"Value": "29,8007",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:38:00",
"Phase": 1,
"Value": "28,1776",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:39:00",
"Phase": 1,
"Value": "28,9262",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:40:00",
"Phase": 1,
"Value": "30,3726",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:41:00",
"Phase": 1,
"Value": "31,3045",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:42:00",
"Phase": 1,
"Value": "31,7904",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:43:00",
"Phase": 1,
"Value": "37,5998",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:44:00",
"Phase": 1,
"Value": "34,9197",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:45:00",
"Phase": 1,
"Value": "30,3576",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:46:00",
"Phase": 1,
"Value": "33,2752",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:47:00",
"Phase": 1,
"Value": "28,072",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:48:00",
"Phase": 1,
"Value": "35,2689",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:49:00",
"Phase": 1,
"Value": "32,4674",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:50:00",
"Phase": 1,
"Value": "29,2676",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:51:00",
"Phase": 1,
"Value": "33,9201",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:52:00",
"Phase": 1,
"Value": "35,6916",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:53:00",
"Phase": 1,
"Value": "33,159",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:54:00",
"Phase": 1,
"Value": "34,3492",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:55:00",
"Phase": 1,
"Value": "32,9846",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:56:00",
"Phase": 1,
"Value": "30,7991",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:57:00",
"Phase": 1,
"Value": "32,1286",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:58:00",
"Phase": 1,
"Value": "32,3227",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 00:59:00",
"Phase": 1,
"Value": "27,9614",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:00:00",
"Phase": 1,
"Value": "30,0124",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:01:00",
"Phase": 1,
"Value": "30,1266",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:02:00",
"Phase": 1,
"Value": "31,112",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:03:00",
"Phase": 1,
"Value": "31,3982",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:04:00",
"Phase": 1,
"Value": "30,392",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:05:00",
"Phase": 1,
"Value": "27,2977",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:06:00",
"Phase": 1,
"Value": "31,1461",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:07:00",
"Phase": 1,
"Value": "30,8527",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:08:00",
"Phase": 1,
"Value": "31,1156",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:09:00",
"Phase": 1,
"Value": "11,7392",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:10:00",
"Phase": 1,
"Value": "4,01464",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:11:00",
"Phase": 1,
"Value": "4,28667",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:12:00",
"Phase": 1,
"Value": "4,33656",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:13:00",
"Phase": 1,
"Value": "3,45679",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:14:00",
"Phase": 1,
"Value": "3,37084",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:15:00",
"Phase": 1,
"Value": "3,79962",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:16:00",
"Phase": 1,
"Value": "4,35248",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:17:00",
"Phase": 1,
"Value": "4,42756",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:18:00",
"Phase": 1,
"Value": "5,07474",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:19:00",
"Phase": 1,
"Value": "5,02054",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:20:00",
"Phase": 1,
"Value": "5,16795",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:21:00",
"Phase": 1,
"Value": "4,72618",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:22:00",
"Phase": 1,
"Value": "5,283",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:23:00",
"Phase": 1,
"Value": "31,1534",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:24:00",
"Phase": 1,
"Value": "32,799",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:25:00",
"Phase": 1,
"Value": "34,8184",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:26:00",
"Phase": 1,
"Value": "37,9032",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:27:00",
"Phase": 1,
"Value": "31,7122",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:28:00",
"Phase": 1,
"Value": "34,9697",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:29:00",
"Phase": 1,
"Value": "19,6689",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:30:00",
"Phase": 1,
"Value": "4,91855",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:31:00",
"Phase": 1,
"Value": "4,4747",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:32:00",
"Phase": 1,
"Value": "4,58134",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:33:00",
"Phase": 1,
"Value": "3,95903",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:34:00",
"Phase": 1,
"Value": "4,35199",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:35:00",
"Phase": 1,
"Value": "3,99516",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:36:00",
"Phase": 1,
"Value": "4,63496",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:37:00",
"Phase": 1,
"Value": "33,5788",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:38:00",
"Phase": 1,
"Value": "35,8951",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:39:00",
"Phase": 1,
"Value": "36,0219",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:40:00",
"Phase": 1,
"Value": "30,2527",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:41:00",
"Phase": 1,
"Value": "31,3518",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:42:00",
"Phase": 1,
"Value": "30,9678",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:43:00",
"Phase": 1,
"Value": "31,8744",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:44:00",
"Phase": 1,
"Value": "34,0336",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:45:00",
"Phase": 1,
"Value": "33,285",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:46:00",
"Phase": 1,
"Value": "28,9789",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:47:00",
"Phase": 1,
"Value": "32,0587",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:48:00",
"Phase": 1,
"Value": "27,62",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:49:00",
"Phase": 1,
"Value": "30,8806",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:50:00",
"Phase": 1,
"Value": "27,7",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:51:00",
"Phase": 1,
"Value": "29,6355",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:52:00",
"Phase": 1,
"Value": "31,5989",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:53:00",
"Phase": 1,
"Value": "30,9746",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:54:00",
"Phase": 1,
"Value": "30,2252",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:55:00",
"Phase": 1,
"Value": "33,6195",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:56:00",
"Phase": 1,
"Value": "30,8337",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:57:00",
"Phase": 1,
"Value": "28,9357",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:58:00",
"Phase": 1,
"Value": "27,0521",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 01:59:00",
"Phase": 1,
"Value": "31,5895",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:00:00",
"Phase": 1,
"Value": "29,467",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:01:00",
"Phase": 1,
"Value": "30,6416",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:02:00",
"Phase": 1,
"Value": "30,6949",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:03:00",
"Phase": 1,
"Value": "30,825",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:04:00",
"Phase": 1,
"Value": "29,4383",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:05:00",
"Phase": 1,
"Value": "29,043",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:06:00",
"Phase": 1,
"Value": "26,7639",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:07:00",
"Phase": 1,
"Value": "30,5538",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:08:00",
"Phase": 1,
"Value": "31,4171",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:09:00",
"Phase": 1,
"Value": "29,5788",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:10:00",
"Phase": 1,
"Value": "31,4725",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:11:00",
"Phase": 1,
"Value": "31,6021",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:12:00",
"Phase": 1,
"Value": "35,0246",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:13:00",
"Phase": 1,
"Value": "30,6618",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:14:00",
"Phase": 1,
"Value": "29,0848",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:15:00",
"Phase": 1,
"Value": "28,9675",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:16:00",
"Phase": 1,
"Value": "32,3836",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:17:00",
"Phase": 1,
"Value": "34,812",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:18:00",
"Phase": 1,
"Value": "32,4759",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:19:00",
"Phase": 1,
"Value": "32,0269",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:20:00",
"Phase": 1,
"Value": "28,4282",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:21:00",
"Phase": 1,
"Value": "31,6534",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:22:00",
"Phase": 1,
"Value": "28,9557",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:23:00",
"Phase": 1,
"Value": "29,939",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:24:00",
"Phase": 1,
"Value": "33,7136",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:25:00",
"Phase": 1,
"Value": "32,8852",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:26:00",
"Phase": 1,
"Value": "29,4303",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:27:00",
"Phase": 1,
"Value": "29,2507",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:28:00",
"Phase": 1,
"Value": "32,0665",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:29:00",
"Phase": 1,
"Value": "32,5464",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:30:00",
"Phase": 1,
"Value": "34,734",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:31:00",
"Phase": 1,
"Value": "33,5407",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:32:00",
"Phase": 1,
"Value": "27,4705",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:33:00",
"Phase": 1,
"Value": "28,52",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:34:00",
"Phase": 1,
"Value": "28,8661",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:35:00",
"Phase": 1,
"Value": "30,7714",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:36:00",
"Phase": 1,
"Value": "32,4878",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:37:00",
"Phase": 1,
"Value": "28,7798",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:38:00",
"Phase": 1,
"Value": "29,3523",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:39:00",
"Phase": 1,
"Value": "30,2572",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:40:00",
"Phase": 1,
"Value": "30,4336",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:41:00",
"Phase": 1,
"Value": "29,6394",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:42:00",
"Phase": 1,
"Value": "34,7512",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:43:00",
"Phase": 1,
"Value": "30,2294",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:44:00",
"Phase": 1,
"Value": "29,2692",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:45:00",
"Phase": 1,
"Value": "32,2231",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:46:00",
"Phase": 1,
"Value": "31,6709",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:47:00",
"Phase": 1,
"Value": "26,6697",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:48:00",
"Phase": 1,
"Value": "27,2307",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:49:00",
"Phase": 1,
"Value": "29,7931",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:50:00",
"Phase": 1,
"Value": "28,2308",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:51:00",
"Phase": 1,
"Value": "9,30354",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:52:00",
"Phase": 1,
"Value": "3,75292",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:53:00",
"Phase": 1,
"Value": "3,57338",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:54:00",
"Phase": 1,
"Value": "3,77",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:55:00",
"Phase": 1,
"Value": "4,62962",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:56:00",
"Phase": 1,
"Value": "29,8752",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:57:00",
"Phase": 1,
"Value": "34,3006",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:58:00",
"Phase": 1,
"Value": "32,7131",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 02:59:00",
"Phase": 1,
"Value": "30,4029",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:00:00",
"Phase": 1,
"Value": "30,2213",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:01:00",
"Phase": 1,
"Value": "28,9773",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:02:00",
"Phase": 1,
"Value": "30,1016",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:03:00",
"Phase": 1,
"Value": "28,2342",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:04:00",
"Phase": 1,
"Value": "32,5996",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:05:00",
"Phase": 1,
"Value": "31,3715",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:06:00",
"Phase": 1,
"Value": "34,8772",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:07:00",
"Phase": 1,
"Value": "36,4231",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:08:00",
"Phase": 1,
"Value": "33,2942",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:09:00",
"Phase": 1,
"Value": "32,9071",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:10:00",
"Phase": 1,
"Value": "37,3756",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:11:00",
"Phase": 1,
"Value": "31,8933",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:12:00",
"Phase": 1,
"Value": "36,2434",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:13:00",
"Phase": 1,
"Value": "34,609",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:14:00",
"Phase": 1,
"Value": "31,3729",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:15:00",
"Phase": 1,
"Value": "33,5233",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:16:00",
"Phase": 1,
"Value": "33,1311",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:17:00",
"Phase": 1,
"Value": "33,655",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:18:00",
"Phase": 1,
"Value": "35,2084",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:19:00",
"Phase": 1,
"Value": "32,167",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:20:00",
"Phase": 1,
"Value": "30,6563",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:21:00",
"Phase": 1,
"Value": "33,3217",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:22:00",
"Phase": 1,
"Value": "32,1951",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:23:00",
"Phase": 1,
"Value": "29,6589",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:24:00",
"Phase": 1,
"Value": "32,1738",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:25:00",
"Phase": 1,
"Value": "33,7835",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:26:00",
"Phase": 1,
"Value": "33,7293",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:27:00",
"Phase": 1,
"Value": "32,5459",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:28:00",
"Phase": 1,
"Value": "31,7133",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:29:00",
"Phase": 1,
"Value": "31,6236",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:30:00",
"Phase": 1,
"Value": "32,2951",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:31:00",
"Phase": 1,
"Value": "31,3086",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:32:00",
"Phase": 1,
"Value": "32,6967",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:33:00",
"Phase": 1,
"Value": "30,4222",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:34:00",
"Phase": 1,
"Value": "31,5536",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:35:00",
"Phase": 1,
"Value": "32,2884",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:36:00",
"Phase": 1,
"Value": "31,5931",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:37:00",
"Phase": 1,
"Value": "31,0339",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:38:00",
"Phase": 1,
"Value": "31,0709",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:39:00",
"Phase": 1,
"Value": "29,857",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:40:00",
"Phase": 1,
"Value": "29,004",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:41:00",
"Phase": 1,
"Value": "29,2648",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:42:00",
"Phase": 1,
"Value": "30,8361",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:43:00",
"Phase": 1,
"Value": "33,5634",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:44:00",
"Phase": 1,
"Value": "32,066",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:45:00",
"Phase": 1,
"Value": "33,1512",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:46:00",
"Phase": 1,
"Value": "30,0652",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:47:00",
"Phase": 1,
"Value": "29,3447",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:48:00",
"Phase": 1,
"Value": "28,044",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:49:00",
"Phase": 1,
"Value": "28,0973",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:50:00",
"Phase": 1,
"Value": "29,3747",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:51:00",
"Phase": 1,
"Value": "32,1625",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:52:00",
"Phase": 1,
"Value": "29,8239",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:53:00",
"Phase": 1,
"Value": "28,5724",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:54:00",
"Phase": 1,
"Value": "30,7821",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:55:00",
"Phase": 1,
"Value": "26,8908",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:56:00",
"Phase": 1,
"Value": "27,603",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:57:00",
"Phase": 1,
"Value": "30,988",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:58:00",
"Phase": 1,
"Value": "29,1541",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 03:59:00",
"Phase": 1,
"Value": "32,965",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:00:00",
"Phase": 1,
"Value": "30,5369",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:01:00",
"Phase": 1,
"Value": "32,1875",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:02:00",
"Phase": 1,
"Value": "29,7973",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:03:00",
"Phase": 1,
"Value": "32,3485",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:04:00",
"Phase": 1,
"Value": "29,1133",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:05:00",
"Phase": 1,
"Value": "30,6957",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:06:00",
"Phase": 1,
"Value": "31,4082",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:07:00",
"Phase": 1,
"Value": "31,4034",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:08:00",
"Phase": 1,
"Value": "32,0304",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:09:00",
"Phase": 1,
"Value": "30,1943",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:10:00",
"Phase": 1,
"Value": "32,8025",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:11:00",
"Phase": 1,
"Value": "26,0262",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:12:00",
"Phase": 1,
"Value": "33,3385",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:13:00",
"Phase": 1,
"Value": "28,6914",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:14:00",
"Phase": 1,
"Value": "31,6118",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:15:00",
"Phase": 1,
"Value": "30,2245",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:16:00",
"Phase": 1,
"Value": "32,5734",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:17:00",
"Phase": 1,
"Value": "29,0836",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:18:00",
"Phase": 1,
"Value": "33,501",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:19:00",
"Phase": 1,
"Value": "35,2594",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:20:00",
"Phase": 1,
"Value": "32,8455",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:21:00",
"Phase": 1,
"Value": "30,173",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:22:00",
"Phase": 1,
"Value": "34,949",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:23:00",
"Phase": 1,
"Value": "33,0274",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:24:00",
"Phase": 1,
"Value": "31,3909",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:25:00",
"Phase": 1,
"Value": "34,9738",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:26:00",
"Phase": 1,
"Value": "34,7157",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:27:00",
"Phase": 1,
"Value": "32,4138",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:28:00",
"Phase": 1,
"Value": "31,6026",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:29:00",
"Phase": 1,
"Value": "32,9437",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:30:00",
"Phase": 1,
"Value": "29,5986",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:31:00",
"Phase": 1,
"Value": "30,1476",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:32:00",
"Phase": 1,
"Value": "30,6564",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:33:00",
"Phase": 1,
"Value": "27,7859",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:34:00",
"Phase": 1,
"Value": "29,0875",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:35:00",
"Phase": 1,
"Value": "28,9394",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:36:00",
"Phase": 1,
"Value": "23,9626",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:37:00",
"Phase": 1,
"Value": "4,17374",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:38:00",
"Phase": 1,
"Value": "4,03252",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:39:00",
"Phase": 1,
"Value": "3,82508",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:40:00",
"Phase": 1,
"Value": "3,66089",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:41:00",
"Phase": 1,
"Value": "3,33228",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:42:00",
"Phase": 1,
"Value": "3,45974",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:43:00",
"Phase": 1,
"Value": "7,13038",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:44:00",
"Phase": 1,
"Value": "24,6126",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:45:00",
"Phase": 1,
"Value": "29,2891",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:46:00",
"Phase": 1,
"Value": "29,0621",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:47:00",
"Phase": 1,
"Value": "28,649",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:48:00",
"Phase": 1,
"Value": "32,2363",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:49:00",
"Phase": 1,
"Value": "26,8642",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:50:00",
"Phase": 1,
"Value": "31,07",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:51:00",
"Phase": 1,
"Value": "32,2251",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:52:00",
"Phase": 1,
"Value": "28,5974",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:53:00",
"Phase": 1,
"Value": "29,6463",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:54:00",
"Phase": 1,
"Value": "29,7517",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:55:00",
"Phase": 1,
"Value": "26,7812",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:56:00",
"Phase": 1,
"Value": "27,4319",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:57:00",
"Phase": 1,
"Value": "31,6797",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:58:00",
"Phase": 1,
"Value": "27,1835",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 04:59:00",
"Phase": 1,
"Value": "32,1863",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:00:00",
"Phase": 1,
"Value": "30,6333",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:01:00",
"Phase": 1,
"Value": "32,8532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:02:00",
"Phase": 1,
"Value": "32,7415",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:03:00",
"Phase": 1,
"Value": "32,8778",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:04:00",
"Phase": 1,
"Value": "27,1401",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:05:00",
"Phase": 1,
"Value": "31,4118",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:06:00",
"Phase": 1,
"Value": "31,1205",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:07:00",
"Phase": 1,
"Value": "28,9203",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:08:00",
"Phase": 1,
"Value": "29,5019",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:09:00",
"Phase": 1,
"Value": "30,0947",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:10:00",
"Phase": 1,
"Value": "27,9415",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:11:00",
"Phase": 1,
"Value": "32,0699",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:12:00",
"Phase": 1,
"Value": "28,2211",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:13:00",
"Phase": 1,
"Value": "27,1805",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:14:00",
"Phase": 1,
"Value": "28,6964",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:15:00",
"Phase": 1,
"Value": "26,9739",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:16:00",
"Phase": 1,
"Value": "30,6009",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:17:00",
"Phase": 1,
"Value": "28,4602",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:18:00",
"Phase": 1,
"Value": "29,2719",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:19:00",
"Phase": 1,
"Value": "30,6872",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:20:00",
"Phase": 1,
"Value": "26,5566",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:21:00",
"Phase": 1,
"Value": "32,2886",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:22:00",
"Phase": 1,
"Value": "31,2436",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:23:00",
"Phase": 1,
"Value": "32,0193",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:24:00",
"Phase": 1,
"Value": "30,0567",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:25:00",
"Phase": 1,
"Value": "30,6214",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:26:00",
"Phase": 1,
"Value": "27,1841",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:27:00",
"Phase": 1,
"Value": "29,2462",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:28:00",
"Phase": 1,
"Value": "31,0292",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:29:00",
"Phase": 1,
"Value": "34,2726",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:30:00",
"Phase": 1,
"Value": "33,1844",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:31:00",
"Phase": 1,
"Value": "32,7101",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:32:00",
"Phase": 1,
"Value": "29,0678",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:33:00",
"Phase": 1,
"Value": "28,1384",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:34:00",
"Phase": 1,
"Value": "30,2434",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:35:00",
"Phase": 1,
"Value": "28,0501",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:36:00",
"Phase": 1,
"Value": "29,296",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:37:00",
"Phase": 1,
"Value": "31,4116",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:38:00",
"Phase": 1,
"Value": "30,7291",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:39:00",
"Phase": 1,
"Value": "31,349",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:40:00",
"Phase": 1,
"Value": "31,309",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:41:00",
"Phase": 1,
"Value": "29,3012",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:42:00",
"Phase": 1,
"Value": "30,5837",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:43:00",
"Phase": 1,
"Value": "28,4903",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:44:00",
"Phase": 1,
"Value": "29,1842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:45:00",
"Phase": 1,
"Value": "31,2865",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:46:00",
"Phase": 1,
"Value": "33,8652",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:47:00",
"Phase": 1,
"Value": "30,2321",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:48:00",
"Phase": 1,
"Value": "28,7875",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:49:00",
"Phase": 1,
"Value": "29,6726",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:50:00",
"Phase": 1,
"Value": "30,1061",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:51:00",
"Phase": 1,
"Value": "32,1653",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:52:00",
"Phase": 1,
"Value": "30,2895",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:53:00",
"Phase": 1,
"Value": "31,0799",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:54:00",
"Phase": 1,
"Value": "30,4464",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:55:00",
"Phase": 1,
"Value": "28,3163",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:56:00",
"Phase": 1,
"Value": "26,0334",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:57:00",
"Phase": 1,
"Value": "26,002",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:58:00",
"Phase": 1,
"Value": "28,7798",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 05:59:00",
"Phase": 1,
"Value": "30,7338",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:00:00",
"Phase": 1,
"Value": "28,7231",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:01:00",
"Phase": 1,
"Value": "30,8077",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:02:00",
"Phase": 1,
"Value": "32,5915",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:03:00",
"Phase": 1,
"Value": "30,0776",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:04:00",
"Phase": 1,
"Value": "27,5497",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:05:00",
"Phase": 1,
"Value": "31,9229",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:06:00",
"Phase": 1,
"Value": "28,4854",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:07:00",
"Phase": 1,
"Value": "30,2817",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:08:00",
"Phase": 1,
"Value": "27,5068",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:09:00",
"Phase": 1,
"Value": "27,0128",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:10:00",
"Phase": 1,
"Value": "27,1007",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:11:00",
"Phase": 1,
"Value": "28,426",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:12:00",
"Phase": 1,
"Value": "26,7369",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:13:00",
"Phase": 1,
"Value": "32,0111",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:14:00",
"Phase": 1,
"Value": "27,8633",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:15:00",
"Phase": 1,
"Value": "30,9191",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:16:00",
"Phase": 1,
"Value": "33,4497",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:17:00",
"Phase": 1,
"Value": "31,4356",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:18:00",
"Phase": 1,
"Value": "31,4002",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:19:00",
"Phase": 1,
"Value": "31,2601",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:20:00",
"Phase": 1,
"Value": "27,0455",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:21:00",
"Phase": 1,
"Value": "30,9953",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:22:00",
"Phase": 1,
"Value": "29,9147",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:23:00",
"Phase": 1,
"Value": "22,9532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:24:00",
"Phase": 1,
"Value": "28,7733",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:25:00",
"Phase": 1,
"Value": "28,7103",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:26:00",
"Phase": 1,
"Value": "30,7825",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:27:00",
"Phase": 1,
"Value": "35,0449",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:28:00",
"Phase": 1,
"Value": "9,18673",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:29:00",
"Phase": 1,
"Value": "4,30605",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:30:00",
"Phase": 1,
"Value": "4,2473",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:31:00",
"Phase": 1,
"Value": "3,84742",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:32:00",
"Phase": 1,
"Value": "3,40587",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:33:00",
"Phase": 1,
"Value": "3,36289",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:34:00",
"Phase": 1,
"Value": "3,39337",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:35:00",
"Phase": 1,
"Value": "6,50937",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:36:00",
"Phase": 1,
"Value": "18,8585",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:37:00",
"Phase": 1,
"Value": "26,5963",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:38:00",
"Phase": 1,
"Value": "31,3443",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:39:00",
"Phase": 1,
"Value": "26,5667",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:40:00",
"Phase": 1,
"Value": "28,74",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:41:00",
"Phase": 1,
"Value": "29,9367",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:42:00",
"Phase": 1,
"Value": "33,8165",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:43:00",
"Phase": 1,
"Value": "32,7413",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:44:00",
"Phase": 1,
"Value": "31,4064",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:45:00",
"Phase": 1,
"Value": "25,5914",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:46:00",
"Phase": 1,
"Value": "30,2629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:47:00",
"Phase": 1,
"Value": "28,8958",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:48:00",
"Phase": 1,
"Value": "33,1749",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:49:00",
"Phase": 1,
"Value": "29,635",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:50:00",
"Phase": 1,
"Value": "31,0327",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:51:00",
"Phase": 1,
"Value": "30,4556",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:52:00",
"Phase": 1,
"Value": "29,7518",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:53:00",
"Phase": 1,
"Value": "28,9825",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:54:00",
"Phase": 1,
"Value": "29,8712",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:55:00",
"Phase": 1,
"Value": "28,479",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:56:00",
"Phase": 1,
"Value": "27,2403",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:57:00",
"Phase": 1,
"Value": "28,1987",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:58:00",
"Phase": 1,
"Value": "26,937",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 06:59:00",
"Phase": 1,
"Value": "26,0287",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:00:00",
"Phase": 1,
"Value": "31,4286",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:01:00",
"Phase": 1,
"Value": "30,1325",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:02:00",
"Phase": 1,
"Value": "26,1967",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:03:00",
"Phase": 1,
"Value": "30,0584",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:04:00",
"Phase": 1,
"Value": "29,7312",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:05:00",
"Phase": 1,
"Value": "29,7204",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:06:00",
"Phase": 1,
"Value": "36,0892",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:07:00",
"Phase": 1,
"Value": "31,8671",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:08:00",
"Phase": 1,
"Value": "29,6348",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:09:00",
"Phase": 1,
"Value": "29,2113",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:10:00",
"Phase": 1,
"Value": "29,1831",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:11:00",
"Phase": 1,
"Value": "29,822",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:12:00",
"Phase": 1,
"Value": "32,0511",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:13:00",
"Phase": 1,
"Value": "30,0282",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:14:00",
"Phase": 1,
"Value": "28,0816",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:15:00",
"Phase": 1,
"Value": "25,3433",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:16:00",
"Phase": 1,
"Value": "29,7949",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:17:00",
"Phase": 1,
"Value": "30,5986",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:18:00",
"Phase": 1,
"Value": "31,9764",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:19:00",
"Phase": 1,
"Value": "27,4588",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:20:00",
"Phase": 1,
"Value": "29,3863",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:21:00",
"Phase": 1,
"Value": "31,9464",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:22:00",
"Phase": 1,
"Value": "24,5054",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:23:00",
"Phase": 1,
"Value": "27,2323",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:24:00",
"Phase": 1,
"Value": "28,8513",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:25:00",
"Phase": 1,
"Value": "27,1873",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:26:00",
"Phase": 1,
"Value": "30,5642",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:27:00",
"Phase": 1,
"Value": "30,1901",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:28:00",
"Phase": 1,
"Value": "25,8786",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:29:00",
"Phase": 1,
"Value": "28,9425",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:30:00",
"Phase": 1,
"Value": "29,6199",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:31:00",
"Phase": 1,
"Value": "28,6042",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:32:00",
"Phase": 1,
"Value": "24,0304",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:33:00",
"Phase": 1,
"Value": "26,4512",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:34:00",
"Phase": 1,
"Value": "26,4399",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:35:00",
"Phase": 1,
"Value": "29,9448",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:36:00",
"Phase": 1,
"Value": "32,6945",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:37:00",
"Phase": 1,
"Value": "29,6561",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:38:00",
"Phase": 1,
"Value": "32,1338",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:39:00",
"Phase": 1,
"Value": "30,88",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:40:00",
"Phase": 1,
"Value": "25,954",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:41:00",
"Phase": 1,
"Value": "28,9026",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:42:00",
"Phase": 1,
"Value": "28,7109",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:43:00",
"Phase": 1,
"Value": "30,3849",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:44:00",
"Phase": 1,
"Value": "33,6573",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:45:00",
"Phase": 1,
"Value": "31,3407",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:46:00",
"Phase": 1,
"Value": "27,3529",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:47:00",
"Phase": 1,
"Value": "30,7275",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:48:00",
"Phase": 1,
"Value": "25,4717",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:49:00",
"Phase": 1,
"Value": "28,8117",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:50:00",
"Phase": 1,
"Value": "30,2678",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:51:00",
"Phase": 1,
"Value": "30,6036",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:52:00",
"Phase": 1,
"Value": "29,4841",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:53:00",
"Phase": 1,
"Value": "27,6831",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:54:00",
"Phase": 1,
"Value": "30,296",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:55:00",
"Phase": 1,
"Value": "31,3015",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:56:00",
"Phase": 1,
"Value": "35,788",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:57:00",
"Phase": 1,
"Value": "31,102",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:58:00",
"Phase": 1,
"Value": "29,7797",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 07:59:00",
"Phase": 1,
"Value": "31,4176",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:00:00",
"Phase": 1,
"Value": "26,6201",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:01:00",
"Phase": 1,
"Value": "27,4517",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:02:00",
"Phase": 1,
"Value": "31,5889",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:03:00",
"Phase": 1,
"Value": "28,6299",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:04:00",
"Phase": 1,
"Value": "29,7001",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:05:00",
"Phase": 1,
"Value": "27,6591",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:06:00",
"Phase": 1,
"Value": "26,5491",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:07:00",
"Phase": 1,
"Value": "25,5269",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:08:00",
"Phase": 1,
"Value": "28,868",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:09:00",
"Phase": 1,
"Value": "31,7871",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:10:00",
"Phase": 1,
"Value": "28,2404",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:11:00",
"Phase": 1,
"Value": "31,5836",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:12:00",
"Phase": 1,
"Value": "32,7414",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:13:00",
"Phase": 1,
"Value": "31,2298",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:14:00",
"Phase": 1,
"Value": "33,0948",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:15:00",
"Phase": 1,
"Value": "29,2881",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:16:00",
"Phase": 1,
"Value": "26,3122",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:17:00",
"Phase": 1,
"Value": "28,0806",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:18:00",
"Phase": 1,
"Value": "28,3454",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:19:00",
"Phase": 1,
"Value": "33,7808",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:20:00",
"Phase": 1,
"Value": "31,1842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:21:00",
"Phase": 1,
"Value": "28,7978",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:22:00",
"Phase": 1,
"Value": "29,4345",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:23:00",
"Phase": 1,
"Value": "32,4672",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:24:00",
"Phase": 1,
"Value": "29,87",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:25:00",
"Phase": 1,
"Value": "35,3526",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:26:00",
"Phase": 1,
"Value": "31,6025",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:27:00",
"Phase": 1,
"Value": "30,0869",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:28:00",
"Phase": 1,
"Value": "31,436",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:29:00",
"Phase": 1,
"Value": "28,8601",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:30:00",
"Phase": 1,
"Value": "29,0478",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:31:00",
"Phase": 1,
"Value": "11,8402",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:32:00",
"Phase": 1,
"Value": "4,28754",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:33:00",
"Phase": 1,
"Value": "4,45304",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:34:00",
"Phase": 1,
"Value": "5,05592",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:35:00",
"Phase": 1,
"Value": "15,2887",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:36:00",
"Phase": 1,
"Value": "26,2014",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:37:00",
"Phase": 1,
"Value": "29,0557",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:38:00",
"Phase": 1,
"Value": "34,9957",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:39:00",
"Phase": 1,
"Value": "33,9035",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:40:00",
"Phase": 1,
"Value": "30,1186",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:41:00",
"Phase": 1,
"Value": "28,5659",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:42:00",
"Phase": 1,
"Value": "31,2014",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:43:00",
"Phase": 1,
"Value": "33,5699",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:44:00",
"Phase": 1,
"Value": "34,4962",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:45:00",
"Phase": 1,
"Value": "31,9781",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:46:00",
"Phase": 1,
"Value": "33,7652",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:47:00",
"Phase": 1,
"Value": "32,2469",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:48:00",
"Phase": 1,
"Value": "28,3099",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:49:00",
"Phase": 1,
"Value": "28,9374",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:50:00",
"Phase": 1,
"Value": "30,7616",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:51:00",
"Phase": 1,
"Value": "27,2312",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:52:00",
"Phase": 1,
"Value": "35,3812",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:53:00",
"Phase": 1,
"Value": "30,4687",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:54:00",
"Phase": 1,
"Value": "29,9377",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:55:00",
"Phase": 1,
"Value": "33,5091",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:56:00",
"Phase": 1,
"Value": "30,6025",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:57:00",
"Phase": 1,
"Value": "32,6333",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:58:00",
"Phase": 1,
"Value": "30,1293",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 08:59:00",
"Phase": 1,
"Value": "31,44",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:00:00",
"Phase": 1,
"Value": "31,1801",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:01:00",
"Phase": 1,
"Value": "31,8428",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:02:00",
"Phase": 1,
"Value": "32,2027",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:03:00",
"Phase": 1,
"Value": "27,785",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:04:00",
"Phase": 1,
"Value": "34,1936",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:05:00",
"Phase": 1,
"Value": "29,2206",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:06:00",
"Phase": 1,
"Value": "29,713",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:07:00",
"Phase": 1,
"Value": "27,7426",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:08:00",
"Phase": 1,
"Value": "29,2303",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:09:00",
"Phase": 1,
"Value": "28,0927",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:10:00",
"Phase": 1,
"Value": "27,5178",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:11:00",
"Phase": 1,
"Value": "28,8792",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:12:00",
"Phase": 1,
"Value": "30,7943",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:13:00",
"Phase": 1,
"Value": "28,9185",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:14:00",
"Phase": 1,
"Value": "29,0996",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:15:00",
"Phase": 1,
"Value": "31,2226",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:16:00",
"Phase": 1,
"Value": "28,996",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:17:00",
"Phase": 1,
"Value": "29,3167",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:18:00",
"Phase": 1,
"Value": "27,2859",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:19:00",
"Phase": 1,
"Value": "28,4634",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:20:00",
"Phase": 1,
"Value": "28,4731",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:21:00",
"Phase": 1,
"Value": "30,0539",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:22:00",
"Phase": 1,
"Value": "29,4222",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:23:00",
"Phase": 1,
"Value": "28,8977",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:24:00",
"Phase": 1,
"Value": "28,5057",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:25:00",
"Phase": 1,
"Value": "29,3342",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:26:00",
"Phase": 1,
"Value": "28,2906",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:27:00",
"Phase": 1,
"Value": "26,2165",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:28:00",
"Phase": 1,
"Value": "28,7393",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:29:00",
"Phase": 1,
"Value": "26,1691",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:30:00",
"Phase": 1,
"Value": "28,2722",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:31:00",
"Phase": 1,
"Value": "27,8737",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:32:00",
"Phase": 1,
"Value": "26,3049",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:33:00",
"Phase": 1,
"Value": "27,4042",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:34:00",
"Phase": 1,
"Value": "29,3259",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:35:00",
"Phase": 1,
"Value": "26,4597",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:36:00",
"Phase": 1,
"Value": "28,5229",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:37:00",
"Phase": 1,
"Value": "30,3807",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:38:00",
"Phase": 1,
"Value": "26,9821",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:39:00",
"Phase": 1,
"Value": "29,842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:40:00",
"Phase": 1,
"Value": "29,6414",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:41:00",
"Phase": 1,
"Value": "28,3723",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:42:00",
"Phase": 1,
"Value": "29,7991",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:43:00",
"Phase": 1,
"Value": "27,9492",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:44:00",
"Phase": 1,
"Value": "28,2889",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:45:00",
"Phase": 1,
"Value": "27,8206",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:46:00",
"Phase": 1,
"Value": "30,5249",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:47:00",
"Phase": 1,
"Value": "30,76",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:48:00",
"Phase": 1,
"Value": "28,4699",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:49:00",
"Phase": 1,
"Value": "27,4195",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:50:00",
"Phase": 1,
"Value": "29,0257",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:51:00",
"Phase": 1,
"Value": "25,0569",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:52:00",
"Phase": 1,
"Value": "28,1569",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:53:00",
"Phase": 1,
"Value": "30,4831",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:54:00",
"Phase": 1,
"Value": "30,3385",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:55:00",
"Phase": 1,
"Value": "28,4757",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:56:00",
"Phase": 1,
"Value": "28,1633",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:57:00",
"Phase": 1,
"Value": "27,808",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:58:00",
"Phase": 1,
"Value": "28,3346",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 09:59:00",
"Phase": 1,
"Value": "26,6452",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:00:00",
"Phase": 1,
"Value": "27,382",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:01:00",
"Phase": 1,
"Value": "26,1703",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:02:00",
"Phase": 1,
"Value": "29,8988",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:03:00",
"Phase": 1,
"Value": "29,7148",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:04:00",
"Phase": 1,
"Value": "29,0479",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:05:00",
"Phase": 1,
"Value": "32,5532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:06:00",
"Phase": 1,
"Value": "28,7233",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:07:00",
"Phase": 1,
"Value": "28,0186",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:08:00",
"Phase": 1,
"Value": "30,8112",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:09:00",
"Phase": 1,
"Value": "29,7382",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:10:00",
"Phase": 1,
"Value": "27,0748",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:11:00",
"Phase": 1,
"Value": "31,2006",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:12:00",
"Phase": 1,
"Value": "32,778",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:13:00",
"Phase": 1,
"Value": "28,7842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:14:00",
"Phase": 1,
"Value": "31,6819",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:15:00",
"Phase": 1,
"Value": "34,1727",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:16:00",
"Phase": 1,
"Value": "28,0609",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:17:00",
"Phase": 1,
"Value": "31,8006",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:18:00",
"Phase": 1,
"Value": "31,0355",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:19:00",
"Phase": 1,
"Value": "32,1783",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:20:00",
"Phase": 1,
"Value": "33,8506",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:21:00",
"Phase": 1,
"Value": "32,489",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:22:00",
"Phase": 1,
"Value": "28,9501",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:23:00",
"Phase": 1,
"Value": "33,2159",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:24:00",
"Phase": 1,
"Value": "29,3789",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:25:00",
"Phase": 1,
"Value": "27,1646",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:26:00",
"Phase": 1,
"Value": "27,8298",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:27:00",
"Phase": 1,
"Value": "29,4465",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:28:00",
"Phase": 1,
"Value": "29,0264",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:29:00",
"Phase": 1,
"Value": "30,4518",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:30:00",
"Phase": 1,
"Value": "31,6394",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:31:00",
"Phase": 1,
"Value": "29,1869",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:32:00",
"Phase": 1,
"Value": "27,3478",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:33:00",
"Phase": 1,
"Value": "30,0571",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:34:00",
"Phase": 1,
"Value": "30,0281",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:35:00",
"Phase": 1,
"Value": "29,4158",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:36:00",
"Phase": 1,
"Value": "31,1883",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:37:00",
"Phase": 1,
"Value": "29,5163",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:38:00",
"Phase": 1,
"Value": "31,6815",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:39:00",
"Phase": 1,
"Value": "28,6745",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:40:00",
"Phase": 1,
"Value": "31,7694",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:41:00",
"Phase": 1,
"Value": "31,7083",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:42:00",
"Phase": 1,
"Value": "32,2642",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:43:00",
"Phase": 1,
"Value": "32,4245",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:44:00",
"Phase": 1,
"Value": "35,4058",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:45:00",
"Phase": 1,
"Value": "29,4634",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:46:00",
"Phase": 1,
"Value": "31,7757",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:47:00",
"Phase": 1,
"Value": "34,5016",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:48:00",
"Phase": 1,
"Value": "31,9847",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:49:00",
"Phase": 1,
"Value": "36,89",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:50:00",
"Phase": 1,
"Value": "35,7607",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:51:00",
"Phase": 1,
"Value": "32,9735",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:52:00",
"Phase": 1,
"Value": "34,5472",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:53:00",
"Phase": 1,
"Value": "37,3145",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:54:00",
"Phase": 1,
"Value": "35,5364",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:55:00",
"Phase": 1,
"Value": "33,9776",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:56:00",
"Phase": 1,
"Value": "33,0329",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:57:00",
"Phase": 1,
"Value": "31,7514",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:58:00",
"Phase": 1,
"Value": "31,9662",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 10:59:00",
"Phase": 1,
"Value": "33,6785",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:00:00",
"Phase": 1,
"Value": "31,7027",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:01:00",
"Phase": 1,
"Value": "29,8945",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:02:00",
"Phase": 1,
"Value": "37,388",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:03:00",
"Phase": 1,
"Value": "33,0882",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:04:00",
"Phase": 1,
"Value": "33,3922",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:05:00",
"Phase": 1,
"Value": "34,7671",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:06:00",
"Phase": 1,
"Value": "34,3479",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:07:00",
"Phase": 1,
"Value": "32,57",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:08:00",
"Phase": 1,
"Value": "30,9774",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:09:00",
"Phase": 1,
"Value": "26,8397",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:10:00",
"Phase": 1,
"Value": "26,9491",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:11:00",
"Phase": 1,
"Value": "25,2761",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:12:00",
"Phase": 1,
"Value": "30,9468",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:13:00",
"Phase": 1,
"Value": "33,0001",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:14:00",
"Phase": 1,
"Value": "12,182",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:15:00",
"Phase": 1,
"Value": "3,88242",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:16:00",
"Phase": 1,
"Value": "3,40038",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:17:00",
"Phase": 1,
"Value": "3,12687",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:18:00",
"Phase": 1,
"Value": "7,67779",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:19:00",
"Phase": 1,
"Value": "30,5525",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:20:00",
"Phase": 1,
"Value": "28,0412",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:21:00",
"Phase": 1,
"Value": "25,0947",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:22:00",
"Phase": 1,
"Value": "31,0502",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:23:00",
"Phase": 1,
"Value": "33,4355",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:24:00",
"Phase": 1,
"Value": "32,7401",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:25:00",
"Phase": 1,
"Value": "30,0562",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:26:00",
"Phase": 1,
"Value": "29,5953",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:27:00",
"Phase": 1,
"Value": "29,5797",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:28:00",
"Phase": 1,
"Value": "28,411",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:29:00",
"Phase": 1,
"Value": "27,9676",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:30:00",
"Phase": 1,
"Value": "30,8273",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:31:00",
"Phase": 1,
"Value": "28,0011",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:32:00",
"Phase": 1,
"Value": "28,493",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:33:00",
"Phase": 1,
"Value": "30,1678",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:34:00",
"Phase": 1,
"Value": "29,6554",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:35:00",
"Phase": 1,
"Value": "31,0041",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:36:00",
"Phase": 1,
"Value": "29,7451",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:37:00",
"Phase": 1,
"Value": "29,9194",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:38:00",
"Phase": 1,
"Value": "25,2622",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:39:00",
"Phase": 1,
"Value": "30,6475",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:40:00",
"Phase": 1,
"Value": "34,4903",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:41:00",
"Phase": 1,
"Value": "28,0386",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:42:00",
"Phase": 1,
"Value": "27,6766",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:43:00",
"Phase": 1,
"Value": "28,2741",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:44:00",
"Phase": 1,
"Value": "28,0684",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:45:00",
"Phase": 1,
"Value": "34,8397",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:46:00",
"Phase": 1,
"Value": "32,7465",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:47:00",
"Phase": 1,
"Value": "30,4531",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:48:00",
"Phase": 1,
"Value": "27,5278",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:49:00",
"Phase": 1,
"Value": "29,1283",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:50:00",
"Phase": 1,
"Value": "28,7878",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:51:00",
"Phase": 1,
"Value": "27,5028",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:52:00",
"Phase": 1,
"Value": "28,09",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:53:00",
"Phase": 1,
"Value": "30,6357",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:54:00",
"Phase": 1,
"Value": "33,1275",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:55:00",
"Phase": 1,
"Value": "31,1363",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:56:00",
"Phase": 1,
"Value": "35,7091",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:57:00",
"Phase": 1,
"Value": "29,9211",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:58:00",
"Phase": 1,
"Value": "27,6952",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 11:59:00",
"Phase": 1,
"Value": "29,3924",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:00:00",
"Phase": 1,
"Value": "30,8077",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:01:00",
"Phase": 1,
"Value": "31,6961",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:02:00",
"Phase": 1,
"Value": "33,1596",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:03:00",
"Phase": 1,
"Value": "29,6839",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:04:00",
"Phase": 1,
"Value": "27,3948",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:05:00",
"Phase": 1,
"Value": "28,9412",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:06:00",
"Phase": 1,
"Value": "32,0174",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:07:00",
"Phase": 1,
"Value": "33,2373",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:08:00",
"Phase": 1,
"Value": "33,6998",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:09:00",
"Phase": 1,
"Value": "32,5741",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:10:00",
"Phase": 1,
"Value": "27,301",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:11:00",
"Phase": 1,
"Value": "28,6437",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:12:00",
"Phase": 1,
"Value": "30,4128",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:13:00",
"Phase": 1,
"Value": "31,3515",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:14:00",
"Phase": 1,
"Value": "34,1142",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:15:00",
"Phase": 1,
"Value": "31,129",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:16:00",
"Phase": 1,
"Value": "25,6167",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:17:00",
"Phase": 1,
"Value": "28,9622",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:18:00",
"Phase": 1,
"Value": "26,8619",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:19:00",
"Phase": 1,
"Value": "30,0644",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:20:00",
"Phase": 1,
"Value": "30,3365",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:21:00",
"Phase": 1,
"Value": "32,5801",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:22:00",
"Phase": 1,
"Value": "28,6116",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:23:00",
"Phase": 1,
"Value": "28,9029",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:24:00",
"Phase": 1,
"Value": "32,713",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:25:00",
"Phase": 1,
"Value": "31,0248",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:26:00",
"Phase": 1,
"Value": "29,4581",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:27:00",
"Phase": 1,
"Value": "24,9873",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:28:00",
"Phase": 1,
"Value": "30,7532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:29:00",
"Phase": 1,
"Value": "29,6273",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:30:00",
"Phase": 1,
"Value": "34,2253",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:31:00",
"Phase": 1,
"Value": "29,3388",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:32:00",
"Phase": 1,
"Value": "30,1847",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:33:00",
"Phase": 1,
"Value": "28,5677",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:34:00",
"Phase": 1,
"Value": "28,2181",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:35:00",
"Phase": 1,
"Value": "29,3485",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:36:00",
"Phase": 1,
"Value": "32,1413",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:37:00",
"Phase": 1,
"Value": "35,4196",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:38:00",
"Phase": 1,
"Value": "29,6569",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:39:00",
"Phase": 1,
"Value": "30,3629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:40:00",
"Phase": 1,
"Value": "29,5145",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:41:00",
"Phase": 1,
"Value": "31,5321",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:42:00",
"Phase": 1,
"Value": "29,4747",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:43:00",
"Phase": 1,
"Value": "35,7646",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:44:00",
"Phase": 1,
"Value": "31,3616",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:45:00",
"Phase": 1,
"Value": "28,6645",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:46:00",
"Phase": 1,
"Value": "28,6533",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:47:00",
"Phase": 1,
"Value": "31,7302",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:48:00",
"Phase": 1,
"Value": "34,094",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:49:00",
"Phase": 1,
"Value": "32,6039",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:50:00",
"Phase": 1,
"Value": "31,464",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:51:00",
"Phase": 1,
"Value": "31,9675",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:52:00",
"Phase": 1,
"Value": "30,7856",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:53:00",
"Phase": 1,
"Value": "31,164",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:54:00",
"Phase": 1,
"Value": "27,1824",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:55:00",
"Phase": 1,
"Value": "30,2422",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:56:00",
"Phase": 1,
"Value": "29,2362",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:57:00",
"Phase": 1,
"Value": "30,9974",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:58:00",
"Phase": 1,
"Value": "33,2978",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 12:59:00",
"Phase": 1,
"Value": "32,562",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:00:00",
"Phase": 1,
"Value": "26,9423",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:01:00",
"Phase": 1,
"Value": "28,4462",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:02:00",
"Phase": 1,
"Value": "33,0384",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:03:00",
"Phase": 1,
"Value": "29,9445",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:04:00",
"Phase": 1,
"Value": "29,4403",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:05:00",
"Phase": 1,
"Value": "33,8322",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:06:00",
"Phase": 1,
"Value": "31,48",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:07:00",
"Phase": 1,
"Value": "28,4834",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:08:00",
"Phase": 1,
"Value": "27,5046",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:09:00",
"Phase": 1,
"Value": "30,0534",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:10:00",
"Phase": 1,
"Value": "33,5763",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:11:00",
"Phase": 1,
"Value": "34,0592",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:12:00",
"Phase": 1,
"Value": "34,8426",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:13:00",
"Phase": 1,
"Value": "30,6438",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:14:00",
"Phase": 1,
"Value": "27,694",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:15:00",
"Phase": 1,
"Value": "29,7608",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:16:00",
"Phase": 1,
"Value": "33,9922",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:17:00",
"Phase": 1,
"Value": "28,4082",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:18:00",
"Phase": 1,
"Value": "32,2098",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:19:00",
"Phase": 1,
"Value": "34,4069",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:20:00",
"Phase": 1,
"Value": "32,3686",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:21:00",
"Phase": 1,
"Value": "30,4781",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:22:00",
"Phase": 1,
"Value": "32,8163",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:23:00",
"Phase": 1,
"Value": "29,8724",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:24:00",
"Phase": 1,
"Value": "28,8973",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:25:00",
"Phase": 1,
"Value": "30,1135",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:26:00",
"Phase": 1,
"Value": "30,6103",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:27:00",
"Phase": 1,
"Value": "29,1877",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:28:00",
"Phase": 1,
"Value": "33,2655",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:29:00",
"Phase": 1,
"Value": "27,0723",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:30:00",
"Phase": 1,
"Value": "3,84712",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:31:00",
"Phase": 1,
"Value": "3,99478",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:32:00",
"Phase": 1,
"Value": "4,88657",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:33:00",
"Phase": 1,
"Value": "17,2539",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:34:00",
"Phase": 1,
"Value": "32,6689",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:35:00",
"Phase": 1,
"Value": "30,3629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:36:00",
"Phase": 1,
"Value": "25,9068",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:37:00",
"Phase": 1,
"Value": "28,1915",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:38:00",
"Phase": 1,
"Value": "32,2479",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:39:00",
"Phase": 1,
"Value": "33,1487",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:40:00",
"Phase": 1,
"Value": "36,6031",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:41:00",
"Phase": 1,
"Value": "32,6305",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:42:00",
"Phase": 1,
"Value": "33,7318",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:43:00",
"Phase": 1,
"Value": "31,8844",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:44:00",
"Phase": 1,
"Value": "28,802",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:45:00",
"Phase": 1,
"Value": "32,9152",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:46:00",
"Phase": 1,
"Value": "28,8764",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:47:00",
"Phase": 1,
"Value": "28,1786",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:48:00",
"Phase": 1,
"Value": "30,5048",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:49:00",
"Phase": 1,
"Value": "31,2934",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:50:00",
"Phase": 1,
"Value": "31,4908",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:51:00",
"Phase": 1,
"Value": "31,0517",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:52:00",
"Phase": 1,
"Value": "31,7496",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:53:00",
"Phase": 1,
"Value": "30,3177",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:54:00",
"Phase": 1,
"Value": "30,7758",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:55:00",
"Phase": 1,
"Value": "31,9515",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:56:00",
"Phase": 1,
"Value": "30,7321",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:57:00",
"Phase": 1,
"Value": "29,2631",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:58:00",
"Phase": 1,
"Value": "29,3166",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 13:59:00",
"Phase": 1,
"Value": "27,1179",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:00:00",
"Phase": 1,
"Value": "29,8037",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:01:00",
"Phase": 1,
"Value": "28,4287",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:02:00",
"Phase": 1,
"Value": "27,74",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:03:00",
"Phase": 1,
"Value": "30,9",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:04:00",
"Phase": 1,
"Value": "29,9279",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:05:00",
"Phase": 1,
"Value": "28,2835",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:06:00",
"Phase": 1,
"Value": "30,2928",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:07:00",
"Phase": 1,
"Value": "34,3982",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:08:00",
"Phase": 1,
"Value": "31,7483",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:09:00",
"Phase": 1,
"Value": "32,1285",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:10:00",
"Phase": 1,
"Value": "30,8838",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:11:00",
"Phase": 1,
"Value": "33,6239",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:12:00",
"Phase": 1,
"Value": "33,791",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:13:00",
"Phase": 1,
"Value": "34,4981",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:14:00",
"Phase": 1,
"Value": "31,6715",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:15:00",
"Phase": 1,
"Value": "29,2323",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:16:00",
"Phase": 1,
"Value": "33,3661",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:17:00",
"Phase": 1,
"Value": "32,2538",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:18:00",
"Phase": 1,
"Value": "30,0776",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:19:00",
"Phase": 1,
"Value": "28,457",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:20:00",
"Phase": 1,
"Value": "31,3115",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:21:00",
"Phase": 1,
"Value": "25,872",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:22:00",
"Phase": 1,
"Value": "29,0938",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:23:00",
"Phase": 1,
"Value": "31,7358",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:24:00",
"Phase": 1,
"Value": "29,3359",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:25:00",
"Phase": 1,
"Value": "27,6216",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:26:00",
"Phase": 1,
"Value": "30,2301",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:27:00",
"Phase": 1,
"Value": "30,6378",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:28:00",
"Phase": 1,
"Value": "28,0434",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:29:00",
"Phase": 1,
"Value": "30,0848",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:30:00",
"Phase": 1,
"Value": "32,0097",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:31:00",
"Phase": 1,
"Value": "32,3665",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:32:00",
"Phase": 1,
"Value": "30,5938",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:33:00",
"Phase": 1,
"Value": "29,3612",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:34:00",
"Phase": 1,
"Value": "16,3532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:35:00",
"Phase": 1,
"Value": "3,28472",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:36:00",
"Phase": 1,
"Value": "3,46279",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:37:00",
"Phase": 1,
"Value": "3,34592",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:38:00",
"Phase": 1,
"Value": "7,40444",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:39:00",
"Phase": 1,
"Value": "3,90046",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:40:00",
"Phase": 1,
"Value": "17,6897",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:41:00",
"Phase": 1,
"Value": "29,5751",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:42:00",
"Phase": 1,
"Value": "30,4439",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:43:00",
"Phase": 1,
"Value": "31,0103",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:44:00",
"Phase": 1,
"Value": "28,7535",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:45:00",
"Phase": 1,
"Value": "29,2555",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:46:00",
"Phase": 1,
"Value": "30,537",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:47:00",
"Phase": 1,
"Value": "23,9939",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:48:00",
"Phase": 1,
"Value": "31,6542",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:49:00",
"Phase": 1,
"Value": "31,3217",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:50:00",
"Phase": 1,
"Value": "28,063",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:51:00",
"Phase": 1,
"Value": "30,4792",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:52:00",
"Phase": 1,
"Value": "33,009",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:53:00",
"Phase": 1,
"Value": "30,897",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:54:00",
"Phase": 1,
"Value": "33,262",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:55:00",
"Phase": 1,
"Value": "33,2022",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:56:00",
"Phase": 1,
"Value": "27,9768",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:57:00",
"Phase": 1,
"Value": "31,4954",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:58:00",
"Phase": 1,
"Value": "30,8495",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 14:59:00",
"Phase": 1,
"Value": "29,6333",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:00:00",
"Phase": 1,
"Value": "30,6664",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:01:00",
"Phase": 1,
"Value": "33,8774",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:02:00",
"Phase": 1,
"Value": "29,0395",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:03:00",
"Phase": 1,
"Value": "31,066",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:04:00",
"Phase": 1,
"Value": "30,0166",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:05:00",
"Phase": 1,
"Value": "32,2645",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:06:00",
"Phase": 1,
"Value": "34,0182",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:07:00",
"Phase": 1,
"Value": "31,8098",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:08:00",
"Phase": 1,
"Value": "31,8339",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:09:00",
"Phase": 1,
"Value": "30,3964",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:10:00",
"Phase": 1,
"Value": "28,5797",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:11:00",
"Phase": 1,
"Value": "32,9261",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:12:00",
"Phase": 1,
"Value": "27,7718",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:13:00",
"Phase": 1,
"Value": "30,3168",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:14:00",
"Phase": 1,
"Value": "33,3435",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:15:00",
"Phase": 1,
"Value": "30,5873",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:16:00",
"Phase": 1,
"Value": "29,4667",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:17:00",
"Phase": 1,
"Value": "27,3339",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:18:00",
"Phase": 1,
"Value": "25,5824",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:19:00",
"Phase": 1,
"Value": "26,5276",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:20:00",
"Phase": 1,
"Value": "29,4456",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:21:00",
"Phase": 1,
"Value": "31,5241",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:22:00",
"Phase": 1,
"Value": "30,4219",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:23:00",
"Phase": 1,
"Value": "28,0489",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:24:00",
"Phase": 1,
"Value": "33,4223",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:25:00",
"Phase": 1,
"Value": "30,7676",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:26:00",
"Phase": 1,
"Value": "30,6178",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:27:00",
"Phase": 1,
"Value": "32,0331",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:28:00",
"Phase": 1,
"Value": "29,6628",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:29:00",
"Phase": 1,
"Value": "32,1308",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:30:00",
"Phase": 1,
"Value": "33,3572",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:31:00",
"Phase": 1,
"Value": "28,8635",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:32:00",
"Phase": 1,
"Value": "31,1261",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:33:00",
"Phase": 1,
"Value": "30,6843",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:34:00",
"Phase": 1,
"Value": "31,871",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:35:00",
"Phase": 1,
"Value": "33,4666",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:36:00",
"Phase": 1,
"Value": "27,7569",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:37:00",
"Phase": 1,
"Value": "27,6641",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:38:00",
"Phase": 1,
"Value": "29,7292",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:39:00",
"Phase": 1,
"Value": "29,0216",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:40:00",
"Phase": 1,
"Value": "27,5532",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:41:00",
"Phase": 1,
"Value": "31,9893",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:42:00",
"Phase": 1,
"Value": "29,7088",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:43:00",
"Phase": 1,
"Value": "28,733",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:44:00",
"Phase": 1,
"Value": "31,3996",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:45:00",
"Phase": 1,
"Value": "29,8835",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:46:00",
"Phase": 1,
"Value": "33,1017",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:47:00",
"Phase": 1,
"Value": "30,7157",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:48:00",
"Phase": 1,
"Value": "29,484",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:49:00",
"Phase": 1,
"Value": "28,3156",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:50:00",
"Phase": 1,
"Value": "32,9953",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:51:00",
"Phase": 1,
"Value": "30,7903",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:52:00",
"Phase": 1,
"Value": "32,0516",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:53:00",
"Phase": 1,
"Value": "31,0966",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:54:00",
"Phase": 1,
"Value": "31,271",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:55:00",
"Phase": 1,
"Value": "31,3608",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:56:00",
"Phase": 1,
"Value": "29,8276",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:57:00",
"Phase": 1,
"Value": "29,0475",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:58:00",
"Phase": 1,
"Value": "30,0373",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 15:59:00",
"Phase": 1,
"Value": "30,1356",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:00:00",
"Phase": 1,
"Value": "30,2325",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:01:00",
"Phase": 1,
"Value": "35,9948",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:02:00",
"Phase": 1,
"Value": "31,3368",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:03:00",
"Phase": 1,
"Value": "31,549",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:04:00",
"Phase": 1,
"Value": "32,9275",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:05:00",
"Phase": 1,
"Value": "33,3253",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:06:00",
"Phase": 1,
"Value": "29,552",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:07:00",
"Phase": 1,
"Value": "29,9023",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:08:00",
"Phase": 1,
"Value": "33,2932",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:09:00",
"Phase": 1,
"Value": "30,7765",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:10:00",
"Phase": 1,
"Value": "28,9526",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:11:00",
"Phase": 1,
"Value": "28,8912",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:12:00",
"Phase": 1,
"Value": "28,7565",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:13:00",
"Phase": 1,
"Value": "30,4817",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:14:00",
"Phase": 1,
"Value": "32,1531",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:15:00",
"Phase": 1,
"Value": "28,3957",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:16:00",
"Phase": 1,
"Value": "31,0382",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:17:00",
"Phase": 1,
"Value": "31,6326",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:18:00",
"Phase": 1,
"Value": "32,9715",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:19:00",
"Phase": 1,
"Value": "29,1858",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:20:00",
"Phase": 1,
"Value": "29,8717",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:21:00",
"Phase": 1,
"Value": "30,3427",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:22:00",
"Phase": 1,
"Value": "30,7907",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:23:00",
"Phase": 1,
"Value": "32,2243",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:24:00",
"Phase": 1,
"Value": "33,2817",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:25:00",
"Phase": 1,
"Value": "33,9553",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:26:00",
"Phase": 1,
"Value": "31,9667",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:27:00",
"Phase": 1,
"Value": "33,2472",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:28:00",
"Phase": 1,
"Value": "32,5214",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:29:00",
"Phase": 1,
"Value": "29,2634",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:30:00",
"Phase": 1,
"Value": "32,2537",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:31:00",
"Phase": 1,
"Value": "32,0035",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:32:00",
"Phase": 1,
"Value": "27,8665",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:33:00",
"Phase": 1,
"Value": "32,4545",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:34:00",
"Phase": 1,
"Value": "32,1767",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:35:00",
"Phase": 1,
"Value": "28,1477",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:36:00",
"Phase": 1,
"Value": "27,5638",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:37:00",
"Phase": 1,
"Value": "30,6558",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:38:00",
"Phase": 1,
"Value": "33,0782",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:39:00",
"Phase": 1,
"Value": "32,0034",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:40:00",
"Phase": 1,
"Value": "31,8993",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:41:00",
"Phase": 1,
"Value": "29,0778",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:42:00",
"Phase": 1,
"Value": "31,5351",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:43:00",
"Phase": 1,
"Value": "28,2284",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:44:00",
"Phase": 1,
"Value": "27,1683",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:45:00",
"Phase": 1,
"Value": "28,9431",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:46:00",
"Phase": 1,
"Value": "29,1657",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:47:00",
"Phase": 1,
"Value": "26,8732",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:48:00",
"Phase": 1,
"Value": "29,2938",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:49:00",
"Phase": 1,
"Value": "28,7286",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:50:00",
"Phase": 1,
"Value": "30,1467",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:51:00",
"Phase": 1,
"Value": "29,4449",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:52:00",
"Phase": 1,
"Value": "30,2662",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:53:00",
"Phase": 1,
"Value": "28,9855",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:54:00",
"Phase": 1,
"Value": "36,3783",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:55:00",
"Phase": 1,
"Value": "34,4601",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:56:00",
"Phase": 1,
"Value": "30,5732",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:57:00",
"Phase": 1,
"Value": "30,4673",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:58:00",
"Phase": 1,
"Value": "30,477",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 16:59:00",
"Phase": 1,
"Value": "30,8641",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:00:00",
"Phase": 1,
"Value": "32,1376",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:01:00",
"Phase": 1,
"Value": "30,7419",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:02:00",
"Phase": 1,
"Value": "30,3954",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:03:00",
"Phase": 1,
"Value": "29,5397",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:04:00",
"Phase": 1,
"Value": "31,7331",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:05:00",
"Phase": 1,
"Value": "29,2038",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:06:00",
"Phase": 1,
"Value": "30,8324",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:07:00",
"Phase": 1,
"Value": "28,9965",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:08:00",
"Phase": 1,
"Value": "28,1819",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:09:00",
"Phase": 1,
"Value": "30,0277",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:10:00",
"Phase": 1,
"Value": "28,8123",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:11:00",
"Phase": 1,
"Value": "31,6479",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:12:00",
"Phase": 1,
"Value": "28,5351",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:13:00",
"Phase": 1,
"Value": "29,7181",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:14:00",
"Phase": 1,
"Value": "30,7335",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:15:00",
"Phase": 1,
"Value": "28,6406",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:16:00",
"Phase": 1,
"Value": "26,8168",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:17:00",
"Phase": 1,
"Value": "29,6543",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:18:00",
"Phase": 1,
"Value": "31,8597",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:19:00",
"Phase": 1,
"Value": "31,1674",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:20:00",
"Phase": 1,
"Value": "26,1747",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:21:00",
"Phase": 1,
"Value": "29,626",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:22:00",
"Phase": 1,
"Value": "30,0969",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:23:00",
"Phase": 1,
"Value": "33,0029",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:24:00",
"Phase": 1,
"Value": "33,2791",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:25:00",
"Phase": 1,
"Value": "31,0842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:26:00",
"Phase": 1,
"Value": "31,6006",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:27:00",
"Phase": 1,
"Value": "31,3818",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:28:00",
"Phase": 1,
"Value": "28,1678",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:29:00",
"Phase": 1,
"Value": "29,7936",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:30:00",
"Phase": 1,
"Value": "31,7527",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:31:00",
"Phase": 1,
"Value": "30,6195",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:32:00",
"Phase": 1,
"Value": "28,9124",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:33:00",
"Phase": 1,
"Value": "29,9677",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:34:00",
"Phase": 1,
"Value": "26,7664",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:35:00",
"Phase": 1,
"Value": "33,3505",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:36:00",
"Phase": 1,
"Value": "30,2284",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:37:00",
"Phase": 1,
"Value": "26,5734",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:38:00",
"Phase": 1,
"Value": "30,1121",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:39:00",
"Phase": 1,
"Value": "31,2109",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:40:00",
"Phase": 1,
"Value": "30,6837",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:41:00",
"Phase": 1,
"Value": "31,5251",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:42:00",
"Phase": 1,
"Value": "32,5956",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:43:00",
"Phase": 1,
"Value": "31,5956",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:44:00",
"Phase": 1,
"Value": "28,9159",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:45:00",
"Phase": 1,
"Value": "32,0068",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:46:00",
"Phase": 1,
"Value": "27,4847",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:47:00",
"Phase": 1,
"Value": "30,5952",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:48:00",
"Phase": 1,
"Value": "30,5133",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:49:00",
"Phase": 1,
"Value": "32,2629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:50:00",
"Phase": 1,
"Value": "30,313",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:51:00",
"Phase": 1,
"Value": "29,3108",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:52:00",
"Phase": 1,
"Value": "26,0118",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:53:00",
"Phase": 1,
"Value": "28,4421",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:54:00",
"Phase": 1,
"Value": "27,2218",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:55:00",
"Phase": 1,
"Value": "27,2909",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:56:00",
"Phase": 1,
"Value": "26,6397",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:57:00",
"Phase": 1,
"Value": "30,5123",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:58:00",
"Phase": 1,
"Value": "26,6371",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 17:59:00",
"Phase": 1,
"Value": "27,7477",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:00:00",
"Phase": 1,
"Value": "29,6178",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:01:00",
"Phase": 1,
"Value": "30,4379",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:02:00",
"Phase": 1,
"Value": "29,0031",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:03:00",
"Phase": 1,
"Value": "30,2807",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:04:00",
"Phase": 1,
"Value": "27,2421",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:05:00",
"Phase": 1,
"Value": "29,6376",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:06:00",
"Phase": 1,
"Value": "31,1079",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:07:00",
"Phase": 1,
"Value": "29,4922",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:08:00",
"Phase": 1,
"Value": "30,4917",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:09:00",
"Phase": 1,
"Value": "29,9019",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:10:00",
"Phase": 1,
"Value": "30,0908",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:11:00",
"Phase": 1,
"Value": "31,0522",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:12:00",
"Phase": 1,
"Value": "31,2128",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:13:00",
"Phase": 1,
"Value": "30,5724",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:14:00",
"Phase": 1,
"Value": "29,1518",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:15:00",
"Phase": 1,
"Value": "30,5577",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:16:00",
"Phase": 1,
"Value": "31,3051",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:17:00",
"Phase": 1,
"Value": "30,1841",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:18:00",
"Phase": 1,
"Value": "28,4032",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:19:00",
"Phase": 1,
"Value": "29,0001",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:20:00",
"Phase": 1,
"Value": "27,9272",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:21:00",
"Phase": 1,
"Value": "26,6803",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:22:00",
"Phase": 1,
"Value": "29,1762",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:23:00",
"Phase": 1,
"Value": "29,6458",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:24:00",
"Phase": 1,
"Value": "30,7375",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:25:00",
"Phase": 1,
"Value": "30,4049",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:26:00",
"Phase": 1,
"Value": "31,3235",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:27:00",
"Phase": 1,
"Value": "25,7434",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:28:00",
"Phase": 1,
"Value": "31,125",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:29:00",
"Phase": 1,
"Value": "29,8057",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:30:00",
"Phase": 1,
"Value": "28,6148",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:31:00",
"Phase": 1,
"Value": "28,138",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:32:00",
"Phase": 1,
"Value": "31,0184",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:33:00",
"Phase": 1,
"Value": "28,4149",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:34:00",
"Phase": 1,
"Value": "29,0255",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:35:00",
"Phase": 1,
"Value": "33,9662",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:36:00",
"Phase": 1,
"Value": "29,6081",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:37:00",
"Phase": 1,
"Value": "29,9584",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:38:00",
"Phase": 1,
"Value": "28,7392",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:39:00",
"Phase": 1,
"Value": "27,8221",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:40:00",
"Phase": 1,
"Value": "29,2357",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:41:00",
"Phase": 1,
"Value": "27,4006",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:42:00",
"Phase": 1,
"Value": "26,4647",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:43:00",
"Phase": 1,
"Value": "30,2373",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:44:00",
"Phase": 1,
"Value": "31,9687",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:45:00",
"Phase": 1,
"Value": "28,9072",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:46:00",
"Phase": 1,
"Value": "29,0827",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:47:00",
"Phase": 1,
"Value": "28,573",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:48:00",
"Phase": 1,
"Value": "30,9151",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:49:00",
"Phase": 1,
"Value": "29,539",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:50:00",
"Phase": 1,
"Value": "31,3779",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:51:00",
"Phase": 1,
"Value": "31,5894",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:52:00",
"Phase": 1,
"Value": "27,3518",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:53:00",
"Phase": 1,
"Value": "31,5366",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:54:00",
"Phase": 1,
"Value": "31,0364",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:55:00",
"Phase": 1,
"Value": "32,401",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:56:00",
"Phase": 1,
"Value": "29,908",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:57:00",
"Phase": 1,
"Value": "31,4514",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:58:00",
"Phase": 1,
"Value": "28,7215",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 18:59:00",
"Phase": 1,
"Value": "31,6936",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:00:00",
"Phase": 1,
"Value": "29,5282",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:01:00",
"Phase": 1,
"Value": "33,0191",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:02:00",
"Phase": 1,
"Value": "31,624",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:03:00",
"Phase": 1,
"Value": "29,9526",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:04:00",
"Phase": 1,
"Value": "29,0336",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:05:00",
"Phase": 1,
"Value": "28,0932",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:06:00",
"Phase": 1,
"Value": "29,5069",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:07:00",
"Phase": 1,
"Value": "29,0074",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:08:00",
"Phase": 1,
"Value": "28,1454",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:09:00",
"Phase": 1,
"Value": "29,6523",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:10:00",
"Phase": 1,
"Value": "30,8763",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:11:00",
"Phase": 1,
"Value": "29,0254",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:12:00",
"Phase": 1,
"Value": "28,0132",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:13:00",
"Phase": 1,
"Value": "31,0889",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:14:00",
"Phase": 1,
"Value": "32,9829",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:15:00",
"Phase": 1,
"Value": "32,1323",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:16:00",
"Phase": 1,
"Value": "33,0677",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:17:00",
"Phase": 1,
"Value": "28,8626",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:18:00",
"Phase": 1,
"Value": "31,4256",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:19:00",
"Phase": 1,
"Value": "30,115",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:20:00",
"Phase": 1,
"Value": "27,5282",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:21:00",
"Phase": 1,
"Value": "32,2304",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:22:00",
"Phase": 1,
"Value": "31,39",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:23:00",
"Phase": 1,
"Value": "24,3443",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:24:00",
"Phase": 1,
"Value": "30,8725",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:25:00",
"Phase": 1,
"Value": "32,6288",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:26:00",
"Phase": 1,
"Value": "32,3081",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:27:00",
"Phase": 1,
"Value": "33,0552",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:28:00",
"Phase": 1,
"Value": "28,9839",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:29:00",
"Phase": 1,
"Value": "28,543",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:30:00",
"Phase": 1,
"Value": "29,811",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:31:00",
"Phase": 1,
"Value": "32,3547",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:32:00",
"Phase": 1,
"Value": "28,5202",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:33:00",
"Phase": 1,
"Value": "29,1069",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:34:00",
"Phase": 1,
"Value": "31,6087",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:35:00",
"Phase": 1,
"Value": "31,2097",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:36:00",
"Phase": 1,
"Value": "29,5626",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:37:00",
"Phase": 1,
"Value": "31,5139",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:38:00",
"Phase": 1,
"Value": "25,5521",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:39:00",
"Phase": 1,
"Value": "30,7435",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:40:00",
"Phase": 1,
"Value": "28,318",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:41:00",
"Phase": 1,
"Value": "28,5218",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:42:00",
"Phase": 1,
"Value": "30,065",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:43:00",
"Phase": 1,
"Value": "29,5504",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:44:00",
"Phase": 1,
"Value": "27,5631",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:45:00",
"Phase": 1,
"Value": "30,5801",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:46:00",
"Phase": 1,
"Value": "31,897",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:47:00",
"Phase": 1,
"Value": "29,9167",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:48:00",
"Phase": 1,
"Value": "29,0873",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:49:00",
"Phase": 1,
"Value": "25,8813",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:50:00",
"Phase": 1,
"Value": "32,0191",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:51:00",
"Phase": 1,
"Value": "32,8625",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:52:00",
"Phase": 1,
"Value": "29,8823",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:53:00",
"Phase": 1,
"Value": "30,3939",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:54:00",
"Phase": 1,
"Value": "30,3415",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:55:00",
"Phase": 1,
"Value": "29,5871",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:56:00",
"Phase": 1,
"Value": "31,1537",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:57:00",
"Phase": 1,
"Value": "28,4012",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:58:00",
"Phase": 1,
"Value": "33,6056",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 19:59:00",
"Phase": 1,
"Value": "34,5064",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:00:00",
"Phase": 1,
"Value": "29,5831",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:01:00",
"Phase": 1,
"Value": "27,8152",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:02:00",
"Phase": 1,
"Value": "30,2896",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:03:00",
"Phase": 1,
"Value": "29,9949",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:04:00",
"Phase": 1,
"Value": "31,8002",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:05:00",
"Phase": 1,
"Value": "33,2212",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:06:00",
"Phase": 1,
"Value": "29,564",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:07:00",
"Phase": 1,
"Value": "29,904",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:08:00",
"Phase": 1,
"Value": "31,2668",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:09:00",
"Phase": 1,
"Value": "31,4223",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:10:00",
"Phase": 1,
"Value": "29,6472",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:11:00",
"Phase": 1,
"Value": "31,3025",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:12:00",
"Phase": 1,
"Value": "32,5371",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:13:00",
"Phase": 1,
"Value": "28,7962",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:14:00",
"Phase": 1,
"Value": "30,1935",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:15:00",
"Phase": 1,
"Value": "31,94",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:16:00",
"Phase": 1,
"Value": "28,9805",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:17:00",
"Phase": 1,
"Value": "30,3866",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:18:00",
"Phase": 1,
"Value": "27,8193",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:19:00",
"Phase": 1,
"Value": "27,5033",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:20:00",
"Phase": 1,
"Value": "26,1078",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:21:00",
"Phase": 1,
"Value": "30,6432",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:22:00",
"Phase": 1,
"Value": "27,2873",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:23:00",
"Phase": 1,
"Value": "28,1207",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:24:00",
"Phase": 1,
"Value": "29,1005",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:25:00",
"Phase": 1,
"Value": "30,0389",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:26:00",
"Phase": 1,
"Value": "33,3076",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:27:00",
"Phase": 1,
"Value": "29,0193",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:28:00",
"Phase": 1,
"Value": "31,2289",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:29:00",
"Phase": 1,
"Value": "29,9348",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:30:00",
"Phase": 1,
"Value": "30,5433",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:31:00",
"Phase": 1,
"Value": "28,3328",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:32:00",
"Phase": 1,
"Value": "29,8947",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:33:00",
"Phase": 1,
"Value": "31,695",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:34:00",
"Phase": 1,
"Value": "35,1178",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:35:00",
"Phase": 1,
"Value": "31,9418",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:36:00",
"Phase": 1,
"Value": "31,0889",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:37:00",
"Phase": 1,
"Value": "29,9927",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:38:00",
"Phase": 1,
"Value": "30,751",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:39:00",
"Phase": 1,
"Value": "28,7908",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:40:00",
"Phase": 1,
"Value": "30,7337",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:41:00",
"Phase": 1,
"Value": "30,7467",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:42:00",
"Phase": 1,
"Value": "28,7822",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:43:00",
"Phase": 1,
"Value": "29,9837",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:44:00",
"Phase": 1,
"Value": "29,3831",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:45:00",
"Phase": 1,
"Value": "29,3872",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:46:00",
"Phase": 1,
"Value": "30,7381",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:47:00",
"Phase": 1,
"Value": "29,2621",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:48:00",
"Phase": 1,
"Value": "30,267",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:49:00",
"Phase": 1,
"Value": "32,3312",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:50:00",
"Phase": 1,
"Value": "30,7503",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:51:00",
"Phase": 1,
"Value": "29,9044",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:52:00",
"Phase": 1,
"Value": "33,7698",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:53:00",
"Phase": 1,
"Value": "32,5545",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:54:00",
"Phase": 1,
"Value": "28,9176",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:55:00",
"Phase": 1,
"Value": "31,9649",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:56:00",
"Phase": 1,
"Value": "32,2717",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:57:00",
"Phase": 1,
"Value": "28,5261",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:58:00",
"Phase": 1,
"Value": "32,8842",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 20:59:00",
"Phase": 1,
"Value": "30,7744",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:00:00",
"Phase": 1,
"Value": "27,9716",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:01:00",
"Phase": 1,
"Value": "29,5124",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:02:00",
"Phase": 1,
"Value": "30,945",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:03:00",
"Phase": 1,
"Value": "27,4183",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:04:00",
"Phase": 1,
"Value": "34,1411",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:05:00",
"Phase": 1,
"Value": "32,8224",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:06:00",
"Phase": 1,
"Value": "31,1762",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:07:00",
"Phase": 1,
"Value": "28,0041",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:08:00",
"Phase": 1,
"Value": "30,0516",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:09:00",
"Phase": 1,
"Value": "30,6142",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:10:00",
"Phase": 1,
"Value": "34,2467",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:11:00",
"Phase": 1,
"Value": "35,1317",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:12:00",
"Phase": 1,
"Value": "31,8453",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:13:00",
"Phase": 1,
"Value": "27,6772",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:14:00",
"Phase": 1,
"Value": "29,9713",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:15:00",
"Phase": 1,
"Value": "28,6867",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:16:00",
"Phase": 1,
"Value": "30,7301",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:17:00",
"Phase": 1,
"Value": "30,4116",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:18:00",
"Phase": 1,
"Value": "29,7846",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:19:00",
"Phase": 1,
"Value": "27,9962",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:20:00",
"Phase": 1,
"Value": "26,7005",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:21:00",
"Phase": 1,
"Value": "32,9726",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:22:00",
"Phase": 1,
"Value": "32,4713",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:23:00",
"Phase": 1,
"Value": "30,8319",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:24:00",
"Phase": 1,
"Value": "28,088",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:25:00",
"Phase": 1,
"Value": "31,3553",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:26:00",
"Phase": 1,
"Value": "28,5253",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:27:00",
"Phase": 1,
"Value": "29,5811",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:28:00",
"Phase": 1,
"Value": "29,0005",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:29:00",
"Phase": 1,
"Value": "27,3161",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:30:00",
"Phase": 1,
"Value": "26,8078",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:31:00",
"Phase": 1,
"Value": "27,5708",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:32:00",
"Phase": 1,
"Value": "31,328",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:33:00",
"Phase": 1,
"Value": "30,7181",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:34:00",
"Phase": 1,
"Value": "32,0782",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:35:00",
"Phase": 1,
"Value": "31,8173",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:36:00",
"Phase": 1,
"Value": "31,7192",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:37:00",
"Phase": 1,
"Value": "32,631",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:38:00",
"Phase": 1,
"Value": "29,0983",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:39:00",
"Phase": 1,
"Value": "29,4446",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:40:00",
"Phase": 1,
"Value": "29,327",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:41:00",
"Phase": 1,
"Value": "26,1493",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:42:00",
"Phase": 1,
"Value": "30,2232",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:43:00",
"Phase": 1,
"Value": "32,3433",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:44:00",
"Phase": 1,
"Value": "29,2361",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:45:00",
"Phase": 1,
"Value": "30,1394",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:46:00",
"Phase": 1,
"Value": "30,881",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:47:00",
"Phase": 1,
"Value": "27,1126",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:48:00",
"Phase": 1,
"Value": "31,8726",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:49:00",
"Phase": 1,
"Value": "32,9213",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:50:00",
"Phase": 1,
"Value": "30,9461",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:51:00",
"Phase": 1,
"Value": "28,197",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:52:00",
"Phase": 1,
"Value": "26,2372",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:53:00",
"Phase": 1,
"Value": "30,6527",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:54:00",
"Phase": 1,
"Value": "29,3848",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:55:00",
"Phase": 1,
"Value": "30,8451",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:56:00",
"Phase": 1,
"Value": "30,2523",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:57:00",
"Phase": 1,
"Value": "32,6978",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:58:00",
"Phase": 1,
"Value": "32,798",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 21:59:00",
"Phase": 1,
"Value": "28,2038",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:00:00",
"Phase": 1,
"Value": "29,7066",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:01:00",
"Phase": 1,
"Value": "33,9691",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:02:00",
"Phase": 1,
"Value": "33,3704",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:03:00",
"Phase": 1,
"Value": "4,68984",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:04:00",
"Phase": 1,
"Value": "3,4933",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:05:00",
"Phase": 1,
"Value": "3,90032",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:06:00",
"Phase": 1,
"Value": "3,97259",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:07:00",
"Phase": 1,
"Value": "3,90378",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:08:00",
"Phase": 1,
"Value": "3,20785",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:09:00",
"Phase": 1,
"Value": "3,58592",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:10:00",
"Phase": 1,
"Value": "3,41027",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:11:00",
"Phase": 1,
"Value": "9,22502",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:12:00",
"Phase": 1,
"Value": "17,8959",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:13:00",
"Phase": 1,
"Value": "35,3729",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:14:00",
"Phase": 1,
"Value": "29,6163",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:15:00",
"Phase": 1,
"Value": "31,5131",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:16:00",
"Phase": 1,
"Value": "30,253",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:17:00",
"Phase": 1,
"Value": "31,5456",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:18:00",
"Phase": 1,
"Value": "30,1439",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:19:00",
"Phase": 1,
"Value": "31,1785",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:20:00",
"Phase": 1,
"Value": "30,8444",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:21:00",
"Phase": 1,
"Value": "31,4582",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:22:00",
"Phase": 1,
"Value": "33,7426",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:23:00",
"Phase": 1,
"Value": "29,8346",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:24:00",
"Phase": 1,
"Value": "32,5949",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:25:00",
"Phase": 1,
"Value": "33,3765",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:26:00",
"Phase": 1,
"Value": "26,7418",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:27:00",
"Phase": 1,
"Value": "30,8183",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:28:00",
"Phase": 1,
"Value": "33,3868",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:29:00",
"Phase": 1,
"Value": "27,2789",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:30:00",
"Phase": 1,
"Value": "30,1204",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:31:00",
"Phase": 1,
"Value": "31,0321",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:32:00",
"Phase": 1,
"Value": "29,6325",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:33:00",
"Phase": 1,
"Value": "3,99074",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:34:00",
"Phase": 1,
"Value": "4,07284",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:35:00",
"Phase": 1,
"Value": "3,93225",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:36:00",
"Phase": 1,
"Value": "3,83629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:37:00",
"Phase": 1,
"Value": "3,48636",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:38:00",
"Phase": 1,
"Value": "3,73216",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:39:00",
"Phase": 1,
"Value": "5,01824",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:40:00",
"Phase": 1,
"Value": "8,77323",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:41:00",
"Phase": 1,
"Value": "4,07771",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:42:00",
"Phase": 1,
"Value": "6,67355",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:43:00",
"Phase": 1,
"Value": "4,19581",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:44:00",
"Phase": 1,
"Value": "3,5617",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:45:00",
"Phase": 1,
"Value": "3,39885",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:46:00",
"Phase": 1,
"Value": "3,3",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:47:00",
"Phase": 1,
"Value": "6,88607",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:48:00",
"Phase": 1,
"Value": "3,72121",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:49:00",
"Phase": 1,
"Value": "3,893",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:50:00",
"Phase": 1,
"Value": "7,07803",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:51:00",
"Phase": 1,
"Value": "6,23138",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:52:00",
"Phase": 1,
"Value": "3,19545",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:53:00",
"Phase": 1,
"Value": "6,97088",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:54:00",
"Phase": 1,
"Value": "3,08626",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:55:00",
"Phase": 1,
"Value": "3,12451",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:56:00",
"Phase": 1,
"Value": "3,18211",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:57:00",
"Phase": 1,
"Value": "25,8945",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:58:00",
"Phase": 1,
"Value": "30,9263",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 22:59:00",
"Phase": 1,
"Value": "29,9019",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:00:00",
"Phase": 1,
"Value": "29,5733",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:01:00",
"Phase": 1,
"Value": "29,8276",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:02:00",
"Phase": 1,
"Value": "32,6982",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:03:00",
"Phase": 1,
"Value": "30,7577",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:04:00",
"Phase": 1,
"Value": "27,5538",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:05:00",
"Phase": 1,
"Value": "29,8286",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:06:00",
"Phase": 1,
"Value": "29,6697",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:07:00",
"Phase": 1,
"Value": "31,3614",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:08:00",
"Phase": 1,
"Value": "31,1755",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:09:00",
"Phase": 1,
"Value": "29,9567",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:10:00",
"Phase": 1,
"Value": "31,1141",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:11:00",
"Phase": 1,
"Value": "32,0462",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:12:00",
"Phase": 1,
"Value": "30,1323",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:13:00",
"Phase": 1,
"Value": "27,9721",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:14:00",
"Phase": 1,
"Value": "29,1526",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:15:00",
"Phase": 1,
"Value": "29,3376",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:16:00",
"Phase": 1,
"Value": "26,3542",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:17:00",
"Phase": 1,
"Value": "31,2118",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:18:00",
"Phase": 1,
"Value": "33,1656",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:19:00",
"Phase": 1,
"Value": "30,0342",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:20:00",
"Phase": 1,
"Value": "32,1444",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:21:00",
"Phase": 1,
"Value": "31,9043",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:22:00",
"Phase": 1,
"Value": "32,342",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:23:00",
"Phase": 1,
"Value": "29,9076",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:24:00",
"Phase": 1,
"Value": "30,0917",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:25:00",
"Phase": 1,
"Value": "27,8473",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:26:00",
"Phase": 1,
"Value": "31,1954",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:27:00",
"Phase": 1,
"Value": "32,2498",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:28:00",
"Phase": 1,
"Value": "32,7982",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:29:00",
"Phase": 1,
"Value": "31,191",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:30:00",
"Phase": 1,
"Value": "31,6542",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:31:00",
"Phase": 1,
"Value": "34,0335",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:32:00",
"Phase": 1,
"Value": "31,7827",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:33:00",
"Phase": 1,
"Value": "29,742",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:34:00",
"Phase": 1,
"Value": "28,9302",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:35:00",
"Phase": 1,
"Value": "32,208",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:36:00",
"Phase": 1,
"Value": "29,2201",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:37:00",
"Phase": 1,
"Value": "34,8891",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:38:00",
"Phase": 1,
"Value": "34,5694",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:39:00",
"Phase": 1,
"Value": "32,7152",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:40:00",
"Phase": 1,
"Value": "32,799",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:41:00",
"Phase": 1,
"Value": "30,8272",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:42:00",
"Phase": 1,
"Value": "30,9816",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:43:00",
"Phase": 1,
"Value": "30,5476",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:44:00",
"Phase": 1,
"Value": "27,1145",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:45:00",
"Phase": 1,
"Value": "31,3192",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:46:00",
"Phase": 1,
"Value": "32,7208",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:47:00",
"Phase": 1,
"Value": "30,7312",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:48:00",
"Phase": 1,
"Value": "31,1383",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:49:00",
"Phase": 1,
"Value": "31,4114",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:50:00",
"Phase": 1,
"Value": "32,1457",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:51:00",
"Phase": 1,
"Value": "30,5217",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:52:00",
"Phase": 1,
"Value": "31,6931",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:53:00",
"Phase": 1,
"Value": "28,7629",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:54:00",
"Phase": 1,
"Value": "30,3621",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:55:00",
"Phase": 1,
"Value": "32,8169",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:56:00",
"Phase": 1,
"Value": "27,0625",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:57:00",
"Phase": 1,
"Value": "28,2611",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:58:00",
"Phase": 1,
"Value": "30,8057",
"ConvFactor": 0.68
},
{
"Name": "M901 Druckluft Maschine",
"Time": "12.05.2020 23:59:00",
"Phase": 1,
"Value": "31,4761",
"ConvFactor": 0.68
}
]

M901DruckluftHandling =
[
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:00:00",
    "Phase": 1,
    "Value": "46,1546",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:01:00",
    "Phase": 1,
    "Value": "47,3372",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:02:00",
    "Phase": 1,
    "Value": "46,2294",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:03:00",
    "Phase": 1,
    "Value": "45,1052",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:04:00",
    "Phase": 1,
    "Value": "45,6976",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:05:00",
    "Phase": 1,
    "Value": "45,6873",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:06:00",
    "Phase": 1,
    "Value": "46,3856",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:07:00",
    "Phase": 1,
    "Value": "47,6423",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:08:00",
    "Phase": 1,
    "Value": "47,0968",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:09:00",
    "Phase": 1,
    "Value": "45,2336",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:10:00",
    "Phase": 1,
    "Value": "45,6925",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:11:00",
    "Phase": 1,
    "Value": "45,2392",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:12:00",
    "Phase": 1,
    "Value": "46,9105",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:13:00",
    "Phase": 1,
    "Value": "46,5462",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:14:00",
    "Phase": 1,
    "Value": "47,7459",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:15:00",
    "Phase": 1,
    "Value": "47,5007",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:16:00",
    "Phase": 1,
    "Value": "46,295",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:17:00",
    "Phase": 1,
    "Value": "46,5044",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:18:00",
    "Phase": 1,
    "Value": "46,0677",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:19:00",
    "Phase": 1,
    "Value": "46,604",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:20:00",
    "Phase": 1,
    "Value": "46,3987",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:21:00",
    "Phase": 1,
    "Value": "45,3541",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:22:00",
    "Phase": 1,
    "Value": "46,0233",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:23:00",
    "Phase": 1,
    "Value": "45,7223",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:24:00",
    "Phase": 1,
    "Value": "45,1546",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:25:00",
    "Phase": 1,
    "Value": "44,0898",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:26:00",
    "Phase": 1,
    "Value": "48,8122",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:27:00",
    "Phase": 1,
    "Value": "46,3305",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:28:00",
    "Phase": 1,
    "Value": "47,7869",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:29:00",
    "Phase": 1,
    "Value": "47,929",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:30:00",
    "Phase": 1,
    "Value": "44,6427",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:31:00",
    "Phase": 1,
    "Value": "45,7719",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:32:00",
    "Phase": 1,
    "Value": "45,5004",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:33:00",
    "Phase": 1,
    "Value": "47,5896",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:34:00",
    "Phase": 1,
    "Value": "47,4309",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:35:00",
    "Phase": 1,
    "Value": "45,7844",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:36:00",
    "Phase": 1,
    "Value": "47,8275",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:37:00",
    "Phase": 1,
    "Value": "45,3772",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:38:00",
    "Phase": 1,
    "Value": "45,1613",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:39:00",
    "Phase": 1,
    "Value": "46,9131",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:40:00",
    "Phase": 1,
    "Value": "46,7288",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:41:00",
    "Phase": 1,
    "Value": "49,0092",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:42:00",
    "Phase": 1,
    "Value": "47,3472",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:43:00",
    "Phase": 1,
    "Value": "48,0771",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:44:00",
    "Phase": 1,
    "Value": "48,8385",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:45:00",
    "Phase": 1,
    "Value": "46,8829",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:46:00",
    "Phase": 1,
    "Value": "46,7698",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:47:00",
    "Phase": 1,
    "Value": "47,4937",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:48:00",
    "Phase": 1,
    "Value": "48,8023",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:49:00",
    "Phase": 1,
    "Value": "46,3825",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:50:00",
    "Phase": 1,
    "Value": "47,236",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:51:00",
    "Phase": 1,
    "Value": "47,9375",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:52:00",
    "Phase": 1,
    "Value": "46,2151",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:53:00",
    "Phase": 1,
    "Value": "47,2214",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:54:00",
    "Phase": 1,
    "Value": "48,1727",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:55:00",
    "Phase": 1,
    "Value": "47,599",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:56:00",
    "Phase": 1,
    "Value": "46,5429",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:57:00",
    "Phase": 1,
    "Value": "47,5801",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:58:00",
    "Phase": 1,
    "Value": "46,3084",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 00:59:00",
    "Phase": 1,
    "Value": "47,426",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:00:00",
    "Phase": 1,
    "Value": "46,88",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:01:00",
    "Phase": 1,
    "Value": "47,5295",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:02:00",
    "Phase": 1,
    "Value": "46,222",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:03:00",
    "Phase": 1,
    "Value": "47,0297",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:04:00",
    "Phase": 1,
    "Value": "47,0079",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:05:00",
    "Phase": 1,
    "Value": "46,8222",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:06:00",
    "Phase": 1,
    "Value": "47,4574",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:07:00",
    "Phase": 1,
    "Value": "47,066",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:08:00",
    "Phase": 1,
    "Value": "46,9627",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:09:00",
    "Phase": 1,
    "Value": "16,198",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:10:00",
    "Phase": 1,
    "Value": "3,23521",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:11:00",
    "Phase": 1,
    "Value": "3,00493",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:12:00",
    "Phase": 1,
    "Value": "2,83688",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:13:00",
    "Phase": 1,
    "Value": "1,93491",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:14:00",
    "Phase": 1,
    "Value": "2,47419",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:15:00",
    "Phase": 1,
    "Value": "2,75587",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:16:00",
    "Phase": 1,
    "Value": "2,87127",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:17:00",
    "Phase": 1,
    "Value": "2,75773",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:18:00",
    "Phase": 1,
    "Value": "3,00388",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:19:00",
    "Phase": 1,
    "Value": "3,28388",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:20:00",
    "Phase": 1,
    "Value": "3,66164",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:21:00",
    "Phase": 1,
    "Value": "3,08159",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:22:00",
    "Phase": 1,
    "Value": "4,01564",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:23:00",
    "Phase": 1,
    "Value": "34,8354",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:24:00",
    "Phase": 1,
    "Value": "46,7033",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:25:00",
    "Phase": 1,
    "Value": "46,9814",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:26:00",
    "Phase": 1,
    "Value": "47,6428",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:27:00",
    "Phase": 1,
    "Value": "46,0484",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:28:00",
    "Phase": 1,
    "Value": "46,3115",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:29:00",
    "Phase": 1,
    "Value": "27,2297",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:30:00",
    "Phase": 1,
    "Value": "3,84138",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:31:00",
    "Phase": 1,
    "Value": "3,11219",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:32:00",
    "Phase": 1,
    "Value": "2,64248",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:33:00",
    "Phase": 1,
    "Value": "2,75079",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:34:00",
    "Phase": 1,
    "Value": "2,67041",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:35:00",
    "Phase": 1,
    "Value": "2,76503",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:36:00",
    "Phase": 1,
    "Value": "3,88353",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:37:00",
    "Phase": 1,
    "Value": "38,2109",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:38:00",
    "Phase": 1,
    "Value": "47,357",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:39:00",
    "Phase": 1,
    "Value": "47,5364",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:40:00",
    "Phase": 1,
    "Value": "46,5578",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:41:00",
    "Phase": 1,
    "Value": "48,1566",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:42:00",
    "Phase": 1,
    "Value": "47,0936",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:43:00",
    "Phase": 1,
    "Value": "48,1535",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:44:00",
    "Phase": 1,
    "Value": "46,7054",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:45:00",
    "Phase": 1,
    "Value": "47,8116",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:46:00",
    "Phase": 1,
    "Value": "47,0737",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:47:00",
    "Phase": 1,
    "Value": "46,3788",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:48:00",
    "Phase": 1,
    "Value": "46,1322",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:49:00",
    "Phase": 1,
    "Value": "45,9354",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:50:00",
    "Phase": 1,
    "Value": "44,5408",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:51:00",
    "Phase": 1,
    "Value": "48,3616",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:52:00",
    "Phase": 1,
    "Value": "47,0575",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:53:00",
    "Phase": 1,
    "Value": "46,208",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:54:00",
    "Phase": 1,
    "Value": "46,0357",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:55:00",
    "Phase": 1,
    "Value": "46,5128",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:56:00",
    "Phase": 1,
    "Value": "45,416",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:57:00",
    "Phase": 1,
    "Value": "45,2046",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:58:00",
    "Phase": 1,
    "Value": "45,0928",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 01:59:00",
    "Phase": 1,
    "Value": "46,8799",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:00:00",
    "Phase": 1,
    "Value": "46,0684",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:01:00",
    "Phase": 1,
    "Value": "47,717",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:02:00",
    "Phase": 1,
    "Value": "46,2979",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:03:00",
    "Phase": 1,
    "Value": "45,86",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:04:00",
    "Phase": 1,
    "Value": "45,7504",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:05:00",
    "Phase": 1,
    "Value": "44,0259",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:06:00",
    "Phase": 1,
    "Value": "46,1826",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:07:00",
    "Phase": 1,
    "Value": "45,5843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:08:00",
    "Phase": 1,
    "Value": "47,0103",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:09:00",
    "Phase": 1,
    "Value": "44,506",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:10:00",
    "Phase": 1,
    "Value": "45,8283",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:11:00",
    "Phase": 1,
    "Value": "47,7526",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:12:00",
    "Phase": 1,
    "Value": "48,5121",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:13:00",
    "Phase": 1,
    "Value": "45,8587",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:14:00",
    "Phase": 1,
    "Value": "45,4911",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:15:00",
    "Phase": 1,
    "Value": "46,729",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:16:00",
    "Phase": 1,
    "Value": "45,7806",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:17:00",
    "Phase": 1,
    "Value": "47,5491",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:18:00",
    "Phase": 1,
    "Value": "46,8279",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:19:00",
    "Phase": 1,
    "Value": "47,5054",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:20:00",
    "Phase": 1,
    "Value": "45,6544",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:21:00",
    "Phase": 1,
    "Value": "45,5662",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:22:00",
    "Phase": 1,
    "Value": "46,6138",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:23:00",
    "Phase": 1,
    "Value": "47,64",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:24:00",
    "Phase": 1,
    "Value": "48,6438",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:25:00",
    "Phase": 1,
    "Value": "47,3495",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:26:00",
    "Phase": 1,
    "Value": "45,1681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:27:00",
    "Phase": 1,
    "Value": "45,1708",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:28:00",
    "Phase": 1,
    "Value": "46,9971",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:29:00",
    "Phase": 1,
    "Value": "45,4766",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:30:00",
    "Phase": 1,
    "Value": "48,5033",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:31:00",
    "Phase": 1,
    "Value": "47,2483",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:32:00",
    "Phase": 1,
    "Value": "46,7048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:33:00",
    "Phase": 1,
    "Value": "46,7574",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:34:00",
    "Phase": 1,
    "Value": "45,6967",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:35:00",
    "Phase": 1,
    "Value": "47,3563",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:36:00",
    "Phase": 1,
    "Value": "48,4033",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:37:00",
    "Phase": 1,
    "Value": "46,5881",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:38:00",
    "Phase": 1,
    "Value": "45,1886",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:39:00",
    "Phase": 1,
    "Value": "45,3894",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:40:00",
    "Phase": 1,
    "Value": "47,1774",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:41:00",
    "Phase": 1,
    "Value": "46,4819",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:42:00",
    "Phase": 1,
    "Value": "48,2359",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:43:00",
    "Phase": 1,
    "Value": "46,2108",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:44:00",
    "Phase": 1,
    "Value": "46,3",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:45:00",
    "Phase": 1,
    "Value": "46,0569",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:46:00",
    "Phase": 1,
    "Value": "46,6325",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:47:00",
    "Phase": 1,
    "Value": "45,9948",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:48:00",
    "Phase": 1,
    "Value": "45,7088",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:49:00",
    "Phase": 1,
    "Value": "46,3798",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:50:00",
    "Phase": 1,
    "Value": "46,837",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:51:00",
    "Phase": 1,
    "Value": "6,31351",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:52:00",
    "Phase": 1,
    "Value": "2,60291",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:53:00",
    "Phase": 1,
    "Value": "6,52725",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:54:00",
    "Phase": 1,
    "Value": "2,7377",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:55:00",
    "Phase": 1,
    "Value": "3,98316",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:56:00",
    "Phase": 1,
    "Value": "38,0823",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:57:00",
    "Phase": 1,
    "Value": "48,3284",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:58:00",
    "Phase": 1,
    "Value": "46,1922",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 02:59:00",
    "Phase": 1,
    "Value": "45,8524",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:00:00",
    "Phase": 1,
    "Value": "47,9568",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:01:00",
    "Phase": 1,
    "Value": "46,9702",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:02:00",
    "Phase": 1,
    "Value": "46,6959",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:03:00",
    "Phase": 1,
    "Value": "45,2346",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:04:00",
    "Phase": 1,
    "Value": "47,3012",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:05:00",
    "Phase": 1,
    "Value": "47,2704",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:06:00",
    "Phase": 1,
    "Value": "48,3201",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:07:00",
    "Phase": 1,
    "Value": "46,7564",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:08:00",
    "Phase": 1,
    "Value": "47,4738",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:09:00",
    "Phase": 1,
    "Value": "46,4015",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:10:00",
    "Phase": 1,
    "Value": "46,7585",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:11:00",
    "Phase": 1,
    "Value": "47,8653",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:12:00",
    "Phase": 1,
    "Value": "48,6317",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:13:00",
    "Phase": 1,
    "Value": "44,6901",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:14:00",
    "Phase": 1,
    "Value": "47,1071",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:15:00",
    "Phase": 1,
    "Value": "46,5667",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:16:00",
    "Phase": 1,
    "Value": "47,6432",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:17:00",
    "Phase": 1,
    "Value": "47,0899",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:18:00",
    "Phase": 1,
    "Value": "47,5276",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:19:00",
    "Phase": 1,
    "Value": "47,498",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:20:00",
    "Phase": 1,
    "Value": "46,4681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:21:00",
    "Phase": 1,
    "Value": "48,1281",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:22:00",
    "Phase": 1,
    "Value": "46,0998",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:23:00",
    "Phase": 1,
    "Value": "46,5009",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:24:00",
    "Phase": 1,
    "Value": "45,2098",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:25:00",
    "Phase": 1,
    "Value": "47,3336",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:26:00",
    "Phase": 1,
    "Value": "47,6251",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:27:00",
    "Phase": 1,
    "Value": "47,2625",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:28:00",
    "Phase": 1,
    "Value": "46,3057",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:29:00",
    "Phase": 1,
    "Value": "47,9579",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:30:00",
    "Phase": 1,
    "Value": "46,9672",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:31:00",
    "Phase": 1,
    "Value": "47,0048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:32:00",
    "Phase": 1,
    "Value": "47,3496",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:33:00",
    "Phase": 1,
    "Value": "45,5289",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:34:00",
    "Phase": 1,
    "Value": "47,5768",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:35:00",
    "Phase": 1,
    "Value": "46,3027",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:36:00",
    "Phase": 1,
    "Value": "47,4616",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:37:00",
    "Phase": 1,
    "Value": "45,9236",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:38:00",
    "Phase": 1,
    "Value": "46,8116",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:39:00",
    "Phase": 1,
    "Value": "46,1953",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:40:00",
    "Phase": 1,
    "Value": "46,0703",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:41:00",
    "Phase": 1,
    "Value": "45,3577",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:42:00",
    "Phase": 1,
    "Value": "46,0666",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:43:00",
    "Phase": 1,
    "Value": "48,7689",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:44:00",
    "Phase": 1,
    "Value": "47,7843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:45:00",
    "Phase": 1,
    "Value": "47,7319",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:46:00",
    "Phase": 1,
    "Value": "45,2455",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:47:00",
    "Phase": 1,
    "Value": "45,4792",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:48:00",
    "Phase": 1,
    "Value": "45,3655",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:49:00",
    "Phase": 1,
    "Value": "44,6947",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:50:00",
    "Phase": 1,
    "Value": "44,9129",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:51:00",
    "Phase": 1,
    "Value": "46,3783",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:52:00",
    "Phase": 1,
    "Value": "45,6137",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:53:00",
    "Phase": 1,
    "Value": "46,4053",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:54:00",
    "Phase": 1,
    "Value": "45,8949",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:55:00",
    "Phase": 1,
    "Value": "45,6338",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:56:00",
    "Phase": 1,
    "Value": "47,7512",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:57:00",
    "Phase": 1,
    "Value": "47,5843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:58:00",
    "Phase": 1,
    "Value": "47,567",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 03:59:00",
    "Phase": 1,
    "Value": "46,9634",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:00:00",
    "Phase": 1,
    "Value": "47,1586",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:01:00",
    "Phase": 1,
    "Value": "47,925",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:02:00",
    "Phase": 1,
    "Value": "44,9055",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:03:00",
    "Phase": 1,
    "Value": "47,3669",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:04:00",
    "Phase": 1,
    "Value": "46,4273",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:05:00",
    "Phase": 1,
    "Value": "46,8667",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:06:00",
    "Phase": 1,
    "Value": "47,5133",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:07:00",
    "Phase": 1,
    "Value": "46,0029",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:08:00",
    "Phase": 1,
    "Value": "46,3842",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:09:00",
    "Phase": 1,
    "Value": "45,6595",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:10:00",
    "Phase": 1,
    "Value": "46,5053",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:11:00",
    "Phase": 1,
    "Value": "46,3045",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:12:00",
    "Phase": 1,
    "Value": "46,644",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:13:00",
    "Phase": 1,
    "Value": "48,4346",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:14:00",
    "Phase": 1,
    "Value": "47,2633",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:15:00",
    "Phase": 1,
    "Value": "45,448",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:16:00",
    "Phase": 1,
    "Value": "48,4741",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:17:00",
    "Phase": 1,
    "Value": "46,8004",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:18:00",
    "Phase": 1,
    "Value": "46,0561",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:19:00",
    "Phase": 1,
    "Value": "48,4123",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:20:00",
    "Phase": 1,
    "Value": "49,0834",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:21:00",
    "Phase": 1,
    "Value": "46,6249",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:22:00",
    "Phase": 1,
    "Value": "47,9887",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:23:00",
    "Phase": 1,
    "Value": "48,089",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:24:00",
    "Phase": 1,
    "Value": "47,616",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:25:00",
    "Phase": 1,
    "Value": "47,9262",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:26:00",
    "Phase": 1,
    "Value": "47,2896",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:27:00",
    "Phase": 1,
    "Value": "46,6229",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:28:00",
    "Phase": 1,
    "Value": "48,1304",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:29:00",
    "Phase": 1,
    "Value": "47,6524",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:30:00",
    "Phase": 1,
    "Value": "46,8265",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:31:00",
    "Phase": 1,
    "Value": "46,013",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:32:00",
    "Phase": 1,
    "Value": "47,0831",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:33:00",
    "Phase": 1,
    "Value": "46,0418",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:34:00",
    "Phase": 1,
    "Value": "46,7446",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:35:00",
    "Phase": 1,
    "Value": "45,0832",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:36:00",
    "Phase": 1,
    "Value": "39,7649",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:37:00",
    "Phase": 1,
    "Value": "2,71763",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:38:00",
    "Phase": 1,
    "Value": "4,09561",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:39:00",
    "Phase": 1,
    "Value": "3,11989",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:40:00",
    "Phase": 1,
    "Value": "2,61121",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:41:00",
    "Phase": 1,
    "Value": "2,18536",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:42:00",
    "Phase": 1,
    "Value": "3,94239",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:43:00",
    "Phase": 1,
    "Value": "5,50916",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:44:00",
    "Phase": 1,
    "Value": "31,9661",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:45:00",
    "Phase": 1,
    "Value": "46,9246",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:46:00",
    "Phase": 1,
    "Value": "45,4961",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:47:00",
    "Phase": 1,
    "Value": "45,0263",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:48:00",
    "Phase": 1,
    "Value": "44,7648",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:49:00",
    "Phase": 1,
    "Value": "44,8194",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:50:00",
    "Phase": 1,
    "Value": "45,8763",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:51:00",
    "Phase": 1,
    "Value": "47,0409",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:52:00",
    "Phase": 1,
    "Value": "47,6031",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:53:00",
    "Phase": 1,
    "Value": "45,239",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:54:00",
    "Phase": 1,
    "Value": "45,6114",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:55:00",
    "Phase": 1,
    "Value": "46,5388",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:56:00",
    "Phase": 1,
    "Value": "47,0116",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:57:00",
    "Phase": 1,
    "Value": "46,1506",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:58:00",
    "Phase": 1,
    "Value": "45,3179",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 04:59:00",
    "Phase": 1,
    "Value": "46,3094",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:00:00",
    "Phase": 1,
    "Value": "47,632",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:01:00",
    "Phase": 1,
    "Value": "46,6088",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:02:00",
    "Phase": 1,
    "Value": "47,6305",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:03:00",
    "Phase": 1,
    "Value": "47,357",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:04:00",
    "Phase": 1,
    "Value": "45,8866",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:05:00",
    "Phase": 1,
    "Value": "47,1827",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:06:00",
    "Phase": 1,
    "Value": "46,6735",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:07:00",
    "Phase": 1,
    "Value": "45,4993",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:08:00",
    "Phase": 1,
    "Value": "46,3241",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:09:00",
    "Phase": 1,
    "Value": "45,0021",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:10:00",
    "Phase": 1,
    "Value": "47,3905",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:11:00",
    "Phase": 1,
    "Value": "46,8055",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:12:00",
    "Phase": 1,
    "Value": "46,0276",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:13:00",
    "Phase": 1,
    "Value": "44,4582",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:14:00",
    "Phase": 1,
    "Value": "45,6238",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:15:00",
    "Phase": 1,
    "Value": "45,8169",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:16:00",
    "Phase": 1,
    "Value": "46,4894",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:17:00",
    "Phase": 1,
    "Value": "46,9035",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:18:00",
    "Phase": 1,
    "Value": "46,173",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:19:00",
    "Phase": 1,
    "Value": "46,8311",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:20:00",
    "Phase": 1,
    "Value": "44,8066",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:21:00",
    "Phase": 1,
    "Value": "45,2595",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:22:00",
    "Phase": 1,
    "Value": "46,1027",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:23:00",
    "Phase": 1,
    "Value": "47,0948",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:24:00",
    "Phase": 1,
    "Value": "46,0101",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:25:00",
    "Phase": 1,
    "Value": "44,93",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:26:00",
    "Phase": 1,
    "Value": "45,6486",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:27:00",
    "Phase": 1,
    "Value": "46,2111",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:28:00",
    "Phase": 1,
    "Value": "47,6467",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:29:00",
    "Phase": 1,
    "Value": "46,2521",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:30:00",
    "Phase": 1,
    "Value": "46,7418",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:31:00",
    "Phase": 1,
    "Value": "46,5376",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:32:00",
    "Phase": 1,
    "Value": "44,6562",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:33:00",
    "Phase": 1,
    "Value": "46,1848",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:34:00",
    "Phase": 1,
    "Value": "45,9275",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:35:00",
    "Phase": 1,
    "Value": "46,4769",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:36:00",
    "Phase": 1,
    "Value": "45,8749",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:37:00",
    "Phase": 1,
    "Value": "47,2361",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:38:00",
    "Phase": 1,
    "Value": "47,4877",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:39:00",
    "Phase": 1,
    "Value": "46,9794",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:40:00",
    "Phase": 1,
    "Value": "48,5476",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:41:00",
    "Phase": 1,
    "Value": "46,0632",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:42:00",
    "Phase": 1,
    "Value": "45,7556",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:43:00",
    "Phase": 1,
    "Value": "46,4964",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:44:00",
    "Phase": 1,
    "Value": "45,0193",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:45:00",
    "Phase": 1,
    "Value": "46,1274",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:46:00",
    "Phase": 1,
    "Value": "45,9918",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:47:00",
    "Phase": 1,
    "Value": "46,8675",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:48:00",
    "Phase": 1,
    "Value": "47,1895",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:49:00",
    "Phase": 1,
    "Value": "45,1947",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:50:00",
    "Phase": 1,
    "Value": "44,9043",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:51:00",
    "Phase": 1,
    "Value": "44,5859",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:52:00",
    "Phase": 1,
    "Value": "46,3061",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:53:00",
    "Phase": 1,
    "Value": "46,8585",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:54:00",
    "Phase": 1,
    "Value": "44,3614",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:55:00",
    "Phase": 1,
    "Value": "46,9848",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:56:00",
    "Phase": 1,
    "Value": "43,9507",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:57:00",
    "Phase": 1,
    "Value": "44,492",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:58:00",
    "Phase": 1,
    "Value": "45,5213",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 05:59:00",
    "Phase": 1,
    "Value": "45,6086",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:00:00",
    "Phase": 1,
    "Value": "47,1332",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:01:00",
    "Phase": 1,
    "Value": "47,0732",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:02:00",
    "Phase": 1,
    "Value": "46,3253",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:03:00",
    "Phase": 1,
    "Value": "46,4339",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:04:00",
    "Phase": 1,
    "Value": "45,802",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:05:00",
    "Phase": 1,
    "Value": "46,3943",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:06:00",
    "Phase": 1,
    "Value": "45,3756",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:07:00",
    "Phase": 1,
    "Value": "45,1671",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:08:00",
    "Phase": 1,
    "Value": "45,3402",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:09:00",
    "Phase": 1,
    "Value": "44,8683",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:10:00",
    "Phase": 1,
    "Value": "45,1093",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:11:00",
    "Phase": 1,
    "Value": "44,1723",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:12:00",
    "Phase": 1,
    "Value": "46,2705",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:13:00",
    "Phase": 1,
    "Value": "45,4031",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:14:00",
    "Phase": 1,
    "Value": "45,7988",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:15:00",
    "Phase": 1,
    "Value": "46,0666",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:16:00",
    "Phase": 1,
    "Value": "47,3618",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:17:00",
    "Phase": 1,
    "Value": "46,2216",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:18:00",
    "Phase": 1,
    "Value": "47,029",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:19:00",
    "Phase": 1,
    "Value": "45,1502",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:20:00",
    "Phase": 1,
    "Value": "45,167",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:21:00",
    "Phase": 1,
    "Value": "46,8296",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:22:00",
    "Phase": 1,
    "Value": "47,8648",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:23:00",
    "Phase": 1,
    "Value": "47,0153",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:24:00",
    "Phase": 1,
    "Value": "44,7198",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:25:00",
    "Phase": 1,
    "Value": "46,7416",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:26:00",
    "Phase": 1,
    "Value": "46,1823",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:27:00",
    "Phase": 1,
    "Value": "47,3185",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:28:00",
    "Phase": 1,
    "Value": "14,3932",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:29:00",
    "Phase": 1,
    "Value": "2,85274",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:30:00",
    "Phase": 1,
    "Value": "2,75401",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:31:00",
    "Phase": 1,
    "Value": "2,46468",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:32:00",
    "Phase": 1,
    "Value": "2,40774",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:33:00",
    "Phase": 1,
    "Value": "1,93252",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:34:00",
    "Phase": 1,
    "Value": "1,75731",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:35:00",
    "Phase": 1,
    "Value": "8,29938",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:36:00",
    "Phase": 1,
    "Value": "19,0179",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:37:00",
    "Phase": 1,
    "Value": "48,1955",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:38:00",
    "Phase": 1,
    "Value": "46,9348",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:39:00",
    "Phase": 1,
    "Value": "46,4607",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:40:00",
    "Phase": 1,
    "Value": "45,5672",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:41:00",
    "Phase": 1,
    "Value": "46,717",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:42:00",
    "Phase": 1,
    "Value": "46,7331",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:43:00",
    "Phase": 1,
    "Value": "45,925",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:44:00",
    "Phase": 1,
    "Value": "45,9522",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:45:00",
    "Phase": 1,
    "Value": "45,7961",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:46:00",
    "Phase": 1,
    "Value": "47,1456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:47:00",
    "Phase": 1,
    "Value": "47,554",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:48:00",
    "Phase": 1,
    "Value": "46,0797",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:49:00",
    "Phase": 1,
    "Value": "47,6903",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:50:00",
    "Phase": 1,
    "Value": "46,991",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:51:00",
    "Phase": 1,
    "Value": "46,3123",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:52:00",
    "Phase": 1,
    "Value": "45,3425",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:53:00",
    "Phase": 1,
    "Value": "46,6843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:54:00",
    "Phase": 1,
    "Value": "44,9278",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:55:00",
    "Phase": 1,
    "Value": "45,6999",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:56:00",
    "Phase": 1,
    "Value": "45,7301",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:57:00",
    "Phase": 1,
    "Value": "44,9372",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:58:00",
    "Phase": 1,
    "Value": "46,0979",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 06:59:00",
    "Phase": 1,
    "Value": "47,5697",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:00:00",
    "Phase": 1,
    "Value": "48,6043",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:01:00",
    "Phase": 1,
    "Value": "47,0776",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:02:00",
    "Phase": 1,
    "Value": "45,1627",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:03:00",
    "Phase": 1,
    "Value": "47,1818",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:04:00",
    "Phase": 1,
    "Value": "46,1813",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:05:00",
    "Phase": 1,
    "Value": "47,3042",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:06:00",
    "Phase": 1,
    "Value": "46,6232",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:07:00",
    "Phase": 1,
    "Value": "47,0197",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:08:00",
    "Phase": 1,
    "Value": "47,9059",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:09:00",
    "Phase": 1,
    "Value": "45,5088",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:10:00",
    "Phase": 1,
    "Value": "46,953",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:11:00",
    "Phase": 1,
    "Value": "46,2314",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:12:00",
    "Phase": 1,
    "Value": "47,1855",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:13:00",
    "Phase": 1,
    "Value": "46,4713",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:14:00",
    "Phase": 1,
    "Value": "47,7683",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:15:00",
    "Phase": 1,
    "Value": "46,4949",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:16:00",
    "Phase": 1,
    "Value": "45,6996",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:17:00",
    "Phase": 1,
    "Value": "48,0432",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:18:00",
    "Phase": 1,
    "Value": "46,9452",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:19:00",
    "Phase": 1,
    "Value": "45,8502",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:20:00",
    "Phase": 1,
    "Value": "47,2975",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:21:00",
    "Phase": 1,
    "Value": "46,0882",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:22:00",
    "Phase": 1,
    "Value": "46,6582",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:23:00",
    "Phase": 1,
    "Value": "46,2068",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:24:00",
    "Phase": 1,
    "Value": "45,5198",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:25:00",
    "Phase": 1,
    "Value": "46,133",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:26:00",
    "Phase": 1,
    "Value": "46,6823",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:27:00",
    "Phase": 1,
    "Value": "46,4413",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:28:00",
    "Phase": 1,
    "Value": "42,752",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:29:00",
    "Phase": 1,
    "Value": "47,2084",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:30:00",
    "Phase": 1,
    "Value": "47,772",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:31:00",
    "Phase": 1,
    "Value": "47,7415",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:32:00",
    "Phase": 1,
    "Value": "45,1022",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:33:00",
    "Phase": 1,
    "Value": "46,2312",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:34:00",
    "Phase": 1,
    "Value": "45,1884",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:35:00",
    "Phase": 1,
    "Value": "47,1879",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:36:00",
    "Phase": 1,
    "Value": "46,0374",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:37:00",
    "Phase": 1,
    "Value": "45,4932",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:38:00",
    "Phase": 1,
    "Value": "45,8034",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:39:00",
    "Phase": 1,
    "Value": "46,156",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:40:00",
    "Phase": 1,
    "Value": "44,9962",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:41:00",
    "Phase": 1,
    "Value": "45,9428",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:42:00",
    "Phase": 1,
    "Value": "47,3653",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:43:00",
    "Phase": 1,
    "Value": "46,6462",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:44:00",
    "Phase": 1,
    "Value": "46,1175",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:45:00",
    "Phase": 1,
    "Value": "46,4433",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:46:00",
    "Phase": 1,
    "Value": "46,5581",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:47:00",
    "Phase": 1,
    "Value": "45,6162",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:48:00",
    "Phase": 1,
    "Value": "45,5286",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:49:00",
    "Phase": 1,
    "Value": "45,1946",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:50:00",
    "Phase": 1,
    "Value": "47,9922",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:51:00",
    "Phase": 1,
    "Value": "47,1453",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:52:00",
    "Phase": 1,
    "Value": "46,2036",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:53:00",
    "Phase": 1,
    "Value": "45,4276",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:54:00",
    "Phase": 1,
    "Value": "46,2475",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:55:00",
    "Phase": 1,
    "Value": "47,1871",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:56:00",
    "Phase": 1,
    "Value": "47,8289",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:57:00",
    "Phase": 1,
    "Value": "45,8491",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:58:00",
    "Phase": 1,
    "Value": "46,1775",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 07:59:00",
    "Phase": 1,
    "Value": "46,0843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:00:00",
    "Phase": 1,
    "Value": "46,9773",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:01:00",
    "Phase": 1,
    "Value": "45,9456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:02:00",
    "Phase": 1,
    "Value": "46,2924",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:03:00",
    "Phase": 1,
    "Value": "44,8316",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:04:00",
    "Phase": 1,
    "Value": "45,8404",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:05:00",
    "Phase": 1,
    "Value": "44,9618",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:06:00",
    "Phase": 1,
    "Value": "44,7007",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:07:00",
    "Phase": 1,
    "Value": "45,495",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:08:00",
    "Phase": 1,
    "Value": "46,5028",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:09:00",
    "Phase": 1,
    "Value": "47,0678",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:10:00",
    "Phase": 1,
    "Value": "46,1327",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:11:00",
    "Phase": 1,
    "Value": "45,4412",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:12:00",
    "Phase": 1,
    "Value": "46,8995",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:13:00",
    "Phase": 1,
    "Value": "47,7442",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:14:00",
    "Phase": 1,
    "Value": "46,7369",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:15:00",
    "Phase": 1,
    "Value": "48,2032",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:16:00",
    "Phase": 1,
    "Value": "45,5568",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:17:00",
    "Phase": 1,
    "Value": "46,8231",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:18:00",
    "Phase": 1,
    "Value": "47,7377",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:19:00",
    "Phase": 1,
    "Value": "47,9838",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:20:00",
    "Phase": 1,
    "Value": "46,3373",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:21:00",
    "Phase": 1,
    "Value": "45,6767",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:22:00",
    "Phase": 1,
    "Value": "45,5971",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:23:00",
    "Phase": 1,
    "Value": "46,253",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:24:00",
    "Phase": 1,
    "Value": "45,7256",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:25:00",
    "Phase": 1,
    "Value": "47,9305",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:26:00",
    "Phase": 1,
    "Value": "48,0014",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:27:00",
    "Phase": 1,
    "Value": "47,0859",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:28:00",
    "Phase": 1,
    "Value": "45,8392",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:29:00",
    "Phase": 1,
    "Value": "46,1292",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:30:00",
    "Phase": 1,
    "Value": "46,8145",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:31:00",
    "Phase": 1,
    "Value": "16,793",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:32:00",
    "Phase": 1,
    "Value": "3,53939",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:33:00",
    "Phase": 1,
    "Value": "2,83043",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:34:00",
    "Phase": 1,
    "Value": "2,97966",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:35:00",
    "Phase": 1,
    "Value": "13,6898",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:36:00",
    "Phase": 1,
    "Value": "44,6871",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:37:00",
    "Phase": 1,
    "Value": "47,6764",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:38:00",
    "Phase": 1,
    "Value": "48,9281",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:39:00",
    "Phase": 1,
    "Value": "47,61",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:40:00",
    "Phase": 1,
    "Value": "47,658",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:41:00",
    "Phase": 1,
    "Value": "44,9364",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:42:00",
    "Phase": 1,
    "Value": "45,919",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:43:00",
    "Phase": 1,
    "Value": "47,5293",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:44:00",
    "Phase": 1,
    "Value": "47,0472",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:45:00",
    "Phase": 1,
    "Value": "47,2044",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:46:00",
    "Phase": 1,
    "Value": "47,6127",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:47:00",
    "Phase": 1,
    "Value": "46,4683",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:48:00",
    "Phase": 1,
    "Value": "46,6714",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:49:00",
    "Phase": 1,
    "Value": "46,2764",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:50:00",
    "Phase": 1,
    "Value": "44,8878",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:51:00",
    "Phase": 1,
    "Value": "46,7192",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:52:00",
    "Phase": 1,
    "Value": "48,4258",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:53:00",
    "Phase": 1,
    "Value": "45,5329",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:54:00",
    "Phase": 1,
    "Value": "45,9099",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:55:00",
    "Phase": 1,
    "Value": "45,8207",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:56:00",
    "Phase": 1,
    "Value": "47,9209",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:57:00",
    "Phase": 1,
    "Value": "46,8287",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:58:00",
    "Phase": 1,
    "Value": "47,3011",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 08:59:00",
    "Phase": 1,
    "Value": "47,515",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:00:00",
    "Phase": 1,
    "Value": "46,9457",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:01:00",
    "Phase": 1,
    "Value": "47,8767",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:02:00",
    "Phase": 1,
    "Value": "47,2055",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:03:00",
    "Phase": 1,
    "Value": "46,1466",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:04:00",
    "Phase": 1,
    "Value": "48,7805",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:05:00",
    "Phase": 1,
    "Value": "45,5874",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:06:00",
    "Phase": 1,
    "Value": "46,3495",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:07:00",
    "Phase": 1,
    "Value": "45,9048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:08:00",
    "Phase": 1,
    "Value": "47,2856",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:09:00",
    "Phase": 1,
    "Value": "46,7753",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:10:00",
    "Phase": 1,
    "Value": "46,9438",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:11:00",
    "Phase": 1,
    "Value": "46,4523",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:12:00",
    "Phase": 1,
    "Value": "46,0742",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:13:00",
    "Phase": 1,
    "Value": "44,9696",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:14:00",
    "Phase": 1,
    "Value": "46,5025",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:15:00",
    "Phase": 1,
    "Value": "47,1806",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:16:00",
    "Phase": 1,
    "Value": "46,5159",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:17:00",
    "Phase": 1,
    "Value": "45,7813",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:18:00",
    "Phase": 1,
    "Value": "45,9162",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:19:00",
    "Phase": 1,
    "Value": "46,3458",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:20:00",
    "Phase": 1,
    "Value": "45,2051",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:21:00",
    "Phase": 1,
    "Value": "45,5241",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:22:00",
    "Phase": 1,
    "Value": "45,4707",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:23:00",
    "Phase": 1,
    "Value": "45,5028",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:24:00",
    "Phase": 1,
    "Value": "45,2456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:25:00",
    "Phase": 1,
    "Value": "46,8022",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:26:00",
    "Phase": 1,
    "Value": "45,7497",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:27:00",
    "Phase": 1,
    "Value": "45,9057",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:28:00",
    "Phase": 1,
    "Value": "45,6286",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:29:00",
    "Phase": 1,
    "Value": "45,6162",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:30:00",
    "Phase": 1,
    "Value": "46,2571",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:31:00",
    "Phase": 1,
    "Value": "43,3685",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:32:00",
    "Phase": 1,
    "Value": "45,0986",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:33:00",
    "Phase": 1,
    "Value": "46,0289",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:34:00",
    "Phase": 1,
    "Value": "45,408",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:35:00",
    "Phase": 1,
    "Value": "44,3175",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:36:00",
    "Phase": 1,
    "Value": "43,7601",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:37:00",
    "Phase": 1,
    "Value": "44,2052",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:38:00",
    "Phase": 1,
    "Value": "45,5043",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:39:00",
    "Phase": 1,
    "Value": "45,3368",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:40:00",
    "Phase": 1,
    "Value": "44,1542",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:41:00",
    "Phase": 1,
    "Value": "44,8962",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:42:00",
    "Phase": 1,
    "Value": "44,9213",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:43:00",
    "Phase": 1,
    "Value": "45,0167",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:44:00",
    "Phase": 1,
    "Value": "46,0654",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:45:00",
    "Phase": 1,
    "Value": "46,1566",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:46:00",
    "Phase": 1,
    "Value": "44,5042",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:47:00",
    "Phase": 1,
    "Value": "46,3487",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:48:00",
    "Phase": 1,
    "Value": "46,2367",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:49:00",
    "Phase": 1,
    "Value": "44,3403",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:50:00",
    "Phase": 1,
    "Value": "45,3683",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:51:00",
    "Phase": 1,
    "Value": "44,9625",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:52:00",
    "Phase": 1,
    "Value": "45,0364",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:53:00",
    "Phase": 1,
    "Value": "45,1736",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:54:00",
    "Phase": 1,
    "Value": "45,265",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:55:00",
    "Phase": 1,
    "Value": "43,6",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:56:00",
    "Phase": 1,
    "Value": "45,115",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:57:00",
    "Phase": 1,
    "Value": "45,7676",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:58:00",
    "Phase": 1,
    "Value": "44,6205",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 09:59:00",
    "Phase": 1,
    "Value": "44,8631",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:00:00",
    "Phase": 1,
    "Value": "45,2302",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:01:00",
    "Phase": 1,
    "Value": "44,8017",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:02:00",
    "Phase": 1,
    "Value": "45,4149",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:03:00",
    "Phase": 1,
    "Value": "46,6682",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:04:00",
    "Phase": 1,
    "Value": "44,5153",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:05:00",
    "Phase": 1,
    "Value": "45,7447",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:06:00",
    "Phase": 1,
    "Value": "45,3944",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:07:00",
    "Phase": 1,
    "Value": "44,6526",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:08:00",
    "Phase": 1,
    "Value": "46,4238",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:09:00",
    "Phase": 1,
    "Value": "46,2538",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:10:00",
    "Phase": 1,
    "Value": "45,9006",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:11:00",
    "Phase": 1,
    "Value": "47,0795",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:12:00",
    "Phase": 1,
    "Value": "47,3661",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:13:00",
    "Phase": 1,
    "Value": "45,1831",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:14:00",
    "Phase": 1,
    "Value": "48,1557",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:15:00",
    "Phase": 1,
    "Value": "47,5172",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:16:00",
    "Phase": 1,
    "Value": "46,5782",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:17:00",
    "Phase": 1,
    "Value": "46,2827",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:18:00",
    "Phase": 1,
    "Value": "45,1434",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:19:00",
    "Phase": 1,
    "Value": "46,0862",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:20:00",
    "Phase": 1,
    "Value": "47,3344",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:21:00",
    "Phase": 1,
    "Value": "46,692",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:22:00",
    "Phase": 1,
    "Value": "45,7755",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:23:00",
    "Phase": 1,
    "Value": "48,1342",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:24:00",
    "Phase": 1,
    "Value": "45,7245",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:25:00",
    "Phase": 1,
    "Value": "46,3565",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:26:00",
    "Phase": 1,
    "Value": "46,0991",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:27:00",
    "Phase": 1,
    "Value": "44,4615",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:28:00",
    "Phase": 1,
    "Value": "45,7877",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:29:00",
    "Phase": 1,
    "Value": "47,3045",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:30:00",
    "Phase": 1,
    "Value": "45,9044",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:31:00",
    "Phase": 1,
    "Value": "45,1022",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:32:00",
    "Phase": 1,
    "Value": "44,5507",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:33:00",
    "Phase": 1,
    "Value": "45,8108",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:34:00",
    "Phase": 1,
    "Value": "47,4241",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:35:00",
    "Phase": 1,
    "Value": "46,1605",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:36:00",
    "Phase": 1,
    "Value": "46,7601",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:37:00",
    "Phase": 1,
    "Value": "46,0414",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:38:00",
    "Phase": 1,
    "Value": "46,2758",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:39:00",
    "Phase": 1,
    "Value": "46,6016",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:40:00",
    "Phase": 1,
    "Value": "47,9753",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:41:00",
    "Phase": 1,
    "Value": "46,3129",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:42:00",
    "Phase": 1,
    "Value": "47,3165",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:43:00",
    "Phase": 1,
    "Value": "46,2678",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:44:00",
    "Phase": 1,
    "Value": "47,5964",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:45:00",
    "Phase": 1,
    "Value": "47,0335",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:46:00",
    "Phase": 1,
    "Value": "49,5957",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:47:00",
    "Phase": 1,
    "Value": "48,4968",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:48:00",
    "Phase": 1,
    "Value": "49,2454",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:49:00",
    "Phase": 1,
    "Value": "49,0627",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:50:00",
    "Phase": 1,
    "Value": "46,6495",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:51:00",
    "Phase": 1,
    "Value": "46,1453",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:52:00",
    "Phase": 1,
    "Value": "46,7567",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:53:00",
    "Phase": 1,
    "Value": "48,5672",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:54:00",
    "Phase": 1,
    "Value": "43,0432",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:55:00",
    "Phase": 1,
    "Value": "47,7042",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:56:00",
    "Phase": 1,
    "Value": "47,0165",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:57:00",
    "Phase": 1,
    "Value": "47,2202",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:58:00",
    "Phase": 1,
    "Value": "46,8318",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 10:59:00",
    "Phase": 1,
    "Value": "47,7214",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:00:00",
    "Phase": 1,
    "Value": "48,9433",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:01:00",
    "Phase": 1,
    "Value": "45,8667",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:02:00",
    "Phase": 1,
    "Value": "47,794",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:03:00",
    "Phase": 1,
    "Value": "47,4768",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:04:00",
    "Phase": 1,
    "Value": "46,8147",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:05:00",
    "Phase": 1,
    "Value": "48,8867",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:06:00",
    "Phase": 1,
    "Value": "47,4589",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:07:00",
    "Phase": 1,
    "Value": "47,9356",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:08:00",
    "Phase": 1,
    "Value": "46,1543",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:09:00",
    "Phase": 1,
    "Value": "47,1213",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:10:00",
    "Phase": 1,
    "Value": "45,6958",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:11:00",
    "Phase": 1,
    "Value": "45,5972",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:12:00",
    "Phase": 1,
    "Value": "47,3868",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:13:00",
    "Phase": 1,
    "Value": "46,7742",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:14:00",
    "Phase": 1,
    "Value": "17,1924",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:15:00",
    "Phase": 1,
    "Value": "3,08992",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:16:00",
    "Phase": 1,
    "Value": "1,8335",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:17:00",
    "Phase": 1,
    "Value": "1,13551",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:18:00",
    "Phase": 1,
    "Value": "4,4904",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:19:00",
    "Phase": 1,
    "Value": "43,4757",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:20:00",
    "Phase": 1,
    "Value": "45,3528",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:21:00",
    "Phase": 1,
    "Value": "46,4468",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:22:00",
    "Phase": 1,
    "Value": "45,943",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:23:00",
    "Phase": 1,
    "Value": "48,1198",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:24:00",
    "Phase": 1,
    "Value": "49,3974",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:25:00",
    "Phase": 1,
    "Value": "46,1405",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:26:00",
    "Phase": 1,
    "Value": "46,2295",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:27:00",
    "Phase": 1,
    "Value": "45,0395",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:28:00",
    "Phase": 1,
    "Value": "46,1851",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:29:00",
    "Phase": 1,
    "Value": "46,224",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:30:00",
    "Phase": 1,
    "Value": "48,1083",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:31:00",
    "Phase": 1,
    "Value": "46,2911",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:32:00",
    "Phase": 1,
    "Value": "46,4333",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:33:00",
    "Phase": 1,
    "Value": "45,784",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:34:00",
    "Phase": 1,
    "Value": "47,5486",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:35:00",
    "Phase": 1,
    "Value": "47,8557",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:36:00",
    "Phase": 1,
    "Value": "46,345",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:37:00",
    "Phase": 1,
    "Value": "46,8644",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:38:00",
    "Phase": 1,
    "Value": "46,3827",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:39:00",
    "Phase": 1,
    "Value": "46,7605",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:40:00",
    "Phase": 1,
    "Value": "46,8835",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:41:00",
    "Phase": 1,
    "Value": "45,6356",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:42:00",
    "Phase": 1,
    "Value": "44,9705",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:43:00",
    "Phase": 1,
    "Value": "45,0676",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:44:00",
    "Phase": 1,
    "Value": "45,7157",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:45:00",
    "Phase": 1,
    "Value": "47,4257",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:46:00",
    "Phase": 1,
    "Value": "46,0681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:47:00",
    "Phase": 1,
    "Value": "45,8333",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:48:00",
    "Phase": 1,
    "Value": "45,9071",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:49:00",
    "Phase": 1,
    "Value": "46,0512",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:50:00",
    "Phase": 1,
    "Value": "45,8254",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:51:00",
    "Phase": 1,
    "Value": "45,7084",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:52:00",
    "Phase": 1,
    "Value": "44,1968",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:53:00",
    "Phase": 1,
    "Value": "46,7935",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:54:00",
    "Phase": 1,
    "Value": "46,7587",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:55:00",
    "Phase": 1,
    "Value": "45,9447",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:56:00",
    "Phase": 1,
    "Value": "49,6093",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:57:00",
    "Phase": 1,
    "Value": "46,7066",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:58:00",
    "Phase": 1,
    "Value": "44,8484",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 11:59:00",
    "Phase": 1,
    "Value": "44,3333",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:00:00",
    "Phase": 1,
    "Value": "46,2667",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:01:00",
    "Phase": 1,
    "Value": "44,8394",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:02:00",
    "Phase": 1,
    "Value": "46,7953",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:03:00",
    "Phase": 1,
    "Value": "46,1763",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:04:00",
    "Phase": 1,
    "Value": "46,7334",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:05:00",
    "Phase": 1,
    "Value": "45,2556",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:06:00",
    "Phase": 1,
    "Value": "46,1127",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:07:00",
    "Phase": 1,
    "Value": "45,9552",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:08:00",
    "Phase": 1,
    "Value": "45,3693",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:09:00",
    "Phase": 1,
    "Value": "48,0681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:10:00",
    "Phase": 1,
    "Value": "46,3906",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:11:00",
    "Phase": 1,
    "Value": "47,2688",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:12:00",
    "Phase": 1,
    "Value": "45,9991",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:13:00",
    "Phase": 1,
    "Value": "47,377",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:14:00",
    "Phase": 1,
    "Value": "46,1183",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:15:00",
    "Phase": 1,
    "Value": "46,1258",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:16:00",
    "Phase": 1,
    "Value": "46,7556",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:17:00",
    "Phase": 1,
    "Value": "46,1962",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:18:00",
    "Phase": 1,
    "Value": "44,7027",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:19:00",
    "Phase": 1,
    "Value": "44,3696",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:20:00",
    "Phase": 1,
    "Value": "47,099",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:21:00",
    "Phase": 1,
    "Value": "46,0728",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:22:00",
    "Phase": 1,
    "Value": "46,0746",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:23:00",
    "Phase": 1,
    "Value": "45,3247",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:24:00",
    "Phase": 1,
    "Value": "45,5189",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:25:00",
    "Phase": 1,
    "Value": "46,2209",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:26:00",
    "Phase": 1,
    "Value": "46,6894",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:27:00",
    "Phase": 1,
    "Value": "47,441",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:28:00",
    "Phase": 1,
    "Value": "46,1158",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:29:00",
    "Phase": 1,
    "Value": "45,4988",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:30:00",
    "Phase": 1,
    "Value": "45,755",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:31:00",
    "Phase": 1,
    "Value": "46,9859",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:32:00",
    "Phase": 1,
    "Value": "46,104",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:33:00",
    "Phase": 1,
    "Value": "45,0841",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:34:00",
    "Phase": 1,
    "Value": "45,712",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:35:00",
    "Phase": 1,
    "Value": "45,974",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:36:00",
    "Phase": 1,
    "Value": "48,5933",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:37:00",
    "Phase": 1,
    "Value": "49,0386",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:38:00",
    "Phase": 1,
    "Value": "46,0205",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:39:00",
    "Phase": 1,
    "Value": "46,7691",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:40:00",
    "Phase": 1,
    "Value": "47,3692",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:41:00",
    "Phase": 1,
    "Value": "47,5371",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:42:00",
    "Phase": 1,
    "Value": "47,8118",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:43:00",
    "Phase": 1,
    "Value": "47,9519",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:44:00",
    "Phase": 1,
    "Value": "48,3541",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:45:00",
    "Phase": 1,
    "Value": "46,8815",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:46:00",
    "Phase": 1,
    "Value": "46,2523",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:47:00",
    "Phase": 1,
    "Value": "47,028",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:48:00",
    "Phase": 1,
    "Value": "47,553",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:49:00",
    "Phase": 1,
    "Value": "48,096",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:50:00",
    "Phase": 1,
    "Value": "47,6788",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:51:00",
    "Phase": 1,
    "Value": "46,6365",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:52:00",
    "Phase": 1,
    "Value": "47,7905",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:53:00",
    "Phase": 1,
    "Value": "46,7679",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:54:00",
    "Phase": 1,
    "Value": "45,2539",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:55:00",
    "Phase": 1,
    "Value": "45,3721",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:56:00",
    "Phase": 1,
    "Value": "47,8848",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:57:00",
    "Phase": 1,
    "Value": "48,5754",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:58:00",
    "Phase": 1,
    "Value": "48,3642",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 12:59:00",
    "Phase": 1,
    "Value": "47,3201",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:00:00",
    "Phase": 1,
    "Value": "46,68",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:01:00",
    "Phase": 1,
    "Value": "47,1902",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:02:00",
    "Phase": 1,
    "Value": "46,8822",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:03:00",
    "Phase": 1,
    "Value": "46,0172",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:04:00",
    "Phase": 1,
    "Value": "46,7374",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:05:00",
    "Phase": 1,
    "Value": "46,9343",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:06:00",
    "Phase": 1,
    "Value": "46,9343",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:07:00",
    "Phase": 1,
    "Value": "46,4115",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:08:00",
    "Phase": 1,
    "Value": "45,2048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:09:00",
    "Phase": 1,
    "Value": "47,3973",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:10:00",
    "Phase": 1,
    "Value": "46,9978",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:11:00",
    "Phase": 1,
    "Value": "45,8179",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:12:00",
    "Phase": 1,
    "Value": "48,7141",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:13:00",
    "Phase": 1,
    "Value": "46,409",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:14:00",
    "Phase": 1,
    "Value": "45,4054",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:15:00",
    "Phase": 1,
    "Value": "45,8603",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:16:00",
    "Phase": 1,
    "Value": "45,666",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:17:00",
    "Phase": 1,
    "Value": "44,6625",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:18:00",
    "Phase": 1,
    "Value": "47,7792",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:19:00",
    "Phase": 1,
    "Value": "47,5451",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:20:00",
    "Phase": 1,
    "Value": "46,4619",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:21:00",
    "Phase": 1,
    "Value": "45,4586",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:22:00",
    "Phase": 1,
    "Value": "45,7165",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:23:00",
    "Phase": 1,
    "Value": "44,5435",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:24:00",
    "Phase": 1,
    "Value": "46,3235",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:25:00",
    "Phase": 1,
    "Value": "46,5041",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:26:00",
    "Phase": 1,
    "Value": "46,0499",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:27:00",
    "Phase": 1,
    "Value": "46,8938",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:28:00",
    "Phase": 1,
    "Value": "46,7485",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:29:00",
    "Phase": 1,
    "Value": "45,8737",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:30:00",
    "Phase": 1,
    "Value": "6,02879",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:31:00",
    "Phase": 1,
    "Value": "3,20417",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:32:00",
    "Phase": 1,
    "Value": "3,37255",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:33:00",
    "Phase": 1,
    "Value": "17,6424",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:34:00",
    "Phase": 1,
    "Value": "47,3237",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:35:00",
    "Phase": 1,
    "Value": "46,1564",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:36:00",
    "Phase": 1,
    "Value": "44,7568",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:37:00",
    "Phase": 1,
    "Value": "46,754",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:38:00",
    "Phase": 1,
    "Value": "47,0258",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:39:00",
    "Phase": 1,
    "Value": "47,3629",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:40:00",
    "Phase": 1,
    "Value": "47,0664",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:41:00",
    "Phase": 1,
    "Value": "44,4223",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:42:00",
    "Phase": 1,
    "Value": "46,1286",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:43:00",
    "Phase": 1,
    "Value": "47,3456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:44:00",
    "Phase": 1,
    "Value": "46,1183",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:45:00",
    "Phase": 1,
    "Value": "46,9836",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:46:00",
    "Phase": 1,
    "Value": "47,3913",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:47:00",
    "Phase": 1,
    "Value": "45,7616",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:48:00",
    "Phase": 1,
    "Value": "47,5327",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:49:00",
    "Phase": 1,
    "Value": "45,6178",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:50:00",
    "Phase": 1,
    "Value": "46,851",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:51:00",
    "Phase": 1,
    "Value": "45,0071",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:52:00",
    "Phase": 1,
    "Value": "45,5806",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:53:00",
    "Phase": 1,
    "Value": "44,6756",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:54:00",
    "Phase": 1,
    "Value": "46,6064",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:55:00",
    "Phase": 1,
    "Value": "47,0008",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:56:00",
    "Phase": 1,
    "Value": "47,6598",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:57:00",
    "Phase": 1,
    "Value": "46,8449",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:58:00",
    "Phase": 1,
    "Value": "45,95",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 13:59:00",
    "Phase": 1,
    "Value": "47,6641",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:00:00",
    "Phase": 1,
    "Value": "46,4968",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:01:00",
    "Phase": 1,
    "Value": "45,2825",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:02:00",
    "Phase": 1,
    "Value": "45,3848",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:03:00",
    "Phase": 1,
    "Value": "45,7588",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:04:00",
    "Phase": 1,
    "Value": "47,5195",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:05:00",
    "Phase": 1,
    "Value": "47,7779",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:06:00",
    "Phase": 1,
    "Value": "47,7819",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:07:00",
    "Phase": 1,
    "Value": "46,5669",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:08:00",
    "Phase": 1,
    "Value": "46,5074",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:09:00",
    "Phase": 1,
    "Value": "47,3227",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:10:00",
    "Phase": 1,
    "Value": "47,9011",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:11:00",
    "Phase": 1,
    "Value": "49,008",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:12:00",
    "Phase": 1,
    "Value": "46,766",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:13:00",
    "Phase": 1,
    "Value": "45,9776",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:14:00",
    "Phase": 1,
    "Value": "48,0989",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:15:00",
    "Phase": 1,
    "Value": "46,3923",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:16:00",
    "Phase": 1,
    "Value": "46,9057",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:17:00",
    "Phase": 1,
    "Value": "46,6514",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:18:00",
    "Phase": 1,
    "Value": "46,295",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:19:00",
    "Phase": 1,
    "Value": "46,7622",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:20:00",
    "Phase": 1,
    "Value": "46,418",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:21:00",
    "Phase": 1,
    "Value": "46,0379",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:22:00",
    "Phase": 1,
    "Value": "46,5411",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:23:00",
    "Phase": 1,
    "Value": "45,7599",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:24:00",
    "Phase": 1,
    "Value": "46,1743",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:25:00",
    "Phase": 1,
    "Value": "46,5012",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:26:00",
    "Phase": 1,
    "Value": "46,1048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:27:00",
    "Phase": 1,
    "Value": "46,1443",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:28:00",
    "Phase": 1,
    "Value": "46,5861",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:29:00",
    "Phase": 1,
    "Value": "46,5795",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:30:00",
    "Phase": 1,
    "Value": "46,9402",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:31:00",
    "Phase": 1,
    "Value": "45,2692",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:32:00",
    "Phase": 1,
    "Value": "46,4883",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:33:00",
    "Phase": 1,
    "Value": "45,5595",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:34:00",
    "Phase": 1,
    "Value": "28,2072",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:35:00",
    "Phase": 1,
    "Value": "2,04834",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:36:00",
    "Phase": 1,
    "Value": "1,76356",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:37:00",
    "Phase": 1,
    "Value": "2,06153",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:38:00",
    "Phase": 1,
    "Value": "3,28277",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:39:00",
    "Phase": 1,
    "Value": "2,58917",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:40:00",
    "Phase": 1,
    "Value": "20,0185",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:41:00",
    "Phase": 1,
    "Value": "45,9586",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:42:00",
    "Phase": 1,
    "Value": "47,1126",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:43:00",
    "Phase": 1,
    "Value": "47,168",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:44:00",
    "Phase": 1,
    "Value": "45,9064",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:45:00",
    "Phase": 1,
    "Value": "45,6144",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:46:00",
    "Phase": 1,
    "Value": "46,8209",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:47:00",
    "Phase": 1,
    "Value": "47,0145",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:48:00",
    "Phase": 1,
    "Value": "46,6158",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:49:00",
    "Phase": 1,
    "Value": "46,8981",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:50:00",
    "Phase": 1,
    "Value": "45,0289",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:51:00",
    "Phase": 1,
    "Value": "46,9566",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:52:00",
    "Phase": 1,
    "Value": "47,1273",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:53:00",
    "Phase": 1,
    "Value": "45,732",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:54:00",
    "Phase": 1,
    "Value": "46,3478",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:55:00",
    "Phase": 1,
    "Value": "46,6237",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:56:00",
    "Phase": 1,
    "Value": "46,2324",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:57:00",
    "Phase": 1,
    "Value": "45,8428",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:58:00",
    "Phase": 1,
    "Value": "44,8678",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 14:59:00",
    "Phase": 1,
    "Value": "46,568",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:00:00",
    "Phase": 1,
    "Value": "47,871",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:01:00",
    "Phase": 1,
    "Value": "46,1031",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:02:00",
    "Phase": 1,
    "Value": "46,7144",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:03:00",
    "Phase": 1,
    "Value": "46,7399",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:04:00",
    "Phase": 1,
    "Value": "44,7078",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:05:00",
    "Phase": 1,
    "Value": "45,7616",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:06:00",
    "Phase": 1,
    "Value": "46,3022",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:07:00",
    "Phase": 1,
    "Value": "46,4343",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:08:00",
    "Phase": 1,
    "Value": "47,7705",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:09:00",
    "Phase": 1,
    "Value": "47,6768",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:10:00",
    "Phase": 1,
    "Value": "46,0643",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:11:00",
    "Phase": 1,
    "Value": "46,229",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:12:00",
    "Phase": 1,
    "Value": "47,0326",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:13:00",
    "Phase": 1,
    "Value": "45,8264",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:14:00",
    "Phase": 1,
    "Value": "47,6245",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:15:00",
    "Phase": 1,
    "Value": "47,3196",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:16:00",
    "Phase": 1,
    "Value": "46,1562",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:17:00",
    "Phase": 1,
    "Value": "45,5428",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:18:00",
    "Phase": 1,
    "Value": "45,9888",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:19:00",
    "Phase": 1,
    "Value": "45,7261",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:20:00",
    "Phase": 1,
    "Value": "45,916",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:21:00",
    "Phase": 1,
    "Value": "46,4055",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:22:00",
    "Phase": 1,
    "Value": "46,5733",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:23:00",
    "Phase": 1,
    "Value": "46,5237",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:24:00",
    "Phase": 1,
    "Value": "47,0666",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:25:00",
    "Phase": 1,
    "Value": "46,4599",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:26:00",
    "Phase": 1,
    "Value": "47,3235",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:27:00",
    "Phase": 1,
    "Value": "45,4876",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:28:00",
    "Phase": 1,
    "Value": "45,838",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:29:00",
    "Phase": 1,
    "Value": "46,5443",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:30:00",
    "Phase": 1,
    "Value": "45,9357",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:31:00",
    "Phase": 1,
    "Value": "45,9059",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:32:00",
    "Phase": 1,
    "Value": "46,9071",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:33:00",
    "Phase": 1,
    "Value": "47,2724",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:34:00",
    "Phase": 1,
    "Value": "46,9523",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:35:00",
    "Phase": 1,
    "Value": "46,7371",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:36:00",
    "Phase": 1,
    "Value": "46,3609",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:37:00",
    "Phase": 1,
    "Value": "47,5795",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:38:00",
    "Phase": 1,
    "Value": "47,4451",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:39:00",
    "Phase": 1,
    "Value": "45,675",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:40:00",
    "Phase": 1,
    "Value": "46,5434",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:41:00",
    "Phase": 1,
    "Value": "47,3836",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:42:00",
    "Phase": 1,
    "Value": "45,1893",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:43:00",
    "Phase": 1,
    "Value": "47,9688",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:44:00",
    "Phase": 1,
    "Value": "46,9062",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:45:00",
    "Phase": 1,
    "Value": "46,3917",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:46:00",
    "Phase": 1,
    "Value": "46,4607",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:47:00",
    "Phase": 1,
    "Value": "47,9345",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:48:00",
    "Phase": 1,
    "Value": "45,5757",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:49:00",
    "Phase": 1,
    "Value": "46,2763",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:50:00",
    "Phase": 1,
    "Value": "46,4025",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:51:00",
    "Phase": 1,
    "Value": "46,9349",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:52:00",
    "Phase": 1,
    "Value": "48,5392",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:53:00",
    "Phase": 1,
    "Value": "47,1207",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:54:00",
    "Phase": 1,
    "Value": "47,5984",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:55:00",
    "Phase": 1,
    "Value": "46,6831",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:56:00",
    "Phase": 1,
    "Value": "46,2956",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:57:00",
    "Phase": 1,
    "Value": "45,7652",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:58:00",
    "Phase": 1,
    "Value": "46,2077",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 15:59:00",
    "Phase": 1,
    "Value": "45,3485",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:00:00",
    "Phase": 1,
    "Value": "44,885",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:01:00",
    "Phase": 1,
    "Value": "48,3627",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:02:00",
    "Phase": 1,
    "Value": "48,2254",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:03:00",
    "Phase": 1,
    "Value": "48,3477",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:04:00",
    "Phase": 1,
    "Value": "48,1061",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:05:00",
    "Phase": 1,
    "Value": "46,1165",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:06:00",
    "Phase": 1,
    "Value": "45,4914",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:07:00",
    "Phase": 1,
    "Value": "47,9866",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:08:00",
    "Phase": 1,
    "Value": "46,3307",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:09:00",
    "Phase": 1,
    "Value": "47,5978",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:10:00",
    "Phase": 1,
    "Value": "47,6071",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:11:00",
    "Phase": 1,
    "Value": "46,692",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:12:00",
    "Phase": 1,
    "Value": "47,6193",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:13:00",
    "Phase": 1,
    "Value": "46,4335",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:14:00",
    "Phase": 1,
    "Value": "46,8563",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:15:00",
    "Phase": 1,
    "Value": "47,4271",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:16:00",
    "Phase": 1,
    "Value": "48,1719",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:17:00",
    "Phase": 1,
    "Value": "47,6323",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:18:00",
    "Phase": 1,
    "Value": "47,0793",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:19:00",
    "Phase": 1,
    "Value": "45,5779",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:20:00",
    "Phase": 1,
    "Value": "47,2612",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:21:00",
    "Phase": 1,
    "Value": "47,5006",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:22:00",
    "Phase": 1,
    "Value": "46,0264",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:23:00",
    "Phase": 1,
    "Value": "45,7527",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:24:00",
    "Phase": 1,
    "Value": "46,5925",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:25:00",
    "Phase": 1,
    "Value": "46,2085",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:26:00",
    "Phase": 1,
    "Value": "46,2532",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:27:00",
    "Phase": 1,
    "Value": "49,0509",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:28:00",
    "Phase": 1,
    "Value": "47,2522",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:29:00",
    "Phase": 1,
    "Value": "47,7802",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:30:00",
    "Phase": 1,
    "Value": "46,0608",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:31:00",
    "Phase": 1,
    "Value": "47,1642",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:32:00",
    "Phase": 1,
    "Value": "46,4946",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:33:00",
    "Phase": 1,
    "Value": "47,1852",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:34:00",
    "Phase": 1,
    "Value": "46,5815",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:35:00",
    "Phase": 1,
    "Value": "45,3339",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:36:00",
    "Phase": 1,
    "Value": "46,6861",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:37:00",
    "Phase": 1,
    "Value": "46,0976",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:38:00",
    "Phase": 1,
    "Value": "46,0274",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:39:00",
    "Phase": 1,
    "Value": "44,8175",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:40:00",
    "Phase": 1,
    "Value": "47,6869",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:41:00",
    "Phase": 1,
    "Value": "45,3187",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:42:00",
    "Phase": 1,
    "Value": "45,7088",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:43:00",
    "Phase": 1,
    "Value": "45,1269",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:44:00",
    "Phase": 1,
    "Value": "46,2249",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:45:00",
    "Phase": 1,
    "Value": "45,1101",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:46:00",
    "Phase": 1,
    "Value": "45,6008",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:47:00",
    "Phase": 1,
    "Value": "44,6673",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:48:00",
    "Phase": 1,
    "Value": "45,0499",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:49:00",
    "Phase": 1,
    "Value": "45,0332",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:50:00",
    "Phase": 1,
    "Value": "47,1194",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:51:00",
    "Phase": 1,
    "Value": "46,8746",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:52:00",
    "Phase": 1,
    "Value": "47,116",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:53:00",
    "Phase": 1,
    "Value": "46,5235",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:54:00",
    "Phase": 1,
    "Value": "46,5066",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:55:00",
    "Phase": 1,
    "Value": "48,06",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:56:00",
    "Phase": 1,
    "Value": "48,9421",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:57:00",
    "Phase": 1,
    "Value": "45,6956",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:58:00",
    "Phase": 1,
    "Value": "46,0004",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 16:59:00",
    "Phase": 1,
    "Value": "46,7889",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:00:00",
    "Phase": 1,
    "Value": "47,3318",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:01:00",
    "Phase": 1,
    "Value": "46,5106",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:02:00",
    "Phase": 1,
    "Value": "45,9631",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:03:00",
    "Phase": 1,
    "Value": "46,6746",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:04:00",
    "Phase": 1,
    "Value": "45,8399",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:05:00",
    "Phase": 1,
    "Value": "45,9485",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:06:00",
    "Phase": 1,
    "Value": "47,1713",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:07:00",
    "Phase": 1,
    "Value": "46,6919",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:08:00",
    "Phase": 1,
    "Value": "45,9331",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:09:00",
    "Phase": 1,
    "Value": "47,3027",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:10:00",
    "Phase": 1,
    "Value": "45,1854",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:11:00",
    "Phase": 1,
    "Value": "45,4235",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:12:00",
    "Phase": 1,
    "Value": "45,4512",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:13:00",
    "Phase": 1,
    "Value": "45,1949",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:14:00",
    "Phase": 1,
    "Value": "44,9629",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:15:00",
    "Phase": 1,
    "Value": "45,4093",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:16:00",
    "Phase": 1,
    "Value": "44,8008",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:17:00",
    "Phase": 1,
    "Value": "46,8243",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:18:00",
    "Phase": 1,
    "Value": "46,489",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:19:00",
    "Phase": 1,
    "Value": "44,5168",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:20:00",
    "Phase": 1,
    "Value": "45,6603",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:21:00",
    "Phase": 1,
    "Value": "45,9042",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:22:00",
    "Phase": 1,
    "Value": "44,6754",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:23:00",
    "Phase": 1,
    "Value": "46,7307",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:24:00",
    "Phase": 1,
    "Value": "46,999",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:25:00",
    "Phase": 1,
    "Value": "46,0197",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:26:00",
    "Phase": 1,
    "Value": "46,979",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:27:00",
    "Phase": 1,
    "Value": "46,5046",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:28:00",
    "Phase": 1,
    "Value": "44,4934",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:29:00",
    "Phase": 1,
    "Value": "46,0399",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:30:00",
    "Phase": 1,
    "Value": "47,4895",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:31:00",
    "Phase": 1,
    "Value": "45,0743",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:32:00",
    "Phase": 1,
    "Value": "46,3022",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:33:00",
    "Phase": 1,
    "Value": "44,9456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:34:00",
    "Phase": 1,
    "Value": "45,524",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:35:00",
    "Phase": 1,
    "Value": "46,4511",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:36:00",
    "Phase": 1,
    "Value": "47,6107",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:37:00",
    "Phase": 1,
    "Value": "47,4027",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:38:00",
    "Phase": 1,
    "Value": "45,9115",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:39:00",
    "Phase": 1,
    "Value": "45,5755",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:40:00",
    "Phase": 1,
    "Value": "46,1149",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:41:00",
    "Phase": 1,
    "Value": "48,3849",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:42:00",
    "Phase": 1,
    "Value": "47,5237",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:43:00",
    "Phase": 1,
    "Value": "45,0054",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:44:00",
    "Phase": 1,
    "Value": "45,327",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:45:00",
    "Phase": 1,
    "Value": "46,3134",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:46:00",
    "Phase": 1,
    "Value": "46,5322",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:47:00",
    "Phase": 1,
    "Value": "46,5236",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:48:00",
    "Phase": 1,
    "Value": "47,368",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:49:00",
    "Phase": 1,
    "Value": "46,8585",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:50:00",
    "Phase": 1,
    "Value": "46,7073",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:51:00",
    "Phase": 1,
    "Value": "46,2568",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:52:00",
    "Phase": 1,
    "Value": "45,5093",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:53:00",
    "Phase": 1,
    "Value": "45,5918",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:54:00",
    "Phase": 1,
    "Value": "45,675",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:55:00",
    "Phase": 1,
    "Value": "44,9543",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:56:00",
    "Phase": 1,
    "Value": "45,5456",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:57:00",
    "Phase": 1,
    "Value": "45,3563",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:58:00",
    "Phase": 1,
    "Value": "45,6524",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 17:59:00",
    "Phase": 1,
    "Value": "44,8809",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:00:00",
    "Phase": 1,
    "Value": "45,0977",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:01:00",
    "Phase": 1,
    "Value": "45,8345",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:02:00",
    "Phase": 1,
    "Value": "47,4272",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:03:00",
    "Phase": 1,
    "Value": "45,4647",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:04:00",
    "Phase": 1,
    "Value": "45,0236",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:05:00",
    "Phase": 1,
    "Value": "45,7418",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:06:00",
    "Phase": 1,
    "Value": "45,9961",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:07:00",
    "Phase": 1,
    "Value": "47,3696",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:08:00",
    "Phase": 1,
    "Value": "47,0903",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:09:00",
    "Phase": 1,
    "Value": "47,5148",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:10:00",
    "Phase": 1,
    "Value": "46,8031",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:11:00",
    "Phase": 1,
    "Value": "46,3886",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:12:00",
    "Phase": 1,
    "Value": "47,9354",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:13:00",
    "Phase": 1,
    "Value": "46,2588",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:14:00",
    "Phase": 1,
    "Value": "45,8234",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:15:00",
    "Phase": 1,
    "Value": "47,0078",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:16:00",
    "Phase": 1,
    "Value": "46,5065",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:17:00",
    "Phase": 1,
    "Value": "45,5569",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:18:00",
    "Phase": 1,
    "Value": "45,0869",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:19:00",
    "Phase": 1,
    "Value": "44,8048",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:20:00",
    "Phase": 1,
    "Value": "46,5505",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:21:00",
    "Phase": 1,
    "Value": "47,1361",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:22:00",
    "Phase": 1,
    "Value": "46,6078",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:23:00",
    "Phase": 1,
    "Value": "46,8371",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:24:00",
    "Phase": 1,
    "Value": "46,8104",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:25:00",
    "Phase": 1,
    "Value": "46,8741",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:26:00",
    "Phase": 1,
    "Value": "47,4932",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:27:00",
    "Phase": 1,
    "Value": "45,3781",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:28:00",
    "Phase": 1,
    "Value": "46,3386",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:29:00",
    "Phase": 1,
    "Value": "47,3158",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:30:00",
    "Phase": 1,
    "Value": "46,5856",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:31:00",
    "Phase": 1,
    "Value": "46,4673",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:32:00",
    "Phase": 1,
    "Value": "47,2987",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:33:00",
    "Phase": 1,
    "Value": "46,141",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:34:00",
    "Phase": 1,
    "Value": "45,6144",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:35:00",
    "Phase": 1,
    "Value": "48,0251",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:36:00",
    "Phase": 1,
    "Value": "46,9183",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:37:00",
    "Phase": 1,
    "Value": "46,6984",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:38:00",
    "Phase": 1,
    "Value": "44,4196",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:39:00",
    "Phase": 1,
    "Value": "45,1554",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:40:00",
    "Phase": 1,
    "Value": "45,5965",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:41:00",
    "Phase": 1,
    "Value": "44,9152",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:42:00",
    "Phase": 1,
    "Value": "45,4661",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:43:00",
    "Phase": 1,
    "Value": "45,2166",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:44:00",
    "Phase": 1,
    "Value": "47,2169",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:45:00",
    "Phase": 1,
    "Value": "45,26",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:46:00",
    "Phase": 1,
    "Value": "44,9338",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:47:00",
    "Phase": 1,
    "Value": "45,8609",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:48:00",
    "Phase": 1,
    "Value": "47,0938",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:49:00",
    "Phase": 1,
    "Value": "48,0905",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:50:00",
    "Phase": 1,
    "Value": "47,676",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:51:00",
    "Phase": 1,
    "Value": "47,1571",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:52:00",
    "Phase": 1,
    "Value": "46,3875",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:53:00",
    "Phase": 1,
    "Value": "47,4479",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:54:00",
    "Phase": 1,
    "Value": "47,4611",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:55:00",
    "Phase": 1,
    "Value": "47,8436",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:56:00",
    "Phase": 1,
    "Value": "46,8776",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:57:00",
    "Phase": 1,
    "Value": "46,4536",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:58:00",
    "Phase": 1,
    "Value": "46,979",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 18:59:00",
    "Phase": 1,
    "Value": "46,3231",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:00:00",
    "Phase": 1,
    "Value": "45,6544",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:01:00",
    "Phase": 1,
    "Value": "46,9564",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:02:00",
    "Phase": 1,
    "Value": "44,8535",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:03:00",
    "Phase": 1,
    "Value": "46,5604",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:04:00",
    "Phase": 1,
    "Value": "46,4404",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:05:00",
    "Phase": 1,
    "Value": "46,7247",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:06:00",
    "Phase": 1,
    "Value": "46,2041",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:07:00",
    "Phase": 1,
    "Value": "45,6004",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:08:00",
    "Phase": 1,
    "Value": "44,5401",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:09:00",
    "Phase": 1,
    "Value": "46,8648",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:10:00",
    "Phase": 1,
    "Value": "46,8508",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:11:00",
    "Phase": 1,
    "Value": "45,4078",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:12:00",
    "Phase": 1,
    "Value": "45,6597",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:13:00",
    "Phase": 1,
    "Value": "46,7772",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:14:00",
    "Phase": 1,
    "Value": "46,2123",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:15:00",
    "Phase": 1,
    "Value": "47,1998",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:16:00",
    "Phase": 1,
    "Value": "48,0351",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:17:00",
    "Phase": 1,
    "Value": "46,4535",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:18:00",
    "Phase": 1,
    "Value": "45,4442",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:19:00",
    "Phase": 1,
    "Value": "46,3899",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:20:00",
    "Phase": 1,
    "Value": "46,6094",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:21:00",
    "Phase": 1,
    "Value": "48,2215",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:22:00",
    "Phase": 1,
    "Value": "47,0913",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:23:00",
    "Phase": 1,
    "Value": "45,5278",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:24:00",
    "Phase": 1,
    "Value": "47,1588",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:25:00",
    "Phase": 1,
    "Value": "46,812",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:26:00",
    "Phase": 1,
    "Value": "48,5283",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:27:00",
    "Phase": 1,
    "Value": "47,2274",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:28:00",
    "Phase": 1,
    "Value": "47,6106",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:29:00",
    "Phase": 1,
    "Value": "45,4125",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:30:00",
    "Phase": 1,
    "Value": "46,2741",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:31:00",
    "Phase": 1,
    "Value": "46,1614",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:32:00",
    "Phase": 1,
    "Value": "45,3606",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:33:00",
    "Phase": 1,
    "Value": "46,3957",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:34:00",
    "Phase": 1,
    "Value": "46,6682",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:35:00",
    "Phase": 1,
    "Value": "46,2237",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:36:00",
    "Phase": 1,
    "Value": "47,2153",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:37:00",
    "Phase": 1,
    "Value": "45,4799",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:38:00",
    "Phase": 1,
    "Value": "44,33",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:39:00",
    "Phase": 1,
    "Value": "46,4471",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:40:00",
    "Phase": 1,
    "Value": "46,7366",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:41:00",
    "Phase": 1,
    "Value": "45,5486",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:42:00",
    "Phase": 1,
    "Value": "46,0405",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:43:00",
    "Phase": 1,
    "Value": "45,7653",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:44:00",
    "Phase": 1,
    "Value": "45,5754",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:45:00",
    "Phase": 1,
    "Value": "45,8663",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:46:00",
    "Phase": 1,
    "Value": "47,8571",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:47:00",
    "Phase": 1,
    "Value": "46,5723",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:48:00",
    "Phase": 1,
    "Value": "46,6311",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:49:00",
    "Phase": 1,
    "Value": "45,4428",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:50:00",
    "Phase": 1,
    "Value": "46,8825",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:51:00",
    "Phase": 1,
    "Value": "46,4117",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:52:00",
    "Phase": 1,
    "Value": "46,3928",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:53:00",
    "Phase": 1,
    "Value": "46,6227",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:54:00",
    "Phase": 1,
    "Value": "45,7354",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:55:00",
    "Phase": 1,
    "Value": "46,2185",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:56:00",
    "Phase": 1,
    "Value": "44,3842",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:57:00",
    "Phase": 1,
    "Value": "47,1035",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:58:00",
    "Phase": 1,
    "Value": "45,6992",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 19:59:00",
    "Phase": 1,
    "Value": "46,9436",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:00:00",
    "Phase": 1,
    "Value": "46,3496",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:01:00",
    "Phase": 1,
    "Value": "45,4287",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:02:00",
    "Phase": 1,
    "Value": "47,1721",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:03:00",
    "Phase": 1,
    "Value": "46,8923",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:04:00",
    "Phase": 1,
    "Value": "46,3018",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:05:00",
    "Phase": 1,
    "Value": "46,9526",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:06:00",
    "Phase": 1,
    "Value": "46,5646",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:07:00",
    "Phase": 1,
    "Value": "46,4676",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:08:00",
    "Phase": 1,
    "Value": "46,0367",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:09:00",
    "Phase": 1,
    "Value": "45,483",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:10:00",
    "Phase": 1,
    "Value": "47,4681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:11:00",
    "Phase": 1,
    "Value": "46,7414",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:12:00",
    "Phase": 1,
    "Value": "48,0723",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:13:00",
    "Phase": 1,
    "Value": "45,6551",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:14:00",
    "Phase": 1,
    "Value": "46,2148",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:15:00",
    "Phase": 1,
    "Value": "45,7999",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:16:00",
    "Phase": 1,
    "Value": "46,9978",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:17:00",
    "Phase": 1,
    "Value": "46,6815",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:18:00",
    "Phase": 1,
    "Value": "45,0433",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:19:00",
    "Phase": 1,
    "Value": "44,4262",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:20:00",
    "Phase": 1,
    "Value": "46,0628",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:21:00",
    "Phase": 1,
    "Value": "45,1096",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:22:00",
    "Phase": 1,
    "Value": "45,4597",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:23:00",
    "Phase": 1,
    "Value": "45,9768",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:24:00",
    "Phase": 1,
    "Value": "46,5092",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:25:00",
    "Phase": 1,
    "Value": "47,1513",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:26:00",
    "Phase": 1,
    "Value": "47,6506",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:27:00",
    "Phase": 1,
    "Value": "46,7871",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:28:00",
    "Phase": 1,
    "Value": "46,4368",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:29:00",
    "Phase": 1,
    "Value": "47,2278",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:30:00",
    "Phase": 1,
    "Value": "45,2134",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:31:00",
    "Phase": 1,
    "Value": "46,2902",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:32:00",
    "Phase": 1,
    "Value": "45,8175",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:33:00",
    "Phase": 1,
    "Value": "46,249",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:34:00",
    "Phase": 1,
    "Value": "47,6165",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:35:00",
    "Phase": 1,
    "Value": "46,653",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:36:00",
    "Phase": 1,
    "Value": "46,2102",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:37:00",
    "Phase": 1,
    "Value": "46,1839",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:38:00",
    "Phase": 1,
    "Value": "46,2095",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:39:00",
    "Phase": 1,
    "Value": "44,9577",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:40:00",
    "Phase": 1,
    "Value": "45,4598",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:41:00",
    "Phase": 1,
    "Value": "46,4673",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:42:00",
    "Phase": 1,
    "Value": "45,8318",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:43:00",
    "Phase": 1,
    "Value": "46,4696",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:44:00",
    "Phase": 1,
    "Value": "46,7006",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:45:00",
    "Phase": 1,
    "Value": "46,4171",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:46:00",
    "Phase": 1,
    "Value": "47,1023",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:47:00",
    "Phase": 1,
    "Value": "47,6698",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:48:00",
    "Phase": 1,
    "Value": "46,8533",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:49:00",
    "Phase": 1,
    "Value": "48,1472",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:50:00",
    "Phase": 1,
    "Value": "47,0205",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:51:00",
    "Phase": 1,
    "Value": "46,2858",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:52:00",
    "Phase": 1,
    "Value": "46,8511",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:53:00",
    "Phase": 1,
    "Value": "48,3868",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:54:00",
    "Phase": 1,
    "Value": "46,7864",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:55:00",
    "Phase": 1,
    "Value": "47,6357",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:56:00",
    "Phase": 1,
    "Value": "46,1292",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:57:00",
    "Phase": 1,
    "Value": "46,2857",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:58:00",
    "Phase": 1,
    "Value": "47,4846",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 20:59:00",
    "Phase": 1,
    "Value": "47,2605",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:00:00",
    "Phase": 1,
    "Value": "45,4652",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:01:00",
    "Phase": 1,
    "Value": "46,1192",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:02:00",
    "Phase": 1,
    "Value": "47,2886",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:03:00",
    "Phase": 1,
    "Value": "47,7394",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:04:00",
    "Phase": 1,
    "Value": "47,3254",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:05:00",
    "Phase": 1,
    "Value": "47,4472",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:06:00",
    "Phase": 1,
    "Value": "46,0791",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:07:00",
    "Phase": 1,
    "Value": "44,8794",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:08:00",
    "Phase": 1,
    "Value": "45,8445",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:09:00",
    "Phase": 1,
    "Value": "47,734",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:10:00",
    "Phase": 1,
    "Value": "47,3643",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:11:00",
    "Phase": 1,
    "Value": "47,2896",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:12:00",
    "Phase": 1,
    "Value": "47,7752",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:13:00",
    "Phase": 1,
    "Value": "46,1508",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:14:00",
    "Phase": 1,
    "Value": "44,8005",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:15:00",
    "Phase": 1,
    "Value": "45,8826",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:16:00",
    "Phase": 1,
    "Value": "46,7559",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:17:00",
    "Phase": 1,
    "Value": "47,7751",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:18:00",
    "Phase": 1,
    "Value": "46,5704",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:19:00",
    "Phase": 1,
    "Value": "45,8733",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:20:00",
    "Phase": 1,
    "Value": "46,4146",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:21:00",
    "Phase": 1,
    "Value": "48,3126",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:22:00",
    "Phase": 1,
    "Value": "47,5533",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:23:00",
    "Phase": 1,
    "Value": "46,2325",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:24:00",
    "Phase": 1,
    "Value": "47,4288",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:25:00",
    "Phase": 1,
    "Value": "47,6661",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:26:00",
    "Phase": 1,
    "Value": "45,1195",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:27:00",
    "Phase": 1,
    "Value": "47,3415",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:28:00",
    "Phase": 1,
    "Value": "46,1333",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:29:00",
    "Phase": 1,
    "Value": "46,0914",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:30:00",
    "Phase": 1,
    "Value": "45,9145",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:31:00",
    "Phase": 1,
    "Value": "46,1474",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:32:00",
    "Phase": 1,
    "Value": "45,6122",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:33:00",
    "Phase": 1,
    "Value": "47,243",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:34:00",
    "Phase": 1,
    "Value": "45,1464",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:35:00",
    "Phase": 1,
    "Value": "47,2791",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:36:00",
    "Phase": 1,
    "Value": "47,9831",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:37:00",
    "Phase": 1,
    "Value": "46,8168",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:38:00",
    "Phase": 1,
    "Value": "46,1992",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:39:00",
    "Phase": 1,
    "Value": "46,4182",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:40:00",
    "Phase": 1,
    "Value": "44,8779",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:41:00",
    "Phase": 1,
    "Value": "45,0507",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:42:00",
    "Phase": 1,
    "Value": "46,3998",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:43:00",
    "Phase": 1,
    "Value": "46,6276",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:44:00",
    "Phase": 1,
    "Value": "44,1331",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:45:00",
    "Phase": 1,
    "Value": "47,0545",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:46:00",
    "Phase": 1,
    "Value": "46,4095",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:47:00",
    "Phase": 1,
    "Value": "45,7257",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:48:00",
    "Phase": 1,
    "Value": "44,4857",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:49:00",
    "Phase": 1,
    "Value": "45,8697",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:50:00",
    "Phase": 1,
    "Value": "46,7888",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:51:00",
    "Phase": 1,
    "Value": "46,8088",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:52:00",
    "Phase": 1,
    "Value": "44,7049",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:53:00",
    "Phase": 1,
    "Value": "45,849",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:54:00",
    "Phase": 1,
    "Value": "46,5511",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:55:00",
    "Phase": 1,
    "Value": "46,3408",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:56:00",
    "Phase": 1,
    "Value": "47,4362",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:57:00",
    "Phase": 1,
    "Value": "45,791",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:58:00",
    "Phase": 1,
    "Value": "46,3265",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 21:59:00",
    "Phase": 1,
    "Value": "46,0533",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:00:00",
    "Phase": 1,
    "Value": "45,6984",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:01:00",
    "Phase": 1,
    "Value": "47,0596",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:02:00",
    "Phase": 1,
    "Value": "45,5497",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:03:00",
    "Phase": 1,
    "Value": "5,80901",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:04:00",
    "Phase": 1,
    "Value": "3,18598",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:05:00",
    "Phase": 1,
    "Value": "2,86725",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:06:00",
    "Phase": 1,
    "Value": "2,66163",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:07:00",
    "Phase": 1,
    "Value": "2,55976",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:08:00",
    "Phase": 1,
    "Value": "2,24609",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:09:00",
    "Phase": 1,
    "Value": "2,34251",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:10:00",
    "Phase": 1,
    "Value": "2,24994",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:11:00",
    "Phase": 1,
    "Value": "2,49141",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:12:00",
    "Phase": 1,
    "Value": "16,7827",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:13:00",
    "Phase": 1,
    "Value": "46,216",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:14:00",
    "Phase": 1,
    "Value": "45,7928",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:15:00",
    "Phase": 1,
    "Value": "47,5864",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:16:00",
    "Phase": 1,
    "Value": "46,1316",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:17:00",
    "Phase": 1,
    "Value": "47,5037",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:18:00",
    "Phase": 1,
    "Value": "46,7655",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:19:00",
    "Phase": 1,
    "Value": "47,4098",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:20:00",
    "Phase": 1,
    "Value": "46,8266",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:21:00",
    "Phase": 1,
    "Value": "47,7266",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:22:00",
    "Phase": 1,
    "Value": "48,0134",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:23:00",
    "Phase": 1,
    "Value": "46,0844",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:24:00",
    "Phase": 1,
    "Value": "46,2047",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:25:00",
    "Phase": 1,
    "Value": "46,0646",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:26:00",
    "Phase": 1,
    "Value": "45,4483",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:27:00",
    "Phase": 1,
    "Value": "46,7414",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:28:00",
    "Phase": 1,
    "Value": "45,5551",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:29:00",
    "Phase": 1,
    "Value": "46,7391",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:30:00",
    "Phase": 1,
    "Value": "46,1062",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:31:00",
    "Phase": 1,
    "Value": "45,2587",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:32:00",
    "Phase": 1,
    "Value": "34,479",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:33:00",
    "Phase": 1,
    "Value": "2,61454",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:34:00",
    "Phase": 1,
    "Value": "2,78967",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:35:00",
    "Phase": 1,
    "Value": "2,62693",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:36:00",
    "Phase": 1,
    "Value": "2,69875",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:37:00",
    "Phase": 1,
    "Value": "47,6411",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:38:00",
    "Phase": 1,
    "Value": "22,006",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:39:00",
    "Phase": 1,
    "Value": "38,3343",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:40:00",
    "Phase": 1,
    "Value": "43,8558",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:41:00",
    "Phase": 1,
    "Value": "42,5062",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:42:00",
    "Phase": 1,
    "Value": "44,1652",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:43:00",
    "Phase": 1,
    "Value": "9,34268",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:44:00",
    "Phase": 1,
    "Value": "47,0049",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:45:00",
    "Phase": 1,
    "Value": "59,9824",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:46:00",
    "Phase": 1,
    "Value": "57,23",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:47:00",
    "Phase": 1,
    "Value": "60,4842",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:48:00",
    "Phase": 1,
    "Value": "9,64383",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:49:00",
    "Phase": 1,
    "Value": "34,388",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:50:00",
    "Phase": 1,
    "Value": "37,419",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:51:00",
    "Phase": 1,
    "Value": "54,5401",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:52:00",
    "Phase": 1,
    "Value": "1,09269",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:53:00",
    "Phase": 1,
    "Value": "46,9895",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:54:00",
    "Phase": 1,
    "Value": "12,5681",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:55:00",
    "Phase": 1,
    "Value": "0,886274",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:56:00",
    "Phase": 1,
    "Value": "42,5201",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:57:00",
    "Phase": 1,
    "Value": "49,2951",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:58:00",
    "Phase": 1,
    "Value": "44,9352",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 22:59:00",
    "Phase": 1,
    "Value": "46,1483",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:00:00",
    "Phase": 1,
    "Value": "45,7167",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:01:00",
    "Phase": 1,
    "Value": "45,7175",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:02:00",
    "Phase": 1,
    "Value": "46,7506",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:03:00",
    "Phase": 1,
    "Value": "44,6738",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:04:00",
    "Phase": 1,
    "Value": "44,5678",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:05:00",
    "Phase": 1,
    "Value": "46,4752",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:06:00",
    "Phase": 1,
    "Value": "45,4371",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:07:00",
    "Phase": 1,
    "Value": "46,5457",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:08:00",
    "Phase": 1,
    "Value": "46,1025",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:09:00",
    "Phase": 1,
    "Value": "45,5318",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:10:00",
    "Phase": 1,
    "Value": "46,5977",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:11:00",
    "Phase": 1,
    "Value": "46,2976",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:12:00",
    "Phase": 1,
    "Value": "46,2606",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:13:00",
    "Phase": 1,
    "Value": "46,6617",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:14:00",
    "Phase": 1,
    "Value": "44,9351",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:15:00",
    "Phase": 1,
    "Value": "45,3843",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:16:00",
    "Phase": 1,
    "Value": "45,8983",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:17:00",
    "Phase": 1,
    "Value": "46,788",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:18:00",
    "Phase": 1,
    "Value": "46,7733",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:19:00",
    "Phase": 1,
    "Value": "47,8453",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:20:00",
    "Phase": 1,
    "Value": "47,3827",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:21:00",
    "Phase": 1,
    "Value": "46,1275",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:22:00",
    "Phase": 1,
    "Value": "46,5256",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:23:00",
    "Phase": 1,
    "Value": "46,219",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:24:00",
    "Phase": 1,
    "Value": "45,2798",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:25:00",
    "Phase": 1,
    "Value": "46,3471",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:26:00",
    "Phase": 1,
    "Value": "46,7087",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:27:00",
    "Phase": 1,
    "Value": "47,0952",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:28:00",
    "Phase": 1,
    "Value": "47,6922",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:29:00",
    "Phase": 1,
    "Value": "47,6793",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:30:00",
    "Phase": 1,
    "Value": "47,4635",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:31:00",
    "Phase": 1,
    "Value": "46,9299",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:32:00",
    "Phase": 1,
    "Value": "46,8854",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:33:00",
    "Phase": 1,
    "Value": "47,0029",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:34:00",
    "Phase": 1,
    "Value": "47,672",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:35:00",
    "Phase": 1,
    "Value": "46,7996",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:36:00",
    "Phase": 1,
    "Value": "47,5393",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:37:00",
    "Phase": 1,
    "Value": "48,8641",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:38:00",
    "Phase": 1,
    "Value": "47,8338",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:39:00",
    "Phase": 1,
    "Value": "47,2555",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:40:00",
    "Phase": 1,
    "Value": "47,376",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:41:00",
    "Phase": 1,
    "Value": "46,5208",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:42:00",
    "Phase": 1,
    "Value": "44,9403",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:43:00",
    "Phase": 1,
    "Value": "46,5264",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:44:00",
    "Phase": 1,
    "Value": "47,3826",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:45:00",
    "Phase": 1,
    "Value": "45,6985",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:46:00",
    "Phase": 1,
    "Value": "46,6539",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:47:00",
    "Phase": 1,
    "Value": "46,4846",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:48:00",
    "Phase": 1,
    "Value": "47,6102",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:49:00",
    "Phase": 1,
    "Value": "46,9438",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:50:00",
    "Phase": 1,
    "Value": "46,5183",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:51:00",
    "Phase": 1,
    "Value": "44,2355",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:52:00",
    "Phase": 1,
    "Value": "46,0289",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:53:00",
    "Phase": 1,
    "Value": "44,1208",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:54:00",
    "Phase": 1,
    "Value": "46,3919",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:55:00",
    "Phase": 1,
    "Value": "46,5834",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:56:00",
    "Phase": 1,
    "Value": "45,7841",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:57:00",
    "Phase": 1,
    "Value": "45,0915",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:58:00",
    "Phase": 1,
    "Value": "47,5564",
    "ConvFactor": 0.68
  },
  {
    "Name": "M901 Druckluft Handling",
    "Time": "12.05.2020 23:59:00",
    "Phase": 1,
    "Value": "47,3918",
    "ConvFactor": 0.68
  }
]

<?php
// include_once('dbConnection.php');
error_reporting(-1);
ini_set ('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = isset($_POST['nameDB']) ? $_POST['nameDB'] : 'g008_gipshold';
// $nameDB = 'g000_demo';
session_start();
$conn = connectToDB($nameDB);

class dashboardController {
    public function __construct() {
        $action = $_REQUEST['action'];
        echo json_encode($this->$action());
    }
    public function getDatabaseList(){
        try {
            global $conn;      
            $query = "SELECT TOP 1 ProdData.maschine,ProdData.sollmenge,ProdData.maschinentyp,ProdData.zykluszeit,
            ProdData.artikelnummer,ProdData.werkzeug,ProdData.auftrag,ProdData.nester,ProdData.gutmenge,ProdData_.zeitstempel,ProdData_.ausschuss,ProdData_.gutmenge
             FROM Anlagen 
             JOIN ProdData ON anlagen.anl_ID = ProdData.anl_ID
             JOIN ProdData_ ON anlagen.anl_ID = ProdData_.anl_ID
             WHERE anlagen.datumAnl IS NOT NULL AND anlagen.anl_ID IS NOT NULL
            ORDER BY anlagen.anl_ID desc";
          
            $records = queryDB ( $conn, $query, "read");
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE) ;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
  }
$obj = new dashboardController();

?>
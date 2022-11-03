<?php
error_reporting ( 1 ) ;
ini_set ( 'display_errors', 1 ) ;
// include_once('dbConnection.php');
require '..\..\/php/DbOperations.php';
session_start () ;
$nameDB = isset($_REQUEST['nameDB']) && !empty($_REQUEST['nameDB']) ? $_REQUEST['nameDB'] : 'g002_badber';
$conn = connectToDB($nameDB);
include_once ('MigrationController.php');
class ProductionController {

    public function __construct() {
        global $conn;
        $this->conn = $conn;
        $action = $_REQUEST['action'];
        $this->username = $_SESSION['username'];
        $this->migrationController = new MigrationController();
        echo json_encode($this->$action());
    }


    public function getProductionDetail(){
        try {
            $machineData = $this->getMachineDetailOptimized(); 
            // print_r($machineData);die;
            if($machineData['code'] == 200) {
                return ['status' => 'success', 'code' => 200, 'data' => $machineData['data'], 'message' => 'Prduction details fetched.', 'groups' => $machineData['groups']];
            } else {
                return $machineData; 
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getOrganisationData(){
        try {
            $query = "SELECT * FROM organisationen";
           // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            if(!empty($records)) {
                return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Organisation details fetched.'];
            }
            return ['status' => 'warning', 'code' => 400, 'data' => [], 'message' => 'No record found.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getPropertyData(){
        try {
            $org_id = $_POST['org_id'];
            $query = "SELECT * FROM liegenschaften WHERE org_ID =".$org_id;
           //$records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Property details fetched.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getAnlagenDetails($init = false){
        try {
            $lieg_ID = isset($_POST['prop_id']) && $_POST['prop_id'] != ''?$_POST['prop_id']:null;
            $query = "SELECT anl_ID FROM Anlagen WHERE datumAnl IS NOT NULL AND anl_ID IS NOT NULL AND anl_ID != '' AND deleted = 0 ";
            if(!empty($lieg_ID)){
                $query .=  " AND lieg_ID =".$lieg_ID." ";
            }
            $records = queryDB ( $this->conn, $query, "read");
            //Get Machine present for data
            // $query = "SELECT DISTINCT ProdData_.anl_ID FROM ProdData_";
            // $recordPresent = queryDB ($this->conn, $query, "read");
            $return_data = [];

            

            if(!empty($records)) {
                $group_anl = '';
                $group_record = '';
                $last = 0;
                foreach ($records as $key => $value) {
                    $measuringPoint = '';
                    $group_anl .= $value['anl_ID'].','; 
                }
                // foreach ($recordPresent as $key => $value) {
                //     $group_record .= $value['anl_ID'].',';
                // }
                $group_anl = $this->str_lreplace(',', '', $group_anl);
                //  $group_record = $this->str_lreplace(',', '', $group_record);
                $last = count($records)-1;
                $return_data['group_anl'] = $group_anl;
                $return_data['graphPoints'] = $group_anl;
                $return_data['last'] = $last;
                //  $return_data['group_record'] = $group_record;
            }
            if($init) {
                $data_result = [
                    'group_anl' => isset($return_data['group_anl'])?$return_data['group_anl']:'',
                    // 'group_record' => isset($return_data['group_record'])?$return_data['group_record']:''
                ];
                return  isset($return_data['group_anl'])?$return_data['group_anl']:'';
            }
            return ['status' => 'success', 'code' => 200, 'data' => $return_data,'message' => 'Anlagen details fetched.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getMachineId() {
        try {
            $getIndex = isset($_POST['machineIndex']) && !empty($_POST['machineIndex'])?$_POST['machineIndex']:0;
                if (isset($_POST['dataIndex']) && !empty($_POST['dataIndex'])) {
                    $dataIndex = $_POST['dataIndex'];
                } else {
                     $dataIndex = $this->getAnlagenDetails(true);
                }
                $dataIndex = explode(',', $dataIndex);
                return $dataIndex[$getIndex];
        } catch(Exception $e) {
            return false;
        }
    }

    public function getMachineDetailOptimized()
    {
        try {
            session_write_close();
            // sleep(10);
            // return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
            if($this->migrationController->checkMigration('ProdData_')) {
                
                $machineId = isset($_POST['id']) && !empty($_POST['id'])?$_POST['id']:$this->getMachineId();
                $lieg_ID = isset($_POST['prop_id']) && !empty($_POST['prop_id'])?$_POST['prop_id']:null;
                $machineData = null;
                $prodData = [];
                $colData =[];
                $prod = [];
                $customColumns = [];
                $currentIndex = array_search($machineId, explode(',', $_POST['dataIndex']));
                $machineDataQuery = "SELECT TOP 1 ProdData_.anl_ID,ProdData_.anlageMst,ProdData.maschine,ProdData.sollmenge,ProdData.maschinentyp,ProdData.zykluszeit,
                ProdData.artikelnummer,ProdData.werkzeug,ProdData.auftrag,ProdData.nester,ProdData.gutmenge,
                CONVERT(VARCHAR(10), ProdData_.zeitstempel) as zeitstempel,ProdData_.ausschuss,ProdData_.gutmenge FROM ProdData_ 
                LEFT JOIN ProdData ON ProdData_.anl_ID = ProdData.anl_ID
                WHERE ProdData_.anl_ID=".$machineId." ORDER BY ProdData_.zeitstempel desc";
                $machineData = queryDB ( $this->conn, $machineDataQuery, "read");
                $query = "SELECT CONCAT(messstelle1IDAnl,',',messstelle2IDAnl,',',messstelle3IDAnl,',',messstelle4IDAnl) as graphPoints FROM Anlagen WHERE anl_ID=$machineId";
                $graphData = queryDB ( $this->conn, $query, "read");
                $graphPoints = '';
                if(!empty($graphData)) {
                    $dataGraph = explode(',', $graphData[0]['graphPoints']);
                    foreach($dataGraph as $value) {
                        if(!empty($value)){
                            $graphPoints .= $value.',';
                        }
                    }
                    $graphPoints = $this->str_lreplace(',', '', $graphPoints);
                }
                $groups = [];
                if (!empty($machineData)) {
                    return ['status' => 'success', 'code' => 200, 'anl_ID' => $machineId ,'machine_name'=> $machineData[0]['anlageMst'], 'data' => $machineData[0], 'graphPoints' => $graphPoints, 'message' => 'Prduction details fetched.', 'groups' => $groups, 'currentIndex'=>$currentIndex];
                } else {
                    return ['status' => 'error', 'code' => 404, 'anl_ID' => $machineId , 'machine_name'=> "", 'data' => [], 'graphPoints' => "", 'message' => 'No Record Found!', 'groups' => $groups, 'currentIndex'=>$currentIndex];
                }
            } else {
                return ['status' => 'warning', 'code' => 404, 'data' => [], 'message' => "ProdData_ view does'nt exist!"]; 
            }
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getMachineDetail($id=null, $type=null, $prop_id=null, $fetchAll=null)
    {
        try {
            if($this->migrationController->checkMigration('ProdData_')) {
                $id = isset($_POST['id']) && !empty($_POST['id'])?$_POST['id']:$id;
                $type = isset($_POST['type']) && !empty($_POST['type'])?$_POST['type']:$type;
                $lieg_ID = isset($_POST['prop_id']) && !empty($_POST['prop_id'])?$_POST['prop_id']:$prop_id;
                $machineData = null;
                $prodData = [];
                $colData =[];
                $prod = [];
                $customColumns = [];
                if($fetchAll) {
                    $machineDataQuery = "SELECT TOP 1 * FROM Anlagen 
                        LEFT JOIN ProdData ON anlagen.anl_ID = ProdData.anl_ID
                        LEFT JOIN ProdData_ ON anlagen.anl_ID = ProdData_.anl_ID
                        WHERE anlagen.datumAnl IS NOT NULL AND anlagen.anl_ID IS NOT NULL
                        AND anlagen.deleted = 0";
                        
                } else {
                    $machineDataQuery = "SELECT TOP 1 anlagen.anl_ID,ProdData.maschine, ProdData.sollmenge, ProdData.maschinentyp, ProdData.zykluszeit,
                        ProdData.artikelnummer, ProdData.werkzeug, ProdData.auftrag,ProdData.nester, ProdData.gutmenge,
                        ProdData_.zeitstempel, ProdData_.ausschuss,ProdData_.gutmenge FROM Anlagen 
                        LEFT JOIN ProdData ON anlagen.anl_ID = ProdData.anl_ID
                        LEFT JOIN ProdData_ ON anlagen.anl_ID = ProdData_.anl_ID
                        WHERE anlagen.datumAnl IS NOT NULL AND anlagen.anl_ID IS NOT NULL
                        AND anlagen.deleted = 0";
                }

                if(!empty($lieg_ID)){
                    $machineDataQuery .=  " AND anlagen.lieg_ID =".$lieg_ID." ";
                } 

                switch ($type) {
                    case 'first': 
                        $machineDataQuery .= " ORDER BY anlagen.anl_ID desc ";
                        break;
                    case 'next': 
                        $machineDataQuery .= " AND anlagen.anl_ID >".$id." ORDER BY anlagen.anl_ID asc";
                        break;
                    case 'prev':
                        $machineDataQuery .= " AND anlagen.anl_ID <".$id." ORDER BY anlagen.anl_ID desc";
                        break;
                    case 'last':
                        $machineDataQuery .= " ORDER BY anlagen.anl_ID desc";
                        break;
                    case 'current':
                        $machineDataQuery .= " AND anlagen.anl_ID=".$id." ORDER BY anlagen.anl_ID desc";
                        break;
                    default:
                        break;
                }
                // print_r($machineDataQuery);die;
                // $machineData = $this->conn->query($machineDataQuery)->fetch();
                $machineData = queryDB ( $this->conn, $machineDataQuery, "read");
                $groups = $this->getGroup();
                
                if (!empty($machineData)) {
                    return ['
                    
                    status' => 'success', 'code' => 200, 'data' => $machineData, 'message' => 'Prduction details fetched.', 'groups' => $groups];
                } else {
                    return ['status' => 'error', 'code' => 404, 'data' => [] , 'message' => 'No Record Found!', 'groups' => $groups];
                }
        } else {
            return ['status' => 'warning', 'code' => 400, 'data' => [] , 'message' => 'Table not exists!'];
        }
            
       // return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Prduction details fetched.'];
      //  dd($machineData);
        // if(!empty($machineData)){
        //     // $subGroupId = $this->getSubGroupid($machineData->custom1Anl);
        //     // $primary_key = $this->getPrimaryKey($subGroupId);
        //     $subGroupConfig = [];
        //     $shards = 0;
        //     $chartsData = collect();
        //     $measuringPoint = [];
        //     $msGraphData = [];
        //     $tmpArray =[31,290];
        //     for ($i=1; $i <= count($tmpArray); $i++){
        //         $string = 'messstelle'.$i.'IDAnl';
        //         //  if(!empty($machineData->$string)) {
        //             $shards++;
        //             // dd($machineData->$string);
        //             $measuringPoint['messstelle'.$i.'IDAnl'] = $machineData->$string;
        //             $request = Request::create( '/dashboard/machine', 'POST', ['measuringPoint'=>$tmpArray[$i-1], 'limit' => $limit]);
        //         //    dd($this->graphController->getChartsData($request));
        //             $chartsData->put($string.$i,$this->graphController->getChartsData( $request));
        //             array_push($msGraphData, $tmpArray[$i-1]);
        //         //  }
        //     }
        //     $otherGraphData = $this->getGraphConfigurations($machineData);
        //     $msGraphData = implode(',',$msGraphData);
        //     $dynamicData  = [
        //         'anlage' => Str::of($machineData->maschine)->trim(),
        //         'auftragsmenge' => (int)($machineData->sollmenge),
        //         'programm' => Str::of($machineData->maschinentyp)->trim(),//wrong
        //         'zeit_zyklus' => number_format($machineData->zykluszeit, 2),
        //         'bestellung' =>  Str::of($machineData->artikelnummer)->trim(),
        //         'werkzeug' => Str::of($machineData->werkzeug)->trim(),
        //         'artikel' => Str::of($machineData->auftrag)->trim(),
        //         'kavitäten' =>(int)$machineData->nester,
        //         'gutmenge' => (int)($machineData->gutmenge),
        //         'letzte_störung' => Str::of($machineData->zeitstempel)->trim(),
        //         'ausschuss' => (int)($machineData->ausschuss),
        //         'bisher_produziert' => (int)($machineData->gutmenge),
        //     ];
        //     $prodData =[
        //         'anl_ID' => $machineData->anl_ID,
        //         'bildAnl' => $machineData->bildAnl,
        //         'shards' => $shards,
        //         'machineshards' => $measuringPoint,
        //         'shardsData' => $measuringPoint,
        //         'chartsData' => $chartsData,
        //         'msGraphData' => $msGraphData,
        //         'otherGraph' => $otherGraphData
        //     ];

        //     // dd($prodData);

        //     $customDataMerge = array_merge($dynamicData, $this->getCustomFieldData($machineData));
            
        //     $customColumns = $this->splitArray($customDataMerge, true);
        //     $otherGraphTable = (new ManageDatabaseController)->getOtherGraphData($this->username);
        // //    dd($customColumns);
        // //    dd($customColumns);
        //     //   array_push($prodData, $prod);
        //     // if(!empty($primary_key)) {
        //         //  $primary_key = $machineData->$primary_key;
        //         //   $subGroupConfig = $this->getSubgroupData($subGroupId , $primary_key);
        //         $subGroupConfig = $this->getSubgroupData('6', '2');
                
        //         $customDataMerge = array_merge($customDataMerge, $this->getSubgroupData('6', '2', true));
        //       //  dd($customDataMerge);
        //     //  }
            
        //     $mergeArray = $this->splitArray(array_merge(array_merge($subGroupConfig, $customColumns['extra']['odd']), $customColumns['extra']['even']));
            
        //     //dd($customDataMerge);
        //     return ['code'=>200, 'otherGraph'=>$customDataMerge, 'otherGraphTable'=>$otherGraphTable, 'data' =>$prodData, 'dynamicData' => $customColumns ,'anl_ID'=>$machineData->anl_ID, 'subGroupConfig' => $mergeArray, 'message'=>'Data Retrived Successfully.'];
        // } else {
        //     return ['code'=>401, 'data' =>"", 'message'=>'No Record Found!'];
        // }
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }


    public function getPlantGroupData() {
        try {
            $query = "SELECT * FROM grp.groupOptions";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Plant Group Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function showTablesList() {
        try {
            $query = "SELECT TABLE_NAME FROM information_schema.tables where table_type='Base Table' order by table_name asc";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Tables Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getConfigurationData() {
        try {
            $subGroupId = isset($_POST['grosubGroupId']) && !empty($_POST['grosubGroupId'])?$_POST['grosubGroupId']:null;
            if($subGroupId) {
                $records = $this->getSavedConfiguration($subGroupId);
                if(empty($records)){
                    $table_name = $_POST['table_name'];
                    $query = "SELECT * FROM information_schema.columns WHERE table_name ='Anlagen'";
                    $records = queryDB ( $this->conn, $query, "read");
                }
                return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Configuration Data Fetched.'];
            }
            return ['status' => 'warning', 'code' => 400, 'data' => [], 'message' => 'No Record Found!'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getSavedConfiguration($subGroupId) {
        try {
            $query = "SELECT column_name as COLUMN_NAME FROM SubGroupConfiguration 
                        WHERE sub_group_id=$subGroupId AND username='$this->username' AND status = '1'";         
            return queryDB ( $this->conn, $query, "read");  
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }

    }

    public function showPrimaryKeyList() {
        try {
            $query = "SELECT * FROM information_schema.columns WHERE table_name = 'anlagen'";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Primary Key List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function showForeignKeyList() {
        try {
            $table_name = $_POST['table_name'];
            $query = "SELECT * FROM information_schema.columns WHERE table_name ="."'".$table_name."'";
            // $records = $this->conn->query($query)->fetcLECT * hAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Foreign Key List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function saveConfigurationData() {
        try {
            
            $userName = $_SESSION['username'];
            $status = '1';

            $data = $_POST['data'];
            $table = 'analage';
            $subGroupId = $data['sub_group_id'];
            $column = $data['column'];
            $label = $data['label'];
            $graph_value = $data['graph_value'];
            $foreign_key = 'anl_ID';
            $primary_key ='anl_ID';

            $sql_sub_group_option = "SELECT group_id FROM subGroupOptions WHERE id='".$subGroupId."' ";
            // $row_sub_group_option = $this->conn->query($sql_sub_group_option)->fetch();
            $row_sub_group_option = queryDB ( $this->conn, $sql_sub_group_option, "read");
            
            $groupId = $row_sub_group_option[0]['group_id'];

            for($i=0;$i<count($column);$i++) {
                $columnData = [
                    'group_id' => $groupId,
                    'sub_group_id' => $subGroupId,
                    "username"=> $userName,
                    'table_name' => $table,
                    'column_name' => $column[$i],
                ];
                $data[$i]=[
                    'label_name' => $label[$i],
                    'primary_key' => $primary_key,
                    'foreign_key' => $foreign_key,
                    'status' => $status,
                    'is_graph' => $graph_value[$i]
                ];
                
                // check entry
                $sql = "SELECT COUNT(*) AS count_sgc FROM SubGroupConfiguration WHERE sub_group_id='".$subGroupId."' AND username='".$userName."' AND table_name='".$table."' AND column_name='".$column[$i]."' ";
                // $row = $this->conn->query($sql)->fetch();
                $row = queryDB ( $this->conn, $sql, "read");
                $count = $row[0]['count_sgc'];
                if($count > 0){
                    $updatequery = "UPDATE SubGroupConfiguration SET eAnl_ID=1, sub_group_id='".$subGroupId."', username='".$userName."', table_name='".$table."', column_name='".$column[$i]."', label_name='".$label[$i]."', status='".$status."', is_graph='".$graph_value[$i]."' WHERE group_id='".$groupId."' AND sub_group_id='".$subGroupId."' AND username='".$userName."' AND table_name='".$table."' AND column_name='".$column[$i]."' ";
                    $update_records = queryDB ( $this->conn, $updatequery, "write");  
                } else {
                    $insertquery = "INSERT INTO SubGroupConfiguration ( sub_group_id, eAnl_ID, username, table_name, column_name, label_name, status, is_graph ) VALUES ('$subGroupId', 1, '$userName', '$table', '$column[$i]', '$label[$i]', '$status', '$graph_value[$i]')";
                    $insert_records = queryDB ( $this->conn, $insertquery, "write");
                }               
            }
            return ['status' => 'success', 'code' => 200, 'data' => 'Insert OR Update successfully', 'message' => 'Save Configuration Data'];
            
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function showColumnList() {
        try {
            $table_name = $_POST['table_name'];
            $query = "SELECT * FROM information_schema.columns WHERE table_name ="."'".$table_name."'";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Columns List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    
    public function showForeignKeyTypeList() {
        try {
            $table_name = $_POST['table_name'];
            $primary_key = $_POST['primary_key'];
            
            // echo "<pre>";
            // echo $primary_key; 
            // echo "<br>";
            // echo gettype($primary_key);
            // echo "</pre>";
            // die;

            $query = "SELECT * FROM information_schema.columns WHERE table_name ="."'".$table_name."'";
            $records = queryDB ( $this->conn, $query, "read");
            // $records = $this->conn->query($query)->fetchAll();

            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Foreign Key Type List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }


    public function saveFields() {
        try {
            $anl_ID = $_POST['anl_ID'];
            $nameDB = $_POST['nameDB'];
            $label_name = $_POST['label'];
            $table_name = $_POST['table'];
            $user_name = $_SESSION['username'];
            $column_name = $_POST['column'];
            $primary_key = $_POST['primary_key'];
            $foreign_key = $_POST['foreign_key']; 
            $status = '1';
            $graph = $_POST['graph'];

            $insertquery = "INSERT INTO dashboardProduktionConfig ( label_name, table_name, username, column_name, primary_key, foreign_key, status, is_graph, anl_ID, dbName ) VALUES ('$label_name', '$table_name', '$user_name', '$column_name', '$primary_key', '$foreign_key', '$status', '$graph', '$anl_ID', '$nameDB')";

            // $insert_records = $this->conn->prepare($insertquery)->execute();
            $insert_records = queryDB ( $this->conn, $insertquery, "write");

            return ['status' => 'success', 'code' => 200, 'data' => 'Insert successfully', 'message' => 'Save Configuration Data'];
            
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }

    }

    public function getGroupOptionsList() {
        try {
            $query = "SELECT * FROM subGroupOptions";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Group Options Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getDynamicColumnListing() {
        try {
            
            if($this->migrationController->checkMigration('ProdData_')) {
                
                $machineId = $machineId = isset($_POST['id']) && !empty($_POST['id'])?$_POST['id']:$this->getMachineId();
                $property_id = !empty($_POST['property_id'])?$_POST['property_id']:null;
                
                if($machineId) {
                    $machineDataQuery = "SELECT custom1Anl,nummerAnl FROM anlagen WHERE anl_ID=".$machineId;
                    $machineData = queryDB ( $this->conn, $machineDataQuery, "read");
                    $query = "SELECT * FROM dashboardProduktionConfig";
                    // $data = $this->conn->query($query)->fetchAll();
                    $data = queryDB ( $this->conn, $query, "read");
                //  print_r($data);die;
                    $columnData = [];
                    // if (!empty($data)) {
                    //     foreach($data as $tableData) {
                    //         $primary_key = $tableData['primary_key'];
                    //         $where_value = $machine_data[$primary_key];
                    //         if(!empty($machine_data[$primary_key])) {
                    //             $dynamic_columns = $tableData['column_name']." AS '".$tableData['label_name']."' ";
                    //             $dynamic_data_query = "SELECT TOP 1 $dynamic_columns FROM ".$tableData['table_name']." WHERE 
                    //             ".$tableData['foreign_key']."=".$where_value;
                                
                    //             //print_r($dynamic_data_query);die;
                    //             // $dynamic_data = $this->conn->query($dynamic_data_query)->fetch();
                    //             $records = queryDB ( $this->conn, $query, "read");
                    //             $columnData[$tableData['label_name']] = isset($dynamic_data['label_name'])?$dynamic_data['label_name']:null;
                    //         } 
                    //     }
                    // }
                    
                    // get sub group configuration options
                    $subGroupId = $this->getSubGroupid($machineData[0]['custom1Anl']);
                    
                    $primary_key = 'anl_ID';
                    
                    $subGroupConfig = [];
                    // print_r($primary_key);die;
                    // if(!empty($primary_key)) {
                    //     $primary_key = $machineData['$primary_key'];
                    // $subGroupConfig = $this->getSubgroupData($subGroupId , $primary_key);
                        $subGroupConfig = $this->getSubgroupData('6', '2', false, $machineId);
                    //print_r($subGroupConfig);die;
                // }
                    // $singular = $this->convertMultipleColumnArrayToSingle($subGroupConfig);

                    // $customDataMerge = array_merge($singular, $columnData);
    
                    return ['code' => 200, 'data' => $this->splitArray($subGroupConfig), 'anl_id' => $machineId, 'machine_name' => $machineData[0]['nummerAnl'], 'status' =>'success'];
                } else {
                    return ['code' => 404, 'data' => [], 'status' =>'error', 'msg' => 'No Record Found!'];
                }
            } else {
                return ['status' => 'warning', 'code' => 404, 'data' => [], 'message' => "ProdData_ view does'nt exist!"]; 
            }
        } catch(Exception $ex) {
            // print_r($ex);die;
            return ['status' => 'error', 'code' => 500, 'message' => $ex];
        }
    }

    public function convertMultipleColumnArrayToSingle($data) {
        $retData = [];
        foreach($data as $multi) {
            foreach($multi as $key => $value) {
                $retData[$key] =$value;
            }
        }
        return $retData;
    }

    public function getSubgroupData($option , $where, $is_graph=false, $machineId) {
        try {
            $query = "SELECT column_name as dynamicString FROM grp.groupConfig 
                        WHERE sub_group_id=$option AND username='$this->username' AND status = '1'";         
            $records = queryDB ( $this->conn, $query, "read");

            $dynamic_string = '';
            foreach ($records as $value) {
                if($value['dynamicString'] == 'datumAnl') {
                    $dynamic_string .= "CONVERT(VARCHAR(10), ".$value['dynamicString'].") as ".$value['dynamicString'].",";
                } else {
                    $dynamic_string .= $value['dynamicString'].',';
                }
            }
            $dynamic_string = $this->str_lreplace(',', '', $dynamic_string);

            if(!empty ($dynamic_string)){
                $dataQuery = "SELECT TOP 1 ".$dynamic_string." FROM Anlagen WHERE anl_ID=".$machineId;
                $sqlData = queryDB ( $this->conn, $dataQuery, "read");
                return $sqlData[0];
            } else {
                return [];
            }
        } catch(Exception $ex) {
            return ['status' => 'error', 'code' => 500, 'message' => $ex];
        }
    }

    public function createCustomQuery($data) {
        try {
            $numItems = count($data);
            if($numItems == 0) return ['status' => 400, 'query' => null];
            $query = '';
            $table = $data['0']['table_name'];
            $foreign_key = $data['0']['foreign_key'];
            $i = 0;
            foreach($data as $value) {
                if(++$i === $numItems) {
                    $query .= $value['column_name'].' AS "'.$value['label_name'].'" ';
                } else {
                    $query .= $value['column_name'].' AS "'.$value['label_name'].'", ';
                }
            }
            return ['status' => 200, 'rawSelect' => $query, 'table' =>$table, 'foreign_key' => $foreign_key];
        } catch (Exception $exc) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }


    public function getSubGroupid($option) {
        if(empty($option)) return null;
        $query = "SELECT TOP 1 * FROM grp.groupOptions 
                    WHERE option_name='$option'";
       // print_r($query);die;       
            $data = queryDB ( $this->conn, $query, "read");     
        // $data = $this->conn->query($query)->fetch();
      //  print_r($data);die; 
        return isset($data['id'])?$data['id']:null;
    }

    public function getPrimaryKey($option) {
        if(empty($option)) return null;
        $query = "SELECT TOP 1 primary_key FROM groupConfig 
                    WHERE sub_group_id='$option'";
        // $data = $this->conn->query($query)->fetch();
        $data = queryDB ( $this->conn, $query, "read");     
        
        return isset($data['primary_key'])?$data['primary_key']:null;
    }

    public function splitArray($data, $customData=false) {
        $odd = array();
        $even = array();
        $extraOdd = array();
        $extraEven = array();
        $i = 0;
        if(!empty($data)) {
            foreach ($data as $k => $v) {
                if ($i > 11 && $customData) {
                    if ($i % 2 == 0) {
                        $extraEven[$k] = $v;
                    }
                    else {
                        $extraOdd[$k] = $v;
                    }
                } else {
                    if ($i % 2 == 0) {
                        $even[$k] = $v;
                    }
                    else {
                        $odd[$k] = $v;
                    }
                }
                $i++;
            }
        }
        return ['main' => ['odd'=>$odd, 'even' =>$even], 'extra' =>['odd'=>$extraOdd, 'even' =>$extraEven]];
    }
          
    // new code
    public function getmachineDetails() {
        try {

            $sql = "SELECT machines FROM machine_priority WHERE username='".$this->username."'";
            $machinePriority = queryDB ( $this->conn, $sql, "read");
            $selectedData = [];

            $selectedQuery = "SELECT column_name FROM machine_table_config WHERE username='$this->username' AND status !='0' AND column_name != 'anl_ID'";
            $columnData = queryDB ( $this->conn, $selectedQuery, "read");
            
            $columnsString = 'CONVERT(VARCHAR(10),datumAnl) as datumAnl, nummerAnl, bezeichnungAnl';
            $columnArray = ["anl_ID","datumAnl","nummerAnl","bezeichnungAnl"];
            $columnDataArray = [
                ["data" => "anl_ID"],
                ["data" => "datumAnl"],
                ["data" => "nummerAnl"],
                ["data" => "bezeichnungAnl"]
            ];
            if(!empty($columnData)) {
                $columnDataAr = array_map('current', $columnData);
                $columnData = '';
                $columnsString = '';
                $columnArray = ["anl_ID"];
                $columnDataArray = [["data" => "anl_ID"]];
                foreach ($columnDataAr as $value ) {
                    array_push($columnArray, $value);
                    array_push($columnDataArray, ["data" => $value]);
                    if($value == 'datumAnl') {
                        $columnsString .= 'CONVERT(VARCHAR(10),datumAnl) as datumAnl , ';
                    } else {
                        $columnsString .= $value.', ';
                    }
                }
                $columnsString = $this->str_replace_last(', ', '', $columnsString);
            }
            
            if(!empty($machinePriority[0])) {
                $selectedId = json_decode($machinePriority[0]['machines']);
                $selectedId = implode(',', $selectedId);
                //print_r($selectedId);die;
                $selectedQuery = "SELECT anl_ID, $columnsString FROM anlagen WHERE anl_ID IN ($selectedId)";
                $selectedData = queryDB ( $this->conn, $selectedQuery, "read");    
                $query = "SELECT anl_ID, $columnsString FROM anlagen WHERE anl_ID NOT IN ($selectedId) AND datumAnl IS NOT NULL AND deleted =0 ORDER BY anl_ID";
            } else {
                $query = "SELECT anl_ID, $columnsString FROM anlagen WHERE datumAnl IS NOT NULL AND deleted =0 ORDER BY anl_ID ASC";
            }
            
            
            // $columnData = $this->addSelectedOption($columnData,'2');

            
           // print_r($query);die;
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
            
            $records = array_merge($selectedData, $records);
            //print_r($records);die;

            
            // foreach($records as $value) {
            //     array_push($columnDataArray, ["data"=>$value['label']]);
            // }

        //    print_r($columnDataArray);die;

            // $columnString = $this->str_lreplace(', ', "", $columnString);
            // $query = 'SELECT '.$columnString.' FROM ProdData';
            // $records = $this->conn->query($query)->fetchAll();
            return ['status' => 'success', 'code' => 200, 'data' => $records, 'columnName'=>$columnArray, 'dataTable' => $columnDataArray, 'message' => 'Data Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function str_lreplace($search, $replace, $subject)
    {
        $pos = strrpos($subject, $search);

        if($pos !== false)
        {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }

        return $subject;
    }
    

    public function getmachinecolumn() {
        try {
            $query = "SELECT COLUMN_NAME
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_NAME = 'ProdData'";
            $records = queryDB ( $this->conn, $query, "read");
            $i = 0;
            $array = array();
            foreach($records as $key=> $val)
            {
                $a[$key] =  $records[$i]['COLUMN_NAME'];
            
                $i++;
            }
            return [ 'data' => $a];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function getMachineColumns() {
        try{
            $query = "SELECT anlagen.anl_ID,anlagen.nummerAnl FROM Anlagen 
            WHERE anlagen.nummerAnl IS NOT NULL AND anlagen.anl_ID IS NOT NULL AND anlagen.deleted =0 AND anlagen.anl_ID != 0
            ORDER BY anlagen.anl_ID asc";
            // $records = $this->conn->query($query)->fetchAll();
            $records = queryDB ( $this->conn, $query, "read");
        return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Columns List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function SaveMachineColumns() {
        try {
            $userName = $this->username;
            // check entry
            $sql = "SELECT COUNT(*) AS count_mp FROM  machine_priority WHERE username='".$username."'";
            // $row = $this->conn->query($sql)->fetch();
            $row = queryDB ( $this->conn, $query, "read");
            $count = $row['count_mp'];
            if($count > 0){
                $updatequery = "UPDATE machine_priority SET username='".$userName."' ";
                // $update_records = $this->conn->prepare($updatequery)->execute();
                $update_records = queryDB ( $this->conn, $query, "write");  
            } else {
                $insertquery = "INSERT INTO machine_priority (username ) VALUES ('$userName')";
                // $insert_records = $this->conn->prepare($insertquery)->execute();
                $insert_records = queryDB ( $this->conn, $query, "write");  
            }
            return ['status' => 'success', 'code' => 200, 'data' => 'Insert OR Update successfully', 'message' => 'Save Configuration Data'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }


    public function getMachineConfigurations() {
        try{

            $userName = $this->username;
            // MigrationController::createMachineTableConfigurations();
            $columnData = "SELECT column_name FROM machine_table_config WHERE username='$userName' AND status !='0'";
            // $columnData = $this->conn->query($columnData)->fetchAll();
          
            $columnData = queryDB ( $this->conn, $columnData, "read");
            
            if(json_encode(array_map('current', $columnData))){
                $columnData = array_map('current', $columnData);
            }else{
                $columnData = [];
            }
          //  print_r($columnData);die;
            
            $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
                'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
            $combinedData = $this->getAnlagenColumn();
            $combinedData = array_map('current', $combinedData['data']);
            $machinePriorityData = $this->getPriorityMachineData();
            
            if(empty($columnData)){
                return ['status' => 200, 'data' => $this->addSelectedOption($combinedData,'') , 'machinePriorityData' => $machinePriorityData];
            }
            // $addoptions = $this->addSelectedOption(array_diff($combinedData,$columnData),'');
            // $addOption =  $this->addSelectedOption($columnData,'selected');
         
            $combinedData = array_merge($this->addSelectedOption(array_diff($combinedData,$columnData),''), $this->addSelectedOption($columnData,'selected'));
        //    print_r($combinedData);die;
            return ['status'=>200, 'data' => $combinedData , 'machinePriorityData' => $machinePriorityData];
         
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }


    public function getPriorityMachineData() {
        try{
            $columnData = "SELECT TOP 1 machines FROM machine_priority WHERE username='$this->username'";
            // $columnData = $this->conn->query($columnData)->fetch();
            $columnData = queryDB ( $this->conn, $columnData, "read");
            $selectedMachines = [];
            // print_r($columnData);die;
            if(!empty($columnData[0])) {
                $selectedMachines = json_decode($columnData[0]['machines']);
                // $selectedMachines = implode(',', $selectedMachines);
            }
            $allMachines= "SELECT anlagen.anl_ID,anlagen.nummerAnl FROM anlagen WHERE nummerAnl != '' ";
            // $allMachines = $this->conn->query($allMachines)->fetchAll();
            $allMachines = queryDB ($this->conn, $allMachines, "read");   
            return ['selected' => $selectedMachines, 'allMachines'  => $allMachines];
            // return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Columns List Fetched'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function addSelectedOption($data, $option) {
            $selectedData = [
                'anlage' => 'anl_ID', 
                'auftragsmenge' => 'sollmenge', 
                'programm' => 'maschinentyp', 
                'zeit_zyklus' => 'zykluszeit', 
                'bestellung' => 'artikelnummer', 
                'werkzeug' => 'werkzeug', 
                'artikel' => 'auftrag', 
                'kavitäten' => 'nester', 
                'gutmenge' => 'gutmenge', 
                'letzte_störung' => 'zeitstempel', 
                'ausschuss' => 'ausschuss', 
                'bisher_produziert' => 'gutmenge'];
        $columnData = [];
        if(!empty($data)) {
            foreach($data as $value){
                $label = null;
                if($option == '2'){
                    $label = isset($selectedData[$value])?$selectedData[$value]:null;
                }
                array_push($columnData,['column' => $value, 'option' => $option, 'label' => $label]);
            }
        }
        return $columnData;
    }    

    public function saveMachineConfigurations() {
        try{
            $columns = ['anlage', 'auftragsmenge', 'programm', 'zeit_zyklus', 'bestellung', 'werkzeug', 'artikel', 'kavitäten',
                'gutmenge', 'letzte_störung', 'ausschuss', 'bisher_produziert'];
            $selectedColumns = $_POST['column'];
            $defaultColumns = $this->addSelectedOption(array_intersect($columns,$selectedColumns), '2');
            $customColumns = $this->addSelectedOption(array_diff($selectedColumns,$columns), '1');
            $selecteData = array_merge($defaultColumns, $customColumns);
           // print_r($selecteData);die;
            $this->savePriorityList($_POST['priorityMachines']);
            if(!empty($selecteData)) {
                $updatequery = "UPDATE machine_table_config SET status='0' WHERE username='$this->username'";
                // $update_records = $this->
                //update all records for particular uconn->prepare($updatequery)->execute();
                $update_records = queryDB ( $this->conn, $updatequery, "write");
                //print_r($selecteData);die;
                foreach($selecteData as $value){
                    //update column values
                    if($value['option'] == 2){
                        $table = 'ProdData';
                    } else {
                        $table = null;
                    }
                   
                    $column_name = $value['column'];
                    $status = $value['option'];
                    $label_name = $value['label'];
                    $table_name = $table;


                    $query = "SELECT TOP 1 * FROM machine_table_config WHERE username='$this->username' AND column_name ='$column_name'";
                
                    // $tableConfig = $this->conn->query($query)->fetch();
                    $tableConfig = queryDB ( $this->conn, $query, "read");
                   // print_r( $tableConfig);

                    if (empty($tableConfig)) {
                        $insertquery = "INSERT INTO machine_table_config (username, column_name, status, label_name, table_name) VALUES ('$this->username', '$column_name', '$status', '$label_name', '$table_name')";
                        // $insertquery = "INSERT INTO machine_table_config WHERE username = '$this->username' AND column_name='$value['column']' ";
                        // $insert_records = $this->conn->prepare($insertquery)->execute();
                     //   print_r($insertquery);die;
                        $insert_records = queryDB ( $this->conn, $insertquery, "write");
                    } else {
                        $update_id = $tableConfig[0]['id'];
                        $updatequery = "UPDATE machine_table_config SET status='$status', label_name='$label_name', table_name='$table' WHERE id='$update_id'";
                        // $update_records = $this->conn->prepare($updatequery)->execute();
                        $update_records = queryDB ( $this->conn, $updatequery, "write");
                    }
                        // TableConfiguration::updateOrCreate($columnData, $data);
                }
            }
            return ['status' => 'success', 'code' => 200, 'data' => 'Insert OR Update successfully', 'message' => 'Save Configuration Data'];
        } catch (Exception $e) {
            return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
        
    }

    public function savePriorityList($data) {
        if(!empty($data)) {
            $machineData = json_encode($data);
            $query = "SELECT TOP 1 * FROM machine_priority WHERE username='$this->username'";
            // $tableConfig = $this->conn->query($query)->fetch();
            $tableConfig = queryDB ( $this->conn, $query, "read");
            if (empty($tableConfig[0])) {
                $insertquery = "INSERT INTO machine_priority (machines,username) VALUES ('$machineData','$this->username')";            
                // $insert_records = $this->conn->prepare($insertquery)->execute();
                $insert_records = queryDB ( $this->conn, $query, "write");
            } else {
                $updatequery = "UPDATE machine_priority SET machines='$machineData' WHERE username='$this->username'";
                // $update_records = $this->conn->prepare($updatequery)->execute();
                $update_records = queryDB ( $this->conn, $query, "write");
            }
        }
        return;
    }

    public static function createMultiTableQuery($data) {
        $numItems = count($data);
        if($numItems == 0) return ['status' => 400, 'query' => null];
        $query = [];
        $i = 0;
        foreach($data as $value) {
            if(++$i === $numItems) {
                if(isset($query[$value['foreign_key']])){
                    $query[$value['foreign_key']]['query'] .= $value['column_name'].' AS "'.$value['label_name'].'", ';
                } else {
                    $query[$value['foreign_key']]['query'] = $value['column_name'].' AS "'.$value['label_name'].'", ';
                }
            } else {
                if(isset($query[$value['foreign_key']])){
                    $query[$value['foreign_key']]['query'] .= $value['column_name'].' AS "'.$value['label_name'].'", ';
                } else {
                    $query[$value['foreign_key']]['query'] = $value['column_name'].' AS "'.$value['label_name'].'", ';
                }
            }
            
            $query[$value['foreign_key']]['foreign_key'] = $value['foreign_key'];
            $query[$value['foreign_key']]['table'] = $value['table_name'];
            $query[$value['foreign_key']]['primary_key'] = $value['primary_key'];
        }
       // print_r($query);die;
        return ['status' => 200, 'rawSelect' => $query];
    }

    public function getGroup(){
        $groupData=[];
        $query = "SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dbo' AND  TABLE_NAME = 'ErweiterungenAnlagen'";
      //  $table_check = $this->conn->query($query)->fetch();
        $table_check = queryDB ( $this->conn, $query, "read");
       // print_r($table_check);die;
        if (!empty($table_check)) {
            $query = "SELECT * FROM subGroupOptions";
          //  $result1 = $this->conn->query($query)->fetchAll();
            $result1 = queryDB ( $this->conn, $query, "read");
            if (count($result1)>0 ) {
                $query = "SELECT * FROM ErweiterungenAnlagen
                JOIN subGroupOptions ON ErweiterungenAnlagen.eAnl_ID=subGroupOptions.group_id";
               // $result = $this->conn->query($query)->fetchAll();
                $result = queryDB ( $this->conn, $query, "read");
                if(count($result)>0){
                    $groupData = $result;
                }  
            } else {
                $query = "SELECT * FROM ErweiterungenAnlagen";
              //  $result = $this->conn->query($query)->fetchAll();
                $result = queryDB ( $this->conn, $query, "read");
                foreach($result as $option){
                    $groupId = $option['eAnl_ID'];
                    $options = explode(',', $option['optionen']);
                    foreach($options as $stringOptions){
                        // $data=array(
                        // "option_name"=>$stringOptions, 
                        // "group_id"=>$groupId,
                        // "username"=>$this->username,
                        // "status"        =>  '1');
                        $query = "SELECT TOP 1 * FROM subGroupOptions WHERE username='$this->username' AND option_name ='$stringOptions' AND group_id ='$groupId' AND status ='1'";
                       // $tableConfig = $this->conn->query($query)->fetch();
                        $tableConfig = queryDB ( $this->conn, $query, "read");
                        // print_r( $tableConfig);die;

                        if (empty($tableConfig)) {
                            $insertquery = "INSERT INTO subGroupOptions (username, option_name, status, group_id) VALUES ('$this->username', '$stringOptions', '1', '$groupId')";
                            // $insertquery = "INSERT INTO machine_table_config WHERE username = '$this->username' AND column_name='$value['column']' ";
                            // $insert_records = $this->conn->prepare($insertquery)->execute();
                            $insert_records = queryDB ( $this->conn, $query, "write");
                        } else {
                            $update_id = $tableConfig['id'];
                            // $updatequery = "UPDATE subGroupOptions SET status='$status', label_name='$label_name', table_name='$table' WHERE id='$update_id'";
                            $updatequery = "UPDATE subGroupOptions SET option_name='$stringOptions',group_id='$groupId',username='$this->username', status='1' WHERE id='$update_id'";
                            // $update_records = $this->conn->prepare($updatequery)->execute();
                            $update_records = queryDB ( $this->conn, $query, "write");
                        }

                        // subGroupOptions::updateOrCreate($data)
                        // $updatequery = "UPDATE subGroupOptions SET option_name='$stringOptions',group_id='$groupId',username='$this->username', status='1' WHERE id='$update_id'";
                        // $update_records = $this->conn->prepare($updatequery)->execute();
                    }
                }
                // $result = subGroupOptions::get()->toArray();
                $query = "SELECT * FROM subGroupOptions";
                // $result = $this->conn->query($query)->fetchAll();
                $result = queryDB ( $this->conn, $query, "read");
                $msg = "Record inserted successfully.";
                if (count($result)>0) {
                    $groupData = $result;
                }
            }
            return ['groupData'=>$groupData];       
        } else {
            $groupData = "ErweiterungenAnlagen Table not found";
            return ['groupData'=>[], 'msg'=>$groupData]; 
        } 
    }

    public function saveGroupOptions()
    { 
        
        $group_id     = $_POST['group_id'];
        $option_name  = $_POST['sub_group_name'];
        $msg = '';
        $data = [];
       
        if(!empty($option_name)){
            foreach($option_name as $option){
                $query = "SELECT TOP 1 * FROM subGroupOptions WHERE option_name ='$option' AND group_id ='$group_id' AND status ='1'";
                // $tableConfig = $this->conn->query($query)->fetch();
               
                $tableConfig = queryDB ( $this->conn, $query, "read");
            //    print_r($tableConfig);die;

                if (empty($tableConfig)) {
                    $insertquery = "INSERT INTO subGroupOptions (option_name, status, group_id) VALUES ('$option', '1', '$group_id')";
                    // $insertquery = "INSERT INTO machine_table_config WHERE username = '$this->username' AND column_name='$value['column']' ";
                    // $insert_records = $this->conn->prepare($insertquery)->execute();
                    $insert_records = queryDB ( $this->conn, $query, "write");
                } else {
                    $update_id = $tableConfig[0]['id'];
                    // $updatequery = "UPDATE subGroupOptions SET status='$status', label_name='$label_name', table_name='$table' WHERE id='$update_id'";
                    $updatequery = "UPDATE subGroupOptions SET option_name='$option',group_id='$group_id',status='1' WHERE id='$update_id'";
                    // $update_records = $this->conn->prepare($updatequery)->execute();
                    $update_records = queryDB ( $this->conn, $query, "write");
                }
            }
            $msg = "Record updated successfully.";
            $query = "SELECT * FROM subGroupOptions WHERE group_id='$group_id'";
            // $data = $this->conn->query($query)->fetchAll();
            $data = queryDB ( $this->conn, $query, "read");
            return ['status' => 200, 'msg' =>$msg, 'data'=>$data];
        } else {
            return ['status' => 400, 'msg' =>'Error occured while inserting record.'];
        }
    }

    public function deletesaveGroupOptions(){
        try{
            $id     = $_POST['id'];
            $query = "DELETE FROM subGroupOptions WHERE id ='$id'";
            // $data = $this->conn->query($query)->execute();
            $data = queryDB ( $this->conn, $query, "write");
            return ['code' => 200, 'message' =>'Record deleted successfully.'];
        }catch(Exception $e) {
            return ['code' => 'error', 'code' => 500, 'message' => $e->getMessage()];
        }
    }

    public function str_replace_last($search, $replace, $subject) {
        $pos = strrpos($subject, $search);
        if ($pos !== false) {
            $subject = substr_replace($subject, $replace, $pos, strlen($search));
        }
        return $subject;
    }
     
public function getSubGoupConfiguration(){
    try{
        $id = $_POST['grosubGroupId'];
        $query = "SELECT * FROM SubGroupConfiguration where id='$id'";
        $records = queryDB ( $this->conn, $query, "read");
        return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Organisation details fetched.'];
    }catch(Exception $e) {
        return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }
 }
   
 public function getAddGoupConfiguration(){
    try {
        $id = '0';
        $label = $_POST['label'];
        $table_name = 'anlagen';
        $data = '';
        $type = ''; 
        $username = $_SESSION['username'];
        $graph_name = $_POST['graph'];
        $primary_key = "anl_ID";
        $foreign_key = "anl_ID"; 
        $status = '1';
        $is_open = $_POST['is_open'];
        $graph_text = $_POST['textDB'];
        
        $sql = "SELECT COUNT(*) AS count_mp FROM  graph_configurations WHERE username='".$username."'";
        $countRecord = queryDB ( $this->conn, $sql, "read");
        // print_r($countRecord);die;
        if($countRecord[0]['count_mp'] >= 5) {
            return ['status' => 'success', 'code' => 404, 'message' => 'Max number of records.'];
        }
        
        $selectQuery = "SELECT * FROM graph_configurations WHERE username= '$username' AND label= '$label'";
        $record = queryDB ( $this->conn, $selectQuery, "read");
        if(!empty($record)) {
            $updateId = $record[0]['id'];
            $updatequery = "UPDATE graph_configurations SET graph_name='$graph_name', graph_text='$graph_text' WHERE id = '$updateId'";  
            $update_records = queryDB ( $this->conn, $updatequery, "write");
        } else {
            $insertquery = "INSERT INTO graph_configurations(label, table_name, data, type, username, graph_name, primary_key, foreign_key, status, is_open, graph_text) VALUES ('$label', '$table_name', '$data', '$type', '$username', '$graph_name', '$primary_key', '$foreign_key', '1', '$is_open', '$graph_text')";
            $insert_records = queryDB ( $this->conn, $insertquery, "write");
        }
        return ['status' => 'success', 'code' => 200, 'data' => 'Insert successfully', 'message' => 'Save Configuration Data'];
        
    } catch (Exception $e) {
        return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }

}

public function showConfigurationData() {

    try {
        $username = $_SESSION['username'];
        $selectQuery = "SELECT * FROM graph_configurations WHERE username= '$username'";
        $record = queryDB ( $this->conn, $selectQuery, "read");
        if(!empty($record)) {
            return ['status' => 'success', 'code' => 200, 'data' => $record, 'message' => 'Configuration Data Fetched.'];
        }
        return ['status' => 'warning', 'code' => 400, 'data' => [], 'message' => 'No Record Found!'];
    }catch (Exception $e) {
        return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }
}

public function deleteGraphConfiguration(){
    try{
        $id = $_POST['id'];
        $query = "DELETE FROM graph_configurations WHERE id ='$id'";
        $data = queryDB ( $this->conn, $query, "write");
        return ['code' => 200, 'message' =>'Record deleted successfully.'];
    }catch(Exception $e) {
        return ['code' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }
}

public function getProdDataColumn() {
    try {
        $excludeColumn = ['prdData_ID', 'anl_ID', 'anlageMst', 'maschinenID', 'maschine', 
        'maschinentyp', 'auftrag', 'artikelnummer', 'werkzeug', 'timeUnlock', 'timeClose'];
        $query = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name ='ProdData'";
        $records = queryDB ( $this->conn, $query, "read");
        $data_array = [];
        foreach($records as $key=>$value ) {
            if(in_array($value['COLUMN_NAME'], $excludeColumn)) {
                unset($records[$key]);
            }
        }
        return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Configuration Data Fetched.']; 
    } catch (Exception $e) {
        return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }
}

public function getAnlagenColumn() {
    try {
        $excludeColumn = ['prdData_ID', 'anl_ID', 'anlageMst', 'maschinenID', 'maschine', 
        'maschinentyp', 'auftrag', 'artikelnummer', 'werkzeug', 'timeUnlock', 'timeClose'];
        $query = "SELECT COLUMN_NAME FROM information_schema.columns WHERE table_name ='anlagen'";
        $records = queryDB ( $this->conn, $query, "read");
        //$data_array = [];
        // foreach($records as $key=>$value ) {
        //     if(in_array($value['COLUMN_NAME'], $excludeColumn)) {
        //         unset($records[$key]);
        //     }
        // }
        return ['status' => 'success', 'code' => 200, 'data' => $records, 'message' => 'Configuration Data Fetched.']; 
    } catch (Exception $e) {
        return ['status' => 'error', 'code' => 500, 'message' => $e->getMessage()];
    }
}

}

$obj = new ProductionController();
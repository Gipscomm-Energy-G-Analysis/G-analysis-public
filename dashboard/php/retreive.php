<?php
// include_once('dbConnection.php');
error_reporting(-1);
ini_set('display_errors', 'On');

require '..\..\/php/DbOperations.php';

$nameDB = isset($_POST['nameDB']) ? $_POST['nameDB'] : '';
session_start();
$conn = connectToDB($nameDB);

class dashboardController
{
    /**
     * dashboardController constructor.
     * Routes requests to the appropriate method based on the 'action' parameter.
     */
    public function __construct()
    {
        $action = $_REQUEST['action'];
        echo json_encode($this->$action());
    }
    /**
     * Retrieves the list of available databases (mandanten) based on user group permissions.
     * @return void Outputs JSON encoded database records.
     */
    public function getDatabaseList()
    {
        try {
            global $conn;
            $manGrp_ID = $_POST['manGrp_ID'];
            if($manGrp_ID == null || $manGrp_ID == 'null'){
                $query = "SELECT * FROM mandanten ";
                $query .= "ORDER BY nameMan ";
            } else {
                $query1 = "SELECT mandantenIDs FROM mandantenGruppen ";
                $query1 .= "WHERE manGrp_ID = '$manGrp_ID' ";
        
                $result1 = queryDB($conn, $query1, "read");
                $data1 = array();
                $data1 = $result1;

                $manIDs = explode(",", $data1[0]["mandantenIDs"]);
                $idString = implode(',', $manIDs);

                $query = "SELECT * FROM mandanten ";
                $query .= "WHERE man_ID IN ($idString) ORDER BY nameMan ";
            }
            $records = queryDB($conn, $query, "read");
            echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the counts and status summaries for dashboard tiles (Energy, Product, Measurement).
     * @return void Outputs JSON encoded counts and table HTML.
     */
    public function getCountDashBoard()
    {
        try {
            global $conn;
            $date_diff = date('Y-m-d H:i:s', strtotime('-30 days'));
            $current_date = date('Y-m-d');
            //Energy
            $query1 = "SELECT * FROM interneBetriebsdatenHistorie where created_on >=  convert(datetime,'$date_diff',101) And archiviert='true'";
            $records['energy'] = queryDB($conn, $query1, "read");
            $records['energy'] = count($records['energy']);

            //Product
            $query1 = "SELECT * FROM produktionsAnlagenHistorie where created_on >=  convert(datetime,'$date_diff',101) AND iBdeType='1' AND archiviert='true'";
            $records['product'] = queryDB($conn, $query1, "read");

            $records['product'] = count($records['product']);

            //Mesurement
            $query1 = "SELECT * FROM produktionsAnlagenHistorie where created_on >=  convert(datetime,'$date_diff',101) AND iBdeType='2' AND archiviert='true'";
            $records['mesurement'] = queryDB($conn, $query1, "read");
            $records['mesurement'] = count($records['mesurement']);


            //Enregy Consumed
            $date_diff_on_date = date('Y-m-d', strtotime('-30 days'));
            $eneryConsumed = "SELECT SUM(cast(T2.val as int)) FROM interneBetriebsdatenHistorie As T1 ";
            $eneryConsumed .= "Inner JOIN masseneingabeSucheIMw as T2 ";
            $eneryConsumed .= "ON T1.mstID = T2.mst_ID ";
            $eneryConsumed .= "WHERE T2.on_date >= '$date_diff_on_date' ";
            $eneryConsumed .= "AND T2.on_date <= '$current_date' ";
            $eneryConsumed .= "AND T2.type <= '1' ";
            $eneryConsumed .= "AND T1.deleted <> 'true' ";
            $eneryConsumed .= "AND T1.archiviert ='true' ";
            $records['energy_consumed'] = queryDB($conn, $eneryConsumed, "read");

            $eneryNotConsumed = "SELECT * FROM interneMesswerteConfig As T1 ";
            $eneryNotConsumed .= "LEFT JOIN ";
            $eneryNotConsumed .= "(SELECT T2.mst_ID as table_2_mst_id, max(cast(val as int)) as val from ";
            $eneryNotConsumed .= "masseneingabeSucheIMw as T2 ";
            $eneryNotConsumed .= "GROUP By T2.mst_id) ";
            $eneryNotConsumed .= "T2 ";
            $eneryNotConsumed .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $eneryNotConsumed .= "LEFT JOIN ";
            $eneryNotConsumed .= "(SELECT T3.mst_ID as table_3_mst_id , T3.nameMSt as mst_name from ";
            $eneryNotConsumed .= "MessstellenAnlagen as T3) ";
            $eneryNotConsumed .= "T3 ";
            $eneryNotConsumed .= "ON T1.mst_ID = T3.table_3_mst_id ";
            $eneryNotConsumed .= "ORDER BY T1.mst_ID Desc ";
            $dataEnergy = queryDB($conn, $eneryNotConsumed, "read");
            $tr = '';
            if ($dataEnergy != '' && count($dataEnergy) > 0) {
                foreach ($dataEnergy as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['mst_name'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['val'] == null) {
                        $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }
            $records['energy_not_consumed'] = $tr;



            echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    //Get Records Measurement
    /**
     * Retrieves a paginated list of measurement records based on type and timeframe.
     * @return void Outputs JSON encoded measurement data and pagination HTML.
     */
    public function getNumberRecordsMesurement()
    {
        try {
            global $conn;
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $measurement_type = $_POST['measurement_type'];
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $total_number_records = $_POST['total_number_records'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';
            if ($measurement_type == "calculated") {
                $this->getAutomaticTableMeasurementData1();
                die;
            }
            if ($measurement_type == "automatic") {
                $this->getAutomaticTableMeasurementData($measurement_type);
                die;
            }

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by cast(T2.val as int) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if ($search_record != '') {
                $queryTotalRecordCondition = "AND T1.mstIMw LIKE '%$search_record%' ";
                $queryMainCondition = "AND T1.mstIMw LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM produktionsAnlagenConfig as T1 ";
            $queryTotalRecords .= "LEFT JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $queryTotalRecords .= "masseneingabeSucheIMw as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords  .= "where T1.iBdeType='2' ";
            $queryTotalRecords .= "AND T1.intTp_ID = '$time_interval' ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;

            $resultQuery = queryDB($conn, $queryTotalRecords, "read");
            $totalRecordsValue = [];
            if ($resultQuery != false) {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {

                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }

            $query1 = "SELECT * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T1.intTp_ID = '$time_interval' ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";

            $resultQuery = queryDB($conn, $query1, "read");
            $dataMesaurement = [];
            $tableFound = 'false';
            if ($resultQuery != false) {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;

            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);

            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val, $pagesCount, $dataMesaurement);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $table_filter = $time_interval . ',' . $_POST['measurement_order_by_val'] . ',' . $_POST['total_number_records'];
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Measurement', 'table_type' => $measurement_type, 'table_filter' => $table_filter);
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Generates the table header HTML for measurement data tables.
     * @param string $measurement_type The type of measurement (automatic or manual).
     * @return string The HTML for the table header rows.
     */
    public function getNumberRecordsMesurementHeader($measurement_type)
    {
        try {
            if ($measurement_type == 'automatic') {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";
                return $tr;
            } else {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                return $tr;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Handles row click events to drill down into specific measurement points.
     * @return void Outputs JSON encoded drill-down data.
     */
    public function rowClickMeasurementTableData()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['measurement_order_by_val'];
            $measurement_type = $_POST['measurement_type'];
            if ($measurement_type == "automatic") {
                $this->rowClickAutomaticMeasurementTableData();
                die;
            }

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by cast(T2.val as int) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM produktionsAnlagenConfig as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "masseneingabeSucheIMw as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination  .= "where T1.iBdeType='2' ";
            $queryTotalPagination .= "AND T2.type = '$type' ";
            $queryTotalPagination .= "AND T2.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");

            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }

            $queryMaxValue = "SELECT TOP($total_number_records) max(cast(T2.val as int)) as val ";
            $queryMaxValue .= "FROM produktionsAnlagenConfig as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "masseneingabeSucheIMw as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue  .= "where T1.iBdeType='2' ";
            $queryMaxValue .= "AND T2.type = '$type' ";
            $queryMaxValue .= "AND T2.mst_ID = '$mst_id' ";
            $queryMaximum = $queryMaxValue;
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            $query1 = "SELECT * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1 .= "AND T2.type = '$type' ";
            $query1 .= "AND T2.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read");
            $queryLastDate = "SELECT TOP(1) * From masseneingabeSucheIMw as T1 ";
            $queryLastDate .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate .= "AND T1.type = '$type' ";
            $queryLastDate .= "ORDER BY T1.id desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");

            $records['measurement_html'] = $this->generateHtmlTableMeasurementData($dataMesaurement, $queryMaxVal);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);
            $records['pagination_html'] =  $this->generatePaginationHtmlMeasurementData($page_val, $pagesCount, $dataMesaurement, $type, $mst_id);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => $queryMaximum, 'row_click' => 'true', 'type' => 'Measurement');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Generates HTML table rows for measurement data display.
     * @param array $dataMesaurement The measurement records.
     * @param mixed $queryMaxVal Optional maximum value for highlighting.
     * @return string The generated HTML table rows.
     */
    public function generateHtmlTableMeasurementData($dataMesaurement, $queryMaxVal = false)
    {
        $tr = '';
        $col_span = "";
        if ($queryMaxVal == "") {
            $col_span = "colspan='5'";
        } else if ($queryMaxVal != '') {
            $col_span = "colspan='4'";
        }
        if ($dataMesaurement != '' && count($dataMesaurement) > 0 && !isset($dataMesaurement['error'])) {
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';
                if ($queryMaxVal == "") {
                    $class_val = 'class="row_click"';
                } else if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                    $style = "style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=" . $value['mst_ID'] . " data-type=" . $value['intTp_ID'] . " data-table-other='false'>";

                $tr .= "<td>" . $value['mstIMw'] . "</td>";
                if ($value['intTp_ID'] == "1") {
                    $tr .= "<td>Days</td>";
                } else if ($value['intTp_ID'] == "2") {
                    $tr .= "<td>Weeks</td>";
                } else if ($value['intTp_ID'] == "3") {
                    $tr .= "<td>Months</td>";
                } else if ($value['intTp_ID'] == "4") {
                    $tr .= "<td>Years</td>";
                } else {
                    $tr .= "<td></td>";
                }

                //Units Checks
                if ($value['unt_ID'] == "1") {
                    $unit = "Hrs.";
                } else if ($value['unt_ID'] == "2") {
                    $unit = "kWh";
                } else if ($value['unt_ID'] == "3") {
                    $unit = "m³";
                } else if ($value['unt_ID'] == "4") {
                    $unit = "l";
                } else if ($value['unt_ID'] == "5") {
                    $unit = "kg";
                }

                if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                    if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    }
                } else if ($queryMaxVal != '') {
                    $tr .= "<td>" . $value['on_date'] . "</td>";
                } else {
                    $tr .= "<td>" . $value['startDate'] . "</td>";
                }

                if ($value['val'] == null) {
                    $tr .= "<td> - </td>";
                    if ($queryMaxVal == "") {
                        $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                } else {
                    $convertValue = $this->convertValueCommaSeperated($value['val']);
                    $tr .= "<td>" . $convertValue . ' ' . $unit . "</td>";
                    if ($queryMaxVal == "") {
                        $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                }
                $tr .= "</tr>";
            }
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates the pagination controls HTML for measurement tables.
     * @param int $page_val Current page number.
     * @param int $pagesCount Total number of pages.
     * @param array $dataMesaurement Current page data.
     * @param mixed $data_type Optional data type identifier.
     * @param mixed $mst_id Optional messstelle identifier.
     * @return string The generated pagination HTML.
     */
    public function generatePaginationHtmlMeasurementData($page_val, $pagesCount, $dataMesaurement, $data_type = false, $mst_id = false)
    {
        try {
            //Pagination Code HTML
            if ($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style = 'display: none';
                    if ($i == $page_val) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl .= "<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if ($i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl .= "<li class='page-item'><a class='page-link ' readonly id='last_input_val' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   

                $paginationHTMl .= "<li class ='page-item'>
                                        <select class='page-link select_pagination' id='measurement_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Retrieves the saved table configurations (priority, visibility) for the user's dashboard.
     * @return void Outputs JSON encoded table format data.
     */
    function getTableFormatDashboard()
    {

        try {
            global $conn;
            $username = $_SESSION['username'];
            $formattype = isset($_POST['type']) ? $_POST['type']: 'graph';
            $_SESSION['nameDB'] = isset($_POST['nameDB']) ? $_POST['nameDB'] : null;
            $selectQuery = "SELECT * from tableFormat LEFT JOIN gespeicherteGraphDiagramme ON tableFormat.saved_graph_id = gespeicherteGraphDiagramme.gDia_ID where tableFormat.username = '$username' AND tile_data_type = '".$formattype."' AND (tableFormat.deleted <> 1 OR tableFormat.deleted IS NULL) order by tableFormat.priority asc ";
            $dataResult = queryDB($conn, $selectQuery, "read");
            $records['data'] = $dataResult;
            echo json_encode($records, JSON_INVALID_UTF8_SUBSTITUTE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    public function dashboardMeasurementHtml($dataMeasurement, $queryMaxVal = false)
    {
        try {
            $col_span = "";
            $tr = "";
            if ($queryMaxVal == "") {
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            } else if ($queryMaxVal != '') {
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Units Consumed</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if ($dataMeasurement != '' && count($dataMeasurement) > 0) {
                $tr .= "<tbody>";
                foreach ($dataMeasurement as $key => $value) {
                    $unit = '';
                    $style = '';
                    if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                        $style = "style='background-color: #f77171; padding: 8px !important; font-size: .875rem'";
                    }

                    $tr .= "<tr $style>";

                    $tr .= "<td>" . $value['mstIMw'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }

                    //Units Checks
                    if ($value['unt_ID'] == "1") {
                        $unit = "Hrs.";
                    } else if ($value['unt_ID'] == "2") {
                        $unit = "kWh";
                    } else if ($value['unt_ID'] == "3") {
                        $unit = "m³";
                    } else if ($value['unt_ID'] == "4") {
                        $unit = "l";
                    } else if ($value['unt_ID'] == "5") {
                        $unit = "kg";
                    }

                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        if ($queryMaxVal != '') {
                            $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                        } else {
                            $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                        }
                    } else if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }

                    if ($value['val'] == null) {
                        $tr .= "<td> - </td>";
                        if ($queryMaxVal == "") {
                            $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    } else {
                        $convertValue = $this->convertValueCommaSeperated($value['val']);
                        $tr .= "<td>" . $convertValue . ' ' . $unit . "</td>";
                        if ($queryMaxVal == "") {
                            $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr .= "</tr>";
                }
                $tr .= "</tbody>";
            } else {
                $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML content for the dashboard energy section
     * @param array $dataMeasurement  Contains measurement data used to build the dashboard view
     * @param bool  $queryMaxVal Optional flag to determine if maximum values should be queried/processed
     * @return string Returns the generated HTML for the energy dashboard
     */
    public function dashboardEnergyHtml($dataMeasurement, $queryMaxVal = false)
    {
        try {
            $col_span = "";
            $tr = "";
            if ($queryMaxVal == "") {
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            } else if ($queryMaxVal != '') {
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Verbrauchte Einheiten</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if ($dataMeasurement != '' && count($dataMeasurement) > 0) {
                $tr .= "<tbody>";
                foreach ($dataMeasurement as $key => $value) {
                    $unit = '';
                    $style = '';
                    if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                        $style = "style='background-color: #f77171; padding: 8px !important; font-size: .875rem'";
                    }

                    $tr .= "<tr $style>";

                    $tr .= "<td>" . $value['nameMSt'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }

                    //Units Checks
                    if ($value['unt_ID'] == "1") {
                        $unit = "Hrs.";
                    } else if ($value['unt_ID'] == "2") {
                        $unit = "kWh";
                    } else if ($value['unt_ID'] == "3") {
                        $unit = "m³";
                    } else if ($value['unt_ID'] == "4") {
                        $unit = "l";
                    } else if ($value['unt_ID'] == "5") {
                        $unit = "kg";
                    }

                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        if ($queryMaxVal != '') {
                            $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                        } else {
                            $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                        }
                    } else if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }

                    if ($value['val'] == null) {
                        $tr .= "<td> - </td>";
                        if ($queryMaxVal == "") {
                            $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    } else {
                        $convertValue = $this->convertValueCommaSeperated($value['val']);
                        $tr .= "<td>" . $convertValue . ' ' . $unit . "</td>";
                        if ($queryMaxVal == "") {
                            $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr .= "</tr>";
                }
                $tr .= "</tbody>";
            } else {
                $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML content for the dashboard product section
     * @param array $dataProduct   Contains product data used to build the dashboard view
     * @param bool  $queryMaxVal   Optional flag to determine if maximum values should be queried/processed
     * @return string Returns the generated HTML for the product dashboard
     */
    public function dashboardProductHtml($dataProduct, $queryMaxVal = false)
    {
        try {
            $col_span = "";
            $tr = "";
            if ($queryMaxVal == "") {
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            } else if ($queryMaxVal != '') {
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Verbrauchte Einheiten</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if ($dataProduct != '' && count($dataProduct) > 0) {
                $tr .= "<tbody>";
                foreach ($dataProduct as $key => $value) {
                    $style = '';
                    if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                        $style = "style='background-color: #f77171'";
                    }

                    $val_prd_ID = '';
                    $prd_name = '';
                    if ($queryMaxVal == '') {
                        $val_prd_ID = $value['prd_ID'];
                        $prd_name = $value['namePrd'];
                    }

                    $tr .= "<tr $style prd_id='$val_prd_ID' analgen_config_id=" . $value['iBdePrdktConf_ID'] . " data-table-other='false' prd_name='$prd_name'>";
                    $tr .= "<td>" . $value['bezeichnungAnl'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }

                    //Units Checks
                    $unit = '';
                    if ($value['unt_ID'] == "1") {
                        $unit = "Hrs.";
                    } else if ($value['unt_ID'] == "2") {
                        $unit = "kWh";
                    } else if ($value['unt_ID'] == "3") {
                        $unit = "m³";
                    } else if ($value['unt_ID'] == "4") {
                        $unit = "l";
                    } else if ($value['unt_ID'] == "5") {
                        $unit = "kg";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        if ($queryMaxVal != '') {
                            $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                        } else {
                            $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                        }
                    } else if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['val'] == null) {
                        $tr .= "<td> - </td>";
                        if ($queryMaxVal == '') {
                            $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    } else {
                        $tr .= "<td>" . $value['val'] . ' ' . $unit . "</td>";
                        if ($queryMaxVal == '') {
                            $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr .= "</tr>";
                }
                $tr .= "</tbody>";
            } else {
                $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }

            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Generates the HTML structure for measurement tiles displayed on the dashboard.
     * @return void Outputs JSON encoded tile HTML.
     */
    public function generateHtmlMeasurementTiles()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $measurement_title =  $_POST['measurement_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);

            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;
            $url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
            $url .= $_SERVER['SERVER_NAME'];
            $url .= $_SERVER['REQUEST_URI'];
            $url_path =  dirname(dirname($url));
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml .= "<div class='measurement_html_modal_$last_id'><div style='height: 290px; width: 500px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='measurementautorefresh'>Auto Refresh <span class='measurement-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='measurement_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='measurementautorefresh'>Auto Refresh <span class='measurement-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div>  
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";        
                    } 
                }
            } else {
                $tileHtml .= "<div class='measurement_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div id='tile_loader_div' style='display: none'>
                                                <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                            </div>
                                            <div class='action-modal-button-div'>
                                                <div class='measurementautorefresh'>Auto Refresh <span class='measurement-refresh-hours'>2</span> day</div>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>" . $measurement_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='save_table_div_show_table'> 
                                                <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";

                //Tile Outer HTML
                $tileHtml .= "<div class='measurement_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='measurementautorefresh'>Auto Refresh <span class='measurement-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'> 
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";          
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for product tiles on the dashboard
     * @return string  Returns the generated HTML for product tiles
     */
    public function generateHtmlProductTiles()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $product_title =  $_POST['product_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);

            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;

            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $product_title = $_POST['product_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml .= "<div class='product_html_modal_$last_id'><div style='height: 290px; width: 500px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='productautorefresh'>Auto Refresh <span class='product-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='small-tiles'><table class='table table-striped table-bordered table-hover tiles-custom-table'></table></div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                        //Tile Outer HTML
                        $tileHtml .= "<div class='product_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='productautorefresh'>Auto Refresh <span class='product-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                            <div class='small-tiles'><table class='table table-striped table-bordered table-hover tiles-custom-table'></table></div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";        
                    } 
                }
            } else {
                $tileHtml .= "<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div id='tile_loader_div' style='display: none'>
                                                <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                            </div>
                                            <div class='action-modal-button-div'>
                                                <div class='productautorefresh'>Auto Refresh <span class='product-refresh-hours'>2</span> day</div>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>" . $product_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                </table>
                                            </div>
                                            <div class='small-tiles'><table class='table table-striped table-bordered table-hover tiles-custom-table'></table></div>
                                            <div class='save_table_div_show_table'>
                                                <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";
                    //Tile Outer HTML
                        $tileHtml .= "<div class='product_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='productautorefresh'>Auto Refresh <span class='product-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                            <div class='small-tiles'><table class='table table-striped table-bordered table-hover tiles-custom-table'></table></div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";        
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for automatic product tiles on the dashboard
     * @return string  Returns the generated HTML for automatic product tiles
     */
    public function generateHtmlProductTilesAutomatic()
    {
        try {
            $conn = connectToDB("gipscomm");
            $username = $_SESSION['username'];
            $product_title =  $_POST['product_title'];
            $getResult =  "SELECT * from tableFormat Where username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);

            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;

            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $product_title = $_POST['product_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml .= "<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border product_automatic_tile_card tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                    } 
                }
            } else {
                $tileHtml .= "<div class='product_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border product_automatic_tile_card tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div id='tile_loader_div' style='display: none'>
                                                <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                            </div>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>" . $product_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                </table>
                                            </div>
                                            <div class='save_table_div_show_table'> 
                                                <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for energy tiles on the dashboard
     * @return string  Returns the generated HTML for energy tiles
     */
    public function generateHtmlEnergyTiles()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $energy_title =  $_POST['energy_title'];
            $type =  $_POST['type'];
            $getResult =  "SELECT * from tableFormat Where (tile_data_type='table' OR tile_data_type='overall_count')  AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);

            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;

            $url  = isset($_SERVER['HTTPS']) ? 'https://' : 'http://';
            $url .= $_SERVER['SERVER_NAME'];
            $url .= $_SERVER['REQUEST_URI'];
            $url_path =  dirname(dirname($url));
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $energy_title = $_POST['energy_title'];;
                        $tileHtml .= "<input type='hidden' id='total_records' value='$last_id'>";
                        $tileHtml .= "<div class='energy_html_modal_$last_id'><div style='height: 290px; width: 500px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='energyautorefresh'>Auto Refresh <span class='energy-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                        $tileHtml .= "<input type='hidden' id='total_records_table' value='$last_id'>";
                        //Tile Outer HTML
                        $tileHtml .= "<div class='energy_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='energyautorefresh'>Auto Refresh <span class='energy-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
                    } 
                }
            } else {
                $tileHtml .= "<div class='energy_html_modal_$last_id'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                <input type='hidden' id='total_records' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex'>
                                        <div id='' class=''>
                                            <div id='tile_loader_div' style='display: none'>
                                                <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                            </div>
                                            <div class='action-modal-button-div'>
                                                <div class='energyautorefresh'>Auto Refresh <span class='energy-refresh-hours'>2</span> day</div>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>" . $energy_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-tile logo-image-main-div'>
                                            
                                            <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                            </div>  
                                            <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display: none'>
                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$last_id'></td><td id='td_table_tile_two_text_$last_id'></td></tr></tbody>
                                                </table>
                                            </div>
                                            <div class='save_table_div_show_table'>
                                                <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                </table>                        
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";
                $tileHtml .= "<input type='hidden' id='total_records_table' value='$last_id'>";
                //Tile Outer HTML
                        $tileHtml .= "<div class='energy_table_outer_html_modal_$last_id outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_table_$last_id' data-i='$last_id' data-type-tile='energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <div class='energyautorefresh'>Auto Refresh <span class='energy-refresh-hours'>2</span> day</div>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>"; 
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    
    /**
     * Retrieves graph and chart data for the dashboard modal view.
     * @return void Outputs JSON encoded chart HTML.
     */
   public function getGraphChartDataDashboard()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $measurement_title  = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='Graph' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;
            $record_type_of_tile  = $_POST['record_type_of_tile'];
            if ($record_type_of_tile == 'energy') {
                $this->getChartDataDashboardEnergy();
                die;
            } else if ($record_type_of_tile == 'product') {
                $this->getChartDataDashboardProduct();
                die;
            }
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml .= "<div class='msgGraph' style='color: #E94649; padding: 20px; border: 1px solid #dee2e6; margin-left: 15px; box-shadow: 1px 1px #dee2e6;'>Please Select Any Graph From Saved Graph List.</div>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id default' style='display: none;'><div style='height: 290px; width: 500px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal' style='margin:0px;'>$measurement_title</p> 
                                                <div id='container' style='width: 430px; height: 260px;'></div>
                                                <div class='tableGroup'>
                                                                                               
                                            </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div></div>";
                    }
                }
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for the dashboard
     * Fetches and prepares overall dashboard chart data for visualization
     * @return array  Returns dashboard chart data
     */
    public function getChartDataDashboard()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $measurement_title  = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;
            $record_type_of_tile  = $_POST['record_type_of_tile'];
            if ($record_type_of_tile == 'energy') {
                $this->getChartDataDashboardEnergy();
                die;
            } else if ($record_type_of_tile == 'product') {
                $this->getChartDataDashboardProduct();
                die;
            }

            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div> 
                                                <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'>
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
                                    </div>
                                    
                                    <div class='overflow-hide ml-3 chart-width'>
                                        <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                            <p class='text-muted'>Diagramme</p>
                                        </div>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                        </div> 
                                    <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                        <div class='save_table_div_show_table'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>";
                    } 
                }
            } else {
                $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>" . $measurement_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3 chart-width'>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div> 
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                            <div class='save_table_div_show_table'>
                                                <canvas id='areaChart'></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";

                //Tile Outer HTML
                $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                                <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                    <p class='text-muted'>Diagramme</p>
                                                </div>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div> 
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for the energy dashboard
     * Fetches and prepares energy-related data to be displayed in dashboard charts
     * @return array  Returns structured data for rendering energy charts
     */
    public function getChartDataDashboardEnergy()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $measurement_title  = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;

            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {

                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div>
                                                <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
                                    </div>
                                    
                                    <div class='overflow-hide ml-3 chart-width'>
                                        <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                            <p class='text-muted'>Diagramme</p>
                                        </div>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                        </div>
                                        <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                        <div class='save_table_div_show_table'> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>";
                    }
                }
            } else {
                $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>" . $measurement_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3 chart-width'>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                            <div class='save_table_div_show_table'> 
                                                <canvas id='areaChart'></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";

                //Tile Outer HTML
                $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                                <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                    <p class='text-muted'>Diagramme</p>
                                                </div>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div> 
                                                <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>
                                                <div class='save_table_div_show_table'> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for the product dashboard
     * Fetches and prepares product-related data to be displayed in dashboard charts
     * @return array  Returns structured data for rendering product charts
     */    
    public function getChartDataDashboardProduct()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $measurement_title  = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $last_id_query = "SELECT max(id) as max_id from tableFormat ";
            $last_id = queryDB($conn, $last_id_query, "read");
            $last_id = $last_id[0]['max_id'] != null ? $last_id[0]['max_id'] + 1 : 0;

            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i <= $total_result; $i++) {
                    $style = '';
                    if ($i == $total_result) {
                        $measurement_title = $_POST['measurement_title'];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$last_id'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div>
                                                <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                            <div class='card card-border tile_border'>
                                <div class='card-body overflow-hide display-flex pr-0'>
                                    <div id='' class=''>
                                        <div class='action-modal-button-div'>
                                            <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                            <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                        </div>
                                        <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                        <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                        <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                        </div>  
                                        <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                        
                                    </div>
                                    
                                    <div class='overflow-hide ml-3 chart-width'>
                                        <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                            <p class='text-muted'>Diagramme </p>
                                        </div>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                        </div>
                                        <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                        <div class='save_table_div_show_table'> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>";
                    }
                }
            } else {
                $tileHtml .= "<div class='dashboard_chart_tile_html_$last_id'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                <input type='hidden' id='total_records_chart' value='$last_id'>                
                                <div class='card card-border tile_border'>
                                    <div class='card-body overflow-hide display-flex pr-0'>
                                        <div id='' class=''>
                                            <div class='action-modal-button-div'>
                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px'>
                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                            </div>
                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>" . $measurement_title . "</p>
                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                            </div> 
                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                            
                                        </div>
                                        
                                        <div class='overflow-hide ml-3 chart-width'>
                                        <div class='col-md-6 p-0 small-table small-table_$last_id' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$last_id'></td><td id='td_two_text_$last_id'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                            <div class='save_table_div_show_table'> 
                                                <canvas id='areaChart'></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div>";

                //Tile Outer HTML
                $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$last_id outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$last_id' data-i='$last_id' data-type-tile='Product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$last_id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_$last_id'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                                <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                    <p class='text-muted'>Diagramme </p>
                                                </div>
                                                <div class='col-md-6 p-0 small-table small-table_$last_id'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$last_id'></td><td id='td_outer_tile_two_text_$last_id'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
            }
            $records['tile_html'] = $tileHtml;
            $records['data'] = $dataResult;
            $records['total_record'] = count($dataResult) + 1;
            $records['last_id'] = $last_id;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves data for editing dashboard tiles
     * Fetches existing tile configuration/details to populate the edit interface
     * @return array  Returns tile data for editing
     */
    public function getEditTiles()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $measurement_title = $_REQUEST['measurement_title'];
            if ($dataResult != null && count($dataResult)) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        $tileHtml .= "<div class='measurement_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>                                            
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                               
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$i_value' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$i_value'></td><td id='td_table_tile_two_text_$i_value'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                        //Tile Outer HTML
                        $tileHtml .= "<div class='measurement_table_outer_html_modal_$i_value outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_table_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$measurement_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='measurement_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        $records['data'] = $dataResult[$i];
                    } else {
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves data for editing energy dashboard tiles
     * Fetches existing energy tile configuration/details to populate the edit interface
     * @return array  Returns energy tile data for editing
     */
    public function getEditTilesEnergy()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $energy_title = $_REQUEST['energy_title'];
            if ($dataResult != null && count($dataResult)) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        $tileHtml .= "<div class='energy_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>                                            
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                               
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$i_value' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$i_value'></td><td id='td_table_tile_two_text_$i_value'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                        $tileHtml .= "<input type='hidden' id='total_records_table' value='$i_value'>";
                        //Tile Outer HTML
                        $tileHtml .= "<div class='energy_table_outer_html_modal_$i_value outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_table_$i_value' data-i='$i_value' data-type-tile='energy'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>                                            
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$energy_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='energy_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        $records['data'] = $dataResult[$i];
                    } else {

                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves data for editing Product dashboard tiles
     * Fetches existing Product tile configuration/details to populate the edit interface
     * @return array  Returns Product tile data for editing
     */
    public function getEditTilesProduct()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $product_title = $_REQUEST['product_title'];
            if ($dataResult != null && count($dataResult)) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        $tileHtml .= "<div class='product_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>                                            
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                               
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$i_value' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$i_value'></td><td id='td_table_tile_two_text_$i_value'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";
                        //Tile Outer HTML
                        $tileHtml .= "<div class='product_table_outer_html_modal_$i_value outer_table_tile_structure'><div style='height: 145px; width: 250px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_table_$i_value' data-i='$i_value' data-type-tile='product'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile' data-type-tile='product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                               
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 table-width'>
                                                <div class='save_table_div_show_table'>
                                                    <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_outer_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        $records['data'] = $dataResult[$i];
                    } else {
                    
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves data for editing automatic product dashboard tiles
     * Fetches existing automatic product tile configuration/details to populate the edit interface
     * @return array  Returns automatic product tile data for editing
     */ 
    public function getEditTilesProductAutomatic()
    {
        try {
            $conn = connectToDB('gipscomm');
            $username = $_SESSION['username'];
            $id = $_REQUEST['id'];
            $type = $_REQUEST['type'];
            $getResult =  "SELECT * from tableFormat where (tile_data_type ='table' OR tile_data_type='overall_count') AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $i_value = $_REQUEST['i_value'];
            $product_title = $_REQUEST['product_title'];
            if ($dataResult != null && count($dataResult)) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $tileHtml .= "<input type='hidden' id='total_records' value='$i_value'>";
                        $tileHtml .= "<div class='product_html_modal_$i_value'><div style='height: 145px; width: 285px' class='grid-margin actual_tile_height actual_tile_width stretch-card product_automatic_tile ' id='product_count_tile_modal_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border product_automatic_tile_card'>
                                        <div class='card-body overflow-hide display-flex'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile product_automatic_tile_edit' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile product_automatic_tile_delete' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$product_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/table_logo.png' class='tile-image-icon tile-image-icon-table'>
                                                </div>  
                                                <p class='mb-0 mt-2 text-success count_result_tile'>(30 days)<span class='text-black ml-1'><small></small></span></p>
                                               
                                            </div>
                                            
                                            <div class='overflow-hide ml-3'>
                                                <div class='col-md-6 p-0 small-table small-table_$i_value' style='display: none'>
                                                    <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_table_tile_text_$i_value'></td><td id='td_table_tile_two_text_$i_value'></td></tr></tbody>
                                                    </table>
                                                </div>
                                                <div class='save_table_div_show_table'>
                                                <div class='custom-table'><img src='images/table-image.svg' class='tableimage'></div> 
                                                    <table class='table table-striped table-bordered table-hover' id='product_modal_table'>
                                                    </table>                        
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        $records['data'] = $dataResult[$i];
                    } else {
                        
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for editing the dashboard
     * Fetches existing chart configuration and data to populate the edit interface
     * @return array  Returns chart data for dashboard editing
     */
    public function getEditChartDataDashboard()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['measurement_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['chart_filter'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $chart_time_interval = $dataResult[$i]['chart_time_interval'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Measurement'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Diagramme </p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div>
                                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>  
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>";
                    } else {
                        $dataResult[$i]['tile_html'] = str_replace('stretch-card', 'stretch-card hide_table_preview', $dataResult[$i]['tile_html']);
                        $tileHtml .= $dataResult[$i]['tile_html'];
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for editing the energy dashboard
     * Fetches existing energy chart configuration and data to populate the edit interface
     * @return array  Returns chart data for energy dashboard editing
     */    
    public function getEditChartDataDashboardEnergy()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['chart_filter'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $chart_time_interval = $dataResult[$i]['chart_time_interval'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Diagramme</p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div>
                                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>  
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>";
                    }
                
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for editing the energy layer dashboard
     * Fetches existing energy layer chart configuration and data to populate the edit interface
     * @return array  Returns chart data for energy layer dashboard editing
     */
    public function getEditChartDataDashboardEnergyLayer()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $input_range = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['energy_layer_filter'];
                        $input_range = $dataResult[$i]['energy_layer_range'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Diagramme</p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div>
                                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>  
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>";
                    }
                    
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                $records['input_range'] = $input_range;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for editing the automatic energy dashboard
     * Fetches existing automatic energy chart configuration and data to populate the edit interface
     * @return array  Returns chart data for automatic energy dashboard editing
     */
    public function getEditChartDataDashboardEnergyAutomatic()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['energy_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $input_range = '';
            $mst_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $chart_type = $dataResult[$i]['chart_type'];
                        $input_range = $dataResult[$i]['energy_layer_range'];
                        $mst_id = $dataResult[$i]['mst_id'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='energy_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Energy'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Energy' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Energy' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='energy_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Diagramme</p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div>
                                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>  
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>";
                    } else {
                        
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['mst_id'] = $mst_id;
                $records['chart_type'] = $chart_type;
                $records['input_range'] = $input_range;

                if ($chart_type == 'line_chart') {
                    $records['mst_id'] = unserialize($mst_id);
                }
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for editing the product dashboard
     * Fetches existing product chart configuration and data to populate the edit interface
     * @return array  Returns chart data for product dashboard editing
     */    
    public function getEditChartDataDashboardProduct()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['product_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='chart' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $chart_type = '';
            $chart_filter = '';
            $analgen_config_id = '';
            $chart_time_interval = '';
            $total_result = count($dataResult);
            $queryProduct = "SELECT prd_id from tableFormat INNER JOIN produktionsAnlagenConfig as T2 ON tableFormat.prd_anlagen_config_id = T2.iBdePrdktConf_ID where tile_data_type ='chart' AND id = '$id' AND username = '$username'  ";
            $dataResultProduct = queryDB($conn, $queryProduct, "read");
            $prd_id = $dataResultProduct != null ? $dataResultProduct[0]['prd_id'] : '';
            if ($dataResult != null && count($dataResult) > 0) {
                for ($i = 0; $i < $total_result; $i++) {
                    if ($id == $dataResult[$i]['id']) {
                        $chart_type = $dataResult[$i]['chart_type'];
                        $chart_filter = $dataResult[$i]['chart_filter'];
                        $analgen_config_id = $dataResult[$i]['prd_anlagen_config_id'];
                        $chart_time_interval = $dataResult[$i]['chart_time_interval'];
                        $records['data'] = $dataResult[$i];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$i_value'>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$i_value'><div style='height: 290px; width: 570px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Product'>
                                    <div class='card card-border'>
                                        <div class='card-body overflow-hide display-flex pr-0'>
                                            <div id='' class=''>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$tile_title</p>
                                                <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                </div> 
                                                <p class='mb-0 mt-2 text-success count_result_tile chart_text_edit_$i_value'>(Chart)<span class='text-black ml-1'><small> </small></span></p>
                                                
                                            </div>
                                            
                                            <div class='overflow-hide ml-3 chart-width'>
                                            <div class='col-md-6 p-0 small-table small-table_$i_value' style='display:none'>
                                            <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_text_$i_value'></td><td id='td_two_text_$i_value'></td></tr></tbody>
                                            </table>
                                            </div>
                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div> 
                                                <div class='save_table_div_show_table'> 
                                                    <canvas id='areaChart'></canvas>                       
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div></div>";

                        //Tile Outer HTML
                        $tileHtml .= "<div class='dashboard_chart_outer_tile_html_$i_value outer_chart_tile_structure'><div style='height: 145px; width: 290px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='product_count_outer_tile_modal_chart_$i_value' data-i='$i_value' data-type-tile='Product'>
                                                <div class='card card-border'>
                                                    <div class='card-body overflow-hide display-flex pr-0'>
                                                        <div id='' class=''>
                                                            <div class='action-modal-button-div'>
                                                                <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Product' data-i-value ='$i_value' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                                <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Product' style='height: 17px; width: 17px;'>
                                                            </div>
                                                            <p class='card-title text-md-center text-xl-left' id='product_tile_heading_modal'>$tile_title</p>
                                                            <div class='d-flex flex-wrap justify-content-between justify-content-md-center justify-content-xl-between align-items-center logo-image-main-div'>
                                                            <img src='images/chartlogo.jpg' class='tile-image-icon tile-image-icon-table'>
                                                            </div>  
                                                            <p class='mb-0 mt-2 text-success count_result_tile chart_text_$i_value'>(Chart)<span class='text-black ml-1'><small></small></span></p>
                                                            
                                                        </div>
                                                        
                                                        <div class='overflow-hide ml-3 chart-width'>
                                                            <div id='chart_outer_tile_text_heading' style='text-align: center'>
                                                                <p class='text-muted'>Diagramme </p>
                                                            </div>
                                                            <div class='col-md-6 p-0 small-table small-table_$i_value'>
                                                                <table class='wish-table table-striped table-bordered m-0' style='display:table'><thead><tr><th>Date</th><th>Consumption</th></tr></thead><tbody><tr><td id='td_outer_tile_text_$i_value'></td><td id='td_outer_tile_two_text_$i_value'></td></tr></tbody>
                                                                </table>
                                                            </div>
                                                            <div class='customgraph'><img src='images/graph-image.svg' class='graphimage'></div>  
                                                            <div class='save_table_div_show_table'> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div></div>";
                    }
                }
                $records['tile_html'] = $tileHtml;
                $records['total_record'] = count($dataResult);
                $records['analgen_config_id'] = $analgen_config_id;
                $records['chart_filter'] = $chart_filter;
                $records['chart_type'] = $chart_type;
                $records['chart_time_interval'] = $chart_time_interval;
                $records['prd_id'] = $prd_id;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves graph chart data for editing the dashboard
     * Fetches existing graph/chart configuration and data to populate the edit interface
     * @return array  Returns graph chart data for dashboard editing
     */
    public function getEditGraphChartDashboard()
    {
        try {
            global $conn;
            $username = $_SESSION['username'];
            $i_value = $_POST['i_value'];
            $id = $_POST['id'];
            $tile_title = $_POST['graph_title'];
            $getResult =  "SELECT * from tableFormat where tile_data_type ='Graph' AND username = '$username' ";
            $dataResult = queryDB($conn, $getResult, "read");
            $tileHtml = '';
            $total_result = count($dataResult);
            $queryGraph = "SELECT * from tableFormat LEFT JOIN gespeicherteGraphDiagramme ON tableFormat.saved_graph_id = gespeicherteGraphDiagramme.gDia_ID where tableFormat.tile_data_type ='Graph' AND tableFormat.id = '$id' AND tableFormat.username = '$username' ";
            $resultGraph = queryDB($conn, $queryGraph, "read");
            if ($resultGraph != null && count($resultGraph) > 0) {
                    if ($id == $resultGraph[0]['id']) {
                        $records['data'] = $resultGraph[0];
                        $tileHtml .= "<input type='hidden' id='total_records_chart' value='$id'>";
                        $tileHtml .= "<div class='msgGraph' style='color: #E94649; padding: 20px; border: 1px solid #dee2e6; margin-left: 15px; box-shadow: 1px 1px #dee2e6; display: none;'>Please Select Any Graph From Saved Graph List.</div>";
                        $tileHtml .= "<div class='dashboard_chart_tile_html_$id default'><div style='height: 290px; width: 500px' class='grid-margin actual_tile_height actual_tile_width stretch-card ' id='measurement_count_tile_modal_chart_$id' data-i='$id' data-type-tile='Measurement'>
                                    <div class='card card-border tile_border'>
                                        <div class='card-body'>
                                            <div id='' class=''>
                                                <div id='tile_loader_div' style='display: none'>
                                                    <img src='images/loader_dashboard.gif' id='tile_loader_image'>
                                                </div>
                                                <div class='action-modal-button-div'>
                                                    <img src='images/edit.png' class='edit_val edit_btn_tile_chart' data-type-tile='Measurement' data-i-value ='$id' style='height: 17px; width: 17px; margin-right: 5px;'>
                                                    <img src='images/delete.png' class='id_val delete_btn_tile' data-type-tile='Measurement' style='height: 17px; width: 17px;'>
                                                </div>
                                                <p class='card-title text-md-center text-xl-left' id='measurement_tile_heading_modal' style='margin:0px;'>$tile_title</p> 
                                                <div id='container' style='width: 430px; height: 260px;'></div>
                                                                                            <div class='tableGroup'>
                                                <div id='table-chart-data-container_1'>
                                                    <label style='font-size: 14px;'>Summe-Monat: </label>
                                                    <label id='consumption-year_1' style='font-size: 14px;'></label>
                                                    <table id='tblChartData_1' style='font-size: 9px;' class='stripe hover row-border compact dt-left custom'>
                                                        <thead>
                                                            <tr>
                                                                <th>Messstelle</th>
                                                                <th>Datum</th>
                                                                <th>Wert[kWh]</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>    
                                                    </table>
                                                </div>
                                                <div id='table-chart-data-container_2'>
                                                    <label style='font-size: 14px;'>Summe-Monat: </label>
                                                    <label id='consumption-year_2' style='font-size: 14px;'></label>
                                                    <table id='tblChartData_2' style='font-size: 9px;' class='stripe hover row-border compact dt-left custom'>
                                                        <thead>
                                                            <tr>
                                                                <th>Messstelle</th>
                                                                <th>Datum</th>
                                                                <th>Wert[kWh]</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div id='table-chart-data-container_3'>
                                                    <label style='font-size: 14px;'>Summe-Monat: </label>
                                                    <label id='consumption-year_3' style='font-size: 14px;'></label>
                                                    <table id='tblChartData_3' style='font-size: 9px;' class='stripe hover row-border compact dt-left custom'>
                                                            <thead>
                                                                <tr>
                                                                    <th>Messstelle</th>
                                                                    <th>Datum</th>
                                                                    <th>Wert[kWh]</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            </tbody>
                                                    </table>
                                                </div>                                           
                                            </div>                                           
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                </div></div>";
                    }
                $records['tile_html'] = $tileHtml;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard data for editing
     * Fetches existing dashboard configuration and data to populate the edit interface
     * @return array  Returns dashboard data for editing
     */   
    public function getEditDataDashboard()
    {
        try {
            $product_automatic_tile = $_POST['product_automatic_tile'];
            $res =  $product_automatic_tile;
            $conn = '';
            if ($product_automatic_tile == 'true') {
                $conn = connectToDB('gipscomm');
            } else {
                $conn = connectToDB($_POST['nameDB']);
            }
            $username = $_SESSION['username'];
            $id = $_REQUEST['id'];
            $selectQuery = "SELECT * from tableFormat where id ='$id' AND username = '$username' ";
            $resultQuery = queryDB($conn, $selectQuery, "read");
            $records['data'] = $resultQuery;

            $allColumns = $product_automatic_tile == 'true' ? unserialize($resultQuery[0]['prd_all_columns_automatic']) : '';
            $records['all_columns'] = $allColumns;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data based on selected time interval
     * Fetches and processes records according to the specified time interval for chart display
     * @return array  Returns chart data filtered by time interval
     */
    public function getChartTimeIntervalRecord()
    {
        try {
            global $conn;
            $time_interval = $_REQUEST['time_interval'];
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $data = '';
            if ($record_type_of_tile == 'measurement') {
                $query1 = "SELECT T1.mstIMw,T1.mst_ID,T2.val,T1.iBdeType ";
                $query1 .= "FROM produktionsAnlagenConfig as T1 ";
                $query1 .= "INNER JOIN ";
                $query1 .= "(SELECT T2.mst_ID as t2_mst_id , sum(cast(T2.val as int)) as val from masseneingabeSucheIMw as T2 ";
                $query1 .= "group by T2.mst_ID) T2 ";
                $query1 .= "ON T1.mst_ID = t2_mst_id ";
                $query1  .= "where T1.iBdeType='2' ";
                $query1 .= "AND T1.intTp_ID = '$time_interval' ";
                $query1 .= "Order by T2.val  Desc ";

                $resultQuery = queryDB($conn, $query1, "read");
                $data = [];
                $tableFound = 'false';
                if ($resultQuery != false) {
                    $data = queryDB($conn, $query1, "read");
                    $tableFound = 'true';
                }
                $records['table_found'] = $tableFound;
                $records['data']  = $data;

            } else if ($record_type_of_tile == 'energy') {
                $query1 = "SELECT T3.nameMST ,T1.mst_ID,T2.val ";
                $query1 .= "FROM interneMesswerteConfig as T1 ";
                $query1 .= "INNER JOIN ";
                $query1 .= "(SELECT T2.mst_ID as t2_mst_id , sum(cast(T2.val as int)) as val from masseneingabeSucheIMw as T2 ";
                $query1 .= "group by T2.mst_ID) T2 ";
                $query1 .= "ON T1.mst_ID = t2_mst_id ";
                $query1 .= "INNER JOIN ";
                $query1 .= "MessstellenAnlagen as T3 ";
                $query1 .= "ON T1.mst_ID = T3.mst_ID ";
                $query1 .= "Where T1.intTp_ID = '$time_interval' ";
                $query1 .= "Order by T2.val  Desc ";

                $resultQuery = queryDB($conn, $query1, "read");
                $data = [];
                $tableFound = 'false';
                if ($resultQuery != false) {
                    $data = queryDB($conn, $query1, "read");
                    $tableFound = 'true';
                }
                $records['table_found'] = $tableFound;
                $records['data']  = $data;
            }
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves product chart data based on selected time interval
     * Fetches and processes product records according to the specified time interval for chart display
     * @return array  Returns product chart data filtered by time interval
     */
    public function getChartTimeIntervalRecordProduct()
    {
        try {
            global $conn;
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $data = '';
            $query1 = "SELECT * from produktionsAnlagenConfig as Mt ";
            $query1 .= "LEFT JOIN produkte as t2 ";
            $query1 .= "ON Mt.prd_iD = t2.prd_ID ";
            $query1 .= "WHERE iBdePrdktConf_ID  IN ( ";
            $query1 .= "SELECT max(t1.iBdePrdktConf_ID) FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_id != '0' ";
            $query1 .= "GROUP BY t1.prd_id ";
            $query1 .= ") ";
            $query1 .= "order by Mt.iBdePrdktConf_ID desc ";

            $resultQuery = queryDB($conn, $query1, "read");
            $data = [];
            $tableFound = 'false';
            if ($resultQuery != false) {
                $data = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;
            $records['data']  = $data;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves chart data for selected product item(s)
     * Fetches and prepares data based on selected product item(s) for chart display
     * @return array  Returns chart data for selected product item(s)
     */
    public function getChartSelectProductItem()
    {
        try {
            global $conn;
            $record_type_of_tile = $_REQUEST['record_type_of_tile'];
            $prd_id = $_POST['prd_id'];
            $data = '';
            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .= "from produktionsAnlagenMoreOpt as t2 ";
            $query1 .= ") ";
            $query1 .= "t2 ";
            $query1 .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "INNER join anlagen as t4 on t1.anl_id = t4.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_ID = '$prd_id' ";
            $query1 .= "order by t3.val desc ";
            $data = queryDB($conn, $query1, "read");
            echo json_encode($data, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the total number of energy records
     * Fetches and returns the count of energy records based on current filters or conditions
     * @return int  Returns the total number of energy records
     */
    public function getNumberRecordsEnergy()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['energy_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['energy_search_record']) ? $_POST['energy_search_record'] : 'false';
            $energy_type = $_POST['energy_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';
            if ($energy_type == "layer_modal") {
                $this->getLayerTableEnergyData();
                die;
            }
            if ($energy_type == "automatic") {
                $this->getAutomaticTableEnergyData();
                die;
            }
            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by cast(T2.val as int) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if ($search_record != '') {
                $queryTotalRecordCondition = "AND T3.nameMst LIKE '%$search_record%' ";
                $queryMainCondition = "AND T3.nameMst LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM interneMesswerteConfig as T1 ";
            $queryTotalRecords .= "LEFT JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $queryTotalRecords .= "masseneingabeSucheIMw as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .=  "LEFT JOIN ";
            $queryTotalRecords .= "MessstellenAnlagen  as T3 ";
            $queryTotalRecords .= "ON T1.mst_ID = T3.mst_ID ";
            $queryTotalRecords .= "where T1.intTp_ID = '$time_interval' ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            $resultQuery = queryDB($conn, $queryTotalRecords, "read");
            $totalRecordsValue = [];
            if ($resultQuery != false) {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {

                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }

            $query1 = "SELECT * ";
            $query1 .= "FROM interneMesswerteConfig as T1 ";
            $query1 .= "LEFT JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(cast(val as int)) as val from ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .=  "LEFT JOIN ";
            $query1 .= "MessstellenAnlagen  as T3 ";
            $query1 .= "ON T1.mst_ID = T3.mst_ID ";
            $query1 .= "where T1.intTp_ID = '$time_interval' ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $resultQuery = queryDB($conn, $query1, "read");
            $dataMesaurement = [];
            $tableFound = 'false';
            if ($resultQuery != false) {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;
            $records['energy_html'] = $this->generateHtmlTableEnergyData($dataMesaurement);

            $records['data'] = "";
            if ($dataMesaurement == '' || count($dataMesaurement) <= 0) {
                $records['data'] = 'Es existieren keine Daten die ausgewertet werden können';
            }


            $records['pagination_html_energy'] =  $this->generatePaginationHtmlEnergyData($page_val, $pagesCount, $dataMesaurement);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $table_filter = $_POST['time_interval'] . ',' . $_POST['energy_order_by_val'] . ',' . $_POST['total_number_records'] . ',' . $_POST['search_record'];
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Energy', 'table_type' => 'manually', 'table_filter' => $table_filter);
            $records['query_data'] = $ar;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves energy table data based on row click
     * Fetches and processes detailed energy data for the selected row
     * @return array  Returns energy table data for the selected row
     */
    public function rowClickEnergyTableData()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['energy_order_by_val'];
            $energy_type = $_POST['energy_type'];
            if ($energy_type == "automatic") {
                $this->rowClickAutomaticEnergyTableData();
                die;
            }
            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by cast(T2.val as int) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by cast(T2.val as int) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM interneMesswerteConfig as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "masseneingabeSucheIMw as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .=  "INNER JOIN ";
            $queryTotalPagination .= "MessstellenAnlagen  as T3 ";
            $queryTotalPagination .= "ON T1.mst_ID = T3.mst_ID ";
            $queryTotalPagination .= "where T2.type = '$type' ";
            $queryTotalPagination .= "AND T2.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }
            $queryMaxValue = "SELECT TOP($total_number_records) max(cast(T2.val as int)) as val ";
            $queryMaxValue .= "FROM interneMesswerteConfig as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "masseneingabeSucheIMw as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .=  "INNER JOIN ";
            $queryMaxValue .= "MessstellenAnlagen  as T3 ";
            $queryMaxValue .= "ON T1.mst_ID = T3.mst_ID ";
            $queryMaxValue .= "where T2.type = '$type' ";
            $queryMaxValue .= "AND T2.mst_ID = '$mst_id' ";
            $queryMaximum = $queryMaxValue;
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            $query1 = "SELECT * ";
            $query1 .= "FROM interneMesswerteConfig as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "masseneingabeSucheIMw as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .=  "INNER JOIN ";
            $query1 .= "MessstellenAnlagen  as T3 ";
            $query1 .= "ON T1.mst_ID = T3.mst_ID ";
            $query1 .= "Where T2.type = '$type' ";
            $query1 .= "AND T2.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read");

            $queryLastDate = "SELECT TOP(1) * From masseneingabeSucheIMw as T1 ";
            $queryLastDate .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate .= "AND T1.type = '$type' ";
            $queryLastDate .= "ORDER BY T1.id desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");

            $records['energy_html'] = $this->generateHtmlTableEnergyData($dataMesaurement, $queryMaxVal);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlEnergyData($page_val, $pagesCount, $dataMesaurement, $type, $mst_id);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => $queryMaximum, 'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves energy layer table data based on row click
     * Fetches and processes detailed energy layer data for the selected row
     * @return array  Returns energy layer table data for the selected row
     */
    public function rowClickEnergyTableDataLayer()
    {
        try {
            global $conn;
            $valid_from = $_POST['valid_from'];
            $valid_to = $_POST['valid_to'];
            $click_row_array = $_POST['click_row_array'];

            $tableCallCount = $_POST['tableCallCount'];
            $offsetValue = ($tableCallCount - 1) * 100;
            $query1 = '';
            if ($valid_from != '' && $valid_to != '') {
                $query1 = "SELECT * ";
                $query1 .= "FROM MessstellenEnergiedaten as T1 ";
                $query1 .= "Where convert(date, time) >= '$valid_from' AND convert(date, time) <= '$valid_to' ";
                $query1 .= "Order by mst_ID ";
                $query1 .= "offset $offsetValue rows FETCH NEXT 100 ROWS ONLY ";
            } else {
                $query1 = "SELECT * ";
                $query1 .= "FROM MessstellenEnergiedaten as T1 ";
                $query1 .= "Where convert(date, time) >= '$valid_from' ";
                $query1 .= "Order by mst_ID ";
                $query1 .= "offset $offsetValue rows FETCH NEXT 100 ROWS ONLY ";
            }
            $resultQuery = queryDB($conn, $query1, "read");
            $tableFound = 'false';
            $dataMesaurement = [];
            if ($resultQuery != false) {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;
            //Array Check
            $sum_value = '';
            if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
                $array_col = array_column($dataMesaurement, 'Value');
                $sum_value = array_sum($array_col);
            }
            $rowClickTable = 'true';
            $records['sum_value'] = $sum_value;
            $records['energy_header'] = $this->generateHtmlLayerTableEnergyDataHeader($rowClickTable);
            $records['energy_html'] = $this->generateRowClickHtmlLayerTableEnergyData($sum_value, $click_row_array);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlRowClickLayerEnergyData($sum_value);

            $arTable = json_decode($click_row_array);
            $queryName = "Select * from SchichtModelleAll where modellBez = '$arTable[0]' ";

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $pagesCount = isset($_POST['pagesCount']) ? $_POST['pagesCount'] : 1;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $queryName, 'queryMaxValue' => $query1, 'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for energy layer table data on row click
     * Builds and returns HTML content for displaying detailed energy layer data
     * when a table row is selected
     * @return string  Returns generated HTML for energy layer table data
     */
    public function generateRowClickHtmlLayerTableEnergyData($sum_value, $click_row_array)
    {
        global $conn;
        $tr = '';
        $col_span = "colspan='50'";
        $data_table_other = "data-table-other='SchichtModelleAll'";
        if ($sum_value != '') {
            $click_row_array_decode = json_decode($click_row_array);
            $tr .= "<tr sum_value=" . $sum_value . " data-type='1' $data_table_other>";
            for ($i = 0; $i <= count($click_row_array_decode); $i++) {
                if ($i == count($click_row_array_decode)) {
                    $tr .= "<td>" . $sum_value . "</td>";
                } else {
                    $tr .= "<td>$click_row_array_decode[$i]</td>";
                }
            }
            $tr .= "</tr>";
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates pagination HTML for energy layer row click data
     * Builds and returns pagination controls for navigating through
     * energy layer data displayed after a row click
     * @return string  Returns generated pagination HTML
     */
    public function generatePaginationHtmlRowClickLayerEnergyData($sum_value)
    {
        try {
            $paginationHTMl = '';
            if ($sum_value != '') {
                $paginationHTMl = "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
            }
            return $paginationHTMl;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves table header configuration for energy records
     * Fetches and prepares column headers for displaying energy data in table format
     * @return array  Returns energy records table header data
     */
    public function getEnergyRecordsTableHeader()
    {
        try {
            $energy_type = $_POST['energy_type'];
            $open_end_layer = $_POST['open_end_layer'];
            if ($energy_type == "automatic") {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";

                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else if ($energy_type == "manually") {
                $tr = "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Erstellungsdatum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";

                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else if ($energy_type == "layer_modal") {
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Created Date</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Property</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';

                if ($open_end_layer == '0') {
                    $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date of Expiry</th>';
                }

                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Quantity</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves table header configuration for energy records on row click
     * Fetches and prepares column headers for displaying detailed energy data
     * when a specific row is selected
     * @return array  Returns energy records table header data for row click
     */
    public function rowClickEnergyRecordsTableHeader()
    {
        try {
            $energy_type = $_POST['energy_type'];
            if ($energy_type == "automatic") {
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Messstelle</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Wert</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else if ($energy_type == "manually") {
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeitintervall</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Verbrauchte Einheiten</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else if ($energy_type == "layer_modal") {
                $tr = '<tr>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day From</th>';
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day To</th>';
                $tr .= '</tr>';
                $records['table_header'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for energy table data
     * Builds and returns HTML content for displaying energy data in table format
     * @return string  Returns generated HTML for energy table data
     */
    public function generateHtmlTableEnergyData($dataMesaurement, $queryMaxVal = false)
    {
        $tr = '';
        $col_span = "";
        if ($queryMaxVal == "") {
            $col_span = "colspan='5'";
        } else if ($queryMaxVal != '') {
            $col_span = "colspan='4'";
        }
        if ($dataMesaurement != '' && count($dataMesaurement) > 0 && !$dataMesaurement['error']) {
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';
                if ($queryMaxVal == "") {
                    $class_val = 'class="row_click_energy"';
                } else if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                    $style = "style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=" . $value['mst_ID'] . " data-type=" . $value['intTp_ID'] . " data-table-other='false'>";

                $tr .= "<td>" . $value['nameMSt'] . "</td>";
                if ($value['intTp_ID'] == "1") {
                    $tr .= "<td>Days</td>";
                } else if ($value['intTp_ID'] == "2") {
                    $tr .= "<td>Weeks</td>";
                } else if ($value['intTp_ID'] == "3") {
                    $tr .= "<td>Months</td>";
                } else if ($value['intTp_ID'] == "4") {
                    $tr .= "<td>Years</td>";
                } else {
                    $tr .= "<td></td>";
                }

                //Units Checks
                if ($value['unt_ID'] == "1") {
                    $unit = "Hrs.";
                } else if ($value['unt_ID'] == "2") {
                    $unit = "kWh";
                } else if ($value['unt_ID'] == "3") {
                    $unit = "m³";
                } else if ($value['unt_ID'] == "4") {
                    $unit = "l";
                } else if ($value['unt_ID'] == "5") {
                    $unit = "kg";
                }

                if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                    if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    }
                } else if ($queryMaxVal != '') {
                    $tr .= "<td>" . $value['on_date'] . "</td>";
                } else {
                    $tr .= "<td>" . $value['startDate'] . "</td>";
                }

                if ($value['val'] == null) {
                    $tr .= "<td> - </td>";
                    if ($queryMaxVal == "") {
                        $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                    }
                } else {
                    $convertValue = $this->convertValueCommaSeperated($value['val']);
                    $tr .= "<td>" . $convertValue . ' ' . $unit . "</td>";
                    if ($queryMaxVal == "") {
                        $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                    }
                }
                $tr .= "</tr>";
            }
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates pagination HTML for energy data
     * Builds and returns pagination controls for navigating through energy records
     * @return string  Returns generated pagination HTML
     */
    public function generatePaginationHtmlEnergyData($page_val, $pagesCount, $dataMesaurement, $data_type = false, $mst_id = false)
    {
        try {
            if ($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table_energy' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_energy'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style = 'display: none';
                    if ($i == $page_val) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl .= "<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if ($i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl .= "<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_energy'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   

                $paginationHTMl .= "<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the total number of automatic energy records
     * Fetches and returns the count of energy records for automatic data
     * based on current filters or conditions
     * @return int  Returns the total number of automatic energy records
     */
    public function getNumberRecordsEnergyAutomatic()
    {
        try {
            global $conn;
            $table_type = $_POST['table_type'];
            $mst_id = $_POST['mst_id'];
            $input_val_week_day = $_POST['input_val_week_day'] /*+ 60*/;
            $valMaxDate = $input_val_week_day - $_POST['input_val_week_day'];
            $order_by = isset($_POST['order_by']) ?  $_POST['order_by'] : 'desc';
            $energy_measurement_text = $_POST['energy_measurement_text'];
            $thead = "<tr>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
            $thead .= "</tr>";

            $tbody = '';
            $checkQuery = '';

            $todayDate = date('Y-m-d');

            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id' ";
            $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
            $table_found = 'false';
            if ($resultTableExistCheck != false) {
                $table_found = 'true';
            }

            $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
            $maxDateCheck = date('Y-m-d', strtotime("-$valMaxDate days"));
            $queryEnergy = '';
            if ($table_found == 'true') {
                $topRecords= $_POST['input_val_week_day'];
                $queryEnergy = "Select TOP ($topRecords) convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' ";
                $queryEnergy .= " group by convert(date,Time) order by date $order_by ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                if ($queryEnergyRecords != '' && count($queryEnergyRecords) && !isset($queryEnergyRecords['error'])) {
                    for ($i = 0; $i < $_POST['input_val_week_day']; $i++) {
                        $dateDynamicIndex = $valMaxDate + $i;
                        $dateDynamicVal =  date('Y-m-d', strtotime("-$dateDynamicIndex days"));
                        $result = $this->generateEnergyAutomaticTableHTML($queryEnergyRecords, $dateDynamicVal, $energy_measurement_text);
                        $tbody .= $result;
                    }
                    $paginationHTMl = "<div id='save_table_format' class='text-center'>
                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                    </div>";
                    $records['pagination_html_energy'] =  $paginationHTMl;
                }
            }

            if ($tbody == '') {
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
                $records['pagination_html_energy'] =  '';
            }

            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;
            $records['table_found'] = $table_found;
            $table_filter = $mst_id . ',' . $_POST['input_val_week_day'];
            $ar = array('pages_count' => '0', 'page_val' => '0', 'number_records' => '0', 'query1' => $queryEnergy, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Energy', 'mst_id' => $mst_id, 'input_val_week_day' => $_POST['input_val_week_day'], 'name_val' => $energy_measurement_text, 'table_type' => $table_type, 'table_filter' => $table_filter);
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for automatic energy table data
     * Builds and returns HTML content for displaying automatic energy data in table format
     * @return string  Returns generated HTML for automatic energy table
     */
    public function generateEnergyAutomaticTableHTML($data, $dateVal, $energy_measurement_text)
    {
        try {
            $flag = 0;
            for ($i = 0; $i < count($data); $i++) {
                if (date("Y-m-d",strtotime($data[$i]['date'])) == $dateVal) {
                    $flag = 1;
                    break;
                }
            }
            if ($flag == 1) {
                $tbody = '<tr class="row_click_energy" data-table-other="true">';
                $tbody .= "<td>" . $energy_measurement_text . "</td>";
                $tbody .= "<td>" . date("Y-m-d",strtotime($data[$i]['date'])) . "</td>";
                $totalValue = $data[$i]['value'] > 0 ? $data[$i]['value'] / 4 : 0;
                $totalValue = $this->convertValueCommaSeperated($totalValue);
                $tbody .= "<td>" . $totalValue . "</td>";
                $tbody .= '</tr>';
                return $tbody;
            } else {
                $tbody = '<tr class="row_click_energy" data-table-other="true">';
                $tbody .= "<td>" . $energy_measurement_text . "</td>";
                $tbody .= "<td>" . $dateVal . "</td>";
                $tbody .= "<td>0</td>";
                $tbody .= '</tr>';
                return $tbody;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves previous set of automatic energy table data
     * Fetches and returns the previous page or batch of automatic energy records
     * for pagination/navigation purposes
     * @return array  Returns previous automatic energy table data
     */
    public function getAutomaticTableEnergyDataPrevious()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['energy_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_energy = isset($_POST['energy_search_record']) ? $_POST['energy_search_record'] : 'false';
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if ($search_record != '') {
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            $resultQuery = queryDB($conn, $queryTotalRecords, "read");
            $totalRecordsValue = [];
            if ($resultQuery != false) {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {

                    if ($selected_number_record_energy == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $resultQuery = queryDB($conn, $query1, "read");
            $tableFound = 'false';
            $dataMesaurement = [];
            if ($resultQuery != false) {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;
            $records['energy_html'] = $this->generateHtmlAutomaticTableEnergyData($dataMesaurement);

            $records['pagination_html_energy'] =  $this->generatePaginationHtmlAutomaticEnergyData($page_val, $pagesCount, $dataMesaurement);
            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Energy');
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves automatic energy table data based on row click
     * Fetches and processes detailed automatic energy data for the selected row
     * @return array  Returns automatic energy table data for the selected row
     */
    public function rowClickAutomaticEnergyTableData()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_energy = isset($_POST['selected_number_record_energy']) ? $_POST['selected_number_record_energy'] : 'false';
            $order_by_val = $_POST['energy_order_by_val'];
            $energy_type = $_POST['energy_type'];

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM berechneteEnergiedaten as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "messstellen as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .= "WHERE T1.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");


            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    if ($selected_number_record_energy == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }
            $queryMaxValue = "SELECT TOP($total_number_records) max(convert(decimal(38,5), Value)) as val ";
            $queryMaxValue .= "FROM berechneteEnergiedaten as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "messstellen as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryMaximum = $queryMaxValue;
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';


            $query1 = "SELECT * ";
            $query1 .= "FROM berechneteEnergiedaten as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "messstellen as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .= "Where T1.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read");

            $records['energy_html'] = $this->generateHtmlAutomaticTableEnergyData($dataMesaurement, $queryMaxVal);
            $records['pagination_html_energy'] =  $this->generatePaginationHtmlAutomaticEnergyData($page_val, $pagesCount, $dataMesaurement, $type, $mst_id);

            $queryLastDate = "SELECT TOP(1) * From berechneteEnergiedaten as T1 ";
            $queryLastDate .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate .= "ORDER BY T1.berNrg_ID desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => $queryMaximum, 'row_click' => 'true', 'type' => 'Energy');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for automatic energy table data
     * Builds and returns HTML content for displaying automatic energy data in table format
     * @return string  Returns generated HTML for automatic energy table data
     */
    public function generateHtmlAutomaticTableEnergyData($dataMesaurement, $queryMaxVal = false)
    {
        global $conn;
        $tr = '';
        $col_span = "";
        if ($queryMaxVal == "") {
            $col_span = "colspan='5'";
        } else if ($queryMaxVal != '') {
            $col_span = "colspan='4'";
        }
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';
                $mst_id = $value['mst_ID'];


                $queryResult = '';
                if ($queryMaxVal == '') {
                    $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                    $queryResult = queryDB($conn, $queryData, "read");
                }


                if ($queryMaxVal == "") {
                    $class_val = 'class="row_click_energy"';
                } else if ($queryMaxVal != '' && $queryMaxVal == $value['Value']) {
                    $style = "style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=" . $value['mst_ID'] . " data-type='1' data-table-other='true'>";

                $tr .= "<td>" . $value['nameMSt'] . "</td>";

                if ($queryMaxVal == '') {
                    $tr .= "<td>" . $queryResult[0]['Time'] . "</td>";
                    // $tr.= "<td>".$queryResult[0]['ConvFactor']."</td>";
                    $valEnergy = 0;
                    if ($value['val'] > 0) {
                        $valEnergy = $value['val'] / 4;
                        $valEnergy = $this->convertValueCommaSeperated($valEnergy);
                    }
                    $tr .= "<td>" . $valEnergy . "</td>";
                } else {
                    $tr .= "<td>" . $value['Time'] . "</td>";
                    $valEnergy = 0;
                    if ($value['Value'] > 0) {
                        $valEnergy = ($value['Value'] * $value['ConvFactor'])  / 4;
                        $valEnergy = $this->convertValueCommaSeperated($valEnergy);
                    }
                    $tr .= "<td>" . $valEnergy . "</td>";
                }
                $tr .= "</tr>";
            }
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates pagination HTML for automatic energy data
     * Builds and returns pagination controls for navigating through automatic energy records
     * @return string  Returns generated pagination HTML
     */
    public function generatePaginationHtmlAutomaticEnergyData($page_val, $pagesCount, $dataMesaurement, $data_type = false, $mst_id = false)
    {
        try {
            //Pagination Code HTML
            if ($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table_energy' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_energy'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style = 'display: none';
                    if ($i == $page_val) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl .= "<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if ($i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl .= "<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_energy'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   

                $paginationHTMl .= "<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves all energy measurement data
     * Fetches and returns all available energy measurement records
     * @return array  Returns energy measurement data
     */
    public function getAllMeasurementEnergy()
    {
        try {
            global $conn;
            $queryMeasurement = "select mst_Id from MessstellenEnergiedaten group by mst_Id ";
            $resulTotalRecord = queryDB($conn, $queryMeasurement, "read");
            $resultQuery = [];
            $tablefound = 'false';

            if ($resulTotalRecord != false) {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if ($resultQuery != '' && count($resultQuery) > 0) {
                $ar_mst_id = array_column($resultQuery, 'mst_Id');
                $str_mst_id = implode(',', $ar_mst_id);
                $nameQuery = "Select mst_id,nameMSt from messstellen where  mst_id in ($str_mst_id) ";
                $nameQueryResult = queryDB($conn, $nameQuery, "read");
                $select = "<option value=''>Please Select Measurement</option>";
                foreach ($nameQueryResult as $key => $val) {
                    $select .= "<option value=" . $val["mst_id"] . ">" . $val['nameMSt'] . "</option>";
                }
                $result['measurement_html'] = $select;
            } else {
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves all automatic energy measurement data
     * Fetches and returns all available automatic energy measurement records
     * @return array  Returns automatic energy measurement data
     */
    public function getAllMeasurementEnergyAutomatic()
    {
        try {
            global $conn;
            $queryMeasurement = "select * from messstellen where messartMst = 'automatisch' ";
            $resulTotalRecord = queryDB($conn, $queryMeasurement, "read");
            $resultQuery = [];
            $tablefound = 'false';

            if ($resulTotalRecord != false) {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if ($resultQuery != '' && count($resultQuery) > 0) {
                $select = "<option value=''>Please Select Measurement</option>";

                foreach ($resultQuery as $key => $val) {
                    $select .= "<option value=" . $val["mst_ID"] . ">" . $val['nameMSt'] . "</option>";
                }
                $result['measurement_html'] = $select;
            } else {
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves energy measurement chart data
     * Fetches and prepares energy measurement data for chart visualization
     * @return array  Returns energy measurement chart data
     */
    public function getEnergyMeasurementChart()
    {
        try {
            global $conn;
            $queryMeasurement = "select mst_Id from MessstellenEnergiedaten group by mst_Id ";
            $resulTotalRecord = queryDB($conn, $queryMeasurement, "read");
            $resultQuery = [];
            $tablefound = 'false';

            if ($resulTotalRecord != false) {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if ($resultQuery != '' && count($resultQuery) > 0) {
                $ar_mst_id = array_column($resultQuery, 'mst_Id');
                $str_mst_id = implode(',', $ar_mst_id);
                $nameQuery = "Select mst_id,nameMSt from messstellen where  mst_id in ($str_mst_id) ";
                $nameQueryResult = queryDB($conn, $nameQuery, "read");
                $select = "<option value=''>Please Select Measurement</option>";
                foreach ($nameQueryResult as $key => $val) {
                    $select .= "<option value=" . $val["mst_id"] . ">" . $val['nameMSt'] . "</option>";
                }
                $result['measurement_html'] = $select;
            } else {
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves automatic energy measurement chart data
     * Fetches and prepares automatic energy measurement data for chart visualization
     * @return array  Returns automatic energy measurement chart data
     */
    public function getEnergyMeasurementChartAutomatic()
    {
        try {
            global $conn;
            $queryMeasurement = "select * from messstellen where messartMst = 'automatisch' ";
            $resulTotalRecord = queryDB($conn, $queryMeasurement, "read");
            $resultQuery = [];
            $tablefound = 'false';

            if ($resulTotalRecord != false) {
                $resultQuery = queryDB($conn, $queryMeasurement, "read");
                $tablefound = 'true';
            }

            if ($resultQuery != '' && count($resultQuery) > 0) {
                $select = "";
                foreach ($resultQuery as $key => $val) {
                    $select .= "<option value=" . $val["mst_ID"] . ">" . $val['nameMSt'] . "</option>";
                }
                $result['measurement_html'] = $select;
                $result['data'] = $resultQuery;
            } else {
                $select = "<option value=''>No Data Found</option>";
                $result['measurement_html'] = $select;
                $result['data'] = $resultQuery;
            }
            $result['table_found'] = $tablefound;
            echo json_encode($result, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves energy layer table data
     * Fetches and returns energy data structured for layer-based table display
     * @return array  Returns energy layer table data
     */
    public function getLayerTableEnergyData()
    {
        try {
            global $conn;
            $table_type = $_POST['table_type'];
            $mst_id = $_POST['mst_id'];
            $select_day_week = $_POST['select_day_week'];
            $input_val_week_day = $_POST['input_val_week_day'];
            if ($select_day_week == 'day') {
                $thead = '<tr>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig ab</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig bis</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Bezeichnung</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit von</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
                $thead .= '</tr>';
                $tbody = '';
                $checkQuery = '';

                $todayDate = date('Y-m-d');

                //SchichtModelleAll Table Check
                $tableCheckQuery = "select * from SchichtModelleAll ";
                $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
                $table_found = 'false';
                if ($resultTableExistCheck != false) {
                    $table_found = 'true';
                }

                if ($table_found == 'true') {
                    //*** Check No Shift Name Found Database */
                    $checkQuery .= "Select * from SchichtModelleAll ";
                    for ($c = 0; $c < $input_val_week_day; $c++) {
                        $dateVal = date('Y-m-d', strtotime("-$c days"));
                        if ($c == 0) {
                            $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                        } else {
                            $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                        }
                    }
                    $resultShiftName = queryDB($conn, $checkQuery, "read");

                    if ($resultShiftName != '' && count($resultShiftName) > 0  && !$resultShiftName['error']) {
                        $ind = $input_val_week_day - 1;
                        $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                        $fromDateCheck = '';
                        foreach ($resultShiftName as $key => $val) {
                            $fromDate = $val['gueltigVon']->format('Y-m-d');
                            if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                            } else {
                                $fromDateCheck = $dateValCheck;
                            }

                            $toDate = $val['gueltigBis']->format('Y-m-d');
                            $fromTime = $val['uhrzeitVon']->format('H:i:s');
                            $toTime = $val['uhrzeitBis']->format('H:i:s');
                            $to = $toDate . 'T' . $toTime;
                            $from = $fromDate . 'T' . $fromTime;
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                            $resultEnergy = queryDB($conn, $query1, "read");
                            $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);
                            $tbody .= '<tr class="row_click_energy" data-table-other="SchichtModelleAll">';
                            $tbody .= "<td>" . $val['modellBez'] . "</td>";
                            $tbody .= "<td>" . $val['gueltigVon']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['gueltigBis']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['bezeichnung'] . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitVon']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitBis']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $totalEnergy . "</td>";
                            $tbody .= '</tr>';
                        }
                        $paginationHTMl = "<div id='save_table_format' class='text-center'>
                        <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                        </div>";
                        $records['pagination_html_energy'] =  $paginationHTMl;
                    }
                }

                if ($tbody == '') {
                    $tbody .= '<tr>';
                    $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                    $tbody .= '</tr>';
                }

                $records['energy_header'] = $thead;
                $records['energy_html'] = $tbody;
                $records['table_found'] = $table_found;
                $table_filter = $mst_id . ',' . $_POST['select_day_week'] . ',' . $_POST['input_val_week_day'];
                $ar = array('pages_count' => '0', 'page_val' => '0', 'number_records' => '0', 'query1' => $checkQuery, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Energy', 'mst_id' => $mst_id, 'select_filter_day_week' => $select_day_week, 'input_val_week_day' => $input_val_week_day, 'table_type' => $table_type, 'table_filter' => $table_filter);
                $records['query_data'] = $ar;

                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else if ($select_day_week == 'week') {

                $thead = '<tr>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Shift Name</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid To</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
                $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energy Consumed</th>';
                $thead .= '</tr>';
                $tbody = '';
                $checkShiftNameQuery = '';


                //SchichtModelleAll Table Check
                $tableCheckQuery = "select * from SchichtModelleAll ";
                $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");

                $table_found = 'false';
                if ($resultTableExistCheck != false) {
                    $table_found = 'true';
                }

                if ($table_found == 'true') {
                    $todayDate = date('Y-m-d');
                    $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));

                    // ****Check Shift Name Exist 
                    $intervalDays = $input_val_week_day * 7; //Week;
                    $checkShiftNameQuery .= "Select * from SchichtModelleAll ";
                    for ($interval = 0; $interval <= $intervalDays; $interval++) {
                        $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                        if ($interval == 0) {
                            $checkShiftNameQuery .= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                        } else {
                            $checkShiftNameQuery .= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                        }
                    }
                    $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                    if ($resultShiftName != '' && count($resultShiftName) > 0 && !$resultShiftName['error']) {
                        $weekInd = $input_val_week_day * 7; //Week;
                        $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                        $fromDateCheck = '';
                        foreach ($resultShiftName as $key => $val) {

                            $fromDate = $val['gueltigVon']->format('Y-m-d');

                            if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                            } else {
                                $fromDateCheck  = $dateValCheck;
                            }
                            $toDate = $val['gueltigBis']->format('Y-m-d');
                            $fromTime = $val['uhrzeitVon']->format('H:i:s');
                            $toTime = $val['uhrzeitBis']->format('H:i:s');
                            $to = $toDate . 'T' . $toTime;
                            $from = $fromDate . 'T' . $fromTime;
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                            $resultEnergy = queryDB($conn, $query1, "read");
                            $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);
                            $tbody .= '<tr class="row_click_energy" data-table-other="SchichtModelleAll">';
                            $tbody .= "<td>" . $val['modellBez'] . "</td>";
                            $tbody .= "<td>" . $val['gueltigVon']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['gueltigBis']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['bezeichnung'] . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitVon']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitBis']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $totalEnergy . "</td>";
                            $tbody .= '</tr>';
                        }
                        $paginationHTMl = "<div id='save_table_format' class='text-center'>
                        <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                        </div>";
                        $records['pagination_html_energy'] =  $paginationHTMl;
                    } else {
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                    }

                    $records['energy_header'] = $thead;
                    $records['energy_html'] = $tbody;
                    $records['table_found'] = $table_found;
                    $table_filter = $mst_id . ',' . $_POST['select_day_week'] . ',' . $_POST['input_val_week_day'];
                    $ar = array('pages_count' => '0', 'page_val' => '0', 'number_records' => '0', 'query1' => $checkShiftNameQuery, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Energy', 'mst_id' => $mst_id, 'select_filter_day_week' => $select_day_week, 'input_val_week_day' => $input_val_week_day, 'table_type' => $table_type, 'table_filter' => $table_filter);
                    $records['query_data'] = $ar;


                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Handles row click action for automatic energy data
     * Fetches and processes detailed automatic energy data based on the selected row
     * @return array  Returns automatic energy data for the selected row
     */
    public function rowClickEnergyAutomatic()
    {
        try {
            global $conn;
            $mst_id = $_POST['mst_id'];
            $name_val = $_POST['name_val'];
            $dateValue = $_POST['dateValue'];

            $thead = "<tr>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $thead .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
            $thead .= "</tr>";;


            $queryMaxValue = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where convert(date,time) = '$dateValue' AND mst_id = '$mst_id' ";
            $query1 =  "Select * from MessstellenEnergiedaten where convert(date,time) = '$dateValue' AND mst_ID = '$mst_id'  order by Time desc ";
            $resultQuery = queryDB($conn, $query1, "read");
            $tbody = '';
            if ($resultQuery != '' && count($resultQuery) > 0) {
                $sum = 0;
                foreach ($resultQuery as $key => $val) {
                    $tbody .= '<tr data-table-other="true">';
                    $tbody .= "<td>" . $name_val . "</td>";
                    $tbody .= "<td>" . $val['Time']->format('Y-m-d') . "</td>";
                    $totalEnergy = $val['Value'] * $val['ConvFactor'];
                    $totalEnergy = $totalEnergy > 0 ? $totalEnergy / 4 : 0;
                    $convertValue = $this->convertValueCommaSeperated($totalEnergy);
                    $tbody .= "<td>" . $convertValue . "</td>";
                    $tbody .= '</tr>';
                    $sum += $totalEnergy;
                }
                $sum = $this->convertValueCommaSeperated($sum);
                $tbody .= "<tr class='font-weight-bold'><td colspan='2'>Grand Total: </td><td>$sum</td></tr>";
            } else {
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
            }

            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;

            $ar = array('pages_count' => '0', 'page_val' => '0', 'number_records' => '0', 'query1' => $query1, 'queryMaxValue' => $queryMaxValue, 'row_click' => 'true', 'type' => 'Energy', 'name_val' => $name_val);
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Handles row click action for energy layer data
     * Fetches and processes detailed energy layer data based on the selected row
     * @return array  Returns energy layer data for the selected row
     */
    public function rowClickEnergyLayer()
    {
        try {
            global $conn;
            $mst_id = $_POST['mst_id'];
            $name_val = $_POST['name_val'];
            $valid_from = $_POST['valid_from'];
            $valid_to = $_POST['valid_to'];
            $time_from = $_POST['time_from'];
            $time_to = $_POST['time_to'];
            $input_val_week_day = $_POST['input_val_week_day'];
            $select_day_week = $_POST['select_day_week'];

            $ind = 0;
            if ($select_day_week == 'day') {
                $ind = $input_val_week_day - 1;
            } else {
                $ind = $input_val_week_day * 7;
            }
            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
            $fromDateCheck = '';
            if ($dateValCheck <= $valid_from) {
                $fromDateCheck  = $valid_from;
            } else {
                $fromDateCheck  = $dateValCheck;
            }

            $thead = '<tr>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Datum</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Von Zeit</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
            $thead .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
            $thead .= '</tr>';


            $queryMaxValue = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where convert(date,time) between '$fromDateCheck' AND '$valid_to' AND convert(time,time) between '$time_from' AND '$time_to' AND mst_ID = '$mst_id' ";
            $query1 =  "Select * from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$valid_to' AND convert(time,time) between '$time_from' AND '$time_to' AND mst_ID = '$mst_id'  order by Time desc ";
            $resultQuery = queryDB($conn, $query1, "read");
            $tbody = '';
            if ($resultQuery != '' && count($resultQuery) > 0) {
                $sum = 0;
                $resultQuery = $this->getDateWiseScore($resultQuery);
                $currentDate = date('Y-m-d');
                if ($valid_to < $currentDate) {
                    for ($i = 0; $i < $input_val_week_day; $i++) {
                        $dateShiftEnd = date('Y-m-d', strtotime("-$i days"));
                        if ($valid_to < $dateShiftEnd) {
                            $tbody .= '<tr data-table-other="SchichtModelleAll">';
                            $tbody .= "<td>" . $name_val . "</td>";
                            $tbody .= "<td>" . $dateShiftEnd . "</td>";
                            $tbody .= "<td>" . $time_from . "</td>";
                            $tbody .= "<td>" . $time_to . "</td>";
                            $tbody .= "<td>Shift Ended</td>";
                            $tbody .= '</tr>';
                        }
                    }
                }
                else if (!array_key_exists($currentDate, $resultQuery)) {
                    $tbody .= '<tr data-table-other="SchichtModelleAll">';
                    $tbody .= "<td>" . $name_val . "</td>";
                    $tbody .= "<td>" . $currentDate . "</td>";
                    $tbody .= "<td>" . $time_from . "</td>";
                    $tbody .= "<td>" . $time_to . "</td>";
                    $tbody .= "<td>In Progress</td>";
                    $tbody .= '</tr>';
                }
                foreach ($resultQuery as $key => $val) {
                    $tbody .= '<tr data-table-other="SchichtModelleAll">';
                    $tbody .= "<td>" . $name_val . "</td>";
                    $tbody .= "<td>" . $val['date'] . "</td>";
                    $tbody .= "<td>" . $time_from . "</td>";
                    $tbody .= "<td>" . $time_to . "</td>";
                    $convertValue = $this->convertValueCommaSeperated($val['Value']);
                    $tbody .= "<td>" . $convertValue . "</td>";
                    $tbody .= '</tr>';
                    $sum += $val['Value'];
                }
                $sum = $this->convertValueCommaSeperated($sum);
                $tbody .= "<tr class='font-weight-bold'><td colspan='4'>Grand Total: </td><td>$sum</td></tr>";
                $paginationHTMl = "<div id='save_table_format' class='text-center'>
                <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                </div>";
                $records['pagination_html_energy'] =  $paginationHTMl;
            } else {
                $tbody .= '<tr>';
                $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                $tbody .= '</tr>';
            }

            $records['energy_header'] = $thead;
            $records['energy_html'] = $tbody;

            $ar = array('pages_count' => '0', 'page_val' => '0', 'number_records' => '0', 'query1' => $query1, 'queryMaxValue' => $queryMaxValue, 'row_click' => 'true', 'type' => 'Energy', 'name_val' => $name_val);
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves date-wise score data
     * Fetches and returns score values grouped or filtered by date
     * @return array  Returns date-wise score data
     */
    public function getDateWiseScore($data)
    {
        $groups = array();
        foreach ($data as $item) {
            $key = $item['Time']->format('Y-m-d');
            if (!array_key_exists($key, $groups)) {
                $groups[$key] = array(
                    'date' => $item['Time']->format('Y-m-d'),
                    'Value' => ($item['Value'] * $item['ConvFactor']) / 4,
                );
            } else {
                $groups[$key]['Value'] = $groups[$key]['Value'] + (($item['Value'] * $item['ConvFactor']) / 4);
            }
        }
        return $groups;
    }
    /**
     * Calculates energy consumed for a specific layer
     * Processes and computes the total energy consumption based on layer data
     * @return float|int  Returns calculated energy consumption value
     */
    public function calculateLayerEnergyConsumed($resultQuery, $dayVal, $dateVal)
    {
        try {
            global $conn;
            $energyConsumed = '';
            if ($resultQuery != '' && count($resultQuery) > 0) {
                $totalEnergy = 0;
                $todayDate = date('Y-m-d');
                $tbody = '';
                $arCheckExistName = [];
                $arValue = [];
                $inArrayTotalValue = 0;
                for ($i = 0; $i < count($resultQuery); $i++) {

                    $timeEnergy = $resultQuery[$i]['Time']->format('H:i:s');
                    $dateEnergy = $resultQuery[$i]['Time']->format('Y-m-d');
                    $modelNameQuery = "Select * from SchichtModelleAll where '$dateEnergy' between gueltigVon AND gueltigBis  AND '$timeEnergy' between uhrzeitVon AND uhrzeitBis ";
                    $modelNameResult = queryDB($conn, $modelNameQuery, "read");
                    $energyConsumed = ($resultQuery[$i]['Value'] * $resultQuery[$i]['ConvFactor']) / 4;
                    $totalEnergy += $energyConsumed;

                    if ($modelNameResult != '' && count($modelNameResult) > 0) {

                        for ($j = 0; $j < count($modelNameResult); $j++) {
                            $model_and_designation_name = $modelNameResult[$j]['modellBez'] . $modelNameResult[$j]['bezeichnung'];
                            if (!in_array($model_and_designation_name, $arCheckExistName)) {
                                array_push($arCheckExistName, $model_and_designation_name);

                                array_push($arValue, $modelNameResult[$j]);
                                $indArValue = count($arValue) - 1;
                                $arValue[$indArValue]['value'] = $energyConsumed;
                            } else {
                                if ($arValue != '' && count($arValue) > 0) {
                                    for ($k = 0; $k < count($arValue); $k++) {
                                        if ($arValue[$k]['modellBez'] == $modelNameResult[$j]['modellBez'] && $arValue[$k]['bezeichnung'] == $modelNameResult[$j]['bezeichnung']) {
                                            $energyConsumed = ($resultQuery[$i]['Value'] * $resultQuery[$i]['ConvFactor']) / 4;
                                            $particularEnergyConsumed = $energyConsumed + $arValue[$k]['value'];
                                            $arValue[$k]['value'] = $particularEnergyConsumed;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if ($i == count($resultQuery)) {
                    if ($arValue != '' && count($arValue) > 0) {
                        for ($j = 0; $j < count($arValue); $j++) {
                            $tbody .= '<tr>';
                            $tbody .= '<td>' . $dayVal . '</td>';
                            $tbody .= "<td>" . $arValue[$j]['modellBez'] . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['gueltigVon']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['gueltigBis']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['bezeichnung'] . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['uhrzeitVon']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['uhrzeitBis']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $arValue[$j]['value'] . "</td>";
                            $tbody .= '<td>' . $dateVal . '</td>';
                            $tbody .= '</tr>';
                        }
                    }
                }
                return array('tbody' => $tbody, 'total_energy' => $totalEnergy, 'inArrayTotalValue' => $inArrayTotalValue, 'ar_value' => $arValue);
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Calculates weekly energy consumption for a specific layer
     * Processes and computes total energy consumed over a week based on layer data
     * @return float|int  Returns calculated weekly energy consumption value
     */
    public function calculateLayerEnergyConsumedWeek($startWeekDate, $endWeekDate, $indMainLoop, $resultEnergy, $resultShiftName)
    {
        try {
            if ($resultEnergy != '' && count($resultEnergy) > 0) {
                $totalEnergy = 0;
                for ($i = 0; $i < count($resultEnergy); $i++) {
                    //calculate energy
                    $energyDate = $resultEnergy[$i]['Time']->format('Y-m-d');
                    $energyTime = $resultEnergy[$i]['Time']->format('H:i:s');

                    if ($indMainLoop == 1) {
                        if ($energyDate >= $startWeekDate && $energyDate <= $endWeekDate) {
                            $energyConsumed = ($resultEnergy[$i]['Value'] * $resultEnergy[$i]['ConvFactor']) / 4;
                            $totalEnergy += $energyConsumed;
                        }
                    } else {
                        if ($energyDate >= $startWeekDate && $energyDate < $endWeekDate) {
                            $energyConsumed = ($resultEnergy[$i]['Value'] * $resultEnergy[$i]['ConvFactor']) / 4;
                            $totalEnergy += $energyConsumed;
                        }
                    } 
                }
                return $totalEnergy;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for energy layer table header
     * Builds and returns HTML content for displaying the header of the energy layer table
     * @return string  Returns generated HTML for energy layer table header
     */    
    public function generateHtmlLayerTableEnergyDataHeader($rowclickTable = false)
    {
        try {
            $tr = '<tr>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Modal Name</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Designation</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid From</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Valid To</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time From</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Time To</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day From</th>';
            $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Day To</th>';
            if ($rowclickTable == 'true') {
                $tr .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Value</th>';
            }
            $tr .= '</tr>';
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for energy layer table data
     * Builds and returns HTML content for displaying energy layer data in table format
     * @return string  Returns generated HTML for energy layer table data
     */
    public function generateHtmlLayerTableEnergyData($dataMesaurement, $rowclickTable = false)
    {
        global $conn;
        $tr = '';
        $col_span = "colspan='60'";
        $data_table_other = "data-table-other='SchichtModelleAll'";
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';

                if ($rowclickTable == "") {
                    $class_val = 'class="row_click_energy"';
                }
                $valid_to = '';
                if ($value['gueltigBis'] != null) {
                    $valid_to = $value['gueltigBis']->format('Y-m-d');
                }
                $tr .= "<tr $style $class_val valid_from=" . $value['gueltigVon']->format('Y-m-d') . " valid_to='$valid_to'  data-type='1' $data_table_other>";
                $tr .= "<td>" . $value['modellBez'] . "</td>";
                $tr .= "<td>" . $value['bezeichnung'] . "</td>";     //Desingnation
                $tr .= "<td>" . $value['gueltigVon']->format('Y-m-d') . "</td>";  //Vaid From
                $tr .= "<td>$valid_to</td>";     //vaild to
                $tr .= "<td>" . $value['uhrzeitVon']->format('H:i') . "</td>";     //Time From
                $tr .= "<td>" . $value['uhrzeitBis']->format('H:i') . "</td>";     //Time to
                $tr .= "<td>" . $value['tagVon'] . "</td>";            //Day of 
                $tr .= "<td>" . $value['tagBis'] . "</td>";            //Day to
                $tr .= "</tr>";
            }
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates pagination HTML for energy layer data
     * Builds and returns pagination controls for navigating through energy layer records
     * @return string  Returns generated pagination HTML
     */
    public function generatePaginationHtmlLayerEnergyData($dataMesaurement, $page_val, $pagesCount)
    {
        try {
            //Pagination Code HTML
            if ($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val_energy_layer';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_energy_layer';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' id='previous_pagination_val_energy_layer'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style = 'display: none';
                    if ($i == $page_val) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl .= "<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val_energy_layer page-link' value='$i'></li>";

                    if ($i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl .= "<li class='page-item'><a class='page-link ' readonly id='last_input_val_energy_layer' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' id='next_pagination_val_energy_layer'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   

                $paginationHTMl .= "<li class ='page-item'>
                                        <select class='page-link select_pagination' id='energy_number_record_layer'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='energy_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the total number of product records
     * Fetches and returns the count of product records based on current filters or conditions
     * @return int  Returns the total number of product records
     */
    public function getNumberRecordsProduct()
    {
        try {
            global $conn;
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $queryTotalRecord  = "SELECT t1.prd_id from produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .= "where t1.iBdeType = 1 AND t1.prd_id != '0' ";
            $queryTotalRecord .= "GROUP BY t1.prd_id ";
            $resultQuery = queryDB($conn, $queryTotalRecord, "read");
            $totalRecordsValue = [];
            if ($resultQuery != false) {
                $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            }
            $total_number_records = count($totalRecordsValue);

            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                    $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                    $offSetVal = ($page_val - 1) * $number_records;

                    if ($page_val == $pagesCount) {
                        $number_records = $total_number_records - $offSetVal;
                    }
                }
            }
            $query1 = "SELECT * from produktionsAnlagenConfig as Mt ";
            $query1 .= "LEFT JOIN produkte as t2 ";
            $query1 .= "ON Mt.prd_iD = t2.prd_ID ";
            $query1 .= "WHERE iBdePrdktConf_ID  IN ( ";
            $query1 .= "SELECT max(t1.iBdePrdktConf_ID) FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_id != '0' ";
            $query1 .= "GROUP BY t1.prd_id ";
            $query1 .= "order by t1.prd_id desc ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $query1 .= ") ";
            $query1 .= "order by Mt.iBdePrdktConf_ID desc ";
            $resultQuery = queryDB($conn, $query1, "read");
            $tableFound = 'false';
            $dataProduct = [];
            if ($resultQuery != false) {
                $dataProduct = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;
            $tr = $this->generateAllProductTableHTML($dataProduct);
            $pagination_html = $this->generateAllProductPaginationHTML($page_val, $pagesCount, $dataProduct);
            $records['product_html'] = $tr;
            $records['pagination_html'] = $pagination_html;

            $records['data'] = "";
            if ($dataProduct == '' || count($dataProduct) <= 0) {
                $records['data'] = 'Es existieren keine Daten die ausgewertet werden können';
            }

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the total number of automatic product records
     * Fetches and returns the count of product records for automatic data
     * based on current filters or conditions
     * @return int  Returns the total number of automatic product records
     */
    public function getNumberRecordsProductAutomatic()
    {
        try {
            global $conn;
            $total_number_records = isset($_POST['total_number_records']) ? $_POST['total_number_records'] : 100;
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $product_type = $_POST['product_type'];
            $table_type = $product_type;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $tableProduct = $_POST['all_tables_product'];
            $columnsValue = $_POST['all_columns_product'];
            $columnsValue = str_replace('[', '', $columnsValue);
            $columnsValue = str_replace(']', '', $columnsValue);
            $columnsValue = str_replace('"', '', $columnsValue);
            $queryTotalRecord  = "SELECT TOP($total_number_records) $columnsValue from $tableProduct as t1 ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                    $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                    $offSetVal = ($page_val - 1) * $number_records;
                    //Only Valid when User Click on Last page
                    if ($page_val == $pagesCount) {
                        $number_records = $total_number_records - $offSetVal;
                    }
                }
            }

            $allColumns = json_decode($_POST['all_columns_product']);
            $allColumnDataType = json_decode($_POST['columnDataType']);
            $query1 = "SELECT $columnsValue from $tableProduct ";
            $query1 .= "Order by $allColumns[0] desc ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = $this->generateAllItemAutomaticTableHTML($dataProduct, $allColumns, $allColumnDataType);
            $th = $this->generateAllItemAutomaticTableHeaderHTML($dataProduct, $allColumns);
            $pagination_html = $this->generateAllItemAutomaticPaginationHTML($page_val, $pagesCount, $dataProduct);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;
            $table_filter = $_POST['all_tables_product'] . '*' . $_POST['all_columns_product'] . '*' . $_POST['total_number_records'];

            $ar = array('pages_count' => $pagesCount, 'page_val' => $page_val, 'number_records' => $number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Product', 'table_type' => $table_type, 'table_filter' => $table_filter);
            $records['query_data'] = $ar;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves all product tables
     * Fetches and returns a list of all available product tables
     * @return array  Returns product tables data
     */
    public function getAllProductTables()
    {
        try {
            global $conn;
            $product_type = $_POST['product_type'];
            $queryAllTables = "SELECT name from sys.Tables WHERE name IN ('anlagen','messmittel','messstellen','produkte','gespeicherteGraphDiagramme') order by name asc ";
            $queryAllTablesRecord = queryDB($conn, $queryAllTables, "read");
            $records['all_tables'] = $queryAllTablesRecord;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves all columns for product tables
     * Fetches and returns column details for all product tables
     * @return array  Returns product table column data
     */
    public function getAllColumnProductTables()
    {
        try {
            global $conn;
            $table_name = $_POST['table_name'];
            $queryColumnTables  = "Select column_name,data_type from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '$table_name' ";
            $queryColumnTablesRecord = queryDB($conn, $queryColumnTables, "read");
            $records['all_columns'] = $queryColumnTablesRecord;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for all items in the automatic table
     * Builds and returns HTML content for displaying all items in the automatic table format
     * @return string  Returns generated HTML for automatic table items
     */
    public function generateAllItemAutomaticTableHTML($dataProduct, $allColumns, $allColumnDataType)
    {
        try {
            global $conn;
            $tr = '';
            $col_span = 'colspan="50"';
            if ($dataProduct != '' && count($dataProduct) > 0) {
                for ($i = 0; $i < count($dataProduct); $i++) {
                    $tr .= "<tr data-table-other='true'>";
                    for ($j = 0; $j < count($allColumns); $j++) {
                        $columnName = $allColumns[$j];
                        $columnDataType = $allColumnDataType[$j];
                        if ($columnDataType == 'date' || $columnDataType == 'datetime') {
                            $tr .= "<td>" . $dataProduct[$i][$columnName] . "</td>";
                        } else {
                            $tr .= "<td>" . $dataProduct[$i][$columnName] . "</td>";
                        }
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
            }

            return $tr;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for the header of all items in the automatic table
     * Builds and returns HTML content for displaying column headers of the automatic table
     * @return string  Returns generated HTML for automatic table header
     */
    public function generateAllItemAutomaticTableHeaderHTML($dataProduct, $allColumns)
    {
        try {
            $tr = "<tr>";
            foreach ($allColumns as $val) {
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>$val</th>";
            }
            $tr .= "</tr>";
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates pagination HTML for all items in the automatic table
     * Builds and returns pagination controls for navigating through all automatic table items
     * @return string  Returns generated pagination HTML
     */
    public function generateAllItemAutomaticPaginationHTML($page_val, $pagesCount, $dataProduct, $prd_id = false, $analgen_config_id = false)
    {
        try {
            if ($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_product_automatic';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_product_automatic';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='prd_id_hidden' prd_id='$prd_id' analgen_config_id='$analgen_config_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' prd_id='$prd_id' id='previous_pagination_val_product_automatic'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    if ($i == $page_val || $i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item  $active '><input type='button' class='pagination_input_val_product_automatic page-link' prd_id='$prd_id' value='$i'></li>";
                    } else {
                        $paginationHTMl .= "<li class='page-item'><input type='button' class='pagination_input_val_product_automatic page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' prd_id='$prd_id' id='next_pagination_product_automatic'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format_product' class='text-center'>
                                    <input type='button' id='product_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";

                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for all product table data
     * Builds and returns HTML content for displaying all product records in table format
     * @return string  Returns generated HTML for product table data
     */
    public function generateAllProductTableHTML($dataProduct)
    {
        try {
            $tr = '';
            if ($dataProduct != '' && count($dataProduct) > 0 && !isset($dataProduct['error'])) {
                foreach ($dataProduct as $key => $value) {
                    $val_prd_ID = $value['prd_ID'];
                    $prd_name = $value['namePrd'];

                    $tr .= '<tr class="all_product_table_row_click" prd_id="' . $val_prd_ID . '" prd_name="' . $prd_name . '">';
                    $tr .= "<td>" . $value['namePrd'] . "</td>";
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='4' class='text-center all_product_table_row_click'>No Data</td></tr>";
            }

            return $tr;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates pagination HTML for all product data
     * Builds and returns pagination controls for navigating through all product records
     * @return string  Returns generated pagination HTML
     */
    public function generateAllProductPaginationHTML($page_val, $pagesCount, $dataProduct, $data_type = false, $mst_id = false)
    {
        try {
            if ($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val_all_product';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_all_product';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <div class=''>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val_all_product'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    if ($i == $page_val || $i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item  $active '><input type='button' class='pagination_input_val_all_product page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";
                    } else {
                        $paginationHTMl .= "<li class='page-item'><input type='button' class='pagination_input_val_all_product page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val_all_product'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";

                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves product table data on click
     * Fetches and returns product data based on table click interaction
     * @return array  Returns product table data for the selected action
     */
    public function getAllProductClickTable()
    {
        try {
            global $conn;
            $input_text_field = $_POST['input_text_field'];
            $prd_id = $_POST['prd_id'];
            $table_type = $_POST['table_type'];
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $order_condition = $_POST['order_by'];
            $queryTotalRecord = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .= "LEFT join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryTotalRecord .= "from produktionsAnlagenMoreOpt as t2 ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t2 ";
            $queryTotalRecord .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryTotalRecord .= "left join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $queryTotalRecord .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t3 ";
            $queryTotalRecord .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryTotalRecord .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            $queryTotalRecord .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryTotalRecord .= "where t1.iBdeType='1' ";
            $queryTotalRecord .= "AND t1.prd_iD = '$prd_id' ";
            $queryTotalRecord .= "order by t1.iBdePrdktConf_ID desc ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");

            $total_number_records = count($totalRecordsValue);
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                    $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                    $offSetVal = ($page_val - 1) * $number_records;

                    if ($page_val == $pagesCount) {
                        $number_records = $total_number_records - $offSetVal;
                    }
                }
            }
            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "LEFT join ";
            $query1 .= "( ";
            $query1 .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .= "from produktionsAnlagenMoreOpt as t2 ";
            $query1 .= ") ";
            $query1 .= "t2 ";
            $query1 .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "left join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as val ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "left join produkte as t4 on t1.prd_iD = t4.prd_ID ";
            $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.prd_ID = '$prd_id' ";
            $query1 .= "order by t3.val $order_condition ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = $this->getAllProductClickTableHTML($dataProduct);
            $th = $this->getAllProductClickTableHeaderHTML();
            $pagination_html = $this->getAllProductClickTablePagination($page_val, $pagesCount, $dataProduct, $prd_id);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;
            $table_filter = $_POST['prd_id'] . ',' . $_POST['order_by'];
            $ar = array('pages_count' => $pagesCount, 'page_val' => $page_val, 'number_records' => $number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Product', 'table_type' => $table_type, 'table_filter' => $table_filter);
            $records['query_data'] = $ar;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves data for a particular product entry on row click
     * Fetches and processes detailed information for the selected product entry
     * @return array  Returns data for the selected product entry
     */
    public function rowClickParticularProductEntry()
    {
        try {
            global $conn;
            $analgen_config_id = $_POST['analgen_config_id'];
            $page_val = isset($_POST['page_val']) ?  $_POST['page_val'] : 1;
            $number_records = 5;
            $pagesCount = '';
            $offSetVal = 0;
            $order_condition = $_POST['order_by'];

            $queryTotalRecord = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryTotalRecord .= "INNER join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryTotalRecord .= "from produktionsAnlagenMoreOpt as t2 ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t2 ";
            $queryTotalRecord .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryTotalRecord .= "INNER join ";
            $queryTotalRecord .= "( ";
            $queryTotalRecord .= "select t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
            $queryTotalRecord .= "from masseneingabeSuchePrdIMw  as t3 ";
            $queryTotalRecord .= ") ";
            $queryTotalRecord .= "t3 ";
            $queryTotalRecord .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryTotalRecord .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryTotalRecord .= "where t1.iBdeType='1' ";
            $queryTotalRecord .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryTotalRecord .= "order by t3.val $order_condition ";
            $totalRecordsValue = queryDB($conn, $queryTotalRecord, "read");
            $total_number_records = count($totalRecordsValue);

            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                    $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                    $offSetVal = ($page_val - 1) * $number_records;

                    if ($page_val == $pagesCount) {
                        $number_records = $total_number_records - $offSetVal;
                    }
                }
            }

            $queryMaxValue = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $queryMaxValue .= "INNER join ";
            $queryMaxValue .= "( ";
            $queryMaxValue .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryMaxValue .= "from produktionsAnlagenMoreOpt as t2 ";
            $queryMaxValue .= ") ";
            $queryMaxValue .= "t2 ";
            $queryMaxValue .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryMaxValue .= "INNER join ";
            $queryMaxValue .= "( ";
            $queryMaxValue .= "select t3.prd_anl_ID as table_3_prd_anl_Id , max(cast(t3.val as int)) as val ";
            $queryMaxValue .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
            $queryMaxValue .= ") ";
            $queryMaxValue .= "t3 ";
            $queryMaxValue .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryMaxValue .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $queryMaxValue .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryMaxValue .= "order by t3.val $order_condition ";

            $queryMaximum = $queryMaxValue;
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            $query1 = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $query1 .= "from produktionsAnlagenMoreOpt as t2 ";
            $query1 .= ") ";
            $query1 .= "t2 ";
            $query1 .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $query1 .= "INNER join ";
            $query1 .= "( ";
            $query1 .= "select t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val , t3.on_date, t3.on_week ";
            $query1 .= "from masseneingabeSuchePrdIMw  as t3 ";
            $query1 .= ") ";
            $query1 .= "t3 ";
            $query1 .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $query1 .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
            $query1 .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $query1 .= "order by t3.val $order_condition ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = $this->getAllProductClickTableHTML($dataProduct, $queryMaxVal);
            $th = $this->rowClickParticularProductHeaderHtml();
            $pagination_html = $this->getAllProductClickTablePagination($page_val, $pagesCount, $dataProduct, '', $analgen_config_id);
            $records['product_html'] = $tr;
            $records['product_table_header'] = $th;
            $records['pagination_html'] = $pagination_html;

            $ar = array('pages_count' => $pagesCount, 'page_val' => $page_val, 'number_records' => $number_records, 'query1' => $query1, 'queryMaxValue' => $queryMaximum, 'row_click' => 'true', 'type' => 'Product');
            $records['query_data'] = $ar;

            $queryLastDate = "SELECT  TOP(1)* FROM produktionsAnlagenConfig as t1 ";
            $queryLastDate .= "INNER join ";
            $queryLastDate .= "( ";
            $queryLastDate .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
            $queryLastDate .= "from produktionsAnlagenMoreOpt as t2 ";
            $queryLastDate .= ") ";
            $queryLastDate .= "t2 ";
            $queryLastDate .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
            $queryLastDate .= "INNER join ";
            $queryLastDate .= "( ";
            $queryLastDate .= "select t3.prd_anl_ID as table_3_prd_anl_Id , t3.type, t3.val ,t3.id, t3.on_date, t3.on_week ";
            $queryLastDate .= "from masseneingabeSuchePrdIMw  as t3 ";
            $queryLastDate .= ") ";
            $queryLastDate .= "t3 ";
            $queryLastDate .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
            $queryLastDate .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
            $queryLastDate .= "order by t3.id  desc ";
            $queryLastDateResult = queryDB($conn, $queryLastDate, "read");
            $records['queryLastDate'] = $queryLastDateResult;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for product table header on click
     * Builds and returns HTML content for displaying column headers
     * when a product table is selected
     * @return string  Returns generated HTML for product table header
     */
    public function getAllProductClickTableHeaderHTML()
    {
        try {
            $tr = "<tr>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datiert erstellen </th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Gesamteinheiten</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
            $tr .= "</tr>";
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for header of a particular product entry on row click
     * Builds and returns HTML content for displaying column headers
     * for the selected product entry
     * @return string  Returns generated HTML for product entry header
     */
    public function rowClickParticularProductHeaderHtml()
    {
        try {
            $tr = "<tr>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Artikelname</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Zeitintervall Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
            $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Verbrauchte Einheiten</th>";
            $tr .= "</tr>";
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for product table data on click
     * Builds and returns HTML content for displaying product records
     * when a product table is selected
     * @return string  Returns generated HTML for product table data
     */
    public function getAllProductClickTableHTML($dataProduct, $queryMaxVal = false)
    {
        try {
            $tr = '';
            $col_span = '';
            if ($queryMaxVal == "") {
                $col_span = "colspan='5'";
            } else if ($queryMaxVal != '') {
                $col_span = "colspan='4'";
            }

            if ($dataProduct != '' && count($dataProduct) > 0) {
                foreach ($dataProduct as $key => $value) {

                    $class_val = '';
                    $style = '';
                    $attr = '';
                    if ($queryMaxVal == "") {
                        $class_val = 'class="row_click_particular_product_entry"';
                    } else if ($queryMaxVal != '' && $queryMaxVal == $value['val']) {
                        $style = "style='background-color: #f77171'";
                        $attr = 'data-max-row="true"';
                    }

                    $val_prd_ID = '';
                    $prd_name = '';
                    if ($queryMaxVal == '') {
                        $val_prd_ID = $value['prd_ID'];
                        $prd_name = $value['namePrd'];
                    }

                    $tr .= "<tr $style $class_val $attr prd_id='$val_prd_ID' analgen_config_id=" . $value['iBdePrdktConf_ID'] . " data-table-other='false' prd_name='$prd_name'>";
                    $tr .= "<td>" . $value['bezeichnungAnl'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }

                    //Units Checks
                    $unit = '';
                    if ($value['unt_ID'] == "1") {
                        $unit = "Hrs.";
                    } else if ($value['unt_ID'] == "2") {
                        $unit = "kWh";
                    } else if ($value['unt_ID'] == "3") {
                        $unit = "m³";
                    } else if ($value['unt_ID'] == "4") {
                        $unit = "l";
                    } else if ($value['unt_ID'] == "5") {
                        $unit = "kg";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        if ($queryMaxVal != '') {
                            $tr .= "<td>" . $value['on_week'] . '-' . $value['on_date'] . "</td>";
                        } else {
                            $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                        }
                    } else if ($queryMaxVal != '') {
                        $tr .= "<td>" . $value['on_date'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['val'] == null) {
                        $tr .= "<td> - </td>";
                        if ($queryMaxVal == '') {
                            $tr .= "<td><label class='badge badge-danger'>Pending </label></td>";
                        }
                    } else {
                        $tr .= "<td>" . $value['val'] . ' ' . $unit . "</td>";
                        if ($queryMaxVal == '') {
                            $tr .= "<td><label class='badge badge-success'>Active </label></td>";
                        }
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
            }

            return $tr;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates pagination HTML for product table on click
     * Builds and returns pagination controls for navigating through
     * product records when a table is selected
     * @return string  Returns generated pagination HTML
     */
    public function getAllProductClickTablePagination($page_val, $pagesCount, $dataProduct, $prd_id = false, $analgen_config_id = false)
    {
        try {
            if ($page_val > 0 && $pagesCount > 0 && $dataProduct != '' && count($dataProduct) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val_particluar_product';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val_particluar_product';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='prd_id_hidden' prd_id='$prd_id' analgen_config_id='$analgen_config_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' prd_id='$prd_id' id='previous_pagination_val_particular_product'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';

                    if ($i == $page_val || $i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item  $active '><input type='button' class='pagination_input_val_particular_product page-link' prd_id='$prd_id' value='$i'></li>";
                    } else {
                        $paginationHTMl .= "<li class='page-item'><input type='button' class='pagination_input_val_particular_product page-link' prd_id='$prd_id' value='$i'></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' prd_id='$prd_id' id='next_pagination_val_particular_product'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format_product' class='text-center'>
                                    <input type='button' id='product_modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";

                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the total number of production data records
     * Fetches and returns the count of production data records
     * based on current filters or conditions
     * @return int  Returns the total number of production data records
     */
    public function getNumberRecordsProductionData()
    {
        try {
            global $conn;
            $number_records = $_POST['number_records'];

            $query1 = "SELECT  TOP($number_records) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
            $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
            $query1 .= "where t1.iBdeType='1' order by t1.iBdePrdktConf_ID desc";
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = '';
            if ($dataProduct != '' && count($dataProduct) > 0) {
                foreach ($dataProduct as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['namePrd'] . "</td>";
                    $tr .= "<td>" . $value['bezeichnungAnl'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }

            $records['production_data_html'] = $tr;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves alert data
     */
    public function getAlerts()
    {
        try {
            global $conn;
            //Measurement Table Entries
            $query1 = "SELECT TOP(40) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1  .= "AND (min_val IS NULL ";
            $query1  .= "OR  max_val IS NULL) ";
            $query1 .=  "order by T1.iBdePrdktConf_ID desc ";
            $dataMesaurement = queryDB($conn, $query1, "read");
            $tr = '';
            if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
                foreach ($dataMesaurement as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['mstIMw'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['min_val'] == null  && $value['max_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    } else if ($value['min_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    } else if ($value['max_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }
                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }

            //2nd Case  Min Value Greater
            $query1 = "SELECT TOP(20) * ";
            $query1 .= "FROM produktionsAnlagenConfig as T1 ";
            $query1  .= "where T1.iBdeType='2' ";
            $query1  .= "AND (cast(t1.min_val as int) >= cast(t1.max_val as int)) ";
            $query1 .=  "order by T1.iBdePrdktConf_ID desc ";
            $dataMesaurement = queryDB($conn, $query1, "read");

            if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
                foreach ($dataMesaurement as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['mstIMw'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['min_val'] != null  && $value['max_val'] != null) {
                        $tr .= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }
                    $tr .= "</tr>";
                }
            }

            $records['alerts_min_max_null_mesurement_tables'] = $tr;
            //Product Tale Entries
            $query1 = "SELECT TOP(40) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
            $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
            $query1 .= "where t1.iBdeType='1' ";
            $query1 .= "AND (t1.min_val is null or t1.max_val is null) ";
            $query1  .= "order by t1.iBdePrdktConf_ID desc ";
            $dataProduct = queryDB($conn, $query1, "read");
            $tr = '';
            if ($dataProduct != '' && count($dataProduct) > 0) {
                foreach ($dataProduct as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['namePrd'] . "</td>";
                    $tr .= "<td>" . $value['bezeichnungAnl'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['min_val'] == null  && $value['max_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    } else if ($value['min_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    } else if ($value['max_val'] == null) {
                        $tr .= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='5' class='text-center'>No Data</td></tr>";
            }
            //2nd Case Product Min Value Greater
            $query1 = "SELECT TOP(20) * FROM produktionsAnlagenConfig as t1 ";
            $query1 .= "left join produkte as t2 on t1.prd_ID = t2.prd_ID ";
            $query1 .= "left join anlagen as t3 on t1.anl_id = t3.anl_ID ";
            $query1 .= "where t1.iBdeType='1' ";
            $query1 .= "AND (cast(t1.min_val as int ) >= cast(t1.max_val as int)) ";
            $query1  .= "order by t1.iBdePrdktConf_ID desc ";
            $dataProduct = queryDB($conn, $query1, "read");
            if ($dataProduct != '' && count($dataProduct) > 0) {
                foreach ($dataProduct as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['namePrd'] . "</td>";
                    $tr .= "<td>" . $value['bezeichnungAnl'] . "</td>";
                    if ($value['intTp_ID'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['intTp_ID'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['intTp_ID'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['intTp_ID'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['intTp_ID'] == "2" && $value['startWeek'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }
                    if ($value['min_val'] != null  && $value['max_val'] != null) {
                        $tr .= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr .= "</tr>";
                }
            }

            $records['alerts_min_max_null_product_tables'] = $tr;
            //<--Energy Table
            $energyData = "SELECT TOP(40) * FROM interneBetriebsdatenHistorie As T1 ";
            $energyData .= "WHERE (t1.invest_min is null or t1.invest_max is null) ";
            $energyData .= "AND T1.deleted <> 'true' ";
            $energyData .= "AND T1.archiviert ='true' ";
            $energyData  .= "order by t1.histID desc ";
            $dataEnergy = queryDB($conn, $energyData, "read");
            $tr = '';
            if ($dataEnergy != '' && count($dataEnergy) > 0) {
                foreach ($dataEnergy as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['anlIMw'] . "</td>";
                    if ($value['zeitintervallAnl'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['zeitintervallAnl'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['zeitintervallAnl'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['zeitintervallAnl'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['zeitintervallAnl'] == "2" && $value['zeitintervallAnl'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }

                    if ($value['invest_min'] == null && $value['invest_max'] == null) {
                        $tr .= "<td><label class='text-danger'>Min and Max Value Empty</label></td>";
                    } else if ($value['invest_min'] == null) {
                        $tr .= "<td><label class='text-danger'>Min Value Empty</label></td>";
                    } else if ($value['invest_max'] == null) {
                        $tr .= "<td><label class='text-danger'>Max Value Empty</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr .= "</tr>";
                }
            } else {
                $tr = "<tr><td colspan='4' class='text-center'>No Data</td></tr>";
            }


            //2nd case Energy Data Min Value is Greater
            $energyData = "SELECT TOP(20) * FROM interneBetriebsdatenHistorie As T1 ";
            $energyData .= "WHERE (cast(t1.invest_min as int) >= cast(t1.invest_max as int)) ";
            $energyData .= "AND T1.deleted <> 'true' ";
            $energyData .= "AND T1.archiviert ='true' ";
            $energyData  .= "order by t1.histID desc ";
            $dataEnergy = queryDB($conn, $energyData, "read");
            if ($dataEnergy != '' && count($dataEnergy) > 0) {
                foreach ($dataEnergy as $key => $value) {
                    $tr .= '<tr>';
                    $tr .= "<td>" . $value['anlIMw'] . "</td>";
                    if ($value['zeitintervallAnl'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($value['zeitintervallAnl'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($value['zeitintervallAnl'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($value['zeitintervallAnl'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    if ($value['zeitintervallAnl'] == "2" && $value['zeitintervallAnl'] != '') {
                        $tr .= "<td>" . $value['startWeek'] . '-' . $value['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $value['startDate'] . "</td>";
                    }

                    if ($value['invest_min'] != null && $value['invest_max'] != null) {
                        $tr .= "<td><label class='text-danger'>Min Value Greater</label></td>";
                    } else {
                        $tr .= "<td><label class='badge badge-danger'>NA </label></td>";
                    }

                    $tr .= "</tr>";
                }
            }

            $records['alerts_min_max_null_energy_tables'] = $tr;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard chart data
     * Fetches and prepares data for rendering charts on the dashboard
     * @return array  Returns dashboard chart data
     */
    public function getDashBoardChart()
    {
        try {
            global $conn;
            $ar = [];
            $current_date = date('Y-m-d');
            for ($i = 1; $i <= 6; $i++) {
                $days_val = 5 * $i;
                $date_differnce = date('Y-m-d', strtotime("-$days_val days"));
                $queryTotalRecords = "SELECT SUM(cast(T2.val as int)) as val ";
                $queryTotalRecords .= "FROM produktionsAnlagenConfig as T1 ";
                $queryTotalRecords .= "INNER JOIN masseneingabeSucheIMw as T2 ";
                $queryTotalRecords .= "ON T1.mst_ID = T2.mst_ID ";
                $queryTotalRecords .= "WHERE T2.on_date >= '$date_differnce' ";
                $queryTotalRecords .= "AND T2.on_date <= '$current_date' ";
                $queryTotalRecords .= "AND T2.type = '1' ";
                $queryTotalRecords .= "AND T1.intTp_ID = '1' ";
                $queryTotalRecords .= "AND T1.iBdeType = '2' ";
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");

                array_push($ar, $totalRecordsValue);
            }

            $energy_chart['energy_chart_ar'] = $ar;

            //Reports Details Charts
            $date_differnce_days = date('Y-m-d H:i:s', strtotime('-30 days'));

            //Total Energy
            $TotalenergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $TotalenergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $TotalenergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $TotalenergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $TotalenergyConsumed .= "AND T1.deleted <> 'true' ";
            $TotalenergyConsumed .= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $TotalenergyConsumed, "read");
            $energy_chart['totalEnergyConsumed'] = $dataEnergy;

            //Days Energy
            $daysEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $daysEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $daysEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $daysEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $daysEnergyConsumed .= "AND T1.zeitintervallAnl = '1' ";
            $daysEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $daysEnergyConsumed .= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $daysEnergyConsumed, "read");
            $energy_chart['daysEnergyConsumed'] = $dataEnergy;


            //Week Energy
            $weekEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $weekEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $weekEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $weekEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $weekEnergyConsumed .= "AND T1.zeitintervallAnl = '2' ";
            $weekEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $weekEnergyConsumed .= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $weekEnergyConsumed, "read");
            $energy_chart['weekEnergyConsumed'] = $dataEnergy;

            //Month Energy
            $monthEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $monthEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $monthEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $monthEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $monthEnergyConsumed .= "AND T1.zeitintervallAnl = '3' ";
            $monthEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $monthEnergyConsumed .= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $monthEnergyConsumed, "read");
            $energy_chart['monthEnergyConsumed'] = $dataEnergy;


            //Year Energy
            $yearEnergyConsumed = "SELECT SUM(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $yearEnergyConsumed .= "LEFT JOIN masseneingabeSucheIMw as T2 ";
            $yearEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $yearEnergyConsumed .= "WHERE T1.created_on >= convert(datetime,'$date_differnce_days',101) ";
            $yearEnergyConsumed .= "AND T1.zeitintervallAnl = '4' ";
            $yearEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $yearEnergyConsumed .= "AND T1.archiviert ='true' ";
            $dataEnergy = queryDB($conn, $yearEnergyConsumed, "read");
            $energy_chart['yearEnergyConsumed'] = $dataEnergy;

            echo json_encode($energy_chart, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves energy consumption data for the last five days
     * Fetches and processes energy consumption records for the past five days
     * for analysis or chart visualization
     * @return array  Returns five-day energy consumption data
     */
    public function getDataFiveDaysEnergyConsumeed()
    {
        try {
            global $conn;
            $date_differnce_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            //Get Max Energy Consumed Five Days
            $maxFiveDayEnergyConsumed = "SELECT max(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $maxFiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $maxFiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $maxFiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $maxFiveDayEnergyConsumed .= "AND T2.on_date <= '$current_date' ";
            $maxFiveDayEnergyConsumed .= "AND T2.type ='1' ";
            $maxFiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $maxFiveDayEnergyConsumed .= "AND T1.archiviert ='true' ";
            $maxdataEnergy = queryDB($conn, $maxFiveDayEnergyConsumed, "read");
            $total_max_energy = count($maxdataEnergy) > 0 ? $maxdataEnergy[0]['val'] : '';

            //Total Sum Energy Consumed 
            $totalSumFiveDayEnergyConsumed = "SELECT sum(cast(T2.val as int)) as val FROM interneBetriebsdatenHistorie As T1 ";
            $totalSumFiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $totalSumFiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $totalSumFiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $totalSumFiveDayEnergyConsumed .= "AND T2.on_date <= '$current_date' ";
            $totalSumFiveDayEnergyConsumed .= "AND T2.type ='1' ";
            $totalSumFiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $totalSumFiveDayEnergyConsumed .= "AND T1.archiviert ='true' ";
            $totalSumDataEnergyConsumed = queryDB($conn, $totalSumFiveDayEnergyConsumed, "read");
            $energyData['totalSumDataEnergyConsumed'] = $totalSumDataEnergyConsumed;

            //Data Five Days
            $fiveDayEnergyConsumed = "SELECT * FROM interneBetriebsdatenHistorie As T1 ";
            $fiveDayEnergyConsumed .= "INNER JOIN masseneingabeSucheIMw as T2 ";
            $fiveDayEnergyConsumed .= "ON T1.mstID = T2.mst_ID ";
            $fiveDayEnergyConsumed .= "WHERE T2.on_date >= '$date_differnce_days' ";
            $fiveDayEnergyConsumed .= "AND T2.on_date <= '$current_date' ";
            $fiveDayEnergyConsumed .= "AND T2.type ='1' ";
            $fiveDayEnergyConsumed .= "AND T1.deleted <> 'true' ";
            $fiveDayEnergyConsumed .= "AND T1.archiviert ='true' ";
            $fiveDayEnergyConsumed .= "order by T2.on_date desc ";
            $dataEnergy = queryDB($conn, $fiveDayEnergyConsumed, "read");
            $tr = '';

            if (count($dataEnergy) > 0) {
                for ($i = 0; $i < count($dataEnergy); $i++) {
                    $dateFormat = $dataEnergy[$i]['on_date'];
                    $day = date('D', strtotime($dateFormat));

                    $style = '';
                    if ($total_max_energy != '' && $total_max_energy == $dataEnergy[$i]['val']) {
                        $style = "style='background-color: #f77171'";
                    }

                    $tr .= "<tr $style>";
                    $tr .= "<td>" . $dataEnergy[$i]['anlIMw'] . "</td>";
                    if ($dataEnergy[$i]['zeitintervallAnl'] == "1") {
                        $tr .= "<td>Days</td>";
                    } else if ($dataEnergy[$i]['zeitintervallAnl'] == "2") {
                        $tr .= "<td>Weeks</td>";
                    } else if ($dataEnergy[$i]['zeitintervallAnl'] == "3") {
                        $tr .= "<td>Months</td>";
                    } else if ($dataEnergy[$i]['zeitintervallAnl'] == "4") {
                        $tr .= "<td>Years</td>";
                    } else {
                        $tr .= "<td></td>";
                    }
                    $tr .= "<td>" . $day . "</td>";
                    if ($dataEnergy[$i]['zeitintervallAnl'] == "2" && $dataEnergy[$i]['zeitintervallAnl'] != '') {
                        $tr .= "<td>" . $dataEnergy[$i]['startWeek'] . '-' . $dataEnergy[$i]['startDate'] . "</td>";
                    } else {
                        $tr .= "<td>" . $dataEnergy[$i]['on_date'] . "</td>";
                    }

                    $tr .= "<td>" . $dataEnergy[$i]['val'] . "<p class='energy_unit text-muted'>kWh</p></td>";
                    $tr .= "</tr>";
                }
            } else {
                $tr .= "<tr><td colspan='5' class='text-center'>No Record Found</td></tr>";
            }
            $energyData['five_days_energy_data'] = $tr;


            echo json_encode($energyData, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dimension data
     * Fetches and returns dimension-related configuration or values
     * used across the application
     * @return array  Returns dimension data
     */
    public function getDimentions()
    {

        $classPrdAutomatic = $_POST['classPrdAutomatic'];
        $conn = '';
        if ($classPrdAutomatic == 'true') {
            $conn = connectToDB('gipscomm');
        } else {
            $nameDB = $_POST['nameDB'];
            $conn = connectToDB($nameDB);
        }

        $username = $_SESSION['username'];
        $id = $_POST['id'];
        $getResult =  "SELECT * from tableFormat where id='$id' AND username = '$username' ";
        $dataResult = queryDB($conn, $getResult, "read");
        return array('data' => $dataResult[0]);
    }
    /**
     * Retrieves overall count data for tile click
     * Fetches and returns aggregated count values displayed on dashboard tiles
     * @return array  Returns overall tile count data
     */
    public function getTileClickOverAllCount()
    {
        try {
            global $conn;
            $id = $_REQUEST['id'];
            $mst_id = $_REQUEST['mst_id'];

            $queryTableFormat = "Select * from tableFormat where id = $id ";
            $getResult = queryDB($conn, $queryTableFormat, "read");
            if ($getResult[0]['table_other'] == "true") {
                $this->getTileClickOverAllCountAutomatic();
                die;
            }

            $totalSum = '';
            $resultUnit = '';
            if ($getResult[0]['type'] == 'Measurement') {
                $queryTotalSum = "SELECT sum(cast(t2.val as int)) as total_value from produktionsAnlagenConfig  as t1 ";
                $queryTotalSum .= "INNER JOIN masseneingabeSucheIMw as t2 ";
                $queryTotalSum .= "ON t1.mst_ID = t2.mst_ID ";
                $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
                $totalSum = queryDB($conn, $queryTotalSum, "read");
                $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';

                $queryUnit = "SELECT unt_ID,mstIMw FROM produktionsAnlagenConfig where mst_ID = $mst_id ";
                $resultUnit = queryDB($conn, $queryUnit, "read");
                $record['name_value'] = $resultUnit[0]['mstIMw'];
            } else if ($getResult[0]['type'] == 'Energy') {
                $queryTotalSum = "SELECT sum(cast(t2.val as int)) as total_value from interneMesswerteConfig  as t1 ";
                $queryTotalSum .= "INNER JOIN masseneingabeSucheIMw as t2 ";
                $queryTotalSum .= "ON t1.mst_ID = t2.mst_ID ";
                $queryTotalSum .=  "INNER JOIN ";
                $queryTotalSum .= "MessstellenAnlagen  as T3 ";
                $queryTotalSum .= "ON T1.mst_ID = T3.mst_ID ";
                $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
                $totalSum = queryDB($conn, $queryTotalSum, "read");
                $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';

                $queryUnit = "SELECT unt_ID,nameMST FROM interneMesswerteConfig as t1 ";
                $queryUnit .= "INNER JOIN masseneingabeSucheIMw as t2 ";
                $queryUnit .= "ON t1.mst_ID = t2.mst_ID ";
                $queryUnit .=  "INNER JOIN ";
                $queryUnit .= "MessstellenAnlagen  as T3 ";
                $queryUnit .= "ON T1.mst_ID = T3.mst_ID ";
                $queryUnit .= "where t1.mst_ID = $mst_id ";
                $resultUnit = queryDB($conn, $queryUnit, "read");
                $record['name_value'] = $resultUnit[0]['nameMST'];
            } else if ($getResult[0]['type'] == 'Product') {
                $analgen_config_id = $getResult[0]['prd_anlagen_config_id'];

                $queryTotalSum = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryTotalSum .= "INNER join ";
                $queryTotalSum .= "( ";
                $queryTotalSum .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryTotalSum .= "from produktionsAnlagenMoreOpt as t2 ";
                $queryTotalSum .= ") ";
                $queryTotalSum .= "t2 ";
                $queryTotalSum .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryTotalSum .= "INNER join ";
                $queryTotalSum .= "( ";
                $queryTotalSum .= "select t3.prd_anl_ID as table_3_prd_anl_Id , sum(cast(t3.val as int)) as total_value ";
                $queryTotalSum .= "from masseneingabeSuchePrdIMw  as t3 group by t3.prd_anl_ID ";
                $queryTotalSum .= ") ";
                $queryTotalSum .= "t3 ";
                $queryTotalSum .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryTotalSum .= "left join anlagen as t5 on t1.anl_id = t5.anl_ID ";
                $queryTotalSum .= "where t1.iBdeType='1' AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $totalSum = queryDB($conn, $queryTotalSum, "read");
                $totalSum = $totalSum[0]['total_value'] != null ?  $totalSum[0]['total_value'] : '';

                $queryUnit = "SELECT t1.unt_ID, t2.bezeichnungAnl,t3.namePrd FROM produktionsAnlagenConfig as t1 ";
                $queryUnit .= "INNER JOIN anlagen as t2 ";
                $queryUnit .= "ON t1.anl_id = t2.anl_Id ";
                $queryUnit .= "INNER JOIN produkte as t3 ";
                $queryUnit .= "ON t1.prd_Id = t3.prd_Id ";
                $queryUnit .= "where t1.iBdePrdktConf_ID = $analgen_config_id ";
                $resultUnit = queryDB($conn, $queryUnit, "read");

                $record['name_value'] = $resultUnit[0]['bezeichnungAnl'];
                $record['prd_name'] = $resultUnit[0]['namePrd'];
            }
            // Units Checks
            $unit = '';
            if ($resultUnit != null) {
                if ($resultUnit[0]['unt_ID'] == "1") {
                    $unit = "Hrs.";
                } else if ($resultUnit[0]['unt_ID'] == "2") {
                    $unit = "kWh";
                } else if ($resultUnit[0]['unt_ID'] == "3") {
                    $unit = "m³";
                } else if ($resultUnit[0]['unt_ID'] == "4") {

                    $unit = "l";
                } else if ($resultUnit[0]['unt_ID'] == "5") {
                    $unit = "kg";
                }
            }

            $total_name_merge = '';
            if ($totalSum != '' && $resultUnit != null) {
                $total_name_merge = $totalSum . ' ' . $unit;
            }
            $record['total_sum'] = $total_name_merge;
            $record['measurement_type'] = 'Mannual';
            echo json_encode($record, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard table data
     * Fetches and returns data to populate tables displayed on the dashboard
     * @return array  Returns dashboard table data
     */
    public function getTableDashboardData()
    {
        try {
            global $conn;
            $id = $_REQUEST['id'];
            $username = $_SESSION['username'];
            $getResult = "SELECT * from tableFormat WHERE username = '$username' AND id = $id ";
            $dataResult = queryDB($conn, $getResult, "read");
            if ($dataResult != '' && count($dataResult) > 0) {
                
                $dataMeasurement = '';
                if ($dataResult[0]['row_click'] == 'false' && $dataResult[0]['query_max_val'] == '') {
                    
                    //Seacrh Record 
                    $firstPostion =  strpos($dataResult[0]['query_data_records'], '%');
                    $lastPostion = strripos($dataResult[0]['query_data_records'], '%');
                    $subStr = "%";
                    $attachment = "$";
                    if ($firstPostion != '' && $lastPostion != '') {
                        $firstPostionQuery = substr_replace($dataResult[0]['query_data_records'], $attachment, $firstPostion);
                        $firstPostionQuery = str_replace('%', "%'", $firstPostionQuery);
                        $firstPostionQuery = str_replace('$', "'%", $firstPostionQuery);
                        $dataMeasurement = queryDB($conn, $firstPostionQuery, "read");
                    } else {
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                    }
                    $dashboardMeasurementHtml = '';
                    
                    if ($dataResult[0]['table_other'] == 'false') {
                        
                        if ($dataResult[0]['type'] == 'Energy') {
                            $dashboardMeasurementHtml = $this->dashboardEnergyHtml($dataMeasurement);
                        } else if ($dataResult[0]['type'] == 'Measurement') {
                            $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement);
                        } else if ($dataResult[0]['type'] == 'Product') {
                            $dashboardMeasurementHtml = $this->dashboardProductHtml($dataMeasurement);
                        }
                    } else if ($dataResult[0]['table_other'] == 'schichtModelle') {
                        
                        $dashboardMeasurementHtml = $this->dashboardEnergyLayerHtmlChecked($dataMeasurement);
                    } elseif ($dataResult[0]['table_other'] == 'schichtModelleHist') {
                        
                        $dashboardMeasurementHtml = $this->dashboardEnergyLayerHtml($dataMeasurement);
                    } else {
                        
                        $dashboardMeasurementHtml = $this->dashboardMeasurementHtmlAutomatic($dataMeasurement);
                    }
                    $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($dataResult[0]['row_click'] == 'true' && ($dataResult[0]['table_other'] == 'schichtModelle' || $dataResult[0]['table_other'] == 'schichtModelleHist')) {
                    $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");

                    $dashboardMeasurementHtml = $this->dashboardRowClickEnergyLayerHtml($dataMeasurement);
                    $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else {
                    if ($dataResult[0]['tile_data_type'] == 'table') {
                        $dataMeasurement = queryDB($conn, $dataResult[0]['query_data_records'], "read");
                        $queryMaxValue = queryDB($conn, $dataResult[0]['query_max_val'], "read");
                        $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';
                        $dashboardMeasurementHtml = '';
                        if ($dataResult[0]['table_other'] == 'false') {
                            if ($dataResult[0]['type'] == 'Energy') {
                                $dashboardMeasurementHtml = $this->dashboardEnergyHtml($dataMeasurement, $queryMaxVal);
                            } else if ($dataResult[0]['type'] == 'Measurement') {
                                $dashboardMeasurementHtml = $this->dashboardMeasurementHtml($dataMeasurement, $queryMaxVal);
                            } else if ($dataResult[0]['type'] == 'Product') {
                                $dashboardMeasurementHtml = $this->dashboardProductHtml($dataMeasurement, $queryMaxVal);
                            }
                        } else {
                            $dashboardMeasurementHtml = $this->dashboardMeasurementHtmlAutomatic($dataMeasurement, $queryMaxVal);
                        }
                        $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

                        echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                        die;
                    }
                }
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            } else {
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Name</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Time Interval</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Created Date</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Total Units</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Status</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
                $tr .= "<tbody><tr><td colspan='5' class='text-center'>No Data</td></tr></tbody>";
                $records['dashboardMeasurementHtml'] = $tr;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for checked energy layer dashboard view
     * Builds and returns HTML content for displaying selected/checked energy layer data
     * @return string  Returns generated HTML for checked energy layer dashboard
     */
    public function dashboardEnergyLayerHtmlChecked($dataMesaurement)
    {
        global $conn;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Created Date</th>';
        $tr .= '<th>Property</th>';
        $tr .= '<th>Valid From</th>';
        $tr .= '<th>Quantity</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "6";
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            $tr .= "<tbody>";
            foreach ($dataMesaurement as $key => $value) {
                $tr .= "<tr>";
                $tr .= "<td>" . $value['modellBez'] . "</td>";
                $tr .= "<td>" . $value['datum']->format('Y-m-d h:i:s') . "</td>";
                $tr .= "<td>" . $value['nameLieg'] . "</td>";
                $tr .= "<td>" . $value['gueltigVon']->format('Y-m-d') . "</td>";
                $tr .= "<td>" . $value['anzahl'] . "</td>";
                $tr .= "</tr>";
            }
            $tr .= "</tbody>";
        } else {
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tbody></tr>";
        }
        return $tr;
    }
    /**
     * Generates HTML for energy layer dashboard view
     * Builds and returns HTML content for displaying energy layer data on the dashboard
     * @return string  Returns generated HTML for energy layer dashboard
     */
    public function dashboardEnergyLayerHtml($dataMesaurement)
    {
        global $conn;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Created Date</th>';
        $tr .= '<th>Property</th>';
        $tr .= '<th>Valid From</th>';
        $tr .= '<th>Date of Expiry</th>';
        $tr .= '<th>Quantity</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "6";
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            $tr .= "<tbody>";
            foreach ($dataMesaurement as $key => $value) {
                $tr .= "<tr>";
                $tr .= "<td>" . $value['modellBez'] . "</td>";
                $tr .= "<td>" . $value['datum']->format('Y-m-d h:i:s') . "</td>";
                $tr .= "<td>" . $value['nameLieg'] . "</td>";
                $tr .= "<td>" . $value['gueltigVon']->format('Y-m-d') . "</td>";
                $tr .= "<td>" . $value['gueltigBis']->format('Y-m-d') . "</td>";
                $tr .= "<td>" . $value['anzahl'] . "</td>";
                $tr .= "</tr>";
            }
            $tr .= "</tbody>";
        } else {
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
        }
        return $tr;
    }
    /**
     * Generates HTML for energy layer dashboard on row click
     * Builds and returns HTML content for displaying detailed energy layer data
     * when a row is selected on the dashboard
     * @return string  Returns generated HTML for energy layer row click view
     */
    public function dashboardRowClickEnergyLayerHtml($dataMesaurement)
    {
        global $conn;
        $tr = '<thead>';
        $tr .= '<tr>';
        $tr .= '<th>Modal Name</th>';
        $tr .= '<th>Designation</th>';
        $tr .= '<th>Time From</th>';
        $tr .= '<th>Time To</th>';
        $tr .= '<th>Day From</th>';
        $tr .= '<th>Day To</th>';
        $tr .= '</tr>';
        $tr .= "</thead>";
        $col_span = "colspan='8'";
        $data_table_other = '';
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            $tr .= "<tbody>";
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';
                $tr .= "<tr $style $class_val data-type='1' $data_table_other>";
                $tr .= "<td>" . $value['modellBez'] . "</td>";
                $tr .= "<td>" . $value['bezeichnung'] . "</td>";
                $tr .= "<td>" . $value['uhrzeitVon']->format('h:i:s') . "</td>";
                $tr .= "<td>" . $value['uhrzeitBis']->format('h:i:s') . "</td>";
                $tr .= "<td>" . ucfirst($value['tagVon']) . "</td>";
                $tr .= "<td>" . ucfirst($value['tagBis']) . "</td>";
                $tr .= "</tr>";
            }
            $tr .= "</tbody>";
        } else {
            $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
        }
        return $tr;
    }
    /**
     * Retrieves dashboard table data for energy layer
     * Fetches and returns data to populate tables related to energy layer
     * on the dashboard
     * @return array  Returns energy layer dashboard table data
     */
    public function getTableDashboardDataEnergyLayer()
    {
        try {
            global $conn;
            $id = $_POST['id'];
            $selectQuery = "select * from tableFormat where id = '$id' ";
            $result = queryDB($conn, $selectQuery, "read");
            $tbody = '';
            if ($result != '' && count($result) > 0) {
                if ($result[0]['row_click'] == 'false') {
                    $tbody = '<thead>';
                    $tbody .= '<tr>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Schichtname</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig ab</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Gültig bis</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Bezeichnung</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit von</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Zeit zum</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energieverbrauch</th>';
                    $tbody .= '</tr>';
                    $tbody .= '</thead>';
                    $input_val_week_day = $result[0]['energy_layer_range'];
                    $checkQuery = '';
                    if ($result[0]['energy_layer_filter'] == 'day') {
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for ($c = 0; $c < $input_val_week_day; $c++) {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if ($c == 0) {
                                $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                        }
                    } else {
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for ($interval = 0; $interval <= $intervalDays; $interval++) {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if ($interval == 0) {
                                $checkQuery .= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkQuery .= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                    }
                    $resultQuery = queryDB($conn, $checkQuery, "read");
                    if ($resultQuery != '' && count($resultQuery) > 0) {
                        $tbody .= "<tbody>";
                        $mst_id = $result[0]['mst_id'];
                        $energy_layer_filter = $result[0]['energy_layer_filter'];
                        $dateValCheck = '';
                        if ($energy_layer_filter == 'day') {
                            $ind = $input_val_week_day - 1;
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                        } else {
                            $ind = $input_val_week_day * 7;
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                        }
                        $fromDateCheck = '';
                        foreach ($resultQuery as $key => $val) {
                            $fromDate = $val['gueltigVon']->format('Y-m-d');

                            if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                            } else {
                                $fromDateCheck = $dateValCheck;
                            }

                            $toDate = $val['gueltigBis']->format('Y-m-d');
                            $fromTime = $val['uhrzeitVon']->format('H:i:s');
                            $toTime = $val['uhrzeitBis']->format('H:i:s');
                            $to = $toDate . 'T' . $toTime;
                            $from = $fromDate . 'T' . $fromTime;
                            $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                            $resultEnergy = queryDB($conn, $query1, "read");
                            $totalEnergy = $resultEnergy[0]['sum'] > 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                            $totalEnergy = $this->convertValueCommaSeperated($totalEnergy);

                            $tbody .= "<tr tile_id='$id' class='energy_layer_row_click' mst_id='$mst_id' energy_layer_filter='$energy_layer_filter' input_val_week_day='$input_val_week_day'>";
                            $tbody .= "<td>" . $val['modellBez'] . "</td>";
                            $tbody .= "<td>" . $val['gueltigVon']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['gueltigBis']->format('Y-m-d') . "</td>";
                            $tbody .= "<td>" . $val['bezeichnung'] . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitVon']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $val['uhrzeitBis']->format('H:i:s') . "</td>";
                            $tbody .= "<td>" . $totalEnergy . "</td>";
                            $tbody .= '</tr>';
                        }
                        $tbody .= "</tbody>";
                    } else {
                        $tbody .= "<tbody>";
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                        $tbody .= "</tbody>";
                    }

                    $records['dashboardMeasurementHtml'] = $tbody;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                    die;
                } else {
                    $tbody .= "<thead>";
                    $tbody .= '<tr>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Shift Name</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Date</th>';
                    $tbody .= '<th style="padding:  10px 6px 10px 6px !important;font-size: small !important;">Energy Consumed</th>';
                    $tbody .= '</tr>';
                    $tbody .= "</thead>";
                    $getQuery = $result[0]['query_data_records'];
                    $getQuery = str_replace("between ", "between '", $getQuery);
                    $getQuery = str_replace(" AND ", "' AND '", $getQuery);
                    $getQuery = str_replace("'convert", "convert", $getQuery);
                    $getQuery = str_replace("'mst_ID", "mst_ID", $getQuery);
                    $resultQuery = queryDB($conn, $getQuery, "read");
                    $name_val = $result[0]['energy_layer_model_name'];
                    if ($resultQuery != '' && count($resultQuery) > 0) {
                        $tbody .= "<tbody>";
                        $sum = 0;
                        $resultQuery = $this->getDateWiseScore($resultQuery);
                        foreach ($resultQuery as $key => $val) {
                            $tbody .= '<tr data-table-other="SchichtModelleAll">';
                            $tbody .= "<td>" . $name_val . "</td>";
                            $tbody .= "<td>" . $val['date'] . "</td>";
                            $tbody .= "<td>" . $val['Value'] . "</td>";
                            $tbody .= '</tr>';
                            $sum += $val['Value'];
                        }
                        $tbody .= "<tr class='font-weight-bold'><td colspan='2'>Grand Total: </td><td>$sum</td></tr>";

                        $tbody .= "</tbody>";
                    } else {
                        $tbody .= "<tbody>";
                        $tbody .= '<tr>';
                        $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                        $tbody .= '</tr>';
                        $tbody .= "</tbody>";
                    }

                    $records['dashboardMeasurementHtml'] = $tbody;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                    die;
                }
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard table data for automatic energy
     * Fetches and returns data to populate tables related to automatic energy
     * @return array  Returns automatic energy dashboard table data
     */
    public function getTableDashboardDataEnergyAutomatic()
    {
        try {
            global $conn;
            $id = $_POST['id'];
            $selectQuery = "select * from tableFormat where id = '$id' ";
            $result = queryDB($conn, $selectQuery, "read");
            if ($result[0]['row_click'] == 'false') {
                $mst_id = $result[0]['mst_id'];
                $input_val_week_day = $result[0]['energy_layer_range'] + 60;
                $maxValDate = $input_val_week_day - $result[0]['energy_layer_range'];
                $energy_measurement_text = $result[0]['energy_layer_model_name'];
                $tbody = "<thead>";
                $tbody .= "<tr>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tbody .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tbody .= "</tr>";
                $tbody .= "</thead>";

                $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
                $maxDateCheck = date('Y-m-d', strtotime("-$maxValDate days"));

                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' AND convert(date,Time) <= '$maxDateCheck' group by convert(date,Time) order by date desc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                if ($queryEnergyRecords != '' && count($queryEnergyRecords)) {
                    $tbody .= "<tbody>";
                    foreach ($queryEnergyRecords as  $val1) {
                        $totalValue = $val1['value'] > 0 ? $val1['value'] / 4 : 0;
                        $totalValue = $this->convertValueCommaSeperated($totalValue);
                        $tbody .= "<tr tile_id='$id' mst_id='$mst_id'  class='energy_automatic_row_click'>
                        <td>" . $energy_measurement_text . "</td>
                        <td>" . $val1['date'] . "</td><td>" . $totalValue . "</td>
                        </tr>";
                    }
                    $tbody .= "</tbody>";
                } else {
                    $tbody .= "<tbody";
                    $tbody .= '<tr>';
                    $tbody .= '<td colspan="50" class="text-center">No Data Found</td>';
                    $tbody .= '</tr>';
                    $tbody .= "</tbody";
                }
                $records['dashboardMeasurementHtml'] = $tbody;
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard table data for automatic product
     * Fetches and returns data to populate tables related to automatic product
     * on the dashboard
     * @return array  Returns automatic product dashboard table data
     */
    public function getTableDashboardDataProductAutomatic()
    {
        try {
            global $conn;
            $id = $_REQUEST['id'];
            $username = $_SESSION['username'];
            $selectQuery = "SELECT * from tableFormat where username = '$username' AND id = $id ";
            $result = queryDB($conn, $selectQuery, "read");
            $conn = connectToDB($result[0]['database_name']);
            $dataProduct = queryDB($conn, $result[0]['query_data_records'], "read");
            $columnHeader = unserialize($result[0]['prd_all_columns_automatic']);
            $columnType = unserialize($result[0]['prd_all_columns_type_automatic']);
            $dashboardMeasurementHtml = $this->generateDashboardAllItemAutomaticTableHTML($dataProduct, $columnHeader, $columnType);
            $records['dashboardMeasurementHtml'] = $dashboardMeasurementHtml;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for dashboard automatic items table
     * Builds and returns HTML content for displaying all automatic items
     * in a table format on the dashboard
     * @return string  Returns generated HTML for dashboard automatic items table
     */
    public function generateDashboardAllItemAutomaticTableHTML($dataProduct, $columnHeader, $columnDataTypeAr)
    {
        try {
            $tr = '';
            if ($columnHeader  != '' && count($columnHeader) > 0) {
                $tr = "<thead>";
                $tr .= "<tr>";
                foreach ($columnHeader as $val) {
                    $tr .= "<th>" . ucfirst($val) . "</th>";
                }
                $tr .= "</tr>";
                $tr .= "</thead>";
            }

            if ($dataProduct != '' && count($dataProduct) > 0) {
                $tr .= "<tbody>";
                for ($i = 0; $i < count($dataProduct); $i++) {
                    $tr .= "<tr>";
                    for ($j = 0; $j < count($columnHeader); $j++) {
                        $columnName = $columnHeader[$j];
                        $columnDataType = $columnDataTypeAr[$j];
                        if ($columnDataType == 'date' || $columnDataType == 'datetime') {
                            $tr .= "<td>" . $dataProduct[$i][$columnName]->format('Y-m-d') . "</td>";
                        } else {
                            $tr .= "<td>" . $dataProduct[$i][$columnName] . "</td>";
                        }
                    }
                    $tr .= "</tr>";
                }
                $tr .= "</tbody>";
            } else {
                $tr = "<tbody><tr><td $col_span class='text-center'>No Data</td></tbody></tr>";
            }
            return $tr;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records for energy data
     * Fetches and processes energy chart data based on applied filters
     * @return array  Returns filtered energy chart data
     */
    public function getChartRecordFilterEnergy()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['filterVal'];
            $type = $_POST['type'];
            $mst_id = $_POST['mst_id'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if ($record_type_of_tile == 'energy') {
                $queryOverAllCount = "SELECT * From masseneingabeSucheIMw ";
                $queryOverAllCount .= "WHERE mst_ID = '$mst_id' ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if ($filter_val == 10) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 10; $i++) {
                        if ($i <= $overallCount) {
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 10) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            array_push($ar_days, $i);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //10 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }

                    $records['outer_table_html'] = $tableOutsideHTML;
                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //10 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 10;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 20) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 20; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 2 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 20) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_20 =  $i;
                            array_push($ar_days, $day_20);
                        }
                    }

                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //20 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //20 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 20;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 30; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 3 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 30) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_30 = $i;
                            array_push($ar_days, $day_30);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //30 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //30 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 30;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 50; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 5 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 50) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_50 = $i;
                            array_push($ar_days, $day_50);
                        }
                    }

                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= 50) { //50 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= 50) { //50 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                        $offsetDate = 50 - 1;
                        $overallCount = 50;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }

                $records = ['status' => 400, 'message' => 'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records for product data
     * Fetches and processes product chart data based on applied filters
     * @return array  Returns filtered product chart data
     */
    public function getChartRecordFilterProduct()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $analgen_config_id = $_POST['analgen_config_id'];
            $filter_val = $_POST['filterVal'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if ($record_type_of_tile == 'product') {
                $queryOverAllCount = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryOverAllCount .= "from produktionsAnlagenMoreOpt as t2 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t2 ";
                $queryOverAllCount .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t3.id as t3_id , t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                $queryOverAllCount .= "from masseneingabeSuchePrdIMw  as t3 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t3 ";
                $queryOverAllCount .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryOverAllCount .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                $queryOverAllCount .= "where t1.iBdeType='1' ";
                $queryOverAllCount .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $queryOverAllCount .= "order by t3.t3_id asc ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);

                if ($filter_val == 10) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    $preVal = 0;
                    for ($i = 1; $i <= 10; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 10) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            array_push($ar_days, $i);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //10 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .= "from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t2 ";
                        $queryOutsideTable .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }

                    $records['outer_table_html'] = $tableOutsideHTML;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 20) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    $preVal = 0;
                    for ($i = 1; $i <= 20; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 20) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_20 =  $i;
                            array_push($ar_days, $day_20);
                        }
                    }

                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //20 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .= "from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t2 ";
                        $queryOutsideTable .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    $preVal = 0;
                    for ($i = 1; $i <= 30; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 30) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_30 = $i;
                            array_push($ar_days, $day_30);
                        }
                    }

                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //30 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .= "from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t2 ";
                        $queryOutsideTable .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    $preVal = 0;
                    for ($i = 1; $i <= 50; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;

                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 50) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_50 = $i;
                            array_push($ar_days, $day_50);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= 50) { //50 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            }
                        }

                        $queryOutsideTable = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                        $queryOutsideTable .= "from produktionsAnlagenMoreOpt as t2 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t2 ";
                        $queryOutsideTable .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                        $queryOutsideTable .= "INNER join ";
                        $queryOutsideTable .= "( ";
                        $queryOutsideTable .= "select t3.id as t3_id , t3.type , t3.on_week , t3.on_date ,t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                        $queryOutsideTable .= "from masseneingabeSuchePrdIMw  as t3 ";
                        $queryOutsideTable .= ") ";
                        $queryOutsideTable .= "t3 ";
                        $queryOutsideTable .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                        $queryOutsideTable .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                        $queryOutsideTable .= "where t1.iBdeType='1' ";
                        $queryOutsideTable .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                        $queryOutsideTable .= "order by t3.t3_id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    // --end-->
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }

                $records = ['status' => 400, 'message' => 'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records for energy layer data
     * Fetches and processes energy layer chart data based on applied filters
     * @return array  Returns filtered energy layer chart data
     */
    public function getChartRecordFilterEnergyLayer()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if ($record_type_of_tile == 'energy') {
                $mst_id = $_POST['mst_id'];
                $select_day_week = $_POST['energy_chart_layer_filter'];
                $input_val_week_day = $_POST['energy_chart_layer_range'];
                if ($select_day_week == 'day') {
                    $checkQuery = '';
                    $todayDate = date('Y-m-d');

                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
                    $table_found = 'false';
                    if ($resultTableExistCheck != false) {
                        $table_found = 'true';
                    }
                    $tableOutsideHTML = '';
                    if ($table_found == 'true') {
                        //*** Check No Shift Name Found Database */
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for ($c = 0; $c < $input_val_week_day; $c++) {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if ($c == 0) {
                                $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                        if ($resultShiftName != '' && count($resultShiftName) > 0) {
                            $ind = $input_val_week_day - 1; //Get last Date
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach ($resultShiftName as $key => $val) {
                                $fromDate = $val['gueltigVon']->format('Y-m-d');
                                if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                    $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                } else {
                                    $fromDateCheck = $dateValCheck;
                                }
                                $toDate = $val['gueltigBis']->format('Y-m-d');
                                $fromTime = $val['uhrzeitVon']->format('H:i:s');
                                $toTime = $val['uhrzeitBis']->format('H:i:s');
                                $to = $toDate . 'T' . $toTime;
                                $from = $fromDate . 'T' . $fromTime;
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                                $resultEnergy = queryDB($conn, $query1, "read");
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value, $totalEnergy);
                                $model_name_layer_name = $val['modellBez'] . '(' . $val['bezeichnung'] . ')';
                                array_push($ar_names, $model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }
                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($select_day_week == 'week') {
                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");

                    $table_found = 'false';
                    if ($resultTableExistCheck != false) {
                        $table_found = 'true';
                    }

                    $tableOutsideHTML = '';
                    if ($table_found == 'true') {
                        $todayDate = date('Y-m-d');
                        $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));
                        // ****Check Shift Name Exist
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkShiftNameQuery = "Select * from SchichtModelleAll ";
                        for ($interval = 0; $interval <= $intervalDays; $interval++) {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if ($interval == 0) {
                                $checkShiftNameQuery .= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkShiftNameQuery .= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                        if ($resultShiftName != '' && count($resultShiftName) > 0) {
                            $weekInd = $input_val_week_day * 7; //Week;
                            $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach ($resultShiftName as $key => $val) {

                                $fromDate = $val['gueltigVon']->format('Y-m-d');
                                if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                    $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                                } else {
                                    $fromDateCheck  = $dateValCheck;
                                }
                                $toDate = $val['gueltigBis']->format('Y-m-d');
                                $fromTime = $val['uhrzeitVon']->format('H:i:s');
                                $toTime = $val['uhrzeitBis']->format('H:i:s');
                                $to = $toDate . 'T' . $toTime;
                                $from = $fromDate . 'T' . $fromTime;
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                                $resultEnergy = queryDB($conn, $query1, "read");
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value, $totalEnergy);
                                $model_name_layer_name = $val['modellBez'] . '(' . $val['bezeichnung'] . ')';
                                array_push($ar_names, $model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }

                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records for automatic energy data
     * Fetches and processes automatic energy chart data based on applied filters
     * @return array  Returns filtered automatic energy chart data
     */
    public function getChartRecordFilterEnergyAutomatic()
    {
        try {
            global $conn;
            $mst_id = $_POST['mst_id'];
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id[0]' ";
            $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
            $table_found = 'false';
            if ($resultTableExistCheck != false) {
                $table_found = 'true';
            }

            $dateCheck = date('Y-m-d', strtotime("-60 days"));
            $dateCheck = date($dateCheck, strtotime("-$input_val_week_day days"));
            $tableOutsideHTML = '';
            if ($table_found == 'true') {

                if (count($mst_id) > 1) {
                    $result = '';
                    $arTotalVal = [];
                    $arCountDays = [];
                    foreach ($mst_id as $val) {
                        $result =  $this->getChartRecordFilterEnergyAutomaticMstId($dateCheck, $val);
                        array_push($arTotalVal, $result);
                    }

                    //Count Days
                    for ($j = 0; $j < $input_val_week_day; $j++) {
                        $dateVal = date('Y-m-d', strtotime("-$j days"));
                        array_push($arCountDays, $dateVal);
                    }

                    $records['count_val'] = $arTotalVal;
                    $records['count_days'] = array_reverse($arCountDays); //For ASCENDING

                    //MST Name
                    $strMstId = implode(",", $mst_id);
                    $queryName = "select nameMst from messstellen where mst_ID in($strMstId) ";
                    $resulMstName = queryDB($conn, $queryName, "read");
                    $records['mstName'] = $resulMstName;

                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id[0]' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                $ar_value = [];
                $ar_names = [];
                if ($queryEnergyRecords != '' && count($queryEnergyRecords) && !$queryEnergyRecords['error']) {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    foreach ($queryEnergyRecords as $key => $val) {
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        array_push($ar_value, $totalValue);
                        array_push($ar_names, $val['date']->format('Y-m-d'));
                        if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records for automatic energy data by MST ID
     * Fetches and processes automatic energy chart data based on applied filters
     * and a specific MST ID
     * @return array  Returns filtered automatic energy chart data for the given MST ID
     */
    public function getChartRecordFilterEnergyAutomaticMstId($dateCheck, $mst_id)
    {
        try {
            global $conn;
            $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
            $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
            $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
            $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
            $ar_value = [];
            $ar_names = [];
            if ($queryEnergyRecords != '' && count($queryEnergyRecords)) {

                foreach ($queryEnergyRecords as $key => $val) {
                    $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                    array_push($ar_value, $totalValue);
                    array_push($ar_names, $val['date']->format('Y-m-d'));
                }
                return $ar_value;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves filtered chart records
     * Fetches and processes chart data based on applied filters
     * @return array  Returns filtered chart data
     */
    public function getChartRecordFilter()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['filterVal'];
            $type = $_POST['type'];
            $mst_id = $_POST['mst_id'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if ($record_type_of_tile == 'energy') {
                $this->getChartRecordFilterEnergy();
                die;
            } else if ($record_type_of_tile == 'measurement') {
                $queryOverAllCount = "SELECT * From masseneingabeSucheIMw ";
                $queryOverAllCount .= "WHERE mst_ID = '$mst_id' ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if ($filter_val == 10) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 10; $i++) {
                        if ($i <= $overallCount) {
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 10) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            array_push($ar_days, $i);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //10 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }

                    $records['outer_table_html'] = $tableOutsideHTML;
                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //10 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 10 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 10;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 20) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 20; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 2 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 20) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_20 =  $i;
                            array_push($ar_days, $day_20);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //20 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //20 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 20 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 20;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 30; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 3 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 30) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_30 = $i;
                            array_push($ar_days, $day_30);
                        }
                    }

                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= $filter_val) { //30 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                                $offsetLoopVal = $overallCount -  $filter_val;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= $filter_val) { //30 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > $filter_val) { //More Than 30 Condition
                        $offsetDate = $filter_val - 1;
                        $overallCount = 30;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;
                    // --end-->

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    $countSum = '';
                    $loopCount = '';
                    for ($i = 1; $i <= 50; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 5 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            if ($i == $overallCount || $i == 50) {
                                $countSum = $result[0]['val'];
                            }
                            $loopCount = $i;
                            $day_50 = $i;
                            array_push($ar_days, $day_50);
                        }
                    }
                    $offsetLoopVal = '';
                    $tableOutsideHTML = '';
                    $offsetLoopVal = '';
                    if ($loopCount != '') {
                        if ($chart_outer_table_limit_column >= $loopCount) //Limit Greater than Overall Count
                        {
                            $chart_outer_table_limit_column = $loopCount;
                            if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            } else {
                                $offsetLoopVal = 0;
                            }
                        } else if ($loopCount > $chart_outer_table_limit_column) {
                            if ($overallCount > 0 && $overallCount <= 50) { //50 RECORD Condition
                                $offsetLoopVal = 0;
                            } else if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                                $offsetLoopVal = $overallCount -  50;
                            }
                        }

                        $queryOutsideTable = "SELECT * from masseneingabeSucheIMw ";
                        $queryOutsideTable .= "WHERE mst_ID = '$mst_id' ";
                        $queryOutsideTable .= "ORDER by id DESC ";
                        $queryOutsideTable .= "offset $offsetLoopVal rows FETCH NEXT $chart_outer_table_limit_column ROWS ONLY ";
                        $resultOutsideTable = queryDB($conn, $queryOutsideTable, "read");

                        $tableOutsideHTML = '';
                        for ($i = 0; $i < count($resultOutsideTable); $i++) {
                            $tableOutsideHTML .= "<tr>";
                            if ($resultOutsideTable[$i]['type'] == '2') {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_week'] . '-' . $resultOutsideTable[$i]['on_date'] . "</td>";
                            } else {
                                $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['on_date'] . "</td>";
                            }
                            $tableOutsideHTML .= "<td>" . $resultOutsideTable[$i]['val'] . "</td>";
                            $tableOutsideHTML .= "</tr>";
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;

                    $offsetDate = '';
                    $resultDateData = '';
                    if ($overallCount > 0 && $overallCount <= 50) { //50 RECORD Condition
                        $offsetDate = $overallCount - 1;
                    } else if ($overallCount > 0 && $overallCount > 50) { //More Than 50 Condition
                        $offsetDate = 50 - 1;
                        $overallCount = 50;
                    } else {
                        $offsetDate = '';
                    }

                    if ($offsetDate != '') {
                        $queryDateData = "SELECT * from masseneingabeSucheIMw ";
                        $queryDateData .= "WHERE mst_ID = '$mst_id' ";
                        $queryDateData .= "ORDER by id ASC ";
                        $queryDateData .= "offset $offsetDate rows FETCH NEXT $overallCount ROWS ONLY ";
                        $resultDateData = queryDB($conn, $queryDateData, "read");
                    }
                    $records['countDate'] = $resultDateData;

                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    $records['count_sum'] = $countSum;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }

                $records = ['status' => 400, 'message' => 'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves automatic measurement table data
     * Fetches and returns measurement records for automatic table display
     * @return array  Returns automatic measurement table data
     */
    public function getAutomaticTableMeasurementData($measurement_type)
    {
        try {

            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $measurement_type = $_POST['measurement_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if ($search_record != '') {
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;

            $resultQuery = queryDB($conn, $queryTotalRecords, "read");
            $totalRecordsValue = [];
            if ($resultQuery != false) {
                $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            }


            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");

            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {

                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(Value * ConvFactor) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";

            $resultQuery = queryDB($conn, $query1, "read");
            $dataMesaurement = [];
            $tableFound = 'false';
            if ($resultQuery != false) {
                $dataMesaurement = queryDB($conn, $query1, "read");
                $tableFound = 'true';
            }
            $records['table_found'] = $tableFound;

            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);

            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val, $pagesCount, $dataMesaurement);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $table_filter = $time_interval . ',' . $_POST['measurement_order_by_val'] . ',' . $_POST['total_number_records'];
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Measurement', 'table_type' => $measurement_type, 'table_filter' => $table_filter);
            $records['query_data'] = $ar;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves automatic measurement table data
     * Fetches and returns measurement records for automatic table display,
     * possibly with alternate filters or logic
     * @return array  Returns automatic measurement table data
     */
    public function getAutomaticTableMeasurementData1()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $time_interval = $_POST['time_interval'];
            $order_by_val = $_POST['measurement_order_by_val'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $measurement_type = $_POST['measurement_type'];
            $dataMesaurement = '';
            $queryMaxVal = '';
            $pagesCount = '';

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by convert(decimal(38,5), T2.val) asc ";
            }

            $search_record = isset($_POST['search_record']) ? $_POST['search_record'] : '';
            $queryTotalRecordCondition = "";
            $queryMainCondition = '';
            if ($search_record != '') {
                $queryTotalRecordCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
                $queryMainCondition = "WHERE T1.nameMSt LIKE '%$search_record%' ";
            }

            //Pagination Code
            $queryTotalRecords = "SELECT TOP($total_number_records) * ";
            $queryTotalRecords .= "FROM messstellen as T1 ";
            $queryTotalRecords .= "INNER JOIN ";
            $queryTotalRecords .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $queryTotalRecords .= "berechneteEnergiedaten as T2 ";
            $queryTotalRecords .= "GROUP By T2.mst_id) ";
            $queryTotalRecords .= "T2 ";
            $queryTotalRecords .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $queryTotalRecords .= $queryTotalRecordCondition;
            $queryTotalRecords .= $order_by_val;
            $totalRecordsValue = queryDB($conn, $queryTotalRecords, "read");
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {

                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        //Only Valid when User Click on Last page
                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }
            $query1 = "SELECT * ";
            $query1 .= "FROM messstellen as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "(SELECT T2.mst_ID as table_2_mst_id, sum(convert(decimal(38,5), Value)) as val from ";
            $query1 .= "berechneteEnergiedaten as T2 ";
            $query1 .= "GROUP By T2.mst_id) ";
            $query1 .= "T2 ";
            $query1 .= "ON T1.mst_ID = T2.table_2_mst_id ";
            $query1 .= $queryMainCondition;
            $query1 .= $order_by_val;
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";

            $dataMesaurement = queryDB($conn, $query1, "read");
            $dataMesaurement = [];
            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement);

            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val, $pagesCount, $dataMesaurement);

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => '', 'row_click' => 'false', 'type' => 'Measurement');
            $records['query_data'] = $ar;

            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves automatic measurement table data based on row click
     * Fetches and processes detailed automatic measurement data for the selected row
     * @return array  Returns automatic measurement data for the selected row
     */
    public function rowClickAutomaticMeasurementTableData()
    {
        try {
            global $conn;
            $total_number_records = $_POST['total_number_records'];
            $mst_id = $_POST['mst_id'];
            $type = $_POST['data_type'];
            $number_records = $_POST['number_records'];
            $page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $selected_number_record_measurement = isset($_POST['selected_number_record_measurement']) ? $_POST['selected_number_record_measurement'] : 'false';
            $order_by_val = $_POST['measurement_order_by_val'];
            $measurement_type = $_POST['measurement_type'];

            $date_differnce_five_days = date('Y-m-d', strtotime('-5 days'));
            $current_date = date('Y-m-d');

            if ($order_by_val == 'order_by_desc') {
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) desc ";
            } else if ($order_by_val == 'order_by_asc') {
                $order_by_val = "Order by convert(decimal(38,5), T1.Value) asc ";
            }

            //Pagination Code 
            $queryTotalPagination = "SELECT TOP($total_number_records) * ";
            $queryTotalPagination .= "FROM berechneteEnergiedaten as T1 ";
            $queryTotalPagination .= "INNER JOIN ";
            $queryTotalPagination .= "messstellen as T2 ";
            $queryTotalPagination .= "ON T1.mst_ID = T2.mst_Id ";
            $queryTotalPagination .= "WHERE T1.mst_ID = '$mst_id' ";
            $totalRecordsValue = queryDB($conn, $queryTotalPagination, "read");
            $pagesCount = '';
            $offSetVal = 0;
            if (count($totalRecordsValue) > 0) {
                if ($total_number_records <= $number_records) {
                    $offSetVal = 0;
                    $number_records = $total_number_records;
                    $pagesCount = 1;
                    $page_val = 1;
                } else {
                    if ($selected_number_record_measurement == 'true') {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $page_val = 1;
                        $offSetVal = 0;
                    } else {
                        $pagesCount = ceil(count($totalRecordsValue) / $number_records);
                        $pagesCount = $pagesCount <= 0 ? 1 : $pagesCount;
                        $offSetVal = ($page_val - 1) * $number_records;

                        if ($page_val == $pagesCount) {
                            $number_records = $total_number_records - $offSetVal;
                        }
                    }
                }
            }

            $queryMaxValue = "SELECT TOP($total_number_records) max(convert(decimal(38,5), Value)) as val ";
            $queryMaxValue .= "FROM berechneteEnergiedaten as T1 ";
            $queryMaxValue .= "INNER JOIN ";
            $queryMaxValue .= "messstellen as T2 ";
            $queryMaxValue .= "ON T1.mst_ID = T2.mst_Id ";
            $queryMaxValue .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryMaximum = $queryMaxValue;
            $queryMaxValue = queryDB($conn, $queryMaxValue, "read");
            $queryMaxVal = count($queryMaxValue) > 0 ? $queryMaxValue[0]['val'] : '';

            $query1 = "SELECT * ";
            $query1 .= "FROM berechneteEnergiedaten as T1 ";
            $query1 .= "INNER JOIN ";
            $query1 .= "messstellen as T2 ";
            $query1 .= "ON T1.mst_ID = T2.mst_ID ";
            $query1 .= "Where T1.mst_ID = '$mst_id' ";
            $query1 .= "$order_by_val ";
            $query1 .= "offset $offSetVal rows FETCH NEXT $number_records ROWS ONLY ";
            $dataMesaurement = queryDB($conn, $query1, "read");

            $records['measurement_html'] = $this->generateHtmlAutomaticTableMeasurementData($dataMesaurement, $queryMaxVal);
            $records['table_header'] = $this->getNumberRecordsMesurementHeader($measurement_type);
            $records['pagination_html'] =  $this->generatePaginationHtmlAutomaticMeasurementData($page_val, $pagesCount, $dataMesaurement, $type, $mst_id);

            $queryLastDate = "SELECT TOP(1) * From berechneteEnergiedaten as T1 ";
            $queryLastDate .= "WHERE T1.mst_ID = '$mst_id' ";
            $queryLastDate .= "ORDER BY T1.berNrg_ID desc ";
            $queryLastDateData = queryDB($conn, $queryLastDate, "read");

            $ar_page_val = isset($_POST['page_val']) ? $_POST['page_val'] : 1;
            $ar_number_records = isset($_POST['number_records']) ? $_POST['number_records'] : 5;
            $ar = array('pages_count' => $pagesCount, 'page_val' => $ar_page_val, 'number_records' => $ar_number_records, 'query1' => $query1, 'queryMaxValue' => $queryMaximum, 'row_click' => 'true', 'type' => 'Measurement');
            $records['query_data'] = $ar;

            $records['queryLastDate'] = $queryLastDateData;
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);

            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for automatic measurement table data
     * @param array $dataMesaurement  Contains measurement data used to build the table
     * @param bool  $queryMaxVal      Optional flag to determine if maximum values should be processed
     * @return string  Returns generated HTML for automatic measurement table data
     */
    public function generateHtmlAutomaticTableMeasurementData($dataMesaurement, $queryMaxVal = false)
    {
        global $conn;
        $tr = '';
        $col_span = "";
        if ($queryMaxVal == "") {
            $col_span = "colspan='5'";
        } else if ($queryMaxVal != '') {
            $col_span = "colspan='4'";
        }
        if ($dataMesaurement != '' && count($dataMesaurement) > 0) {
            foreach ($dataMesaurement as $key => $value) {
                $style = '';
                $class_val = '';
                $unit = '';
                $mst_id = $value['mst_ID'];


                $queryResult = '';
                if ($queryMaxVal == '') {
                    $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                    $queryResult = queryDB($conn, $queryData, "read");
                }


                if ($queryMaxVal == "") {
                    $class_val = 'class="row_click"';
                } else if ($queryMaxVal != '' && $queryMaxVal == $value['Value']) {
                    $style = "style='background-color: #f77171'";
                }
                $tr .= "<tr $style $class_val data-mst=" . $value['mst_ID'] . " data-type='1' data-table-other='true'>";

                $tr .= "<td>" . $value['nameMSt'] . "</td>";

                if ($queryMaxVal == '') {
                    $tr .= "<td>" . $queryResult[0]['Time'] . "</td>";
                    $calulateVal = 0;
                    if ($value['val'] > 0) {
                        $calulateVal = $value['val'] / 4;
                    }
                    $calulateVal = $this->convertValueCommaSeperated($calulateVal);
                    $tr .= "<td>" . $calulateVal . "</td>";
                } else {
                    $tr .= "<td>" . $value['Time'] . "</td>";
                    $calulateVal = 0;
                    if ($value['Value'] > 0) {
                        $calulateVal = ($value['Value'] * $value['ConvFactor']) / 4;
                    }
                    $calulateVal = $this->convertValueCommaSeperated($calulateVal);
                    $tr .= "<td>" . $calulateVal . "</td>";
                }
                $tr .= "</tr>";
            }
        } else {
            $tr = "<tr><td $col_span class='text-center'>No Data</td></tr>";
        }
        return $tr;
    }
    /**
     * Generates pagination HTML for automatic measurement data
     * Builds and returns pagination controls for navigating through automatic measurement records
     * @return string  Returns generated pagination HTML
     */
    public function generatePaginationHtmlAutomaticMeasurementData($page_val, $pagesCount, $dataMesaurement, $data_type = false, $mst_id = false)
    {
        try {
            //Pagination Code HTML
            if ($page_val > 0 && $pagesCount > 0 && $dataMesaurement != '' && count($dataMesaurement) > 0) {
                $style_background = '';
                $class_page_count_val = 'page_count_val';
                $style_background_end = '';
                $class_page_count_val_end = 'page_count_val';
                if ($page_val == "1") {
                    $style_background = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val = '';
                    if ($pagesCount == "1") {
                        $style_background_end = "style='background: #d6d6d6; color: black'";
                        $class_page_count_val_end = '';
                    }
                } else if ($page_val == $pagesCount) {
                    $style_background_end = "style='background: #d6d6d6; color: black'";
                    $class_page_count_val_end = '';
                } else {
                    $style_background = '';
                    $style_background_end = '';
                }
                $paginationHTMl = "<nav aria-label='Page navigation example'>
                    <input type='hidden' id='row_click_table' data_type='$data_type' data_mst='$mst_id'>
                    <div class='pagination_items'>
                            <ul class='pagination'>
                                <li class='page-item $class_page_count_val' data_type='$data_type' data_mst='$mst_id' id='previous_pagination_val'>
                                    <a class='page-link'  $style_background href='javascript:void(0);' aria-label='Previous'>
                                        <span aria-hidden='true'>&laquo;</span>
                                        <span class='sr-only'>Previous</span>
                                    </a>
                                </li>";

                for ($i = 1; $i <= $pagesCount; $i++) {
                    $active = $i == $page_val ? 'active' : '';
                    $hide_style = 'display: none';
                    if ($i == $page_val) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>Page</a></li>";
                        $hide_style = 'display: block';
                    }
                    $paginationHTMl .= "<li style='$hide_style' class='page-item  $active '><input type='number' class='active_background pagination_input_val page-link' data_type='$data_type' data_mst='$mst_id' value='$i'></li>";

                    if ($i == $pagesCount) {
                        $paginationHTMl .= "<li class='page-item'><a class='page-link' href='javascript:void(0);'>of</a></li>";
                        $paginationHTMl .= "<li class='page-item'><a class='page-link ' readonly id='last_input_val' href='javascript:void(0);'>$i</a></li>";
                    }
                }
                $paginationHTMl .= "<li class='page-item $class_page_count_val_end' data_type='$data_type' data_mst='$mst_id' id='next_pagination_val'>
                                        <a class='page-link' $style_background_end href='javascript:void(0);' aria-label='Next'>
                                            <span aria-hidden='true'>&raquo;</span>
                                            <span class='sr-only'>Next</span>
                                        </a>
                                    </li>";

                //Pagination Select Tag   

                $paginationHTMl .= "<li class ='page-item'>
                                        <select class='page-link select_pagination' id='measurement_number_record' data_type='$data_type' data_mst='$mst_id'>
                                            <option value='5'>5</option>
                                            <option value='10'>10</option>
                                            <option value='20'>20</option>
                                            <option value='30'>30</option>
                                            <option value='50'>50</option>
                                        </select>
                                    </li>
                                    </ul>
                                </div>
                            </nav>";

                //ScreenShot Code
                $paginationHTMl .= "<div id='save_table_format' class='text-center'>
                                    <input type='button' id='modal_open_button' tile-edit='false' class='btn btn-sm btn-success' value='Save & Preview'>
                                </div>";
                return $paginationHTMl;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Generates HTML for automatic measurement dashboard
     * @param array $dataMeasurement  Contains measurement data used to build the dashboard view
     * @param bool  $queryMaxVal      Optional flag to determine if maximum values should be processed
     * @return string  Returns generated HTML for automatic measurement dashboard
     */
    public function dashboardMeasurementHtmlAutomatic($dataMeasurement, $queryMaxVal = false)
    {
        try {
            global $conn;
            $col_span = "";
            $tr = "";
            if ($queryMaxVal == "") {
                $col_span = "colspan='5'";
                $tr = "<thead>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            } else if ($queryMaxVal != '') {
                $col_span = "colspan='4'";
                $tr = "<thead style='background-color: #c5c8d2'>";
                $tr .= "<tr>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Messstelle</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Datum</th>";
                $tr .= "<th style='padding:  10px 6px 10px 6px !important;font-size: small !important;'>Wert</th>";
                $tr .= "</tr>";
                $tr .= "</thead>";
            }
            if ($dataMeasurement != '' && count($dataMeasurement) > 0) {
                $tr .= "<tbody>";
                foreach ($dataMeasurement as $key => $value) {
                    $unit = '';
                    $style = '';
                    $mst_id = $value['mst_ID'];
                    if ($queryMaxVal != '' && $queryMaxVal == $value['Value']) {
                        $style = "style='background-color: #f77171; padding: 8px !important; font-size: .875rem'";
                    }

                    $tr .= "<tr $style>";

                    $queryResult = '';
                    if ($queryMaxVal == '') {
                        $queryData = "SELECT Top(1) * from berechneteEnergiedaten where mst_ID = $mst_id order by Time desc ";
                        $queryResult = queryDB($conn, $queryData, "read");
                    }

                    $tr .= "<td>" . $value['nameMSt'] . "</td>";

                    if ($queryMaxVal == '') {
                        $tr .= "<td>" . $queryResult[0]['Time'] . "</td>";
                        $valueEnergy = 0;
                        if ($value['val'] > 0) {
                            $valueEnergy = $value['val'] / 4;
                        }
                        $valueEnergy = $this->convertValueCommaSeperated($valueEnergy);
                        $tr .= "<td>" . $valueEnergy . "</td>";
                    } else {
                        $tr .= "<td>" . $value['Time'] . "</td>";
                        $valueEnergy = 0;
                        if ($value['Value'] > 0) {
                            $valueEnergy = ($value['Value'] * $value['ConvFactor']) / 4;
                        }
                        $valueEnergy = $this->convertValueCommaSeperated($valueEnergy);
                        $tr .= "<td>" . $valueEnergy . "</td>";
                    }
                    $tr .= "</tr>";
                }
                $tr .= "</tbody>";
            } else {
                $tr .= "<tbody><tr><td $col_span class='text-center'>No Data</td></tr></tbody>";
            }
            return $tr;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves the overall cumulative count for automatic measurement points.
     * @return void Outputs JSON encoded count and name.
     */
    public function getTileClickOverAllCountAutomatic()
    {
        try {
            global $conn;
            $id = $_REQUEST['id'];
            $mst_id = $_REQUEST['mst_id'];
            $queryTotalSum = "SELECT sum(Value * ConvFactor) as val from berechneteEnergiedaten  as t1 ";
            $queryTotalSum .= "Where t1.mst_ID = $mst_id ";
            $totalSum = queryDB($conn, $queryTotalSum, "read");
            $totalSumVal = $totalSum[0]['val'] != null && $totalSum[0]['val'] != 0 ?  $totalSum[0]['val'] / 4 : '0';
            $totalSumVal = $this->convertValueCommaSeperated($totalSumVal);

            $queryName = "SELECT TOp(1) nameMSt from messstellen Where mst_ID = $mst_id ";
            $queryNameVal = queryDB($conn, $queryName, "read");
            $nameVal = $queryNameVal != null ?  $queryNameVal[0]['nameMSt'] : '';

            $record['name_value'] = $nameVal;
            $record['total_sum'] = $totalSumVal;
            $record['measurement_type'] = 'Automatic';

            echo json_encode($record, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Handles data retrieval for dashboard chart interactions based on filters (10, 20, 30 days, all).
     * @return void Outputs JSON encoded chart data series.
     */
    public function getClickDashboardChart()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['chart_filter_value'];
            $mst_id = $_POST['mst_id'];
            if ($record_type_of_tile == 'measurement' || $record_type_of_tile == 'energy') {
                $queryOverAllCount = "SELECT * From masseneingabeSucheIMw ";
                $queryOverAllCount .= "WHERE mst_ID = '$mst_id' ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if ($filter_val == 10) {
                    $ar_days = [];
                    $ar_value = [];
                    for ($i = 1; $i <= 10; $i++) {
                        if ($i <= $overallCount) {
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }

                            array_push($ar_days, $i);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 20) {
                    $ar_days = [];
                    $ar_value = [];
                    for ($i = 1; $i <= 20; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 2 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }

                            $day_20 =  $i;
                            array_push($ar_days, $day_20);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    for ($i = 1; $i <= 30; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 3 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_30 = $i;
                            array_push($ar_days, $day_30);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    for ($i = 1; $i <= 50; $i++) {
                        if ($i <= $overallCount) {
                            $offset_val = 5 * $i;
                            $query = "SELECT SUM(CAST(val as int)) as val FROM masseneingabeSucheIMw WHERE id in ";
                            $query .= "(SELECT id From masseneingabeSucheIMw ";
                            $query .= "WHERE mst_ID = '$mst_id' ";
                            $query .= "ORDER by id ASC ";
                            $query .= "offset 0 rows FETCH NEXT $i ROWS ONLY )";
                            $result = queryDB($conn, $query, "read");
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_50 = $i;
                            array_push($ar_days, $day_50);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }

                $records = ['status' => 400, 'message' => 'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard chart data on product click
     * Fetches and prepares chart data when a product-related dashboard element is clicked
     * @return array  Returns product-specific dashboard chart data
     */
    public function getClickDashboardChartProduct()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $filter_val = $_POST['chart_filter_value'];
            $analgen_config_id = $_POST['analgen_config_id'];
            if ($record_type_of_tile == 'product') {
                $queryOverAllCount = "SELECT  * FROM produktionsAnlagenConfig as t1 ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t2.id as table_2_id , t2.prd_id as table_2_prd_id  , t2.anl_id as table_2_anl_id , t2.anl_col as table_2_anl_col ";
                $queryOverAllCount .= "from produktionsAnlagenMoreOpt as t2 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t2 ";
                $queryOverAllCount .= "on t1.prd_id = t2.table_2_prd_id AND t1.anl_id = t2.table_2_anl_id AND t1.anl_col = t2.table_2_anl_col ";
                $queryOverAllCount .= "INNER join ";
                $queryOverAllCount .= "( ";
                $queryOverAllCount .= "select t3.id as t3_id , t3.prd_anl_ID as table_3_prd_anl_Id , cast(t3.val as int) as val ";
                $queryOverAllCount .= "from masseneingabeSuchePrdIMw  as t3 ";
                $queryOverAllCount .= ") ";
                $queryOverAllCount .= "t3 ";
                $queryOverAllCount .= "on t2.table_2_id = t3.table_3_prd_anl_Id ";
                $queryOverAllCount .= "left join anlagen as t4 on t1.anl_id = t4.anl_ID ";
                $queryOverAllCount .= "where t1.iBdeType='1' ";
                $queryOverAllCount .= "AND t1.iBdePrdktConf_ID = '$analgen_config_id' ";
                $queryOverAllCount .= "order by t3.t3_id asc ";
                $resultOverallCount = queryDB($conn, $queryOverAllCount, "read");
                $overallCount = count($resultOverallCount);
                if ($filter_val == 10) {
                    $ar_days = [];
                    $ar_value = [];
                    $preVal = 0;
                    for ($i = 1; $i <= 10; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }

                            array_push($ar_days, $i);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 20) {
                    $ar_days = [];
                    $ar_value = [];
                    $preVal = 0;
                    for ($i = 1; $i <= 20; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }

                            $day_20 =  $i;
                            array_push($ar_days, $day_20);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 30) {
                    $ar_days = [];
                    $ar_value = [];
                    $preVal = 0;
                    for ($i = 1; $i <= 30; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_30 = $i;
                            array_push($ar_days, $day_30);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($filter_val == 'all') {
                    $ar_days = [];
                    $ar_value = [];
                    $preVal = 0;
                    for ($i = 1; $i <= 50; $i++) {
                        if ($i <= $overallCount) {
                            $indexCount = $i - 1;
                            $preVal += $resultOverallCount[$indexCount]['val'];
                            $result[0]['val'] = $preVal;
                            if ($result[0]['val'] != null) {
                                array_push($ar_value, $result[0]['val']);
                            }
                            $day_50 = $i;
                            array_push($ar_days, $day_50);
                        }
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_days;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }

                $records = ['status' => 400, 'message' => 'Data Not found'];
                echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                die;
            }
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard chart data on energy layer click
     * Fetches and prepares chart data when an energy layer dashboard element is clicked
     * @return array  Returns energy layer-specific dashboard chart data
     */
    public function getClickDashboardChartEnergyLayer()
    {
        try {
            global $conn;
            $record_type_of_tile = $_POST['record_type_of_tile'];
            $chart_outer_table_limit_column = $_POST['chart_outer_table_limit_column'] != '' ? $_POST['chart_outer_table_limit_column'] : 1;
            if ($record_type_of_tile == 'energy') {
                $mst_id = $_POST['mst_id'];
                $select_day_week = $_POST['energy_chart_layer_filter'];
                $input_val_week_day = $_POST['energy_chart_layer_range'];
                if ($select_day_week == 'day') {
                    $checkQuery = '';
                    $todayDate = date('Y-m-d');

                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
                    $table_found = 'false';
                    if ($resultTableExistCheck != false) {
                        $table_found = 'true';
                    }
                    $tableOutsideHTML = '';
                    if ($table_found == 'true') {
                        //*** Check No Shift Name Found Database */
                        $checkQuery .= "Select * from SchichtModelleAll ";
                        for ($c = 0; $c < $input_val_week_day; $c++) {
                            $dateVal = date('Y-m-d', strtotime("-$c days"));
                            if ($c == 0) {
                                $checkQuery .= "Where '$dateVal' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkQuery .= "Or '$dateVal' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkQuery, "read");
                        if ($resultShiftName != '' && count($resultShiftName) > 0) {
                            $ind = $input_val_week_day - 1; //Get last Date
                            $dateValCheck = date('Y-m-d', strtotime("-$ind days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach ($resultShiftName as $key => $val) {
                                $fromDate = $val['gueltigVon']->format('Y-m-d');
                                if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                    $fromDateCheck = $val['gueltigVon']->format('Y-m-d');
                                } else {
                                    $fromDateCheck = $dateValCheck;
                                }
                                $toDate = $val['gueltigBis']->format('Y-m-d');
                                $fromTime = $val['uhrzeitVon']->format('H:i:s');
                                $toTime = $val['uhrzeitBis']->format('H:i:s');
                                $to = $toDate . 'T' . $toTime;
                                $from = $fromDate . 'T' . $fromTime;
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";
                                $resultEnergy = queryDB($conn, $query1, "read");
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value, $totalEnergy);
                                $model_name_layer_name = $val['modellBez'] . '(' . $val['bezeichnung'] . ')';
                                array_push($ar_names, $model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }
                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                } else if ($select_day_week == 'week') {
                    //SchichtModelleAll Table Check
                    $tableCheckQuery = "select * from SchichtModelleAll ";
                    $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");

                    $table_found = 'false';
                    if ($resultTableExistCheck != false) {
                        $table_found = 'true';
                    }

                    $tableOutsideHTML = '';
                    if ($table_found == 'true') {
                        $todayDate = date('Y-m-d');
                        $dateVal =  date('Y-m-d', strtotime("-$input_val_week_day week"));

                        // ****Check Shift Name Exist
                        $intervalDays = $input_val_week_day * 7; //Week;
                        $checkShiftNameQuery = "Select * from SchichtModelleAll ";
                        for ($interval = 0; $interval <= $intervalDays; $interval++) {
                            $dateValShiftName =  date('Y-m-d', strtotime("-$interval Days"));
                            if ($interval == 0) {
                                $checkShiftNameQuery .= "Where '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            } else {
                                $checkShiftNameQuery .= "Or '$dateValShiftName' between gueltigVon AND gueltigBis ";
                            }
                        }
                        $resultShiftName = queryDB($conn, $checkShiftNameQuery, "read");
                        if ($resultShiftName != '' && count($resultShiftName) > 0) {
                            $weekInd = $input_val_week_day * 7; //Week;
                            $dateValCheck = date('Y-m-d', strtotime("-$weekInd Days"));
                            $fromDateCheck = '';
                            $ar_value = [];
                            $ar_names = [];

                            //Outer Table Check
                            $outerTableLimit = 0;
                            $modelNameQueryCount = count($resultShiftName);
                            $i = 0;
                            foreach ($resultShiftName as $key => $val) {

                                $fromDate = $val['gueltigVon']->format('Y-m-d');
                                if ($dateValCheck <= $val['gueltigVon']->format('Y-m-d')) {
                                    $fromDateCheck  = $val['gueltigVon']->format('Y-m-d');
                                } else {
                                    $fromDateCheck  = $dateValCheck;
                                }
                                $toDate = $val['gueltigBis']->format('Y-m-d');
                                $fromTime = $val['uhrzeitVon']->format('H:i:s');
                                $toTime = $val['uhrzeitBis']->format('H:i:s');
                                $to = $toDate . 'T' . $toTime;
                                $from = $fromDate . 'T' . $fromTime;
                                $query1 = "Select Sum(Value*ConvFactor) as sum  from MessstellenEnergiedaten where   convert(date,time) between '$fromDateCheck' AND '$toDate' AND convert(time,time) between '$fromTime' AND '$toTime' AND mst_ID = '$mst_id' ";

                                $resultEnergy = queryDB($conn, $query1, "read");
                                $totalEnergy = $resultEnergy[0]['sum'] != 0 ? $resultEnergy[0]['sum'] / 4 : 0;
                                array_push($ar_value, $totalEnergy);
                                $model_name_layer_name = $val['modellBez'] . '(' . $val['bezeichnung'] . ')';
                                array_push($ar_names, $model_name_layer_name);

                                //Outer Table HTML Get Last Records
                                if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                                    $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                                    $outerTableLimit = $chart_outer_table_limit_column - 1;
                                    if ($i <= $outerTableLimit) {
                                        $tableOutsideHTML .= "<tr>";
                                        $tableOutsideHTML .= "<td>" . $model_name_layer_name . "</td>";
                                        $tableOutsideHTML .= "<td>" . $totalEnergy . "</td>";
                                        $tableOutsideHTML .= "</tr>";
                                    }
                                }
                                $i++;
                            }

                            $records['count_val'] = $ar_value;
                            $records['count_days'] = $ar_names;
                            $records['count_sum'] = '';
                        }
                    }
                    $records['outer_table_html'] = $tableOutsideHTML;
                    $records['table_found'] = $table_found;
                    echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                    die;
                }
            }
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard chart data on automatic energy click
     * Fetches and prepares chart data when an automatic energy dashboard element is clicked
     * @return array  Returns automatic energy-specific dashboard chart data
     */
    public function getClickDashboardChartEnergyAutomatic()
    {
        try {
            global $conn;
            $mst_id = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id[0]' ";
            $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
            $table_found = 'false';
            if ($resultTableExistCheck != false) {
                $table_found = 'true';
            }
            $dateCheck = date('Y-m-d', strtotime("-60 days"));
            $dateCheck = date($dateCheck, strtotime("-$input_val_week_day week"));
            $tableOutsideHTML = '';
            if ($table_found == 'true') {
                if ($_POST['chart_type'] == 'line_chart') {
                    if (count($mst_id) > 1) {
                        $result = '';
                        $arTotalVal = [];
                        $arCountDays = [];
                        foreach ($mst_id as $val) {
                            $result =  $this->getChartRecordFilterEnergyAutomaticMstId($dateCheck, $val);
                            array_push($arTotalVal, $result);
                        }

                        //Count Days
                        for ($j = 0; $j < $input_val_week_day; $j++) {
                            $dateVal = date('Y-m-d', strtotime("-$j week"));
                            array_push($arCountDays, $dateVal);
                        }

                        $records['count_val'] = $arTotalVal;
                        $records['count_days'] = array_reverse($arCountDays); //For ASCENDING


                        $strMstId = implode(",", $mst_id);
                        $queryName = "select nameMst from messstellen where mst_ID in($strMstId) ";
                        $resulMstName = queryDB($conn, $queryName, "read");
                        $records['mstName'] = $resulMstName;

                        $records['mst_id'] = $mst_id;
                        echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
                        die;
                    } else {
                        $mstArray = 1;
                        $this->getClickDashboardChartEnergyAutomaticSingleMST($mstArray = 1);
                    }
                }
                $this->getClickDashboardChartEnergyAutomaticSingleMST();
                die;


                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                $ar_value = [];
                $ar_names = [];
                if ($queryEnergyRecords != '' && count($queryEnergyRecords)) {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    foreach ($queryEnergyRecords as $key => $val) {
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        array_push($ar_value, $totalValue);
                        array_push($ar_names, $val['date']->format('Y-m-d'));
                        if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            //To Make Again in Array
            $records['mst_id'] = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard chart data on automatic energy click for a single MST
     * Fetches and prepares chart data when a specific MST in automatic energy
     * dashboard is selected
     * @return array  Returns chart data for the selected MST
     */
    public function getClickDashboardChartEnergyAutomaticSingleMST($mstArray = false)
    {
        try {
            global $conn;
            $mst_id = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            if ($mstArray == 1) {
                $mst_id = $mst_id[0];
            }
            $input_val_week_day = $_POST['energy_chart_layer_range'];
            $chart_outer_table_limit_column  = $_POST['chart_outer_table_limit_column'];
            $checkQuery = '';
            //SchichtModelleAll Table Check
            $tableCheckQuery = "select * from MessstellenEnergiedaten where mst_id = '$mst_id' ";
            $resultTableExistCheck = queryDB($conn, $tableCheckQuery, "read");
            $table_found = 'false';
            if ($resultTableExistCheck != false) {
                $table_found = 'true';
            }
            $dateCheck = date('Y-m-d', strtotime("-$input_val_week_day days"));
            $tableOutsideHTML = '';
            if ($table_found == 'true') {
                $queryEnergy = "Select convert(date,Time) as date ,sum(Value*ConvFactor) as value ";
                $queryEnergy .= "FROM  MessstellenEnergiedaten where mst_id = '$mst_id' AND ";
                $queryEnergy .= "convert(date,Time) > '$dateCheck' group by convert(date,Time) order by date asc ";
                $queryEnergyRecords = queryDB($conn, $queryEnergy, "read");
                $ar_value = [];
                $ar_names = [];
                if ($queryEnergyRecords != '' && count($queryEnergyRecords) && !$queryEnergyRecords['error']) {
                    $i = 0;
                    $modelNameQueryCount = count($queryEnergyRecords);
                    foreach ($queryEnergyRecords as $key => $val) {
                        $totalValue = $val['value'] > 0 ? $val['value'] / 4 : 0;
                        array_push($ar_value, $totalValue);
                        array_push($ar_names, $val['date']->format('Y-m-d'));
                        if ($chart_outer_table_limit_column == $modelNameQueryCount || $chart_outer_table_limit_column > $modelNameQueryCount) {
                            $outerTableLimit = $modelNameQueryCount - 1; // -1 for Array Index
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        } else if ($chart_outer_table_limit_column < $modelNameQueryCount) {
                            $outerTableLimit = $chart_outer_table_limit_column - 1;
                            if ($i <= $outerTableLimit) {
                                $tableOutsideHTML .= "<tr>";
                                $tableOutsideHTML .= "<td>" . $val['date']->format('Y-m-d') . "</td>";
                                $tableOutsideHTML .= "<td>" . $totalValue . "</td>";
                                $tableOutsideHTML .= "</tr>";
                            }
                        }
                        $i++;
                    }
                    $records['count_val'] = $ar_value;
                    $records['count_days'] = $ar_names;
                    $records['count_sum'] = '';
                }
            }
            $records['outer_table_html'] = $tableOutsideHTML;
            $records['table_found'] = $table_found;
            //To Make Again in Array
            $records['mst_id'] = $_POST['chart_type'] == 'line_chart' ? unserialize($_POST['mst_id']) : $_POST['mst_id'];
            echo json_encode($records, JSON_INVALID_UTF8_IGNORE);
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

    /**
     * Converts a numeric value to a string with 3 decimal points and comma separator.
     * @param float $value The numeric value to convert.
     * @return string The formatted value.
     */
    public function convertValueCommaSeperated($value)
    {
        try {
            $value = round($value, 3);
            return str_replace('.', ',', $value);
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves dashboard tile count data
     * Fetches and returns count values displayed on dashboard tiles
     * @return array  Returns dashboard tile count data
     */
   public function dashboardTileCount()
    {
        try {
            global $conn;
            $username = $_POST['username'];
            $nameDB = $_POST['nameDB'];
            $formattype = $_POST['formattype'];
            $queryTileCount = "Select * FROM tableFormat where username = '$username' AND tile_data_type = '".$formattype."'";
            $queryTileCount = queryDB(connectToDB((string)$nameDB), (string)$queryTileCount, "read");
            if(!isset($queryTileCount['error'])){
                $queryTileCount=count($queryTileCount);
            }else{
                $queryTileCount=0;
            }
            return $queryTileCount;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Retrieves static graph count data
     * Fetches and returns count values related to static graphs on the dashboard
     * @return array  Returns static graph count data
     */
   public function getStaticGraphCount()
    {
        try {
            global $conn;
            $username = $_POST['username'];
            $nameDB = $_POST['nameDB'];
            $queryStaticGraphCount = "Select * FROM tableFormat where username = '$username' AND live_graph = '0' AND type ='Graph'";
            $queryStaticGraphCount = queryDB(connectToDB((string)$nameDB), (string)$queryStaticGraphCount, "read");
            if(!isset($queryStaticGraphCount['error'])){
                $queryStaticGraphCount=count($queryStaticGraphCount);
            }else{
                $queryStaticGraphCount=0;
            }
            return $queryStaticGraphCount;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }    
    /**
     * Stores database value in session
     * Saves selected or required database-related values into the session
     * for later use across requests
     * @return void
     */
    public function storeDBValueSession()
    {
        try {
            $nameDB = isset($_POST['nameDB']) ? $_POST['nameDB'] : '';
            $_SESSION["nameDB"] = $nameDB;
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
    /**
     * Destroys the current user session for logout.
     * @return array Status of the session destruction.
     */
    public function logout()
    {
        try {
            session_destroy();
            return ['destroy' => 'true'];
            die;
        } catch (Exception $e) {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }
}
$obj = new dashboardController();

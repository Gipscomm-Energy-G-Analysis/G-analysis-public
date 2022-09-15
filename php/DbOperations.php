<?php
error_reporting ( -1 ) ;
ini_set ( 'display_errors', 'On' ) ;

$GLOBALS['QueryStatsIntoFile'] = false;

function connectToDB( $nameDB ) {
  $serverName = "sql_gc.managee.de" ;
  $connectionInfo = array( "Database"=>$nameDB, "UID"=>"gipscomm", "PWD"=>"yXFdFioIzNoGFwaQeGHo" );

 $executionStartTime = microtime(true);
  if($GLOBALS['QueryStatsIntoFile'] == true) {
      $GLOBALS['StartTimeConn'] = $executionStartTime;
  }


  $conn = sqlsrv_connect( $serverName, $connectionInfo ) ;
  if ( !$conn ) {
    die(print_r(( 'Could not connect: ' . sqlsrv_errors() ))) ;
  }

 if($GLOBALS['QueryStatsIntoFile'] == true) {
      $executionEndTime = microtime(true);
      $elapsedTime = $executionEndTime - $executionStartTime;

      $file = 'phpDbBenchmark.log';

      $logTimestamp = "\n\n\n## ".date("Y-m-d",time());
      $logDbToUse = "\n## DB TO USE                : '$nameDB'";
      $logConnT = "\n## ESTABLISH CONNECTION       : '$elapsedTime'";
      $GLOBALS['separator'] = "\n## -------------------------- ";

      $logFinalString = $logTimestamp
      . $GLOBALS['separator']
      . $logDbToUse
      . $logConnT
      . $GLOBALS['separator'];

      file_put_contents($file, $logFinalString, FILE_APPEND | LOCK_EX);
  }


  return $conn ;
}

// Tests if sql arg is valid
    function queryDB( $conn, $sqlString, $mode ) {
    if($GLOBALS['QueryStatsIntoFile'] == true) {
        $GLOBALS['StartTimeQueries'] = microtime(true);
    }

    $typeSqlQuery = gettype($sqlString);
    if ($typeSqlQuery === "string") {
        $retVal = execQuery($conn, $sqlString, $mode);
    }
    elseif ($typeSqlQuery === "array") {
        $retArr = array();
        foreach ($sqlString as $query) {
            $retArr[] = execQuery($conn, $query, $mode);
        }
        $retVal = $retArr;
    }
    else {
        $retVal = "The datatype of the passed SQL-query is invalid!"
                . "\n\nSQL query was passed as '$typeSqlQuery'."
                . "\n\nThe expected datatype is either a 'string'"
                . "\n(one query) or an 'array'(multiple queries)!";

    }
    if($GLOBALS['QueryStatsIntoFile'] == true) {
        $GLOBALS['EndTimeQueries'] = microtime(true);
        $file = 'phpDbBenchmark.log';

        $logQueriesToRun = "\n## QUERY / QUERIES TO RUN   : ";
        $logQueriesToRun .= $typeSqlQuery === "array" ? implode(", ", $sqlString) : $sqlString;

        file_put_contents($file, $logQueriesToRun, FILE_APPEND | LOCK_EX);
    }

    return $retVal;
}  

// Tests if ret arr is valid
 function execQuery($conn_, $query_, $mode_) {
    $retVal = "";
    $msgValid = false;
    $hasValidStruct = false;

    if($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionStartTime = microtime(true);
    }

    if( $mode_ === "read" ) {
      $result = sqlsrv_query( $conn_, $query_ ) ;
      $data = array() ;
//      print_r($data);die;
      
      while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC ) ) {
          $data[] = $row ;
      }
      if( $result === false ) {
        $retMsg = "error" ;
      }
      else {
        $retMsg = $data ;
      }
      $isValidArr =
      isArray($retMsg);

      $hasValidStruct =
      count ( array_filter ( array_map ( "isArray", $retMsg ), "not" ) ) === 0 ?
      'true' :
      'false' ;

      if ($isValidArr) {
          $retVal = ($hasValidStruct) ? $retMsg : false ;
      }
      else {
          $retVal = false;
      }
    }
    else {
      $result = sqlsrv_query( $conn_, $query_ );
      if( $result === false ){
        $retVal = "error" ;
      }
      else {
        $retVal = $query_ ;
      }
    }
    if($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionEndTime = microtime(true);

        $elapsedTime = $executionEndTime - $executionStartTime;

        $file = 'phpDbBenchmark.log';

        $logQueryT ="\n## EXECUTE QUERY            : $elapsedTime";
        $GLOBALS['separator'] = "\n## -------------------------- ";

        $logFinalString = $logQueryT.$GLOBALS['separator'];

        file_put_contents($file, $logFinalString, FILE_APPEND | LOCK_EX);
    }

    return $retVal;
} 

  function closeDbConn ( $openConn ) {

    $isClosed = false;

    if($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionStartTime = microtime(true);

        $isClosed = sqlsrv_close ( $openConn );

        $executionEndTime = microtime(true);

        $elapsedTimeTerminate = $executionEndTime - $executionStartTime;
        $elapsedTimeTotal = microtime(true) - $GLOBALS['StartTimeConn'];
        $elapsedTimeQueries = $GLOBALS['EndTimeQueries'] - $GLOBALS['StartTimeQueries'];

        $file = 'phpDbBenchmark.log';

        $logTerminateT ="\n## TERMINATE CONNECTION     : $elapsedTimeTerminate";
        $logQueriesT ="\n## TIME QUERIES           : $elapsedTimeQueries";
        $logTotalT ="\n## TIME TOTAL               : $elapsedTimeTotal";

        $logFinalString = $logTerminateT.$GLOBALS['separator'];
        $logFinalString .= $logQueriesT.$logTotalT;

        file_put_contents($file, $logFinalString, FILE_APPEND | LOCK_EX);
    }
    else {
        $isClosed = sqlsrv_close ( $openConn );
    }

    return $isClosed;
} 

// Some little helpers
function isArray ($arg){
    return gettype($arg) === "array" ? 'true':'false';
}
function not($arg){
    return !$arg;
}
?>

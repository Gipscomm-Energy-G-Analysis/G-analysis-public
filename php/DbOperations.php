<?php
error_reporting(-1);
ini_set('display_errors', 'On');

class DBConnection

/**
 * define database connections for the application
 * @param $host
 * @param $dbName
 * @param $userName
 * @param $userPass
 * @return PDO
 */

{
    /** Define constants for write operations */

    // const DB_HOST               		= '10.30.68.157';
    const DB_HOST                       = 'sql_gc.managee.de';
    const DB_DATABASE                   = 'gipscomm';
    const DB_USERNAME                   = 'gipscomm';
    const DB_PASSWORD                   = 'yXFdFioIzNoGFwaQeGHo';
    const DB_PORT                       = '3306';

    public $conn;

    public function __construct(string $db_name)
    {
        try {
            $this->conn = $this->dbConnection(self::DB_HOST, $db_name, self::DB_USERNAME, self::DB_PASSWORD, self::DB_PORT);
        } catch (PDOException $e) {
            echo 'Connection failed: ' . $e;
        }
    }

    private function dbConnection(string $host, string $dbName, string $userName, string $userPass, string $port)
    {
        $charset = 'utf8mb4';
        $opts = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => true,
        ];

        $dbh = new PDO('sqlsrv:Server=' . $host . ';Database=' . $dbName . ';Port=' . $port . ';', $userName, $userPass, $opts);
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $dbh;
    }
}


function connectToDB(string $nameDB): DBConnection
{
    $server = 'sql_gc.managee.de';
    $conn = new DBConnection('sqlsrv:Server=' . $server . ';Database=' . $nameDB . ';', 'gipscomm', 'yXFdFioIzNoGFwaQeGHo');

    return $conn;
}

enum E_CRUDMode
{
    case Read;
    case Create;
    case Update;
    case Delete;
}

// Tests if sql arg is valid
function queryDB(DBConnection $conn, string | array $sqlQueries, E_CRUDMode $mode): array | bool
{
    if ($GLOBALS['QueryStatsIntoFile'] == true) {
        $GLOBALS['StartTimeQueries'] = microtime(true);
    }

    $typeSqlQuery = gettype($sqlQueries);
    if ($typeSqlQuery === 'string') {
        $retVal = execQuery($conn, $sqlQueries, $mode);
    } elseif ($typeSqlQuery === 'array') {
        $retArr = array();
        foreach ($sqlQueries as $query) {
            $retArr[] = execQuery($conn, $query, $mode);
        }
        $retVal = $retArr;
    } else {
        $retVal = 'The datatype of the passed SQL-query is invalid!'
            . '\n\nSQL query was passed as ' . $typeSqlQuery
            . '\n\nThe expected datatype is either a string'
            . '\n(one query) or an array (multiple queries)!';
    }
    if ($GLOBALS['QueryStatsIntoFile']) {
        $GLOBALS['EndTimeQueries'] = microtime(true);
        $file = 'phpDbBenchmark.log';

        $logQueriesToRun = '\n## QUERY / QUERIES TO RUN   : ';
        $logQueriesToRun .= $typeSqlQuery === 'array' ? implode(', ', $sqlQueries) : $sqlQueries;

        file_put_contents($file, $logQueriesToRun, FILE_APPEND | LOCK_EX);
    }

    return $retVal;
}

// Tests if ret arr is valid
function execQuery(DBConnection $conn_, string $query_, E_CRUDMode $mode_): string | array | bool
{
    $retVal = '';
    $msgValid = false;
    $hasValidStruct = false;

    if ($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionStartTime = microtime(true);
    }

    if ($mode_ === 'read') {
        $result = sqlsrv_query($conn_, $query_);
        $data = array();
        //      print_r($data);die;

        while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }
        if ($result === false) {
            $retMsg = 'error';
        } else {
            $retMsg = $data;
        }
        $isValidArr =
            isArray($retMsg);

        $hasValidStruct =
            count(array_filter(array_map('isArray', $retMsg), 'not')) === 0 ?
            'true' :
            'false';

        $retVal = ($isValidArr && $hasValidStruct) ? $retMsg : false;
    } else {
        $result = sqlsrv_query($conn_, $query_);
        $retVal = !$result ? 'error' : $query_;
    }
    if ($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionEndTime = microtime(true);

        $elapsedTime = $executionEndTime - $executionStartTime;

        $file = 'phpDbBenchmark.log';

        $logQueryT = '\n## EXECUTE QUERY            : $elapsedTime';
        $GLOBALS['separator'] = '\n## -------------------------- ';

        $logFinalString = $logQueryT . $GLOBALS['separator'];

        file_put_contents($file, $logFinalString, FILE_APPEND | LOCK_EX);
    }

    return $retVal;
}

function closeDbConn(DBConnection $conn): bool
{

    $isClosed = false;

    if ($GLOBALS['QueryStatsIntoFile'] == true) {
        $executionStartTime = microtime(true);

        $isClosed = sqlsrv_close($conn);

        $executionEndTime = microtime(true);

        $elapsedTimeTerminate = $executionEndTime - $executionStartTime;
        $elapsedTimeTotal = microtime(true) - $GLOBALS['StartTimeConn'];
        $elapsedTimeQueries = $GLOBALS['EndTimeQueries'] - $GLOBALS['StartTimeQueries'];

        $file = 'phpDbBenchmark.log';

        $logTerminateT = '\n## TERMINATE CONNECTION     : $elapsedTimeTerminate';
        $logQueriesT = '\n## TIME QUERIES           : $elapsedTimeQueries';
        $logTotalT = '\n## TIME TOTAL               : $elapsedTimeTotal';

        $logFinalString = $logTerminateT . $GLOBALS['separator'];
        $logFinalString .= $logQueriesT . $logTotalT;

        file_put_contents($file, $logFinalString, FILE_APPEND | LOCK_EX);
    } else {
        $isClosed = sqlsrv_close($conn);
    }

    return $isClosed;
}

// Some little helpers
function isArray($arg)
{
    return gettype($arg) === 'array' ? 'true' : 'false';
}
function not($arg)
{
    return !$arg;
}

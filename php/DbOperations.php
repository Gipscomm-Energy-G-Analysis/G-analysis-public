<?php
error_reporting(E_ALL);
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
    return new DBConnection($nameDB);
}

function queryDB(DBConnection $conn, string | array $sqlQueries, string $mode): array | string
{
    $typeQueries = gettype($sqlQueries);

    switch ($typeQueries) {
        case 'string':
            $prepVal = execQuery($conn, $sqlQueries, $mode);
            $retVal = $prepVal ? $prepVal : 'queryDB : Invalid query string !! -> ' . $sqlQueries;
            break;

        case 'array':
            $retArr = array();
            foreach ($sqlQueries as $query) {
                $retArr[] = execQuery($conn, $query, $mode);
            }
            $retVal = in_array(false, $retArr) ? 'queryDB : Queries are not all executable  !!' : $retArr;
            break;

        default:
            $retVal = 'The datatype of the passed SQL-query is invalid!'
                . '\n\nSQL query was passed as ' . $typeQueries
                . '\n\nThe expected datatype is either a string'
                . '\n(one query) or an array (multiple queries)!';
            break;
    }

    return $retVal;
}

function execQuery(DBConnection $conn_, string $query_, string $mode_): string | array
{
    $retVal = '';

    if ($mode_ === 'read') {
        $result = sqlsrv_query($conn_, $query_);
        $data = array();

        while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
            $data[] = $row;
        }

        $retVal = $result ? $data : 'execQuery : No data could be read !';
    } else {
        $result = sqlsrv_query($conn_, $query_);
        $retVal = $result ? $query_ : 'execQuery : No data could be inserted or updated !';
    }

    return $retVal;
}

function closeDbConn(DBConnection $conn): bool
{
    return sqlsrv_close($conn);
}
